import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IModalNews {
  isOpen: boolean;
  onClose: () => void;
  navigateToFeedback: () => void;
}

export const ModalNews: FC<IModalNews> = ({
  isOpen,
  onClose,
  navigateToFeedback,
}) => {
  const navigate = useNavigate();
  const isMobileDevice = window.screen.width <= 768;

  const leaveFeedback = () => {
    navigate("/leave-feedback");
    handleClose();
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size={isMobileDevice ? "full" : "3xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="3xl">Помогите нам стать лучше ! 🔥</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text as="p" fontSize="xl">
            Дорогие друзья, на связи создатели сайта{" "}
            <span className="sfeduSchedule">Sfedu Schedule</span>!
            <br />
            <br />
            Мы постоянно стремимся улучшить наш сайт, чтобы сделать его
            максимально удобным и полезным для вас. Ваше мнение важно для нас!
            <br />
            <br />
            Мы были бы признательны, если бы вы поделились своими впечатлениями
            о сайте. ✨
            <br />
            <br />
            Возможно, у вас есть предложения по улучшению или какие-то идеи,
            которые могли бы сделать наш ресурс ещё более полезным.
            <br />
            <br />
            Спасибо за ваш вклад в улучшение нашего сервиса!
          </Text>
        </ModalBody>

        <ModalFooter sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button colorScheme="blue" onClick={onClose}>
            Закрыть
          </Button>
          <Button colorScheme="green" onClick={navigateToFeedback}>
            ❤ Оставить отзыв
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
