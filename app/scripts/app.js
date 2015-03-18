'use strict';

import {Tree} from './Tree';

// initial setup
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var c = ctx;

var centerX;
var centerY;

export class App {
    constructor() {
        this._trees = [];

        this.resize();
        this.addTrees();
        this.draw();

        window.onresize = () => {
            this.resize();
            this.draw();
        };
    }

    addTrees() {
        var i;
        var x;
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

            x = canvas.width * Math.random();
            height = treeHeightDelta * Math.random() * progress + minTreeHeight;

            this._trees.push(new Tree(x, height, color));
        }
    }

    drawSky() {
        var bg = c.createLinearGradient(0, canvas.height, 0, 0);

        bg.addColorStop(0, 'white');
        bg.addColorStop(1, '#39a8e1');

        c.fillStyle = bg;
        c.fillRect(0, 0, canvas.width, canvas.height);
    }


    drawTrees() {
        for(let i = 0; i < this._trees.length; i++) {
            this._trees[i].draw();
        }
    }

    draw() {
        this.drawSky();
        this.drawTrees();
    }

    resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        centerX = canvas.width / 2;
        centerY = canvas.height / 2;
    }
}
