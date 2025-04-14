import { FC } from "react";
import { Upload as BaseUpload, UploadFile, UploadProps } from "antd";

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
