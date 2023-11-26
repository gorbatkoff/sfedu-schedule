import { StateSchema } from "/src/app/Providers";

export const getSchedule = (state: StateSchema) => state.schedule;
export const getScheduleTable = (state: StateSchema) => state.schedule.schedule;
