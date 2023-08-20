import { ReactNode } from "react";

import classNames from "classnames";

import styles from "./Container.module.scss";

interface ContainerProps {
  className?: string;
  children: ReactNode;
  isShort?: true;
}

export const Container = (props: ContainerProps) => {
  const { className, children, isShort } = props;

  return (
    <div
      className={classNames(styles.Container, { [styles.short]: isShort }, [
        className,
      ])}
    >
      {children}
    </div>
  );
};
