import jwt from 'jsonwebtoken'
import { UnauthenticatedError } from '../errors/index'
import { JWTSignature } from '../interfaces/JWTSig';


export const auth = async (req: any, res: any, next: any) => {
  // check header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication invalid - no token provided')
  }

  // get token
  const token = authHeader.split(' ')[1]

  try {
    const JWT_SECRET = process.env.JWT_SECRET as string
    // decode & verify token 
    const decodedPayload = jwt.verify(token, JWT_SECRET) as JWTSignature

    // get the userId and name used to create JWT
    const { userId, name } = decodedPayload

    // attach user to dashboard route
    req.user = { userId, name }

    // call next middleware
    next()
  } catch (error) {
    throw new UnauthenticatedError(
      'Authentication invalid - Not authorized to access this resource'
    );
  }
}