import { StatusCodes } from "http-status-codes"
import userSchema from "../models/user"


export const register = async (req: any, res: any) => {
  const { userData } = req.body

  const user = await userSchema.create({...userData})

  const token = user.createJWT()

  res.status(StatusCodes.CREATED).json({user: {name: userData.name}, token})
}


export const login = async () => {

}