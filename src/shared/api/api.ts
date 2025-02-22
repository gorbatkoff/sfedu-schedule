import axios from "axios";

export const __API_URL__ = "https://webictis.sfedu.ru/schedule-api";

export const $api = axios.create({
  baseURL: __API_URL__,
});
