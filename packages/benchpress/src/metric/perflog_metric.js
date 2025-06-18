"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerflogMetric = void 0;
const core_1 = require("@angular/core");
const common_options_1 = require("../common_options");
const metric_1 = require("../metric");
const web_driver_extension_1 = require("../web_driver_extension");
/**
 * A metric that reads out the performance log
 */
let PerflogMetric = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = metric_1.Metric;
    var PerflogMetric = _classThis = class extends _classSuper {
        /**
         * @param driverExtension
         * @param setTimeout
         * @param microMetrics Name and description of metrics provided via console.time / console.timeEnd
         * @param ignoreNavigation If true, don't measure from navigationStart events. These events are
         *   usually triggered by a page load, but can also be triggered when adding iframes to the DOM.
         **/
        constructor(_driverExtension, _setTimeout, _microMetrics, _forceGc, _captureFrames, _receivedData, _requestCount, _ignoreNavigation) {
            super();
            this._driverExtension = _driverExtension;
            this._setTimeout = _setTimeout;
            this._microMetrics = _microMetrics;
            this._forceGc = _forceGc;
            this._captureFrames = _captureFrames;
            this._receivedData = _receivedData;
            this._requestCount = _requestCount;
            this._ignoreNavigation = _ignoreNavigation;
            this._remainingEvents = [];
            this._measureCount = 0;
            this._perfLogFeatures = _driverExtension.perfLogFeatures();
            if (!this._perfLogFeatures.userTiming) {
                // User timing is needed for navigationStart.
                this._receivedData = false;
                this._requestCount = false;
            }
        }
        describe() {
            const res = {
                'scriptTime': 'script execution time in ms, including gc and render',
                'pureScriptTime': 'script execution time in ms, without gc nor render',
            };
            if (this._perfLogFeatures.render) {
                res['renderTime'] = 'render time in ms';
                res['renderTimeInScript'] = 'render time in ms while executing script (usually means reflow)';
            }
            if (this._perfLogFeatures.gc) {
                res['gcTime'] = 'gc time in ms';
                res['gcTimeInScript'] = 'gc time in ms while executing scripts';
                res['gcAmount'] = 'gc amount in kbytes';
                res['majorGcTime'] = 'time of major gcs in ms';
                if (this._forceGc) {
                    res['forcedGcTime'] = 'forced gc time in ms';
                    res['forcedGcAmount'] = 'forced gc amount in kbytes';
                }
            }
            if (this._receivedData) {
                res['receivedData'] = 'encoded bytes received since navigationStart';
            }
            if (this._requestCount) {
                res['requestCount'] = 'count of requests sent since navigationStart';
            }
            if (this._captureFrames) {
                if (!this._perfLogFeatures.frameCapture) {
                    const warningMsg = 'WARNING: Metric requested, but not supported by driver';
                    // using dot syntax for metric name to keep them grouped together in console reporter
                    res['frameTime.mean'] = warningMsg;
                    res['frameTime.worst'] = warningMsg;
                    res['frameTime.best'] = warningMsg;
                    res['frameTime.smooth'] = warningMsg;
                }
                else {
                    res['frameTime.mean'] = 'mean frame time in ms (target: 16.6ms for 60fps)';
                    res['frameTime.worst'] = 'worst frame time in ms';
                    res['frameTime.best'] = 'best frame time in ms';
                    res['frameTime.smooth'] = 'percentage of frames that hit 60fps';
                }
            }
            for (const name in this._microMetrics) {
                res[name] = this._microMetrics[name];
            }
            return res;
        }
        beginMeasure() {
            let resultPromise = Promise.resolve(null);
            if (this._forceGc) {
                resultPromise = resultPromise.then((_) => this._driverExtension.gc());
            }
            return resultPromise.then((_) => this._beginMeasure());
        }
        endMeasure(restart) {
            if (this._forceGc) {
                return this._endPlainMeasureAndMeasureForceGc(restart);
            }
            else {
                return this._endMeasure(restart);
            }
        }
        /** @internal */
        _endPlainMeasureAndMeasureForceGc(restartMeasure) {
            return this._endMeasure(true).then((measureValues) => {
                // disable frame capture for measurements during forced gc
                const originalFrameCaptureValue = this._captureFrames;
                this._captureFrames = false;
                return this._driverExtension
                    .gc()
                    .then((_) => this._endMeasure(restartMeasure))
                    .then((forceGcMeasureValues) => {
                    this._captureFrames = originalFrameCaptureValue;
                    measureValues['forcedGcTime'] = forceGcMeasureValues['gcTime'];
                    measureValues['forcedGcAmount'] = forceGcMeasureValues['gcAmount'];
                    return measureValues;
                });
            });
        }
        _beginMeasure() {
            return this._driverExtension.timeBegin(this._markName(this._measureCount++));
        }
        _endMeasure(restart) {
            const markName = this._markName(this._measureCount - 1);
            const nextMarkName = restart ? this._markName(this._measureCount++) : null;
            return this._driverExtension
                .timeEnd(markName, nextMarkName)
                .then((_) => this._readUntilEndMark(markName));
        }
        _readUntilEndMark(markName, loopCount = 0, startEvent = null) {
            if (loopCount > _MAX_RETRY_COUNT) {
                throw new Error(`Tried too often to get the ending mark: ${loopCount}`);
            }
            return this._driverExtension.readPerfLog().then((events) => {
                this._addEvents(events);
                const result = this._aggregateEvents(this._remainingEvents, markName);
                if (result) {
                    this._remainingEvents = events;
                    return result;
                }
                let resolve;
                const promise = new Promise((res) => {
                    resolve = res;
                });
                this._setTimeout(() => resolve(this._readUntilEndMark(markName, loopCount + 1)), 100);
                return promise;
            });
        }
        _addEvents(events) {
            let needSort = false;
            events.forEach((event) => {
                if (event['ph'] === 'X') {
                    needSort = true;
                    const startEvent = {};
                    const endEvent = {};
                    for (const prop in event) {
                        startEvent[prop] = event[prop];
                        endEvent[prop] = event[prop];
                    }
                    startEvent['ph'] = 'B';
                    endEvent['ph'] = 'E';
                    endEvent['ts'] = startEvent['ts'] + startEvent['dur'];
                    this._remainingEvents.push(startEvent);
                    this._remainingEvents.push(endEvent);
                }
                else {
                    this._remainingEvents.push(event);
                }
            });
            if (needSort) {
                // Need to sort because of the ph==='X' events
                this._remainingEvents.sort((a, b) => {
                    const diff = a['ts'] - b['ts'];
                    return diff > 0 ? 1 : diff < 0 ? -1 : 0;
                });
            }
        }
        _aggregateEvents(events, markName) {
            const result = { 'scriptTime': 0, 'pureScriptTime': 0 };
            if (this._perfLogFeatures.gc) {
                result['gcTime'] = 0;
                result['majorGcTime'] = 0;
                result['gcAmount'] = 0;
            }
            if (this._perfLogFeatures.render) {
                result['renderTime'] = 0;
            }
            if (this._captureFrames) {
                result['frameTime.mean'] = 0;
                result['frameTime.best'] = 0;
                result['frameTime.worst'] = 0;
                result['frameTime.smooth'] = 0;
            }
            for (const name in this._microMetrics) {
                result[name] = 0;
            }
            if (this._receivedData) {
                result['receivedData'] = 0;
            }
            if (this._requestCount) {
                result['requestCount'] = 0;
            }
            let markStartEvent = null;
            let markEndEvent = null;
            events.forEach((event) => {
                const ph = event['ph'];
                const name = event['name'];
                // Here we are determining if this is the event signaling the start or end of our performance
                // testing (this is triggered by us calling #timeBegin and #timeEnd).
                //
                // Previously, this was done by checking that the event name matched our mark name and that
                // the phase was either "B" or "E" ("begin" or "end"). However, since Chrome v90 this is
                // showing up as "-bpstart" and "-bpend" ("benchpress start/end"), which is what one would
                // actually expect since that is the mark name used in ChromeDriverExtension - see the
                // #timeBegin and #timeEnd implementations in chrome_driver_extension.ts. For
                // backwards-compatibility with Chrome v89 (and older), we do both checks: the phase-based
                // one ("B" or "E") and event name-based (the "-bp(start/end)" suffix).
                const isStartEvent = (ph === 'B' && name === markName) || name === markName + '-bpstart';
                const isEndEvent = (ph === 'E' && name === markName) || name === markName + '-bpend';
                if (isStartEvent) {
                    markStartEvent = event;
                }
                else if (ph === 'I' && name === 'navigationStart' && !this._ignoreNavigation) {
                    // if a benchmark measures reload of a page, use the last
                    // navigationStart as begin event
                    markStartEvent = event;
                }
                else if (isEndEvent) {
                    markEndEvent = event;
                }
            });
            if (!markStartEvent || !markEndEvent) {
                // not all events have been received, no further processing for now
                return null;
            }
            if (markStartEvent.pid !== markEndEvent.pid) {
                result['invalid'] = 1;
            }
            let gcTimeInScript = 0;
            let renderTimeInScript = 0;
            const frameTimestamps = [];
            const frameTimes = [];
            let frameCaptureStartEvent = null;
            let frameCaptureEndEvent = null;
            const intervalStarts = {};
            const intervalStartCount = {};
            let inMeasureRange = false;
            events.forEach((event) => {
                var _a, _b;
                const ph = event['ph'];
                let name = event['name'];
                let microIterations = 1;
                const microIterationsMatch = name.match(_MICRO_ITERATIONS_REGEX);
                if (microIterationsMatch) {
                    name = microIterationsMatch[1];
                    microIterations = parseInt(microIterationsMatch[2], 10);
                }
                if (event === markStartEvent) {
                    inMeasureRange = true;
                }
                else if (event === markEndEvent) {
                    inMeasureRange = false;
                }
                if (!inMeasureRange || event['pid'] !== markStartEvent['pid']) {
                    return;
                }
                if (this._requestCount && name === 'sendRequest') {
                    result['requestCount'] += 1;
                }
                else if (this._receivedData && name === 'receivedData' && ph === 'I') {
                    result['receivedData'] += event['args']['encodedDataLength'];
                }
                if (ph === 'B' && name === _MARK_NAME_FRAME_CAPTURE) {
                    if (frameCaptureStartEvent) {
                        throw new Error('can capture frames only once per benchmark run');
                    }
                    if (!this._captureFrames) {
                        throw new Error('found start event for frame capture, but frame capture was not requested in benchpress');
                    }
                    frameCaptureStartEvent = event;
                }
                else if (ph === 'E' && name === _MARK_NAME_FRAME_CAPTURE) {
                    if (!frameCaptureStartEvent) {
                        throw new Error('missing start event for frame capture');
                    }
                    frameCaptureEndEvent = event;
                }
                if (ph === 'I' && frameCaptureStartEvent && !frameCaptureEndEvent && name === 'frame') {
                    frameTimestamps.push(event['ts']);
                    if (frameTimestamps.length >= 2) {
                        frameTimes.push(frameTimestamps[frameTimestamps.length - 1] -
                            frameTimestamps[frameTimestamps.length - 2]);
                    }
                }
                if (ph === 'B') {
                    if (!intervalStarts[name]) {
                        intervalStartCount[name] = 1;
                        intervalStarts[name] = event;
                    }
                    else {
                        intervalStartCount[name]++;
                    }
                }
                else if (ph === 'E' && intervalStarts[name]) {
                    intervalStartCount[name]--;
                    if (intervalStartCount[name] === 0) {
                        const startEvent = intervalStarts[name];
                        const duration = event['ts'] - startEvent['ts'];
                        intervalStarts[name] = null;
                        if (name === 'gc') {
                            result['gcTime'] += duration;
                            const gcAmount = (_b = (_a = event['args']) === null || _a === void 0 ? void 0 : _a['gcAmount']) !== null && _b !== void 0 ? _b : 0;
                            const amount = gcAmount > 0
                                ? gcAmount
                                : startEvent['args']['usedHeapSize'] - event['args']['usedHeapSize'];
                            result['gcAmount'] += amount / 1000;
                            const majorGc = event['args']['majorGc'];
                            if (majorGc && majorGc) {
                                result['majorGcTime'] += duration;
                            }
                            if (intervalStarts['script']) {
                                gcTimeInScript += duration;
                            }
                        }
                        else if (name === 'render') {
                            result['renderTime'] += duration;
                            if (intervalStarts['script']) {
                                renderTimeInScript += duration;
                            }
                        }
                        else if (name === 'script') {
                            result['scriptTime'] += duration;
                        }
                        else if (this._microMetrics[name]) {
                            result[name] += duration / microIterations;
                        }
                    }
                }
            });
            if (frameCaptureStartEvent && !frameCaptureEndEvent) {
                throw new Error('missing end event for frame capture');
            }
            if (this._captureFrames && !frameCaptureStartEvent) {
                throw new Error('frame capture requested in benchpress, but no start event was found');
            }
            if (frameTimes.length > 0) {
                this._addFrameMetrics(result, frameTimes);
            }
            result['renderTimeInScript'] = renderTimeInScript;
            result['gcTimeInScript'] = gcTimeInScript;
            result['pureScriptTime'] = result['scriptTime'] - gcTimeInScript - renderTimeInScript;
            return result;
        }
        _addFrameMetrics(result, frameTimes) {
            result['frameTime.mean'] = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
            const firstFrame = frameTimes[0];
            result['frameTime.worst'] = frameTimes.reduce((a, b) => (a > b ? a : b), firstFrame);
            result['frameTime.best'] = frameTimes.reduce((a, b) => (a < b ? a : b), firstFrame);
            result['frameTime.smooth'] =
                frameTimes.filter((t) => t < _FRAME_TIME_SMOOTH_THRESHOLD).length / frameTimes.length;
        }
        _markName(index) {
            return `${_MARK_NAME_PREFIX}${index}`;
        }
    };
    __setFunctionName(_classThis, "PerflogMetric");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PerflogMetric = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.SET_TIMEOUT = new core_1.InjectionToken('PerflogMetric.setTimeout');
    _classThis.IGNORE_NAVIGATION = new core_1.InjectionToken('PerflogMetric.ignoreNavigation');
    _classThis.PROVIDERS = [
        {
            provide: PerflogMetric,
            deps: [
                web_driver_extension_1.WebDriverExtension,
                PerflogMetric.SET_TIMEOUT,
                common_options_1.Options.MICRO_METRICS,
                common_options_1.Options.FORCE_GC,
                common_options_1.Options.CAPTURE_FRAMES,
                common_options_1.Options.RECEIVED_DATA,
                common_options_1.Options.REQUEST_COUNT,
                PerflogMetric.IGNORE_NAVIGATION,
            ],
        },
        {
            provide: PerflogMetric.SET_TIMEOUT,
            useValue: (fn, millis) => setTimeout(fn, millis),
        },
        { provide: PerflogMetric.IGNORE_NAVIGATION, useValue: false },
    ];
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PerflogMetric = _classThis;
})();
exports.PerflogMetric = PerflogMetric;
const _MICRO_ITERATIONS_REGEX = /(.+)\*(\d+)$/;
const _MAX_RETRY_COUNT = 20;
const _MARK_NAME_PREFIX = 'benchpress';
const _MARK_NAME_FRAME_CAPTURE = 'frameCapture';
// using 17ms as a somewhat looser threshold, instead of 16.6666ms
const _FRAME_TIME_SMOOTH_THRESHOLD = 17;
