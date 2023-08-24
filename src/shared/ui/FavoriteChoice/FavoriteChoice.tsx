import { ButtonHTMLAttributes, memo } from "react";

import { Button, Heading, IconButton } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

import styles from "./FavoriteChoice.module.scss";

type FavoriteChoiceProps = {
  className?: string;
  title: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const FavoriteChoice = memo(
  ({ className, title, onClick }: FavoriteChoiceProps) => {
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
        <IconButton aria-label="Избранный поиск">
          <StarIcon color="yellow" />
        </IconButton>
      </div>
    );
  },
);
