import StateSchema from "/src/app/Providers/StoreProvider/config/StateSchema";

export const getSchedule = (state: StateSchema) => state.schedule;
export const getScheduleTable = (state: StateSchema) => state.schedule.schedule;
