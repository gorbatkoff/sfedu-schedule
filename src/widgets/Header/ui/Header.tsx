import { useState } from "react";

import { EmailIcon } from "@chakra-ui/icons";
import { Box, Icon, IconButton } from "@chakra-ui/react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import { DrawerMenu } from "/src/widgets/DrawerMenu";
import { ModalNews } from "/src/widgets/ModalNews/ui/ModalNews";

import { tableActions } from "/src/entities/ScheduleTable";

import { defaultValue } from "/src/shared/const/global/const";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";
import { Logo } from "/src/shared/ui/Logo/Logo";
import { ThemeSwitcher } from "/src/shared/ui/ThemeSwitcher/ThemeSwitcher";

import styles from "./Header.module.scss";

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
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

  const handleUpdateData = () => {
    navigate("/");
    window.history.replaceState(null, "group", window.location.pathname);
    dispatch(tableActions.setSchedule({ ...defaultValue, result: "cleared" }));
  };

  return (
    <Box
      bg="var(--secondary-color)"
      as="header"
      className={classNames(styles.Header, {}, [className])}
    >
      <div className={styles.headerWrapper}>
        <IconButton
          aria-label="Логотип"
          bg="transparent"
          onClick={handleUpdateData}
        >
          <Logo />
        </IconButton>

        <div className={styles.menuBlock}>
          <div className={styles.themeSwitcher}>
            <ThemeSwitcher />
          </div>
          <button className={styles.emailIcon} onClick={onOpen}>
            <EmailIcon w={22} h={22} as="button" />
          </button>
          <DrawerMenu />
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
