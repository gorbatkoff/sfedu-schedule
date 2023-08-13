import { Td } from "@chakra-ui/react";
import { getInfoAboutElement } from "/src/shared/lib/getInfoAboutElement";

interface ITableCell {
  element: string;
}

const TableCell = ({ element }: ITableCell) => {
  return <Td sx={{ background: getInfoAboutElement(element) }}>{element}</Td>;
};

export default TableCell;
