import { memo, useCallback } from "react";

import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  IconButton,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

import {
  IScheduleTable,
  favoriteSearchActions,
  getFavoriteSearch,
} from "/src/entities/ScheduleTable";

import {
  ADD_TO_FAVORITE_SUCCESS,
  REMOVE_FROM_FAVORITE,
} from "/src/shared/const/toast/toast";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";
import { addSearchToFavorite } from "/src/shared/lib/addSearchToFavorite";

import styles from "../ScheduleTable.module.scss";

interface IScheduleInfoProps {
  schedule: IScheduleTable;
}

export const ScheduleInfo = memo((props: IScheduleInfoProps) => {
  const { schedule } = props;
  const textColor = useColorModeValue("black", "white");

  const favoriteChoices = useSelector(getFavoriteSearch);
  const isFavorite =
    favoriteChoices.filter((item) => item.name === schedule.table?.name)
      .length > 0;

  const dispatch = useAppDispatch();
  const toast = useToast();

  const handleFavoriteSearch = useCallback(
    (schedule: IScheduleTable) => {
      const favoriteSearch = {
        group: schedule.table.group,
        name: schedule.table.name,
      };

      const response = addSearchToFavorite(favoriteSearch);

      if (response) {
        dispatch(favoriteSearchActions.addSearchToFavorite(favoriteSearch));
        toast(ADD_TO_FAVORITE_SUCCESS);
      } else if (isFavorite) {
        dispatch(
          favoriteSearchActions.removeSearchFromFavorite(favoriteSearch.name)
        );
        toast(REMOVE_FROM_FAVORITE);
      }
    },
    [dispatch, isFavorite, toast]
  );

  return (
    <Box className={styles.groupActions}>
      <Heading color={textColor} className={styles.tableTitle}>
        Расписание
        <span
          style={{
            backgroundColor: "#ffffff14",
            padding: "0 10px",
            borderRadius: "12px",
            margin: "0 10px",
          }}
        >
          {schedule.table.name}
        </span>
        <span>Неделя:</span>
        <span
          style={{
            backgroundColor: "#ffffff14",
            padding: "0 10px",
            borderRadius: "12px",
            margin: "0 0.5em",
          }}
          className={styles.week}
        >
          {schedule.table.week}
        </span>
      </Heading>
      <IconButton
        aria-label="Добавить в избранное"
        onClick={() => handleFavoriteSearch(schedule)}
      >
        <StarIcon color={isFavorite ? "yellow" : ""} />
      </IconButton>
    </Box>
  );
});
