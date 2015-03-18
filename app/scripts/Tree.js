const NUM_TREE_RUNGS = 3;

const HEIGHT_MAX = 400;
const HEIGHT_MIN = 220;
const HEIGHT_DELTA = HEIGHT_MAX - HEIGHT_MIN;

const Z_MAX = 1;
const Z_MIN = 0.8;
const Z_DELTA = Z_MAX - Z_MIN;

const H_MAX = 150;
const H_MIN = 100;
const H_DELTA = H_MAX - H_MIN;

const S_MAX = 100;
const S_MIN = 75;
const S_DELTA = S_MAX - S_MIN;

const L_MAX = 35;
const L_MIN = 25;
const L_DELTA = L_MAX - L_MIN;

let canvas = document.getElementById('canvas');
let c = canvas.getContext('2d');

export class Tree {
    constructor(x) {
        this.x = x;
        console.log(this.z);

        // compute additional properties
        this.z = Z_DELTA * Math.random() + Z_MIN;
        this.height = HEIGHT_DELTA * Math.random() + HEIGHT_MIN;
        this.color = Tree.getRandomColor();
        this.width = this.height / 4;
    }

    draw() {
        let powZ = this.z * this.z;
        let projectedHeight = this.height * powZ;
        let projectedWidth = this.width * powZ;
        let startY = canvas.height;
        let rungWidth;
        let rungBaseY;
        let progress;

        c.fillStyle = this.color;

        // // draw first rung
        for (var i = 0; i < NUM_TREE_RUNGS; i++) {
            progress = i / NUM_TREE_RUNGS;

            rungBaseY = -projectedHeight * Math.pow(progress, 1.2) + startY;
            rungWidth = -projectedWidth * Math.pow(progress, 3) + projectedWidth;

            c.beginPath();
            c.moveTo(this.x - rungWidth, rungBaseY);
            c.lineTo(this.x, startY - projectedHeight);
            c.lineTo(this.x + rungWidth, rungBaseY);
            c.fill();
        }
    }

    static getRandomColor() {
        let h = Math.floor(H_DELTA * Math.random() + H_MIN);
        let s = Math.floor(S_DELTA * Math.random() + S_MIN);
        let l = Math.floor(L_DELTA * Math.random() + L_MIN);

        return `hsl(${h}, ${s}%, ${l}%)`;
    }
}
