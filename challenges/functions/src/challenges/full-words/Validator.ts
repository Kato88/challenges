import { IResultValidator } from '../IResultValidator';

export default class Validator implements IResultValidator {
    async validate(input: string, result: string): Promise<boolean> {
        const lines = input.split(/\n/);
        let counter = 0;
        const resultNumber = Number(result);

        lines.forEach((line) => {
            if (this.checkForDuplicateWords(line)) {
                counter++;
            }
        });

        console.log(`found ${counter} lines with duplicates`);

        return counter === resultNumber;
    }

    private checkForDuplicateWords(line: string): boolean {
        const words = line.split(/\s/);
        
        while (words.length > 0) {
            const current = words.pop() as string;

            if (words.indexOf(current) !== -1) {
                return true;
            }
        }

        return false;
    }
}