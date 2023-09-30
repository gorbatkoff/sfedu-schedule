import { ChangeEvent, useEffect, useRef, useState } from "react";

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Input,
  InputGroup,
  Switch,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { userGroupActions } from "/src/widgets/DrawerMenu";
import { fetchAndSaveUserGroup } from "/src/entities/ScheduleTable";

import {
  ERROR_SETTING_DEFAULT_GROUP,
  GROUP_NOT_FOUND,
  GROUP_SAVED_SUCCESSFULLY,
} from "/src/shared/const/toast/toast";
import {
  IS_BUTTONS_BLOCKED,
  SHOW_EMPTY_LESSONS,
  USER_GROUP,
} from "/src/shared/const/localStorage/localStorageKeys";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import StateSchema from "/src/app/Providers/StoreProvider/config/StateSchema";

const userGroup = JSON.parse(localStorage.getItem(USER_GROUP) || "{}");
const isButtonBlock =
  JSON.parse(localStorage.getItem(IS_BUTTONS_BLOCKED) || "false") || false;

export function DrawerMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const location = useLocation();
  const [isButtonBlocked, setButtonBlocked] = useState<boolean>(isButtonBlock);
  const [isInputBlocked, setInputBlocked] = useState<boolean>(isButtonBlock);
  const [inputValue, setInputValue] = useState<string>(userGroup.name || "КТ");
  const [groupId, setGroupId] = useState(userGroup.groupId || "");
  const [isSetted, setIsSetted] = useState<boolean>(false);

  const isShowEmptyLessons = useSelector(
    (state: StateSchema) => state.userGroup.userSettings.isShowEmptyLessons,
  );

  const dispatch = useAppDispatch();

  const handleShowEmptyLessons = (e: ChangeEvent<HTMLInputElement>) => {
    const isShow = e.target.checked;
    localStorage.setItem(SHOW_EMPTY_LESSONS, JSON.stringify(isShow));
  };

  const handleSaveSettings = () => {
    const newSettings = JSON.parse(
      localStorage.getItem(SHOW_EMPTY_LESSONS) || "false",
    );
    dispatch(userGroupActions.setUserSettings(newSettings));
  };

  const checkGroupId = () => {
    if (groupId == "" && isSetted) {
      toast(GROUP_NOT_FOUND);
      setIsSetted(false);
      return;
    }
    if (isSetted) {
      saveInputValue();
    }
  };

  useEffect(() => {
    checkGroupId();
  }, [groupId]);

  const buttonHandler = async () => {
    try {
      await fetchData();
      setIsSetted(true);
    } catch (error) {
      console.log(error);
    }
  };

  const toast = useToast();

  async function fetchData() {
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
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  const saveInputValue = () => {
    if (
      inputValue.length >= 7 &&
      inputValue.length <= 8 &&
      inputValue.startsWith("КТ")
    ) {
      dispatch(userGroupActions.setUserGroup({ name: inputValue, groupId }));
      setButtonBlocked(true);
      setInputBlocked(true);
      toast(GROUP_SAVED_SUCCESSFULLY);
    }
  };

  const handleAllowEdit = () => {
    setButtonBlocked(false);
    setInputBlocked(false);
  };

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
        onClose={() => {
          onClose();
          handleSaveSettings();
        }}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={handleSaveSettings} />
          <DrawerHeader>Выберите вашу группу</DrawerHeader>

          <DrawerBody>
            <Heading as="h6" size="md" my={5}>
              Пример КТбо1-10
            </Heading>

            <InputGroup sx={{ display: "flex" }}>
              <Input
                placeholder="КТ**-**"
                value={inputValue}
                onChange={handleInputChange}
                pattern="КТ[А-Яа-я]{2}[1-6]-\d{2}"
                isInvalid={inputValue.length < 7}
                disabled={isInputBlocked}
                readOnly={isInputBlocked}
              />
              <Button
                colorScheme="blue"
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

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Switch
                onChange={(e) => handleShowEmptyLessons(e)}
                defaultChecked={isShowEmptyLessons}
              />
              <Heading as="h6" size="md" my={5}>
                Показывать все пары
              </Heading>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
