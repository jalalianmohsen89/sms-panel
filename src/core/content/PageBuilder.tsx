import {
  actionsColumnLinesList,
  columnsLinesList,
  filtersLinesList,
} from "@/core/feature/lines/content/PageBuilder";
import {
  actionsColumnSms,
  columnsSms,
  filtersSms,
} from "@/core/feature/sms/content/PageBuilder";
import {
  actionsColumnUserLines,
  actionsColumnUsersList,
  columnsUserLines,
  columnsUsersList,
  filtersUserLines,
  filtersUsersList,
} from "@/core/feature/users/content/PageBuilder";
import { ShowFormType } from "@/core/types";
import { IDataMap, IPage, IPageBuilder, TYPES } from "../types/page-builder";
import AssignNumberToUser from "@/core/feature/users/components/assign-number-to-user";
import RegisterUser from "../feature/users/components/register-user";

export const filterTypeOptions = [
  {
    value: TYPES.INPUT,
    label: "Input",
  },
  {
    value: TYPES.SELECT,
    label: "select",
  },
  {
    value: TYPES.SWITCH,
    label: "switch",
  },
  {
    value: TYPES.DATE_PICKER,
    label: "date-picker",
  },
];

export const dataMapsList: IDataMap[] = [
  {
    value: 0,
    label: "ساده",
    method: (data: any) => data.data,
  },
  {
    value: 1,
    label: "پیچیده",
    method: (data: any) =>
      data.data.map((_item: any, index: number) => ({
        ..._item,
        index,
      })),
  },
];

export const pages: IPage[] = [
  {
    title: "پیامک ها",
    pageId: "sms",
    pageUrl: "/sms",
    apiUrl: "/sms-bulk/list",
    dataMap: dataMapsList[0],
    // createForm: {
    //   id: "create",
    //   showType: "modal" as ShowFormType,
    //   value: (props: any) => <Language {...props} />
    // }
  },
  {
    title: "لیست کاربران",
    pageId: "usersList",
    pageUrl: "/users/list",
    apiUrl: "/user/list",
    dataMap: dataMapsList[0],
    createForm: {
      id: "create",
      showType: "modal" as ShowFormType,
      value: (props: any) => <RegisterUser {...props} />,
    },
  },
  {
    title: "شماره های کاربر",
    pageId: "userLines",
    pageUrl: "/users/lines",
    apiUrl: "/user-number/number-list",
    dataMap: dataMapsList[0],
    createForm: {
      id: "create",
      showType: "modal" as ShowFormType,
      value: (props: any) => <AssignNumberToUser {...props} />,
    },
  },
  {
    title: "لیست خطوط",
    pageId: "linesList",
    pageUrl: "/lines/list",
    apiUrl: "/number/list",
    dataMap: dataMapsList[1],
    createForm: {
      id: "create",
      showType: "modal" as ShowFormType,
      value: (props: any) => <RegisterUser {...props} />,
    },
  },
];

export const pageBuilders: IPageBuilder[] = [
  {
    pageId: "sms",
    filters: filtersSms,
    columns: columnsSms,
    actions: actionsColumnSms,
    page: pages[0],
  },
  {
    pageId: "usersList",
    filters: filtersUsersList,
    columns: columnsUsersList,
    actions: actionsColumnUsersList,
    page: pages[1],
  },
  {
    pageId: "userLines",
    filters: filtersUserLines,
    columns: columnsUserLines,
    actions: actionsColumnUserLines,
    page: pages[2],
  },
  {
    pageId: "linesList",
    filters: filtersLinesList,
    columns: columnsLinesList,
    actions: actionsColumnLinesList,
    page: pages[3],
  },
];
