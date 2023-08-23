import { memo } from "react";

import { Heading, IconButton } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

import styles from "./FavoriteChoice.module.scss";

interface FavoriteChoiceProps {
  className?: string;
  title: string;
}

export const FavoriteChoice = memo(
  ({ className, title }: FavoriteChoiceProps) => {
    return (
      <div className={styles.FavoriteChoice}>
        <Heading size="md" color="white">
          {title}
        </Heading>
        <IconButton aria-label="Избранный поиск">
          <StarIcon color="yellow" />
        </IconButton>
      </div>
    );
  },
);
