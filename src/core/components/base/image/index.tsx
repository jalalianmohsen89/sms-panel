import { FC } from "react";
import { Image as BaseImage, ImageProps } from "antd";

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
