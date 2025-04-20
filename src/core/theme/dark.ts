import { ThemeConfig } from "antd";

export const darkTheme: ThemeConfig = {
  token: {
    colorBgContainer: "#1d1e24",
    colorBgLayout: "#141519",
    colorPrimary: "#1A85F6",
    colorPrimaryText: "#4D9BF8",
    colorSuccess: "#028764",
    colorSuccessText: "#3EA17F",
    colorError: "#D93953",
    colorErrorText: "#EC7388",
    colorWarning: "#F8AB17",
    colorWarningText: "#FDD663",
    colorText: "#F8F8F9",
    colorIcon: "#F8F8F9",
    colorBgSolid: "#2a2c34",
    colorFillTertiary: "#1d1e24",
    colorFillSecondary: "#32333e",
    colorInfo: "#1A85F6",
    colorBorder: "rgba(232, 234, 237, 0.2)",
    colorTextSecondary: "#F8F8F994",
    colorBgBase: "#F8F8F994",
    colorBgElevated: "#F8F8F994",
    colorBgMask: "#F8F8F994",
    fontFamily: "Vazir",
  },
  components: {
    Alert: {
      // پس‌زمینه‌های خیلی ملایم‌تر
      colorSuccessBg: "#162923", // سبز تیره‌تر و ملایم‌تر
      colorInfoBg: "#131B29", // آبی تیره‌تر و ملایم‌تر
      colorWarningBg: "#292218", // قهوه‌ای تیره‌تر و ملایم‌تر
      colorErrorBg: "#291B1E", // قرمز تیره‌تر و ملایم‌تر

      // بقیه مقادیر بدون تغییر
      colorSuccessBorder: "#3EA17F",
      colorSuccessText: "#3EA17F",
      colorInfoBorder: "#4D9BF8",
      colorInfoText: "#4D9BF8",
      colorWarningBorder: "#F8AB17",
      colorWarningText: "#F8AB17",
      colorErrorBorder: "#EC7388",
      colorErrorText: "#EC7388",
    },
    Button: {
      primaryShadow: "none",
      dangerShadow: "none",
      colorBgContainer: "#1d1e246e",
      colorLink: "#4D9BF8",
      colorBgContainerDisabled: "#343434b5",
      colorTextDisabled: "#F8F8F9",
      colorError: "#D93953",
      colorErrorActive: "#A72A3F",
      colorErrorHover: "#EC7388",
      colorErrorBorderHover: "#EC7388",
      colorErrorBg: "#FFD8DA",
    },
    Menu: {
      dangerItemSelectedColor: "#EC7388",
      itemSelectedBg: "#34374166",
      itemSelectedColor: "#898E94",
      colorIcon: "#4D9BF8",
      groupTitleColor: "#898E94",
      colorSplit: "#fdfdfd1f",
      groupTitleFontSize: 14,
    },
    Input: {
      colorTextPlaceholder: "#F8F8F999",
      colorBorder: "#F8F8F93d",
      colorErrorText: "#EC7388",
      colorError: "#EC7388",
      activeShadow: "#4D9BF81a",
    },
    Select: {
      colorTextPlaceholder: "#F8F8F999",
      colorBorder: "#F8F8F93d",
      colorBgElevated: "#1d1e24",
      optionSelectedBg: "#2a2c34",
      optionActiveBg: "#F8F8F999",
      colorTextQuaternary: "#F8F8F9",
      activeOutlineColor: "#1A85F64d",
      colorErrorOutline: "#ffffff00",
      colorError: "#EC7388",
      colorWarningOutline: "#fdfdfd00",
    },
    Checkbox: {
      colorPrimary: "#4D9BF8",
      colorBgContainerDisabled: "#343434b5",
      colorTextDisabled: "#F8F8F994",
      colorPrimaryHover: "#6DAAF7",
    },
    Radio: {
      colorPrimary: "#4D9BF8",
      colorBgContainerDisabled: "#343434b5",
      colorTextDisabled: "#F8F8F994",
      colorPrimaryHover: "#6DAAF7",
    },
    Pagination: {
      itemActiveColorDisabled: "#7d7d7e",
      itemActiveBgDisabled: "#8e8e8e14",
      colorPrimary: "#4D9BF8",
      colorTextDisabled: "#898E94",
      controlOutlineWidth: 0,
      lineWidthFocus: 0,
    },
    Cascader: {
      colorSplit: "#fdfdfd1f",
      colorBorder: "#EC7388",
      optionSelectedBg: "#1A85F6",
      colorHighlight: "#4D9BF8",
      colorTextDescription: "#F8F8F9",
    },
    Form: {
      labelRequiredMarkColor: "#EC7388",
      colorError: "#EC7388",
    },
    Upload: {
      colorPrimaryHover: "#4D9BF8",
    },
    Descriptions: {
      colorTextSecondary: "#898E94",
    },
    Empty: {
      colorTextDescription: "#898E94",
    },
    Popover: {
      colorBgElevated: "#2a2c34",
    },
    Segmented: {
      itemColor: "#F8F8F9",
      itemSelectedBg: "#2a2c34",
    },
    Table: {
      colorLink: "#1D61BA",
      colorLinkHover: "#4D9BF8",
      borderColor: "#fdfdfd1f",
    },
    Tabs: {
      itemSelectedColor: "#4D9BF8",
      itemHoverColor: "#1D61BA",
      inkBarColor: "#1D61BA",
    },
    Tooltip: {
      colorBgSpotlight: "#2a2c34",
    },
    Tree: {
      colorText: "#F8F8F9",
      colorTextDisabled: "#F8F8F978",
      directoryNodeSelectedBg: "#1A85F6",
      nodeSelectedBg: "#2a2c34",
    },
    Drawer: {
      colorBgElevated: "#1d1e24",
      colorSplit: "#fdfdfd61",
    },
    Message: {
      contentBg: "#25262e",
    },
    Modal: {
      contentBg: "#25262e",
      headerBg: "#343741",
      colorText: "#898E94",
    },
    Notification: {
      colorBgElevated: "#25262e",
    },
    Result: {
      colorTextDescription: "#898E94",
    },
    Spin: {
      colorPrimary: "#4D9BF8",
    },
    Dropdown: {
      colorBgElevated: "#2a2c34",
      colorError: "#A72A3F",
      colorTextDisabled: "#898E94",
    },
    Divider: {
      colorSplit: "rgba(232, 234, 237, 0.2)",
    },
    DatePicker: {
      colorTextPlaceholder: "#F8F8F999",
      colorTextDisabled: "#fdfdfd61",
      colorText: "#F8F8F9",
      colorTextHeading: "#13c2c2",
      colorIcon: "#F8F8F9",
      colorBgElevated: "#1d1e24",
    },
  },
};
