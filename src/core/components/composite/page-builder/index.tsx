import { Button } from "@/core/components/base/button";
import { Drawer } from "@/core/components/base/drawer";
import { Flex } from "@/core/components/base/flex";
import { Modal } from "@/core/components/base/modal";
import { Typography } from "@/core/components/base/typography";
import { DataTable, PageBuilderFilter } from "@/core/components/composite";
import { ColumnType } from "@/core/components/base/table";
import { FC, ReactNode } from "react"; // Import useMemo

import { Plus } from "@/core/icons";
import { useStyles as useStylesBase } from "@/core/styled";
import { useStyles } from "./styled";
import { usePageBuilder } from "./UsePageBuilder";

type Props = {
  pageId: string;
  rowKey?: string;
  pageColumns?: ColumnType[];
  withPagination?: boolean;
  sortable?: boolean;
  searchable?: boolean;
  selectable?: boolean;
  skipUrlParams?: boolean;
  showRowNumber?: boolean;
  refresh?: boolean;
  onGetData?: (data: unknown) => void;
  expandable?: {
    expandedRowRender: (row: unknown) => ReactNode;
  };
  onSelectedRow?: (rows: unknown[]) => void;
};
const PageBuilder: FC<Props> = ({
  pageId,
  rowKey,
  pageColumns,
  withPagination = true,
  sortable = false,
  searchable = false,
  selectable = false,
  skipUrlParams,
  showRowNumber,
  expandable,
  onSelectedRow,
  refresh,
  onGetData,
}) => {
  // ---------------------- hooks ---------------------
  const {
    columns,
    pageData,
    modalProps,
    setModalProps,
    drawerProps,
    setDrawerProps,
    addForm,
    dataTableProps,
  } = usePageBuilder({
    pageId,
    pageColumns,
    refresh,
    sortable,
    searchable,
    selectable,
    skipUrlParams,
    showRowNumber,
    expandable,
    onSelectedRow,
  });
  const isRequredFilter = pageData?.filters?.some((filter) => filter.required);
  const { styles } = useStyles();
  const { styles: stylesBase } = useStylesBase(false);

  // Create dataTableProps using useMemo

  // ---------------------- render ---------------------
  return (
    <Flex vertical>
      {pageData && (
        <>
          <Flex className={styles.titlePageContainer}>
            <Typography className={stylesBase.titlePage}>
              {pageData.page.title}
            </Typography>
          </Flex>
          {pageData.filters && <PageBuilderFilter list={pageData.filters} />}
          {pageData.page.createForm && (
            <Flex className={styles.createButtonForm}>
              <Button type="primary" icon={<Plus />} onClick={addForm}>
                افزودن
              </Button>
            </Flex>
          )}
          <section className={stylesBase.section}>
            <DataTable
              rowKey={rowKey}
              columns={columns}
              apiPath={pageData.page.apiUrl}
              requiredFilter={isRequredFilter}
              withPagination={withPagination}
              onGetData={(data) => onGetData?.(data)}
              {...dataTableProps} // Spread the memoized props
            />
          </section>
          {modalProps.isOpen && (
            <Modal
              open={modalProps.isOpen}
              onCancel={() => setModalProps({ ...modalProps, isOpen: false })}
              footer={<></>}
            >
              {modalProps.content}
            </Modal>
          )}
          {drawerProps.isOpen && (
            <Drawer
              width={630}
              title="ویرایش"
              placement="left"
              closable={false}
              onClose={() => setDrawerProps({ ...drawerProps, isOpen: false })}
              open={drawerProps.isOpen}
            >
              {drawerProps.content}
            </Drawer>
          )}
        </>
      )}
    </Flex>
  );
};

export default PageBuilder;
