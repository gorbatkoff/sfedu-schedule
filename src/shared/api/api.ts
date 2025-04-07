import axios from "axios";

export const __API_URL__ = "https://shedule.rdcenter.ru/schedule-api";

export const $api = axios.create({
  baseURL: __API_URL__,
});
