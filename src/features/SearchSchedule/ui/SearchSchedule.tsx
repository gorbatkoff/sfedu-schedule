import { memo } from "react";

import { useLazyFetchChoicesQuery } from "/src/features/SearchSchedule/api";

import { FavoriteChoices } from "./FavoriteChoices/FavoriteChoices";
import { InputForm } from "./InputForm/InputForm";
import { QueryChoices } from "./QueryChoices/QueryChoices";

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
