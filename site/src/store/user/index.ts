import { UserState } from './types';
import * as firebase from 'firebase';
import { moduleActionContext } from '..';
import { Participation } from '../../../../shared/types';

const mod = {
    namespaced: true,
    state: {
        profile: null,
        isAdmin: false,
        participations: [],
    } as UserState,
    actions: {
        loadProfile(context: any, user: firebase.User) {
            const { commit, rootState } = moduleActionContext(context, mod);
            rootState.db.collection('users').doc(user.uid).get().then((doc) => {
                commit.SET_RIGHTS(doc.data());
            });
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
            state.profile = user;
        },
        SET_RIGHTS(state: UserState, userRights: any) {
            state.isAdmin = userRights.isAdmin;
        },
        SET_PARTICIPATIONS(state: UserState, participations: Participation[]) {
            state.participations = participations;
        },
        ADD_PARTICIPATIONS(state: UserState, participation: Participation) {
            state.participations.push(participation);
        }
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
