"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.zoneSymbol = void 0;
exports.ifEnvSupports = ifEnvSupports;
exports.ifEnvSupportsWithDone = ifEnvSupportsWithDone;
exports.supportPatchXHROnProperty = supportPatchXHROnProperty;
exports.isSupportSetErrorStack = isSupportSetErrorStack;
exports.asyncTest = asyncTest;
exports.getIEVersion = getIEVersion;
exports.isFirefox = isFirefox;
exports.isSafari = isSafari;
exports.isEdge = isEdge;
exports.getEdgeVersion = getEdgeVersion;
exports.isPhantomJS = isPhantomJS;
/*
 * Usage:
 *
 *  function supportsOnClick() {
 *    const div = document.createElement('div');
 *    const clickPropDesc = Object.getOwnPropertyDescriptor(div, 'onclick');
 *    return !(EventTarget &&
 *             div instanceof EventTarget &&
 *             clickPropDesc && clickPropDesc.value === null);
 *  }
 *  (<any>supportsOnClick).message = 'Supports Element#onclick patching';
 *
 *
 *  ifEnvSupports(supportsOnClick, function() { ... });
 */
const utils_1 = require("../lib/common/utils");
Object.defineProperty(exports, "zoneSymbol", { enumerable: true, get: function () { return utils_1.zoneSymbol; } });
function ifEnvSupports(test, block, otherwise) {
    return _ifEnvSupports(test, block, otherwise);
}
function ifEnvSupportsWithDone(test, block, otherwise) {
    return _ifEnvSupports(test, block, otherwise, true);
}
function _ifEnvSupports(test, block, otherwise, withDone = false) {
    if (withDone) {
        return function (done) {
            _runTest(test, block, otherwise, done);
        };
    }
    else {
        return function () {
            _runTest(test, block, otherwise, undefined);
        };
    }
}
function _runTest(test, block, otherwise, done) {
    const message = test.message || test.name || test;
    if (typeof test === 'string' ? !!global[test] : test()) {
        if (done) {
            block(done);
        }
        else {
            block();
        }
    }
    else {
        console.log('WARNING: skipping ' + message + ' tests (missing this API)');
        otherwise === null || otherwise === void 0 ? void 0 : otherwise();
        done === null || done === void 0 ? void 0 : done();
    }
}
function supportPatchXHROnProperty() {
    let desc = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, 'onload');
    if (!desc && window['XMLHttpRequestEventTarget']) {
        desc = Object.getOwnPropertyDescriptor(global['XMLHttpRequestEventTarget'].prototype, 'onload');
    }
    if (!desc || !desc.configurable) {
        return false;
    }
    return true;
}
let supportSetErrorStack = true;
function isSupportSetErrorStack() {
    try {
        throw new Error('test');
    }
    catch (err) {
        try {
            err.stack = 'new stack';
            supportSetErrorStack = err.stack === 'new stack';
        }
        catch (error) {
            supportSetErrorStack = false;
        }
    }
    return supportSetErrorStack;
}
isSupportSetErrorStack.message = 'supportSetErrorStack';
function asyncTest(testFn, zone = Zone.current) {
    const AsyncTestZoneSpec = Zone['AsyncTestZoneSpec'];
    return (done) => {
        let asyncTestZone = zone.fork(new AsyncTestZoneSpec(() => { }, (error) => {
            fail(error);
        }, 'asyncTest'));
        asyncTestZone.run(testFn, this, [done]);
    };
}
function getIEVersion() {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('msie') != -1) {
        return parseInt(userAgent.split('msie')[1]);
    }
    return null;
}
function isFirefox() {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('firefox') != -1) {
        return true;
    }
    return false;
}
function isSafari() {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('safari') != -1) {
        return true;
    }
    return false;
}
function isEdge() {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.indexOf('edge') !== -1;
}
function getEdgeVersion() {
    const ua = navigator.userAgent.toLowerCase();
    const edge = ua.indexOf('edge/');
    if (edge === -1) {
        return -1;
    }
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
}
function isPhantomJS() {
    if (utils_1.isNode) {
        return false;
    }
    const ua = navigator.userAgent.toLowerCase();
    return ua.indexOf('phantomjs') !== -1;
}
