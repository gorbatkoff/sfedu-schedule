import { memo } from "react";
import { InputForm } from "./InputForm/InputForm";
import { FavoriteChoices } from "./FavoriteChoices/FavoriteChoices";
import { QueryChoices } from "/src/features/SearchSchedule/ui/QueryChoices/QueryChoices";
import { useLazyFetchChoicesQuery } from "/src/features/SearchSchedule/api";

export const SearchSchedule = memo(() => {
  const [fetchByQuery, { data, isLoading }] = useLazyFetchChoicesQuery();

  return (
    <div>
      <InputForm fetchByQuery={fetchByQuery} isLoading={isLoading} />
      <QueryChoices data={data} fetchByQuery={fetchByQuery} />
      <FavoriteChoices />
    </div>
  );
});
