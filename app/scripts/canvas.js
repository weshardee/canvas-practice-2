'use strict';

export let canvas = document.getElementById('canvas');
export let c = canvas.getContext('2d');
export let mouseX = 0;

window.onresize = function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

window.onresize();

window.onmousemove = function mouseMove(e) {
    mouseX = -200 * (e.pageX / canvas.width * 2 - 1);
};
