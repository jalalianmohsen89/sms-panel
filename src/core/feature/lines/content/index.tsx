import { IModuleRoutes } from "@/core/types";
import List from "@/app/modules/lines/list/index.tsx";

export const linesRoutes: IModuleRoutes[] = [
  // pages

  {
    path: "all",
    component: <List />,
    permission: "UI::Lines::List",
  },
];
