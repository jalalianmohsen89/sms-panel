import { Flex, Space, Table, Typography } from "@/core/components/base";
import useStore from "@/core/store";
import { theme as themeContent } from "@/core/theme";
import { css } from "@emotion/css";
import { useState } from "react";
import JsonView from "react18-json-view";

const useDevtools = () => {
  // ---------------------- hooks ---------------------
  const { token } = themeContent.useToken();
  const { data } = useStore();

  // ---------------------- variables ---------------------
  const [selectedRow, setSelectedRow] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = [
    {
      title: "نام",
      dataIndex: "name",
      key: "name",
      render: (name: string) => name
    },
    {
      title: "آدرس",
      dataIndex: "url",
      render: (url: string) => url
    },
    {
      title: "پارامترها",
      dataIndex: "params",
      render: (params: string) => (params ? params : "-")
    },
    {
      title: "عملیات",
      dataIndex: "actions",
      render: (_: any, row: any) => (
        <Flex
          className={css`
            cursor: pointer;
          `}
          onClick={() => onClick(row)}
        >
          {row && selectedRow.length > 0 ? "مخفی" : "نمایش"}
        </Flex>
      )
    }
  ];

  // ---------------------- methods ---------------------
  const onClick = (row: any) => {
    if (selectedRow.length > 0) setSelectedRow([]);
    else setSelectedRow([...row.list.data]);
  };

  const showData = () => {
    setIsModalOpen(true);
    showJson();
  };

  const onClose = () => {
    setIsModalOpen(false);
    setSelectedRow([]);
  };

  const showJson = () => (
    <Flex vertical gap={20}>
      <Flex gap={20}>
        <Flex gap={5}>
          <Typography> نام صفحه :</Typography>
          <Typography>{data.pageName}</Typography>
        </Flex>
        <Flex gap={5}>
          <Typography> آدرس صفحه :</Typography>
          <Typography>{data.pageUrl}</Typography>
        </Flex>
      </Flex>
      <Flex
        vertical
        className={css`
          align-items: flex-start;
          justify-content: flex-end;
          gap: 50px;
        `}
      >
        <Flex
          className={css`
            width: 100%;
          `}
        >
          <Table
            columns={columns}
            dataSource={data.apis}
            className={css`
              width: 100%;
            `}
            pagination={false}
          />
        </Flex>
        {selectedRow.length > 0 && (
          <Space
            className={css`
              background-color: ${token.colorFillSecondary};
              max-height: 300px;
              width: 100%;
              align-items: flex-start;
              justify-content: flex-end;
              overflow: auto;
            `}
          >
            <JsonView src={selectedRow} collapsed style={{ width: "100%" }} />
          </Space>
        )}
      </Flex>
    </Flex>
  );

  return { showData, isModalOpen, setIsModalOpen, onClose, showJson };
};

export default useDevtools;
