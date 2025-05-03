import { IModuleRoutes } from "@/core/types";
import WebhookSettings from "@/app/modules/users/webhook-settings";

import Lines from "@/app/modules/users/lines";

import List from "@/app/modules/users/list/index.tsx";

export const usersRoutes: IModuleRoutes[] = [
  // pages

  {
    path: "webhook_settings",
    component: <WebhookSettings />,
    permission: "UI::Users::WebhookSettings",
  },
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
