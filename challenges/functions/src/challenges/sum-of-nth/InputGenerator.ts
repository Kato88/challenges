import Randomizer from '../../services/Randomizer';

export default class InputGenerator implements IInputGenerator {
    generate(): string {
        const output = [];
        const numOfNumbers = Randomizer.getRandomNumber(300, 130)

        for (let i = 0; i < numOfNumbers; i++) {
            output.push(Randomizer.getRandomNumber(10, 0));
        }

        return output.join(',');
    }
}