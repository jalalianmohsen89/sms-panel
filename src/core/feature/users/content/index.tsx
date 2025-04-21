import { IModuleRoutes } from "@/core/types";
import Lines from "@/app/modules/users/lines";

import List from "@/app/modules/users/list/index.tsx";

export const usersRoutes: IModuleRoutes[] = [
  // pages

  {
    path: "lines",
    component: <Lines />,
    permission: "UI::Users::Lines",
  },
  {
    path: "list",
    component: <List />,
    permission: "UI::Users::List",
  },
];
