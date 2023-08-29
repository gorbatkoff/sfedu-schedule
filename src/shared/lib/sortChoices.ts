import { IChoice } from "/src/features/SearchSchedule";

export const sortFunction = (a: IChoice, b: IChoice) => {
  const aNumber = +a.name.split("-")[1];
  const bNumber = +b.name.split("-")[1];

  if (aNumber < bNumber) {
    return -1;
  }
  if (aNumber > bNumber) {
    return 1;
  }
  return 0;
};
