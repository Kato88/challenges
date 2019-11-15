import { IResultValidator } from '../IResultValidator';

export default class Validator implements IResultValidator {
  private coins: number[] = [50, 20, 10, 5, 2, 1];

  async validate(input: string, result: string): Promise<boolean> {
    const lines = input.split(/\n/);
    const resultValue = Number(result);
    let correctResult = 0;

    if (resultValue === NaN) {
      console.log('result is not a number');
      return false;
    }

    for (let i = 0; i < lines.length; i++) {
      const inputLine = lines[i];

      const lineValue = this.getNumberOfCoindsNeeded(Number(inputLine));
      correctResult += lineValue;
    }

    return correctResult === resultValue;
  }

  private getNumberOfCoindsNeeded(change: number): number {
    if (change === 0) {
      return 0;
    }
    
    let rest = change;
    let coins = 0;

    for (let i = 0; i < this.coins.length; i++) {
      const coinsToAdd = Math.floor(rest / this.coins[i]);
      rest = rest - (coinsToAdd * this.coins[i]);
      coins += coinsToAdd;

      if (rest === 0) {
        return coins;
      }
    }

    return coins;
  }
}