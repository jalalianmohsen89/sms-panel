import { Typography } from "@/core/components/base/typography";
import { Button } from "@/core/components/base/button";
import { Flex } from "@/core/components/base/flex";
import { Space } from "@/core/components/base/space";
import { Modal } from "@/core/components/base/modal";
import useDevtools from "./UseDevtools";
import { useStyles } from "./styled";

const Devtools = () => {
  const { showData, isModalOpen, setIsModalOpen, onClose, showJson } =
    useDevtools();
  const { styles } = useStyles();

  return (
    <>
      <Button
        className={styles.devToolsButton}
        color="danger"
        variant="solid"
        onClick={showData}
      >
        devtools
      </Button>
      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={onClose}
        width={800}
        footer=""
        className={styles.zIndex1000}
      >
        <Flex vertical gap={20}>
          <Space>
            <Typography>مدیریت داده ها</Typography>
          </Space>
          <Flex vertical className={styles.direction}>
            {showJson()}
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};

export default Devtools;
