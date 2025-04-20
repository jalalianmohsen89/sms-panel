import { create } from "zustand";
import createUserAuthSlice, {
  IUserState,
} from "../feature/auth/store/user-auth";
import createDevToolsSlice, { IDevtools } from "./devtools";
import createThemeSlice, { IThemeSlice } from "./theme";
export const useStore = create<IUserState & IDevtools & IThemeSlice>()(
  (...args) => ({
    ...createDevToolsSlice(...args),
    ...createThemeSlice(...args),
    ...createUserAuthSlice(...args),
  }),
);

export default useStore;
