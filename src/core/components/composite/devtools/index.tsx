import { Button, Flex, Modal, Space, Typography } from "@/core/components/base";
import { css } from "@emotion/css";
import useDevtools from "./UseDevtools";

const Devtools = () => {
  const { showData, isModalOpen, setIsModalOpen, onClose, showJson } =
    useDevtools();

  return (
    <>
      <Button
        className={css`
          position: fixed;
          left: 40%;
          bottom: 10px;
          z-index: 1000;
        `}
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
        className={css`
          z-index: 1000;
        `}
      >
        <Flex vertical gap={20}>
          <Space>
            <Typography>مدیریت داده ها</Typography>
          </Space>
          <Flex
            vertical
            className={css`
              direction: ltr;
            `}
          >
            {showJson()}
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};

export default Devtools;
