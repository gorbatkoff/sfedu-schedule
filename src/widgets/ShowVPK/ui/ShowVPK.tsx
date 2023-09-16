import { memo, Suspense, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import Loader from "/src/shared/ui/Loader/Loader";
import { SelectVPK } from "/src/features/SelectVPK";
import { useSelector } from "react-redux";
import StateSchema from "/src/app/Providers/StoreProvider/config/StateSchema";

export const ShowVPK = memo(() => {
  const [showVPKGroups, setShowVPKGroups] = useState(false);

  const schedule = useSelector((state: StateSchema) => state.schedule);

  return (
    <div>
      {!showVPKGroups && schedule.schedule.table.name && (
        <Box sx={{ display: "flex", justifyContent: "center", margin: "1em" }}>
          <Button sx={{ m: 2 }} onClick={() => setShowVPKGroups(true)}>
            Выбрать ВПК
          </Button>
        </Box>
      )}
      <Suspense fallback={<Loader />}>
        {showVPKGroups && <SelectVPK />}
      </Suspense>
    </div>
  );
});
