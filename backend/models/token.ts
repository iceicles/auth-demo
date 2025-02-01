import mongoose from 'mongoose';

interface IToken extends Document {
  refreshToken: string;
  ip: string;
  isValid: string;
  user: Record<any, any>;
}

const tokenSchema = new mongoose.Schema(
  {
    refreshToken: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    isValid: {
      type: String,
      default: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IToken>('Token', tokenSchema);
