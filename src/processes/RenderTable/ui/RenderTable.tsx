import { memo } from "react";

import { useSelector } from "react-redux";

import { getUserSettings } from "/src/widgets/DrawerMenu";
import { ScheduleCardsList } from "/src/widgets/ScheduleCardsList";

import { ScheduleTable } from "/src/entities/ScheduleTable";

interface IRenderTable {
  isLoading: boolean;
}

export const RenderTable = memo((props: IRenderTable) => {
  const { isLoading } = props;

  const screenWidth = window.screen.width;
  const showScheduleAsCards = useSelector(getUserSettings);

  if (screenWidth > 768) return <ScheduleTable isLoading={isLoading} />;
  if (screenWidth <= 768 && !showScheduleAsCards)
    return <ScheduleTable isLoading={isLoading} />;
  return <ScheduleCardsList isLoading={isLoading} />;
});
