import styled from "@emotion/styled";
import { Anchor } from "antd";

export const AnchorStyle = styled(Anchor)({
  "& .ant-anchor-link-title": {
    fontSize: "clamp(12px, 2vw, 14px)"
  }
});
