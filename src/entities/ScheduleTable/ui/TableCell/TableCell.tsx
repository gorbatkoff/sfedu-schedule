import { FC } from "react";

import { ColorMode, Td } from "@chakra-ui/react";

import { getInfoAboutElement } from "/src/shared/lib/getInfoAboutElement";

interface ITableCell {
  element: string;
  colorMode: ColorMode;
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
  colorMode,
  indexOfCell,
  indexOfRow,
  tableHead,
}) => {
  /*
  const time = tableHead[indexOfCell]?.split("-");
  const startTime = time && Number(time[0].replace(":", ""));
  const endTime = time && Number(time[1].replace(":", ""));
  const isCurrentCell =
    startTime <= currentTime &&
    currentTime <= endTime &&
    indexOfRow === currentDate.getUTCDay();*/

  return (
    <Td
      sx={{
        background: getInfoAboutElement(element, colorMode),
        color: "white",
        borderRight: "1px solid var(--chakra-colors-chakra-border-color)",
      }}
    >
      {element}
    </Td>
  );
};
