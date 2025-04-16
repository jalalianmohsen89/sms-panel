import Excel from "@/core/assets/images/svg/excel.svg";
import {
  Flex,
  Toast,
  Upload,
  UploadProps,
  UploadFile,
  Button,
} from "@/core/components/base";
import {
  UploadAlertItem,
  UploadAlertList,
  UploadAlertText,
} from "@/core/feature/sms/styled";
import { Upload as UploadIcon } from "@/core/icons";
import { theme as themeContent } from "@/core/theme";
import { css } from "@emotion/css";
import { FC, useState } from "react";
import Svg from "react-inlinesvg";

type Props = {
  onChange: (file: any) => void;
};
export const UploadRules: FC<Props> = ({ onChange }) => {
  const { token } = themeContent.useToken();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const propsImage: UploadProps = {
    fileList: fileList,
    beforeUpload: (file) => {
      const isExcel =
        [
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/octet-stream", // برای برخی مرورگرها
        ].includes(file.type) ||
        [".xls", ".xlsx"].some((ext) => file.name.toLowerCase().endsWith(ext));

      if (!isExcel) {
        Toast.error(`${file.name} فایل اکسل معتبر نیست (فقط xls یا xlsx)`);

        return false;
      }

      // فقط یک فایل اجازه دهید انتخاب شود
      setFileList([file]);
      onChange(file);

      return false; // جلوگیری از آپلود خودکار
    },
    onChange: ({ fileList }) => {
      setFileList(fileList);
    },
    onRemove: () => {
      setFileList([]);

      return true;
    },
    multiple: false,
    showUploadList: true,
    accept: ".xls,.xlsx",
  };

  return (
    <Flex
      vertical
      gap={20}
      align="center"
      justify="center"
      className={css`
        border: 1px dashed ${token.colorBorder};
        border-radius: 6px;
        padding: 2rem;
        margin: 30px 0 20px 20px;
      `}
    >
      <Flex
        align="center"
        justify="center"
        className={css`
          width: 100px;
          height: 100px;
          background-color: rgb(225 247 239/0.6);
          border-radius: 50%;
        `}
      >
        <Flex
          className={css`
            width: 30px;
          `}
        >
          <Svg
            src={Excel}
            className={css`
              fill: #1cc086;
            `}
          />
        </Flex>
      </Flex>
      <UploadAlertList token={token}>
        <UploadAlertItem>
          <UploadAlertText token={token}>
            در صورتی که بیش از 500,000 گیرنده در فایل شما وجود دارد یا حجم فایل
            بیش از حد مجاز است، لطفا از ابزار بالا استفاده کنید.
          </UploadAlertText>
        </UploadAlertItem>
        <UploadAlertItem>
          <UploadAlertText token={token}>
            اولین ستون از فایل Excel شما حتما باید شماره گیرنده باشد.
          </UploadAlertText>
        </UploadAlertItem>
        <UploadAlertItem>
          <UploadAlertText token={token}>
            شماره ستون های مشخص شده درون متن باید با شماره ستون های فایل Excel
            برابر باشد.
          </UploadAlertText>
        </UploadAlertItem>
        <UploadAlertItem>
          <UploadAlertText token={token}>
            در صورتیکه شماره نامعتبری در گیرندگان باشد محاسبه نمی‌شود.
          </UploadAlertText>
        </UploadAlertItem>
        <UploadAlertItem>
          <UploadAlertText token={token}>
            حداکثر تعداد گیرندگان 500,000 گیرنده می‌باشد.
          </UploadAlertText>
        </UploadAlertItem>
        <UploadAlertItem>
          <UploadAlertText token={token}>
            تعداد ستون ها محدودیت ندارد.
          </UploadAlertText>
        </UploadAlertItem>
      </UploadAlertList>
      <Flex vertical align="center" gap={8}>
        <UploadAlertText token={token}>
          فرمت مجاز جهت آپلود فایل xls, xlsx می‌باشد.
        </UploadAlertText>
        <UploadAlertText token={token}>
          حجم فایل بیشتر از 70 مگابایت نمیتواند باشد.
        </UploadAlertText>
        <Flex
          align="center"
          className={css`
            margin-top: 1rem;
          `}
        >
          <Upload {...propsImage}>
            <Button
              variant="dashed"
              color="primary"
              size="large"
              icon={<UploadIcon size={20} />}
            >
              انتخاب فایل
            </Button>
          </Upload>
        </Flex>
      </Flex>
    </Flex>
  );
};
