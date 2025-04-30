import { Typography } from "@/core/components/base/typography";
import { Flex } from "@/core/components/base/flex";
import { Space } from "@/core/components/base/space";
import { Table } from "@/core/components/base/table";
import useStore from "@/core/store";
import { useState } from "react";
import JsonView from "react18-json-view";
import { useStyles } from "./styled";

const useDevtools = () => {
  // ---------------------- hooks ---------------------
  const { data } = useStore();
  const { styles } = useStyles();

  // ---------------------- variables ---------------------
  const [selectedRow, setSelectedRow] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = [
    {
      title: "نام",
      dataIndex: "name",
      key: "name",
      render: (name: string) => name,
    },
    {
      title: "آدرس",
      dataIndex: "url",
      render: (url: string) => url,
    },
    {
      title: "پارامترها",
      dataIndex: "params",
      render: (params: string) => (params ? params : "-"),
    },
    {
      title: "عملیات",
      dataIndex: "actions",
      render: (_: any, row: any) => (
        <Flex className={styles.pointer} onClick={() => onClick(row)}>
          {row && selectedRow.length > 0 ? "مخفی" : "نمایش"}
        </Flex>
      ),
    },
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
      <Flex vertical className={styles.devToolsContainer}>
        <Flex className={styles.width}>
          <Table
            columns={columns}
            dataSource={data.apis}
            className={styles.width}
            pagination={false}
          />
        </Flex>
        {selectedRow.length > 0 && (
          <Space className={styles.jsonContainer}>
            <JsonView src={selectedRow} collapsed style={{ width: "100%" }} />
          </Space>
        )}
      </Flex>
    </Flex>
  );

  return { showData, isModalOpen, setIsModalOpen, onClose, showJson };
};

export default useDevtools;
