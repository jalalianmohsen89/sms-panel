import { theme as themeContent } from "@/core/theme";
import { useState, useEffect, ReactNode } from "react";
import { ColumnType, Space } from "@/core/components/base";
import { pageBuilders } from "@/core/components/composite/page-builder/content";
import {
  ISortInfo,
  SortOrder,
} from "@/core/components/composite/data-table/types";
import { createNestedObject } from "@/core/functions";
import { ActionMore } from "@/core/components/composite/data-table/components";
import {
  IPageBuilder,
  IPageBuilderActions,
  IPageBuilderColumns,
  ModalType,
} from "@/core/components/composite/page-builder/types";
import { useNavigate } from "react-router-dom";

type Props = {
  pageColumns?: any;
  pageId: string;
  refresh?: boolean;
};
const usePageBuilder = ({ pageColumns, pageId, refresh }: Props) => {
  // ---------------------- variables ---------------------
  const { token } = themeContent.useToken();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState<IPageBuilder>();
  const [columns, setColumns] = useState(pageColumns);
  const [refeatchData, setRefeatchData] = useState(false);
  const [modalProps, setModalProps] = useState<ModalType>({
    isOpen: false,
    content: <></>,
  });
  const [drawerProps, setDrawerProps] = useState<ModalType>({
    isOpen: false,
    content: <></>,
  });

  const [sortInfo, setSortInfo] = useState<ISortInfo>({
    sort_field: "",
    sort_direction: null,
  });

  // ---------------------- methods ---------------------
  const onSelectedAction = (
    event: string,
    row: any,
    item?: IPageBuilderColumns,
  ) => {
    const action = pageData?.actions?.find((item) => item.id === event);

    switch (event) {
    case "click":
      checkAction(item!.clickColumn!, row);
      break;
    case "view":
      return navigate(action?.value(row) as string);
    case "edit":
      checkAction(action!, row);
      break;
    case "create":
      checkAction(action!, row);
      break;
    case "delete":
      checkAction(action!, row);
      break;
    }
  };

  const checkAction = (action: IPageBuilderActions, row: any) => {
    if (action?.showType === "drawer") {
      setDrawerProps({
        isOpen: true,
        content: action?.value({
          selectedRow: row,
          onCloseDrawer,
          onSubmit,
        }) as ReactNode,
      });
    } else {
      setModalProps({
        isOpen: true,
        content: action?.value({
          selectedRow: row,
          onCloseModal,
          onSubmit,
        }) as ReactNode,
      });
    }
  };

  const addForm = () => {
    checkAction(pageData?.page?.createForm as IPageBuilderActions, {});
  };

  const handleSort = (columnKey: string) => {
    let newOrder: SortOrder;

    switch (sortInfo.sort_direction) {
    case "ascend":
      newOrder = "descend";
      break;
    case "descend":
      newOrder = null;
      break;
    case null:
      newOrder = "ascend";
      break;
    default:
      newOrder = "ascend";
    }

    setSortInfo({ sort_field: columnKey, sort_direction: newOrder });
  };

  const onCloseDrawer = () => {
    setDrawerProps({ ...drawerProps, isOpen: false });
  };

  const onCloseModal = () => {
    setModalProps({ ...modalProps, isOpen: false });
  };

  const onSubmit = () => {
    setRefeatchData(true);
    setTimeout(() => {
      setRefeatchData(false);
    }, 1000);
  };

  const createColumns = () => {
    let columnsMaped: any = [];

    if (pageData?.columns) {
      columnsMaped = pageData.columns.map((item: any) => {
        const column: ColumnType = {
          width: item.width,
          title: item.title,
          key: item.id,
        };

        if (item.render) {
          column["render"] = (_cell: string, row: any) => (
            <Space
              onClick={() =>
                item.clickColumn &&
                onSelectedAction(item.clickColumn.id, row, item)
              }
            >
              {item.render(row)}
            </Space>
          );
        } else if (item.value?.split(".").length > 1) {
          column["render"] = (_cell: string, row: any) => (
            <Space
              onClick={() =>
                item.clickColumn &&
                onSelectedAction(item.clickColumn.id, row, item)
              }
            >
              {createNestedObject(row, item.value)}
            </Space>
          );
        } else {
          if (!item.actions) {
            column["render"] = (_cell: any, row: any) => (
              <Space
                onClick={() =>
                  item.clickColumn &&
                  onSelectedAction(item.clickColumn.id, row, item)
                }
              >
                {row[item.value] || "-"}
              </Space>
            );
          }
        }
        if (item.actions) {
          column["render"] = (row: any) => (
            <ActionMore
              isCollapse
              isPageBuilder
              row={row}
              list={item.actions}
              onSelectAction={(event) => onSelectedAction(event, row)}
            />
          );
        }

        return column;
      });
    }
    setColumns(columnsMaped);
  };

  // ---------------------- useEffects ---------------------
  useEffect(() => {
    const Page = pageBuilders?.find((item: any) => item.pageId === pageId);

    setPageData(Page);
  }, [pageId]);

  useEffect(() => {
    if (!pageColumns) {
      createColumns();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData]);

  useEffect(() => {
    if (refresh) {
      setRefeatchData(true);
    }
    if (refeatchData) {
      onSubmit();
    }
  }, [refresh, refeatchData]);

  return {
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
  };
};

export default usePageBuilder;
