// interface used in creating user property for jwt signature
export interface ITokenUser {
  userId: string;
  name: string;
}

// interface used in creating jwt signature
export interface IJWTSignature {
  user: ITokenUser,
  refreshToken?: string; // refresh token created from crypto - used to sign refreshToken only
}