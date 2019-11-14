export interface ChallengesState {
    challenges: Challenge[];
    saving: boolean;
    submittingSolution: boolean;
}

export interface Challenge {
    id: string;
    title: string;
    teaser: string;
    description: string;
    difficulty: ChallengeDifficulties;
}

export enum ChallengeDifficulties {
    easy = 0,
    medium = 1,
    hard = 2,
}
