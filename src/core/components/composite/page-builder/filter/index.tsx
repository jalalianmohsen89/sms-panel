import { Button, Col, Row } from "@/core/components/base";
import { FC } from "react";
import { theme as themeContent } from "@/core/theme";
import { IPageBuilderFilter } from "../types";
import usePageBuilderFilterHook from "./UsePageBuilderFilterHook";
import { css } from "@emotion/css";
import { Section } from "@/core/styled";

type Props = {
  list: IPageBuilderFilter[];
};

export const PageBuilderFilter: FC<Props> = ({ list }) => {
  // -------------------- hooks ----------------------
  const { checkFilters, sendParams } = usePageBuilderFilterHook({ list });
  const { token } = themeContent.useToken();

  // -------------------- render ----------------------
  return (
    <Section token={token}>
      <Row gutter={[15, 15]} align="middle">
        {checkFilters}
      </Row>
      <Row justify={"end"}>
        <Col>
          <Button
            className={css`
              margin-top: 1rem;
              margin-left: 1rem;
            `}
            type="primary"
            onClick={sendParams}
          >
            جستجو
          </Button>
        </Col>
      </Row>
    </Section>
  );
};
