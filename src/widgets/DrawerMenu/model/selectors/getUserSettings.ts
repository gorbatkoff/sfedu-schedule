import { StateSchema } from "/src/app/providers";

export const getUserSettings = (state: StateSchema) =>
  state.userGroup.userSettings.showScheduleAsCards;
