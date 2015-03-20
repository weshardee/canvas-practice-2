import {c} from 'canvas';
import {Entity, Shape, Point} from 'drawables';

const Z = 1.2;

const POST_DIST = 32;
const POST_HEIGHT = 100;
const POST_WIDTH = 28;
const POST_HALF_WIDTH = POST_WIDTH / 2;
const POST_POINT = 10;

const POST_COLOR = 'hsl(50, 25%, 53%)';
const SLAT_COLOR = 'hsl(50, 25%, 50%)';
const DEPTH_COLOR = 'hsl(50, 25%, 40%)';

const NUM_SLATS = 2;
const SLAT_HEIGHT = POST_WIDTH;
const SLAT_HALF_HEIGHT = SLAT_HEIGHT / 2;
const SLAT_DIST = POST_HEIGHT / NUM_SLATS;

export class FencePost extends Shape {
    constructor(x, y, z) {
        super(x, y, z);
        this.updatePoints();
    }

    render() {
        let lastPoint = this._points[this._points.length - 1];
        c.moveTo(lastPoint.x, lastPoint.y);

        for (let point of this._points) {
            c.lineTo(point.x, point.y);
        }

        c.rect(this.x, 0, 10, this.y);

        c.fillStyle = POST_COLOR;
        c.shadowColor = DEPTH_COLOR;
        c.shadowBlur = 0;
        c.shadowOffsetX = 2;
        c.shadowOffsetY = 1;

        c.closePath();
        c.fill();
    }

    updatePoints() {
        let baseY = 0;
        let topY = 0 - POST_HEIGHT;
        let tipY = topY - POST_POINT;
        let x = 0;
        let leftX = x - POST_HALF_WIDTH;
        let rightX = x + POST_HALF_WIDTH;

        this._points = [];

        this._points[0] = new Point(leftX, topY); // top left
        this._points[1] = new Point(x, tipY); // tip
        this._points[2] = new Point(rightX, topY); // top right
        this._points[3] = new Point(rightX, baseY); // bottom right
        this._points[4] = new Point(leftX, baseY); // bottom left
    }
}

export class FenceSlat extends Shape {
    constructor(y, length) {
        super();

        this.y = y;
        this.z = -0.00001; // sit behind posts
        this.length = length;
    }

    render() {
        c.fillStyle = SLAT_COLOR;
        c.shadowColor = DEPTH_COLOR;
        c.shadowBlur = 0;
        c.shadowOffsetX = 2;
        c.shadowOffsetY = 1;

        c.fillRect(0, -SLAT_HALF_HEIGHT, this.length, SLAT_HEIGHT);
    }
}

export class Fence extends Entity {
    constructor(x, length, y) {
        super();

        this.x = x;
        this.y = y;
        this.z = Z;

        for (let i = 1; i <= NUM_SLATS; i++) {
            let slatY = -(i - 0.5) * SLAT_DIST;
            this.addChild(new FenceSlat(slatY, length));
        }

        for (let postX = x; postX < length; postX = postX + POST_DIST) {
            this.addChild(new FencePost(postX));
        }
    }
}
