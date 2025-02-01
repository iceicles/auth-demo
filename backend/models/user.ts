import mongoose, { Document } from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWTSignature } from "../interfaces/JWTSig";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createJWT(): string;
  createRefreshToken(): string;
  comparePassword(arg: string): string;
  _id: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide valid email',
    ],
    unique: true,  // only one unique email addr
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
  }
})

// hash password before saving doc to db
userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

// generate initial JWT - access token
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string
const ACCESS_TOKEN_LIFETIME = process.env.ACCESS_TOKEN_LIFETIME as string
userSchema.methods.createJWT = function () {
  return jwt.sign({userId: this._id, name: this.name} as JWTSignature, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_LIFETIME })
}

// generate refresh token
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string
const REFRESH_TOKEN_LIFETIME = process.env.REFRESH_TOKEN_LIFETIME as string
userSchema.methods.createRefreshToken = function () {
  return jwt.sign({userId: this._id, name: this.name} as JWTSignature, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_LIFETIME })
}

// compare encrypted passwords
userSchema.methods.comparePassword = async function(candidatePassword: string) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

// Used when generating a new access token after decoding the refresh token in auth middleware
export function generateAccessToken(id: string, name: string) {
  let accessToken = jwt.sign({userId: id, name: name} as JWTSignature, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_LIFETIME })
  return { accessToken }
}

// export function generateRefreshToken(id: string, name: string) {
//   return jwt.sign({userId: id, name: name} as JWTSignature, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_LIFETIME })
// }


export default mongoose.model<IUser>('User', userSchema)


