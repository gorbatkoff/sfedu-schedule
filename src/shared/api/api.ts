import axios from "axios";

export const $api = axios.create({
  baseURL: "https://webictis.sfedu.ru/schedule-api",
});
