import { ChallengesState } from './types';
import { moduleActionContext } from '..';
import { ActionContext, MutationPayload } from 'vuex';
import {
  CreateParticipationRequestBody, CreateParticipationResponse, Participation,
  Challenge, ValidateResultRequestBody, ValidationResultResponse, UploadSolutionRequestBody, SubmitSolutionResponse,
} from '../../../../shared/types';
import axios from 'axios';

const mod = {
  namespaced: true,
  state: {
    challenges: [],
    saving: false,
    loading: false,
    submittingSolution: false,
    validating: false,
    validationFailed: false,
  } as ChallengesState,
  actions: {
    async load(context: ActionContext<any, any>) {
      const { commit, state, rootState } = moduleActionContext(context, mod);
      commit.SET_LOADING(true);
      rootState.db.collection('challenges').get().then((querySnapshot) => {
        const challenges: Challenge[] = [];

        querySnapshot.forEach((doc) => {
          const challenge: Challenge = doc.data() as Challenge;
          challenge.id = doc.id;
          challenges.push(challenge);
        });

        commit.SET_CHALLENGES(challenges);
      }).finally(() => {
        commit.SET_LOADING(false);
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
        rootState.db.collection('challenges')
          .doc(challenge.title.toLocaleLowerCase().split(' ').join('-')).set({
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
      const result = await axios
        .post('https://europe-west2-challenge-83ceb.cloudfunctions.net/createParticipation', {
          challengeId,
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
      commit.SET_VALIDATING(true);
      commit.SET_VALIDATION_FAILED(false);
      
      const response = await axios.post<ValidationResultResponse>('https://europe-west2-challenge-83ceb.cloudfunctions.net/validateResult', {
        challengeId: payload.participation.challengeId,
        userId: rootState.user.profile.uid,
        result: payload.result,
      } as ValidateResultRequestBody);

      const result = response.data;

      if (result.isValid === false) {
        commit.SET_VALIDATION_FAILED(true);
      } else if (result.participation) {
        rootCommit.user.SET_PARTICIPATION_POINTS({
          id: result.participation.id,
          points: result.participation.points as number,
          end: result.participation.end as firebase.firestore.Timestamp,
        } as Participation);
      }

      commit.SET_VALIDATING(false);
    },
    async submitSolution(context: any, payload: { solutionUrl: string, participationId: string }) {
      const { commit, rootState, rootCommit } = moduleActionContext(context, mod);
      commit.SET_SUBMITTING_SOLUTION(true);

      const response = await axios.post<SubmitSolutionResponse>('https://europe-west2-challenge-83ceb.cloudfunctions.net/uploadSolution', {
        solutionUrl: payload.solutionUrl,
        participationId: payload.participationId,
      } as UploadSolutionRequestBody);

      rootCommit.user.SET_SOLUTION_URL(payload);
      rootCommit.user.SET_PARTICIPATION_POINTS({
        id: payload.participationId,
        points: response.data.points,
      } as Participation);

      commit.SET_SUBMITTING_SOLUTION(false);
    },
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
    SET_LOADING(state: ChallengesState, loading: boolean) {
      state.loading = loading;
    },
    SET_SUBMITTING_SOLUTION(state: ChallengesState, submitting: boolean) {
      state.submittingSolution = submitting;
    },
    SET_VALIDATING(state: ChallengesState, validating: boolean) {
      state.validating = validating;
    },
    SET_VALIDATION_FAILED(state: ChallengesState, validationFailed: boolean) {
      state.validationFailed = validationFailed;
    }
  },
  getters: {},
} as const;

export default mod;
