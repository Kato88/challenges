import { IResultValidator } from '../IResultValidator';

export default class Validator implements IResultValidator {

  async validate(input: string, result: string): Promise<boolean> {
    const rows = input.split('\n');
    const map: Array<Array<number>> = [];
    let lands = [];

    for (let i = 0; i < rows.length; i++) {
      map.push(JSON.parse(rows[i]));
    }

    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] === 1) {
          lands.push({ x, y });
        }
      }
    }

    let numOfLands = 0;

    while (lands.length > 0) {
      const current = lands[0];
      lands.splice(0, 1);
      numOfLands++;

      this.removeConnectedLands(current.x, current.y, lands);
    }

    return numOfLands === Number(result);
  }

  private removeConnectedLands(x: number, y: number, lands: Array<{ x: number, y: number }>) {
    if (lands.length === 0) {
      return;
    }

    const res = lands.findIndex((land) =>
      (land.x === x - 1 && land.y === y) ||
      (land.x === x + 1 && land.y === y) ||
      (land.x === x && land.y === y - 1) ||
      (land.x === x && land.y === y + 1));

    if (res > -1) {
      const land = lands[res];
      lands.splice(res, 1);
      this.removeConnectedLands(land.x, land.y, lands);
    }
  }
}