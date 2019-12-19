import Randomizer from "../../services/Randomizer";

export default class InputGenerator implements IInputGenerator {
  generate(): string {
    const output = [];

    for (let i = 0; i < 100; i++) {
      const row = [];
      let current = 0;

      for (let j = 0; j < 20; j++) {
        const add = Randomizer.getRandomNumber(j === 19 ? 0 : 50);
        const sub = Randomizer.getRandomNumber(current, j === 19 ? current : 0);

        current = current + add - sub;
        row.push(`${add}|${sub}`);
      }

      output.push(row.join(','));
    }

    return output.join('\n');
  }
}