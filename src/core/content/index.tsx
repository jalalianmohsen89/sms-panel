import bubbles from "@/core/assets/images/patterns/3.svg";
import brick from "@/core/assets/images/patterns/5.svg";
import image10 from "@/core/assets/images/pic/image10.jpg";
import image11 from "@/core/assets/images/pic/image11.jpg";
import image12 from "@/core/assets/images/pic/image12.jpeg";
import image13 from "@/core/assets/images/pic/image13.jpeg";
import image14 from "@/core/assets/images/pic/image14.jpeg";
import { Create, Eye, Pencil, SMS, Trash, Users } from "@/core/icons";
import { IPatterns } from "@/core/types";

export const permissionList = [
  "UI::Sms::SendPersonal",
  "UI::Sms::SendFile",
  "UI::Sms::Report",
  "UI::Notification::Report",
  "UI::Notification::SendFile",
  "UI::Users::List",
  "UI::Users::Lines",
  "UI::Lines::List",
  "UI::Notification::Transition",
];

export const navigation = [
  {
    key: "users",
    // eslint-disable-next-line react/jsx-pascal-case
    icon: <Users />,
    label: "کاربران",
    children: [
      {
        key: "list",
        label: "لیست کاربران",
      },
    ],
  },
  {
    key: "lines",
    // eslint-disable-next-line react/jsx-pascal-case
    icon: <Users />,
    label: "خطوط",
    children: [
      {
        key: "all",
        label: "لیست خطوط",
      },
    ],
  },
  {
    key: "sms",
    // eslint-disable-next-line react/jsx-pascal-case
    icon: <SMS />,
    label: "پیامک ها",
    children: [
      {
        key: "send_personal",
        label: "ارسال پیامک",
      },
      {
        key: "send_group_file",
        label: "ارسال به صورت فایل",
      },
      {
        key: "report",
        label: " گزارش پیامک ها",
      },
    ],
  },
  {
    key: "notification",
    // eslint-disable-next-line react/jsx-pascal-case
    icon: <SMS />,
    label: "اعلانات",
    children: [
      {
        key: "send_notif_file",
        label: "ارسال به صورت فایل",
      },
      // {
      //   key: "report",
      //   label: " گزارش اعلانات",
      // },
    ],
  },
];

export const patterns: IPatterns = {
  default: {
    id: "default",
    pattern: "",
    useOnOriginalTheme: "default",
    patternOpacity: "0",
    layoutOpacity: "0.7",
    containerOpacity: "0.5",
    navOpacity: "0.01",
    blur: "0",
  },
  bubbles: {
    id: "bubbles",
    pattern: bubbles,
    useOnOriginalTheme: "dark",
    patternOpacity: "0.06",
    layoutOpacity: "0.7",
    containerOpacity: "0.6",
    navOpacity: "0.03",
    blur: "3",
  },
  image10: {
    id: "image10",
    pattern: image10,
    useOnOriginalTheme: "both",
    patternOpacity: "0.3",
    layoutOpacity: "0.6",
    containerOpacity: "0.5",
    navOpacity: "0.06",
    blur: "20",
  },
  image11: {
    id: "image11",
    pattern: image11,
    useOnOriginalTheme: "light",
    patternOpacity: "0.8",
    layoutOpacity: "0.7",
    containerOpacity: "0.2",
    navOpacity: "0.006",
    blur: "6",
  },
  image12: {
    id: "image12",
    pattern: image12,
    useOnOriginalTheme: "light",
    patternOpacity: "0.4",
    layoutOpacity: "0.9",
    containerOpacity: "0.7",
    navOpacity: "0.05",
    blur: "15",
  },
  image13: {
    id: "image13",
    pattern: image13,
    useOnOriginalTheme: "both",
    patternOpacity: "0.3",
    layoutOpacity: "0.7",
    containerOpacity: "0.7",
    navOpacity: "0.006",
    blur: "20",
  },
  image14: {
    id: "image14",
    pattern: image14,
    useOnOriginalTheme: "light",
    patternOpacity: "0.3",
    layoutOpacity: "0.8",
    containerOpacity: "0.6",
    navOpacity: "0.05",
    blur: "20",
  },
  brick: {
    id: "brick",
    pattern: brick,
    useOnOriginalTheme: "both",
    patternOpacity: "0.2",
    layoutOpacity: "0.7",
    containerOpacity: "0.5",
    navOpacity: "0.04",
    blur: "2",
  },
};

export const actionIconList = [
  {
    label: "مشاهده",
    value: <Eye />,
  },
  {
    label: "ویرایش",
    value: <Pencil />,
  },
  {
    label: "حذف",
    value: <Trash />,
  },
  {
    label: "افزودن صوت",
    value: <Create />,
  },
];
