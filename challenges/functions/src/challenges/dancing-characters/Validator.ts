import { IResultValidator } from '../IResultValidator';

export default class Validator implements IResultValidator {
    async validate(input: string, result: string): Promise<boolean> {
        
        const res = this.dance(input);

        return res === result;
    }

    private dance(input: string) {
        const moves = input.split(',');
        let dancers = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];

        for (let i = 0; i < moves.length; i++) {
            const move = moves[i].substr(0, 1);

            if (move === 's') {
                const numOfSpins = Number(moves[i].substr(1));
                const movers = dancers.slice(dancers.length - numOfSpins);
                const stayers = dancers.slice(0, dancers.length - numOfSpins);
                dancers = [...movers, ...stayers];
            } else if (move === 'x') {
                const exchangers = moves[i].substr(1).split('/');
                const a = Number(exchangers[0]);
                const b = Number(exchangers[1]);

                const aCopy = dancers[a];
                dancers[a] = dancers[b];
                dancers[b] = aCopy;
            } else if (move === 'p') {
                const partners = moves[i].substr(1).split('/');
                const a = partners[0];
                const b = partners[1];

                const aIdx = dancers.findIndex((dancer) => dancer === a);
                const bIdx = dancers.findIndex((dancer) => dancer === b);

                const aCopy = dancers[aIdx];
                dancers[aIdx] = dancers[bIdx];
                dancers[bIdx] = aCopy;
            }
        }

        return dancers.join('');
    }
}