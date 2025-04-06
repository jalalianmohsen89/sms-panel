import AuthLayout from "@/app/layouts/AuthLayout";
import { Flex, Form, Toast, Typography } from "@/core/components/base";
import MobileForm from "@/core/feature/auth/components/MobileForm";
import OtpForm from "@/core/feature/auth/components/OtpForm";
import { sendMobile, sendOtp } from "@/core/feature/auth/server";
import { FormPropsType } from "@/core/feature/auth/type";
import useStore from "@/core/store";
import { css } from "@emotion/css";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const Login = () => {
  // -------------------- variables --------------------------
  const [level, setLevel] = useState<number>(1);
  const timerValue = 1000 * 60 * 2;
  const [timer, setTimer] = useState(timerValue);
  const [formProps, setFormProps] = useState<FormPropsType>({
    mobile: "",
    otp: ""
  });

  // -------------------- hooks --------------------------
  const { login } = useStore();

  // -------------------- mutation --------------------------
  const { mutate: sendMobileRequest } = useMutation({
    mutationFn: sendMobile,
    onSuccess: () => {
      setLevel(2);
    }
  });

  const { mutate: sendOtpRequest } = useMutation({
    mutationFn: sendOtp,
    onSuccess: ({ data }) => {
      if (data.data.user) {
        login(data.data.user, data.data.access_token);
      } else {
        Toast.error("کاربری با این مشخصات یافت نشد");
        setLevel(1);
      }
    }
  });

  // -------------------- methods --------------------------
  const onSendMobile = (values: any) => {
    setFormProps({
      mobile: values.mobile,
      otp: ""
    });
    sendMobileRequest(values);
  };

  const onFinishFailed = () => {
    Toast.error("اطلاعات وارد شده صحیح نمی باشد");
  };

  const onSendCode = (values: any) => {
    setFormProps({
      ...formProps,
      otp: values.otp
    });
    sendOtpRequest({ ...formProps, otp: values.otp });
  };

  const onSendCodeFailed = () => {
    Toast.error("کد وارد شده صحیح نمی باشد");
  };

  // -------------------- render --------------------------
  return (
    <AuthLayout>
      <Form
        name="basic"
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={level === 1 ? onSendMobile : onSendCode}
        onFinishFailed={level === 1 ? onFinishFailed : onSendCodeFailed}
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
        {level === 1 ? (
          <MobileForm />
        ) : (
          <OtpForm timer={timer} setTimer={setTimer} timerValue={timerValue} />
        )}
      </Form>
    </AuthLayout>
  );
};

export default Login;
