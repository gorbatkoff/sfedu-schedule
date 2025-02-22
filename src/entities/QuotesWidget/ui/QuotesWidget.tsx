import { useState } from "react";

import { RepeatIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

import { getRandomNumber } from "/src/shared/lib/generateRandomNumber";

import styles from "./QuotesWidget.module.scss";
// @ts-ignore
import quotes from "/public/quotes.json";

const QuotesWidget = () => {
  const [quoteCount, setQouteCount] = useState(() => getRandomNumber(1, 150));

  if (!quotes) return null;

  return (
    <div className={styles.quotesWrapper}>
      <div>&#xf10d;</div>
      <div className={styles.reload}>
        <IconButton
          onClick={() => setQouteCount(getRandomNumber(1, 150))}
          aria-label="Reload"
        >
          <RepeatIcon />
        </IconButton>
      </div>

      <blockquote>&quot;{quotes[quoteCount]}&quot;</blockquote>
    </div>
  );
};

export default QuotesWidget;
