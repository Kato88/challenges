import { UserState } from './types';
import * as firebase from 'firebase';
import { moduleActionContext } from '..';

const mod = {
    namespaced: true,
    state: {
        profile: null,
        isAdmin: false,
    } as UserState,
    actions: {
        loadProfile(context: any, user: firebase.User) {
            const {commit, rootState} = moduleActionContext(context, mod);
            rootState.db.collection('users').doc(user.uid).get().then((doc) => {
                commit.SET_RIGHTS(doc.data());
            });
        },
    },
    mutations: {
        SET_USER(state: UserState, user: any) {
            state.profile = user;
        },
        SET_RIGHTS(state: UserState, userRights: any) {
            state.isAdmin = userRights.isAdmin;
        },
    },
    getters: {
        isAuthenticated(state: UserState): boolean {
            return state.profile !== null && state.profile.email !== null;
        },
        isAdmin(state: UserState): boolean {
            return state.profile !== null && state.isAdmin === true;
        },
    },
} as const;

export default mod;
