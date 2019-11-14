import * as firebase from 'firebase';

export interface CreateParticipationRequestBody {
    userId: string;
    challengeId: string;
}

export interface ValidateResultRequestBody {
    userId: string;
    challengeId: string;
    result: string;
}

export interface Participation {
    id: string;
    userId: string;
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
}

export interface CreateParticipationResponse {
    success: boolean;
    participationId: string;
    inputUrl: string;
}