import { Typography } from "@/core/components/base/typography";
import { Flex } from "@/core/components/base/flex";
import { Form } from "@/core/components/base/form";
import { Toast } from "@/core/components/base/toast";
import RegisterForm from "@/core/feature/auth/components/RegisterForm";
import { registerUser } from "@/core/feature/users/service";
import { useMutation } from "@tanstack/react-query";
import { FC, memo } from "react";
import { useStyles } from "./styled";

type Props = {
  onCloseModal: () => void;
  onSubmit: () => void;
};
const RegisterUser: FC<Props> = memo(({ onSubmit, onCloseModal }) => {
  const { styles } = useStyles();
  // -------------------- mutation --------------------------
  const { mutate: registerUserRequest } = useMutation({
    mutationFn: registerUser,
    onSuccess: ({ data }) => {
      if (data.statusCode === 200) {
        Toast.success("ثبت نام با موفقیت انجام شد");
        onCloseModal();
        onSubmit();
      }
    },
  });

  // -------------------- methods --------------------------

  const onFinishFailed = () => {
    Toast.error("اطلاعات وارد شده صحیح نمی باشد");
  };

  // -------------------- render --------------------------
  return (
    <Form
      name="basic"
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      onFinish={registerUserRequest}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
      className={styles.width}
    >
      <Flex className={styles.formContainer}>
        <Typography className={styles.title}>ثبت نام در سامانه</Typography>
      </Flex>
      <RegisterForm />
    </Form>
  );
});

export default RegisterUser;
