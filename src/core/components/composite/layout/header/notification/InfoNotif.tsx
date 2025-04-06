import { Flex, GlobalToken, Typography } from "@/core/components/base";
import { FC } from "react";
import { AvatarUser } from "../styled";
import { css } from "@emotion/css";

type Props = {
  token: GlobalToken;
  avatar: string;
  fullName: string;
  description: string;
  date: string;
  position: string;
};
const InfoNotif: FC<Props> = ({
  token,
  avatar,
  fullName,
  description,
  date,
  position
}) => (
  <Flex
    className={css`
      padding: 12px 1rem;
      align-items: center;
      gap: 10px;
    `}
  >
    <AvatarUser>{avatar}</AvatarUser>
    <Flex vertical>
      <Flex
        className={css`
          gap: 8px;
        `}
      >
        <Typography>{fullName}</Typography>
        <Typography
          className={css`
            color: ${token.colorTextLabel};
            font-size: 13px;
          `}
        >
          {" "}
          {description}
        </Typography>
      </Flex>
      <Flex
        className={css`
          gap: 6px;
          align-items: center;
        `}
      >
        <Typography
          className={css`
            color: ${token.colorTextLabel};
            font-size: 11px;
          `}
        >
          {date}
        </Typography>
        <span
          className={css`
            width: 5px;
            height: 5px;
            background-color: ${token.colorTextLabel};
            border-radius: 50%;
          `}
        />
        <Typography
          className={css`
            color: ${token.colorTextLabel};
            font-size: 11px;
          `}
        >
          {position}
        </Typography>
      </Flex>
    </Flex>
  </Flex>
);

export default InfoNotif;
