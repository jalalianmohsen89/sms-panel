import AuthLayout from "@/app/layouts/AuthLayout";
import { Flex, Form, Link, Toast, Typography } from "@/core/components/base";
import RegisterForm from "@/core/feature/auth/components/RegisterForm";
import { registerMobile } from "@/core/feature/auth/server";
import { css } from "@emotion/css";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { theme as themeContent } from "@/core/theme";

const Register = () => {
  // -------------------- state --------------------------
  const navigate = useNavigate();
  const { token } = themeContent.useToken();
  // -------------------- mutation --------------------------
  const { mutate: registerMobileRequest } = useMutation({
    mutationFn: registerMobile,
    onSuccess: () => {
      Toast.success("ثبت نام با موفقیت انجام شد");
      navigate("/auth/login");
    }
  });

  // -------------------- methods --------------------------

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
          margin: 1rem 0;
        `}
      >
        <Form
          name="basic"
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={registerMobileRequest}
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
              ثبت نام در سامانه
            </Typography>
          </Flex>
          <RegisterForm />
          <Link href="/auth/login">وارد شوید...</Link>
        </Form>
      </Flex>
    </AuthLayout>
  );
};

export default Register;
