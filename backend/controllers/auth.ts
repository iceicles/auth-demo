import { StatusCodes } from "http-status-codes"
import userSchema from "../models/user"
import { BadRequestError, UnauthenticatedError } from "../errors";
import { attachCookiesToResponse, createTokenUser } from "../utils";
import token from "../models/token";
import crypto from 'crypto'

interface IUserData {
  name: string;
  email: string;
  password: string;
}

export const register = async (req: any, res: any) => {
  const { userData } = req.body

  const user = await userSchema.create({...userData})

  const token = user.createJWT()

  res.status(StatusCodes.CREATED).json({user: {name: userData.name}, token, success: true})
}


export const login = async (req: any, res: any) => {
  const { userData } = req.body
  console.log('userdata  - ', userData)
  const { email, password } = userData as IUserData

  // if no email or password is provided by user
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  
  // find the associated user's email in db
  const user = await userSchema.findOne({email})
  
  // if user doesn't exist in db
  if (!user) {
    res.send('Invalid credentials, please create an account')
    throw new UnauthenticatedError('Invalid credentials, please create an account')
  }

  // check if password is correct with password stored in db
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  // token user object used for the user property in signing the JWT
  const tokenUser = createTokenUser(user)

  // init refresh token
  let refreshToken = '';

  // check for existing token
  const existingToken = await token.findOne({ user: user._id})

  // if token exists, set refresh token to token stored in db
  if (existingToken) {
    const { isValid } = existingToken

    // can manually override in db to restrict user access
    if (!isValid) {
      throw new UnauthenticatedError('Invalid Credentials')
    }

    // assign refresh token to existing token 
    refreshToken = existingToken.refreshToken
    // create both access and refresh tokens and attach to response
    attachCookiesToResponse({res, user:tokenUser, refreshToken})
    // send response
    res.status(StatusCodes.OK).json({user: tokenUser.name, success: true})
    // exit controller fn
    return;
  }

  // if there is no refresh token --
  // creates a hexicademical refreshToken string
  refreshToken = crypto.randomBytes(40).toString('hex')

  // create token object
  const userAgent = req.headers['user-agent']
  const ip = req.ip
  const userToken = {refreshToken, ip, userAgent, user: user._id}


  // pass token object to Token schema to create document in db
  await token.create(userToken)

  // create both access and refresh token
  attachCookiesToResponse({res, user: tokenUser, refreshToken})

  res.status(StatusCodes.OK).json({user: tokenUser.name, success: true})
}