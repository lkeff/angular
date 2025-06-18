"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncData = asyncData;
exports.asyncError = asyncError;
/*
 * Mock async observables that return asynchronously.
 * The observable either emits once and completes or errors.
 *
 * Must call `tick()` when test with `fakeAsync()`.
 *
 * THE FOLLOWING DON'T WORK
 * Using `of().delay()` triggers TestBed errors;
 * see https://github.com/angular/angular/issues/10127 .
 *
 * Using `asap` scheduler - as in `of(value, asap)` - doesn't work either.
 */
const rxjs_1 = require("rxjs");
// #docregion async-data
/**
 * Create async observable that emits-once and completes
 * after a JS engine turn
 */
function asyncData(data) {
    return (0, rxjs_1.defer)(() => Promise.resolve(data));
}
// #enddocregion async-data
// #docregion async-error
/**
 * Create async observable error that errors
 * after a JS engine turn
 */
function asyncError(errorObject) {
    return (0, rxjs_1.defer)(() => Promise.reject(errorObject));
}
// #enddocregion async-error
