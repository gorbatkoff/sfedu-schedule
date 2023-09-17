import { useEffect, useRef, useState } from "react";

import {
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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  IS_BUTTONS_BLOCKED,
  USER_GROUP,
} from "/src/shared/const/localStorage/localStorageKeys";
import useCurrentWeek from "/src/shared/hooks/useCurrentWeek";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";
import { userGroupActions } from "/src/widgets/DrawerMenu/model/slice/userGroupSlice";
import { fetchAndSaveUserGroup } from "/src/entities/ScheduleTable/model/slice/tableSlice";

const userGroup = JSON.parse(localStorage.getItem(USER_GROUP) || "{}");
const isButtonBlock =
  JSON.parse(localStorage.getItem(IS_BUTTONS_BLOCKED) || "false") || false;

export function DrawerMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const { week } = useCurrentWeek();
  const [isButtonBlocked, setButtonBlocked] = useState<boolean>(isButtonBlock);
  const [isInputBlocked, setInputBlocked] = useState<boolean>(isButtonBlock);
  const [inputValue, setInputValue] = useState<string>(userGroup.name || "КТ");
  const [groupId, setGroupId] = useState(userGroup.groupId || "");
  const [isSetted, setIsSetted] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const checkGroupId = () => {
    if (groupId == "" && isSetted) {
      toast({
        title: "Группа не найдена",
        description: "Проверьте правильность написания группы",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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

  const buttonHandler = () => {
    fetchData();
    setIsSetted(true);
  };

  const toast = useToast();

  async function fetchData() {
    try {
      const data = await dispatch(fetchAndSaveUserGroup(inputValue));

      if (data.payload.table) {
        setGroupId(data.payload.table.group);
        /*        localStorage.setItem("USER_SCHEDULE", data.payload);*/
      }
      if (data.payload.choices) {
        setGroupId(data.payload.data.choices[0].group);
      }

      onClose();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Ошибка",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      console.log(error);
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
      toast({
        title: "Успешно!",
        description: "Вы успешно сохранили группу",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
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
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
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
                isDisabled={isButtonBlocked}
              >
                Сохранить
              </Button>
            </InputGroup>
          </DrawerBody>

          <DrawerFooter>
            {/*<Button variant="outline" mr={3} onClick={onClose}>
              Отмена
            </Button>
            <Button colorScheme="blue">Сохранить</Button>
            */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
