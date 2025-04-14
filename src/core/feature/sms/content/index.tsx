import { IModuleRoutes } from "@/core/types";
import SendFile from "@/app/modules/sms/send-file";

import Report from "@/app/modules/sms/report";

import SendPersonal from "@/app/modules/sms/send-personal";

export const smsRoutes: IModuleRoutes[] = [
  // pages

  {
    path: "send_file",
    component: <SendFile />,
    permission: "UI::Sms::SendFile"
  },
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
