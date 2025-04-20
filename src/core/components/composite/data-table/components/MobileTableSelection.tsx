import {
  Checkbox,
  Flex,
  Typography,
  CheckboxChangeEvent,
} from "@/core/components/base";
import { css } from "@emotion/css";
import { FC } from "react";

type Props = {
  selectionKey: string[];
  setSelectionKey: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedRow: React.Dispatch<React.SetStateAction<any[]>>;
  rows: any[];
};

export const MobileTableSelection: FC<Props> = ({
  selectionKey,
  setSelectionKey,
  setSelectedRow,
  rows,
}) => {
  // ---------------------- methods ---------------------
  const onChangeSelection = (event: CheckboxChangeEvent) => {
    if (event.target.checked) {
      setSelectionKey(rows.map((_, index: number) => (index + 1).toString()));
      setSelectedRow(rows);
    } else {
      setSelectionKey([]);
      setSelectedRow([]);
    }
  };

  // ---------------------- render ---------------------
  return (
    <Flex
      className={css`
        gap: 10px;
        text-wrap: nowrap;
      `}
    >
      <Checkbox
        checked={selectionKey.length === rows.length}
        onChange={(event) => onChangeSelection(event)}
      />
      <Typography>انتخاب همه</Typography>
    </Flex>
  );
};
