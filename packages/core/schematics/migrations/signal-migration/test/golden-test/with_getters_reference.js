"use strict";
// tslint:disable
Object.defineProperty(exports, "__esModule", { value: true });
class WithGettersExternalRef {
    constructor() {
        this.instance = null;
    }
    test() {
        if (this.instance.accessor) {
            console.log(this.instance.accessor);
        }
    }
}
