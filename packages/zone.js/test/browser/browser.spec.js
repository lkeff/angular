"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const property_descriptor_1 = require("../../lib/browser/property-descriptor");
const events_1 = require("../../lib/common/events");
const utils_1 = require("../../lib/common/utils");
const test_util_1 = require("../test-util");
const noop = function () { };
function windowPrototype() {
    return !!(global['Window'] && global['Window'].prototype);
}
function promiseUnhandleRejectionSupport() {
    return !!global['PromiseRejectionEvent'];
}
function canPatchOnProperty(obj, prop) {
    const func = function () {
        if (!obj) {
            return false;
        }
        const desc = Object.getOwnPropertyDescriptor(obj, prop);
        if (!desc || !desc.configurable) {
            return false;
        }
        return true;
    };
    func.message = 'patchOnProperties';
    return func;
}
let supportsPassive = false;
try {
    const opts = Object.defineProperty({}, 'passive', {
        get: function () {
            supportsPassive = true;
        },
    });
    window.addEventListener('test', opts, opts);
    window.removeEventListener('test', opts, opts);
}
catch (e) { }
function supportEventListenerOptions() {
    return supportsPassive;
}
supportEventListenerOptions.message = 'supportsEventListenerOptions';
function supportCanvasTest() {
    const HTMLCanvasElement = window['HTMLCanvasElement'];
    const supportCanvas = typeof HTMLCanvasElement !== 'undefined' &&
        HTMLCanvasElement.prototype &&
        HTMLCanvasElement.prototype.toBlob;
    const FileReader = window['FileReader'];
    const supportFileReader = typeof FileReader !== 'undefined';
    return supportCanvas && supportFileReader;
}
supportCanvasTest.message = 'supportCanvasTest';
function ieOrEdge() {
    return (0, utils_1.isIEOrEdge)();
}
ieOrEdge.message = 'IE/Edge Test';
class TestEventListener {
    constructor() {
        this.logs = [];
    }
    addEventListener(eventName, listener, options) {
        this.logs.push(options);
    }
    removeEventListener(eventName, listener, options) { }
}
describe('Zone', function () {
    const rootZone = Zone.current;
    Zone[(0, utils_1.zoneSymbol)('ignoreConsoleErrorUncaughtError')] = true;
    describe('hooks', function () {
        it('should allow you to override alert/prompt/confirm', function () {
            const alertSpy = jasmine.createSpy('alert');
            const promptSpy = jasmine.createSpy('prompt');
            const confirmSpy = jasmine.createSpy('confirm');
            const spies = {
                'alert': alertSpy,
                'prompt': promptSpy,
                'confirm': confirmSpy,
            };
            const myZone = Zone.current.fork({
                name: 'spy',
                onInvoke: (parentZoneDelegate, currentZone, targetZone, callback, applyThis, applyArgs, source) => {
                    if (source) {
                        spies[source].apply(null, applyArgs);
                    }
                    else {
                        return parentZoneDelegate.invoke(targetZone, callback, applyThis, applyArgs, source);
                    }
                },
            });
            myZone.run(function () {
                alert('alertMsg');
                prompt('promptMsg', 'default');
                confirm('confirmMsg');
            });
            expect(alertSpy).toHaveBeenCalledWith('alertMsg');
            expect(promptSpy).toHaveBeenCalledWith('promptMsg', 'default');
            expect(confirmSpy).toHaveBeenCalledWith('confirmMsg');
        });
        describe('DOM onProperty hooks', (0, test_util_1.ifEnvSupports)(canPatchOnProperty(HTMLElement.prototype, 'onclick'), function () {
            let mouseEvent = document.createEvent('Event');
            let hookSpy, eventListenerSpy;
            const zone = rootZone.fork({
                name: 'spy',
                onScheduleTask: (parentZoneDelegate, currentZone, targetZone, task) => {
                    hookSpy();
                    return parentZoneDelegate.scheduleTask(targetZone, task);
                },
            });
            beforeEach(function () {
                mouseEvent.initEvent('mousedown', true, true);
                hookSpy = jasmine.createSpy('hook');
                eventListenerSpy = jasmine.createSpy('eventListener');
            });
            const globalEventHandlersEventNames = [
                'abort',
                'animationcancel',
                'animationend',
                'animationiteration',
                'auxclick',
                'beforeinput',
                'blur',
                'cancel',
                'canplay',
                'canplaythrough',
                'change',
                'compositionstart',
                'compositionupdate',
                'compositionend',
                'cuechange',
                'click',
                'close',
                'contextmenu',
                'curechange',
                'dblclick',
                'drag',
                'dragend',
                'dragenter',
                'dragexit',
                'dragleave',
                'dragover',
                'drop',
                'durationchange',
                'emptied',
                'ended',
                'error',
                'focus',
                'focusin',
                'focusout',
                'gotpointercapture',
                'input',
                'invalid',
                'keydown',
                'keypress',
                'keyup',
                'load',
                'loadstart',
                'loadeddata',
                'loadedmetadata',
                'lostpointercapture',
                'mousedown',
                'mouseenter',
                'mouseleave',
                'mousemove',
                'mouseout',
                'mouseover',
                'mouseup',
                'mousewheel',
                'orientationchange',
                'pause',
                'play',
                'playing',
                'pointercancel',
                'pointerdown',
                'pointerenter',
                'pointerleave',
                'pointerlockchange',
                'mozpointerlockchange',
                'webkitpointerlockerchange',
                'pointerlockerror',
                'mozpointerlockerror',
                'webkitpointerlockerror',
                'pointermove',
                'pointout',
                'pointerover',
                'pointerup',
                'progress',
                'ratechange',
                'reset',
                'resize',
                'scroll',
                'seeked',
                'seeking',
                'select',
                'selectionchange',
                'selectstart',
                'show',
                'sort',
                'stalled',
                'submit',
                'suspend',
                'timeupdate',
                'volumechange',
                'touchcancel',
                'touchmove',
                'touchstart',
                'touchend',
                'transitioncancel',
                'transitionend',
                'waiting',
                'wheel',
            ];
            const documentEventNames = [
                'afterscriptexecute',
                'beforescriptexecute',
                'DOMContentLoaded',
                'freeze',
                'fullscreenchange',
                'mozfullscreenchange',
                'webkitfullscreenchange',
                'msfullscreenchange',
                'fullscreenerror',
                'mozfullscreenerror',
                'webkitfullscreenerror',
                'msfullscreenerror',
                'readystatechange',
                'visibilitychange',
                'resume',
            ];
            const windowEventNames = [
                'absolutedeviceorientation',
                'afterinput',
                'afterprint',
                'appinstalled',
                'beforeinstallprompt',
                'beforeprint',
                'beforeunload',
                'devicelight',
                'devicemotion',
                'deviceorientation',
                'deviceorientationabsolute',
                'deviceproximity',
                'hashchange',
                'languagechange',
                'message',
                'mozbeforepaint',
                'offline',
                'online',
                'paint',
                'pageshow',
                'pagehide',
                'popstate',
                'rejectionhandled',
                'storage',
                'unhandledrejection',
                'unload',
                'userproximity',
                'vrdisplayconnected',
                'vrdisplaydisconnected',
                'vrdisplaypresentchange',
            ];
            const htmlElementEventNames = [
                'beforecopy',
                'beforecut',
                'beforepaste',
                'copy',
                'cut',
                'paste',
                'dragstart',
                'loadend',
                'animationstart',
                'search',
                'transitionrun',
                'transitionstart',
                'webkitanimationend',
                'webkitanimationiteration',
                'webkitanimationstart',
                'webkittransitionend',
            ];
            const mediaElementEventNames = [
                'encrypted',
                'waitingforkey',
                'msneedkey',
                'mozinterruptbegin',
                'mozinterruptend',
            ];
            const ieElementEventNames = [
                'activate',
                'afterupdate',
                'ariarequest',
                'beforeactivate',
                'beforedeactivate',
                'beforeeditfocus',
                'beforeupdate',
                'cellchange',
                'controlselect',
                'dataavailable',
                'datasetchanged',
                'datasetcomplete',
                'errorupdate',
                'filterchange',
                'layoutcomplete',
                'losecapture',
                'move',
                'moveend',
                'movestart',
                'propertychange',
                'resizeend',
                'resizestart',
                'rowenter',
                'rowexit',
                'rowsdelete',
                'rowsinserted',
                'command',
                'compassneedscalibration',
                'deactivate',
                'help',
                'mscontentzoom',
                'msmanipulationstatechanged',
                'msgesturechange',
                'msgesturedoubletap',
                'msgestureend',
                'msgesturehold',
                'msgesturestart',
                'msgesturetap',
                'msgotpointercapture',
                'msinertiastart',
                'mslostpointercapture',
                'mspointercancel',
                'mspointerdown',
                'mspointerenter',
                'mspointerhover',
                'mspointerleave',
                'mspointermove',
                'mspointerout',
                'mspointerover',
                'mspointerup',
                'pointerout',
                'mssitemodejumplistitemremoved',
                'msthumbnailclick',
                'stop',
                'storagecommit',
            ];
            const webglEventNames = [
                'webglcontextrestored',
                'webglcontextlost',
                'webglcontextcreationerror',
            ];
            const formEventNames = ['autocomplete', 'autocompleteerror'];
            const detailEventNames = ['toggle'];
            const frameEventNames = ['load'];
            const frameSetEventNames = [
                'blur',
                'error',
                'focus',
                'load',
                'resize',
                'scroll',
                'messageerror',
            ];
            const marqueeEventNames = ['bounce', 'finish', 'start'];
            const XMLHttpRequestEventNames = [
                'loadstart',
                'progress',
                'abort',
                'error',
                'load',
                'progress',
                'timeout',
                'loadend',
                'readystatechange',
            ];
            const IDBIndexEventNames = [
                'upgradeneeded',
                'complete',
                'abort',
                'success',
                'error',
                'blocked',
                'versionchange',
                'close',
            ];
            const websocketEventNames = ['close', 'error', 'open', 'message'];
            const workerEventNames = ['error', 'message'];
            const eventNames = globalEventHandlersEventNames.concat(webglEventNames, formEventNames, detailEventNames, documentEventNames, windowEventNames, htmlElementEventNames, ieElementEventNames);
            function checkIsOnPropertiesPatched(target, shouldPatchedProperties, ignoredProperties) {
                let checkTargetProps = shouldPatchedProperties && shouldPatchedProperties.map((p) => `on${p}`);
                if (!checkTargetProps) {
                    checkTargetProps = [];
                    for (let prop in target) {
                        checkTargetProps.push(prop);
                    }
                }
                for (let i = 0; i < checkTargetProps.length; i++) {
                    const prop = checkTargetProps[i];
                    if (ignoredProperties &&
                        ignoredProperties.filter((ignoreProp) => ignoreProp === prop).length > 0) {
                        continue;
                    }
                    if (prop.slice(0, 2) === 'on' && prop.length > 2) {
                        let propExistsOnTarget = false;
                        let checkTarget = target;
                        while (checkTarget && checkTarget !== Object) {
                            const desc = Object.getOwnPropertyDescriptor(checkTarget, prop);
                            if (desc && desc.configurable) {
                                propExistsOnTarget = true;
                                break;
                            }
                            checkTarget = Object.getPrototypeOf(checkTarget);
                        }
                        if (!propExistsOnTarget) {
                            console.warn(`${prop} not exists on target ${target}`);
                            continue;
                        }
                        target[prop] = noop;
                        if (!target[Zone.__symbol__('ON_PROPERTY' + prop.slice(2))]) {
                            fail(`${prop} of ${target} is not patched`);
                        }
                        else {
                            expect(target[prop]).toBe(noop);
                            target[prop] = null;
                            expect(target[Zone.__symbol__('ON_PROPERTY' + prop.slice(2))]).toBeNull();
                        }
                    }
                }
            }
            it('should patch all possible on properties on native prototype', function () {
                function isPropertyPatched(obj, prop, prototype) {
                    let desc = Object.getOwnPropertyDescriptor(obj, prop);
                    if (!desc && prototype) {
                        // when patch window object, use prototype to check prop exist or not
                        const prototypeDesc = Object.getOwnPropertyDescriptor(prototype, prop);
                        if (prototypeDesc) {
                            desc = { enumerable: true, configurable: true };
                        }
                    }
                    // if the descriptor not exists or is not configurable
                    // just return
                    if (!desc || !desc.configurable) {
                        return true;
                    }
                    const onPropPatchedSymbol = (0, utils_1.zoneSymbol)('on' + prop + 'patched');
                    if (obj.hasOwnProperty(onPropPatchedSymbol) && obj[onPropPatchedSymbol]) {
                        return true;
                    }
                    return false;
                }
                function isPropertiesPatched(obj, properties, prototype) {
                    if (properties) {
                        for (let i = 0; i < properties.length; i++) {
                            if (!isPropertyPatched(obj, 'on' + properties[i], prototype)) {
                                fail(`${properties[i]} is not patched on ${obj}`);
                            }
                        }
                    }
                }
                isPropertiesPatched(window, eventNames.concat(['messageerror']), Object.getPrototypeOf(window));
                isPropertiesPatched(Document.prototype, eventNames);
                if (typeof window['SVGElement'] !== 'undefined') {
                    isPropertiesPatched(window['SVGElement'].prototype, eventNames);
                }
                isPropertiesPatched(Element.prototype, eventNames);
                isPropertiesPatched(HTMLElement.prototype, eventNames);
                isPropertiesPatched(HTMLMediaElement.prototype, mediaElementEventNames);
                isPropertiesPatched(HTMLFrameSetElement.prototype, windowEventNames.concat(frameSetEventNames));
                isPropertiesPatched(HTMLBodyElement.prototype, windowEventNames.concat(frameSetEventNames));
                isPropertiesPatched(HTMLFrameElement.prototype, frameEventNames);
                isPropertiesPatched(HTMLIFrameElement.prototype, frameEventNames);
                const HTMLMarqueeElement = window['HTMLMarqueeElement'];
                if (HTMLMarqueeElement) {
                    isPropertiesPatched(HTMLMarqueeElement.prototype, marqueeEventNames);
                }
                const Worker = window['Worker'];
                if (Worker) {
                    isPropertiesPatched(Worker.prototype, workerEventNames);
                }
                const XMLHttpRequest = window['XMLHttpRequest'];
                if (XMLHttpRequest) {
                    // XMLHttpRequest is not available in ServiceWorker, so we need to check here
                    isPropertiesPatched(XMLHttpRequest.prototype, XMLHttpRequestEventNames);
                }
                const XMLHttpRequestEventTarget = window['XMLHttpRequestEventTarget'];
                if (XMLHttpRequestEventTarget) {
                    isPropertiesPatched(XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype, XMLHttpRequestEventNames);
                }
                if (typeof IDBIndex !== 'undefined') {
                    isPropertiesPatched(IDBIndex.prototype, IDBIndexEventNames);
                    isPropertiesPatched(IDBRequest.prototype, IDBIndexEventNames);
                    isPropertiesPatched(IDBOpenDBRequest.prototype, IDBIndexEventNames);
                    isPropertiesPatched(IDBDatabase.prototype, IDBIndexEventNames);
                    isPropertiesPatched(IDBTransaction.prototype, IDBIndexEventNames);
                    isPropertiesPatched(IDBCursor.prototype, IDBIndexEventNames);
                }
                const WebSocket = window['WebSocket'];
                if (WebSocket) {
                    isPropertiesPatched(WebSocket.prototype, websocketEventNames);
                }
            });
            it('should patch all possible on properties on element', function () {
                const htmlElementTagNames = [
                    'a',
                    'area',
                    'audio',
                    'base',
                    'basefont',
                    'blockquote',
                    'br',
                    'button',
                    'canvas',
                    'caption',
                    'col',
                    'colgroup',
                    'data',
                    'datalist',
                    'del',
                    'dir',
                    'div',
                    'dl',
                    'embed',
                    'fieldset',
                    'font',
                    'form',
                    'frame',
                    'frameset',
                    'h1',
                    'h2',
                    'h3',
                    'h4',
                    'h5',
                    'h6',
                    'head',
                    'hr',
                    'html',
                    'iframe',
                    'img',
                    'input',
                    'ins',
                    'isindex',
                    'label',
                    'legend',
                    'li',
                    'link',
                    'listing',
                    'map',
                    'marquee',
                    'menu',
                    'meta',
                    'meter',
                    'nextid',
                    'ol',
                    'optgroup',
                    'option',
                    'output',
                    'p',
                    'param',
                    'picture',
                    'pre',
                    'progress',
                    'q',
                    'script',
                    'select',
                    'source',
                    'span',
                    'style',
                    'table',
                    'tbody',
                    'td',
                    'template',
                    'textarea',
                    'tfoot',
                    'th',
                    'thead',
                    'time',
                    'title',
                    'tr',
                    'track',
                    'ul',
                    'video',
                ];
                htmlElementTagNames.forEach((tagName) => {
                    checkIsOnPropertiesPatched(document.createElement(tagName), eventNames, [
                        'onorientationchange',
                    ]);
                });
            });
            it('should patch all possible on properties on svg element', function () {
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                checkIsOnPropertiesPatched(svg, eventNames);
            });
            it('should patch all possible on properties on media element', function () {
                const audio = document.createElement('audio');
                checkIsOnPropertiesPatched(audio, mediaElementEventNames);
            });
            it('should patch all possible on properties on frameset element', function () {
                const frameset = document.createElement('frameset');
                checkIsOnPropertiesPatched(frameset, windowEventNames.concat(frameSetEventNames));
            });
            it('should patch all possible on properties on body', function () {
                checkIsOnPropertiesPatched(document.body, windowEventNames.concat(frameSetEventNames));
            });
            it('should patch all possible on properties on Frame', function () {
                const frame = document.createElement('frame');
                checkIsOnPropertiesPatched(frame, frameEventNames);
            });
            it('should patch all possible on properties on marquee element', function () {
                const marquee = document.createElement('marquee');
                checkIsOnPropertiesPatched(marquee, marqueeEventNames);
            });
            it('should patch all possible on properties on Window', function () {
                checkIsOnPropertiesPatched(window, eventNames.concat(['messageerror']));
            });
            it('should patch all possible on properties on xhr', function () {
                checkIsOnPropertiesPatched(new XMLHttpRequest(), XMLHttpRequestEventNames);
            });
            it('should patch all possible on properties on worker', function () {
                checkIsOnPropertiesPatched(new Worker('/base/angular/packages/zone.js/test/assets/empty-worker.js'), workerEventNames);
            });
            it('should patch all possible on properties on websocket', function () {
                try {
                    checkIsOnPropertiesPatched(new WebSocket('ws://localhost:8001'), websocketEventNames);
                }
                catch (e) {
                    console.log('error when creating websocket', e);
                }
            });
            it('should not patch ignored on properties', function () {
                const TestTarget = window['TestTarget'];
                (0, property_descriptor_1.patchFilteredProperties)(TestTarget.prototype, ['prop1', 'prop2'], global['__Zone_ignore_on_properties']);
                const testTarget = new TestTarget();
                Zone.current.fork({ name: 'test' }).run(() => {
                    testTarget.onprop1 = function () {
                        // onprop1 should not be patched
                        expect(Zone.current.name).toEqual('test1');
                    };
                    testTarget.onprop2 = function () {
                        // onprop2 should be patched
                        expect(Zone.current.name).toEqual('test');
                    };
                });
                Zone.current.fork({ name: 'test1' }).run(() => {
                    testTarget.dispatchEvent('prop1');
                    testTarget.dispatchEvent('prop2');
                });
            });
            it('should not patch ignored eventListener', function () {
                let scrollEvent = document.createEvent('Event');
                scrollEvent.initEvent('scroll', true, true);
                const zone = Zone.current.fork({ name: 'run' });
                const div = document.createElement('div');
                document.body.appendChild(div);
                Zone.current.fork({ name: 'scroll' }).run(() => {
                    const listener = () => {
                        expect(Zone.current.name).toEqual(zone.name);
                        div.removeEventListener('scroll', listener);
                    };
                    div.addEventListener('scroll', listener);
                });
                zone.run(() => {
                    div.dispatchEvent(scrollEvent);
                });
                document.body.removeChild(div);
            });
            it('non function property starts with on but not event listener should still work as expected', () => {
                window.one_two_three = { foo: 'bar' };
                expect(window.one_two_three).toEqual({ foo: 'bar' });
                window.one_two_three = { bar: 'foo' };
                expect(window.one_two_three).toEqual({ bar: 'foo' });
                window.one_two_three = null;
                expect(window.one_two_three).toBeNull();
            });
            it('function property starts with on but not event listener should still work as expected', () => {
                let called = false;
                const func = function () {
                    called = true;
                };
                window.one_two_three = func;
                expect(window.one_two_three).toEqual(func);
                expect(called).toBeFalse();
                window.one_two_three();
                expect(called).toBeTrue();
                window.one_two_three = null;
                expect(window.one_two_three).toBeNull();
            });
            it('should be able to clear on handler added before load zone.js', function () {
                const TestTarget = window['TestTarget'];
                (0, property_descriptor_1.patchFilteredProperties)(TestTarget.prototype, ['prop3'], global['__Zone_ignore_on_properties']);
                const testTarget = new TestTarget();
                Zone.current.fork({ name: 'test' }).run(() => {
                    expect(testTarget.onprop3).toBeTruthy();
                    const newProp3Handler = function () { };
                    testTarget.onprop3 = newProp3Handler;
                    expect(testTarget.onprop3).toBe(newProp3Handler);
                    testTarget.onprop3 = null;
                    expect(!testTarget.onprop3).toBeTruthy();
                    testTarget.onprop3 = function () {
                        // onprop1 should not be patched
                        expect(Zone.current.name).toEqual('test');
                    };
                });
                Zone.current.fork({ name: 'test1' }).run(() => {
                    testTarget.dispatchEvent('prop3');
                });
            });
            it('window onmousedown should be in zone', (0, test_util_1.ifEnvSupports)(canPatchOnProperty(window, 'onmousedown'), function () {
                zone.run(function () {
                    window.onmousedown = eventListenerSpy;
                });
                window.dispatchEvent(mouseEvent);
                expect(hookSpy).toHaveBeenCalled();
                expect(eventListenerSpy).toHaveBeenCalled();
                window.removeEventListener('mousedown', eventListenerSpy);
                expect(window[(0, utils_1.zoneSymbol)('ON_PROPERTYmousedown')]).toEqual(eventListenerSpy);
                window.onmousedown = null;
                expect(!!window[(0, utils_1.zoneSymbol)('ON_PROPERTYmousedown')]).toBeFalsy();
            }));
            it('window onresize should be patched', (0, test_util_1.ifEnvSupports)(canPatchOnProperty(window, 'onmousedown'), function () {
                window.onresize = eventListenerSpy;
                const innerResizeProp = window[(0, utils_1.zoneSymbol)('ON_PROPERTYresize')];
                expect(innerResizeProp).toBeTruthy();
                innerResizeProp();
                expect(eventListenerSpy).toHaveBeenCalled();
                window.removeEventListener('resize', eventListenerSpy);
                expect(window[(0, utils_1.zoneSymbol)('ON_PROPERTYresize')]).toEqual(eventListenerSpy);
                window.onresize = null;
                expect(!!window[(0, utils_1.zoneSymbol)('ON_PROPERTYresize')]).toBeFalsy();
            }));
            it('document onmousedown should be in zone', (0, test_util_1.ifEnvSupports)(canPatchOnProperty(Document.prototype, 'onmousedown'), function () {
                zone.run(function () {
                    document.onmousedown = eventListenerSpy;
                });
                document.dispatchEvent(mouseEvent);
                expect(hookSpy).toHaveBeenCalled();
                expect(eventListenerSpy).toHaveBeenCalled();
                document.removeEventListener('mousedown', eventListenerSpy);
                expect(document[(0, utils_1.zoneSymbol)('ON_PROPERTYmousedown')]).toEqual(eventListenerSpy);
                document.onmousedown = null;
                expect(!!document[(0, utils_1.zoneSymbol)('ON_PROPERTYmousedown')]).toBeFalsy();
            }));
            // TODO: JiaLiPassion, need to find out why the test bundle is not `use strict`.
            xit('event handler with null context should use event.target', (0, test_util_1.ifEnvSupports)(canPatchOnProperty(Document.prototype, 'onmousedown'), function () {
                const logs = [];
                const EventTarget = window['EventTarget'];
                let oriAddEventListener = EventTarget && EventTarget.prototype
                    ? EventTarget.prototype[(0, utils_1.zoneSymbol)('addEventListener')]
                    : HTMLSpanElement.prototype[(0, utils_1.zoneSymbol)('addEventListener')];
                if (!oriAddEventListener) {
                    // no patched addEventListener found
                    return;
                }
                let handler1;
                let handler2;
                const listener = function () {
                    logs.push('listener1');
                };
                const listener1 = function () {
                    logs.push('listener2');
                };
                HTMLSpanElement.prototype.addEventListener = function (eventName, callback) {
                    if (eventName === 'click') {
                        handler1 = callback;
                    }
                    else if (eventName === 'mousedown') {
                        handler2 = callback;
                    }
                    return oriAddEventListener.apply(this, arguments);
                };
                HTMLSpanElement.prototype[(0, utils_1.zoneSymbol)('addEventListener')] = null;
                (0, events_1.patchEventTarget)(window, null, [HTMLSpanElement.prototype]);
                const span = document.createElement('span');
                document.body.appendChild(span);
                zone.run(function () {
                    span.addEventListener('click', listener);
                    span.onmousedown = listener1;
                });
                expect(handler1).toBe(handler2);
                handler1.apply(null, [{ type: 'click', target: span }]);
                handler2.apply(null, [{ type: 'mousedown', target: span }]);
                expect(hookSpy).toHaveBeenCalled();
                expect(logs).toEqual(['listener1', 'listener2']);
                document.body.removeChild(span);
                if (EventTarget) {
                    EventTarget.prototype[(0, utils_1.zoneSymbol)('addEventListener')] = oriAddEventListener;
                }
                else {
                    HTMLSpanElement.prototype[(0, utils_1.zoneSymbol)('addEventListener')] =
                        oriAddEventListener;
                }
            }));
            it('SVGElement onmousedown should be in zone', (0, test_util_1.ifEnvSupports)(canPatchOnProperty(SVGElement && SVGElement.prototype, 'onmousedown'), function () {
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                document.body.appendChild(svg);
                zone.run(function () {
                    svg.onmousedown = eventListenerSpy;
                });
                svg.dispatchEvent(mouseEvent);
                expect(hookSpy).toHaveBeenCalled();
                expect(eventListenerSpy).toHaveBeenCalled();
                svg.removeEventListener('mouse', eventListenerSpy);
                document.body.removeChild(svg);
            }));
            it('get window onerror should not throw error', (0, test_util_1.ifEnvSupports)(canPatchOnProperty(window, 'onerror'), function () {
                const oriOnError = window.onerror;
                const testFn = function () {
                    try {
                        let onerror = window.onerror;
                        window.onerror = function () { };
                        onerror = window.onerror;
                    }
                    finally {
                        window.onerror = oriOnError;
                    }
                };
                expect(testFn).not.toThrow();
            }));
            it('window.onerror callback signature should be (message, source, lineno, colno, error)', (0, test_util_1.ifEnvSupportsWithDone)(canPatchOnProperty(window, 'onerror'), function (done) {
                const oriOnError = window.onerror;
                let testError = new Error('testError');
                window.onerror = function (message, source, lineno, colno, error) {
                    expect(message).toContain('testError');
                    if ((0, test_util_1.getEdgeVersion)() !== 14) {
                        // Edge 14, error will be undefined.
                        expect(error).toBe(testError);
                    }
                    window.onerror = oriOnError;
                    setTimeout(done);
                    return true;
                };
                setTimeout(() => {
                    throw testError;
                }, 100);
            }));
        }));
        describe('eventListener hooks', function () {
            let button;
            let clickEvent;
            beforeEach(function () {
                button = document.createElement('button');
                clickEvent = document.createEvent('Event');
                clickEvent.initEvent('click', true, true);
                document.body.appendChild(button);
            });
            afterEach(function () {
                document.body.removeChild(button);
            });
            it('should support addEventListener', function () {
                const hookSpy = jasmine.createSpy('hook');
                const eventListenerSpy = jasmine.createSpy('eventListener');
                const zone = rootZone.fork({
                    name: 'spy',
                    onScheduleTask: (parentZoneDelegate, currentZone, targetZone, task) => {
                        hookSpy();
                        return parentZoneDelegate.scheduleTask(targetZone, task);
                    },
                });
                zone.run(function () {
                    button.addEventListener('click', eventListenerSpy);
                });
                button.dispatchEvent(clickEvent);
                expect(hookSpy).toHaveBeenCalled();
                expect(eventListenerSpy).toHaveBeenCalled();
            });
            it('should be able to access addEventListener information in onScheduleTask', function () {
                const hookSpy = jasmine.createSpy('hook');
                const eventListenerSpy = jasmine.createSpy('eventListener');
                let scheduleButton;
                let scheduleEventName;
                let scheduleCapture;
                let scheduleTask;
                const zone = rootZone.fork({
                    name: 'spy',
                    onScheduleTask: (parentZoneDelegate, currentZone, targetZone, task) => {
                        hookSpy();
                        scheduleButton = task.data.taskData.target;
                        scheduleEventName = task.data.taskData.eventName;
                        scheduleCapture = task.data.taskData.capture;
                        scheduleTask = task;
                        return parentZoneDelegate.scheduleTask(targetZone, task);
                    },
                });
                zone.run(function () {
                    button.addEventListener('click', eventListenerSpy);
                });
                button.dispatchEvent(clickEvent);
                expect(hookSpy).toHaveBeenCalled();
                expect(eventListenerSpy).toHaveBeenCalled();
                expect(scheduleButton).toBe(button);
                expect(scheduleEventName).toBe('click');
                expect(scheduleCapture).toBe(false);
                expect(scheduleTask && scheduleTask.data.taskData).toBe(null);
            });
            it('should support addEventListener on window', (0, test_util_1.ifEnvSupports)(windowPrototype, function () {
                const hookSpy = jasmine.createSpy('hook');
                const eventListenerSpy = jasmine.createSpy('eventListener');
                const zone = rootZone.fork({
                    name: 'spy',
                    onScheduleTask: (parentZoneDelegate, currentZone, targetZone, task) => {
                        hookSpy();
                        return parentZoneDelegate.scheduleTask(targetZone, task);
                    },
                });
                zone.run(function () {
                    window.addEventListener('click', eventListenerSpy);
                });
                window.dispatchEvent(clickEvent);
                expect(hookSpy).toHaveBeenCalled();
                expect(eventListenerSpy).toHaveBeenCalled();
            }));
            it('should support removeEventListener', function () {
                const hookSpy = jasmine.createSpy('hook');
                const eventListenerSpy = jasmine.createSpy('eventListener');
                const zone = rootZone.fork({
                    name: 'spy',
                    onCancelTask: (parentZoneDelegate, currentZone, targetZone, task) => {
                        hookSpy();
                        return parentZoneDelegate.cancelTask(targetZone, task);
                    },
                });
                zone.run(function () {
                    button.addEventListener('click', eventListenerSpy);
                    button.removeEventListener('click', eventListenerSpy);
                });
                button.dispatchEvent(clickEvent);
                expect(hookSpy).toHaveBeenCalled();
                expect(eventListenerSpy).not.toHaveBeenCalled();
            });
            describe('should support addEventListener/removeEventListener with AddEventListenerOptions with capture setting', (0, test_util_1.ifEnvSupports)(supportEventListenerOptions, function () {
                let hookSpy;
                let cancelSpy;
                let logs;
                const zone = rootZone.fork({
                    name: 'spy',
                    onScheduleTask: (parentZoneDelegate, currentZone, targetZone, task) => {
                        hookSpy();
                        return parentZoneDelegate.scheduleTask(targetZone, task);
                    },
                    onCancelTask: (parentZoneDelegate, currentZone, targetZone, task) => {
                        cancelSpy();
                        return parentZoneDelegate.cancelTask(targetZone, task);
                    },
                });
                const docListener = () => {
                    logs.push('document');
                };
                const btnListener = () => {
                    logs.push('button');
                };
                beforeEach(() => {
                    logs = [];
                    hookSpy = jasmine.createSpy('hook');
                    cancelSpy = jasmine.createSpy('cancel');
                });
                it('should handle child event when addEventListener with capture true', () => {
                    // test capture true
                    zone.run(function () {
                        document.addEventListener('click', docListener, { capture: true });
                        button.addEventListener('click', btnListener);
                    });
                    button.dispatchEvent(clickEvent);
                    expect(hookSpy).toHaveBeenCalled();
                    expect(logs).toEqual(['document', 'button']);
                    logs = [];
                    document.removeEventListener('click', docListener, { capture: true });
                    button.removeEventListener('click', btnListener);
                    expect(cancelSpy).toHaveBeenCalled();
                    button.dispatchEvent(clickEvent);
                    expect(logs).toEqual([]);
                });
                it('should handle child event when addEventListener with capture true', () => {
                    // test capture false
                    zone.run(function () {
                        document.addEventListener('click', docListener, { capture: false });
                        button.addEventListener('click', btnListener);
                    });
                    button.dispatchEvent(clickEvent);
                    expect(hookSpy).toHaveBeenCalled();
                    expect(logs).toEqual(['button', 'document']);
                    logs = [];
                    document.removeEventListener('click', docListener, { capture: false });
                    button.removeEventListener('click', btnListener);
                    expect(cancelSpy).toHaveBeenCalled();
                    button.dispatchEvent(clickEvent);
                    expect(logs).toEqual([]);
                });
            }));
            describe('should ignore duplicate event handler', (0, test_util_1.ifEnvSupports)(supportEventListenerOptions, function () {
                let hookSpy;
                let cancelSpy;
                let logs;
                const zone = rootZone.fork({
                    name: 'spy',
                    onScheduleTask: (parentZoneDelegate, currentZone, targetZone, task) => {
                        hookSpy();
                        return parentZoneDelegate.scheduleTask(targetZone, task);
                    },
                    onCancelTask: (parentZoneDelegate, currentZone, targetZone, task) => {
                        cancelSpy();
                        return parentZoneDelegate.cancelTask(targetZone, task);
                    },
                });
                const docListener = () => {
                    logs.push('document options');
                };
                beforeEach(() => {
                    logs = [];
                    hookSpy = jasmine.createSpy('hook');
                    cancelSpy = jasmine.createSpy('cancel');
                });
                const testDuplicate = function (args1, args2) {
                    zone.run(function () {
                        if (args1) {
                            document.addEventListener('click', docListener, args1);
                        }
                        else {
                            document.addEventListener('click', docListener);
                        }
                        if (args2) {
                            document.addEventListener('click', docListener, args2);
                        }
                        else {
                            document.addEventListener('click', docListener);
                        }
                    });
                    button.dispatchEvent(clickEvent);
                    expect(hookSpy).toHaveBeenCalled();
                    expect(logs).toEqual(['document options']);
                    logs = [];
                    document.removeEventListener('click', docListener, args1);
                    expect(cancelSpy).toHaveBeenCalled();
                    button.dispatchEvent(clickEvent);
                    expect(logs).toEqual([]);
                };
                it('should ignore duplicate handler', () => {
                    let captureFalse = [
                        undefined,
                        false,
                        { capture: false },
                        { capture: false, passive: false },
                        { passive: false },
                        {},
                    ];
                    let captureTrue = [true, { capture: true }, { capture: true, passive: false }];
                    for (let i = 0; i < captureFalse.length; i++) {
                        for (let j = 0; j < captureFalse.length; j++) {
                            testDuplicate(captureFalse[i], captureFalse[j]);
                        }
                    }
                    for (let i = 0; i < captureTrue.length; i++) {
                        for (let j = 0; j < captureTrue.length; j++) {
                            testDuplicate(captureTrue[i], captureTrue[j]);
                        }
                    }
                });
            }));
            describe('should support mix useCapture with AddEventListenerOptions capture', (0, test_util_1.ifEnvSupports)(supportEventListenerOptions, function () {
                let hookSpy;
                let cancelSpy;
                let logs;
                const zone = rootZone.fork({
                    name: 'spy',
                    onScheduleTask: (parentZoneDelegate, currentZone, targetZone, task) => {
                        hookSpy();
                        return parentZoneDelegate.scheduleTask(targetZone, task);
                    },
                    onCancelTask: (parentZoneDelegate, currentZone, targetZone, task) => {
                        cancelSpy();
                        return parentZoneDelegate.cancelTask(targetZone, task);
                    },
                });
                const docListener = () => {
                    logs.push('document options');
                };
                const docListener1 = () => {
                    logs.push('document useCapture');
                };
                const btnListener = () => {
                    logs.push('button');
                };
                beforeEach(() => {
                    logs = [];
                    hookSpy = jasmine.createSpy('hook');
                    cancelSpy = jasmine.createSpy('cancel');
                });
                const testAddRemove = function (args1, args2) {
                    zone.run(function () {
                        if (args1) {
                            document.addEventListener('click', docListener, args1);
                        }
                        else {
                            document.addEventListener('click', docListener);
                        }
                        if (args2) {
                            document.removeEventListener('click', docListener, args2);
                        }
                        else {
                            document.removeEventListener('click', docListener);
                        }
                    });
                    button.dispatchEvent(clickEvent);
                    expect(cancelSpy).toHaveBeenCalled();
                    expect(logs).toEqual([]);
                };
                it('should be able to add/remove same handler with mix options and capture', function () {
                    let captureFalse = [
                        undefined,
                        false,
                        { capture: false },
                        { capture: false, passive: false },
                        { passive: false },
                        {},
                    ];
                    let captureTrue = [true, { capture: true }, { capture: true, passive: false }];
                    for (let i = 0; i < captureFalse.length; i++) {
                        for (let j = 0; j < captureFalse.length; j++) {
                            testAddRemove(captureFalse[i], captureFalse[j]);
                        }
                    }
                    for (let i = 0; i < captureTrue.length; i++) {
                        for (let j = 0; j < captureTrue.length; j++) {
                            testAddRemove(captureTrue[i], captureTrue[j]);
                        }
                    }
                });
                const testDifferent = function (args1, args2) {
                    zone.run(function () {
                        if (args1) {
                            document.addEventListener('click', docListener, args1);
                        }
                        else {
                            document.addEventListener('click', docListener);
                        }
                        if (args2) {
                            document.addEventListener('click', docListener1, args2);
                        }
                        else {
                            document.addEventListener('click', docListener1);
                        }
                    });
                    button.dispatchEvent(clickEvent);
                    expect(hookSpy).toHaveBeenCalled();
                    expect(logs.sort()).toEqual(['document options', 'document useCapture']);
                    logs = [];
                    if (args1) {
                        document.removeEventListener('click', docListener, args1);
                    }
                    else {
                        document.removeEventListener('click', docListener);
                    }
                    button.dispatchEvent(clickEvent);
                    expect(logs).toEqual(['document useCapture']);
                    logs = [];
                    if (args2) {
                        document.removeEventListener('click', docListener1, args2);
                    }
                    else {
                        document.removeEventListener('click', docListener1);
                    }
                    button.dispatchEvent(clickEvent);
                    expect(logs).toEqual([]);
                };
                it('should be able to add different handlers for same event', function () {
                    let captureFalse = [
                        undefined,
                        false,
                        { capture: false },
                        { capture: false, passive: false },
                        { passive: false },
                        {},
                    ];
                    let captureTrue = [true, { capture: true }, { capture: true, passive: false }];
                    for (let i = 0; i < captureFalse.length; i++) {
                        for (let j = 0; j < captureTrue.length; j++) {
                            testDifferent(captureFalse[i], captureTrue[j]);
                        }
                    }
                    for (let i = 0; i < captureTrue.length; i++) {
                        for (let j = 0; j < captureFalse.length; j++) {
                            testDifferent(captureTrue[i], captureFalse[j]);
                        }
                    }
                });
                it('should handle options.capture true with capture true correctly', function () {
                    zone.run(function () {
                        document.addEventListener('click', docListener, { capture: true });
                        document.addEventListener('click', docListener1, true);
                        button.addEventListener('click', btnListener);
                    });
                    button.dispatchEvent(clickEvent);
                    expect(hookSpy).toHaveBeenCalled();
                    expect(logs).toEqual(['document options', 'document useCapture', 'button']);
                    logs = [];
                    document.removeEventListener('click', docListener, { capture: true });
                    button.dispatchEvent(clickEvent);
                    expect(logs).toEqual(['document useCapture', 'button']);
                    logs = [];
                    document.removeEventListener('click', docListener1, true);
                    button.dispatchEvent(clickEvent);
                    expect(logs).toEqual(['button']);
                    logs = [];
                    button.removeEventListener('click', btnListener);
                    expect(cancelSpy).toHaveBeenCalled();
                    button.dispatchEvent(clickEvent);
                    expect(logs).toEqual([]);
                    document.removeAllListeners('click');
                });
            }));
            it('should support addEventListener with AddEventListenerOptions once setting', (0, test_util_1.ifEnvSupports)(supportEventListenerOptions, function () {
                let hookSpy = jasmine.createSpy('hook');
                let logs = [];
                const zone = rootZone.fork({
                    name: 'spy',
                    onScheduleTask: (parentZoneDelegate, currentZone, targetZone, task) => {
                        hookSpy();
                        return parentZoneDelegate.scheduleTask(targetZone, task);
                    },
                });
                zone.run(function () {
                    button.addEventListener('click', function () {
                        logs.push('click');
                    }, { once: true });
                });
                button.dispatchEvent(clickEvent);
                expect(hookSpy).toHaveBeenCalled();
                expect(logs.length).toBe(1);
                expect(logs).toEqual(['click']);
                logs = [];
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(0);
            }));
            it('should support addEventListener with AddEventListenerOptions once setting and capture', (0, test_util_1.ifEnvSupports)(supportEventListenerOptions, function () {
                let hookSpy = jasmine.createSpy('hook');
                let logs = [];
                const zone = rootZone.fork({
                    name: 'spy',
                    onScheduleTask: (parentZoneDelegate, currentZone, targetZone, task) => {
                        hookSpy();
                        return parentZoneDelegate.scheduleTask(targetZone, task);
                    },
                });
                zone.run(function () {
                    button.addEventListener('click', function () {
                        logs.push('click');
                    }, { once: true, capture: true });
                });
                button.dispatchEvent(clickEvent);
                expect(hookSpy).toHaveBeenCalled();
                expect(logs.length).toBe(1);
                expect(logs).toEqual(['click']);
                logs = [];
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(0);
            }));
            it('should support add multiple listeners with AddEventListenerOptions once setting and same capture after normal listener', (0, test_util_1.ifEnvSupports)(supportEventListenerOptions, function () {
                let logs = [];
                button.addEventListener('click', function () {
                    logs.push('click');
                }, true);
                button.addEventListener('click', function () {
                    logs.push('once click');
                }, { once: true, capture: true });
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(2);
                expect(logs).toEqual(['click', 'once click']);
                logs = [];
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(1);
                expect(logs).toEqual(['click']);
            }));
            it('should support add multiple listeners with AddEventListenerOptions once setting and mixed capture after normal listener', (0, test_util_1.ifEnvSupports)(supportEventListenerOptions, function () {
                let logs = [];
                button.addEventListener('click', function () {
                    logs.push('click');
                });
                button.addEventListener('click', function () {
                    logs.push('once click');
                }, { once: true, capture: true });
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(2);
                expect(logs).toEqual(['once click', 'click']);
                logs = [];
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(1);
                expect(logs).toEqual(['click']);
            }));
            it('should support add multiple listeners with AddEventListenerOptions once setting before normal listener', (0, test_util_1.ifEnvSupports)(supportEventListenerOptions, function () {
                let logs = [];
                button.addEventListener('click', function () {
                    logs.push('once click');
                }, { once: true });
                button.addEventListener('click', function () {
                    logs.push('click');
                });
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(2);
                expect(logs).toEqual(['once click', 'click']);
                logs = [];
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(1);
                expect(logs).toEqual(['click']);
            }));
            it('should support add multiple listeners with AddEventListenerOptions once setting with same capture before normal listener', (0, test_util_1.ifEnvSupports)(supportEventListenerOptions, function () {
                let logs = [];
                button.addEventListener('click', function () {
                    logs.push('once click');
                }, { once: true, capture: true });
                button.addEventListener('click', function () {
                    logs.push('click');
                }, true);
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(2);
                expect(logs).toEqual(['once click', 'click']);
                logs = [];
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(1);
                expect(logs).toEqual(['click']);
            }));
            it('should support add multiple listeners with AddEventListenerOptions once setting with mixed capture before normal listener', (0, test_util_1.ifEnvSupports)(supportEventListenerOptions, function () {
                let logs = [];
                button.addEventListener('click', function () {
                    logs.push('once click');
                }, { once: true, capture: true });
                button.addEventListener('click', function () {
                    logs.push('click');
                });
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(2);
                expect(logs).toEqual(['once click', 'click']);
                logs = [];
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(1);
                expect(logs).toEqual(['click']);
            }));
            it('should change options to boolean if not support passive', () => {
                (0, events_1.patchEventTarget)(window, null, [TestEventListener.prototype]);
                const testEventListener = new TestEventListener();
                const listener = function () { };
                testEventListener.addEventListener('test', listener, { passive: true });
                testEventListener.addEventListener('test1', listener, { once: true });
                testEventListener.addEventListener('test2', listener, { capture: true });
                testEventListener.addEventListener('test3', listener, { passive: false });
                testEventListener.addEventListener('test4', listener, { once: false });
                testEventListener.addEventListener('test5', listener, { capture: false });
                if (!supportsPassive) {
                    expect(testEventListener.logs).toEqual([false, false, true, false, false, false]);
                }
                else {
                    expect(testEventListener.logs).toEqual([
                        { passive: true },
                        { once: true },
                        { capture: true },
                        { passive: false },
                        { once: false },
                        { capture: false },
                    ]);
                }
            });
            it('should change options to boolean if not support passive on HTMLElement', () => {
                const logs = [];
                const listener = (e) => {
                    logs.push('clicked');
                };
                button.addEventListener('click', listener, { once: true });
                button.dispatchEvent(clickEvent);
                expect(logs).toEqual(['clicked']);
                button.dispatchEvent(clickEvent);
                if (supportsPassive) {
                    expect(logs).toEqual(['clicked']);
                }
                else {
                    expect(logs).toEqual(['clicked', 'clicked']);
                }
                button.removeEventListener('click', listener);
            });
            it('should support addEventListener with AddEventListenerOptions passive setting', (0, test_util_1.ifEnvSupports)(supportEventListenerOptions, function () {
                const hookSpy = jasmine.createSpy('hook');
                const logs = [];
                const zone = rootZone.fork({
                    name: 'spy',
                    onScheduleTask: (parentZoneDelegate, currentZone, targetZone, task) => {
                        hookSpy();
                        return parentZoneDelegate.scheduleTask(targetZone, task);
                    },
                });
                const listener = (e) => {
                    logs.push(e.defaultPrevented.toString());
                    e.preventDefault();
                    logs.push(e.defaultPrevented.toString());
                };
                zone.run(function () {
                    button.addEventListener('click', listener, { passive: true });
                });
                button.dispatchEvent(clickEvent);
                expect(hookSpy).toHaveBeenCalled();
                expect(logs).toEqual(['false', 'false']);
                button.removeEventListener('click', listener);
            }));
            describe('passiveEvents by global settings', () => {
                let logs = [];
                const listener = (e) => {
                    logs.push(e.defaultPrevented ? 'defaultPrevented' : 'default will run');
                    e.preventDefault();
                    logs.push(e.defaultPrevented ? 'defaultPrevented' : 'default will run');
                };
                const testPassive = function (eventName, expectedPassiveLog, options) {
                    button.addEventListener(eventName, listener, options);
                    const evt = document.createEvent('Event');
                    evt.initEvent(eventName, false, true);
                    button.dispatchEvent(evt);
                    expect(logs).toEqual(['default will run', expectedPassiveLog]);
                    button.removeAllListeners(eventName);
                };
                beforeEach(() => {
                    logs = [];
                    button.removeAllListeners();
                });
                afterEach(() => {
                    button.removeAllListeners();
                });
                it('should be passive with global variable defined', () => {
                    testPassive('touchstart', 'default will run', { passive: true });
                });
                it('should not be passive without global variable defined', () => {
                    testPassive('touchend', 'defaultPrevented', undefined);
                });
                it('should be passive with global variable defined even without passive options', () => {
                    testPassive('touchstart', 'default will run', undefined);
                });
                it('should be passive with global variable defined even without passive options and with capture', () => {
                    testPassive('touchstart', 'default will run', { capture: true });
                });
                it('should be passive with global variable defined with capture option', () => {
                    testPassive('touchstart', 'default will run', true);
                });
                it('should not be passive with global variable defined with passive false option', () => {
                    testPassive('touchstart', 'defaultPrevented', { passive: false });
                });
                it('should be passive with global variable defined and also unpatched', () => {
                    testPassive('scroll', 'default will run', undefined);
                });
                it('should not be passive without global variable defined and also unpatched', () => {
                    testPassive('wheel', 'defaultPrevented', undefined);
                });
            });
            it('should support Event.stopImmediatePropagation', (0, test_util_1.ifEnvSupports)(supportEventListenerOptions, function () {
                const hookSpy = jasmine.createSpy('hook');
                const logs = [];
                const zone = rootZone.fork({
                    name: 'spy',
                    onScheduleTask: (parentZoneDelegate, currentZone, targetZone, task) => {
                        hookSpy();
                        return parentZoneDelegate.scheduleTask(targetZone, task);
                    },
                });
                const listener1 = (e) => {
                    logs.push('listener1');
                    e.stopImmediatePropagation();
                };
                const listener2 = (e) => {
                    logs.push('listener2');
                };
                zone.run(function () {
                    button.addEventListener('click', listener1);
                    button.addEventListener('click', listener2);
                });
                button.dispatchEvent(clickEvent);
                expect(hookSpy).toHaveBeenCalled();
                expect(logs).toEqual(['listener1']);
                button.removeEventListener('click', listener1);
                button.removeEventListener('click', listener2);
            }));
            it('should support remove event listener by call zone.cancelTask directly', function () {
                let logs = [];
                let eventTask;
                const zone = rootZone.fork({
                    name: 'spy',
                    onScheduleTask: (parentZoneDelegate, currentZone, targetZone, task) => {
                        eventTask = task;
                        return parentZoneDelegate.scheduleTask(targetZone, task);
                    },
                });
                zone.run(() => {
                    button.addEventListener('click', function () {
                        logs.push('click');
                    });
                });
                let listeners = button.eventListeners('click');
                expect(listeners.length).toBe(1);
                eventTask.zone.cancelTask(eventTask);
                listeners = button.eventListeners('click');
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(0);
                expect(listeners.length).toBe(0);
            });
            it('should support remove event listener by call zone.cancelTask directly with capture=true', function () {
                let logs = [];
                let eventTask;
                const zone = rootZone.fork({
                    name: 'spy',
                    onScheduleTask: (parentZoneDelegate, currentZone, targetZone, task) => {
                        eventTask = task;
                        return parentZoneDelegate.scheduleTask(targetZone, task);
                    },
                });
                zone.run(() => {
                    button.addEventListener('click', function () {
                        logs.push('click');
                    }, true);
                });
                let listeners = button.eventListeners('click');
                expect(listeners.length).toBe(1);
                eventTask.zone.cancelTask(eventTask);
                listeners = button.eventListeners('click');
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(0);
                expect(listeners.length).toBe(0);
            });
            it('should support remove event listeners by call zone.cancelTask directly with multiple listeners', function () {
                let logs = [];
                let eventTask;
                const zone = rootZone.fork({
                    name: 'spy',
                    onScheduleTask: (parentZoneDelegate, currentZone, targetZone, task) => {
                        eventTask = task;
                        return parentZoneDelegate.scheduleTask(targetZone, task);
                    },
                });
                zone.run(() => {
                    button.addEventListener('click', function () {
                        logs.push('click1');
                    });
                });
                button.addEventListener('click', function () {
                    logs.push('click2');
                });
                let listeners = button.eventListeners('click');
                expect(listeners.length).toBe(2);
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(2);
                expect(logs).toEqual(['click1', 'click2']);
                eventTask.zone.cancelTask(eventTask);
                logs = [];
                listeners = button.eventListeners('click');
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(1);
                expect(listeners.length).toBe(1);
                expect(logs).toEqual(['click2']);
            });
            it('should support remove event listeners by call zone.cancelTask directly with multiple listeners with same capture=true', function () {
                let logs = [];
                let eventTask;
                const zone = rootZone.fork({
                    name: 'spy',
                    onScheduleTask: (parentZoneDelegate, currentZone, targetZone, task) => {
                        eventTask = task;
                        return parentZoneDelegate.scheduleTask(targetZone, task);
                    },
                });
                zone.run(() => {
                    button.addEventListener('click', function () {
                        logs.push('click1');
                    }, true);
                });
                button.addEventListener('click', function () {
                    logs.push('click2');
                }, true);
                let listeners = button.eventListeners('click');
                expect(listeners.length).toBe(2);
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(2);
                expect(logs).toEqual(['click1', 'click2']);
                eventTask.zone.cancelTask(eventTask);
                logs = [];
                listeners = button.eventListeners('click');
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(1);
                expect(listeners.length).toBe(1);
                expect(logs).toEqual(['click2']);
            });
            it('should support remove event listeners by call zone.cancelTask directly with multiple listeners with mixed capture', function () {
                let logs = [];
                let eventTask;
                const zone = rootZone.fork({
                    name: 'spy',
                    onScheduleTask: (parentZoneDelegate, currentZone, targetZone, task) => {
                        eventTask = task;
                        return parentZoneDelegate.scheduleTask(targetZone, task);
                    },
                });
                zone.run(() => {
                    button.addEventListener('click', function () {
                        logs.push('click1');
                    }, true);
                });
                button.addEventListener('click', function () {
                    logs.push('click2');
                });
                let listeners = button.eventListeners('click');
                expect(listeners.length).toBe(2);
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(2);
                expect(logs).toEqual(['click1', 'click2']);
                eventTask.zone.cancelTask(eventTask);
                logs = [];
                listeners = button.eventListeners('click');
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(1);
                expect(listeners.length).toBe(1);
                expect(logs).toEqual(['click2']);
            });
            it('should support remove event listeners via AbortController', function () {
                let logs = [];
                const ac = new AbortController();
                button.addEventListener('click', function () {
                    logs.push('click1');
                }, { signal: ac.signal });
                button.addEventListener('click', function () {
                    logs.push('click2');
                });
                button.addEventListener('click', function () {
                    logs.push('click3');
                }, { signal: ac.signal });
                let listeners = button.eventListeners('click');
                expect(listeners.length).toBe(3);
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(3);
                expect(logs).toEqual(['click1', 'click2', 'click3']);
                ac.abort();
                logs = [];
                listeners = button.eventListeners('click');
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(1);
                expect(listeners.length).toBe(1);
                expect(logs).toEqual(['click2']);
            });
            it('should support remove event listeners with AbortController', function () {
                let logs = [];
                const ac = new AbortController();
                const listener1 = function () {
                    logs.push('click1');
                };
                button.addEventListener('click', listener1, { signal: ac.signal });
                button.addEventListener('click', function () {
                    logs.push('click2');
                });
                let listeners = button.eventListeners('click');
                expect(listeners.length).toBe(2);
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(2);
                expect(logs).toEqual(['click1', 'click2']);
                ac.abort();
                listeners = button.eventListeners('click');
                expect(listeners.length).toBe(1);
                logs = [];
                listeners = button.eventListeners('click');
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(1);
                expect(listeners.length).toBe(1);
                expect(logs).toEqual(['click2']);
            });
            it('should not break remove event listeners with AbortController', function () {
                let logs = [];
                const ac = new AbortController();
                const listener1 = function () {
                    logs.push('click1');
                };
                button.addEventListener('click', listener1, { signal: ac.signal });
                button.addEventListener('click', function () {
                    logs.push('click2');
                });
                let listeners = button.eventListeners('click');
                expect(listeners.length).toBe(2);
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(2);
                expect(logs).toEqual(['click1', 'click2']);
                button.removeEventListener('click', listener1);
                listeners = button.eventListeners('click');
                expect(listeners.length).toBe(1);
                logs = [];
                listeners = button.eventListeners('click');
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(1);
                expect(listeners.length).toBe(1);
                expect(logs).toEqual(['click2']);
            });
            it('should support remove multiple event listeners with the same AbortController', function () {
                let logs = [];
                const ac = new AbortController();
                const button1 = document.createElement('button');
                const keyEvent = document.createEvent('KeyboardEvent');
                keyEvent.initKeyboardEvent('keypress', // typeArg,
                true, // canBubbleArg,
                true, // cancelableArg,
                null, // viewArg, Specifies UIEvent.view. This value may be null.
                '', 0, false, // ctrlKeyArg,
                false, // altKeyArg,
                false, // shiftKeyArg,
                false);
                document.body.appendChild(button1);
                const listener1 = function () {
                    logs.push('click1');
                };
                button.addEventListener('click', listener1, { signal: ac.signal });
                button.addEventListener('click', function () {
                    logs.push('click2');
                });
                button1.addEventListener('keypress', () => logs.push('click3'), { signal: ac.signal });
                button1.addEventListener('keypress', function () {
                    logs.push('click4');
                });
                let listeners = button.eventListeners('click');
                expect(listeners.length).toBe(2);
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(2);
                expect(logs).toEqual(['click1', 'click2']);
                button1.dispatchEvent(keyEvent);
                expect(logs.length).toBe(4);
                expect(logs).toEqual(['click1', 'click2', 'click3', 'click4']);
                logs = [];
                ac.abort();
                listeners = button.eventListeners('click');
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(1);
                expect(listeners.length).toBe(1);
                expect(logs).toEqual(['click2']);
                button1.dispatchEvent(keyEvent);
                expect(logs.length).toBe(2);
                expect(logs).toEqual(['click2', 'click4']);
            });
            // https://github.com/angular/angular/issues/54831
            // https://github.com/angular/angular/issues/54142
            it('should support passing `AbortController` directly to `addEventListener`', function () {
                let logs = [];
                const ac = new AbortController();
                button.addEventListener('click', function () {
                    logs.push('click1');
                }, ac);
                button.addEventListener('click', function () {
                    logs.push('click2');
                });
                button.addEventListener('click', function () {
                    logs.push('click3');
                }, ac);
                let listeners = button.eventListeners('click');
                expect(listeners.length).toBe(3);
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(3);
                expect(logs).toEqual(['click1', 'click2', 'click3']);
                ac.abort();
                logs = [];
                listeners = button.eventListeners('click');
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(1);
                expect(listeners.length).toBe(1);
                expect(logs).toEqual(['click2']);
            });
            // https://github.com/angular/angular/issues/56148
            it('should store the remove abort listener on the task itself and not the task data', function () {
                const logs = [];
                const ac = new AbortController();
                const onLoad = jasmine.createSpy();
                // Note that we have to manually spy on the `removeEventListener`
                // because zone.js calls the native `addEventListener` for an
                // `AbortSignal`, which isn't patched by zone.js. Thus, calling
                // `signal.eventListeners('abort')` would always return an empty list.
                const removeEventListenerSpy = spyOn(AbortSignal.prototype, 'removeEventListener').and.callThrough();
                window.addEventListener('load', onLoad, { once: true });
                button.addEventListener('click', function () {
                    logs.push('click');
                }, { signal: ac.signal });
                // In this scenario, we must dispatch the load event because
                // `{once:true}` options are provided. This action will remove
                // the event listener on the `window` after the task is executed,
                // effectively cancelling it. Previously, we encountered a regression
                // where `removeAbortListener` was stored on the task data instead of
                // the task itself. Consequently, it would remove the `abort` listener
                // from the signal. As a result, calling `abort()` on the controller wouldn't
                // cancel any events because there was no `abort` listener present.
                window.dispatchEvent(new Event('load'));
                expect(onLoad).toHaveBeenCalled();
                // Assert that the `abort` event listener has NOT been removed.
                expect(removeEventListenerSpy).toHaveBeenCalledTimes(0);
                // When calling abort, it should now remove the event listener
                // from the button, thus dispatching events should not trigger the listener.
                ac.abort();
                button.dispatchEvent(clickEvent);
                const listeners = button.eventListeners('click');
                expect(listeners.length).toBe(0);
                expect(logs).toEqual([]);
            });
            it('should not add event listeners with aborted signal', function () {
                let logs = [];
                button.addEventListener('click', function () {
                    logs.push('click1');
                }, { signal: AbortSignal.abort() });
                button.addEventListener('click', function () {
                    logs.push('click2');
                });
                let listeners = button.eventListeners('click');
                expect(listeners.length).toBe(1);
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(1);
                expect(logs).toEqual(['click2']);
            });
            it('should remove event listeners with timeout signal', (0, test_util_1.ifEnvSupportsWithDone)(() => typeof AbortSignal.timeout === 'function', function (done) {
                let logs = [];
                button.addEventListener('click', function () {
                    logs.push('click1');
                }, { signal: AbortSignal.timeout(1) });
                button.addEventListener('click', function () {
                    logs.push('click2');
                });
                let listeners = button.eventListeners('click');
                expect(listeners.length).toBe(2);
                button.dispatchEvent(clickEvent);
                expect(logs.length).toBe(2);
                expect(logs).toEqual(['click1', 'click2']);
                setTimeout(() => {
                    logs = [];
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(1);
                    expect(logs).toEqual(['click2']);
                    done();
                }, 10);
            }));
            it('should support reschedule eventTask', (0, test_util_1.ifEnvSupports)(supportEventListenerOptions, function () {
                let hookSpy1 = jasmine.createSpy('spy1');
                let hookSpy2 = jasmine.createSpy('spy2');
                let hookSpy3 = jasmine.createSpy('spy3');
                let logs = [];
                const isUnpatchedEvent = function (source) {
                    return source.lastIndexOf('click') !== -1;
                };
                const zone1 = Zone.current.fork({
                    name: 'zone1',
                    onScheduleTask: (parentZoneDelegate, currentZone, targetZone, task) => {
                        if ((task.type === 'eventTask' || task.type === 'macroTask') &&
                            isUnpatchedEvent(task.source)) {
                            task.cancelScheduleRequest();
                            return zone2.scheduleTask(task);
                        }
                        else {
                            return parentZoneDelegate.scheduleTask(targetZone, task);
                        }
                    },
                    onInvokeTask(parentZoneDelegate, currentZone, targetZone, task, applyThis, applyArgs) {
                        hookSpy1();
                        return parentZoneDelegate.invokeTask(targetZone, task, applyThis, applyArgs);
                    },
                });
                const zone2 = Zone.current.fork({
                    name: 'zone2',
                    onScheduleTask: (parentZoneDelegate, currentZone, targetZone, task) => {
                        hookSpy2();
                        return parentZoneDelegate.scheduleTask(targetZone, task);
                    },
                    onInvokeTask(parentZoneDelegate, currentZone, targetZone, task, applyThis, applyArgs) {
                        hookSpy3();
                        return parentZoneDelegate.invokeTask(targetZone, task, applyThis, applyArgs);
                    },
                });
                const listener = function () {
                    logs.push(Zone.current.name);
                };
                zone1.run(() => {
                    button.addEventListener('click', listener);
                    button.addEventListener('mouseover', listener);
                });
                const clickEvent = document.createEvent('Event');
                clickEvent.initEvent('click', true, true);
                const mouseEvent = document.createEvent('Event');
                mouseEvent.initEvent('mouseover', true, true);
                button.dispatchEvent(clickEvent);
                button.removeEventListener('click', listener);
                expect(logs).toEqual(['zone2']);
                expect(hookSpy1).not.toHaveBeenCalled();
                expect(hookSpy2).toHaveBeenCalled();
                expect(hookSpy3).toHaveBeenCalled();
                logs = [];
                hookSpy2 = jasmine.createSpy('hookSpy2');
                hookSpy3 = jasmine.createSpy('hookSpy3');
                button.dispatchEvent(mouseEvent);
                button.removeEventListener('mouseover', listener);
                expect(logs).toEqual(['zone1']);
                expect(hookSpy1).toHaveBeenCalled();
                expect(hookSpy2).not.toHaveBeenCalled();
                expect(hookSpy3).not.toHaveBeenCalled();
            }));
            it('should support inline event handler attributes', function () {
                const hookSpy = jasmine.createSpy('hook');
                const zone = rootZone.fork({
                    name: 'spy',
                    onScheduleTask: (parentZoneDelegate, currentZone, targetZone, task) => {
                        hookSpy();
                        return parentZoneDelegate.scheduleTask(targetZone, task);
                    },
                });
                zone.run(function () {
                    button.setAttribute('onclick', 'return');
                    expect(button.onclick).not.toBe(null);
                });
            });
            it('should not remove onEventListener when removing capture listener', function () {
                const button = document.createElement('button');
                document.body.append(button);
                const createEvt = () => {
                    const evt = document.createEvent('Event');
                    evt.initEvent('click', true, true);
                    return evt;
                };
                let logs = [];
                const onClickHandler = () => logs.push('onclick');
                button.onclick = onClickHandler;
                let evt = createEvt();
                button.dispatchEvent(evt);
                expect(logs).toEqual(['onclick']);
                logs = [];
                const listener = () => logs.push('click listener');
                button.addEventListener('click', listener, { capture: true });
                evt = createEvt();
                button.dispatchEvent(evt);
                expect(logs.sort()).toEqual(['onclick', 'click listener'].sort());
                logs = [];
                button.removeEventListener('click', listener, true);
                evt = createEvt();
                button.dispatchEvent(evt);
                expect(logs).toEqual(['onclick']);
                expect(button.onclick).toBe(onClickHandler);
                button.onclick = null;
                logs = [];
                evt = createEvt();
                button.dispatchEvent(evt);
                expect(logs).toEqual([]);
                expect(button.onclick).toBe(null);
                document.body.removeChild(button);
            });
            describe('should be able to remove eventListener during eventListener callback', function () {
                it('should be able to remove eventListener during eventListener callback', function () {
                    let logs = [];
                    const listener1 = function () {
                        button.removeEventListener('click', listener1);
                        logs.push('listener1');
                    };
                    const listener2 = function () {
                        logs.push('listener2');
                    };
                    const listener3 = {
                        handleEvent: function (event) {
                            logs.push('listener3');
                        },
                    };
                    button.addEventListener('click', listener1);
                    button.addEventListener('click', listener2);
                    button.addEventListener('click', listener3);
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(3);
                    expect(logs).toEqual(['listener1', 'listener2', 'listener3']);
                    logs = [];
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(2);
                    expect(logs).toEqual(['listener2', 'listener3']);
                    button.removeEventListener('click', listener2);
                    button.removeEventListener('click', listener3);
                });
                it('should be able to remove eventListener during eventListener callback with capture=true', function () {
                    let logs = [];
                    const listener1 = function () {
                        button.removeEventListener('click', listener1, true);
                        logs.push('listener1');
                    };
                    const listener2 = function () {
                        logs.push('listener2');
                    };
                    const listener3 = {
                        handleEvent: function (event) {
                            logs.push('listener3');
                        },
                    };
                    button.addEventListener('click', listener1, true);
                    button.addEventListener('click', listener2, true);
                    button.addEventListener('click', listener3, true);
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(3);
                    expect(logs).toEqual(['listener1', 'listener2', 'listener3']);
                    logs = [];
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(2);
                    expect(logs).toEqual(['listener2', 'listener3']);
                    button.removeEventListener('click', listener2, true);
                    button.removeEventListener('click', listener3, true);
                });
                it('should be able to remove handleEvent eventListener during eventListener callback', function () {
                    let logs = [];
                    const listener1 = function () {
                        logs.push('listener1');
                    };
                    const listener2 = function () {
                        logs.push('listener2');
                    };
                    const listener3 = {
                        handleEvent: function (event) {
                            logs.push('listener3');
                            button.removeEventListener('click', listener3);
                        },
                    };
                    button.addEventListener('click', listener1);
                    button.addEventListener('click', listener2);
                    button.addEventListener('click', listener3);
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(3);
                    expect(logs).toEqual(['listener1', 'listener2', 'listener3']);
                    logs = [];
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(2);
                    expect(logs).toEqual(['listener1', 'listener2']);
                    button.removeEventListener('click', listener1);
                    button.removeEventListener('click', listener2);
                });
                it('should be able to remove handleEvent eventListener during eventListener callback with capture=true', function () {
                    let logs = [];
                    const listener1 = function () {
                        logs.push('listener1');
                    };
                    const listener2 = function () {
                        logs.push('listener2');
                    };
                    const listener3 = {
                        handleEvent: function (event) {
                            logs.push('listener3');
                            button.removeEventListener('click', listener3, true);
                        },
                    };
                    button.addEventListener('click', listener1, true);
                    button.addEventListener('click', listener2, true);
                    button.addEventListener('click', listener3, true);
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(3);
                    expect(logs).toEqual(['listener1', 'listener2', 'listener3']);
                    logs = [];
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(2);
                    expect(logs).toEqual(['listener1', 'listener2']);
                    button.removeEventListener('click', listener1, true);
                    button.removeEventListener('click', listener2, true);
                });
                it('should be able to remove multiple eventListeners during eventListener callback', function () {
                    let logs = [];
                    const listener1 = function () {
                        logs.push('listener1');
                        button.removeEventListener('click', listener2);
                        button.removeEventListener('click', listener3);
                    };
                    const listener2 = function () {
                        logs.push('listener2');
                    };
                    const listener3 = {
                        handleEvent: function (event) {
                            logs.push('listener3');
                        },
                    };
                    button.addEventListener('click', listener1);
                    button.addEventListener('click', listener2);
                    button.addEventListener('click', listener3);
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(1);
                    expect(logs).toEqual(['listener1']);
                    button.removeEventListener('click', listener1);
                });
                it('should be able to remove multiple eventListeners during eventListener callback with capture=true', function () {
                    let logs = [];
                    const listener1 = function () {
                        logs.push('listener1');
                        button.removeEventListener('click', listener2, true);
                        button.removeEventListener('click', listener3, true);
                    };
                    const listener2 = function () {
                        logs.push('listener2');
                    };
                    const listener3 = {
                        handleEvent: function (event) {
                            logs.push('listener3');
                        },
                    };
                    button.addEventListener('click', listener1, true);
                    button.addEventListener('click', listener2, true);
                    button.addEventListener('click', listener3, true);
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(1);
                    expect(logs).toEqual(['listener1']);
                    button.removeEventListener('click', listener1, true);
                });
                it('should be able to remove part of other eventListener during eventListener callback', function () {
                    let logs = [];
                    const listener1 = function () {
                        logs.push('listener1');
                        button.removeEventListener('click', listener2);
                    };
                    const listener2 = function () {
                        logs.push('listener2');
                    };
                    const listener3 = {
                        handleEvent: function (event) {
                            logs.push('listener3');
                        },
                    };
                    button.addEventListener('click', listener1);
                    button.addEventListener('click', listener2);
                    button.addEventListener('click', listener3);
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(2);
                    expect(logs).toEqual(['listener1', 'listener3']);
                    button.removeEventListener('click', listener1);
                    button.removeEventListener('click', listener3);
                });
                it('should be able to remove part of other eventListener during eventListener callback with capture=true', function () {
                    let logs = [];
                    const listener1 = function () {
                        logs.push('listener1');
                        button.removeEventListener('click', listener2, true);
                    };
                    const listener2 = function () {
                        logs.push('listener2');
                    };
                    const listener3 = {
                        handleEvent: function (event) {
                            logs.push('listener3');
                        },
                    };
                    button.addEventListener('click', listener1, true);
                    button.addEventListener('click', listener2, true);
                    button.addEventListener('click', listener3, true);
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(2);
                    expect(logs).toEqual(['listener1', 'listener3']);
                    button.removeEventListener('click', listener1, true);
                    button.removeEventListener('click', listener3, true);
                });
                it('should be able to remove all beforeward and afterward eventListener during eventListener callback', function () {
                    let logs = [];
                    const listener1 = function () {
                        logs.push('listener1');
                    };
                    const listener2 = function () {
                        logs.push('listener2');
                        button.removeEventListener('click', listener1);
                        button.removeEventListener('click', listener3);
                    };
                    const listener3 = {
                        handleEvent: function (event) {
                            logs.push('listener3');
                        },
                    };
                    button.addEventListener('click', listener1);
                    button.addEventListener('click', listener2);
                    button.addEventListener('click', listener3);
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(2);
                    expect(logs).toEqual(['listener1', 'listener2']);
                    logs = [];
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(1);
                    expect(logs).toEqual(['listener2']);
                    button.removeEventListener('click', listener2);
                });
                it('should be able to remove all beforeward and afterward eventListener during eventListener callback with capture=true', function () {
                    let logs = [];
                    const listener1 = function () {
                        logs.push('listener1');
                    };
                    const listener2 = function () {
                        logs.push('listener2');
                        button.removeEventListener('click', listener1, true);
                        button.removeEventListener('click', listener3, true);
                    };
                    const listener3 = {
                        handleEvent: function (event) {
                            logs.push('listener3');
                        },
                    };
                    button.addEventListener('click', listener1, true);
                    button.addEventListener('click', listener2, true);
                    button.addEventListener('click', listener3, true);
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(2);
                    expect(logs).toEqual(['listener1', 'listener2']);
                    logs = [];
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(1);
                    expect(logs).toEqual(['listener2']);
                    button.removeEventListener('click', listener2, true);
                });
                it('should be able to remove part of beforeward and afterward eventListener during eventListener callback', function () {
                    let logs = [];
                    const listener1 = function () {
                        logs.push('listener1');
                    };
                    const listener2 = function () {
                        logs.push('listener2');
                    };
                    const listener3 = {
                        handleEvent: function (event) {
                            logs.push('listener3');
                            button.removeEventListener('click', listener2);
                            button.removeEventListener('click', listener4);
                        },
                    };
                    const listener4 = function () {
                        logs.push('listener4');
                    };
                    const listener5 = function () {
                        logs.push('listener5');
                    };
                    button.addEventListener('click', listener1);
                    button.addEventListener('click', listener2);
                    button.addEventListener('click', listener3);
                    button.addEventListener('click', listener4);
                    button.addEventListener('click', listener5);
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(4);
                    expect(logs).toEqual(['listener1', 'listener2', 'listener3', 'listener5']);
                    logs = [];
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(3);
                    expect(logs).toEqual(['listener1', 'listener3', 'listener5']);
                    button.removeEventListener('click', listener1);
                    button.removeEventListener('click', listener3);
                    button.removeEventListener('click', listener5);
                });
                it('should be able to remove part of beforeward and afterward eventListener during eventListener callback with capture=true', function () {
                    let logs = [];
                    const listener1 = function () {
                        logs.push('listener1');
                    };
                    const listener2 = function () {
                        logs.push('listener2');
                    };
                    const listener3 = {
                        handleEvent: function (event) {
                            logs.push('listener3');
                            button.removeEventListener('click', listener2, true);
                            button.removeEventListener('click', listener4, true);
                        },
                    };
                    const listener4 = function () {
                        logs.push('listener4');
                    };
                    const listener5 = function () {
                        logs.push('listener5');
                    };
                    button.addEventListener('click', listener1, true);
                    button.addEventListener('click', listener2, true);
                    button.addEventListener('click', listener3, true);
                    button.addEventListener('click', listener4, true);
                    button.addEventListener('click', listener5, true);
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(4);
                    expect(logs).toEqual(['listener1', 'listener2', 'listener3', 'listener5']);
                    logs = [];
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(3);
                    expect(logs).toEqual(['listener1', 'listener3', 'listener5']);
                    button.removeEventListener('click', listener1, true);
                    button.removeEventListener('click', listener3, true);
                    button.removeEventListener('click', listener5, true);
                });
                it('should be able to remove all beforeward eventListener during eventListener callback', function () {
                    let logs = [];
                    const listener1 = function () {
                        logs.push('listener1');
                    };
                    const listener2 = function () {
                        logs.push('listener2');
                    };
                    const listener3 = {
                        handleEvent: function (event) {
                            logs.push('listener3');
                            button.removeEventListener('click', listener1);
                            button.removeEventListener('click', listener2);
                        },
                    };
                    button.addEventListener('click', listener1);
                    button.addEventListener('click', listener2);
                    button.addEventListener('click', listener3);
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(3);
                    expect(logs).toEqual(['listener1', 'listener2', 'listener3']);
                    logs = [];
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(1);
                    expect(logs).toEqual(['listener3']);
                    button.removeEventListener('click', listener3);
                });
                it('should be able to remove all beforeward eventListener during eventListener callback with capture=true', function () {
                    let logs = [];
                    const listener1 = function () {
                        logs.push('listener1');
                    };
                    const listener2 = function () {
                        logs.push('listener2');
                    };
                    const listener3 = {
                        handleEvent: function (event) {
                            logs.push('listener3');
                            button.removeEventListener('click', listener1, true);
                            button.removeEventListener('click', listener2, true);
                        },
                    };
                    button.addEventListener('click', listener1, true);
                    button.addEventListener('click', listener2, true);
                    button.addEventListener('click', listener3, true);
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(3);
                    expect(logs).toEqual(['listener1', 'listener2', 'listener3']);
                    logs = [];
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(1);
                    expect(logs).toEqual(['listener3']);
                    button.removeEventListener('click', listener3, true);
                });
                it('should be able to remove part of beforeward eventListener during eventListener callback', function () {
                    let logs = [];
                    const listener1 = function () {
                        logs.push('listener1');
                    };
                    const listener2 = function () {
                        logs.push('listener2');
                    };
                    const listener3 = {
                        handleEvent: function (event) {
                            logs.push('listener3');
                            button.removeEventListener('click', listener1);
                        },
                    };
                    button.addEventListener('click', listener1);
                    button.addEventListener('click', listener2);
                    button.addEventListener('click', listener3);
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(3);
                    expect(logs).toEqual(['listener1', 'listener2', 'listener3']);
                    logs = [];
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(2);
                    expect(logs).toEqual(['listener2', 'listener3']);
                    button.removeEventListener('click', listener2);
                    button.removeEventListener('click', listener3);
                });
                it('should be able to remove part of beforeward eventListener during eventListener callback with capture=true', function () {
                    let logs = [];
                    const listener1 = function () {
                        logs.push('listener1');
                    };
                    const listener2 = function () {
                        logs.push('listener2');
                    };
                    const listener3 = {
                        handleEvent: function (event) {
                            logs.push('listener3');
                            button.removeEventListener('click', listener1, true);
                        },
                    };
                    button.addEventListener('click', listener1, true);
                    button.addEventListener('click', listener2, true);
                    button.addEventListener('click', listener3, true);
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(3);
                    expect(logs).toEqual(['listener1', 'listener2', 'listener3']);
                    logs = [];
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(2);
                    expect(logs).toEqual(['listener2', 'listener3']);
                    button.removeEventListener('click', listener2, true);
                    button.removeEventListener('click', listener3, true);
                });
                it('should be able to remove all eventListeners during first eventListener callback', function () {
                    let logs = [];
                    const listener1 = function () {
                        button.removeAllListeners('click');
                        logs.push('listener1');
                    };
                    const listener2 = function () {
                        logs.push('listener2');
                    };
                    const listener3 = {
                        handleEvent: function (event) {
                            logs.push('listener3');
                        },
                    };
                    button.addEventListener('click', listener1);
                    button.addEventListener('click', listener2);
                    button.addEventListener('click', listener3);
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(1);
                    expect(logs).toEqual(['listener1']);
                    logs = [];
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(0);
                });
                it('should be able to remove all eventListeners during first eventListener callback with capture=true', function () {
                    let logs = [];
                    const listener1 = function () {
                        button.removeAllListeners('click');
                        logs.push('listener1');
                    };
                    const listener2 = function () {
                        logs.push('listener2');
                    };
                    const listener3 = {
                        handleEvent: function (event) {
                            logs.push('listener3');
                        },
                    };
                    button.addEventListener('click', listener1, true);
                    button.addEventListener('click', listener2, true);
                    button.addEventListener('click', listener3, true);
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(1);
                    expect(logs).toEqual(['listener1']);
                    logs = [];
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(0);
                });
                it('should be able to remove all eventListeners during middle eventListener callback', function () {
                    let logs = [];
                    const listener1 = function () {
                        logs.push('listener1');
                    };
                    const listener2 = function () {
                        button.removeAllListeners('click');
                        logs.push('listener2');
                    };
                    const listener3 = {
                        handleEvent: function (event) {
                            logs.push('listener3');
                        },
                    };
                    button.addEventListener('click', listener1);
                    button.addEventListener('click', listener2);
                    button.addEventListener('click', listener3);
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(2);
                    expect(logs).toEqual(['listener1', 'listener2']);
                    logs = [];
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(0);
                });
                it('should be able to remove all eventListeners during middle eventListener callback with capture=true', function () {
                    let logs = [];
                    const listener1 = function () {
                        logs.push('listener1');
                    };
                    const listener2 = function () {
                        button.removeAllListeners('click');
                        logs.push('listener2');
                    };
                    const listener3 = {
                        handleEvent: function (event) {
                            logs.push('listener3');
                        },
                    };
                    button.addEventListener('click', listener1, true);
                    button.addEventListener('click', listener2, true);
                    button.addEventListener('click', listener3, true);
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(2);
                    expect(logs).toEqual(['listener1', 'listener2']);
                    logs = [];
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(0);
                });
                it('should be able to remove all eventListeners during last eventListener callback', function () {
                    let logs = [];
                    const listener1 = function () {
                        logs.push('listener1');
                    };
                    const listener2 = function () {
                        logs.push('listener2');
                    };
                    const listener3 = {
                        handleEvent: function (event) {
                            logs.push('listener3');
                            button.removeAllListeners('click');
                        },
                    };
                    button.addEventListener('click', listener1);
                    button.addEventListener('click', listener2);
                    button.addEventListener('click', listener3);
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(3);
                    expect(logs).toEqual(['listener1', 'listener2', 'listener3']);
                    logs = [];
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(0);
                });
                it('should be able to remove all eventListeners during last eventListener callback with capture=true', function () {
                    let logs = [];
                    const listener1 = function () {
                        logs.push('listener1');
                    };
                    const listener2 = function () {
                        logs.push('listener2');
                    };
                    const listener3 = {
                        handleEvent: function (event) {
                            logs.push('listener3');
                            button.removeAllListeners('click');
                        },
                    };
                    button.addEventListener('click', listener1, true);
                    button.addEventListener('click', listener2, true);
                    button.addEventListener('click', listener3, true);
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(3);
                    expect(logs).toEqual(['listener1', 'listener2', 'listener3']);
                    logs = [];
                    button.dispatchEvent(clickEvent);
                    expect(logs.length).toBe(0);
                });
            });
            it('should be able to get eventListeners of specified event form EventTarget', function () {
                const listener1 = function () { };
                const listener2 = function () { };
                const listener3 = { handleEvent: function (event) { } };
                const listener4 = function () { };
                button.addEventListener('click', listener1);
                button.addEventListener('click', listener2);
                button.addEventListener('click', listener3);
                button.addEventListener('mouseover', listener4);
                const listeners = button.eventListeners('click');
                expect(listeners.length).toBe(3);
                expect(listeners).toEqual([listener1, listener2, listener3]);
                button.removeEventListener('click', listener1);
                button.removeEventListener('click', listener2);
                button.removeEventListener('click', listener3);
            });
            it('should be able to get all eventListeners form EventTarget without eventName', function () {
                const listener1 = function () { };
                const listener2 = function () { };
                const listener3 = { handleEvent: function (event) { } };
                button.addEventListener('click', listener1);
                button.addEventListener('mouseover', listener2);
                button.addEventListener('mousehover', listener3);
                const listeners = button.eventListeners();
                expect(listeners.length).toBe(3);
                expect(listeners).toEqual([listener1, listener2, listener3]);
                button.removeEventListener('click', listener1);
                button.removeEventListener('mouseover', listener2);
                button.removeEventListener('mousehover', listener3);
            });
            it('should be able to remove all listeners of specified event form EventTarget', function () {
                let logs = [];
                const listener1 = function () {
                    logs.push('listener1');
                };
                const listener2 = function () {
                    logs.push('listener2');
                };
                const listener3 = {
                    handleEvent: function (event) {
                        logs.push('listener3');
                    },
                };
                const listener4 = function () {
                    logs.push('listener4');
                };
                const listener5 = function () {
                    logs.push('listener5');
                };
                button.addEventListener('mouseover', listener1);
                button.addEventListener('mouseover', listener2);
                button.addEventListener('mouseover', listener3);
                button.addEventListener('click', listener4);
                button.onmouseover = listener5;
                expect(button[Zone.__symbol__('ON_PROPERTYmouseover')]).toEqual(listener5);
                button.removeAllListeners('mouseover');
                const listeners = button.eventListeners('mouseover');
                expect(listeners.length).toBe(0);
                expect(button[Zone.__symbol__('ON_PROPERTYmouseover')]).toBeNull();
                expect(!!button.onmouseover).toBeFalsy();
                const mouseEvent = document.createEvent('Event');
                mouseEvent.initEvent('mouseover', true, true);
                button.dispatchEvent(mouseEvent);
                expect(logs).toEqual([]);
                button.dispatchEvent(clickEvent);
                expect(logs).toEqual(['listener4']);
                button.removeEventListener('click', listener4);
            });
            it('should be able to remove all listeners of specified event form EventTarget with capture=true', function () {
                let logs = [];
                const listener1 = function () {
                    logs.push('listener1');
                };
                const listener2 = function () {
                    logs.push('listener2');
                };
                const listener3 = {
                    handleEvent: function (event) {
                        logs.push('listener3');
                    },
                };
                const listener4 = function () {
                    logs.push('listener4');
                };
                button.addEventListener('mouseover', listener1, true);
                button.addEventListener('mouseover', listener2, true);
                button.addEventListener('mouseover', listener3, true);
                button.addEventListener('click', listener4, true);
                button.removeAllListeners('mouseover');
                const listeners = button.eventListeners('mouseover');
                expect(listeners.length).toBe(0);
                const mouseEvent = document.createEvent('Event');
                mouseEvent.initEvent('mouseover', true, true);
                button.dispatchEvent(mouseEvent);
                expect(logs).toEqual([]);
                button.dispatchEvent(clickEvent);
                expect(logs).toEqual(['listener4']);
                button.removeEventListener('click', listener4);
            });
            it('should be able to remove all listeners of specified event form EventTarget with mixed capture', function () {
                let logs = [];
                const listener1 = function () {
                    logs.push('listener1');
                };
                const listener2 = function () {
                    logs.push('listener2');
                };
                const listener3 = {
                    handleEvent: function (event) {
                        logs.push('listener3');
                    },
                };
                const listener4 = function () {
                    logs.push('listener4');
                };
                button.addEventListener('mouseover', listener1, true);
                button.addEventListener('mouseover', listener2, false);
                button.addEventListener('mouseover', listener3, true);
                button.addEventListener('click', listener4, true);
                button.removeAllListeners('mouseover');
                const listeners = button.eventListeners('mouseover');
                expect(listeners.length).toBe(0);
                const mouseEvent = document.createEvent('Event');
                mouseEvent.initEvent('mouseover', true, true);
                button.dispatchEvent(mouseEvent);
                expect(logs).toEqual([]);
                button.dispatchEvent(clickEvent);
                expect(logs).toEqual(['listener4']);
                button.removeEventListener('click', listener4);
            });
            it('should be able to remove all listeners of all events form EventTarget', function () {
                let logs = [];
                const listener1 = function () {
                    logs.push('listener1');
                };
                const listener2 = function () {
                    logs.push('listener2');
                };
                const listener3 = {
                    handleEvent: function (event) {
                        logs.push('listener3');
                    },
                };
                const listener4 = function () {
                    logs.push('listener4');
                };
                const listener5 = function () {
                    logs.push('listener5');
                };
                button.addEventListener('mouseover', listener1);
                button.addEventListener('mouseover', listener2);
                button.addEventListener('mouseover', listener3);
                button.addEventListener('click', listener4);
                button.onmouseover = listener5;
                expect(button[Zone.__symbol__('ON_PROPERTYmouseover')]).toEqual(listener5);
                button.removeAllListeners();
                const listeners = button.eventListeners('mouseover');
                expect(listeners.length).toBe(0);
                expect(button[Zone.__symbol__('ON_PROPERTYmouseover')]).toBeNull();
                expect(!!button.onmouseover).toBeFalsy();
                const mouseEvent = document.createEvent('Event');
                mouseEvent.initEvent('mouseover', true, true);
                button.dispatchEvent(mouseEvent);
                expect(logs).toEqual([]);
                button.dispatchEvent(clickEvent);
                expect(logs).toEqual([]);
            });
            it('should be able to remove listener which was added outside of zone ', function () {
                let logs = [];
                const listener1 = function () {
                    logs.push('listener1');
                };
                const listener2 = function () {
                    logs.push('listener2');
                };
                const listener3 = {
                    handleEvent: function (event) {
                        logs.push('listener3');
                    },
                };
                const listener4 = function () {
                    logs.push('listener4');
                };
                button.addEventListener('mouseover', listener1);
                button[Zone.__symbol__('addEventListener')]('mouseover', listener2);
                button.addEventListener('click', listener3);
                button[Zone.__symbol__('addEventListener')]('click', listener4);
                button.removeEventListener('mouseover', listener1);
                button.removeEventListener('mouseover', listener2);
                button.removeEventListener('click', listener3);
                button.removeEventListener('click', listener4);
                const listeners = button.eventListeners('mouseover');
                expect(listeners.length).toBe(0);
                const mouseEvent = document.createEvent('Event');
                mouseEvent.initEvent('mouseover', true, true);
                button.dispatchEvent(mouseEvent);
                expect(logs).toEqual([]);
                button.dispatchEvent(clickEvent);
                expect(logs).toEqual([]);
            });
            it('should be able to remove all listeners which were added inside of zone ', function () {
                let logs = [];
                const listener1 = function () {
                    logs.push('listener1');
                };
                const listener2 = function () {
                    logs.push('listener2');
                };
                const listener3 = {
                    handleEvent: function (event) {
                        logs.push('listener3');
                    },
                };
                const listener4 = function () {
                    logs.push('listener4');
                };
                button.addEventListener('mouseover', listener1);
                button[Zone.__symbol__('addEventListener')]('mouseover', listener2);
                button.addEventListener('click', listener3);
                button[Zone.__symbol__('addEventListener')]('click', listener4);
                button.removeAllListeners();
                const listeners = button.eventListeners('mouseover');
                expect(listeners.length).toBe(0);
                const mouseEvent = document.createEvent('Event');
                mouseEvent.initEvent('mouseover', true, true);
                button.dispatchEvent(mouseEvent);
                expect(logs).toEqual(['listener2']);
                button.dispatchEvent(clickEvent);
                expect(logs).toEqual(['listener2', 'listener4']);
            });
            it('should bypass addEventListener of FunctionWrapper and __BROWSERTOOLS_CONSOLE_SAFEFUNC of IE/Edge', (0, test_util_1.ifEnvSupports)(ieOrEdge, function () {
                const hookSpy = jasmine.createSpy('hook');
                const zone = rootZone.fork({
                    name: 'spy',
                    onScheduleTask: (parentZoneDelegate, currentZone, targetZone, task) => {
                        hookSpy();
                        return parentZoneDelegate.scheduleTask(targetZone, task);
                    },
                });
                let logs = [];
                const listener1 = function () {
                    logs.push(Zone.current.name);
                };
                listener1.toString = function () {
                    return '[object FunctionWrapper]';
                };
                const listener2 = function () {
                    logs.push(Zone.current.name);
                };
                listener2.toString = function () {
                    return 'function __BROWSERTOOLS_CONSOLE_SAFEFUNC() { [native code] }';
                };
                zone.run(() => {
                    button.addEventListener('click', listener1);
                    button.addEventListener('click', listener2);
                });
                button.dispatchEvent(clickEvent);
                expect(hookSpy).not.toHaveBeenCalled();
                expect(logs).toEqual(['ProxyZone', 'ProxyZone']);
                logs = [];
                button.removeEventListener('click', listener1);
                button.removeEventListener('click', listener2);
                button.dispatchEvent(clickEvent);
                expect(hookSpy).not.toHaveBeenCalled();
                expect(logs).toEqual([]);
            }));
            xit('should re-throw the error when the only listener throw error', function (done) {
                // override global.onerror to prevent jasmine report error
                let oriWindowOnError = window.onerror;
                let logs = [];
                window.onerror = function (err) {
                    logs.push(err);
                };
                try {
                    const listener1 = function () {
                        throw new Error('test1');
                    };
                    button.addEventListener('click', listener1);
                    const mouseEvent = document.createEvent('MouseEvent');
                    mouseEvent.initEvent('click', true, true);
                    const unhandledRejection = (e) => {
                        fail('should not be here');
                    };
                    window.addEventListener('unhandledrejection', unhandledRejection);
                    button.dispatchEvent(mouseEvent);
                    expect(logs).toEqual(['Uncaught Error: test1']);
                    setTimeout(() => {
                        expect(logs).toEqual(['Uncaught Error: test1']);
                        window.removeEventListener('unhandledrejection', unhandledRejection);
                        window.onerror = oriWindowOnError;
                        done();
                    });
                }
                catch (e) {
                    window.onerror = oriWindowOnError;
                }
            });
            xit('should not re-throw the error when zone onHandleError handled the error and the only listener throw error', function (done) {
                // override global.onerror to prevent jasmine report error
                let oriWindowOnError = window.onerror;
                window.onerror = function () { };
                try {
                    let logs = [];
                    const listener1 = function () {
                        throw new Error('test1');
                    };
                    const zone = Zone.current.fork({
                        name: 'error',
                        onHandleError: (delegate, curr, target, error) => {
                            logs.push('zone handled ' + target.name + ' ' + error.message);
                            return false;
                        },
                    });
                    zone.runGuarded(() => {
                        button.addEventListener('click', listener1);
                    });
                    const mouseEvent = document.createEvent('MouseEvent');
                    mouseEvent.initEvent('click', true, true);
                    const unhandledRejection = (e) => {
                        logs.push(e.reason.message);
                    };
                    window.addEventListener('unhandledrejection', unhandledRejection);
                    button.dispatchEvent(mouseEvent);
                    expect(logs).toEqual(['zone handled error test1']);
                    setTimeout(() => {
                        expect(logs).toEqual(['zone handled error test1']);
                        window.removeEventListener('unhandledrejection', unhandledRejection);
                        window.onerror = oriWindowOnError;
                        done();
                    });
                }
                catch (e) {
                    window.onerror = oriWindowOnError;
                }
            });
            xit('should be able to continue to invoke remaining listeners even some listener throw error', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield jasmine.spyOnGlobalErrorsAsync((globalErrorSpy) => __awaiter(this, void 0, void 0, function* () {
                        let logs = [];
                        const listener1 = function () {
                            logs.push('listener1');
                        };
                        const listener2 = function () {
                            throw new Error('test1');
                        };
                        const listener3 = function () {
                            throw new Error('test2');
                        };
                        const listener4 = {
                            handleEvent: function () {
                                logs.push('listener2');
                            },
                        };
                        button.addEventListener('click', listener1);
                        button.addEventListener('click', listener2);
                        button.addEventListener('click', listener3);
                        button.addEventListener('click', listener4);
                        const mouseEvent = document.createEvent('MouseEvent');
                        mouseEvent.initEvent('click', true, true);
                        button.dispatchEvent(mouseEvent);
                        expect(logs).toEqual(['listener1', 'listener2']);
                    }));
                });
            });
            xit('should be able to continue to invoke remaining listeners even some listener throw error with onHandleError zone', function (done) {
                // override global.onerror to prevent jasmine report error
                try {
                    const zone = Zone.current.fork({
                        name: 'error',
                        onHandleError: (delegate, curr, target, error) => {
                            logs.push('zone handled ' + target.name + ' ' + error.message);
                            return false;
                        },
                    });
                    let logs = [];
                    const listener1 = function () {
                        logs.push('listener1');
                    };
                    const listener2 = function () {
                        throw new Error('test1');
                    };
                    const listener3 = function () {
                        throw new Error('test2');
                    };
                    const listener4 = {
                        handleEvent: function () {
                            logs.push('listener2');
                        },
                    };
                    zone.runGuarded(() => {
                        button.addEventListener('click', listener1);
                        button.addEventListener('click', listener2);
                        button.addEventListener('click', listener3);
                        button.addEventListener('click', listener4);
                    });
                    const mouseEvent = document.createEvent('MouseEvent');
                    mouseEvent.initEvent('click', true, true);
                    const unhandledRejection = (e) => {
                        fail('should not be here');
                    };
                    window.addEventListener('unhandledrejection', unhandledRejection);
                    button.dispatchEvent(mouseEvent);
                    expect(logs).toEqual([
                        'listener1',
                        'zone handled error test1',
                        'zone handled error test2',
                        'listener2',
                    ]);
                    setTimeout(() => {
                        expect(logs).toEqual([
                            'listener1',
                            'zone handled error test1',
                            'zone handled error test2',
                            'listener2',
                        ]);
                        window.removeEventListener('unhandledrejection', unhandledRejection);
                        done();
                    });
                }
                catch (e) { }
            });
            xit('should be able to continue to invoke remaining listeners even some listener throw error in the different zones', function (done) {
                let logs = [];
                try {
                    const zone1 = Zone.current.fork({
                        name: 'zone1',
                        onHandleError: (delegate, curr, target, error) => {
                            logs.push(error.message);
                            return false;
                        },
                    });
                    const listener1 = function () {
                        logs.push('listener1');
                    };
                    const listener2 = function () {
                        throw new Error('test1');
                    };
                    const listener3 = function () {
                        throw new Error('test2');
                    };
                    const listener4 = {
                        handleEvent: function () {
                            logs.push('listener2');
                        },
                    };
                    button.addEventListener('click', listener1);
                    zone1.run(() => {
                        button.addEventListener('click', listener2);
                    });
                    button.addEventListener('click', listener3);
                    button.addEventListener('click', listener4);
                    const mouseEvent = document.createEvent('MouseEvent');
                    mouseEvent.initEvent('click', true, true);
                    const unhandledRejection = (e) => {
                        fail('should not be here');
                    };
                    window.addEventListener('unhandledrejection', unhandledRejection);
                    button.dispatchEvent(mouseEvent);
                    expect(logs).toEqual(['listener1', 'listener2']);
                }
                catch (e) { }
            });
        });
        // TODO: Re-enable via https://github.com/angular/angular/pull/41526
        xdescribe('unhandled promise rejection', () => {
            const AsyncTestZoneSpec = Zone['AsyncTestZoneSpec'];
            const asyncTest = function (testFn) {
                return (done) => {
                    let asyncTestZone = Zone.current.fork(new AsyncTestZoneSpec(done, (error) => {
                        fail(error);
                    }, 'asyncTest'));
                    asyncTestZone.run(testFn);
                };
            };
            it('should support window.addEventListener(unhandledrejection)', asyncTest(() => {
                if (!promiseUnhandleRejectionSupport()) {
                    return;
                }
                Zone[(0, utils_1.zoneSymbol)('ignoreConsoleErrorUncaughtError')] = true;
                Zone.root.fork({ name: 'promise' }).run(function () {
                    const listener = (evt) => {
                        window.removeEventListener('unhandledrejection', listener);
                        expect(evt.type).toEqual('unhandledrejection');
                        expect(evt.promise.constructor.name).toEqual('Promise');
                        expect(evt.reason.message).toBe('promise error');
                    };
                    window.addEventListener('unhandledrejection', listener);
                    new Promise((resolve, reject) => {
                        throw new Error('promise error');
                    });
                });
            }));
            it('should support window.addEventListener(rejectionhandled)', asyncTest(() => {
                if (!promiseUnhandleRejectionSupport()) {
                    return;
                }
                Zone[(0, utils_1.zoneSymbol)('ignoreConsoleErrorUncaughtError')] = true;
                Zone.root.fork({ name: 'promise' }).run(function () {
                    const listener = (evt) => {
                        window.removeEventListener('unhandledrejection', listener);
                        p.catch((reason) => { });
                    };
                    window.addEventListener('unhandledrejection', listener);
                    const handledListener = (evt) => {
                        window.removeEventListener('rejectionhandled', handledListener);
                        expect(evt.type).toEqual('rejectionhandled');
                        expect(evt.promise.constructor.name).toEqual('Promise');
                        expect(evt.reason.message).toBe('promise error');
                    };
                    window.addEventListener('rejectionhandled', handledListener);
                    const p = new Promise((resolve, reject) => {
                        throw new Error('promise error');
                    });
                });
            }));
            it('should support multiple window.addEventListener(unhandledrejection)', asyncTest(() => {
                if (!promiseUnhandleRejectionSupport()) {
                    return;
                }
                Zone[(0, utils_1.zoneSymbol)('ignoreConsoleErrorUncaughtError')] = true;
                Zone.root.fork({ name: 'promise' }).run(function () {
                    const listener1 = (evt) => {
                        window.removeEventListener('unhandledrejection', listener1);
                        expect(evt.type).toEqual('unhandledrejection');
                        expect(evt.promise.constructor.name).toEqual('Promise');
                        expect(evt.reason.message).toBe('promise error');
                    };
                    const listener2 = (evt) => {
                        window.removeEventListener('unhandledrejection', listener2);
                        expect(evt.type).toEqual('unhandledrejection');
                        expect(evt.promise.constructor.name).toEqual('Promise');
                        expect(evt.reason.message).toBe('promise error');
                        evt.preventDefault();
                    };
                    window.addEventListener('unhandledrejection', listener1);
                    window.addEventListener('unhandledrejection', listener2);
                    new Promise((resolve, reject) => {
                        throw new Error('promise error');
                    });
                });
            }));
        });
        // @JiaLiPassion, Edge 15, the behavior is not the same with Chrome
        // wait for fix.
        xit('IntersectionObserver should run callback in zone', (0, test_util_1.ifEnvSupportsWithDone)('IntersectionObserver', (done) => {
            const div = document.createElement('div');
            document.body.appendChild(div);
            const options = { threshold: 0.5 };
            const zone = Zone.current.fork({ name: 'intersectionObserverZone' });
            zone.run(() => {
                const observer = new IntersectionObserver(() => {
                    expect(Zone.current.name).toEqual(zone.name);
                    observer.unobserve(div);
                    done();
                }, options);
                observer.observe(div);
            });
            div.style.display = 'none';
            div.style.visibility = 'block';
        }));
        it('HTMLCanvasElement.toBlob should be a ZoneAware MacroTask', (0, test_util_1.ifEnvSupportsWithDone)(supportCanvasTest, (done) => {
            const canvas = document.createElement('canvas');
            const d = canvas.width;
            const ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(d / 2, 0);
            ctx.lineTo(d, d);
            ctx.lineTo(0, d);
            ctx.closePath();
            ctx.fillStyle = 'yellow';
            ctx.fill();
            const scheduleSpy = jasmine.createSpy('scheduleSpy');
            const zone = Zone.current.fork({
                name: 'canvas',
                onScheduleTask: (delegate, currentZone, targetZone, task) => {
                    scheduleSpy();
                    return delegate.scheduleTask(targetZone, task);
                },
            });
            zone.run(() => {
                const canvasData = canvas.toDataURL();
                canvas.toBlob(function (blob) {
                    expect(Zone.current.name).toEqual('canvas');
                    expect(scheduleSpy).toHaveBeenCalled();
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = function () {
                        const base64data = reader.result;
                        expect(base64data).toEqual(canvasData);
                        done();
                    };
                });
            });
        }));
        describe('ResizeObserver', (0, test_util_1.ifEnvSupports)('ResizeObserver', () => {
            it('ResizeObserver callback should be in zone', (done) => {
                const ResizeObserver = window['ResizeObserver'];
                const div = document.createElement('div');
                const zone = Zone.current.fork({ name: 'observer' });
                const observer = new ResizeObserver((entries, ob) => {
                    expect(Zone.current.name).toEqual(zone.name);
                    expect(entries.length).toBe(1);
                    expect(entries[0].target).toBe(div);
                    observer.disconnect();
                    done();
                });
                zone.run(() => {
                    observer.observe(div);
                });
                document.body.appendChild(div);
            });
            it('ResizeObserver callback should be able to in different zones which when they were observed', (done) => {
                const ResizeObserver = window['ResizeObserver'];
                const div1 = document.createElement('div');
                const div2 = document.createElement('div');
                const zone = Zone.current.fork({ name: 'observer' });
                let count = 0;
                const observer = new ResizeObserver((entries, ob) => {
                    entries.forEach((entry) => {
                        if (entry.target === div1) {
                            expect(Zone.current.name).toEqual(zone.name);
                        }
                        else {
                            expect(Zone.current.name).toEqual('<root>');
                        }
                    });
                    count++;
                    if (count === 2) {
                        done();
                    }
                });
                zone.run(() => {
                    observer.observe(div1);
                });
                Zone.root.run(() => {
                    observer.observe(div2);
                });
                document.body.appendChild(div1);
                document.body.appendChild(div2);
            });
        }));
        xdescribe('getUserMedia', () => {
            it('navigator.mediaDevices.getUserMedia should in zone', (0, test_util_1.ifEnvSupportsWithDone)(() => {
                return (!(0, test_util_1.isEdge)() &&
                    navigator &&
                    navigator.mediaDevices &&
                    typeof navigator.mediaDevices.getUserMedia === 'function');
            }, (done) => {
                const zone = Zone.current.fork({ name: 'media' });
                zone.run(() => {
                    const constraints = { audio: true, video: { width: 1280, height: 720 } };
                    navigator.mediaDevices
                        .getUserMedia(constraints)
                        .then(function (mediaStream) {
                        expect(Zone.current.name).toEqual(zone.name);
                        done();
                    })
                        .catch(function (err) {
                        console.log(err.name + ': ' + err.message);
                        expect(Zone.current.name).toEqual(zone.name);
                        done();
                    });
                });
            }));
            // Note: `navigator` is cast to `any` in this test, because the preferred way of accessing
            // `getUserMedia` is through `navigator.mediaDevices`, however some older browsers still
            // expose it directly on `navigator`.
            it('navigator.getUserMedia should in zone', (0, test_util_1.ifEnvSupportsWithDone)(() => {
                return !(0, test_util_1.isEdge)() && navigator && typeof navigator.getUserMedia === 'function';
            }, (done) => {
                const zone = Zone.current.fork({ name: 'media' });
                zone.run(() => {
                    const constraints = { audio: true, video: { width: 1280, height: 720 } };
                    navigator.getUserMedia(constraints, () => {
                        expect(Zone.current.name).toEqual(zone.name);
                        done();
                    }, () => {
                        expect(Zone.current.name).toEqual(zone.name);
                        done();
                    });
                });
            }));
        });
    });
    if ((0, test_util_1.getIEVersion)() === 11) {
        describe('pointer event in IE', () => {
            const pointerEventsMap = {
                'MSPointerCancel': 'pointercancel',
                'MSPointerDown': 'pointerdown',
                'MSPointerEnter': 'pointerenter',
                'MSPointerHover': 'pointerhover',
                'MSPointerLeave': 'pointerleave',
                'MSPointerMove': 'pointermove',
                'MSPointerOut': 'pointerout',
                'MSPointerOver': 'pointerover',
                'MSPointerUp': 'pointerup',
            };
            let div;
            beforeEach(() => {
                div = document.createElement('div');
                document.body.appendChild(div);
            });
            afterEach(() => {
                document.body.removeChild(div);
            });
            Object.keys(pointerEventsMap).forEach((key) => {
                it(`${key} and ${pointerEventsMap[key]} should both be triggered`, (done) => {
                    const logs = [];
                    div.addEventListener(key, (event) => {
                        expect(event.type).toEqual(pointerEventsMap[key]);
                        logs.push(`${key} triggered`);
                    });
                    div.addEventListener(pointerEventsMap[key], (event) => {
                        expect(event.type).toEqual(pointerEventsMap[key]);
                        logs.push(`${pointerEventsMap[key]} triggered`);
                    });
                    const evt1 = document.createEvent('Event');
                    evt1.initEvent(key, true, true);
                    div.dispatchEvent(evt1);
                    setTimeout(() => {
                        expect(logs).toEqual([`${key} triggered`, `${pointerEventsMap[key]} triggered`]);
                    });
                    const evt2 = document.createEvent('Event');
                    evt2.initEvent(pointerEventsMap[key], true, true);
                    div.dispatchEvent(evt2);
                    setTimeout(() => {
                        expect(logs).toEqual([`${key} triggered`, `${pointerEventsMap[key]} triggered`]);
                    });
                    setTimeout(done);
                });
                it(`${key} and ${pointerEventsMap[key]} with same listener should not be triggered twice`, (done) => {
                    const logs = [];
                    const listener = function (event) {
                        expect(event.type).toEqual(pointerEventsMap[key]);
                        logs.push(`${key} triggered`);
                    };
                    div.addEventListener(key, listener);
                    div.addEventListener(pointerEventsMap[key], listener);
                    const evt1 = document.createEvent('Event');
                    evt1.initEvent(key, true, true);
                    div.dispatchEvent(evt1);
                    setTimeout(() => {
                        expect(logs).toEqual([`${key} triggered`]);
                    });
                    const evt2 = document.createEvent('Event');
                    evt2.initEvent(pointerEventsMap[key], true, true);
                    div.dispatchEvent(evt2);
                    setTimeout(() => {
                        expect(logs).toEqual([`${pointerEventsMap[key]} triggered`]);
                    });
                    setTimeout(done);
                });
                it(`${key} and ${pointerEventsMap[key]} should be able to be removed with removeEventListener`, (done) => {
                    const logs = [];
                    const listener1 = function (event) {
                        logs.push(`${key} triggered`);
                    };
                    const listener2 = function (event) {
                        logs.push(`${pointerEventsMap[key]} triggered`);
                    };
                    div.addEventListener(key, listener1);
                    div.addEventListener(pointerEventsMap[key], listener2);
                    div.removeEventListener(key, listener1);
                    div.removeEventListener(key, listener2);
                    const evt1 = document.createEvent('Event');
                    evt1.initEvent(key, true, true);
                    div.dispatchEvent(evt1);
                    setTimeout(() => {
                        expect(logs).toEqual([]);
                    });
                    const evt2 = document.createEvent('Event');
                    evt2.initEvent(pointerEventsMap[key], true, true);
                    div.dispatchEvent(evt2);
                    setTimeout(() => {
                        expect(logs).toEqual([]);
                    });
                    div.addEventListener(key, listener1);
                    div.addEventListener(pointerEventsMap[key], listener2);
                    div.removeEventListener(pointerEventsMap[key], listener1);
                    div.removeEventListener(pointerEventsMap[key], listener2);
                    div.dispatchEvent(evt1);
                    setTimeout(() => {
                        expect(logs).toEqual([]);
                    });
                    div.dispatchEvent(evt2);
                    setTimeout(() => {
                        expect(logs).toEqual([]);
                    });
                    setTimeout(done);
                });
            });
        });
    }
});
