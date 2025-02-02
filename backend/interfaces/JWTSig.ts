export interface ITokenUser {
  userId: string;
  name: string;
}

export interface IJWTSignature {
  user: ITokenUser,
  refreshToken?: string; // refresh token created from crypto - used to sign refreshToken only
}