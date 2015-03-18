const NUM_TREE_RUNGS = 3;

let canvas = document.getElementById('canvas');
let c = canvas.getContext('2d');

export class Tree {
    constructor(x, height, color) {
        this.x = x;
        this.height = height;
        this.color = color;

        // compute additional properties
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
}
