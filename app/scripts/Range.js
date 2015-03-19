export class Range {
    constructor(min, max) {
        this.min = min;
        this.max = max;
        this.delta = max - min;
    }

    getRandom() {
        return Math.random() * this.delta + this.min;
    }
}
