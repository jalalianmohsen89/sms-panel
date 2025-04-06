import { FC, ReactNode } from "react";
import { Form as BaseForm, FormProps } from "antd";
import Item from "antd/es/form/FormItem";
import List from "antd/es/form/FormList";
import { useForm } from "antd/lib/form/Form";

type Props = Pick<
  FormProps,
  | "name"
  | "id"
  | "labelCol"
  | "wrapperCol"
  | "initialValues"
  | "autoComplete"
  | "style"
  | "variant"
  | "form"
  | "size"
  | "disabled"
  | "validateMessages"
  | "layout"
  | "className"
  | "onFinish"
  | "onFinishFailed"
  | "onValuesChange"
> & {
  children?: ReactNode;
};
export const Form: FC<Props> & {
  Item: typeof Item;
  List: typeof List;
  useForm: typeof useForm;
} = (props) => <BaseForm {...props} />;

Form.Item = Item;
Form.List = List;
Form.useForm = useForm;

export { useForm };
