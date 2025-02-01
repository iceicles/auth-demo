import jwt from 'jsonwebtoken'
import { UnauthenticatedError } from '../errors/index'
import { JWTSignature } from '../interfaces/JWTSig';
import { generateAccessToken } from '../models/user';
import { attachCookiesToResponse, isTokenValid } from '../utils';
import token from '../models/token';


/* 
  Auth middleware to check, verify, and refresh access token
  - First, try to verify the access token.
  - If the access token is expired or invalid, it will attempt to use the refresh token to issue a new access token.
  - If the refresh token is invalid or missing, it will respond with an error.
*/
export const auth = async (req: any, res: any, next: any) => {

  const { refreshToken, accessToken } = req.signedCookies;

  try {
    // check access token first because it'll have a shorter expiration
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.name;
      return next();
    }

   // checks if refresh token is valid using jwt.verify
    // decoded using the tokenUser object in login controller and refreshToken value passed to attachCookiesToResponse
    // -- this is why we can access userId and refreshToken after decoding on payload
    const payload = isTokenValid(refreshToken);

    // get existing token from db
    const existingToken = await token.findOne({
      // both userId (user_.id) and refreshToken properties were used to sign the JWT for refreshToken in attachCookiesToResponse
      user: payload.userId,
      refreshToken: payload.refreshToken,
    });

    // check if token doesn't exist and is valid is false
    // note: isValid can be used to restrict access to user in the future (for any reasons :] )
    if (!existingToken || !existingToken?.isValid) {
      throw new UnauthenticatedError('Authentication Invalid');
    }

    // attach both tokens to cookies in response
    attachCookiesToResponse({
      res,
      user: payload, // payload contains the JWT signature used to sign both tokens
      refreshToken: existingToken.refreshToken, // use refreshToken from db to sign refreshToken (not used for access token)
    });

    // attach user to req.user to be used by other middleware(s)/controller(s)
    // for example, /showMe endpoint passes req.user in response
    // it should be the payload user since it was used to sign the JWT
    req.user = payload;
    next(); // call next middleware
  } catch (error) {
    // when the refresh token expires --
    throw new UnauthenticatedError('Authentication Invalid');
  }
}

// handle refresh token and issue a new access token
const refreshAccessToken = (req: any, res: any, next: any) => {
  console.log('no token so refreshAcessToken getting called')
  // passed in from the front end request
  const refreshToken = req.cookies.refreshToken; 

  console.log('refreshToken - ', refreshToken)

  // if the request does not include a refresh token
  if (!refreshAccessToken) {
    return res.status(401).json({message: 'No refresh token provided'})
    // throw new UnauthenticatedError('No refresh token provided')
  }
  
  try {
    // since access token in invalid or expired, we generate a new one using refresh token from cookies
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as JWTSignature
    const { userId, name } = decoded

    // generate new access token
    const { accessToken } = generateAccessToken(userId, name)

    // attach new token to response headers
    res.setHeader('Authorization', `Bearer ${accessToken}`)

    console.log('accessToken - ', accessToken)

    // attach user to request - to be used by dashboard endpoint
    // note: accessToken is being sent when a new token is generated 
    req.user = { userId, name, accessToken}

    // res.json({ accessToken})

    // call next middleware (aka dashboard endpoint in this case)
    next()
  } catch (error) {
    res.status(403).json({message: 'Invalid or expired refresh token'})
  }
}