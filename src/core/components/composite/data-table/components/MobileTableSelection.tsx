import { Checkbox, CheckboxChangeEvent } from "@/core/components/base/checkbox";
import { Flex } from "@/core/components/base/flex";
import { Typography } from "@/core/components/base/typography";
import { FC } from "react";
import { useStyles } from "../styled";

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
  const { styles } = useStyles();
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
    <Flex className={styles.selectionContainer}>
      <Checkbox
        checked={selectionKey.length === rows.length}
        onChange={(event) => onChangeSelection(event)}
      />
      <Typography>انتخاب همه</Typography>
    </Flex>
  );
};
