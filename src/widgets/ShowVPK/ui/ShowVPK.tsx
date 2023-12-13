import { memo, Suspense, useCallback, useState } from "react";
import { useSelector } from "react-redux";

import { StateSchema } from "/src/app/Providers";

import { Box, Button } from "@chakra-ui/react";
import { SelectVPK } from "/src/features/SelectVPK";
import Loader from "/src/shared/ui/Loader/Loader";

import styles from "./ShowVPK.module.scss";

export const ShowVPK = memo(() => {
  const [showVPKGroups, setShowVPKGroups] = useState(false);

  const schedule = useSelector((state: StateSchema) => state.schedule);

  const handleHideVPKList = useCallback(() => {
    setShowVPKGroups(false);
  }, []);

  const scheduleCourse = +schedule?.schedule?.table?.name.charAt(4);

  if (scheduleCourse < 3) return null;

  return (
    <Suspense fallback={<Loader />}>
      <div className={styles.showVPK}>
        {!showVPKGroups && schedule?.schedule?.table?.name && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "2em",
            }}
          >
            <Button
              className={styles.showVPKButton}
              onClick={() => setShowVPKGroups(true)}
            >
              Выбрать ВПК
            </Button>
          </Box>
        )}
        {showVPKGroups && <SelectVPK handleHideVPKList={handleHideVPKList} />}
      </div>
    </Suspense>
  );
});
