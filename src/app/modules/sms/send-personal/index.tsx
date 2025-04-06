import {
  Button,
  Col,
  DatePickerJalali,
  Flex,
  Form,
  Input,
  MyEditor,
  Radio,
  Row,
  TextArea,
  Typography,
  useForm
} from "@/core/components/base";
import { Section } from "@/core/styled";
import { theme as themeContent } from "@/core/theme";
import { css } from "@emotion/css";
import { useState } from "react";

const SendPersonal = () => {
  const [formProps, setFormProps] = useState<any>({});
  const [form] = useForm();
  const { token } = themeContent.useToken();

  const onFinish = () => {
    // console.log("onFinish", formProps);
  };

  return (
    <Section token={token}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Typography
          className={css`
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 2rem;
          `}
        >
          ارسال پیامک
        </Typography>
        <Flex
          vertical
          gap={40}
          justify="space-between"
          className={css`
            height: 100%;
            flex-wrap: wrap;
            align-content: space-between;
          `}
        >
          <Flex
            vertical
            gap={20}
            className={css`
              width: 100%;
            `}
          >
            <Row gutter={[20, 20]} align="bottom">
              <Col span={6}>
                <Input
                  label="خط ارسال کننده پیام"
                  value={formProps?.senderLine}
                  size="large"
                  onChange={(e) =>
                    setFormProps({
                      ...formProps,
                      senderLine: e.target.value
                    })
                  }
                />
              </Col>
              <Col span={2}>
                <Typography>زمان ارسال</Typography>
              </Col>
              <Col span={3}>
                <Radio name="now">هم اکنون</Radio>
              </Col>
              <Col span={4}>
                <Radio name="now">در تاریخ مشخص</Radio>
              </Col>
              <Col span={8}>
                <DatePickerJalali label="تاریخ و ساعت ارسال" showTime />
              </Col>
            </Row>
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <TextArea
                  label="گیرندگان پیام"
                  value={formProps?.text}
                  size="large"
                  onChange={(e) =>
                    setFormProps({
                      ...formProps,
                      text: e.target.value
                    })
                  }
                />
              </Col>
            </Row>
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <MyEditor onChange={() => onFinish()} />
              </Col>
              <Col span={24}>
                <Typography className={css``}>تعداد کارکتر: {}</Typography>
              </Col>
            </Row>
          </Flex>

          <Flex
            justify="end"
            gap={20}
            className={css`
              margin-left: 20px;
              margin-top: 2rem;
            `}
          >
            <Button
              type="primary"
              htmlType="submit"
              className={css`
                width: 60px;
              `}
            >
              تایید
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Section>
  );
};

export default SendPersonal;
