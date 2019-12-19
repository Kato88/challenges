import Randomizer from "../../services/Randomizer";

export default class InputGenerator implements IInputGenerator {
  generate(): string {
    const output = [];

    for (let i = 0; i < 150; i++) {
      const row = [];

      for (let j = 0; j < 150; j++) {
        row.push(Randomizer.getRandomNumber(100) > 75 ? 1 : 0);
      }

      output.push(`[${row.join(',')}]`);
    }

    return output.join('\n');
  }
}