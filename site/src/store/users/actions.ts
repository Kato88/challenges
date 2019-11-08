import { ActionTree } from 'vuex';
import { UserState } from './state';
import { RootState } from '..';


const actions: ActionTree<UserState, RootState> = {
  setUser({commit}, user) {
    commit('SET_USER', user);
    console.log('set user to', user);
  },
};

export default actions;
