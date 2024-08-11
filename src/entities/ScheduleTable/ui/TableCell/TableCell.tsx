import { FC, memo } from "react";

import { ColorMode, Td } from "@chakra-ui/react";

import { getInfoAboutElement } from "/src/shared/lib/getInfoAboutElement";

interface ITableCell {
  element: string;
  colorMode: ColorMode;
  onDoubleClick: (cellInfo: string) => void;
}

export const TableCell: FC<ITableCell> = memo(
  ({ element, colorMode, onDoubleClick }) => {
    return (
      <Td
        onDoubleClick={() => onDoubleClick(element)}
        sx={{
          background: getInfoAboutElement(element, colorMode),
          color: "white",
          borderRight: "1px solid var(--chakra-colors-chakra-border-color)",
        }}
      >
        {element}
      </Td>
    );
  }
);
