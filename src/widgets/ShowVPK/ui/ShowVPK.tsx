import { Suspense, memo, useCallback, useState } from "react";

import { PhoneIcon, QuestionIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import { Box, Button, Tooltip } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { StateSchema } from "/src/app/providers";

import { SelectVPK } from "/src/features/SelectVPK";

import Loader from "/src/shared/ui/Loader/Loader";

import styles from "./ShowVPK.module.scss";

export const ShowVPK = memo(() => {
  const [showVPKGroups, setShowVPKGroups] = useState(false);

  const schedule = useSelector((state: StateSchema) => state.schedule);

  const handleHideVPKList = useCallback(() => {
    setShowVPKGroups(false);
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <div className={styles.showVPK}>
        {!showVPKGroups && schedule?.schedule?.table?.name && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "0 auto 2em auto",
              columnGap: "10px",
              alignItems: "center",
              width: "80vw",
            }}
          >
            <Button
              className={styles.showVPKButton}
              onClick={() => setShowVPKGroups(true)}
            >
              Выбрать ВПК
            </Button>
            <Tooltip
              label="ВПК - Вариативные Профессиональные Компетенции. Уникально только для третьего курса и выше."
              fontSize="md"
            >
              <QuestionIcon
                w={8}
                h={8}
                color={"var(--inverted-secondary-color)"}
              />
            </Tooltip>
          </Box>
        )}
        {showVPKGroups && <SelectVPK handleHideVPKList={handleHideVPKList} />}
      </div>
    </Suspense>
  );
});
