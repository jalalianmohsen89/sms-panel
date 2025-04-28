import { Button } from "@/core/components/base/button";
import { Flex } from "@/core/components/base/flex";
import { Image } from "@/core/components/base/image";
import { Typography } from "@/core/components/base/typography";
import { Link } from "react-router-dom";
import { useStyles } from "./styled";

const Error404 = () => {
  const { styles } = useStyles();

  return (
    <Flex vertical justify="center" align="center" className={styles.container}>
      {/* begin::Illustration */}
      <Flex className={styles.imageContainer}>
        <Image src="/media/404.svg" preview={false} alt="404" loading="lazy" />
      </Flex>
      {/* end::Illustration */}
      {/* begin::Text */}
      <Typography className={styles.titleContainer}>
        صفحه مورد نظر یافت نشد
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

export { Error404 };
