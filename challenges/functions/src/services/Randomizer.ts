export default class Randomizer {
  public static getRandomNumber(max: number, min: number = 0) {
    return Math.floor(Math.random() * Math.floor(max - min)) + min; 
  }
}