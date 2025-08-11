export default class Utils {
    static randomIndex(min: number = 0, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static genNumberArray(min: number, max: number): number[] {
        const numbers = [];

        for (let i = min; i <= max; i++) {
            numbers.push(i);
        }

        return numbers;
    }
}