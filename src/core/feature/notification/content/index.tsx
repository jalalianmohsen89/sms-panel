import { IModuleRoutes } from "@/core/types";
import Report from "@/app/modules/notification/report";

import SendFile from "@/app/modules/notification/send-file";

export const notificationRoutes: IModuleRoutes[] = [
  // pages

  {
    path: "report",
    component: <Report />,
    permission: "UI::Notification::Report",
  },
  {
    path: "send_file",
    component: <SendFile />,
    permission: "UI::Notification::SendFile",
  },
];
