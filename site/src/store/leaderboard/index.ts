import { moduleActionContext } from '..';
import { ActionContext, MutationPayload } from 'vuex';
import { LeaderboardState } from './types';
import { LeaderboardEntry } from '../../../../shared/types';

const mod = {
    namespaced: true,
    state: {
        entries: [],
        listener: {},
    } as LeaderboardState,
    actions: {
        async listen(context: ActionContext<any, any>) {
            const { commit, state, rootState } = moduleActionContext(context, mod);
            const listener = rootState.db.collection('leaderboard').onSnapshot((snapshot) => {
                snapshot.forEach((doc) => {
                    const entry = doc.data() as LeaderboardEntry;
                    entry.id = doc.id;

                    commit.SET_ENTRY(entry);
                });
            });

            commit.SET_LISTENER(listener);
        },
        async unlisten(context: ActionContext<any, any>) {
            const { commit, state, rootState } = moduleActionContext(context, mod);
            commit.DISCONNECT_LISTENER();
        },
    },
    mutations: {
        SET_ENTRIES(state: LeaderboardState, entries: LeaderboardEntry[]) {
            state.entries = entries;
        },
        SET_ENTRY(state: LeaderboardState, entry: LeaderboardEntry) {
            const idx = state.entries.findIndex((e) => e.id === entry.id);

            if (idx > -1) {
                state.entries.splice(idx, 1, entry);
            } else {
                state.entries.push(entry);
            }
        },
        SET_LISTENER(state: LeaderboardState, listener: any) {
            state.listener = listener;
        },
        DISCONNECT_LISTENER(state: LeaderboardState) {
            if (state.listener && typeof state.listener === 'function') {
                state.listener();
                state.listener = {};
            }
        },
    },
} as const;

export default mod;
