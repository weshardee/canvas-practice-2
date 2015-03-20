import {Particle} from 'drawables';
import {Range} from 'range';
import {c, canvas} from 'canvas';

const DROP_SIZE = 2;
const DROP_VELOCITY = 10;
const WIND = 3;
const DROP_COLOR = 'hsla(200, 100%, 75%, 0.75)';

let xRange = new Range(-canvas.width * 0.5, canvas.width * 1.2);
let yRange = new Range(0, -canvas.height);
let zRange = new Range(0.25, 2);

class RainDrop extends Particle {
    update(dt) {
        super.update(dt);

        if (this.oldY > canvas.height * 3 * this.z * this.z) {
            this.isDead = true;
        }
    }

    render() {
        let r = DROP_SIZE * this.z * this.z;
        let vy = this.y - this.oldY;
        let vx = this.x - this.oldX;

        // set blending mode & color
        c.fillStyle = DROP_COLOR;
        c.globalCompositeOperation = 'screen';

        // draw drop
        c.arc(0, 0, r, 0, Math.PI * 2);
        c.moveTo(-r, 0);
        c.lineTo(-vx, -vy);
        c.lineTo(r, 0);

        c.closePath();
        c.fill();
    }
}

export class Rain {
    constructor(entity) {
        this._entity = entity;
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

        if (drop === undefined && this._drops.length >= 1000) {
            return; // prevent memory leaks by having ridiculous number of particles
        }

        if (drop === undefined) {
            drop = new RainDrop();
            this._drops.push(drop);
            this._entity.addChild(drop);
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
