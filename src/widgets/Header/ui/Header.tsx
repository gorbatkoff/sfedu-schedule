import classNames from "classnames";

import { Box, Icon, IconButton } from "@chakra-ui/react";

import { DrawerMenu } from "/src/widgets/DrawerMenu";
import { tableActions } from "/src/entities/ScheduleTable";
import { Logo } from "/src/shared/ui/Logo/Logo";
import { ThemeSwitcher } from "/src/shared/ui/ThemeSwitcher/ThemeSwitcher";

import { defaultValue } from "/src/shared/const/global/const";

import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";

import styles from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { EmailIcon } from "@chakra-ui/icons";
import { ModalNews } from "/src/widgets/ModalNews/ui/ModalNews";
import { useState } from "react";

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
    dispatch(tableActions.setSchedule(defaultValue));
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

        <div className={styles.links}>
          <Link to="/about"></Link>
        </div>

        <div className={styles.menuBlock}>
          <div className={styles.themeSwitcher}>
            <ThemeSwitcher />
          </div>
          <button className={styles.emailIcon} onClick={onOpen}>
            <EmailIcon w={22} h={22} as="button" />
            <div className={styles.badge}>
              <Icon viewBox="0 0 200 200" color="red.500">
                <path
                  fill="#e88358"
                  d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                />
              </Icon>
            </div>
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
