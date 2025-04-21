import { PageBuilder } from "@/core/components/composite";

const List = () => (
  <PageBuilder pageId="usersList" withPagination skipUrlParams={false} />
);

export default List;
