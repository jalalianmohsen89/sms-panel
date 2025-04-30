import { Button } from "@/core/components/base/button";
import { Flex } from "@/core/components/base/flex";
import { Image } from "@/core/components/base/image";
import { Typography } from "@/core/components/base/typography";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./styled";

const Error500: FC = () => {
  const { styles } = useStyles();

  return (
    <Flex vertical justify="center" align="center" className={styles.container}>
      {/* begin::Illustration */}
      <Flex className={styles.imageContainer}>
        <Image src="/media/500.svg" preview={false} alt="500" loading="lazy" />
      </Flex>
      {/* end::Illustration */}
      {/* begin::Text */}
      <Typography className={styles.titleContainer}>
        خطایی نامشخص رخ داده است
      </Typography>
      {/* end::Text */}

      {/* begin::Link */}
      <Button className={styles.button}>
        <Link to="/">بازگشت به صفحه اصلی</Link>
      </Button>
      {/* end::Link */}
    </Flex>
  );
};

export { Error500 };
