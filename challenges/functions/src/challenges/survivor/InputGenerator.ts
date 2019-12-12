import Randomizer from '../../services/Randomizer';

export default class InputGenerator implements IInputGenerator {
    generate(): string {
        const output = [];
        
        for(let i = 0; i < 300; i++) {
            output.push(`${Randomizer.getRandomNumber(40, 5)};${Randomizer.getRandomNumber(3,19)}`);
        }

        return output.join('\n');
    }
}