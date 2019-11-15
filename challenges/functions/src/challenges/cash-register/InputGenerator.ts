import Randomizer from "../../services/Randomizer";

export default class InputGenerator implements IInputGenerator {
    generate(): string {
        const output = [];
        const numberOfLines = Randomizer.getRandomNumber(444);
        
        

        for (let i = 0; i < numberOfLines; i++) {
            output.push(Randomizer.getRandomNumber(99));
        }

        return output.join('\n');
    }

}