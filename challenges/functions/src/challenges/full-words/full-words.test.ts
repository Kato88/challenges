import InputGenerator from './InputGenerator';
import Validator from './Validator';

test('basic', () => {
    const generator = new InputGenerator();
    const output = generator.generate();

    expect(output).toBeTruthy();
});

test('validation', async () => {
    const input = 'This this that that\nNo Yes Why Okay\nOh No Yes\n Yes Yes Yes Yes';
    const validator = new Validator();

    expect(await validator.validate(input, '2')).toBeTruthy();
});

test('validation false', async () => {
    const input = 'This this that that\nNo Yes Why Okay\nOh No Yes\n Yes Yes Yes Yes';
    const validator = new Validator();

    expect(await validator.validate(input, '3')).toBeFalsy();
});

test('intput validation', async () => {
    const generator = new InputGenerator();
    const validator = new Validator();

    const data = generator.generate();
    const result = await validator.validate(data, '5');

    expect(result).toBeFalsy();
});
