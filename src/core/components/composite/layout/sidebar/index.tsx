import { Flex, Image, Typography } from "@/core/components/base";
import { Profile } from "@/core/components/composite";
import PatternSelect from "@/core/components/composite/layout/sidebar/PatternSelect.tsx";
import {
  FloatBox,
  ImageContainer,
  Navigation,
  // Segments,
  SettingModal,
  SidebarContainer,
  SiderBox
} from "@/core/components/composite/layout/sidebar/styled";
import { navigation } from "@/core/content";
import { usePattern } from "@/core/context/PatternContext.tsx";
import { theme as themeContent } from "@/core/theme";
import { css } from "@emotion/css";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Sidebar = () => {
  // ---------------------- variables ---------------------
  const { token } = themeContent.useToken();
  const { Text } = Typography;
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/");
  const { currentPattern } = usePattern();
  const [isOpenSetting, setOpenSetting] = useState<boolean>(false);
  const [openKeys] = useState<string[]>([path[1]]);
  const [selectedKeys] = useState<string[]>([path[2]]);

  // ---------------------- methods ---------------------

  const onSelectOption = () => {
    setOpenSetting(true);
  };

  const changePage = (event: any) => {
    navigate(`/${event.keyPath[1]}/${event.keyPath[0]}`, {
      state: {
        openKeys: event.keyPath[1],
        selectedKeys: event.keyPath[0]
      } // ارسال state به صفحه جدید
    });
  };

  // ---------------------- render ---------------------
  return (
    <SiderBox token={token} pattern={currentPattern} width={300}>
      <SidebarContainer token={token} pattern={currentPattern}>
        <ImageContainer token={token}>
          <Link
            to="/"
            className={css`
              display: flex;
              align-items: center;
              gap: 10px;
              width: 100%;
            `}
          >
            <Image
              src="/media/brand-logo.png"
              preview={false}
              wrapperClassName={css`
                width: 18%;
                margin: 0 5px;
              `}
            />
            <Typography
              className={css`
                font-size: 16px;
                font-weight: 600;
                color: ${token.colorInfoTextActive};
              `}
            >
              پنل مدیریت پیامک
            </Typography>
          </Link>
        </ImageContainer>
        <Flex
          vertical
          className={css`
            height: 100%;
          `}
        >
          <Navigation
            pattern={currentPattern}
            token={token}
            mode="inline"
            defaultSelectedKeys={selectedKeys}
            defaultOpenKeys={openKeys}
            items={navigation}
            onClick={(event) => changePage(event)}
          />
          <FloatBox>
            <Profile onSelectOption={onSelectOption} />
          </FloatBox>
        </Flex>
      </SidebarContainer>
      <SettingModal
        width={"600px"}
        open={isOpenSetting}
        onCancel={() => setOpenSetting(false)}
        footer={[<div> </div>]}
        closable={false}
        token={token}
      >
        <Flex
          className={css`
            height: 500px;
            align-items: flex-start;
          `}
        >
          <Flex>
            <PatternSelect />
          </Flex>
        </Flex>
      </SettingModal>
    </SiderBox>
  );
};
