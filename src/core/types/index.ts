import { ReactElement, ReactNode } from "react";
import type { GlobalToken } from "@/core/theme";

export type WithChildren = {
  children?: ReactNode;
};

export interface IModuleRoutes {
  path: string;
  component: ReactElement;
  permission: string;
}

export type TokenType = {
  token: GlobalToken;
};

export type PatternType = {
  pattern: IPattern;
};

export type ThemeType = "light" | "dark";

export type ModeType = "add" | "edit";

// تعریف رابط برای پوسته
export interface IPattern {
  id: string;
  pattern: string;
  useOnOriginalTheme: "dark" | "light" | "both" | "default";
  patternOpacity: string;
  layoutOpacity: string;
  containerOpacity: string;
  navOpacity: string;
  blur: string;
}

// تعریف رابط برای تمام پوسته‌ها
export interface IPatterns {
  [key: string]: IPattern;
}

// تعریف رابط برای کانتکست
export interface PatternContextType {
  currentPattern: IPattern;
  changePattern: (themeName: string) => void;
  patterns: IPatterns;
}

export interface IListFilter {
  fieldName: string;
  type: string;
  params: object;
  size: number;
  hide: string[] | [];
  order: number;
}

export type ShowFormType = "modal" | "drawer";
