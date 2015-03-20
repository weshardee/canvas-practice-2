import {c, mouseX} from 'canvas';

export class Point {
    constructor(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }
}

export class Shape extends Point{
    constructor(x, y, z) {
        super(x, y, z);
    }

    draw() {
        let zPow = this.z * this.z;
        let offsetX = mouseX * zPow;

        c.save();
        c.translate((this.x + offsetX), this.y);
        c.beginPath();
        this.render();
        c.restore();
    }

    render() {
        // to be implemented by subclasses
    }
}

export class Entity extends Shape {
    constructor(x, y, z) {
        super(x, y, z);
        this._children = [];
    }

    addChild(childEntity) {
        // TODO: only allow entities or shapes
        this._children.push(childEntity);
    }

    render() {
        this._children.sort((a, b) => {
            return a.z - b.z;
        });

        for (let child of this._children) {
            child.draw();
        }
    }
}

export class Rect extends Shape {
    constructor(w, h, color) {
        super(0, 0, 0);

        this.w = w;
        this.h = h;
        this.color = color;
    }
    render() {
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.w, this.h);
    }
}
