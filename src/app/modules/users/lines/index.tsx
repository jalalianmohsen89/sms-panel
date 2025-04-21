import { PageBuilder } from "@/core/components/composite";

const Lines = () => (
  <PageBuilder
    pageId="userLines"
    withPagination={false}
    skipUrlParams={false}
  />
);

export default Lines;
