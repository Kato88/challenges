export default class Randomizer {
  public static getRandomNumber(max: number, min: number = 0) {
    return Math.floor(Math.random() * Math.floor(max - min)) + min; 
  }

  public static getRandomValue<T>(arr: T[]): T {
    return arr[this.getRandomNumber(arr.length, 0)];
  }
}