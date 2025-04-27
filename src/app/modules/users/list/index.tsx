import { PageBuilder } from "@/core/components/composite";

const List = () => (
  <PageBuilder
    rowKey="_id"
    pageId="usersList"
    withPagination
    skipUrlParams={false}
  />
);

export default List;
