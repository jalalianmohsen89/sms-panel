// src/core/navigation/navigator.ts
let navigate: ((path: string) => void) | null = null;

export const setNavigate = (nav: (path: string) => void) => {
  navigate = nav;
};

export const goTo = (path: string) => {
  if (!navigate) {
    // console.warn("Navigation function not initialized yet");

    return;
  }
  navigate(path);
};
