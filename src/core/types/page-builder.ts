import { ShowFormType } from "@/core/types";
import { ReactNode } from "react";

export enum TYPES {
  INPUT = "input",
  SELECT = "select",
  MULTI_SELECT = "multi-select",
  SWITCH = "switch",
  DATE_PICKER = "date-picker",
  DATE_RANGE = "date-range",
}

export interface IFilter {
  id?: React.Key;
  title: string;
  field: string;
  type?: TYPES;
  apiUrl: string;
  data?: any;
}

export interface IPageBuilderFilter {
  title: string;
  field: string;
  type: TYPES;
  apiUrl: null | string;
  size: string;
  sort: number;
  defaultValue: any;
  data?: any;
  dependenOn: null | string;
  dependenValue: null | string;
  showTime?: boolean;
  required?: boolean;
  onChangeValue?: (value: any, field: string) => void;
  mapper?: (data: any) => void;
}

export interface IPage {
  title: string;
  pageId: string;
  pageUrl: string;
  apiUrl: string;
  dataMap: IDataMap;
  createForm?: IPageBuilderActions;
}

export interface IDataMap {
  value: number | string;
  label: "ساده" | "پیچیده";
  method: (data: any) => any;
}

export interface IPageBuilderColumns {
  id: string;
  title: string;
  value?: string;
  width?: string;
  render?: (row: any) => any;
  // typeValue?: (row: any) => any;
  clickColumn?: IPageBuilderActions;
  actions?: {
    action: string;
    title: string;
    icon?: ReactNode;
  }[];
}

export interface IPageBuilderActions {
  id?: string;
  showType: ShowFormType;
  value: (props?: any) => ReactNode;
}

export interface IPageBuilder {
  pageId: string;
  filters?: IPageBuilderFilter[];
  columns?: IPageBuilderColumns[];
  actions?: IPageBuilderActions[];
  page: IPage;
}

export interface ITypeValueColumn {
  label: string;
  value: (row: any) => React.ReactNode | null;
}

export type ModalType = {
  isOpen: boolean;
  content: ReactNode;
};

export interface ISelect {
  value: string;
  label: string;
}
