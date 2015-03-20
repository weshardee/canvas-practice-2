'use strict';

import {Entity} from 'drawables';
import {Sky} from './sky';
import {Rain} from './rain';
import {Tree} from './tree';
import {Fence} from './fence';
import {c, canvas} from 'canvas';

const UPDATE_DELAY = 15;

export class App extends Entity {
    constructor() {
        super(0,0,0);

        // add scene objects
        this.addChild(new Fence(canvas.width * -0.25, canvas.width * 1.5, canvas.height));
        this.addChild(new Sky());
        this.addTrees();

        // add precipitation
        this.rain = new Rain(this._children);

        // this.draw();
        this.update(); // start the update cycle
    }

    addTrees() {
        let numTrees = canvas.width * 0.03;

        for (let i = 0; i < numTrees; i++) {
            this.addChild(new Tree());
        }
    }

    update() {
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
