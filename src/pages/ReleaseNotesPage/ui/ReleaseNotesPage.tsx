import React, { useState } from "react";

import {
  Box,
  Card,
  CardBody,
  ChakraProvider,
  HStack,
  Heading,
  Select,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";

import styles from "./ReleaseNotesPage.module.scss";

interface Change {
  type: "Feature" | "Bugfix" | "Improvement" | "Removal";
  description: string;
}

interface ReleaseNote {
  version: string;
  date: string;
  changes: Change[];
}

const releaseNotes: ReleaseNote[] = [
  {
    version: "1.2.1",
    date: "22-02-2025",
    changes: [
      {
        type: "Feature",
        description: "Добавлен виджет с цитатами об учёбе.",
      },

      {
        type: "Feature",
        description:
          "Дни недели на мобильной версии скроллят вместе с экраном.",
      },
      {
        type: "Feature",
        description:
          "Прошедшие дни недели на декстопной версии теперь помечаются прозрачностю в 50%.",
      },
      {
        type: "Feature",
        description: "Текущая неделя подсвечивается жёлтой рамкой снизу.",
      },
      {
        type: "Feature",
        description:
          "Добавлена страница release-notes с описаниями обновлений.",
      },
      {
        type: "Improvement",
        description: "Слегка увеличена ширина кнопок при выборе ВПК.",
      },
      {
        type: "Improvement",
        description:
          "Обновлён текст в модальном окне при отправке отзыва, а также обновлена иконка для его открытия.",
      },
      {
        type: "Bugfix",
        description:
          "Исправлена ошибка в избранных расписаниях: теперь при отправке по кнопке данные приходят с корректной неделей.",
      },
      {
        type: "Removal",
        description:
          "Блок с ближайшими занятиями был удалён в связи с низким уровнем использования.",
      },
    ],
  },
  {
    version: "1.2.0",
    date: "15-02-2025",
    changes: [
      {
        type: "Feature",
        description:
          "Добавлено конфетти при: выборе группы, выборе ВПК, отправке отзыва.",
      },
      {
        type: "Improvement",
        description: "Улучшена оптимизация..",
      },
      {
        type: "Improvement",
        description:
          "Возвращена иконка расписания, слегка уменьшено количество снежинок.",
      },
    ],
  },
];

const ChangeTag: React.FC<{ type: Change["type"] }> = ({ type }) => {
  const colors: Record<Change["type"], string> = {
    Feature: "blue",
    Bugfix: "orange",
    Improvement: "green",
    Removal: "red",
  };
  return (
    <Tag className={styles.changeTag} colorScheme={colors[type] || "gray"}>
      {type}
    </Tag>
  );
};

const ReleaseCard: React.FC<ReleaseNote> = ({ version, date, changes }) => (
  <Card
    width="full"
    p={4}
    boxShadow="md"
    borderRadius="md"
    className={styles.card}
  >
    <CardBody>
      <Heading size="md">Версия {version}</Heading>
      <Text fontSize="sm" color="gray.500">
        {date}
      </Text>
      <VStack align="start" mt={2}>
        {changes.map((change, index) => (
          <HStack key={index} spacing={4} mt={5} className={styles.stack}>
            <ChangeTag type={change.type} />
            <Text>{change.description}</Text>
          </HStack>
        ))}
      </VStack>
    </CardBody>
  </Card>
);

const ReleaseNotesPage: React.FC = () => {
  const [selectedVersion, setSelectedVersion] = useState<string>("");

  const filteredNotes = selectedVersion
    ? releaseNotes.filter((note) => note.version === selectedVersion)
    : releaseNotes;

  return (
    <Box maxW="900px" mx="auto" py={8} px={4}>
      <Heading mb={4} sx={{ color: "white" }}>
        Журнал обновлений
      </Heading>
      <Select
        className={styles.select}
        placeholder="Выберите версию"
        mb={4}
        sx={{ color: "white" }}
        onChange={(e) => setSelectedVersion(e.target.value)}
      >
        {releaseNotes.map((note) => (
          <option key={note.version} value={note.version}>
            {note.version}
          </option>
        ))}
      </Select>
      <VStack spacing={4}>
        {filteredNotes.map((note) => (
          <ReleaseCard key={note.version} {...note} />
        ))}
      </VStack>
    </Box>
  );
};

export default ReleaseNotesPage;
