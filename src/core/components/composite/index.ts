import { lazy } from "react";

export { Loading } from "./loading";

export { Header, Notification, Profile, Sidebar } from "./layout";

export const DataTable = lazy(
  () => import("@/core/components/composite/data-table"),
);

export const PageBuilder = lazy(
  () => import("@/core/components/composite/page-builder"),
);

export const PageBuilderFilter = lazy(
  () => import("@/core/components/composite/page-builder/filter"),
);

export {
  ActionMore,
  MobileTablesCard,
  MobileTableSelection,
  MobileTableSort,
  RenderSkeleton,
  SearchbarTable,
} from "./data-table/components";

export {
  filterTypeOptions,
  dataMapsList,
  pages,
  pageBuilders,
} from "@/core/components/composite/page-builder/content";

export { UploadRules } from "@/core/components/composite/upload-rules";
