import { css } from "@emotion/css";
import { Flex, Input } from "@/core/components/base";
import { SearchOutline } from "@/core/icons";

const SearchBar = () => (
  // ---------------------- methods ---------------------
  // const onSubmit = (event: any) => {
  //   // console.log(event, "value");
  // };

  <Flex
    className={css`
      width: 100%;
      max-width: 200px;
    `}
  >
    <Input
      placeholder="جستجو کنید..."
      suffix={<SearchOutline />}
      // onPressEnter={onSubmit}
    />
  </Flex>
);

export default SearchBar;
