import { Button } from "@/core/components/base/button";
import { Col } from "@/core/components/base/col";
import { DatePickerJalali } from "@/core/components/base/date-picker";
import { Editor } from "@/core/components/base/editor";
import { Flex } from "@/core/components/base/flex";
import { Form, useForm } from "@/core/components/base/form";
import { Input } from "@/core/components/base/input";
import { Radio } from "@/core/components/base/radio";
import { Row } from "@/core/components/base/row";
import { Select } from "@/core/components/base/select";
import { Toast } from "@/core/components/base/toast";
import { Typography } from "@/core/components/base/typography";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CheckboxGroupProps } from "antd/es/checkbox";
import { memo, useState } from "react";
import { sendPersonalSms, userNumberList } from "../../service";
import { useStyles } from "./styled";

const FormPersonalSms = memo(() => {
  // --------------------- variables ---------------------------
  const [formProps, setFormProps] = useState<any>({});
  const options: CheckboxGroupProps<string>["options"] = [
    { label: "هم اکنون", value: "1" },
    { label: "در تاریخ مشخص", value: "2" },
  ];
  // --------------------- hooks ---------------------------
  const [form] = useForm();
  const { styles } = useStyles();

  // --------------------- mutations ---------------------------
  const { mutate: sendPersonalSmsRequest } = useMutation({
    mutationFn: sendPersonalSms,
    onSuccess: () => {
      Toast.success("پیامک با موفقیت ارسال شد");
    },
  });

  const { data: userNumbers } = useQuery({
    queryKey: ["user-numbers"],
    queryFn: userNumberList,
    select: ({ data }) =>
      data.data.map((item: any) => ({
        label: item.number,
        value: item.number.toString(),
      })),
  });

  // -------------------- methods --------------------------
  const onFinish = () => {
    sendPersonalSmsRequest(formProps);
  };
  // --------------------- render ---------------------------

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Typography className={styles.title}>ارسال پیامک</Typography>
      <Flex
        vertical
        gap={40}
        justify="space-between"
        className={styles.formContainer}
      >
        <Flex vertical gap={20} className={styles.width}>
          <Row gutter={[20, 20]} align="bottom">
            <Col span={12}>
              <Input
                label="گیرندگان پیام"
                value={formProps?.to}
                size="large"
                onChange={(e) =>
                  setFormProps({
                    ...formProps,
                    to: e.target.value,
                  })
                }
              />
            </Col>
            <Col span={12}>
              <Select
                label="خط ارسال کننده پیام"
                value={formProps?.number}
                size="large"
                options={userNumbers}
                onChange={(option) =>
                  setFormProps({
                    ...formProps,
                    number: option,
                  })
                }
              />
            </Col>
          </Row>
          <Row align={"bottom"} gutter={[20, 20]}>
            <Col span={2} />
            <Col span={2}>
              <Typography>زمان ارسال</Typography>
            </Col>
            <Col span={8}>
              <Radio.Group
                block
                disabled
                value={formProps.date}
                options={options}
                onChange={(e) =>
                  setFormProps({ ...formProps, date: e.target.value })
                }
              />
            </Col>
            {formProps.date === "2" && (
              <Col span={12}>
                <DatePickerJalali
                  label="تاریخ و ساعت ارسال"
                  showTime
                  size="large"
                />
              </Col>
            )}
          </Row>
          <Row gutter={[20, 20]}>
            <Col span={24} />
            <Col span={24}>
              <Editor
                value={formProps.body}
                onChange={(text: string) =>
                  setFormProps({ ...formProps, body: text })
                }
              />
            </Col>
          </Row>
          <Flex justify="flex-end" className={styles.buttonContainer}>
            <Button
              variant="filled"
              color="primary"
              size="large"
              htmlType="submit"
            >
              ارسال پیام
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Form>
  );
});

export default FormPersonalSms;
