import { ReactNode } from "react";

import styles from "./MainColumns.module.scss";

interface IMainColumns {
  children: ReactNode;
}

const MainColumns = ({ children }: IMainColumns) => {
  return <div className={styles.mainColumns}>{children}</div>;
};

export default MainColumns;
