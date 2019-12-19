import { IResultValidator } from '../IResultValidator';

export default class Validator implements IResultValidator {

  async validate(input: string, result: string): Promise<boolean> {
    return this.demask(input) === result;
  }

  private demask(s: string): string {
    const result = [];
  
    for (let i = 0; i < s.length; i++) {
      result.push(String.fromCharCode(s.charCodeAt(i) - 10));
    }
  
    return result.join('');
  }
}