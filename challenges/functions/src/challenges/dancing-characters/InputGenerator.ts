import Randomizer from '../../services/Randomizer';

export default class InputGenerator implements IInputGenerator {
    generate(): string {
        const output = [];
        const characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];
        
        const numOfNumbers = Randomizer.getRandomNumber(3000, 2500)

        for (let i = 0; i < numOfNumbers; i++) {
            const move = Randomizer.getRandomNumber(3,1);

            if (move === 1) {
                output.push(`s${Randomizer.getRandomNumber(14, 1)}`);
            } else if (move === 2) {
                output.push(`x${Randomizer.getRandomNumber(15,0)}/${Randomizer.getRandomNumber(15,0)}`);
            } else {
                output.push(`p${characters[Randomizer.getRandomNumber(15,0)]}/${characters[Randomizer.getRandomNumber(15,0)]}`);
            }
        }

        return output.join(',');
    }
}