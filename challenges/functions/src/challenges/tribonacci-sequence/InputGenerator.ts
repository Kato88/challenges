import Randomizer from "../../services/Randomizer";

export default class InputGenerator implements IInputGenerator {
    generate(): string {
        const output = [];
        
        for(let i = 0; i < 432; i++) {
            output.push(`[${Randomizer.getRandomNumber(999)}, ${Randomizer.getRandomNumber(999)}, ${Randomizer.getRandomNumber(999)}];${Randomizer.getRandomNumber(50, 1)}`);
        }

        return output.join('\n');
    }
}