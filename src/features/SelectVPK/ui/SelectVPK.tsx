import { memo, useEffect } from "react";

import styles from "./SelectVPK.module.scss";
import { Button, Heading, useToast } from "@chakra-ui/react";
import { IVPK } from "/src/features/SelectVPK/model/types/VPK";
import useCurrentWeek from "/src/shared/hooks/useCurrentWeek";
import { useSelector } from "react-redux";
import { getSchedule } from "/src/entities/Table/model/selectors/getSchedule";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";
import {
  fetchVPK,
  fetchVPKByWeek,
  selectVPKActions,
} from "/src/features/SelectVPK/model/slice/selectVPKSlice";
import StateSchema from "/src/app/Providers/StoreProvider/config/StateSchema";
import { VPK_FROM_LOCALSTORAGE } from "/src/shared/const/localStorageKeys";
import { tableActions } from "/src/entities/Table/model/slice/tableSlice";

const userVpk = VPK_FROM_LOCALSTORAGE as IVPK;

const SelectVPK = memo(() => {
  const toast = useToast();
  const { week } = useCurrentWeek();

  const dispatch = useAppDispatch();
  const schedule = useSelector(getSchedule).schedule;
  const VPKList = useSelector((state: StateSchema) => state.selectVPK.choices);
  const VPKInfo = useSelector((state: StateSchema) => state.selectVPK.VPK);
  const VPKData = useSelector((state: StateSchema) => state.selectVPK.VPKData);

  // Check here
  useEffect(() => {
    dispatch(fetchVPK());
  }, []);

  const updateData = async () => {
    const header = schedule.table.table.slice(0, 2);
    const slicedSchedule = schedule.table.table.slice(2);
    const slicedVPK = VPKData.table.table.slice(2);

    const mergedSchedule = slicedSchedule.map((row, rowIndex) => {
      return row.map((item, itemIndex) => {
        if (item.includes("Дисциплины ВПК")) {
          item = slicedVPK[rowIndex][itemIndex];
          return item;
        }
        return item;
      });
    });

    dispatch(tableActions.mergeScheduleAndVPK(header.concat(mergedSchedule)));
  };

  useEffect(() => {
    updateData();
  }, [fetchVPKByWeek]);

  /*  if (VPKList === undefined || schedule.result === null) return null;

  if (+schedule.table?.name[4] < 3) {
    return null;
  }

  if (
    schedule.table?.name.startsWith("КТс") &&
    schedule.table?.name[4] === "3"
  ) {
    return null;
  }*/

  async function setVPK(vpk: IVPK) {
    try {
      await dispatch(selectVPKActions.setVPK(vpk));
      await dispatch(fetchVPKByWeek({ vpk, week }));
      toast({
        title: "Успех!",
        description: "Вы успешно выбрали ВПК!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Ошибка!",
        description: "Не удалось успешно установить ВПК или получить данные",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <div className={styles.SelectVPK}>
      <Heading as="h3" size="md">
        Установите группу ВПК
      </Heading>
      <div className={styles.vpkList}>
        {VPKList.map((item, index) => (
          <Button
            key={index}
            onClick={() => setVPK(item)}
            isDisabled={item.name === VPKInfo.name}
          >
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
});

export default SelectVPK;
