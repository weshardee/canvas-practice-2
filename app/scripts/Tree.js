import {Range} from 'Range';
import {c, canvas, mouseX} from 'canvas';

const X_THRESHOLD = 40;

let heightRange = new Range(400, 500);
let widthRange = new Range(3, 4);
let xRange = new Range(-canvas.width * 0.25, canvas.width * 1.25);
let zRange = new Range(0.5, 1);
let hRange = new Range(110, 150);
let sRange = new Range(50, 75);
let lRange = new Range(25, 42);

let rungRange = new Range(4, 6);

let trees = [];

export class Tree {
    constructor() {
        let powZ;
        let shadowOpacity;

        // position
        this.setRandomPosition();

        // depth
        powZ = this.z * this.z;

        // size
        this.height = heightRange.getRandom();
        this.width = this.height / widthRange.getRandom();
        this.projectedHeight = this.height * powZ;
        this.projectedWidth = this.width * powZ;

        // rungs
        this.rungs = Math.round(rungRange.getRandom());

        // color
        let h = hRange.getRandom();
        let s = sRange.getRandom() * this.z; // reduce sat
        let l = lRange.getRandom() / this.z; // increase lightness

        this.color = `hsl(${h}, ${s}%, ${l}%)`;

        // shadow color
        shadowOpacity = 0.1 * powZ;
        this.shadowColor = `rgba(0,0,0,${shadowOpacity})`;

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
        let x = this.x + mouseX * this.z * this.z;

        c.beginPath();

        // draw rungs
        for (var i = 0; i < this.rungs; i++) {
            progress = i / this.rungs;

            rungBaseY = -this.projectedHeight * Math.pow(progress, 1.2) + startY;
            rungWidth = -this.projectedWidth * Math.pow(progress, 2) + this.projectedWidth;

            c.moveTo(x - rungWidth, rungBaseY);
            c.lineTo(x, startY - this.projectedHeight);
            c.lineTo(x + rungWidth, rungBaseY);
        }

        // color tree
        c.fillStyle = this.color;
        c.shadowColor = this.shadowColor;
        c.shadowBlur = 2;
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 1;

        c.fill();
    }
}
