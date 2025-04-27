import { IModuleRoutes } from "@/core/types";
import Transition from "@/app/modules/notification/transition";

import Report from "@/app/modules/notification/report";

import SendFile from "@/app/modules/notification/send-file";

export const notificationRoutes: IModuleRoutes[] = [
  // pages

  {
    path: "transition",
    component: <Transition />,
    permission: "UI::Notification::Transition",
  },
  {
    path: "report",
    component: <Report />,
    permission: "UI::Notification::Report",
  },
  {
    path: "send_notif_file",
    component: <SendFile />,
    permission: "UI::Notification::SendFile",
  },
];
