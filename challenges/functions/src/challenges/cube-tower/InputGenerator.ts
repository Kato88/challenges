import Randomizer from "../../services/Randomizer";

export default class InputGenerator implements IInputGenerator {
    generate(): string {
        const output = [];
        const numberOfTowers = Randomizer.getRandomNumber(100, 80);
    
        for (let i = 0; i < numberOfTowers; i++) {
            const isInvalidTower = Randomizer.getRandomNumber(100) > 90;
            if (isInvalidTower) {
                output.push(Randomizer.getRandomNumber(999999999, 999999));
            } else {
                const floors = Randomizer.getRandomNumber(40, 3);
                let mass = 0;

                for(let j = 1; j <= floors; j++) {
                    mass += Math.pow(j, 3);
                }

                output.push(mass);
            }
        }

        return output.join(',');
    }
}