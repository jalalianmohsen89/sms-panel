import styled from "@emotion/styled";
import { Alert } from "antd";

export const AlertStyle = styled(Alert)({
  "& .ant-alert-message": {
    fontSize: "clamp(14px, 2vw, 16px)",
  },
  "& .ant-alert-description": {
    fontSize: "clamp(12px, 2vw, 14px)",
  },
});
