import styles from "./LeaveFeedback.module.scss";
import { Button, FormControl, Input, Textarea } from "@chakra-ui/react";
import { useRef } from "react";
import { chat_id, token } from "/src/pages/ErrorPage/ui/ErrorPage";
import { useNavigate } from "react-router-dom";

const LeaveFeedback = () => {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const contactRef = useRef<HTMLInputElement | null>(null);
  const feedbackRef = useRef<HTMLTextAreaElement | null>(null);

  const sendData = async () => {
    try {
      const feedBackText = `${nameRef.current?.value} написал отзыв! ======================================================= Связаться: с пользователем ${contactRef.current?.value} ======================================================= Отзыв: ${feedbackRef.current?.value}`;
      await fetch(
        `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&parse_mode=html&text=${feedBackText}`,
      );

      navigate("/thanks-page", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.LeaveFeedback}>
      <FormControl>
        <Input
          ref={nameRef}
          onChange={(e) => (nameRef.current = e.target)}
          isRequired={true}
          placeholder="Введите ваше имя"
          id="name"
          className={styles.formElement}
        />
        <Input
          ref={contactRef}
          onChange={(e) => (contactRef.current = e.target)}
          placeholder="Как с вами связаться? VK, Telegram"
          id="contact"
          className={styles.formElement}
        />
        <Textarea
          ref={feedbackRef}
          onChange={(e) => (feedbackRef.current = e.target)}
          id="feedback"
          height="2xs"
          className={styles.formElement}
          placeholder="Оставьте отзыв о сайте или опишите как нам его улучшить:"
        />

        <Button
          type="submit"
          width="100%"
          colorScheme="green"
          onClick={sendData}
        >
          Отправить отзыв ❤
        </Button>
      </FormControl>
    </div>
  );
};
export default LeaveFeedback;
