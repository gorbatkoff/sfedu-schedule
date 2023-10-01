import StateSchema from "/src/app/Providers/StoreProvider/config/StateSchema";

export const getUserSettings = (state: StateSchema) =>
  state.userGroup.userSettings.showScheduleAsCards;
