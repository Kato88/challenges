import Randomizer from "../../services/Randomizer";
import WordsService from '../../services/WordsService';

export default class InputGenerator implements IInputGenerator {
    generate(): string {
        const output = [];
        const randomWords = WordsService.getRandomWords(30);
        
        for(let i = 0; i < 100; i++) {
            output.push(this.mask(Randomizer.getRandomValue(randomWords) + ' '))
        }

        return output.join('');
    }

    private mask(s: string): string {
        const result = [];
      
        for (let i = 0; i < s.length; i++) {
          result.push(String.fromCharCode(s.charCodeAt(i) + 10));
        }
      
        return result.join('');
      }
}