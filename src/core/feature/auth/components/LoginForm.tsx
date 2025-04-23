import { Button, Form, Input, Password } from "@/core/components/base";
import { css } from "@emotion/css";
import { memo } from "react";

const LoginForm = memo(() => (
  <>
    <Form.Item<{ username: string }>
      label="نام کاربری"
      name="username"
      layout="vertical"
      rules={[
        {
          required: true,
          message: "لطفا نام کاربری خود را وارد کنید !",
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item<{ password: string }>
      label="رمز عبور"
      name="password"
      layout="vertical"
      rules={[
        {
          required: true,
          message: "لطفا رمز عبور خود را وارد کنید !",
        },
      ]}
    >
      <Password />
    </Form.Item>

    <Form.Item label={null}>
      <Button
        type="primary"
        block
        htmlType="submit"
        className={css`
          margin-top: 0.5rem;
        `}
      >
        ورود
      </Button>
    </Form.Item>
  </>
));

export default LoginForm;
