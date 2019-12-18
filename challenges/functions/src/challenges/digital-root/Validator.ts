import { IResultValidator } from '../IResultValidator';

export default class Validator implements IResultValidator {

  async validate(input: string, result: string): Promise<boolean> {
    const data = input.split(',');
    let myResult = 0;
    const challengersResult = Number(result);

    for(let i = 0; i < data.length; i++) {
      myResult += this.digitalRoot(Number(data[i]));
    }

    return myResult === challengersResult;
  }

  private digitalRoot(n: number): number {
    if (n < 10) {
      return n;
    } else {
      const parts = (n + '').split('');
      let val = 0;
      
      parts.forEach((s) => {
        val += Number(s);
      });
      
      return this.digitalRoot(val);
    }
  }
}