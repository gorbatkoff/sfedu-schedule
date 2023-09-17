import { UseToastOptions } from "@chakra-ui/react";

export const TOAST_NO_INTERNET: UseToastOptions = {
  title: "Нет интернета!",
  description: "Показано сохраненное расписание вашей группы! 🙂",
  status: "warning",
  duration: 6000,
  isClosable: true,
};
