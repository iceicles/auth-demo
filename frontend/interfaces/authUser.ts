export interface IAuthUser {
  user: string,
  setAuthUser: (userName: string) => void
  removeUser: () => void
  isLoading: boolean;
}