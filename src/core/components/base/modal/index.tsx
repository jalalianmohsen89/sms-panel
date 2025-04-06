import { FC } from "react";
import { Modal as BaseModal, ModalProps } from "antd";
import { ModalFuncProps } from "antd/es/modal/interface";

type Props = Pick<
  ModalProps,
  | "open"
  | "confirmLoading"
  | "title"
  | "onOk"
  | "onCancel"
  | "afterClose"
  | "afterOpenChange"
  | "centered"
  | "width"
  | "okText"
  | "okType"
  | "cancelText"
  | "maskClosable"
  | "forceRender"
  | "okButtonProps"
  | "cancelButtonProps"
  | "destroyOnClose"
  | "style"
  | "className"
  | "zIndex"
  | "closeIcon"
  | "children"
  | "mousePosition"
  | "visible"
  | "loading"
  | "footer"
  | "closable"
> &
  Pick<ModalFuncProps, "type">;
export const Modal: FC<Props> & {
  confirm: typeof BaseModal.confirm;
  info: typeof BaseModal.info;
  success: typeof BaseModal.success;
  error: typeof BaseModal.error;
  warning: typeof BaseModal.warning;
} = (props) => <BaseModal {...props} />;

Modal.confirm = BaseModal.confirm;
Modal.info = BaseModal.info;
Modal.success = BaseModal.success;
Modal.error = BaseModal.error;
Modal.warning = BaseModal.warning;
