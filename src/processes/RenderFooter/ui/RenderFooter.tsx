import { memo } from "react";

import { useSelector } from "react-redux";

import { Footer } from "/src/widgets/Footer";

import { getSchedule } from "/src/entities/ScheduleTable";

export const RenderFooter = memo(() => {
  const screenWidth = window.screen.width;

  const schedule = useSelector(getSchedule);

  if (screenWidth > 768 || !schedule.schedule.table.name) return null;
  if (screenWidth <= 768) return <Footer />;
  return <Footer />;
});
