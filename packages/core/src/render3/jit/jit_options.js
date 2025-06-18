"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setJitOptions = setJitOptions;
exports.getJitOptions = getJitOptions;
exports.resetJitOptions = resetJitOptions;
let jitOptions = null;
function setJitOptions(options) {
    if (jitOptions !== null) {
        if (options.defaultEncapsulation !== jitOptions.defaultEncapsulation) {
            ngDevMode &&
                console.error('Provided value for `defaultEncapsulation` can not be changed once it has been set.');
            return;
        }
        if (options.preserveWhitespaces !== jitOptions.preserveWhitespaces) {
            ngDevMode &&
                console.error('Provided value for `preserveWhitespaces` can not be changed once it has been set.');
            return;
        }
    }
    jitOptions = options;
}
function getJitOptions() {
    return jitOptions;
}
function resetJitOptions() {
    jitOptions = null;
}
