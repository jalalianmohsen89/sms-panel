import { Flex } from "@/core/components/base/flex";
import { Input } from "@/core/components/base/input";
import { SearchOutline } from "@/core/icons";
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
    style={{
      width: !isMobile ? "100%" : "",
      maxWidth: !isMobile ? "200px" : "",
    }}
  >
    <Input
      placeholder="جستجو کنید..."
      suffix={<SearchOutline />}
      value={text}
      onInput={(event) =>
        setSearchText((event.target as HTMLInputElement).value)
      }
      onPressEnter={onPressEnter}
      style={{
        height: isMobile ? "28px !important" : "",
        width: isMobile ? "100%" : "",
      }}
    />
  </Flex>
);
