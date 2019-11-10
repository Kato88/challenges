export interface IResultValidator {
    validate(input: string, result: string): Promise<boolean>;
}