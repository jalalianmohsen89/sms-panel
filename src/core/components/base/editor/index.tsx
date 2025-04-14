import { Flex, TextArea, Typography } from "@/core/components/base";
import { css } from "@emotion/css";
import { FC, useEffect, useState } from "react";
import {
  ToolbarEditorContainer,
  ToolbarEditorItem
} from "@/core/feature/sms/styled";
import { theme as themeContent } from "@/core/theme";

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
  const { token } = themeContent.useToken();

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
    <Flex
      className={css`
        position: relative;
      `}
    >
      <TextArea
        label="متن پیام"
        placeholder="متن مورد نظر خود را وارد کنید..."
        autoSize={{ minRows: 6, maxRows: 12 }}
        className={css`
          width: 100%;
          padding: 1rem 1rem 3rem;
        `}
        value={textEditor}
        onChange={onChangeEditor}
      />
      <ToolbarEditorContainer token={token} align="center">
        <ToolbarEditorItem token={token}>
          <Typography>{charCount + "" + "/" + chars}</Typography>
        </ToolbarEditorItem>
        <ToolbarEditorItem token={token}>
          <Typography>{lang}</Typography>
        </ToolbarEditorItem>
        <ToolbarEditorItem token={token}>
          <Typography>{pageCount + " " + "پیام"}</Typography>
        </ToolbarEditorItem>
      </ToolbarEditorContainer>
    </Flex>
  );
};
