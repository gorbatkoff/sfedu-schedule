import { FC } from "react";

import { Td, useColorMode } from "@chakra-ui/react";

import { getInfoAboutElement } from "/src/shared/lib/getInfoAboutElement";

interface ITableCell {
  element: string;
  indexOfCell: number;
  indexOfRow: number;
  tableHead: string[];
}

const currentDate = new Date();

const currentTime = Number(
  `${currentDate.getHours()}${currentDate.getMinutes()}`
);

export const TableCell: FC<ITableCell> = ({
  element,
  indexOfCell,
  indexOfRow,
  tableHead,
}) => {
  const { colorMode } = useColorMode();

  const time = tableHead[indexOfCell]?.split("-");
  const startTime = time && Number(time[0].replace(":", ""));
  const endTime = time && Number(time[1].replace(":", ""));
  const isCurrentCell =
    startTime <= currentTime &&
    currentTime <= endTime &&
    indexOfRow === currentDate.getUTCDay();

  return (
    <Td
      sx={{
        background: getInfoAboutElement(element, colorMode),
        color: "white",
        border: isCurrentCell && "2px dashed white",
        borderRight:
          !isCurrentCell &&
          "1px solid var(--chakra-colors-chakra-border-color)",
      }}
    >
      {element}
    </Td>
  );
};
