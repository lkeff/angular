"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myService = myService;
// #docregion factory
function myService(options) {
    return (tree) => tree;
}
// #enddocregion factory
