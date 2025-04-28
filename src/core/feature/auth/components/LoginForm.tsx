import { Button } from "@/core/components/base/button";
import { Input, Password } from "@/core/components/base/input";
import { Form } from "@/core/components/base/form";
import { memo } from "react";
import { useStyles } from "./styled";

const LoginForm = memo(() => {
  const { styles } = useStyles();

  return (
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
          className={styles.button}
        >
          ورود
        </Button>
      </Form.Item>
    </>
  );
});

export default LoginForm;
