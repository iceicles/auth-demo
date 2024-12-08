import mongoose, { Document } from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createJWT(): string;
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

// creating a JWT
const JWT_SECRET = process.env.JWT_SECRET as string
const JWT_LIFETIME = process.env.JWT_LIFETIME as string
userSchema.methods.createJWT = function () {
  return jwt.sign({userId: this._id, name: this.name}, JWT_SECRET, { expiresIn: JWT_LIFETIME })
}


export default mongoose.model<IUser>('User', userSchema)


