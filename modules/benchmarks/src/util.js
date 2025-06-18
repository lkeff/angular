"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIntParameter = getIntParameter;
exports.getStringParameter = getStringParameter;
exports.bindAction = bindAction;
exports.profile = profile;
urlParamsToForm();
function getIntParameter(name) {
    return parseInt(getStringParameter(name), 10);
}
function getStringParameter(name) {
    const els = document.querySelectorAll(`input[name="${name}"]`);
    let value;
    let el;
    for (let i = 0; i < els.length; i++) {
        el = els[i];
        const type = el.type;
        if ((type != 'radio' && type != 'checkbox') || el.checked) {
            value = el.value;
            break;
        }
    }
    if (value == null) {
        throw new Error(`Could not find and input field with name ${name}`);
    }
    return value;
}
function bindAction(selector, callback) {
    document.querySelector(selector).addEventListener('click', callback);
}
function profile(create, destroy, name) {
    return function () {
        // 'console.profile' is experimental and was removed from DOM lib in TS 3.9
        window.console.profile(name);
        const noOfRuns = 150;
        let durations = [];
        let count = 0;
        while (count++ < noOfRuns) {
            const start = window.performance.now();
            create();
            const end = window.performance.now() - start;
            durations.push(end);
            destroy();
        }
        // 'console.profileEnd' is experimental and was removed from DOM lib in TS 3.9
        window.console.profileEnd();
        reportProfileResults(durations, noOfRuns);
    };
}
function reportProfileResults(durations, count) {
    const totalDuration = durations.reduce((soFar, duration) => soFar + duration, 0);
    const avgDuration = (totalDuration / count).toFixed(2);
    const minDuration = durations
        .reduce((soFar, duration) => Math.min(soFar, duration), Number.MAX_SAFE_INTEGER)
        .toFixed(2);
    window.console.log(`Iterations: ${count}; cold time: ${durations[0].toFixed(2)} ms; average time: ${avgDuration} ms / iteration; best time: ${minDuration} ms`);
}
// helper script that will read out the url parameters
// and store them in appropriate form fields on the page
function urlParamsToForm() {
    const regex = /(\w+)=(\w+)/g;
    const search = decodeURIComponent(location.search);
    let match;
    while ((match = regex.exec(search))) {
        const name = match[1];
        const value = match[2];
        const els = document.querySelectorAll('input[name="' + name + '"]');
        let el;
        for (let i = 0; i < els.length; i++) {
            el = els[i];
            if (el.type === 'radio' || el.type === 'checkbox') {
                el.checked = el.value === value;
            }
            else {
                el.value = value;
            }
        }
    }
}
