import { Button, Flex, Typography, Image } from "@/core/components/base";
import { css } from "@emotion/css";
import { FC } from "react";
import { Link } from "react-router-dom";

const Error500: FC = () => (
  <Flex
    vertical
    justify="center"
    align="center"
    className={css`
      width: 100%;
      height: 80vh;
    `}
  >
    {/* begin::Illustration */}
    <Flex
      className={css`
        margin-bottom: 3rem;
      `}
    >
      <Image src="/media/500.svg" preview={false} />
    </Flex>
    {/* end::Illustration */}
    {/* begin::Text */}
    <Typography
      className={css`
        font-size: 1.5rem;
        font-weight: 500;
        color: #333;
      `}
    >
      خطایی نامشخص رخ داده است
    </Typography>
    {/* end::Text */}

    {/* begin::Link */}
    <Button
      className={css`
        margin-top: 2rem;
      `}
    >
      <Link to="/">بازگشت به صفحه اصلی</Link>
    </Button>
    {/* end::Link */}
  </Flex>
);

export { Error500 };
