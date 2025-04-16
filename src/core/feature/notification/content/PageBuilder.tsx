import { typeValueColumns } from "@/core/components/composite";
import {
  IPageBuilderColumns,
  IPageBuilderFilter,
  TYPES,
} from "@/core/components/composite/page-builder/types";
// import { actionIconList } from "@/core/content";
import { ShowFormType } from "@/core/types";

export const filtersNotification: IPageBuilderFilter[] = [
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

export const columnsNotification: IPageBuilderColumns[] = [
  {
    id: "from",
    title: "از شماره",
    value: "from",
  },
  {
    id: "to",
    title: "به شماره",
    value: "to",
  },
  {
    id: "body",
    title: "متن پیام",
    value: "body",
  },
  {
    id: "createdAt",
    title: "تاریخ",
    value: "createdAt",
    typeValue: (row: any) => typeValueColumns[0]?.value?.(row),
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

export const actionsColumnNotification = [
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
