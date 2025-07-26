import { useCallback, useState } from "react";

import { Box } from "@chakra-ui/react";
import { ThemeContext } from "@emotion/react";
import { ButtonFilled, ButtonSimple } from "@snack-uikit/button";
import DefaultBrand from "@snack-uikit/figma-tokens/build/css/brand.module.css";
import { DaySVG, EmailSVG } from "@snack-uikit/icons";
import { useThemeConfig } from "@snack-uikit/utils";
import { useNavigate } from "react-router-dom";

import { GroupSettingMenu } from "/src/widgets/DrawerMenu";
import { ModalNews } from "/src/widgets/ModalNews";

import { tableActions } from "/src/entities/ScheduleTable";

import { defaultValue } from "/src/shared/const";
import { Theme, themeMap } from "/src/shared/const/theme";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";
import { Logo } from "/src/shared/ui";

import styles from "./Header.module.scss";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);

  const navigateToFeedback = () => {
    setOpenModal(false);
    navigate("/leave-feedback");
  };

  const onOpen = () => {
    setOpenModal(true);
  };

  const onClose = () => {
    setOpenModal(false);
  };

  const handleUpdateData = useCallback(() => {
    navigate("/");
    window.history.replaceState(null, "group", window.location.pathname);
    dispatch(tableActions.setSchedule({ ...defaultValue, result: "cleared" }));
  }, [dispatch, navigate]);

  return (
    <Box
      id={"header"}
      bg="var(--secondary-color)"
      as="header"
      className={styles.Header}
    >
      <div className={styles.headerWrapper}>
        <Logo onUpdateData={handleUpdateData} />

        <div
          style={{ display: "flex", alignItems: "center", columnGap: "1em" }}
        >
          <DaySVG />
          <EmailSVG onClick={onOpen} cursor={"pointer"} />
          <GroupSettingMenu />
        </div>
      </div>
      <ModalNews
        isOpen={openModal}
        onClose={onClose}
        navigateToFeedback={navigateToFeedback}
      />
    </Box>
  );
};
