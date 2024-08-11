import { memo } from "react";

import { DrawerCloseButton, DrawerHeader } from "@chakra-ui/react";

interface IDrawerInfoProps {
  handleSaveSettings: () => void;
}

export const DrawerInfo = memo((props: IDrawerInfoProps) => {
  const { handleSaveSettings } = props;

  return (
    <>
      <DrawerCloseButton onClick={handleSaveSettings} />
      <DrawerHeader>Выберите вашу группу</DrawerHeader>
    </>
  );
});
