import { Grid, Toast, useForm } from "@/core/components/base";
import {
  previewFile,
  uploadFileSms,
  userNumberList,
} from "@/core/feature/sms/service";
import { theme as themeContent } from "@/core/theme";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CheckboxGroupProps } from "antd/es/checkbox";
import { useState } from "react";

const useFormGroup = () => {
  // --------------------- variables ---------------------------
  const [formProps, setFormProps] = useState<any>({});
  const [preview, setPreview] = useState<any>([]);
  const [isOpenModal, setOpenModal] = useState(false);
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
  const { token } = themeContent.useToken();
  const { useBreakpoint } = Grid;
  // --------------------- mutations ---------------------------
  const { mutate: previewFileRequest } = useMutation({
    mutationFn: previewFile,
    onSuccess: ({ data }) => {
      setPreview(
        data.data.result.map((item: any, index: number) => ({
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

  const { data: userNumbers } = useQuery({
    queryKey: ["user-numbers"],
    queryFn: userNumberList,
    select: ({ data }) =>
      data.data.map((item: any) => ({
        label: item.number,
        value: item.number.toString(),
      })),
  });

  // -------------------- methods --------------------------
  const onFinish = (isSend: boolean) => {
    const formData = new FormData();

    formData.append("title", formProps.title);
    formData.append("number", formProps.number);
    formData.append("body", formProps.body);
    formData.append("file", formProps.file);
    if (isSend === true) {
      uploadFileSmsRequest(formData);
    } else previewFileRequest(formData);
  };

  return {
    columns,
    preview,
    form,
    token,
    isOpenModal,
    setOpenModal,
    formProps,
    setFormProps,
    options,
    userNumbers,
    useBreakpoint,
    onFinish,
  };
};

export default useFormGroup;
