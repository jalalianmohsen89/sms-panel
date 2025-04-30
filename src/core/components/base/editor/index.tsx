import { Typography } from "@/core/components/base/typography";
import { Flex } from "@/core/components/base/flex";
import { Space } from "@/core/components/base/space";
import { TextArea } from "@/core/components/base/text-area";
import { FC, useEffect, useState } from "react";
import { useStyles } from "./styled";

type Props = {
  value?: string;
  onChange: (value: string) => void;
};
export const Editor: FC<Props> = ({ value = "", onChange }) => {
  const [textEditor, setTextEditor] = useState<string>(value);
  const [pageCount, setPageCount] = useState(1);
  const [charCount, setCharCount] = useState(0);
  const [lang, setLang] = useState("فارسی");
  const [chars, setChars] = useState(70);
  const { styles } = useStyles();

  const containsEnglishChar = (text: string): boolean => /[A-Za-z]/.test(text);
  const onChangeEditor = (event: any) => {
    setTextEditor(event.target.value);
    setLang(containsEnglishChar(event.target.value) ? "انگلیسی" : "فارسی");
    setChars(containsEnglishChar(event.target.value) ? 160 : 70);
    setCharCount(event.target.value.length % 70);
    setPageCount(Math.ceil(event.target.value.length / 70));
  };

  useEffect(() => {
    onChange(textEditor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textEditor]);

  return (
    <Flex className={styles.position}>
      <TextArea
        label="متن پیام"
        placeholder="متن مورد نظر خود را وارد کنید..."
        autoSize={{ minRows: 6, maxRows: 12 }}
        className={styles.textareaStyle}
        value={textEditor}
        onChange={onChangeEditor}
      />
      <Flex className={styles.ToolbarEditorContainer} align="center">
        <Space className={styles.ToolbarEditorItem}>
          <Typography>{charCount + "" + "/" + chars}</Typography>
        </Space>
        <Space className={styles.ToolbarEditorItem}>
          <Typography>{lang}</Typography>
        </Space>
        <Space className={styles.ToolbarEditorItem}>
          <Typography>{pageCount + " " + "پیام"}</Typography>
        </Space>
      </Flex>
    </Flex>
  );
};
