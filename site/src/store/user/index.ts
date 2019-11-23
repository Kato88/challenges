import { UserState, Profile } from './types';
import * as firebase from 'firebase';
import { moduleActionContext } from '..';
import { Participation } from '../../../../shared/types';

const mod = {
  namespaced: true,
  state: {
    user: {} as firebase.User,
    profile: { name: '', email: '', isAdmin: false},
    participations: [],
  } as UserState,
  actions: {
    async loadProfile(context: any, user: firebase.User) {
      const { commit, rootState } = moduleActionContext(context, mod);
      const profileDoc = await rootState.db.collection('users').doc(user.uid).get();
      let profile = {} as Profile;

      if (!profileDoc || !profileDoc.exists) {
        profile.name = user.displayName as string;
        profile.email = user.email as string;
        profile.isAdmin = false;

        if (!profile.name) {
          profile.name = profile.email.substr(0, profile.email.indexOf('@'));
        }

        rootState.db.collection('users').doc(user.uid).set(profile);
      } else {
        profile = profileDoc.data() as Profile;
      }

      commit.SET_PROFILE(profile);
    },
    async loadParticipations(context: any, user: firebase.User) {
      const { commit, rootState } = moduleActionContext(context, mod);
      const snapshot = await rootState.db.collection('participations')
        .where('userId', '==', user.uid).get();
      const participations: Participation[] = [];

      snapshot.forEach((doc) => {
        const participation = doc.data() as Participation;
        participation.id = doc.id;
        participations.push(participation);
      });

      commit.SET_PARTICIPATIONS(participations);
    },
    async loadParticipation(context: any, participationId: string) {
      const { commit, rootState } = moduleActionContext(context, mod);
      const snapshot = await rootState.db.collection('participations').doc(participationId).get();

      const participation = snapshot.data() as Participation;
      participation.id = snapshot.id;

      commit.ADD_PARTICIPATIONS(participation);
    },
  },
  mutations: {
    SET_USER(state: UserState, user: any) {
      state.user = user;
    },
    SET_PROFILE(state: UserState, profile: Profile) {
      state.profile = profile;
    },
    SET_PARTICIPATIONS(state: UserState, participations: Participation[]) {
      state.participations = participations;
    },
    ADD_PARTICIPATIONS(state: UserState, participation: Participation) {
      state.participations.push(participation);
    },
    SET_SOLUTION_URL(state: UserState, payload: { solutionUrl: string, participationId: string }) {
      const participationIndex = state.participations.findIndex(((p) => p.id === payload.participationId));
      if (participationIndex > -1) {
        state.participations[participationIndex].solutionUrl = payload.solutionUrl;
      }
    },
    SET_PARTICIPATION_POINTS(state: UserState, payload: Participation) {
      const participationIndex = state.participations.findIndex(((p) => p.id === payload.id));
      if (participationIndex > -1) {
        const part = Object.assign({}, state.participations[participationIndex]);

        for (const key in payload) {
          if (payload.hasOwnProperty(key)) {
            // @ts-ignore
            part[key] = payload[key];
          }
        }

        state.participations.splice(participationIndex, 1, part);
      }
    },
  },
  getters: {
    isAuthenticated(state: UserState): boolean {
      return state.profile !== null && state.profile.email !== null;
    },
    isAdmin(state: UserState): boolean {
      return state.profile !== null && state.profile.isAdmin === true;
    },
  },
} as const;

export default mod;
