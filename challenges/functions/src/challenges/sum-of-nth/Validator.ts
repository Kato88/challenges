import { IResultValidator } from '../IResultValidator';

export default class Validator implements IResultValidator {
    async validate(input: string, result: string): Promise<boolean> {
        const inputs = input.split(/,/);
        const results = result.split(/,/);
        
        if (inputs.length !== results.length) {
            return false;
        }

        for (let i = 0; i < inputs.length; i++) {
            if (results[i] !== this.sumOfNth(Number(inputs[i]))) {
                return false;
            }
        }

        return true;
    }

    private sumOfNth(n: number) {
        let sum = 0;

        for (let i = 0; i < n; i++) {
            sum += 1 / (1 + (4 * i));
        }

        return sum.toFixed(2) + '';
    }
}