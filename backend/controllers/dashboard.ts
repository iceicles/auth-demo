// import { generateRefreshToken } from "../models/user";


export const dashboard = async (req: any, res: any) => {
  const {userId, name, accessToken} = req.user // created & passed in from authMiddleware
  
  console.log('req.user - ', req.user)

    // // create refresh token
    // const refreshToken = generateRefreshToken(userId, name)

    // // set the refresh token in HttpOnly cookie - this gets used by auth middleware if access token expires or is invalid
    // res.cookie('refreshToken', refreshToken, {
    //   httpOnly: true, // ensure the cookie is not accessible via javascript
    //   secure: process.env.NODE_ENV === 'production', // only true in production
    //   sameSite: 'Strict', // prevents cross-site request forgery attacks (options are: 'strict', 'lax', or 'none')
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // set a maxAge for the cookie (1 week in this case)
    // })

  res.status(200).json({
    user: `${name}`,
    accessToken
  })
}