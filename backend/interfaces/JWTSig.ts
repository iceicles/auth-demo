export interface JWTSignature {
  userId: string;
  name: string;
  refreshToken?: string;
}