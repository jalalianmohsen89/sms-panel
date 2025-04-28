import { Button } from "@/core/components/base/button";
import { Col } from "@/core/components/base/col";
import { Flex } from "@/core/components/base/flex";
import { Form } from "@/core/components/base/form";
import { Row } from "@/core/components/base/row";
import { Select } from "@/core/components/base/select";
import { Toast } from "@/core/components/base/toast";
import { Typography } from "@/core/components/base/typography";
import { numbersList } from "@/core/feature/sms/service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FC, memo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { assingUser } from "../../service";
import { useStyles } from "./styled";

type Props = {
  onCloseModal: () => void;
  onSubmit: () => void;
};
const AssignNumberToUser: FC<Props> = memo(({ onCloseModal, onSubmit }) => {
  const [searchParams] = useSearchParams();
  const [formProps, setFormProps] = useState<any>({
    user: searchParams.get("user"),
  });

  const { styles } = useStyles();
  // -------------------- mutation --------------------------
  const { mutate: assingUserRequest } = useMutation({
    mutationFn: assingUser,
    onSuccess: ({ data }) => {
      if (data.statusCode === 200) {
        Toast.success("ثبت نام با موفقیت انجام شد");
        onCloseModal();
        onSubmit();
      }
    },
  });

  const { data: numbers } = useQuery({
    queryKey: ["numbers"],
    queryFn: numbersList,
    select: ({ data }) =>
      data.data.map((item: any) => ({
        label: item.number,
        // eslint-disable-next-line no-underscore-dangle
        value: item._id.toString(),
      })),
  });

  // -------------------- methods --------------------------
  const onFinish = () => {
    assingUserRequest(formProps);
  };

  return (
    <Form
      name="basic"
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      className={styles.formWidth}
    >
      <Flex vertical gap={20} className={styles.formContainer}>
        <Typography className={styles.formTitle}>الصاق شماره جدید</Typography>
        <Flex vertical gap={30}>
          <Row>
            <Col span={24}>
              <Select
                label="انتخاب شماره"
                options={numbers}
                placeholder="انتخاب کنید..."
                value={formProps.number}
                size="large"
                onChange={(value) =>
                  setFormProps({ ...formProps, number: value })
                }
              />
            </Col>
          </Row>
          <Row>
            <Col span={24} className={styles.formButtonContainer}>
              <Button type="primary" size="large" htmlType="submit">
                تایید
              </Button>
            </Col>
          </Row>
        </Flex>
      </Flex>
    </Form>
  );
});

export default AssignNumberToUser;
