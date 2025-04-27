import { theme as themeContent } from "@/core/theme";
import { useState, useEffect, ReactNode, useCallback, useMemo } from "react";
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
  const onCloseDrawer = useCallback(() => {
    setDrawerProps((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const onCloseModal = useCallback(() => {
    setModalProps((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const onSubmit = useCallback(() => {
    setRefeatchData(true);
    setTimeout(() => {
      setRefeatchData(false);
    }, 1000);
  }, []);

  const checkAction = useCallback(
    (action: IPageBuilderActions, row: any) => {
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
    },
    [onCloseDrawer, onCloseModal, onSubmit],
  );

  const onSelectedAction = useCallback(
    (event: string, row: any, item?: IPageBuilderColumns) => {
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
    },
    [pageData?.actions, checkAction, navigate],
  );

  const addForm = useCallback(() => {
    checkAction(pageData?.page?.createForm as IPageBuilderActions, {});
  }, [checkAction, pageData?.page?.createForm]);

  const handleSort = useCallback(
    (columnKey: string) => {
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
    },
    [sortInfo.sort_direction],
  );

  const generatedColumns = useMemo(() => {
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

    return columnsMaped;
  }, [pageData?.columns, onSelectedAction]);

  // ---------------------- useEffects ---------------------
  useEffect(() => {
    const Page = pageBuilders?.find((item: any) => item.pageId === pageId);

    setPageData(Page);
  }, [pageId]);

  useEffect(() => {
    if (!pageColumns) {
      setColumns(generatedColumns);
    }
  }, [pageColumns, generatedColumns]);

  useEffect(() => {
    if (refresh) {
      setRefeatchData(true);
    }
    if (refeatchData) {
      onSubmit();
    }
  }, [refresh, refeatchData, onSubmit]);

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
