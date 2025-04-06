export type FormPropsType = {
  mobile?: string;
  otp?: string;
};

export interface IUser {
  name: string;
  mobile: string;
}
export interface IUserState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;

  // actions
  setUser: (user: IUser | null) => void;
  setToken: (token: string) => void;
  login: (user: IUser, token: string) => void;
  logout: () => void;
}
