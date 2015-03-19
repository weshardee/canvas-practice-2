'use strict';

import {Sky} from './sky';
import {Rain} from './rain';
import {Tree} from './tree';
import {Fence} from './fence';
import {c, canvas} from 'canvas';

const UPDATE_DELAY = 15;

export class App {
    constructor() {
        this._entities = [];
        this._entities.push(new Fence());
        this._entities.push(new Sky());
        this.addTrees();
        this.rain = new Rain(this._entities);
        this.draw();
        this.update();
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

    draw() {
        this._entities.sort((a, b) => {
            return a.z - b.z;
        });

        c.save();
        for (let entity of this._entities) {
            entity.draw();
        }
        c.restore();
    }

    update() {
        console.log('update');
        let currentTime;
        let deltaTime;

        currentTime = Date.now();
        deltaTime = currentTime - this.lastUpdated + this.deltaTime;

        if (this.lastUpdated === undefined) {
            this.lastUpdated = currentTime;
            this.deltaTime = 0;
        } else {
            this.lastUpdated = currentTime;

            while (deltaTime >= UPDATE_DELAY) {
                deltaTime = deltaTime - UPDATE_DELAY;
                this.rain.update(UPDATE_DELAY);
            }

            this.deltaTime = deltaTime;

            this.draw();
        }

        window.requestAnimationFrame(() => {
            this.update();
        });
    }
}
