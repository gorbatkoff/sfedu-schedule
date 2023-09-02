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

const userVpk = VPK_FROM_LOCALSTORAGE as IVPK;

const SelectVPK = memo(() => {
  const toast = useToast();
  const { week } = useCurrentWeek();

  const dispatch = useAppDispatch();
  const schedule = useSelector(getSchedule).schedule;
  const VPKList = useSelector((state: StateSchema) => state.selectVPK.choices);

  useEffect(() => {
    dispatch(fetchVPK());
  }, []);

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
      console.log(error);
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
            isDisabled={item.name === userVpk.name}
          >
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
});

export default SelectVPK;
