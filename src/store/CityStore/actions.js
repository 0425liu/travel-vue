import * as types from "./mutations-types";
import { saveCity } from "assets/js/cache";
export const selectCity = ({ commit }, city) => {
  saveCity(city);
  commit(types.SET_CITY, city);
};
