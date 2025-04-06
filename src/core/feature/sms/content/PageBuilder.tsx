import {
  IPageBuilderColumns,
  IPageBuilderFilter,
  TYPES
} from "@/core/components/composite/page-builder/types";
import { actionIconList } from "@/core/content";
import { ShowFormType } from "@/core/types";

export const filtersSms: IPageBuilderFilter[] = [
  {
    title: "جستجو",
    field: "text",
    type: TYPES.INPUT,
    apiUrl: "",
    size: "24,12,6",
    sort: 1,
    defaultValue: "",
    dependenOn: null,
    dependenValue: null
  }
];

export const columnsSms: IPageBuilderColumns[] = [
  {
    id: "Sms",
    title: "زبان",
    value: "Sms"
  },
  {
    id: "translate",
    title: "ترجمه",
    value: "translate"
  },
  {
    id: "actions",
    title: "عملیات",
    width: "10%",
    actions: [
      {
        action: "edit",
        title: "ویرایش",
        icon: actionIconList[0].value
      },
      {
        action: "delete",
        title: "حذف",
        icon: actionIconList[1].value
      }
    ]
  }
];

export const actionsColumnSms = [
  {
    id: "edit",
    showType: "modal" as ShowFormType,
    value: (props: any) => <></>
  },
  {
    id: "delete",
    showType: "modal" as ShowFormType,
    value: (props: any) => <></>
  }
];
