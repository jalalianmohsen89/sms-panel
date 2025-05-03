import AuthLayout from "@/app/layouts/AuthLayout";
import { Toast } from "@/core/components/base/toast";
import { Link } from "@/core/components/base";
import { Flex } from "@/core/components/base/flex";
import { Form } from "@/core/components/base/form";
import { Typography } from "@/core/components/base/typography";
import LoginForm from "@/core/feature/auth/components/LoginForm";
import { loginMobile } from "@/core/feature/auth/service";
import { useStyles } from "@/core/feature/auth/styled";
import useStore from "@/core/store";
import { useMutation } from "@tanstack/react-query";

const Login = () => {
  // -------------------- hooks --------------------------
  const { login } = useStore();
  const { styles } = useStyles();
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
      <Flex className={styles.container}>
        <Form
          name="basic"
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onSendMobile}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          className={styles.width}
        >
          <Flex className={styles.titleContainer}>
            <Typography className={styles.title}>ورود به سامانه</Typography>
          </Flex>
          <LoginForm />
          <Link href="/auth/register">ثبت نام کنید...</Link>
        </Form>
      </Flex>
    </AuthLayout>
  );
};

export default Login;
