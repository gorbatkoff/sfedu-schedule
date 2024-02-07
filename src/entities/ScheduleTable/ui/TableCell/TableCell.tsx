import { Td, useColorMode } from "@chakra-ui/react";

import { getInfoAboutElement } from "/src/shared/lib/getInfoAboutElement";

interface ITableCell {
  element: string;
}

export const TableCell = ({ element }: ITableCell) => {
  const { colorMode } = useColorMode();

  return (
    <Td
      sx={{
        background: getInfoAboutElement(element, colorMode),
        color: "white",
      }}
    >
      {element.replaceAll(/_/g, "")}
    </Td>
  );
};
