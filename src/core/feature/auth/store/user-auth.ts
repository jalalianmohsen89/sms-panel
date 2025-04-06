import Cookies from "js-cookie";
import { StateCreator } from "zustand"; // اضافه کردن این import

interface IUser {
  name: string;
  family: string;
  mobile: string;
}

export interface IUserState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: IUser | null) => void;
  setToken: (token: string) => void;
  login: (user: IUser, token: string) => void;
  logout: () => void;
}

const TOKEN_COOKIE_NAME = "token";
const USER_LOCAL_STORAGE_NAME = "user";

// تغییر به slice creator
const createUserAuthSlice: StateCreator<IUserState> = (set) => ({
  user: JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_NAME) || "null"),
  token:
    Cookies.get(TOKEN_COOKIE_NAME) ||
    localStorage.getItem(TOKEN_COOKIE_NAME) ||
    null,
  isAuthenticated: !!(
    Cookies.get(TOKEN_COOKIE_NAME) || localStorage.getItem(TOKEN_COOKIE_NAME)
  ),

  setUser: (user) => {
    if (!user) {
      localStorage.setItem(USER_LOCAL_STORAGE_NAME, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_LOCAL_STORAGE_NAME);
    }
    set({ user });
  },

  setToken: (token) => {
    if (token) {
      Cookies.set(TOKEN_COOKIE_NAME, token, {
        expires: 7,
        secure: true,
        sameSite: "strict"
      });
      localStorage.setItem(TOKEN_COOKIE_NAME, token);
      set({ token, isAuthenticated: true });
    } else {
      Cookies.remove(TOKEN_COOKIE_NAME);
      localStorage.removeItem(TOKEN_COOKIE_NAME);
      set({ token: null, isAuthenticated: false });
    }
  },

  login: (user, token) => {
    Cookies.set(TOKEN_COOKIE_NAME, token, {
      expires: 7,
      secure: true,
      sameSite: "strict"
    });
    localStorage.setItem(TOKEN_COOKIE_NAME, token);
    localStorage.setItem(USER_LOCAL_STORAGE_NAME, JSON.stringify(user));
    set({
      user,
      token,
      isAuthenticated: true
    });
    window.location.href = "/";
  },

  logout: () => {
    Cookies.remove(TOKEN_COOKIE_NAME);
    localStorage.removeItem(TOKEN_COOKIE_NAME);
    localStorage.removeItem(USER_LOCAL_STORAGE_NAME);
    set({
      user: null,
      token: null,
      isAuthenticated: false
    });
    window.location.href = "/";
  }
});

export default createUserAuthSlice;
