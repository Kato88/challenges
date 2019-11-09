export default class InputGenerator implements IInputGenerator {
    generate(): string {
        const output = [];
        const randomWords = this.createRandomWords(20);

        for (let i = 0; i < 500; i++) {
            const lineWords = [];

            for (let j = 0; j < 6; j++) {
                const randomWord = randomWords[Math.floor(Math.random() * Math.floor(randomWords.length - 1))];
                lineWords.push(randomWord);
            }

            output.push(lineWords.join(' '));
        }

        return output.join('\n');
    }

    private createRandomWords(amount: number): string[] {
        const words = [];
        const characters = 'abcdefghijklmnopqrstuvwxyz';

        for (let i = 0; i < amount; i++) {
            const randomLength = Math.floor(Math.random() * Math.floor(5)) + 3;
            let word = '';

            for (let j = 0; j < randomLength; j++) {
                const randomChar = Math.floor(Math.random() * Math.floor(characters.length - 1));
                word += characters.charAt(randomChar);
            }

            words.push(word);
        }

        return words;
    }

}