import { IResultValidator } from '../IResultValidator';

export default class Validator implements IResultValidator {

  async validate(input: string, result: string): Promise<boolean> {
    const lines = input.split('\n');
    const values: Array<Array<Number>> = [];
    const numOfStations = lines[0].split(',').length
    const averages = [];

    for(let i = 0; i < numOfStations; i++) {
      values.push([]);
    }

    for(let i = 0; i < lines.length; i++) {
      const stations = lines[i].split(',');
      let current = 0;

      for(let j = 0; j < stations.length; j++) {
        const parts = stations[j].split('|');
        const add = Number(parts[0]);
        const sub = Number(parts[1]);

        current += add - sub;
        values[j].push(current);
      }
    }

    for(let i = 0; i < values.length; i++) {
      averages[i] = Math.floor((values[i].reduce((a: any, b: any) => a + b) as any / lines.length));
    }

    return result === averages.join(',');
  }
}