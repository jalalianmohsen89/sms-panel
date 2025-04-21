import { PageBuilder } from "@/core/components/composite";

const Report = () => (
  <PageBuilder
    pageId="sms"
    withPagination
    showRowNumber
    skipUrlParams={false}
  />
);

export default Report;
