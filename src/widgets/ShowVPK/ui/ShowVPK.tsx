import { Suspense, memo, useCallback, useState } from "react";

import { QuestionIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { StateSchema } from "/src/app/providers";

import { SelectVPK } from "/src/features/SelectVPK";

import Loader from "/src/shared/ui/Loader/Loader";

import styles from "./ShowVPK.module.scss";

const trigger = window.screen.width > 768 ? "hover" : "click";

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
            <Popover trigger={trigger}>
              <PopoverTrigger>
                <QuestionIcon
                  w={8}
                  h={8}
                  color={"var(--inverted-secondary-color)"}
                />
              </PopoverTrigger>
              <PopoverContent sx={{ color: "white" }}>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Информация:</PopoverHeader>
                <PopoverBody>
                  ВПК - Вариативные Профессиональные Компетенции. Уникально
                  только для третьего курса и выше.
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
        )}
        {showVPKGroups && <SelectVPK handleHideVPKList={handleHideVPKList} />}
      </div>
    </Suspense>
  );
});
