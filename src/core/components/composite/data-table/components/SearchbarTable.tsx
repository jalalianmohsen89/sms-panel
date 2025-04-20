import { Flex, Input } from "@/core/components/base";
import { SearchOutline } from "@/core/icons";
import { css } from "@emotion/css";
import { FC } from "react";

type Props = {
  isMobile?: boolean;
  text: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  onPressEnter?: () => void;
};
export const SearchbarTable: FC<Props> = ({
  isMobile = false,
  text,
  setSearchText,
  onPressEnter,
}) => (
  <Flex
    className={
      !isMobile
        ? css`
            width: 100%;
            max-width: 200px;
          `
        : ""
    }
  >
    <Input
      placeholder="جستجو کنید..."
      suffix={<SearchOutline />}
      value={text}
      onInput={(event) =>
        setSearchText((event.target as HTMLInputElement).value)
      }
      onPressEnter={onPressEnter}
      className={
        isMobile
          ? css`
              height: 28px !important;
              width: 100%;
            `
          : ""
      }
    />
  </Flex>
);
