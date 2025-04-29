import { FC } from "react";
import { default as BaseImage } from "antd/es/image";
import type { ImageProps } from "antd/es/image";

type Props = Pick<
  ImageProps,
  | "src"
  | "width"
  | "height"
  | "wrapperClassName"
  | "wrapperStyle"
  | "placeholder"
  | "fallback"
  | "preview"
  | "onPreviewClose"
  | "onClick"
  | "onError"
  | "alt"
  | "loading"
>;
export const Image: FC<Props> = (props) => <BaseImage {...props} />;
