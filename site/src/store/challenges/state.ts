export default {
    challenges: createFakeChallenges(),
} as ChallengesStage;


interface ChallengesStage {
    challenges: Challenge[];
}

interface Challenge {
    id: string;
    title: string;
    teaser: string;
    description: string;
    difficulty: ChallengeDifficulties,
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
            teaser: 'teader' + i,
            description: 'desc' + i,
            difficulty: i % 3,
        });
    }

    return challenges;
}