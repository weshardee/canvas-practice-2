import {Range} from 'range';
import {c, canvas, mouseX} from 'canvas';

const DROP_SIZE = 2;
const DROP_VELOCITY = 10;
const WIND = 3;
const DROP_COLOR = 'hsla(200, 100%, 75%, 0.75)';

let xRange = new Range(-canvas.width * 0.5, canvas.width * 1.2);
let yRange = new Range(0, -canvas.height);
let zRange = new Range(0.25, 2);

class RainDrop {
    constructor() {

    }

    update(dt) {
        let vx = this.x - this.oldX;
        let vy = this.y - this.oldY;

        this.oldX = this.x;
        this.oldY = this.y;

        this.x = this.x + vx;
        this.y = this.y + vy;

        if (this.oldY > canvas.height * 3 * this.z * this.z) {
            this.isDead = true;
        }
    }

    draw() {
        let xOffset = mouseX * this.z * this.z;
        let r = DROP_SIZE * this.z * this.z;

        c.save();

        c.globalCompositeOperation = 'screen';
        c.beginPath();
        c.moveTo(this.x - r + xOffset, this.y);
        c.lineTo(this.oldX + xOffset, this.oldY);
        c.lineTo(this.x + r + xOffset, this.y);
        c.arc(this.x + xOffset, this.y, r, 0, Math.PI);

        c.fillStyle = DROP_COLOR;
        c.closePath();
        c.fill();

        c.restore();
    }
}

export class Rain {
    constructor(entitiesArray) {
        this._entities = entitiesArray;
        this._drops = [];
    }

    update(dt) {
        // generate drops
        for (let i = 0; i < dt / 4; i++) {
            this.addDrop();
        }

        // move drops
        for (let drop of this._drops) {
            drop.update(dt);
        }
    }

    addDrop() {
        let drop;

        // find first available drop
        for (let d of this._drops) {
            if (d.isDead) {
                drop = d;
                break;
            }
        }

        if (drop === undefined) {
            drop = new RainDrop();
            this._drops.push(drop);
            this._entities.push(drop);
        }

        drop.isDead = false;
        drop.z = zRange.getRandom();
        drop.x = drop.oldX = xRange.getRandom();
        drop.oldX = drop.x - WIND * drop.z * drop.z;
        drop.y = yRange.getRandom();
        drop.oldY = drop.y - DROP_VELOCITY * drop.z * drop.z;
        drop.size = drop.z * drop.z * DROP_SIZE;
    }
}
