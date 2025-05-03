import { Col } from "@/core/components/base/col";
import { DatePickerJalali } from "@/core/components/base/date-picker";
import { Divider } from "@/core/components/base/divider";
import { Editor } from "@/core/components/base/editor";
import { Flex } from "@/core/components/base/flex";
import { Form } from "@/core/components/base/form";
import { Input } from "@/core/components/base/input";
import { Modal } from "@/core/components/base/modal";
import { Radio } from "@/core/components/base/radio";
import { Row } from "@/core/components/base/row";
import { Space } from "@/core/components/base/space";
import { Switch } from "@/core/components/base/switch";
import { Table } from "@/core/components/base/table";
import { Typography } from "@/core/components/base/typography";
import { Button } from "@/core/components/base/button";
import { UploadRules } from "@/core/components/composite";
import { EnvelopeArrowUp, Megaphone, Message, Send } from "@/core/icons";
import { useStyles as useStylesBase } from "@/core/styled";
import { useFormGroupNotification } from "./hook";
import { useStyles } from "./styled";

const FormGroupNotif = () => {
  const {
    formProps,
    setFormProps,
    preview,
    isOpenModal,
    setOpenModal,
    options,
    columns,
    form,
    useBreakpoint,
    onFinish,
  } = useFormGroupNotification();
  // --------------------- render ---------------------------
  const { styles } = useStyles();
  const { styles: stylesBase } = useStylesBase();
  // --------------------- render ---------------------------

  return (
    <>
      <Form form={form} onFinish={() => onFinish(false)}>
        <Flex vertical gap={20} className={styles.formContainer}>
          <Row gutter={[20, 20]} className={styles.rowMargin}>
            <Col span={24}>
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
            {/* <Col span={24} md={12}>
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
            </Col> */}
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
              <Typography className={styles.uploadAlertText}>
                حذف شماره های تکراری
              </Typography>
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
            <Typography className={stylesBase.modalTitle}>
              پیش نمایش و ارسال پیام با اکسل
            </Typography>
          </Flex>
          <Flex vertical gap={20} className={styles.contentContainer}>
            <Flex align="center" justify="space-between">
              <Flex align="center" gap={10}>
                <EnvelopeArrowUp size={18} />
                <Typography className={stylesBase.modalRowKey}>
                  خط ارسال کننده
                </Typography>
              </Flex>
              <Flex align="center" gap={10}>
                <Typography className={stylesBase.modalRowvalue}>
                  {formProps.number}
                </Typography>
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
                <Typography className={stylesBase.modalRowKey}>
                  متن پیام
                </Typography>
              </Flex>
              <Flex className={styles.textDescriptionContainer}>
                <Typography className={stylesBase.modalRowvalue}>
                  {formProps.body}
                </Typography>
              </Flex>
            </Flex>
            {preview?.length > 0 && (
              <Flex vertical gap={20}>
                <Divider />
                <Typography className={stylesBase.modalGuide}>
                  اگر فایل شما دارای بیش از 100 سطر باشد، تنها 100 سطر اول از آن
                  بررسی و در اینجا نمایش داده خواهند شد و اگر کمتر از 100 سطر
                  باشد، تمام سطرهای آن بررسی و نمایش داده خواهند شد
                </Typography>
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
                icon={<Send className={styles.iconRotate} />}
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

export default FormGroupNotif;
