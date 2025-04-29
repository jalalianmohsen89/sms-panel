import { FC } from "react";
import { default as BaseUpload } from "antd/es/upload";
import type { UploadFile, UploadProps } from "antd/es/upload";

export type Props = Pick<
  UploadProps,
  | "type"
  | "name"
  | "defaultFileList"
  | "fileList"
  | "action"
  | "directory"
  | "data"
  | "method"
  | "headers"
  | "showUploadList"
  | "multiple"
  | "accept"
  | "beforeUpload"
  | "onChange"
  | "onDrop"
  | "listType"
  | "className"
  | "onPreview"
  | "onDownload"
  | "onRemove"
  | "style"
  | "disabled"
  | "withCredentials"
  | "openFileDialogOnClick"
  | "locale"
  | "previewFile"
  | "transformFile"
  | "iconRender"
  | "isImageUrl"
  | "progress"
  | "maxCount"
  | "children"
  | "action"
>;
export const Upload: FC<Props> = (props) => <BaseUpload {...props} />;

export type { UploadFile };
