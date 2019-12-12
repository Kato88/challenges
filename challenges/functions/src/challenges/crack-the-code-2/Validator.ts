import { IResultValidator } from '../IResultValidator';

interface Point {
  x: number;
  y: number;
}

interface Line {
  top: Point;
  bottom: Point;
}

interface Rectangle {
  left: Line;
  right: Line;
}

export default class Validator implements IResultValidator {

  async validate(input: string, result: string): Promise<boolean> {
    const resultRectangles = Number(result);
    const myResult = this.getNumberOfRectangles(input);

    return resultRectangles === myResult;
  }

  private getNumberOfRectangles(input: string): number {
    const points = input.split(',').map((p) => {
      const splitted = p.split(':');
      return { x: Number(splitted[0]), y: Number(splitted[1]) };
    });

    const lines: Line[] = [];
    points.forEach((p) => {
      const linePairs = points.filter((lp) => lp.x === p.x && lp.y > p.y);
      linePairs.forEach((lp) => {
        lines.push({
          top: p,
          bottom: lp,
        });
      });
    });

    const rectangles: Rectangle[] = [];
    lines.forEach((l) => {
      const rectanglePairs = lines.filter((rp) => rp.top.y === l.top.y && rp.bottom.y === l.bottom.y && rp.top.x > l.top.x && rp.bottom.x > l.bottom.x);

      rectanglePairs.forEach((rp) => {
        rectangles.push({
          left: l,
          right: rp,
        });
      })
    });

    return rectangles.length;
  }
}