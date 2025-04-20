import AuthLayout from "@/app/layouts/AuthLayout";
import { Flex, Form, Link, Toast, Typography } from "@/core/components/base";
import LoginForm from "@/core/feature/auth/components/LoginForm";
import { loginMobile } from "@/core/feature/auth/server";
import useStore from "@/core/store";
import { css } from "@emotion/css";
import { useMutation } from "@tanstack/react-query";
import { theme as themeContent } from "@/core/theme";

const Login = () => {
  // -------------------- hooks --------------------------
  const { token } = themeContent.useToken();
  const { login } = useStore();
  // -------------------- mutation --------------------------
  const { mutate: sendMobileRequest } = useMutation({
    mutationFn: loginMobile,
    onSuccess: ({ data }) => {
      if (data.data.user) {
        login(data.data.user, data.data.access_token);
      } else {
        Toast.error("کاربری با این مشخصات یافت نشد");
      }
    },
  });

  // -------------------- methods --------------------------
  const onSendMobile = (values: any) => {
    sendMobileRequest(values);
  };

  const onFinishFailed = () => {
    Toast.error("اطلاعات وارد شده صحیح نمی باشد");
  };

  // -------------------- render --------------------------
  return (
    <AuthLayout>
      <Flex
        className={css`
          width: 80%;
          max-width: 350px;
          background-color: ${token.colorBgContainer};
          border-radius: 10px;
          padding: 1.5rem;
          margin: 1rem 0 15%;
        `}
      >
        <Form
          name="basic"
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onSendMobile}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          className={css`
            width: 100%;
          `}
        >
          <Flex
            className={css`
              margin-bottom: 1.5rem;
            `}
          >
            <Typography
              className={css`
                font-size: 1.2rem;
                font-weight: 500;
              `}
            >
              ورود به سامانه
            </Typography>
          </Flex>
          <LoginForm />
          <Link href="/auth/register">ثبت نام کنید...</Link>
        </Form>
      </Flex>
    </AuthLayout>
  );
};

export default Login;
