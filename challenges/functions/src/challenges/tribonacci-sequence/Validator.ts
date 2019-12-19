import { IResultValidator } from '../IResultValidator';

export default class Validator implements IResultValidator {

  async validate(input: string, result: string): Promise<boolean> {
    const lines = input.split('\n');
    const resultLines = result.split('\n');

    if (lines.length !== resultLines.length) {
      return false;
    }

    for (let i = 0; i < lines.length; i++) {
      const parts = lines[i].split(';');
      const sequence = JSON.parse(parts[0]);
      const n = Number(parts[1]);
      const challengersResult = Number(resultLines[i]);
      const myResult = this.getNthTribonacci(sequence, n);

      if (challengersResult !== myResult) {
        return false;
      }
    }

    return true;
  }

  private getNthTribonacci([a, b, c]: [number, number, number], n: number): number {
    const arr = [a, b, c];

    if (arr.length >= n) {
      return arr[n - 1];
    }

    for (let i = 2; i < n; i++) {
      arr.push(arr[i - 2] + arr[i - 1] + arr[i]);
    }

    return arr[n - 1];
  }

}