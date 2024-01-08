import { useEffect } from "react";

import { chat_id, token } from "/src/shared/const/global/const";
import Loader from "/src/shared/ui/Loader/Loader";

import styles from "./ErrorPage.module.scss";

export const ErrorPage = () => {
  const immediatelySendRequest = async () => {
    const errorText = sessionStorage.getItem("ERROR");
    const isProdMode = !window.location.hostname.includes("localhost");
    try {
      if (!window.location.href.includes("localhost")) {
        await fetch(
          `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&parse_mode=html&text=${errorText}`
        );
      }

      if (isProdMode) {
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    immediatelySendRequest();
  }, []);

  return (
    <div className={styles.ErrorPage}>
      <div className={styles.content}>
        <h1>Упс.. Что-то пошло не так.</h1>
        <h2>
          Возвращаемся на главную. <Loader />
        </h2>
      </div>
    </div>
  );
};
