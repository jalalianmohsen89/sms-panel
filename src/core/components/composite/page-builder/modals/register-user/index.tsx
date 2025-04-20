import { Flex, Form, Toast, Typography } from "@/core/components/base";
import RegisterForm from "@/core/feature/auth/components/RegisterForm";
import { registerUser } from "@/core/feature/users/service";
import { css } from "@emotion/css";
import { useMutation } from "@tanstack/react-query";
import { FC } from "react";

type Props = {
  onCloseModal: () => void;
  onSubmit: () => void;
};
const RegisterUser: FC<Props> = ({ onSubmit, onCloseModal }) => {
  // -------------------- mutation --------------------------
  const { mutate: registerUserRequest } = useMutation({
    mutationFn: registerUser,
    onSuccess: ({ data }) => {
      if (data.status === 200) {
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
    </Form>
  );
};

export default RegisterUser;
