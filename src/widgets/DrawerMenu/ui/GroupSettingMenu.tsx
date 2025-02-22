import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Heading,
  Input,
  InputGroup,
  Switch,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import confetti from "canvas-confetti";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { StateSchema } from "/src/app/providers";

import { userGroupActions } from "/src/widgets/DrawerMenu";
import { DrawerInfo } from "/src/widgets/DrawerMenu/ui/GroupSettingInfo/DrawerInfo";

import { fetchAndSaveUserGroup } from "/src/entities/ScheduleTable";

import {
  IS_BUTTONS_BLOCKED,
  SHOW_EMPTY_LESSONS,
  SHOW_SCHEDULE_AS_CARDS,
  USER_GROUP,
} from "/src/shared/const/localStorage/localStorageKeys";
import {
  ERROR_SETTING_DEFAULT_GROUP,
  GROUP_NOT_FOUND,
  GROUP_SAVED_SUCCESSFULLY,
} from "/src/shared/const/toast/toast";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";

import styles from "./DrawerMenu.module.scss";

const userGroup = JSON.parse(localStorage.getItem(USER_GROUP) ?? "{}");
const isButtonBlock =
  JSON.parse(localStorage.getItem(IS_BUTTONS_BLOCKED) ?? "false") || false;

const handleShowEmptyLessons = (e: ChangeEvent<HTMLInputElement>) => {
  const checked = e.target.checked; // true -> показывать
  localStorage.setItem(SHOW_EMPTY_LESSONS, JSON.stringify(checked));
};

const handleShowScheduleAsCards = (e: ChangeEvent<HTMLInputElement>) => {
  const checked = e.target.checked; // true -> показывать
  localStorage.setItem(SHOW_SCHEDULE_AS_CARDS, JSON.stringify(checked));
};

export const GroupSettingMenu = memo(() => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = useRef(null);

  const [isButtonBlocked, setButtonBlocked] = useState<boolean>(isButtonBlock);
  const [isInputBlocked, setInputBlocked] = useState<boolean>(isButtonBlock);
  const [inputValue, setInputValue] = useState<string>(userGroup.name || "КТ");
  const [groupId, setGroupId] = useState(userGroup.groupId || "");
  const [isSetted, setIsSetted] = useState(false);

  const isShowEmptyLessons = useSelector(
    (state: StateSchema) => state.userGroup.userSettings.isShowEmptyLessons
  );

  const showScheduleAsCards = useSelector(
    (state: StateSchema) => state.userGroup.userSettings.showScheduleAsCards
  );

  const handleSaveSettings = useCallback(() => {
    const showEmptyLessons = JSON.parse(
      localStorage.getItem(SHOW_EMPTY_LESSONS) ?? "true"
    );

    const scheduleAsCards = JSON.parse(
      localStorage.getItem(SHOW_SCHEDULE_AS_CARDS) ?? "true"
    );

    if (isShowEmptyLessons !== showEmptyLessons) {
      dispatch(userGroupActions.setShowEmptyLessons(showEmptyLessons));
    }

    if (showScheduleAsCards !== scheduleAsCards) {
      dispatch(userGroupActions.setShowScheduleAsCards(scheduleAsCards));
    }
    onClose();
  }, [dispatch, isShowEmptyLessons, onClose, showScheduleAsCards]);

  const saveInputValue = useCallback(() => {
    if (
      inputValue.length >= 7 &&
      inputValue.length <= 8 &&
      inputValue.startsWith("КТ")
    ) {
      dispatch(userGroupActions.setUserGroup({ name: inputValue, groupId }));
      setButtonBlocked(true);
      setInputBlocked(true);
      toast(GROUP_SAVED_SUCCESSFULLY);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [dispatch, groupId, inputValue, toast]);

  const checkGroupId = useCallback(() => {
    if (groupId == "" && isSetted) {
      toast(GROUP_NOT_FOUND);
      setIsSetted(false);
      return;
    }
    if (isSetted) {
      saveInputValue();
    }
  }, [groupId, isSetted, saveInputValue, toast]);

  useEffect(() => {
    checkGroupId();
  }, [groupId]);

  const fetchData = useCallback(async () => {
    try {
      const data = await dispatch(fetchAndSaveUserGroup(inputValue));
      if (data.payload.table) {
        setGroupId(data.payload.table.group);
      }
      if (data.payload?.choices) {
        setGroupId(data.payload.choices[0].group);
      }
      if (data?.payload?.result === "no_entries") {
        throw new Error();
      }
      onClose();
    } catch (error) {
      console.log(error);
      toast(ERROR_SETTING_DEFAULT_GROUP);
    }
  }, [dispatch, inputValue, onClose, toast]);

  const buttonHandler = useCallback(async () => {
    try {
      await fetchData();
      setIsSetted(true);
    } catch (error) {
      console.log(error);
    }
  }, [fetchData]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const cleanedValue = e.target.value.replace(/[^КТА-Яа-я1-6-0-9]+/g, "");

    if (!cleanedValue.startsWith("КТ")) {
      setInputValue("КТ");
      return;
    }
    if (cleanedValue.length > 8) {
      return;
    }
    setInputValue(cleanedValue);
    if (
      cleanedValue.length >= 7 &&
      cleanedValue.length <= 8 &&
      cleanedValue.startsWith("КТ")
    ) {
      setButtonBlocked(false);
    }
  }, []);

  const handleAllowEdit = useCallback(() => {
    setButtonBlocked(false);
    setInputBlocked(false);
  }, []);

  return (
    <>
      <HamburgerIcon
        w={25}
        h={25}
        sx={{ cursor: "pointer", color: "white" }}
        ref={btnRef}
        onClick={onOpen}
      />
      <Drawer
        size="xs"
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        onCloseComplete={handleSaveSettings}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent className={styles.Drawer}>
          <DrawerInfo handleSaveSettings={handleSaveSettings} />
          <DrawerBody>
            <Heading as="h6" size="md" my={5}>
              Пример КТбо1-10
            </Heading>
            <InputGroup sx={{ display: "flex" }}>
              <Input
                className={styles.input}
                placeholder="КТ**-**"
                value={inputValue}
                onChange={handleInputChange}
                pattern="КТ[А-Яа-я]{2}[1-6]-\d{2}"
                isInvalid={inputValue.length < 7}
                disabled={isInputBlocked}
                readOnly={isInputBlocked}
              />
              <Button
                colorScheme="green"
                onClick={buttonHandler}
                isDisabled={isButtonBlocked || inputValue.length < 7}
              >
                Сохранить
              </Button>
            </InputGroup>
            <Button
              onClick={handleAllowEdit}
              sx={{ width: "100%", m: "1em 0" }}
            >
              Редактировать
            </Button>

            {window.screen.width <= 768 && (
              <>
                <Box className={styles.tableFilterSettings}>
                  <Switch
                    onChange={(e) => handleShowEmptyLessons(e)}
                    defaultChecked={isShowEmptyLessons}
                  />
                  <Heading as="h6" size="md" my={5}>
                    Показывать все пары
                  </Heading>
                </Box>
                <Box className={styles.tableSwitcher}>
                  <Switch
                    onChange={(e) => handleShowScheduleAsCards(e)}
                    defaultChecked={showScheduleAsCards}
                  />
                  <Heading as="h6" size="md" my={5}>
                    Расписание в виде карточек
                  </Heading>
                </Box>
              </>
            )}

            <Box className={styles.releaseNotes}>
              <Link to={"/release"}>Описание обновлений</Link>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
});
