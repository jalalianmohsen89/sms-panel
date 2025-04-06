export interface ISortInfo {
  sort_direction: SortOrder;
  sort_field: string;
}

export interface IPagination {
  current?: number;
  page?: number;
  pageSize: number;
  total?: number;
}

export interface IParams {
  sort_direction?: SortOrder;
  sort_field?: string;
  page?: number;
  limit?: number;
}

export type SortOrder = "ascend" | "descend" | null;
