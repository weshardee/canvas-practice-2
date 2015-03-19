import {Range} from 'Range';

const NUM_TREE_RUNGS = 3;

let heightRange = new Range(220, 400);
let zRange = new Range(0.5, 1);
let hRange = new Range(100, 150);
let sRange = new Range(50, 75);
let lRange = new Range(25, 42);

let canvas = document.getElementById('canvas');
let c = canvas.getContext('2d');

export class Tree {
    constructor(x) {
        let powZ;

        this.x = x;

        // compute additional properties
        this.z = zRange.getRandom();
        powZ = this.z * this.z;

        this.height = heightRange.getRandom();
        this.width = this.height / 4;
        this.projectedHeight = this.height * powZ;
        this.projectedWidth = this.width * powZ;

        // color
        let h = hRange.getRandom();
        let s = sRange.getRandom() * powZ;
        let l = lRange.getRandom() / powZ;

        this.color = `hsl(${h}, ${s}%, ${l}%)`;
    }

    draw() {
        let startY = canvas.height;
        let rungWidth;
        let rungBaseY;
        let progress;

        c.fillStyle = this.color;

        // // draw first rung
        for (var i = 0; i < NUM_TREE_RUNGS; i++) {
            progress = i / NUM_TREE_RUNGS;

            rungBaseY = -this.projectedHeight * Math.pow(progress, 1.2) + startY;
            rungWidth = -this.projectedWidth * Math.pow(progress, 3) + this.projectedWidth;

            c.beginPath();
            c.moveTo(this.x - rungWidth, rungBaseY);
            c.lineTo(this.x, startY - this.projectedHeight);
            c.lineTo(this.x + rungWidth, rungBaseY);
            c.fill();
        }
    }
}
