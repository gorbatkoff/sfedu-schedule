import { Td } from "@chakra-ui/react";
import { getInfoAboutElement } from "/src/shared/lib/getInfoAboutElement";

interface ITableCell {
  element: string;
  textColor: string;
}

const TableCell = ({ element, textColor }: ITableCell) => {
  return (
    <Td sx={{ background: getInfoAboutElement(element), color: "white" }}>
      {element}
    </Td>
  );
};

export default TableCell;
