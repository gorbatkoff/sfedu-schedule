import { ButtonHTMLAttributes, memo } from "react";

import { StarIcon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  IconButton,
  useColorMode,
  useToast,
} from "@chakra-ui/react";

import { favoriteSearchActions } from "/src/entities/ScheduleTable";

import { TOAST_SEARCH_REMOVED } from "/src/shared/const/toast/toast";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";

import styles from "./FavoriteChoice.module.scss";

type FavoriteChoiceProps = {
  className?: string;
  title: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const FavoriteChoice = memo(
  ({ title, onClick }: FavoriteChoiceProps) => {
    const { colorMode } = useColorMode();
    const dispatch = useAppDispatch();
    const toast = useToast();
    const handleRemoveFavorite = async () => {
      dispatch(favoriteSearchActions.removeSearchFromFavorite(title));
      toast(TOAST_SEARCH_REMOVED);
    };

    return (
      <div className={styles.ChoiceWrapper}>
        <Button
          type="reset"
          className={styles.FavoriteChoice}
          onClick={onClick}
        >
          <Heading
            size="md"
            color={colorMode}
            className={styles.favoriteChoiceHeader}
          >
            {title}
          </Heading>
        </Button>
        <IconButton
          aria-label="Избранный поиск"
          onClick={handleRemoveFavorite}
          className={styles.actionButton}
        >
          <StarIcon color="yellow" />
        </IconButton>
      </div>
    );
  }
);
