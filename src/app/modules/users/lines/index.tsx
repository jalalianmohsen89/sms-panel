import { PageBuilder } from "@/core/components/composite";

const Lines = () => (
  <PageBuilder
    rowKey="_id"
    pageId="userLines"
    withPagination={false}
    skipUrlParams={false}
  />
);

export default Lines;
