import { Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ width: "100%" }}>
      <Text
        style={{ margin: "100px auto", textAlign: "center", color: "white" }}
        fontSize="3xl"
      >
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
