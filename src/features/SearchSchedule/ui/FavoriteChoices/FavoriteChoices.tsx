import { useSelector } from "react-redux";

import { FavoriteChoice } from "/src/shared/ui/FavoriteChoice/FavoriteChoice";
import { getFavoriteSearch } from "/src/entities/ScheduleTable/model/selectors/getFavoriteSearch";
import { useLazyFetchGroupQuery } from "/src/features/SearchSchedule/api";

export const FavoriteChoices = () => {
  const favoriteChoices = useSelector(getFavoriteSearch);

  const [fetchGroup, { data, isLoading }] = useLazyFetchGroupQuery();

  return (
    <div>
      {favoriteChoices.map((choice, index) => {
        return (
          <FavoriteChoice
            title={choice.name}
            key={index}
            onClick={() => fetchGroup(choice.group, true)}
          />
        );
      })}
    </div>
  );
};
