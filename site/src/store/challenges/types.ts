export interface ChallengesState {
    challenges: Challenge[];
    saving: boolean;
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

function createFakeChallenges(): Challenge[] {
    const challenges = [];

    for (let i = 0; i < 20; i++) {
        challenges.push({
            id: 'id' + i,
            title: 'title' + i,
            teaser: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.' + i,
            description: '**text**',
            difficulty: i % 3,
        });
    }

    return challenges;
}
