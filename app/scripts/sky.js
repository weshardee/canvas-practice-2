import {c, canvas, mouseX} from 'canvas';

export class Sky {
    constructor() {
        this.z = -1;
    }

    draw() {
        var bg = c.createLinearGradient(0, canvas.height, 0, 0);

        bg.addColorStop(0, 'white');
        bg.addColorStop(1, '#39a8e1');

        c.fillStyle = bg;
        c.fillRect(0, 0, canvas.width, canvas.height);
    }
}
