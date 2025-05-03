import AuthLayout from "@/app/layouts/AuthLayout";
import { Toast } from "@/core/components/base/toast";
import { Link } from "@/core/components/base";
import { Flex } from "@/core/components/base/flex";
import { Form } from "@/core/components/base/form";
import { Typography } from "@/core/components/base/typography";
import RegisterForm from "@/core/feature/auth/components/RegisterForm";
import { registerMobile } from "@/core/feature/auth/service";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useStyles } from "@/core/feature/auth/styled";

const Register = () => {
  // -------------------- state --------------------------
  const navigate = useNavigate();
  const { styles } = useStyles();
  // -------------------- mutation --------------------------
  const { mutate: registerMobileRequest } = useMutation({
    mutationFn: registerMobile,
    onSuccess: () => {
      Toast.success("ثبت نام با موفقیت انجام شد");
      navigate("/auth/login");
    },
  });

  // -------------------- methods --------------------------

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
          onFinish={registerMobileRequest}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          className={styles.width}
        >
          <Flex className={styles.titleContainer}>
            <Typography className={styles.title}>ثبت نام در سامانه</Typography>
          </Flex>
          <RegisterForm />
          <Link href="/auth/login">وارد شوید...</Link>
        </Form>
      </Flex>
    </AuthLayout>
  );
};

export default Register;
