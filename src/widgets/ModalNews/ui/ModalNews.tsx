import { FC, useEffect, useState } from "react";

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
import { useNavigate } from "react-router-dom";

interface IModalNews {
  isOpen: boolean;
  onClose: () => void;
  navigateToFeedback: () => void;
}

const isMobileDevice = window.screen.width <= 768;

export const ModalNews: FC<IModalNews> = ({
  isOpen,
  onClose,
  navigateToFeedback,
}) => {
  const navigate = useNavigate();

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
            о сайте, либо же просто оставьте отзыв или обращение. ✨
            <br />
            <br />
            Возможно, у вас есть предложения по улучшению или какие-то идеи,
            которые могли бы сделать наш ресурс ещё более полезным.
            <br />
            <br />
            Спасибо!
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
