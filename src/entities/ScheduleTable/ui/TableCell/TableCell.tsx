import { FC, memo } from "react";

import { ColorMode, Td } from "@chakra-ui/react";

import { getInfoAboutElement } from "/src/shared/lib/getInfoAboutElement";

interface ITableCell {
  element: string;
  className?: string;
  colorMode: ColorMode;
  onClick: (cellInfo: string) => void;
}

export const TableCell: FC<ITableCell> = memo(
  ({ element, colorMode, className, onClick }) => {
    return (
      <Td
        className={className}
        onClick={() => onClick(element)}
        sx={{
          background: getInfoAboutElement(element, colorMode),
          color: "white",
          minWidth: "120px",
          borderRight: "1px solid var(--chakra-colors-chakra-border-color)",
        }}
      >
        {element}
      </Td>
    );
  }
);
