import Randomizer from "../../services/Randomizer";

export default class InputGenerator implements IInputGenerator {
    generate(): string {
        const output = [];
        
        for(let i = 0; i < 1000; i++) {
            output.push(`${Randomizer.getRandomNumber(100)}:${Randomizer.getRandomNumber(100)}`);
        }

        return output.join(',');
    }
}