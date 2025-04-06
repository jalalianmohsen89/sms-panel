import styled from "@emotion/styled";
import { Input } from "antd";
import Password from "antd/es/input/Password";

const style = {
  height: "35px",
  "@media (min-width: 991px)": {
    height: "38px"
  }
};

export const InputCustomeStyle = styled(Input)({
  ...style
});

export const PasswordCustomeStyle = styled(Password)({
  ...style
});
