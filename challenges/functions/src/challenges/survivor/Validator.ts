import { IResultValidator } from '../IResultValidator';

export default class Validator implements IResultValidator {
    async validate(input: string, result: string): Promise<boolean> {
        const lines = input.split('\n');
        const resultLines = result.split('\n');

        if (lines.length !== resultLines.length) {
            return false;
        }

        for(let i = 0; i < lines.length; i++) {
            const values = lines[i].split(';');
            const myResult = this.josephusSurvivor(
                Number(values[0]),
                Number(values[1])
            );

            if (myResult !== Number(resultLines[i])) {
                return false;
            }
        }

        return true;
    }

    private josephusSurvivor(n: number, k: number) {
        let survivors = [];
        const step = k - 1;
        let killAt = step;
        
        for(let i = 0; i < n; i++) {
          survivors.push(i + 1);
        }
        
        while(survivors.length > 1) {
        
          while(killAt >= survivors.length) {
            killAt = killAt - survivors.length;
          }
          
          survivors.splice(killAt, 1);
          killAt += step;
        }
        
        return survivors[0];
      }
}