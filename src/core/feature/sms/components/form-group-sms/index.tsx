import {
  Col,
  DatePickerJalali,
  Divider,
  Editor,
  Flex,
  Form,
  Grid,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Switch,
  Table,
  Toast,
  Typography,
  useForm
} from "@/core/components/base";
import {
  previewFile,
  uploadFileSms,
  userNumberList
} from "@/core/feature/sms/service";
import { UploadAlertText } from "@/core/feature/sms/styled";
import { EnvelopeArrowUp, Megaphone, Message, Send } from "@/core/icons";
import { theme as themeContent } from "@/core/theme";
import { css } from "@emotion/css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import { CheckboxGroupProps } from "antd/es/checkbox";
import { useState } from "react";
import { ModalGuide, ModalRowKey, ModalRowvalue, ModalTitle } from "./styled";
import UploadRules from "./UploadRules";

const FormGroupSms = () => {
  // --------------------- variables ---------------------------
  const [formProps, setFormProps] = useState<any>({
    //   number: "10003949",
    //   time: "1404/01/25-14:12",
    //   body: "سلام $2$",
  });
  const [preview, setPreview] = useState<any>([]);
  const [isOpenModal, setOpenModal] = useState(false);
  const options: CheckboxGroupProps<string>["options"] = [
    { label: "هم اکنون", value: "1" },
    { label: "در تاریخ مشخص", value: "2" }
  ];
  const columns = [
    {
      title: "ردیف",
      dataIndex: "row",
      key: "row"
    },
    {
      title: "گیرنده",
      dataIndex: "mobile",
      key: "mobile"
    },
    {
      title: "متن",
      dataIndex: "message",
      key: "message"
    }
  ];

  // --------------------- hooks ---------------------------
  const [form] = useForm();
  const { token } = themeContent.useToken();
  const { useBreakpoint } = Grid;
  // --------------------- mutations ---------------------------
  const { mutate: previewFileRequest } = useMutation({
    mutationFn: previewFile,
    onSuccess: ({ data }) => {
      setPreview(
        data.result.map((item: any, index: number) => ({
          row: index + 1,
          mobile: item.mobile,
          message: item.message
        }))
      );
      setOpenModal(true);
    }
  });

  const { mutate: uploadFileSmsRequest } = useMutation({
    mutationFn: uploadFileSms,
    onSuccess: () => {
      Toast.success("پیامک ها در صف ارسال قرار گرفت");
      setOpenModal(false);
      setFormProps({});
    }
  });

  const { data: userNumbers } = useQuery({
    queryKey: ["user-numbers"],
    queryFn: userNumberList,
    select: ({ data }) =>
      data.data.map((item: any) => ({
        label: item.number,
        value: item.number.toString()
      }))
  });

  // -------------------- methods --------------------------
  const onFinish = (isSend: boolean) => {
    const formData = new FormData();

    // formData.append("title", formProps.title);
    formData.append("number", formProps.number);
    formData.append("body", formProps.body);
    formData.append("file", formProps.file);
    if (isSend === true) {
      uploadFileSmsRequest(formData);
    } else previewFileRequest(formData);
  };
  // --------------------- render ---------------------------

  return (
    <>
      <Form form={form} onFinish={() => onFinish(false)}>
        <Flex
          vertical
          gap={20}
          className={css`
            margin: 1rem;
          `}
        >
          <Row
            gutter={[20, 20]}
            className={css`
              margin-bottom: 20px;
            `}
          >
            <Col span={24} md={12}>
              <Input
                label="عنوان ارسال"
                placeholder="به عنوان مثال: تخفیف ویژه"
                size="large"
                value={formProps?.title}
                onChange={(e) =>
                  setFormProps({ ...formProps, title: e.target.value })
                }
              />
            </Col>
            <Col span={24} md={12}>
              <Select
                label="خط ارسال کننده پیام"
                value={formProps?.number}
                options={userNumbers}
                size="large"
                onChange={(option) =>
                  setFormProps({
                    ...formProps,
                    number: option
                  })
                }
              />
            </Col>
          </Row>
          <Row gutter={[20, 20]} align="bottom">
            <Col span={0} md={1} xl={0} />
            <Col span={24} md={4} xl={3}>
              <Typography>زمان ارسال</Typography>
            </Col>
            <Col span={24} md={12} xl={9}>
              <Radio.Group
                block={!useBreakpoint().xs}
                disabled
                // value={formProps.date}
                options={options}
                // onChange={(e) =>
                //   setFormProps({ ...formProps, date: e.target.value })
                // }
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
          <UploadRules
            onChange={(file) => setFormProps({ ...formProps, file })}
          />
          <Flex vertical gap={20}>
            <Flex align="center" gap={10}>
              <UploadAlertText token={token}>
                حذف شماره های تکراری
              </UploadAlertText>
              <Space>
                <Switch
                  checkedChildren="فعال"
                  unCheckedChildren="غیرفعال"
                  defaultChecked
                  disabled
                />
              </Space>
            </Flex>
            <Editor
              value={formProps.body}
              onChange={(text: string) =>
                setFormProps({ ...formProps, body: text })
              }
            />
          </Flex>
          <Flex justify="flex-end">
            <Button
              variant="filled"
              color="primary"
              size="large"
              htmlType="submit"
            >
              پیش نمایش و ارسال
            </Button>
          </Flex>
        </Flex>
      </Form>

      <Modal
        open={isOpenModal}
        onCancel={() => setOpenModal(false)}
        footer={<></>}
      >
        <Flex vertical gap={20}>
          <Flex>
            <ModalTitle>پیش نمایش و ارسال پیام با اکسل</ModalTitle>
          </Flex>
          <Flex
            vertical
            gap={20}
            className={css`
              padding: 0.5rem 1rem;
            `}
          >
            <Flex align="center" justify="space-between">
              <Flex align="center" gap={10}>
                <EnvelopeArrowUp size={18} />
                <ModalRowKey>خط ارسال کننده </ModalRowKey>
              </Flex>
              <Flex align="center" gap={10}>
                <ModalRowvalue token={token}>{formProps.number}</ModalRowvalue>
                <Megaphone size={18} />
              </Flex>
            </Flex>
            {/* <Flex align="center">
            <Typography>زمان ارسال</Typography>
            <Typography>{formProps.title}</Typography>
          </Flex> */}

            <Flex vertical gap={20}>
              <Flex align="center" gap={10}>
                <Message size={18} />
                <ModalRowKey>متن پیام</ModalRowKey>
              </Flex>
              <ModalRowvalue
                token={token}
                className={css`
                  margin-right: 1rem;
                `}
              >
                {formProps.body}
              </ModalRowvalue>
            </Flex>
            {preview?.length > 0 && (
              <Flex vertical gap={20}>
                <Divider />
                <ModalGuide>
                  اگر فایل شما دارای بیش از 100 سطر باشد، تنها 100 سطر اول از آن
                  بررسی و در اینجا نمایش داده خواهند شد و اگر کمتر از 100 سطر
                  باشد، تمام سطرهای آن بررسی و نمایش داده خواهند شد
                </ModalGuide>
                <Table
                  columns={columns}
                  dataSource={preview}
                  pagination={false}
                />
              </Flex>
            )}
            <Flex gap={10} justify="space-between">
              <Button
                type="primary"
                size="large"
                icon={
                  <Send
                    className={css`
                      transform: rotate(180deg);
                    `}
                  />
                }
                onClick={() => onFinish(true)}
              >
                تایید و ارسال پیامک
              </Button>
              <Button type="default" size="large">
                انصراف و اصلاح
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};

export default FormGroupSms;
