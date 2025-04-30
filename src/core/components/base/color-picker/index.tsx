import { Flex } from "@/core/components/base/flex";
import { Typography } from "@/core/components/base/typography";
import { useStyles } from "@/core/styled";
import { theme as themeContent } from "@/core/theme";
import { generate, green, presetPalettes, red } from "@ant-design/colors";
import { default as BaseColorPicker } from "antd/es/color-picker";
import type { ColorPickerProps } from "antd/es/color-picker";
import { GetProp } from "antd/lib/_util/type";
import { FC } from "react";

type Presets = Required<ColorPickerProps>["presets"][number];
type Color = Extract<
  GetProp<ColorPickerProps, "value">,
  string | { cleared: any }
>;

export type Props = Pick<
  ColorPickerProps,
  | "mode"
  | "value"
  | "defaultValue"
  | "children"
  | "open"
  | "disabled"
  | "placement"
  | "format"
  | "defaultFormat"
  | "allowClear"
  | "presets"
  | "arrow"
  | "panelRender"
  | "showText"
  | "size"
  | "rootClassName"
  | "onFormatChange"
  | "onChange"
  | "onClear"
  | "onChangeComplete"
  | "disabledFormat"
> & {
  label?: string;
  withPresets?: boolean;
  onChangeColor?: (color: string) => void;
};
export const ColorPicker: FC<Props> = (props) => {
  const { styles } = useStyles();
  const { token } = themeContent.useToken();
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    presets,
    label,
    withPresets = false,
    value,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onChange,
    onChangeColor,
    ...otherProps
  } = props;

  const changeColor = (colorValue: Color) => {
    const value =
      typeof colorValue === "string" ? colorValue : colorValue!.toHexString();

    onChangeColor?.(value);
  };

  const presetsFn = genPresets({
    primary: generate(token.colorPrimary),
    red,
    green,
  });

  function genPresets(presets = presetPalettes) {
    return Object.entries(presets).map<Presets>(([label, colors]) => ({
      label,
      colors,
      key: label,
    }));
  }

  return (
    <Flex className={styles.formContainer}>
      <Typography className={styles.formTitle}>{label}</Typography>
      <BaseColorPicker
        value={value}
        {...(withPresets && {
          presets: presetsFn,
        })}
        {...otherProps}
        onChange={changeColor}
      />
    </Flex>
  );
};
