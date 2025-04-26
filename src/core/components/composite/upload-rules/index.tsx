import Excel from "@/core/assets/images/svg/excel.svg";
import {
  Button,
  Flex,
  Toast,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
} from "@/core/components/base";
import { Upload as UploadIcon } from "@/core/icons";
import { css } from "@emotion/css";
import { FC, memo, useState } from "react";
import Svg from "react-inlinesvg";
import { useStyles } from "./styled";

type Props = {
  onChange: (file: any) => void;
};
export const UploadRules: FC<Props> = memo(({ onChange }) => {
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
  const { styles } = useStyles();

  return (
    <Flex
      vertical
      gap={20}
      align="center"
      justify="center"
      className={styles.uploadRuleContainer}
    >
      <Flex align="center" justify="center" className={styles.excelContainer}>
        <Flex className={styles.excelIconBox}>
          <Svg src={Excel} className={styles.excelIcon} />
        </Flex>
      </Flex>
      <ul className={styles.uploadAlertList}>
        <li className={styles.uploadAlertItem}>
          <Typography className={styles.uploadAlertText}>
            در صورتی که بیش از 500,000 گیرنده در فایل شما وجود دارد یا حجم فایل
            بیش از حد مجاز است، لطفا از ابزار بالا استفاده کنید.
          </Typography>
        </li>
        <li className={styles.uploadAlertItem}>
          <Typography className={styles.uploadAlertText}>
            اولین ستون از فایل Excel شما حتما باید شماره گیرنده باشد.
          </Typography>
        </li>
        <li className={styles.uploadAlertItem}>
          <Typography className={styles.uploadAlertText}>
            شماره ستون های مشخص شده درون متن باید با شماره ستون های فایل Excel
            برابر باشد.
          </Typography>
        </li>
        <li className={styles.uploadAlertItem}>
          <Typography className={styles.uploadAlertText}>
            در صورتیکه شماره نامعتبری در گیرندگان باشد محاسبه نمی‌شود.
          </Typography>
        </li>
        <li className={styles.uploadAlertItem}>
          <Typography className={styles.uploadAlertText}>
            حداکثر تعداد گیرندگان 500,000 گیرنده می‌باشد.
          </Typography>
        </li>
        <li className={styles.uploadAlertItem}>
          <Typography className={styles.uploadAlertText}>
            تعداد ستون ها محدودیت ندارد.
          </Typography>
        </li>
      </ul>
      <Flex vertical align="center" gap={8}>
        <Typography className={styles.uploadAlertText}>
          فرمت مجاز جهت آپلود فایل xls, xlsx می‌باشد.
        </Typography>
        <Typography className={styles.uploadAlertText}>
          حجم فایل بیشتر از 70 مگابایت نمیتواند باشد.
        </Typography>
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
});
