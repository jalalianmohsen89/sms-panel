import { PageBuilder } from "@/core/components/composite";

const List = () => (
  <PageBuilder
    rowKey="_id"
    pageId="linesList"
    withPagination={false}
    skipUrlParams={false}
  />
);

export default List;
