import axios from "axios";

export const $api = axios.create({
  baseURL: "https://webictis.sfedu.ru/schedule-api",
});

export const __API_URL__ = "https://webictis.sfedu.ru/schedule-api";
