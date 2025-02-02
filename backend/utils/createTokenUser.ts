import { ITokenUser } from "../interfaces/JWTSig";
import { IUser } from "../models/user";

// used to sign the JWT
export const createTokenUser = (user: IUser): ITokenUser => {

  return {
    name: user.name,
    userId: user._id
  }
}