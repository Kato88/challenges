import Randomizer from "../../services/Randomizer";
import WordsService from '../../services/WordsService';

export default class InputGenerator implements IInputGenerator {
    generate(): string {
        const output = [];
        const numberOfLines = Randomizer.getRandomNumber(100, 80);
        const randomWords = WordsService.getRandomWords(30);
        
        for (let i = 0; i < numberOfLines; i++) {
            const numOfWords = Randomizer.getRandomNumber(30, 6);
            const len = Randomizer.getRandomNumber(numOfWords - 2, 2);
            const line = [];

            for(let j = 0; j < numOfWords; j++) {
                const randomWordIndex = Randomizer.getRandomNumber(0, randomWords.length);
                line.push(`"${randomWords[randomWordIndex]}"`);
            }

            output.push(`{ "words": [${line.join(',')}], "len": ${len} }`);
        }

        return output.join(',\n');
    }
}