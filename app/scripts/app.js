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
        let numTrees = canvas.width * 0.1;

        for (let i = 0; i < numTrees; i++) {
            let x = canvas.width * Math.random();
            this._trees.push(new Tree(x));
        }

        this._trees.sort((a, b) => {
            return a.z > b.z;
        });
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
