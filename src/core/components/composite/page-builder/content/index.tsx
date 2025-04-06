import { ShowFormType } from "@/core/types";
import {
  IDataMap,
  IPage,
  IPageBuilder,
  ITypeValueColumn,
  TYPES
} from "../types";
import {
  actionsColumnSms,
  columnsSms,
  filtersSms
} from "@/core/feature/sms/content/PageBuilder";

export const filterTypeOptions = [
  {
    value: TYPES.INPUT,
    label: "Input"
  },
  {
    value: TYPES.SELECT,
    label: "select"
  },
  {
    value: TYPES.SWITCH,
    label: "switch"
  },
  {
    value: TYPES.DATE_PICKER,
    label: "date-picker"
  }
];

export const dataMapsList: IDataMap[] = [
  {
    value: 0,
    label: "ساده",
    method: (data: any) => data.data
  },
  {
    value: 1,
    label: "پیچیده",
    method: (data: any) => data.data
  }
];

export const pages: IPage[] = [
  {
    title: "پیامک ها",
    pageId: "sms",
    pageUrl: "/sms",
    apiUrl: "/v1/categories/list",
    query: null,
    dataMap: dataMapsList[0]
    // createForm: {
    //   id: "create",
    //   showType: "modal" as ShowFormType,
    //   value: (props: any) => <Language {...props} />
    // }
  }
];

export const typeValueColumns: ITypeValueColumn[] = [
  {
    label: "sound",
    value: (item: any) => <></>
    // value: (item: any) => <WordSound {...item} />
  },
  {
    label: "dateRange",
    value: () => <></>
  }
];

export const pageBuilders: IPageBuilder[] = [
  {
    pageId: "sms",
    filters: filtersSms,
    columns: columnsSms,
    actions: actionsColumnSms,
    page: pages[0]
  }
];
