import {Range} from 'Range';
import {c, canvas} from 'canvas';

const NUM_TREE_RUNGS = 3;
const X_THRESHOLD = 40;
const Z_THRESHOLD = 0.3;

let heightRange = new Range(400, 500);
let xRange = new Range(0, canvas.width);
let zRange = new Range(0.5, 1);
let hRange = new Range(100, 150);
let sRange = new Range(50, 75);
let lRange = new Range(25, 42);

let trees = [];

export class Tree {
    constructor() {
        let powZ;

        // position
        this.setRandomPosition();

        // depth
        powZ = this.z * this.z;

        // size
        this.height = heightRange.getRandom();
        this.width = this.height / 4;
        this.projectedHeight = this.height * powZ;
        this.projectedWidth = this.width * powZ;

        // color
        let h = hRange.getRandom();
        let s = sRange.getRandom() * this.z; // reduce sat
        let l = lRange.getRandom() / this.z; // increase lightness

        this.color = `hsl(${h}, ${s}%, ${l}%)`;
    }

    setRandomPosition() {
        let i = 0;
        let x = xRange.getRandom();
        let z = zRange.getRandom();

        let tooClose = true;

        // position
        while (tooClose && i < 10) {
            i++;

            tooClose = false; // loop will change this if any tree is too close

            for (let tree of trees) {
                let deltaX = Math.abs(tree.x - x);

                if (deltaX < X_THRESHOLD * tree.z) {
                    tooClose = true;

                    x = xRange.getRandom();
                    z = zRange.getRandom();

                    break;
                }
            }
        }

        trees.push(this);
        this.x = x;
        this.z = z;
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
