import {c, canvas} from 'canvas';

const POST_DIST = 32;
const POST_HEIGHT = 100;
const POST_WIDTH = 28;
const POST_HALF_WIDTH = POST_WIDTH / 2;
const POST_POINT = 10;

const POST_COLOR = 'hsl(50, 25%, 50%)';
const POST_DEPTH_COLOR = 'hsl(50, 25%, 35%)';
const SLAT_COLOR = 'hsl(50, 25%, 40%)';

const NUM_SLATS = 2;
const SLAT_HEIGHT = POST_WIDTH;
const SLAT_HALF_HEIGHT = SLAT_HEIGHT / 2;
const SLAT_DIST = POST_HEIGHT / NUM_SLATS;

export class FencePost {
    constructor(x) {
        let baseY = canvas.height;
        let topY = canvas.height - POST_HEIGHT;
        let tipY = topY - POST_POINT;

        let leftX = x - POST_HALF_WIDTH;
        let rightX = x + POST_HALF_WIDTH;

        this.x = x;

        this._points = [];

        this._points[0] = { // top left
            x: leftX,
            y: topY
        };

        this._points[1] = { // tip
            x: x,
            y: tipY
        };

        this._points[2] = { // top right
            x: rightX,
            y: topY
        };

        this._points[3] = { // bottom right
            x: rightX,
            y: baseY
        };

        this._points[4] = { // bottom left
            x: leftX,
            y: baseY
        };
    }

    draw() {
        let lastPoint = this._points[this._points.length - 1];


        c.beginPath();
        c.moveTo(lastPoint.x, lastPoint.y);

        for (let point of this._points) {
            c.lineTo(point.x, point.y);
        }

        c.fillStyle = POST_COLOR;
        c.shadowColor = POST_DEPTH_COLOR;
        c.shadowBlur = 0;
        c.shadowOffsetX = 2;
        c.shadowOffsetY = 1;
        c.fill();
    }
}

export class FenceSlat {
    constructor(y) {
        this.y = y;
        this.topY = y - SLAT_HALF_HEIGHT;
        this.topY = y - SLAT_HALF_HEIGHT;
    }

    draw() {
        c.beginPath();
        c.rect(0, canvas.height - this.topY, canvas.width, SLAT_HEIGHT);
        c.fillStyle = SLAT_COLOR;
        c.fill();
    }
}

export class Fence {
    constructor() {
        let x = 0;

        this._slats = [];
        this._posts = [];

        for (let x = 0; x < canvas.width + POST_DIST; x = x + POST_DIST) {
            this._posts.push(new FencePost(x));
        }

        for (let i = 1; i <= NUM_SLATS; i++) {
            this._slats.push(new FenceSlat(i * SLAT_DIST));
        }
    }

    draw() {
        for (let slat of this._slats) {
            slat.draw();
        }

        for (let post of this._posts) {
            post.draw();
        }
    }
}
