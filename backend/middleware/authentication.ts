import jwt from 'jsonwebtoken'
import { UnauthenticatedError } from '../errors/index'
import { JWTSignature } from '../interfaces/JWTSig';
import { generateAccessToken } from '../models/user';


/* 
  Auth middleware to check, verify, and refresh access token
  - First, try to verify the access token.
  - If the access token is expired or invalid, it will attempt to use the refresh token to issue a new access token.
  - If the refresh token is invalid or missing, it will respond with an error.
*/
export const auth = async (req: any, res: any, next: any) => {
  // check header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication invalid - no token provided')
  }

  // get token
  const token = authHeader.split(' ')[1]

  if (!token) refreshAccessToken(req, res, next)

  // if there is a token, decode and pass user (name and id) to dashboard endpoint
  // if there is a token BUT it is either expired or invalid, go to catch block
  try {
    const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET as string
    // decode & verify token 
    const decodedPayload = jwt.verify(token, JWT_SECRET) as JWTSignature // catch block will be called if verify check fails

  
    // get the userId and name used to create JWT
    const { userId, name} = decodedPayload
    
    // generate access token with userId and name
    // const { accessToken } = generateAccessToken(userId, name)

    // attach user to dashboard route (send accessToken to frontend to store in local storage)
    req.user = { userId, name }

    console.log('[auth middlware] try block')

    // call next middleware
    next()
  } catch (error) {
    console.log('[auth middleware] catch block')
    // if there is a token BUT it is expired, or invalid, try refreshing 
    // return refreshAccessToken(req, res, next)
    throw new UnauthenticatedError(
      'Authentication invalid - Not authorized to access this resource'
    );
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