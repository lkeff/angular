"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hero = void 0;
class Hero {
    constructor(id = 0, name = '') {
        this.id = id;
        this.name = name;
    }
    clone() {
        return new Hero(this.id, this.name);
    }
}
exports.Hero = Hero;
