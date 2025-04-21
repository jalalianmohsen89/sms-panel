import {
  Button,
  Col,
  Flex,
  Form,
  Row,
  Select,
  Toast,
  Typography,
} from "@/core/components/base";
import { numbersList } from "@/core/feature/sms/service";
import { css } from "@emotion/css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { assingUser } from "../../service";

type Props = {
  onCloseModal: () => void;
  onSubmit: () => void;
};
const AssignNumberToUser: FC<Props> = ({ onCloseModal, onSubmit }) => {
  const [searchParams] = useSearchParams();
  const [formProps, setFormProps] = useState<any>({
    user: searchParams.get("user"),
  });
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
      className={css`
        width: 100%;
      `}
    >
      <Flex
        vertical
        gap={20}
        className={css`
          margin-bottom: 1.5rem;
        `}
      >
        <Typography
          className={css`
            font-size: 1.2rem;
            font-weight: 500;
          `}
        >
          الصاق شماره جدید
        </Typography>
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
            <Col
              span={24}
              className={css`
                display: flex;
                flex-direction: row-reverse;
              `}
            >
              <Button type="primary" size="large" htmlType="submit">
                تایید
              </Button>
            </Col>
          </Row>
        </Flex>
      </Flex>
    </Form>
  );
};

export default AssignNumberToUser;
