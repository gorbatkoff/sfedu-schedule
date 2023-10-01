export interface IUserGroup {
  name: string;
  groupId: string;
}

export interface IUserSettings {
  isShowEmptyLessons: boolean;
  showScheduleAsCards: boolean;
}

export interface UserGroupSchema {
  userGroup: IUserGroup;
  userSettings: IUserSettings;
}
