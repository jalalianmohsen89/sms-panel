import { FC } from "react";
import useFilterHook from "./UseFilterHook";
import { IPageBuilderFilter } from "../types";

type Props = IPageBuilderFilter;
const FilterItem: FC<Props> = (props) => {
  // ----------------- hooks -------------------
  const { checkFilter } = useFilterHook(props);

  // ----------------- methods -------------------
  return checkFilter();
};

export default FilterItem;
