import { ChallengesState, Challenge } from './types';
import { moduleActionContext } from '..';
import { ActionContext, MutationPayload } from 'vuex';
import { CreateParticipationRequestBody } from '../../../../shared/types';
import axios from 'axios';

const mod = {
    namespaced: true,
    state: {
        challenges: [],
        saving: false,
    } as ChallengesState,
    actions: {
        async load(context: ActionContext<any, any>) {
            const { commit, state, rootState } = moduleActionContext(context, mod);
            rootState.db.collection('challenges').get().then((querySnapshot) => {
                const challenges: Challenge[] = [];

                querySnapshot.forEach((doc) => {
                    const challenge: Challenge = doc.data() as Challenge;
                    challenge.id = doc.id;
                    challenges.push(challenge);
                });

                commit.SET_CHALLENGES(challenges);
            });
        },
        async save(context: any, challenge: Challenge) {
            const { commit, state, rootState } = moduleActionContext(context, mod);
            commit.SET_SAVING(true);
            rootState.db.collection('challenges').doc(challenge.id).update({
                title: challenge.title,
                teaser: challenge.teaser,
                description: challenge.description,
                difficulty: challenge.difficulty,
            } as Challenge).then(() => {
                commit.UPDATE_CHALLENGE(challenge);
            }).finally(() => {
                commit.SET_SAVING(false);
            });
        },
        async startChallenge(context: any, challengeId: string) {
            const { commit, state, rootState } = moduleActionContext(context, mod);
            commit.SET_SAVING(true);
            const result = await axios.post('https://europe-west2-challenge-83ceb.cloudfunctions.net/createParticipation', {
                challengeId: challengeId,
                userId: rootState.user.profile.uid,
            } as CreateParticipationRequestBody);

            console.log('finished');
            commit.SET_SAVING(false);
        }
    },
    mutations: {
        SET_CHALLENGES(state: ChallengesState, challenges: Challenge[]) {
            state.challenges = challenges;
        },
        UPDATE_CHALLENGE(state: ChallengesState, challenge: Challenge) {
            const challengeIndex = state.challenges.findIndex((c) => c.id === challenge.id);
            if (challengeIndex > -1) {
                state.challenges[challengeIndex] = challenge;
            }
        },
        SET_SAVING(state: ChallengesState, saving: boolean) {
            state.saving = saving;
        },
    },
    getters: {},
} as const;

export default mod;
