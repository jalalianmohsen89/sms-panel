import { Avatar, Flex, Typography } from "@/core/components/base";
import { FC } from "react";
import { useStyles } from "./styled";

type Props = {
  avatar: string;
  fullName: string;
  description: string;
  date: string;
  position: string;
};
const InfoNotif: FC<Props> = ({
  avatar,
  fullName,
  description,
  date,
  position,
}) => {
  const { styles } = useStyles();

  return (
    <Flex className={styles.infoContainer}>
      <Avatar className={styles.avatarUser}>{avatar}</Avatar>
      <Flex vertical>
        <Flex gap="8px">
          <Typography>{fullName}</Typography>
          <Typography className={styles.infoDetail}> {description}</Typography>
        </Flex>
        <Flex align="center" gap="6px">
          <Typography className={styles.infoDetail}>{date}</Typography>
          <span className={styles.circle}>.</span>
          <Typography className={styles.infoPositionTtile}>
            {position}
          </Typography>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default InfoNotif;
