import { FC, memo } from "react";

import { ColorMode, Td } from "@chakra-ui/react";

import { getInfoAboutElement } from "/src/shared/lib/getInfoAboutElement";

interface ITableCell {
  element: string;
  className?: string;
  onClick: (cellInfo: string) => void;
}

export const TableCell: FC<ITableCell> = memo(
  ({ element, className, onClick }) => {
    return (
      <Td
        className={className}
        onClick={() => onClick(element)}
        sx={{
          background: getInfoAboutElement(element),
          minWidth: "120px",
        }}
      >
        {element}
      </Td>
    );
  }
);
