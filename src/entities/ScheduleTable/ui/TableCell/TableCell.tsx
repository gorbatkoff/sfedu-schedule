import { Td, useColorMode } from "@chakra-ui/react";

import { getInfoAboutElement } from "/src/shared/lib/getInfoAboutElement";

interface ITableCell {
  element: string;
  textColor: string;
}

const TableCell = ({ element, textColor }: ITableCell) => {
  const { colorMode } = useColorMode();

  return (
    <Td
      sx={{
        background: getInfoAboutElement(element, colorMode),
        color: "white",
      }}
    >
      {element}
    </Td>
  );
};

export default TableCell;
