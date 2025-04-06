import { Spin } from "@/core/components/base";
import { css } from "@emotion/css";

export const Loading = () => (
  <Spin tip="درحال بارگزاری ..." size="large" fullscreen>
    <div
      className={css`
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 50px;
        background-color: rgba(0, 0, 0, 0.05);
        border-radius: 5px;
        z-index: 20;
      `}
    />
  </Spin>
);
