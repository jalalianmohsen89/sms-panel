import { Input } from "@/core/components/base/input";
import { Flex } from "@/core/components/base/flex";
import { SearchOutline } from "@/core/icons";
import { memo } from "react";
import { useStyles } from "./styled";

const SearchBar = memo(() => {
  const { styles } = useStyles();

  return (
  // ---------------------- methods ---------------------
  // const onSubmit = (event: any) => {
  //   // console.log(event, "value");
  // };

    <Flex className={styles.searchBarContainer}>
      <Input
        placeholder="جستجو کنید..."
        suffix={<SearchOutline />}
        // onPressEnter={onSubmit}
      />
    </Flex>
  );
});

export default SearchBar;
