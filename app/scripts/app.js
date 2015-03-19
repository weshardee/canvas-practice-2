'use strict';

import {Rain} from './rain';
import {Tree} from './tree';
import {Fence} from './fence';
import {c, canvas} from 'canvas';

const UPDATE_DELAY = 15;

export class App {
    constructor() {
        this._entities = [];
        this._entities.push(new Fence());
        this.addTrees();
        this.rain = new Rain(this._entities);
        this.draw();

        setInterval(() => {
            this.update();
        }, UPDATE_DELAY);
    }

    addRain() {
        this.rain = new Rain();
    }

    addTrees() {
        let numTrees = canvas.width * 0.03;

        for (let i = 0; i < numTrees; i++) {
            this._entities.push(new Tree());
        }
    }

    drawSky() {
        var bg = c.createLinearGradient(0, canvas.height, 0, 0);

        bg.addColorStop(0, 'white');
        bg.addColorStop(1, '#39a8e1');

        c.fillStyle = bg;
        c.fillRect(0, 0, canvas.width, canvas.height);
    }


    drawEntities() {
        for(let i = 0; i < this._entities.length; i++) {
            this._entities[i].draw();
        }
    }

    draw() {
        this._entities.sort((a, b) => {
            return a.z - b.z;
        });

        c.save();
        this.drawSky();
        this.drawEntities();
        c.restore();

        window.requestAnimationFrame(() => {
            this.draw();
        });
    }

    update() {
        let currentTime;
        let deltaTime;

        currentTime = Date.now();
        deltaTime = currentTime - this.lastUpdated + this.deltaTime;

        if (this.lastUpdated === undefined) {
            this.lastUpdated = currentTime;
            this.deltaTime = 0;
            return;
        }

        this.lastUpdated = currentTime;

        while (deltaTime >= UPDATE_DELAY) {
            deltaTime = deltaTime - UPDATE_DELAY;
            this.rain.update(UPDATE_DELAY);
        }

        this.deltaTime = deltaTime;
    }
}
