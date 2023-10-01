import { useSelector } from "react-redux";
import { getUserSettings } from "/src/widgets/DrawerMenu";
import { ScheduleTable } from "/src/entities/ScheduleTable";
import { ScheduleCardsList } from "/src/widgets/ScheduleCardsList";
import { memo } from "react";

export const RenderTable = memo(() => {
  const screenWidth = window.screen.width;
  const showScheduleAsCards = useSelector(getUserSettings);

  if (screenWidth > 768) return <ScheduleTable />;
  if (screenWidth <= 768 && !showScheduleAsCards) return <ScheduleTable />;
  return <ScheduleCardsList />;
});
