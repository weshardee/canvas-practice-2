export class Range {
    constructor(min, max, weight) {
        this.min = min;
        this.max = max;
        this.delta = max - min;
        this.weight = weight || 1;
    }

    getRandom() {
        let random = Math.random();
        random = Math.pow(random, this.weight);
        return random * this.delta + this.min;
    }
}
