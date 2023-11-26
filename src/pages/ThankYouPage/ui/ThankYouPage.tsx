import { Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import styles from "./ThankYouPage.module.scss";

export const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.ThankYouPageWrapper}>
      <Text fontSize="3xl" className={styles.thankHeader}>
        Благодарим за отзыв!
      </Text>

      <Button
        as="a"
        style={{
          width: "fit-content",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
        }}
        onClick={() => navigate("/", { replace: true })}
      >
        Вернуться на главную
      </Button>
    </div>
  );
};
