import { IModuleRoutes } from "@/core/types";
import Report from "@/app/modules/sms/report";

import SendPersonal from "@/app/modules/sms/send-personal/index.tsx";

export const smsRoutes: IModuleRoutes[] = [
  // pages

  {
    path: "report",
    component: <Report />,
    permission: "UI::Sms::Report"
  },
  {
    path: "send_personal",
    component: <SendPersonal />,
    permission: "UI::Sms::SendPersonal"
  }
];
