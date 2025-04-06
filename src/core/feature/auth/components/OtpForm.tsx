import { FC } from "react";
import {
  Button,
  Flex,
  Form,
  OTP,
  Text,
  Countdown
} from "@/core/components/base";
import { css } from "@emotion/css";
import { theme as themeContent } from "@/core/theme";
import { RiRefreshLine } from "react-icons/ri";

type Props = {
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  timerValue: number;
};

const OtpForm: FC<Props> = ({ timer, setTimer, timerValue }) => {
  // ---------------------- hooks ----------------------
  const { token } = themeContent.useToken();

  // ---------------------- render ----------------------
  return (
    <>
      <Form.Item<{ otp: string }>
        label="کد تایید"
        name="otp"
        layout="vertical"
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
        `}
        rules={[
          {
            required: true,
            message: "لطفا کد تایید خود را وارد کنید !"
          }
        ]}
      >
        <OTP
          length={5}
          className={css`
            width: 100%;
          `}
        />
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
      <Flex vertical justify="center" align="center">
        {timer > 0 ? (
          <>
            <Text type="secondary">ارسال مجدد کد تا </Text>
            <Countdown
              className={css`
                color: red !important;
              `}
              format="mm:ss"
              value={Date.now() + timer}
              onChange={(value) => {
                setTimer(value as any);
              }}
            />
          </>
        ) : (
          <Flex
            align="center"
            justify="center"
            gap={5}
            onClick={() => {
              setTimer(timerValue);
            }}
          >
            <Text type="secondary">ارسال مجدد کد</Text>
            <RiRefreshLine color={token.colorPrimary} />
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default OtpForm;
