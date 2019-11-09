import InputGenerator from './InputGenerator';
import Validator from './Validator';

test('basic', () => {
    const generator = new InputGenerator();
    const output = generator.generate();

    expect(output).toBeTruthy();
});

test('validation', () => {
    const input = 'This this that that\nNo Yes Why Okay\nOh No Yes\n Yes Yes Yes Yes';
    const validator = new Validator();

    expect(validator.validate(input, '2')).toBeTruthy();
});

test('validation false', () => {
    const input = 'This this that that\nNo Yes Why Okay\nOh No Yes\n Yes Yes Yes Yes';
    const validator = new Validator();

    expect(validator.validate(input, '3')).toBeFalsy();
});

test('intput validation', () => {
    const generator = new InputGenerator();
    const validator = new Validator();

    const data = generator.generate();
    const result = validator.validate(data, '5');

    expect(result).toBeFalsy();
});