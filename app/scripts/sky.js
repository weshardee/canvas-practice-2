import {c, canvas} from 'canvas';
import {Shape} from 'drawables';

export class Sky extends Shape {
    render() {
        let bg = c.createLinearGradient(0, canvas.height, 0, 0);

        bg.addColorStop(0, 'white');
        bg.addColorStop(1, '#39a8e1');

        c.fillStyle = bg;
        c.fillRect(0, 0, canvas.width, canvas.height);
    }
}
