'use strict';

// colors
var SKY_L = {
    H: 220,
    S: 54,
    L: 54
};
var SKY_R = {
    H: 250,
    S: 40,
    L: 33
};

var TREE_COLOR = 'green';
var FENCE_COLOR = 'brown';

// initial setup
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var c = ctx;

var centerX;
var centerY;

function drawSky(a) {
    a = a || 1;
    var bg = c.createLinearGradient(0, canvas.height, 0, 0);
    var colorL = 'hsla(' + SKY_L.H + ',' + SKY_L.S + '%,' + SKY_L.L + '%,' + a +')';
    var colorR = 'hsla(' + SKY_R.H + ',' + SKY_R.S + '%,' + SKY_R.L + '%,' + a +')';

    bg.addColorStop(0, colorL);
    bg.addColorStop(1, colorR);

    c.fillStyle = bg;
    c.fillStyle = 'hsla(200, 0%, 0%, ' + a +')';

    c.fillRect(0, 0, canvas.width, canvas.height);
}

function drawTree(x, height, color) {
    var treeHeight = height || 400;
    var startY = canvas.height;
    var treeWidth = treeHeight / 4;
    var numTreeRungs = 3;

    var rungWidth = treeWidth;
    var rungBaseY = startY;
    var progress;

    c.fillStyle = color || TREE_COLOR;

    // draw first rung
    for (var i = 0; i < numTreeRungs; i++) {
        progress = i / numTreeRungs;

        rungBaseY = -treeHeight * Math.pow(progress, 1.2) + startY;
        rungWidth = -treeWidth * Math.pow(progress, 3) + treeWidth;

        c.beginPath();
        c.moveTo(x - rungWidth, rungBaseY);
        c.lineTo(x, canvas.height - treeHeight);
        c.lineTo(x + rungWidth, rungBaseY);
        c.fill();
    }
}

function drawTrees() {
    var i;
    var pos;
    var color;
    var height;
    var progress;
    var numTrees = 40;
    var maxTreeHeight = 400;
    var minTreeHeight = 220;
    var treeHeightDelta = maxTreeHeight - minTreeHeight;

    var h = 0;
    var s = 0;
    var l = 0;

    var maxH = 150;
    var minH = 100;
    var deltaH = maxH - minH;

    var maxS = 100;
    var minS = 70;
    var deltaS = maxS - minS;

    var maxL = 40;
    var minL = 25;
    var deltaL = maxL - minL;

    for (i = 0; i < numTrees; i++) {
        // drawSky(1 / numTrees); // create atmosphere effect;

        progress = i / numTrees;

        h = Math.floor(deltaH * Math.random() + minH);
        s = Math.floor(deltaS * Math.random() + minS);
        l = Math.floor(deltaL * Math.random() + minL);

        l = minL + Math.random() * progress * deltaL;

        color = 'hsl(' + h + ', ' + s + '%, ' + l + '%)';

        pos = canvas.width * Math.random();
        height = treeHeightDelta * Math.random() * progress + minTreeHeight;
        drawTree(pos, height, color);
    }
}

function draw() {
    var i;
    var skyLayers = 2;

    for (i = 0; i < skyLayers; i++) {
        drawSky(0.5);
    }
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    centerX = canvas.width / 2;
    centerY = canvas.height / 2;

    draw();
}

function init() {
    resize();
    window.onresize = resize;
}

init();
