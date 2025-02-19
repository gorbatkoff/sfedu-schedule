import { useRef } from "react";

import { Button, FormControl, Input, Textarea } from "@chakra-ui/react";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";

import { chat_id, token } from "/src/shared/const/global/const";

import styles from "./LeaveFeedback.module.scss";

const callConfetti = () => {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
};

const LeaveFeedback = () => {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const contactRef = useRef<HTMLInputElement | null>(null);
  const feedbackRef = useRef<HTMLTextAreaElement | null>(null);

  const sendData = async () => {
    try {
      const feedBackText = `${nameRef.current?.value} написал отзыв! ======================================================= Связаться: с пользователем ${contactRef.current?.value} ======================================================= Отзыв: ${feedbackRef.current?.value}`;
      await fetch(
        `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&parse_mode=html&text=${feedBackText}`
      );

      callConfetti();
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
          Отправить отзыв
        </Button>
      </FormControl>
    </div>
  );
};
export default LeaveFeedback;
