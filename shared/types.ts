import * as firebase from 'firebase';

export interface CreateParticipationRequestBody {
    userId: string;
    userName: string;
    challengeId: string;
}

export interface ValidateResultRequestBody {
    userId: string;
    challengeId: string;
    result: string;
    isValid?: boolean;
}

export interface UploadSolutionRequestBody {
  participationId: string;
  solutionUrl: string;
}

export interface Challenge {
  id: string;
  title: string;
  teaser: string;
  description: string;
  difficulty: ChallengeDifficulties;
  public?: boolean;
  otherSolutions?: Array<{
    userId: string;
    participationId: string;
    solutionUrl: string;
  }>;
}

export enum ChallengeDifficulties {
  easy = 0,
  medium = 1,
  hard = 2,
}


export interface Participation {
    id: string;
    userId: string;
    userName: string;
    challengeId: string;
    inputUrl: string;
    start: firebase.firestore.Timestamp;
    end?: firebase.firestore.Timestamp;
    result?: string;
    points?: number;
    solutionUrl?: string;
}

export interface ValidationResultResponse {
    isValid: boolean;
    error?: string;
    participation?: Participation;
}

export interface SubmitSolutionResponse {
  points: number;
}

export interface CreateParticipationResponse {
    success: boolean;
    participationId: string;
    inputUrl: string;
}