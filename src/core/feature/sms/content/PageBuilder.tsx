import { Typography } from "@/core/components/base";
import ConvertDate from "@/core/components/composite/page-builder/columns/convert-date";
import {
  IPageBuilderColumns,
  IPageBuilderFilter,
  TYPES,
} from "@/core/components/composite/page-builder/types";
// import { actionIconList } from "@/core/content";
import { ShowFormType } from "@/core/types";

export const filtersSms: IPageBuilderFilter[] = [
  {
    title: "نوع",
    field: "type",
    type: TYPES.SELECT,
    apiUrl: "",
    data: [
      {
        value: "bulk",
        label: "گروهی",
      },
      {
        value: "single",
        label: "فردی",
      },
    ],
    required: true,
    size: "24,12,6",
    sort: 1,
    defaultValue: "",
    dependenOn: null,
    dependenValue: null,
  },
];

export const columnsSms: IPageBuilderColumns[] = [
  {
    id: "title",
    title: "عنوان",
    value: "title",
  },
  {
    id: "number",
    title: "شماره",
    value: "number",
  },
  {
    id: "body",
    title: "متن پیام",
    width: "20%",
    value: "body",
  },
  {
    id: "type",
    title: "نوع",
    render: (row: any) => (
      <Typography>{row.type === "bulk" ? "گروهی" : "فردی"}</Typography>
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

export const actionsColumnSms = [
  {
    id: "edit",
    showType: "modal" as ShowFormType,
    value: () => <></>,
  },
  {
    id: "click",
    showType: "modal" as ShowFormType,
    value: () => <></>,
  },
];
