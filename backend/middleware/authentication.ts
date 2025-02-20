import { UnauthenticatedError } from '../errors/index'
import { attachCookiesToResponse, isTokenValid } from '../utils';
import token from '../models/token';

/* 
  Auth middleware to check, verify, and refresh access token
  - First, try to verify the access token.
  - If the access token is expired or invalid, it will attempt to use the refresh token to issue a new access token.
  - If the refresh token is invalid or missing, it will respond with an error.
*/
export const authenticateUser = async (req: any, res: any, next: any) => {
  // Destructure cookies, but default to undefined if they're missing
  const { refreshToken, accessToken } = req.signedCookies || {};

  console.log('access, refresh - ', accessToken, refreshToken);

  try {
    // If accessToken exists, validate it
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      return next();
    }

    // If no accessToken, check refreshToken if it exists
    if (refreshToken) {
      const payload = isTokenValid(refreshToken);

      // Get existing token from the database
      const existingToken = await token.findOne({
        user: payload.user.userId,
        refreshToken: payload.refreshToken,
      });

      // If the refresh token isn't valid or doesn't exist, throw an error
      if (!existingToken || !existingToken?.isValid) {
        throw new UnauthenticatedError('Authentication Invalid');
      }

      // Attach cookies if refresh token is valid
      attachCookiesToResponse({
        res,
        user: payload.user,
        refreshToken: existingToken.refreshToken,
      });

      req.user = payload.user;  // Attach user to req for next steps
      return next();  // Proceed to next middleware/controller
    }

    // If neither token is present, deny access (or you could redirect to login)
    throw new UnauthenticatedError('Missing authentication tokens');
  } catch (error) {
    // console.log('Authentication failed: ', error);
    throw new UnauthenticatedError('Invalid Authentication');
    // return next(error);  // Pass error to error-handling middleware
  }
};
