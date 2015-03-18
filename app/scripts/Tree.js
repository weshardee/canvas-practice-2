const NUM_TREE_RUNGS = 3;

const H_MAX = 150;
const H_MIN = 100;
const H_DELTA = H_MAX - H_MIN;

const S_MAX = 100;
const S_MIN = 70;
const S_DELTA = S_MAX - S_MIN;

const L_MAX = 40;
const L_MIN = 25;
const L_DELTA = L_MAX - L_MIN;

let canvas = document.getElementById('canvas');
let c = canvas.getContext('2d');

export class Tree {
    constructor(x, height) {
        this.x = x;
        this.height = height;

        // compute additional properties
        this.color = Tree.getRandomColor();
        this.width = this.height / 4;
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

            rungBaseY = -this.height * Math.pow(progress, 1.2) + startY;
            rungWidth = -this.width * Math.pow(progress, 3) + this.width;

            c.beginPath();
            c.moveTo(this.x - rungWidth, rungBaseY);
            c.lineTo(this.x, startY - this.height);
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
