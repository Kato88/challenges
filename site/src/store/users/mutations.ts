import { UserState } from "./state";


const mutations = {
  SET_USER(state: UserState, user: any) {
    state.user = user;
  },
};

export default mutations;