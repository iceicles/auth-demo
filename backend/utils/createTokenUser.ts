import { JWTSignature } from "../interfaces/JWTSig";
import { IUser } from "../models/user";

// used to sign the JWT
export const createTokenUser = (user: IUser): JWTSignature => {

  return {
    name: user.name,
    userId: user._id
  }
}