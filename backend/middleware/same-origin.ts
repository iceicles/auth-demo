// this file is not in use but is useful when you have a server deployed on a different domain and want to make sure
// only the client that you have configured is allowed to access routes & resources

/*
import { StatusCodes } from "http-status-codes";



 const allowedOrigins = process.env.CLIENT_URL || '';

// same origin middleware to prevent CSRF
export const sameOriginMiddleware = (req: any, res: any, next: any) => {
  const referer = req.get('Referer');
  const origin = req.get('Origin'); // sometimes Origin header can be used as well


  // extract the origin of the Referer (if available)
  const refererOrigin = referer ? new URL(referer).origin : '';
  const originHeader = origin ? new URL(origin).origin : '';

  // allow requests from trusted domain
  if (allowedOrigins.includes(refererOrigin) || allowedOrigins.includes(originHeader)) {
    return next(); // request is from a trusted origin
  }

  // block the request if it comes from an untrusted domain
  return res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden: Invalid origin' });
};
 */