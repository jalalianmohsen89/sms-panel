import {
  Alert,
  Button,
  Col,
  Flex,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Text,
  Toast,
  Typography,
  useForm,
} from "@/core/components/base";
import { numbersList } from "@/core/feature/sms/service";
import { setWebHook } from "@/core/feature/users/service";
// import { useStyles } from "@/core/feature/users/styled";
import { useStyles as useStylesBase } from "@/core/styled";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const WebhoolSettings = () => {
  const { styles: stylesBase } = useStylesBase(false);
  // const { styles } = useStyles();
  const options = [
    { label: "GET", value: "1" },
    // { label: "POST", value: "2" },
  ];
  // --------------------- hooks ---------------------------
  const [searchParams] = useSearchParams();
  const initFormProps = {
    user: searchParams.get("user"),
    number: searchParams.get("number"),
  };
  const [form] = useForm();
  const [formProps, setFormProps] = useState<any>(initFormProps);
  // --------------------- mutations ---------------------------
  const { mutate: setWebHookRequest } = useMutation({
    mutationFn: setWebHook,
    onSuccess: () => {
      Toast.success("وب هوک با موفقیت ایجاد شد");
      setFormProps(initFormProps);
    },
  });

  const { data: numbers } = useQuery({
    queryKey: ["numbers"],
    queryFn: numbersList,
    select: ({ data }) =>
      data.data.map((item: any) => ({
        label: item.number,
        // eslint-disable-next-line no-underscore-dangle
        value: item._id,
      })),
  });

  // -------------------- methods --------------------------
  const onFinish = () => {
    setWebHookRequest(formProps);
  };

  return (
    <Flex vertical gap={20}>
      <Typography className={stylesBase.titlePage}>
        تنظیمات وب هوک وضعیت دریافت
      </Typography>
      <section className={stylesBase.section}>
        <Flex vertical gap={20}>
          <Flex vertical gap={10}>
            <Typography className={stylesBase.formTitle}>
              تنظیمات وب هوک دریافت چیست؟
            </Typography>
            <Text>
              تنظیمات وب هوک دریافت به شما این امکان را می‌دهد که کلیه پیامک‌های
              دریافتی به خط مورد نظر شما، به آدرس (URL) مشخص شده، ارسال شوند.
              این ابزار به شما این قابلیت را می‌دهد که پیامک‌های دریافتی را به
              صورت خودکار و بدون نیاز به برنامه‌نویسی مستقیماً به سرویس‌ها و
              برنامه‌های دیگر ارسال کنید.
            </Text>
          </Flex>

          <Flex vertical>
            <Flex vertical gap={20}>
              <Typography className={stylesBase.formTitle}>
                نحوه استفاده از تنظیمات وب هوک
              </Typography>
              <Text>برای فعال کردن این قابلیت، شما می‌توانید:</Text>
            </Flex>
            <ul>
              <li>
                <Text>آدرس (URL) مقصد برای دریافت پیامک‌ها را مشخص کنید.:</Text>
              </li>
              <li>
                <Text>
                  پیکربندی پارامترهای مرتبط با ارسال پیامک‌های دریافتی به طور
                  دلخواه.
                </Text>
              </li>
            </ul>
          </Flex>

          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Flex
              vertical
              gap={40}
              justify="space-between"
              className={stylesBase.formContainer}
            >
              <Flex vertical gap={30}>
                <Row gutter={[30, 30]} align="bottom">
                  <Col span={24}>
                    <Select
                      label="شماره خط"
                      disabled
                      value={formProps?.number}
                      size="large"
                      options={numbers}
                      onChange={(option) =>
                        setFormProps({
                          ...formProps,
                          number: option,
                        })
                      }
                    />
                  </Col>
                  <Col span={24}>
                    <Input
                      label="آدرس (URL) ارسال پیامک"
                      value={formProps?.hook}
                      size="large"
                      onChange={(e) =>
                        setFormProps({
                          ...formProps,
                          hook: e.target.value,
                        })
                      }
                    />
                  </Col>
                </Row>
                <Row gutter={[30, 30]} align="bottom" justify="end">
                  <Col span={2}>
                    <Radio.Group
                      block
                      value="1"
                      options={options}
                      // onChange={(e) =>
                      //   setFormProps({ ...formProps, date: e.target.value })
                      // }
                    />
                  </Col>
                </Row>
                <Space>
                  <Alert
                    type="info"
                    showIcon
                    message={
                      <ul>
                        <li>
                          <Typography>
                            مسئولیت درست بودن URL برعهده شما می باشد. توصیه می
                            شود برای دریافت پیامک متد POST را تنظیم نمائید زیرا
                            ممکن است براساس تنظیمات وب سرورتان در پیامک های
                            طولانی بخشی از پیامک را از دست بدهید.
                          </Typography>
                        </li>
                      </ul>
                    }
                  />
                </Space>
                <Flex justify="flex-end" style={{ marginLeft: "2rem" }}>
                  <Button
                    variant="filled"
                    color="primary"
                    size="large"
                    htmlType="submit"
                  >
                    ذخیره تنظیمات
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Form>
        </Flex>
      </section>
    </Flex>
  );
};

export default WebhoolSettings;
