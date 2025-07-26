import { ButtonHTMLAttributes, memo, useCallback } from "react";

import { Button, IconButton, useToast } from "@chakra-ui/react";
import {
  ButtonElevated,
  ButtonFilled,
  ButtonFunction,
  ButtonOutline,
  ButtonSimple,
  ButtonTonal,
} from "@snack-uikit/button";
import { CrossSVG, StarFilledSVG, TrashSVG } from "@snack-uikit/icons";
import { Typography } from "@snack-uikit/typography";

import { favoriteSearchActions } from "/src/entities/ScheduleTable";

import { REMOVE_FROM_FAVORITE } from "/src/shared/const/toast/toast";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";

import styles from "./FavoriteChoice.module.scss";

type FavoriteChoiceProps = {
  className?: string;
  title: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const FavoriteChoice = memo(
  ({ title, onClick }: FavoriteChoiceProps) => {
    const dispatch = useAppDispatch();
    const toast = useToast();

    const handleRemoveFavorite = useCallback(async () => {
      dispatch(favoriteSearchActions.removeSearchFromFavorite(title));
      toast(REMOVE_FROM_FAVORITE);
    }, [dispatch, title, toast]);

    return (
      <div className={styles.ChoiceWrapper}>
        <ButtonTonal
          type="reset"
          appearance={"neutral"}
          label={title}
          fullWidth={true}
          onClick={onClick}
        />
        <ButtonSimple
          aria-label="Избранный поиск"
          onClick={handleRemoveFavorite}
          className={styles.actionButton}
          icon={<CrossSVG />}
        />
      </div>
    );
  }
);
