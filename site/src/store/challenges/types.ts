import { Challenge } from '../../../../shared/types';

export interface ChallengesState {
    challenges: Challenge[];
    saving: boolean;
    submittingSolution: boolean;
}



