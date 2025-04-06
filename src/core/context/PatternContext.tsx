// PatternContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  IPattern,
  PatternContextType,
  ThemeType,
  WithChildren
} from "@/core/types";
import { patterns } from "@/core/content";

// ---------------------- types ---------------------
const PatternContext = createContext<PatternContextType | undefined>(undefined);

const themeMode = localStorage.getItem("themeMode") || ("light" as ThemeType);

export const PatternProvider: React.FC<WithChildren> = ({ children }) => {
  // ---------------------- variables ---------------------
  const [currentPattern, setCurrentPattern] = useState<IPattern>(
    themeMode === "dark" ? patterns.digital : patterns.brick
  );

  // ---------------------- methods ---------------------
  const changePattern = (patternName: string) => {
    if (patterns[patternName]) {
      setCurrentPattern(patterns[patternName]);
      localStorage.setItem("pattern", patternName);
    }
  };

  // ---------------------- useEffects ---------------------
  useEffect(() => {
    const savedPattern = localStorage.getItem("pattern");

    if (savedPattern && patterns[savedPattern]) {
      setCurrentPattern(patterns[savedPattern]);
    }
  }, []);

  return (
    <PatternContext.Provider
      value={{ currentPattern, changePattern, patterns }}
    >
      {children}
    </PatternContext.Provider>
  );
};

// ---------------------- provider ---------------------
export const usePattern = (): PatternContextType => {
  const context = useContext(PatternContext);

  if (context === undefined) {
    throw new Error("usePattern must be used within a PatternProvider");
  }

  return context;
};
