import { Button } from "@/core/components/base/button";
import { Input, Password } from "@/core/components/base/input";
import { Form } from "@/core/components/base/form";
import { Flex } from "@/core/components/base/flex";
import { memo } from "react";
import { useStyles } from "./styled";

const RegisterForm = memo(() => {
  const { styles } = useStyles();

  return (
    <>
      <Flex gap={10}>
        <Form.Item<{ name: string }>
          label="نام"
          className={styles.width}
          name="name"
          layout="vertical"
          rules={[
            {
              required: true,
              message: "لطفا نام خود را وارد کنید !",
            },
          ]}
        >
          <Input placeholder="مثال: علی" />
        </Form.Item>
        <Form.Item<{ family: string }>
          label="نام خانوادگی"
          name="family"
          className={styles.width}
          layout="vertical"
          rules={[
            {
              required: true,
              message: "لطفا نام خانوادگی خود را وارد کنید !",
            },
          ]}
        >
          <Input placeholder="مثال: مقدم" />
        </Form.Item>
      </Flex>
      <Form.Item<{ email: string }>
        label="ایمیل"
        name="email"
        layout="vertical"
        rules={[
          {
            required: true,
            message: "لطفا ایمیل خود را وارد کنید !",
          },
        ]}
      >
        <Input type="email" placeholder="مثال: example@gmail.com" />
      </Form.Item>
      <Form.Item<{ mobile: string }>
        label="تلفن همراه"
        name="mobile"
        layout="vertical"
        rules={[
          {
            required: true,
            message: "لطفا تلفن همراه خود را وارد کنید !",
          },
        ]}
      >
        <Input placeholder="مثال: 09123456789" maxLength={11} />
      </Form.Item>
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
        <Input placeholder="" />
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
      <Form.Item<{ confirmPassword: string }>
        label="تکرار رمز عبور"
        name="confirmPassword"
        layout="vertical"
        rules={[
          {
            required: true,
            message: "لطفا رمز عبور خود را تکرار کنید !",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error("رمز عبور و تکرار آن مطابقت ندارند!"),
              );
            },
          }),
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
          ثبت نام
        </Button>
      </Form.Item>
    </>
  );
});

export default RegisterForm;
