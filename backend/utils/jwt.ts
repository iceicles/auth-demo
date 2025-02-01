import jwt from 'jsonwebtoken'


const JWT_SECRET = process.env.JWT_SECRET || ''

// creates JWT with createTokenUser object
export const createJWT = ({ payload }: {payload: {user: string, refreshToken?: string}}) => {
  const token = jwt.sign(payload, JWT_SECRET)
  return token
}

// validates JWT
export const isValidToken = (token: string) => jwt.verify(token, JWT_SECRET)

// sends cookies to frontend using set-cookie in response headers
export const attachCookiesToResponse = ({ res, user, refreshToken }: {res: any, user: string, refreshToken: string}) => {

  const accessTokenJWT = createJWT({payload: {user}})
  const refreshTokenJWT = createJWT({ payload: {user, refreshToken}})

  const oneDay = 1000 * 60 * 60 * 24

  res.cookie('accessToken', accessTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    maxAge: 1000, // 1 second
  })

  res.cookie('refreshToken', refreshTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    expires: new Date(Date.now() + oneDay) // 1 day from current date
  })
}