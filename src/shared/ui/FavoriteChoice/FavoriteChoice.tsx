import { ButtonHTMLAttributes, memo } from "react";

import { Button, Heading, IconButton, useToast } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

import styles from "./FavoriteChoice.module.scss";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";
import { favoriteSearchActions } from "/src/entities/Table/model/slice/favoriteSearchSlice";

type FavoriteChoiceProps = {
  className?: string;
  title: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const FavoriteChoice = memo(
  ({ className, title, onClick }: FavoriteChoiceProps) => {
    const dispatch = useAppDispatch();
    const toast = useToast();
    const handleRemoveFavorite = async () => {
      await dispatch(favoriteSearchActions.removeSearchFromFavorite(title));

      toast({
        title: "Удалено",
        description: `Поиск ${title} был удалён!`,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    };

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          type="reset"
          className={styles.FavoriteChoice}
          onClick={onClick}
          sx={{ justifyContent: "flex-start" }}
        >
          <Heading size="md" color="white">
            {title}
          </Heading>
        </Button>
        <IconButton aria-label="Избранный поиск" onClick={handleRemoveFavorite}>
          <StarIcon color="yellow" />
        </IconButton>
      </div>
    );
  },
);
