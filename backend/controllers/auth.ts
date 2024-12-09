import { StatusCodes } from "http-status-codes"
import userSchema from "../models/user"
import { BadRequestError, UnauthenticatedError } from "../errors";

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

  // create token (this will be sent back to the client for decoding)
  const token = user?.createJWT(); 

  res.status(StatusCodes.OK).json({user: {email}, token, success: true})
}