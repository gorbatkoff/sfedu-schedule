import { FC, memo, useEffect, useState } from "react";

import styles from "./SelectVPK.module.scss";
import { IScheduleTable } from "/src/entities/ScheduleTable";
import { Button, Heading, useToast } from "@chakra-ui/react";
import { $api } from "/src/shared/api/api";
import { IChoice } from "/src/features/SearchSchedule";
import { vpkSort } from "/src/shared/lib/vpkSort";
import { IVPK } from "/src/features/SelectVPK/model/types/VPK";
import useCurrentWeek from "/src/shared/hooks/useCurrentWeek";

interface SelectVPKProps {
  schedule: IScheduleTable;
  updateData: (data: IScheduleTable) => void;
}

const SelectVPK: FC<SelectVPKProps> = memo(({ schedule }) => {
  const toast = useToast();
  const { week } = useCurrentWeek();
  const [VPKList, setVPKList] = useState<IChoice[]>();

  useEffect(() => {
    fetchVPKList();
  }, []);

  // По какой-то причине отправляется 2 запроса... надо узнать почему
  async function fetchVPKList() {
    try {
      const request = await $api.get("?query=ВПК");

      setVPKList(request.data.choices);
    } catch (error) {
      console.log(error);
    }
  }

  if (VPKList === undefined || schedule.result === null) return null;

  if (+schedule.table?.name[4] < 3) {
    return null;
  }

  if (
    schedule.table?.name.startsWith("КТс") &&
    schedule.table?.name[4] === "3"
  ) {
    return null;
  }

  async function setVPK(vpk: IVPK) {
    try {
      const request = await $api.get("/", {
        params: {
          group: vpk.group,
          week: week,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  console.log("downloaded");

  return (
    <div className={styles.SelectVPK}>
      <Heading as="h3" size="md">
        Установите группу ВПК
      </Heading>
      <div className={styles.vpkList}>
        {vpkSort(VPKList).map((item, index) => (
          <Button key={index} onClick={() => setVPK(item)}>
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
});

export default SelectVPK;
