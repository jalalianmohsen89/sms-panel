import { Grid, Toast, useForm } from "@/core/components/base";
import { previewFile, uploadFileSms } from "@/core/feature/sms/service";
import { useMutation } from "@tanstack/react-query";
import { CheckboxGroupProps } from "antd/es/checkbox";
import { useState } from "react";

const useFormGroupNotification = () => {
  // --------------------- variables ---------------------------
  const [formProps, setFormProps] = useState<any>({});
  const [preview, setPreview] = useState<any>([]);
  const [isOpenModal, setOpenModal] = useState(true);
  const options: CheckboxGroupProps<string>["options"] = [
    { label: "هم اکنون", value: "1" },
    { label: "در تاریخ مشخص", value: "2" },
  ];
  const columns = [
    {
      title: "ردیف",
      dataIndex: "row",
      key: "row",
    },
    {
      title: "گیرنده",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "متن",
      dataIndex: "message",
      key: "message",
    },
  ];

  // --------------------- hooks ---------------------------
  const [form] = useForm();
  const { useBreakpoint } = Grid;
  // --------------------- mutations ---------------------------
  const { mutate: previewFileRequest } = useMutation({
    mutationFn: previewFile,
    onSuccess: ({ data }) => {
      setPreview(
        data.result.map((item: any, index: number) => ({
          row: index + 1,
          mobile: item.mobile,
          message: item.message,
        })),
      );
      setOpenModal(true);
    },
  });

  const { mutate: uploadFileSmsRequest } = useMutation({
    mutationFn: uploadFileSms,
    onSuccess: () => {
      Toast.success("پیامک ها در صف ارسال قرار گرفت");
      setOpenModal(false);
      setFormProps({});
    },
  });

  // -------------------- methods --------------------------
  const onFinish = (isSend: boolean) => {
    const formData = new FormData();

    // formData.append("title", formProps.title);
    formData.append("number", formProps.number);
    formData.append("body", formProps.body);
    formData.append("file", formProps.file);
    if (isSend === true) {
      uploadFileSmsRequest(formData);
    } else previewFileRequest(formData);
  };

  return {
    formProps,
    setFormProps,
    preview,
    isOpenModal,
    setOpenModal,
    options,
    columns,
    form,
    useBreakpoint,
    onFinish,
  };
};

export default useFormGroupNotification;
