export interface IAuthPayload {
  login: string;
  password: string;
}

export interface IRefreshPayload {
  refreshToken: string;
}
