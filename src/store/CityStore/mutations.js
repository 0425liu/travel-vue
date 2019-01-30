import * as types from "./mutations-types";
const mutations = {
  [types.SET_CITY](state, city) {
    state.city = city;
  }
};
export default mutations;
