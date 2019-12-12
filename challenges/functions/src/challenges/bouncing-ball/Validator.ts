import { IResultValidator } from '../IResultValidator';

export default class Validator implements IResultValidator {

  async validate(input: string, result: string): Promise<boolean> {
    const lines = input.split('\n');
    let myResult = 0;

    for(let i = 0; i < lines.length; i++) {
      const values = lines[i].split(';');
      myResult += this.getSightings(
        Number(values[0]),
        Number(values[1]),
        Number(values[2])
      );
    }

    return myResult === Number(result);
  }

  private getSightings(height: number, bounce: number, window: number): number {
    if (height <= 0 || bounce <= 0 || bounce >= 1 || window >= height) {
      return -1;
    }

    let h = height;
    let counter = 0;
    
    while (h > window) {
      counter++;
      h = h * bounce;
      
      if (h > window) {
        counter++;
      }
    }
    
    return counter
  }
}