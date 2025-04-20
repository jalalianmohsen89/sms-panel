import { Button, Drawer, Flex, Modal } from "@/core/components/base";
import { DataTable, PageBuilderFilter } from "@/core/components/composite";
import { Section, TitlePage } from "@/core/styled";
import { css } from "@emotion/css";
import { FC, ReactNode } from "react";
import { SortOrder } from "../data-table/types";

import { HiPlus } from "react-icons/hi";
import usePageBuilder from "./UsePageBuilder";

type Props = {
  pageId: string;
  rowKey?: string;
  pageColumns?: any;
  withPagination?: boolean;
  sortable?: boolean;
  searchable?: boolean;
  selectable?: boolean;
  skipUrlParams?: boolean;
  showRowNumber?: boolean;
  refresh?: boolean;
  onGetData?: (data: any) => void;
  expandable?: {
    expandedRowRender: (row: any) => ReactNode;
  };
  onSelectedRow?: (rows: any[]) => void;
};
export const PageBuilder: FC<Props> = ({
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
    token,
    columns,
    pageData,
    refeatchData,
    modalProps,
    setModalProps,
    drawerProps,
    setDrawerProps,
    sortInfo,
    setSortInfo,
    handleSort,
    addForm,
  } = usePageBuilder({
    pageId,
    pageColumns,
    refresh,
  });
  const isRequredFilter = pageData?.filters?.some((filter) => filter.required);

  // ---------------------- render ---------------------
  return (
    <Flex vertical>
      {pageData && (
        <>
          <Flex
            className={css`
              margin-bottom: 20px;
            `}
          >
            <TitlePage>{pageData.page.title}</TitlePage>
          </Flex>
          {pageData.filters && <PageBuilderFilter list={pageData.filters} />}
          {pageData.page.createForm && (
            <Flex
              className={css`
                margin-bottom: 1rem;
              `}
            >
              <Button type="primary" icon={<HiPlus />} onClick={addForm}>
                افزودن
              </Button>
            </Flex>
          )}
          <Section token={token} isBorder={false}>
            <DataTable<any>
              rowKey={rowKey}
              columns={columns}
              apiPath={pageData.page.apiUrl}
              requiredFilter={isRequredFilter}
              withPagination={withPagination}
              {...(pageData.page.dataMap && {
                dataMap: pageData.page.dataMap.method,
              })}
              {...(selectable && {
                selection: true,
                onSelected: (rows) => onSelectedRow?.(rows),
              })}
              {...(searchable && {
                searchbar: true,
              })}
              {...(sortable && {
                sortInfo,
                onChangeSortMobile: (
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                  sort_direction: SortOrder,
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                  sort_field: string,
                ) => {
                  setSortInfo({ sort_field, sort_direction });
                  handleSort(sort_field);
                },
              })}
              {...(expandable && {
                expandable,
              })}
              {...(refeatchData && {
                refeatch: refeatchData,
              })}
              {...(skipUrlParams && {
                skipUrlParams: true,
              })}
              {...(showRowNumber && {
                showRowNumber: true,
              })}
              onGetData={(data) => onGetData?.(data)}
            />
          </Section>
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
