import { ColumnType } from "@/core/components/base/table";
import { Space } from "@/core/components/base/space";
import { ActionMore } from "@/core/components/composite/data-table/components";
import {
  ISortInfo,
  SortOrder,
} from "@/core/components/composite/data-table/types";
import { pageBuilders } from "@/core/components/composite/page-builder/content";
import {
  IPageBuilder,
  IPageBuilderActions,
  IPageBuilderColumns,
  ModalType,
} from "@/core/components/composite/page-builder/types";
import { createNestedObject } from "@/core/functions";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  pageColumns?: any;
  pageId: string;
  refresh?: boolean;
  sortable?: boolean;
  searchable?: boolean;
  selectable?: boolean;
  skipUrlParams?: boolean;
  showRowNumber?: boolean;
  expandable?: {
    expandedRowRender: (row: any) => ReactNode;
  };
  onSelectedRow?: (rows: any[]) => void;
};
const usePageBuilder = ({
  pageColumns,
  pageId,
  refresh,
  sortable,
  searchable,
  selectable,
  skipUrlParams,
  showRowNumber,
  expandable,
  onSelectedRow,
}: Props) => {
  // ---------------------- variables ---------------------
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

  const dataTableProps = useMemo(() => {
    const props: any = {}; // Use a more specific type if possible

    if (pageData?.page.dataMap) {
      props.dataMap = pageData.page.dataMap.method;
    }
    if (selectable) {
      props.selection = true;
      props.onSelected = (rows: any[]) => onSelectedRow?.(rows);
    }
    if (searchable) {
      props.searchbar = true;
    }
    if (sortable) {
      props.sortInfo = sortInfo;
      props.onChangeSortMobile = (
        // eslint-disable-next-line @typescript-eslint/naming-convention
        sort_direction: SortOrder,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        sort_field: string,
      ) => {
        setSortInfo({ sort_field, sort_direction });
        handleSort(sort_field);
      };
    }
    if (expandable) {
      props.expandable = expandable;
    }
    if (refeatchData) {
      props.refeatch = refeatchData;
    }
    if (skipUrlParams) {
      props.skipUrlParams = true;
    }
    if (showRowNumber) {
      props.showRowNumber = true;
    }

    return props;
  }, [
    pageData,
    selectable,
    onSelectedRow,
    searchable,
    sortable,
    sortInfo,
    setSortInfo,
    handleSort,
    expandable,
    refeatchData,
    skipUrlParams,
    showRowNumber,
  ]);

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
    columns,
    pageData,
    modalProps,
    setModalProps,
    drawerProps,
    setDrawerProps,
    addForm,
    dataTableProps,
  };
};

export default usePageBuilder;
