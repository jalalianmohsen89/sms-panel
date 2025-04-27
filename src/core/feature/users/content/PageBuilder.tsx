import ConvertDate from "@/core/components/composite/page-builder/columns/convert-date";
import {
  IPageBuilderColumns,
  IPageBuilderFilter,
  TYPES,
} from "@/core/components/composite/page-builder/types";
import { actionIconList } from "@/core/content";
// import { actionIconList } from "@/core/content";
import { Typography } from "@/core/components/base";
import { ShowFormType } from "@/core/types";

export const filtersUsersList: IPageBuilderFilter[] = [
  {
    title: "جستجو",
    field: "text",
    type: TYPES.INPUT,
    apiUrl: "",
    size: "24,12,6",
    sort: 1,
    defaultValue: "",
    dependenOn: null,
    dependenValue: null,
  },
];

export const columnsUsersList: IPageBuilderColumns[] = [
  {
    id: "name",
    title: "نام",
    value: "name",
  },
  {
    id: "family",
    title: "نام خانوادگی",
    value: "family",
  },
  {
    id: "mobile",
    title: "موبایل",
    value: "mobile",
  },
  {
    id: "username",
    title: "نام کاربری",
    value: "username",
  },
  {
    id: "email",
    title: "ایمیل",
    value: "email",
  },
  {
    id: "status",
    title: "وضعیت",
    render: (row: any) => (
      <Typography>{row.status == "active" ? "فعال" : "غیر فعال"}</Typography>
    ),
  },
  {
    id: "createdAt",
    title: "تاریخ",
    value: "createdAt",
    render: (row: any) => <ConvertDate date={row.createdAt} />,
  },
  {
    id: "actions",
    title: "عملیات",
    width: "10%",
    actions: [
      {
        action: "view",
        title: "مشاهده",
        icon: actionIconList[0].value,
      },
    ],
  },
];

export const actionsColumnUsersList = [
  {
    id: "view",
    showType: "modal" as ShowFormType,
    // eslint-disable-next-line no-underscore-dangle
    value: (row: any) => `/users/lines?user=${row._id}`,
  },
];

export const filtersUserLines: IPageBuilderFilter[] = [
  {
    title: "جستجو",
    field: "text",
    type: TYPES.INPUT,
    apiUrl: "",
    size: "24,12,6",
    sort: 1,
    defaultValue: "",
    dependenOn: null,
    dependenValue: null,
  },
];

export const columnsUserLines: IPageBuilderColumns[] = [
  {
    id: "index",
    title: "ردیف",
    value: "index",
  },
  {
    id: "number",
    title: "شماره",
    value: "number",
  },
  {
    id: "operator",
    title: "اپراتور",
    value: "operator",
  },
  {
    id: "inboxOperator",
    title: "اپراتور",
    render: (row: any) => (
      <Typography>
        {row.inboxOwner.name + " " + row.inboxOwner.family}
      </Typography>
    ),
  },
  {
    id: "isServiceable",
    title: "خدماتی",
    render: (row: any) => (
      <Typography>{row.isServiceable == "1" ? "بله" : "خیر"}</Typography>
    ),
  },
  {
    id: "isShareable",
    title: "خط اشتراکی",
    render: (row: any) => (
      <Typography>{row.isShareable == "1" ? "بله" : "خیر"}</Typography>
    ),
  },
  {
    id: "status",
    title: "وضعیت",
    render: (row: any) => (
      <Typography>{row.status == "1" ? "فعال" : "غیر فعال"}</Typography>
    ),
  },
  {
    id: "createdAt",
    title: "تاریخ",
    render: (row: any) => <ConvertDate date={row.createdAt} />,
  },
  // {
  //   id: "actions",
  //   title: "عملیات",
  //   width: "10%",
  //   actions: [
  //     {
  //       action: "edit",
  //       title: "ویرایش",
  //       icon: actionIconList[0].value
  //     },
  //     {
  //       action: "delete",
  //       title: "حذف",
  //       icon: actionIconList[1].value
  //     }
  //   ]
  // }
];

export const actionsColumnUserLines = [
  {
    id: "edit",
    showType: "modal" as ShowFormType,
    value: () => <></>,
  },
  {
    id: "delete",
    showType: "modal" as ShowFormType,
    value: () => <></>,
  },
];
