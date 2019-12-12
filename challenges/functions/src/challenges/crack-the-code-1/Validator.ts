import { IResultValidator } from '../IResultValidator';

export default class Validator implements IResultValidator {

  async validate(input: string, result: string): Promise<boolean> {
    const data = JSON.parse(`[${input}]`) as Array<{words: string[], len: number}>;
    const resultLines = result.split('\n');

    if (data.length !== resultLines.length) {
      return false;
    }

    for (let i = 0; i < data.length; i++) {
      const longestWords = this.getLongestWordsPair(data[i].words, data[i].len);
      if (longestWords !== resultLines[i]) {
        return false;
      }
    }
    
    return true;
  }

  private getLongestWordsPair(words: string[], len: number): string {
    const pairs = [];
    let longestIndex = -1;
    let longest = 0;

    for (let i = 0; i < words.length - (len - 1); i++) {
      pairs.push(words.slice(i, i + len).join(''));
      const length = pairs[i].length;

      if (length > longest) {
        longest = length;
        longestIndex = i;
      }
    }

    return pairs[longestIndex];
  }
}