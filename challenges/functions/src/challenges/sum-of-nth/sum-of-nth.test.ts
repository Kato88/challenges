import InputGenerator from './InputGenerator';
import Validator from './Validator';

test('basic', () => {
    const generator = new InputGenerator();
    const output = generator.generate();

    expect(output).toBeTruthy();
});

test('validation', async () => {
    const input = '0,1,2,3,4,5,6,7,8';
    const validator = new Validator();

    expect(await validator.validate(input, '0.00,1.00,1.20,1.31,1.39,1.45,1.49,1.53,1.57')).toBeTruthy();
});

test('validation false', async () => {
    const input = '0,1,2,3,4,5,6,7,8';
    const validator = new Validator();

    expect(await validator.validate(input, '3,3,4')).toBeFalsy();
});