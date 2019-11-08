import { ActionTree } from 'vuex';
import { ChallengesState } from './state';
import { RootState } from '..';


const actions: ActionTree<ChallengesState, RootState> = {
  load({commit, rootState}) {
    rootState.db.collection('challenges').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc);
      });
    });
  },
};

export default actions;
