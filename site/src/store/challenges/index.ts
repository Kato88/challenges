import { ChallengesState } from './types';
import { moduleActionContext } from '..';
import { ActionContext, MutationPayload } from 'vuex';
import { CreateParticipationRequestBody, CreateParticipationResponse, Participation, Challenge, ValidateResultRequestBody, ValidationResultResponse } from '../../../../shared/types';
import axios from 'axios';

const mod = {
  namespaced: true,
  state: {
    challenges: [],
    saving: false,
    submittingSolution: false,
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
      if (challenge.id) {
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
      } else {
        rootState.db.collection('challenges').doc(challenge.title.toLocaleLowerCase().split(' ').join('-')).set({
          title: challenge.title,
          teaser: challenge.teaser,
          description: challenge.description,
          difficulty: challenge.difficulty,
        } as Challenge).then(() => {
          commit.UPDATE_CHALLENGE(challenge);
        }).finally(() => {
          commit.SET_SAVING(false);
        });
      }

    },
    async startChallenge(context: any, challengeId: string) {
      const { commit, rootDispatch, rootState } = moduleActionContext(context, mod);
      commit.SET_SAVING(true);
      const result = await axios.post('https://europe-west2-challenge-83ceb.cloudfunctions.net/createParticipation', {
        challengeId: challengeId,
        userId: rootState.user.profile.uid,
      } as CreateParticipationRequestBody);

      const resultData = result.data as CreateParticipationResponse;

      if (!resultData.success) {
        commit.SET_SAVING(false);
        return;
      }

      await rootDispatch.user.loadParticipation(resultData.participationId);
      commit.SET_SAVING(false);
    },
    async validate(context: any, payload: { participation: Participation, result: string }) {
      const { commit, rootCommit, rootState } = moduleActionContext(context, mod);

      const response = await axios.post<ValidationResultResponse>('https://europe-west2-challenge-83ceb.cloudfunctions.net/validateResult', {
        challengeId: payload.participation.challengeId,
        userId: rootState.user.profile.uid,
        result: payload.result,
      } as ValidateResultRequestBody);

      if (response.status !== 200) {
        const result = response.data;
        if (result.participation) {
          rootCommit.users.SET_PARTICIPATION_POINTS({ participationId: result.participation.id, points: result.participation.points });
        }
      }
    },
    async submitSolution(context: any, payload: { solutionUrl: string, participationId: string }) {
      const { commit, rootState, rootCommit } = moduleActionContext(context, mod);
      commit.SET_SUBMITTING_SOLUTION(true);
      await rootState.db.collection('participations').doc(payload.participationId).set({
        solutionUrl: payload.solutionUrl,
      });

      rootCommit.user.SET_SOLUTION_URL(payload);
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
      } else {
        state.challenges.push(challenge);
      }
    },
    SET_SAVING(state: ChallengesState, saving: boolean) {
      state.saving = saving;
    },
    SET_SUBMITTING_SOLUTION(state: ChallengesState, submitting: boolean) {
      state.submittingSolution = submitting;
    },
  },
  getters: {},
} as const;

export default mod;
