import jwt from 'jsonwebtoken'
import { JWTSignature } from '../interfaces/JWTSig'


const JWT_SECRET = process.env.JWT_SECRET || ''

// creates JWT with createTokenUser object
export const createJWT = ({ payload }: {payload: {user: JWTSignature, refreshToken?: string}}) => {
  const token = jwt.sign(payload, JWT_SECRET)
  return token
}

// validates JWT
export const isTokenValid = (token: string) => jwt.verify(token, JWT_SECRET) as JWTSignature

// sends cookies to frontend using set-cookie in response headers
export const attachCookiesToResponse = ({ res, user, refreshToken }: {res: any, user: JWTSignature, refreshToken: string})  => {

  const accessTokenJWT = createJWT({payload: {user}})
  const refreshTokenJWT = createJWT({ payload: {user, refreshToken}})

  const oneDay = 1000 * 60 * 60 * 24

  res.cookie('accessToken', accessTokenJWT, {
    httpOnly: true, // ensure the cookie is not accessible via javascript
    secure: process.env.NODE_ENV === 'production', // only true in production
    sameSite: 'Strict',  // prevents cross-site request forgery attacks
    signed: true, // verifies that the contents of the cookie have not been changed by the user so it can be trusted
    maxAge: 1000, // 1 second before cookie expires
  })

  res.cookie('refreshToken', refreshTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    expires: new Date(Date.now() + oneDay) // 1 day from current date
  })
}