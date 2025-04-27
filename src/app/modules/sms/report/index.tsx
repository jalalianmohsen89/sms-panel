import { PageBuilder } from "@/core/components/composite";

const Report = () => (
  <PageBuilder
    rowKey="_id"
    pageId="sms"
    withPagination
    showRowNumber
    skipUrlParams={false}
  />
);

export default Report;
