import { FC, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
};
export const MyEditor: FC<Props> = ({ value, onChange }) => {
  const [content, setContent] = useState<string>(value ?? "");

  const onChangeEditor = (value: string) => {
    setContent(value);
    if (onChange) {
      onChange(value);
    }
  };

  // ماژول‌های سفارشی با پشتیبانی RTL
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      // ["link", "image"],
      [{ direction: "rtl" }] // افزودن دکمه جهت‌نما
      // ["clean"]
    ]
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
    "direction" // افزودن فرمت جهت‌نما
  ];

  return (
    <div className="quill-rtl-container">
      <ReactQuill
        theme="snow"
        value={content}
        onChange={(event) => onChangeEditor(event)}
        modules={modules}
        formats={formats}
        placeholder="متن خود را اینجا بنویسید..."
      />
    </div>
  );
};
