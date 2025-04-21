import { PageBuilder } from "@/core/components/composite";

const List = () => (
  <PageBuilder
    pageId="linesList"
    withPagination={false}
    skipUrlParams={false}
  />
);

export default List;
