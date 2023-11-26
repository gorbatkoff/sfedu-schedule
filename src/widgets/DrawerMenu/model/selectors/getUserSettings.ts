import { StateSchema } from "/src/app/Providers";

export const getUserSettings = (state: StateSchema) =>
  state.userGroup.userSettings.showScheduleAsCards;
