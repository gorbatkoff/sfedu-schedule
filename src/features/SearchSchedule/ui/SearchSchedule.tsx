import { memo } from "react";

import { FavoriteChoices } from "/src/features/SearchSchedule/ui/FavoriteChoices/FavoriteChoices";
import { InputForm } from "/src/features/SearchSchedule/ui/InputForm/InputForm";

export const SearchSchedule = memo(() => {
  return (
    <div id={"search"}>
      <InputForm />
      <FavoriteChoices />
    </div>
  );
});
