export interface IResultValidator {
    validate(input: string, result: string): boolean;
}