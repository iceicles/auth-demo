import { StatusCodes } from "http-status-codes"
import userSchema from "../models/user"


export const register = async (req: any, res: any) => {
  
  const { userData } = req.body

  const user = await userSchema.create({...userData})

  res.status(StatusCodes.CREATED).json({user, success: true})
}


export const login = async () => {

}