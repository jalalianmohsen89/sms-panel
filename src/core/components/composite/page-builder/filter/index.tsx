import { Row } from "@/core/components/base/row";
import { Button } from "@/core/components/base/button";
import { Col } from "@/core/components/base/col";
import { FC } from "react";
import { IPageBuilderFilter } from "@/core/types/page-builder";
import { useStyles } from "./styled";
import { useStyles as useStylesBase } from "@/core/styled";
import { usePageBuilderFilterHook } from "./UsePageBuilderFilterHook";

type Props = {
  list: IPageBuilderFilter[];
};

const PageBuilderFilter: FC<Props> = ({ list }) => {
  // -------------------- hooks ----------------------
  const { checkFilters, sendParams } = usePageBuilderFilterHook({ list });
  const { styles } = useStyles();
  const { styles: stylesBase } = useStylesBase();

  // -------------------- render ----------------------
  return (
    <section className={stylesBase.section}>
      <Row gutter={[15, 15]} align="middle">
        {checkFilters}
      </Row>
      <Row justify={"end"}>
        <Col>
          <Button
            className={styles.buttonFilter}
            type="primary"
            onClick={sendParams}
          >
            جستجو
          </Button>
        </Col>
      </Row>
    </section>
  );
};

export default PageBuilderFilter;
