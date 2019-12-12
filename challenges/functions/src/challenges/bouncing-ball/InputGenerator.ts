import Randomizer from "../../services/Randomizer";

export default class InputGenerator implements IInputGenerator {
    generate(): string {
        const output = [];
        const possibleBounces = ['0.33', '0.37', '0.64', '0.66', '0.9', '1.3', '0.00', '0.5', '0.23', '0.75', '0.12']
        const possibleWindowHeights = ['1', '2', '1.5', '3', '22', '12', '3', '2.25', '33', '200', '1', '1.5', '3', '3.33'];

        for(let i = 0; i < 300; i++) {
            const h = Randomizer.getRandomNumber(1000, 50);
            const b = Randomizer.getRandomValue(possibleBounces);
            const w = Randomizer.getRandomValue(possibleWindowHeights);

            output.push(`${h};${b};${w}`);
        }

        return output.join('\n');
    }

}