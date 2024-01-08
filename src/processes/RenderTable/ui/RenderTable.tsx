import { useSelector } from "react-redux";

import { getUserSettings } from "/src/widgets/DrawerMenu";
import { ScheduleCardsList } from "/src/widgets/ScheduleCardsList";

import { ScheduleTable } from "/src/entities/ScheduleTable";

export const RenderTable = () => {
  const screenWidth = window.screen.width;
  const showScheduleAsCards = useSelector(getUserSettings);

  if (screenWidth > 768) return <ScheduleTable />;
  if (screenWidth <= 768 && !showScheduleAsCards) return <ScheduleTable />;
  return <ScheduleCardsList />;
};
