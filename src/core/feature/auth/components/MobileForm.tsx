import { Button, Form, Input } from "@/core/components/base";
import { css } from "@emotion/css";

const MobileForm = () => (
  <>
    <Form.Item<{ mobile: string }>
      label="تلفن همراه"
      name="mobile"
      layout="vertical"
      rules={[
        {
          required: true,
          message: "لطفا تلفن همراه خود را وارد کنید !"
        },
        {
          pattern: /^[0-9]+$/,
          message: "شماره موبایل فقط باید شامل اعداد باشد"
        }
      ]}
    >
      <Input placeholder="مثال: 09123456789" maxLength={11} />
    </Form.Item>

    <Form.Item label={null}>
      <Button
        type="primary"
        block
        htmlType="submit"
        className={css`
          margin-top: 0.5rem;
        `}
      >
        دریافت کد تایید
      </Button>
    </Form.Item>
  </>
);

export default MobileForm;
