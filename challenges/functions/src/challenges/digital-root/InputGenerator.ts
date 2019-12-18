import Randomizer from "../../services/Randomizer";

export default class InputGenerator implements IInputGenerator {
    generate(): string {
        const output = [];
        
        for(let i = 0; i < 400; i++) {
            output.push(Randomizer.getRandomNumber(9999999, 1));
        }

        return output.join(',');
    }
}