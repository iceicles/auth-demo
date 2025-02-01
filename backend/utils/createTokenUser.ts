import { JWTSignature } from "../interfaces/JWTSig";

// used to sign the JWT
export const createTokenUser = (user: JWTSignature): JWTSignature => {

  return {
    name: user.name,
    userId: user.userId
  }
}