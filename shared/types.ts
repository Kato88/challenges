import * as firebase from 'firebase';

export interface CreateParticipationRequestBody {
    userId: string;
    challengeId: string;
}

export interface Participation {
    id: string;
    userId: string;
    challengeId: string;
    inputUrl: string;
    start: firebase.firestore.Timestamp;
    end?: firebase.firestore.Timestamp;
}