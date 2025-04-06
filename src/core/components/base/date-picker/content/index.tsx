import {
  ChevronDoubleLeft,
  ChevronDoubleRight,
  ChevronLeft,
  ChevronRight
} from "@/core/icons";

export const locale = {
  lang: {
    locale: "fa", // زبان فارسی
    placeholder: "انتخاب تاریخ",
    rangePlaceholder: ["از تاریخ", "تا تاریخ"],
    today: "امروز",
    now: "اکنون",
    backToToday: "بازگشت به امروز",
    ok: "تایید",
    clear: "پاک کردن",
    month: "ماه",
    year: "سال",
    yearFormat: "YYYY",
    monthFormat: "MMMM",
    dateFormat: "YYYY/MM/DD",
    dayFormat: "D",
    dateTimeFormat: "YYYY/MM/DD",
    monthBeforeYear: true,
    months: [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند"
    ],
    shortMonths: [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند"
    ]
  }
};

export const icons = {
  prevIcon: <ChevronRight size={16} />,
  nextIcon: <ChevronLeft size={16} />,
  superPrevIcon: <ChevronDoubleRight size={16} />,
  superNextIcon: <ChevronDoubleLeft size={16} />
};
