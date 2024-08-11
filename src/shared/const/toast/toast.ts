import { UseToastOptions } from "@chakra-ui/react";

export const TOAST_NO_INTERNET: UseToastOptions = {
  title: "Нет интернета!",
  description: "Показано сохраненное расписание вашей группы! 🙂",
  status: "warning",
  duration: 6000,
  isClosable: true,
};

export const GROUP_FETCH_SUCCESS = (name: string): UseToastOptions => ({
  title: "Успех!",
  description: `Расписание группы ${name} загружено успешно!`,
  status: "success",
  duration: 800,
  isClosable: true,
});

export const ADD_TO_FAVORITE_SUCCESS: UseToastOptions = {
  title: "Добавлено! ",
  description: "Успех! Данное расписание было добавлено в список избранных.",
  status: "success",
  duration: 1000,
  isClosable: true,
};

export const REMOVE_FROM_FAVORITE: UseToastOptions = {
  title: "Удалено!",
  description: "Данное расписание было удалено из списка избранных.",
  status: "error",
  duration: 1000,
  isClosable: true,
};

export const TOAST_SEARCH_REMOVED: UseToastOptions = {
  title: "Удалено",
  description: `Поиск был удалён!`,
  status: "error",
  duration: 1000,
  isClosable: true,
};

export const GROUP_NOT_FOUND: UseToastOptions = {
  title: "Группа не найдена",
  description: "Проверьте правильность написания группы",
  status: "error",
  duration: 3000,
  isClosable: true,
};

export const VPK_SELECTED_SUCCESSFULLY: UseToastOptions = {
  title: "Успех!",
  description: "Вы успешно выбрали ВПК!",
  status: "success",
  duration: 3000,
  isClosable: true,
};

export const GROUP_SAVED_SUCCESSFULLY: UseToastOptions = {
  title: "Вы успешно сохранили группу!",
  description: "Теперь вы можете просматривать расписание без интернета! 😊",
  status: "success",
  duration: 4000,
  isClosable: true,
};

export const SELECT_VPK_ERROR: UseToastOptions = {
  title: "Ошибка!",
  description: "Не удалось успешно установить ВПК или получить данные",
  status: "error",
  duration: 3000,
  isClosable: true,
};

export const CELL_INFO_COPY_SUCCESS: UseToastOptions = {
  title: "Успешно скопировано!",
  description: "Информация о паре добавлена в буфер обмена",
  status: "success",
  duration: 1500,
  isClosable: true,
};

export const ERROR_SETTING_DEFAULT_GROUP: UseToastOptions = {
  title: "Ошибка при установке группы!",
  description: "Возможно такой группы не существует.",
  status: "error",
  duration: 3000,
  isClosable: true,
};

export const HELPFUL_MESSAGE: UseToastOptions = {
  title: "Группы были изменены!",
  description: "ИКТИБ сменил ID групп. Проверьте свой список избранных!",
  status: "warning",
  duration: 10000,
  isClosable: true,
};
