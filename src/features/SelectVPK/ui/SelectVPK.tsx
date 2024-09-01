import { FC, memo, useCallback, useEffect, useMemo } from "react";

import { Button, Heading, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { StateSchema } from "/src/app/providers";

import {
  IVPK,
  fetchVPK,
  fetchVPKByWeek,
  selectVPKActions,
} from "/src/features/SelectVPK";

import { getSchedule, tableActions } from "/src/entities/ScheduleTable";

import {
  REMOVE_VPK_ERROR,
  SELECT_VPK_ERROR,
  VPK_REMOVED_SUCCESSFULLY,
  VPK_SELECTED_SUCCESSFULLY,
} from "/src/shared/const/toast/toast";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";
import useCurrentWeek from "/src/shared/hooks/useCurrentWeek";
import { VPKSort } from "/src/shared/lib/vpkSort";

import styles from "./SelectVPK.module.scss";

interface ISelectVPKProps {
  handleHideVPKList: () => void;
}

const SelectVPK: FC<ISelectVPKProps> = memo(({ handleHideVPKList }) => {
  const toast = useToast();
  const { week } = useCurrentWeek();

  const dispatch = useAppDispatch();
  const schedule = useSelector(getSchedule).schedule;
  const VPKList = useSelector((state: StateSchema) => state.selectVPK.choices);
  const VPKInfo = useSelector((state: StateSchema) => state.selectVPK.VPK);
  const VPKData = useSelector((state: StateSchema) => state.selectVPK.VPKData);

  const filteredVPKList = useMemo(() => {
    return [...VPKList].sort(VPKSort);
  }, [VPKList]);

  useEffect(() => {
    dispatch(fetchVPK());
  }, []);

  const updateData = useCallback(async () => {
    const header = schedule.table.table.slice(0, 2);
    const slicedSchedule = schedule.table.table.slice(2);
    const slicedVPK = VPKData.table.table.slice(2);

    const mergedSchedule = slicedSchedule.map((row, rowIndex) => {
      return row.map((item, itemIndex) => {
        if (item.includes("Дисциплины ВПК")) {
          item = slicedVPK?.[rowIndex]?.[Number(itemIndex)];
          return item;
        }
        return item;
      });
    });

    dispatch(tableActions.mergeScheduleAndVPK(header.concat(mergedSchedule)));
  }, [VPKData.table.table, dispatch, schedule.table.table]);

  useEffect(() => {
    updateData();
  }, [fetchVPKByWeek]);

  const selectVPK = useCallback(
    async (vpk: IVPK) => {
      try {
        dispatch(selectVPKActions.setVPK(vpk));
        await dispatch(fetchVPKByWeek({ vpk, week }));
        toast(VPK_SELECTED_SUCCESSFULLY);
      } catch (error) {
        toast(SELECT_VPK_ERROR);
      }
    },
    [dispatch, toast, week]
  );

  const removeVPK = useCallback(() => {
    try {
      dispatch(selectVPKActions.setVPK({ group: "", name: "", id: "" }));
      toast(VPK_REMOVED_SUCCESSFULLY);
    } catch (error) {
      toast(REMOVE_VPK_ERROR);
    }
  }, [dispatch, toast]);

  return (
    <div className={styles.SelectVPK}>
      <Heading as="h3" size="md">
        Установите группу ВПК
      </Heading>
      <div className={styles.hideVPKList}>
        <Button onClick={removeVPK} isDisabled={!VPKInfo.id}>
          Удалить выбранный ВПК
        </Button>
        <Button onClick={handleHideVPKList} className={styles.hideVPKButton}>
          Скрыть
        </Button>
      </div>
      <div className={styles.vpkList}>
        {filteredVPKList.map((item, index) => (
          <Button
            key={`${item.name}-${index}`}
            onClick={() => selectVPK(item)}
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
