'use strict';

export let canvas = document.getElementById('canvas');
export let c = canvas.getContext('2d');

window.onresize = function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

window.onresize();
