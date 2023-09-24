import { memo } from "react";

import { InputForm } from "./InputForm/InputForm";
import { QueryChoices } from "./QueryChoices/QueryChoices";
import { FavoriteChoices } from "./FavoriteChoices/FavoriteChoices";

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
