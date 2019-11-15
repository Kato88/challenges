export default class Randomizer {
  public static getRandomNumber(max: number) {
    return Math.floor(Math.random() * Math.floor(max)) 
  }
}