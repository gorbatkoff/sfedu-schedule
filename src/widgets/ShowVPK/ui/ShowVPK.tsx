import { memo, Suspense, useCallback, useState } from "react";
import { useSelector } from "react-redux";

import StateSchema from "/src/app/Providers/StoreProvider/config/StateSchema";

import { Box, Button } from "@chakra-ui/react";
import { SelectVPK } from "/src/features/SelectVPK";
import Loader from "/src/shared/ui/Loader/Loader";

export const ShowVPK = memo(() => {
  const [showVPKGroups, setShowVPKGroups] = useState(false);

  const schedule = useSelector((state: StateSchema) => state.schedule);

  const handleHideVPKList = useCallback(() => {
    setShowVPKGroups(false);
  }, []);

  const scheduleCourse = +schedule?.schedule?.table?.name.charAt(4);

  if (scheduleCourse < 3) return null;

  return (
    <div>
      {!showVPKGroups && schedule?.schedule?.table?.name && (
        <Box sx={{ display: "flex", justifyContent: "center", margin: "1em" }}>
          <Button sx={{ m: 2 }} onClick={() => setShowVPKGroups(true)}>
            Выбрать ВПК
          </Button>
        </Box>
      )}
      <Suspense fallback={<Loader />}>
        {showVPKGroups && <SelectVPK handleHideVPKList={handleHideVPKList} />}
      </Suspense>
    </div>
  );
});
