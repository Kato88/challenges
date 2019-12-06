import { IResultValidator } from '../IResultValidator';

export default class Validator implements IResultValidator {

  async validate(input: string, result: string): Promise<boolean> {
    const data = input.split(',');
    const resultLines = result.split(',');

    if (data.length !== resultLines.length) {
      return false;
    }

    for(let i = 0; i < data.length; i++) {
      const floors = this.getFloors(Number(data[i]));
      if (floors !== Number(resultLines[i])) {
        return false;
      }
    }

    return true;
  }

  private getFloors(mass: number): number {
    let rest = mass;
    let result = 0;
    let n = 1;

    while (rest > 0) {
        rest = rest - Math.pow(n, 3);
        result++;
        n++;

        if (rest < 0) {
            result = -1;
        }
    }

    return result;
  }
}