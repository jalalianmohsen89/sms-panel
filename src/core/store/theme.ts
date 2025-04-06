import { StateCreator } from "zustand";
import { ThemeType } from "@/core/types";

export interface IThemeSlice {
  theme: ThemeType;
  themeActions: {
    toggleTheme: () => void;
    initializeTheme: () => void;
  };
}

const createThemeSlice: StateCreator<IThemeSlice> = (set, get) => ({
  theme: "light",

  themeActions: {
    toggleTheme: () => {
      const newTheme = get().theme === "light" ? "dark" : "light";

      set({ theme: newTheme });
    },

    initializeTheme: () => {
      const savedTheme = localStorage.getItem("themeMode") as ThemeType;

      if (savedTheme) {
        set({ theme: savedTheme });
      }
    }
  }
});

export default createThemeSlice;
