"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChromeDriverExtension = void 0;
const core_1 = require("@angular/core");
const fs = __importStar(require("fs"));
const common_options_1 = require("../common_options");
const web_driver_adapter_1 = require("../web_driver_adapter");
const web_driver_extension_1 = require("../web_driver_extension");
/**
 * Set the following 'traceCategories' to collect metrics in Chrome:
 * 'v8,blink.console,disabled-by-default-devtools.timeline,devtools.timeline,blink.user_timing'
 *
 * In order to collect the frame rate related metrics, add 'benchmark'
 * to the list above.
 */
let ChromeDriverExtension = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = web_driver_extension_1.WebDriverExtension;
    var ChromeDriverExtension = _classThis = class extends _classSuper {
        constructor(driver, userAgent, rawPerflogPath) {
            super();
            this.driver = driver;
            this._firstRun = true;
            this._majorChromeVersion = this._parseChromeVersion(userAgent);
            this._rawPerflogPath = rawPerflogPath;
        }
        _parseChromeVersion(userAgent) {
            if (!userAgent) {
                return -1;
            }
            let v = userAgent.split(/Chrom(e|ium)\//g)[2];
            if (!v) {
                return -1;
            }
            v = v.split('.')[0];
            if (!v) {
                return -1;
            }
            return parseInt(v, 10);
        }
        gc() {
            return this.driver.executeScript('window.gc()');
        }
        timeBegin(name) {
            return __awaiter(this, void 0, void 0, function* () {
                if (this._firstRun) {
                    this._firstRun = false;
                    // Before the first run, read out the existing performance logs
                    // so that the chrome buffer does not fill up.
                    yield this.driver.logs('performance');
                }
                return this.driver.executeScript(`performance.mark('${name}-bpstart');`);
            });
        }
        timeEnd(name, restartName = null) {
            let script = `performance.mark('${name}-bpend');`;
            if (restartName) {
                script += `performance.mark('${restartName}-bpstart');`;
            }
            return this.driver.executeScript(script);
        }
        // See [Chrome Trace Event
        // Format](https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU/edit)
        readPerfLog() {
            // TODO(tbosch): Chromedriver bug https://code.google.com/p/chromedriver/issues/detail?id=1098
            // Need to execute at least one command so that the browser logs can be read out!
            return this.driver
                .executeScript('1+1')
                .then((_) => this.driver.logs('performance'))
                .then((entries) => {
                const events = [];
                entries.forEach((entry) => {
                    const message = JSON.parse(entry['message'])['message'];
                    if (message['method'] === 'Tracing.dataCollected') {
                        events.push(message['params']);
                    }
                    if (message['method'] === 'Tracing.bufferUsage') {
                        throw new Error('The DevTools trace buffer filled during the test!');
                    }
                });
                if (this._rawPerflogPath && events.length) {
                    fs.appendFileSync(this._rawPerflogPath, JSON.stringify(events));
                }
                return this._convertPerfRecordsToEvents(events);
            });
        }
        _convertPerfRecordsToEvents(chromeEvents, normalizedEvents = null) {
            if (!normalizedEvents) {
                normalizedEvents = [];
            }
            chromeEvents.forEach((event) => {
                const categories = this._parseCategories(event['cat']);
                const normalizedEvent = this._convertEvent(event, categories);
                if (normalizedEvent != null)
                    normalizedEvents.push(normalizedEvent);
            });
            return normalizedEvents;
        }
        _convertEvent(event, categories) {
            const name = event['name'];
            const args = event['args'];
            if (this._isEvent(categories, name, ['blink.console'])) {
                return normalizeEvent(event, { 'name': name });
            }
            else if (this._isEvent(categories, name, ['blink.user_timing'])) {
                return normalizeEvent(event, { 'name': name });
            }
            else if (this._isEvent(categories, name, ['benchmark'], 'BenchmarkInstrumentation::ImplThreadRenderingStats')) {
                // TODO(goderbauer): Instead of BenchmarkInstrumentation::ImplThreadRenderingStats the
                // following events should be used (if available) for more accurate measurements:
                //   1st choice: vsync_before - ground truth on Android
                //   2nd choice: BenchmarkInstrumentation::DisplayRenderingStats - available on systems with
                //               new surfaces framework (not broadly enabled yet)
                //   3rd choice: BenchmarkInstrumentation::ImplThreadRenderingStats - fallback event that is
                //               always available if something is rendered
                const frameCount = event['args']['data']['frame_count'];
                if (frameCount > 1) {
                    throw new Error('multi-frame render stats not supported');
                }
                if (frameCount == 1) {
                    return normalizeEvent(event, { 'name': 'frame' });
                }
            }
            else if (this._isEvent(categories, name, ['disabled-by-default-devtools.timeline'], 'Rasterize') ||
                this._isEvent(categories, name, ['disabled-by-default-devtools.timeline'], 'CompositeLayers')) {
                return normalizeEvent(event, { 'name': 'render' });
            }
            else if (this._isEvent(categories, name, ['devtools.timeline', 'v8'], 'MajorGC')) {
                return normalizeGCEvent(event, true);
            }
            else if (this._isEvent(categories, name, ['devtools.timeline', 'v8'], 'MinorGC')) {
                return normalizeGCEvent(event, false);
            }
            else if (this._isEvent(categories, name, ['devtools.timeline'], 'FunctionCall') &&
                (!args ||
                    !args['data'] ||
                    (args['data']['scriptName'] !== 'InjectedScript' && args['data']['scriptName'] !== ''))) {
                return normalizeEvent(event, { 'name': 'script' });
            }
            else if (this._isEvent(categories, name, ['devtools.timeline'], 'EvaluateScript')) {
                return normalizeEvent(event, { 'name': 'script' });
            }
            else if (this._isEvent(categories, name, ['devtools.timeline', 'blink'], 'UpdateLayoutTree')) {
                return normalizeEvent(event, { 'name': 'render' });
            }
            else if (this._isEvent(categories, name, ['devtools.timeline'], 'UpdateLayerTree') ||
                this._isEvent(categories, name, ['devtools.timeline'], 'Layout') ||
                this._isEvent(categories, name, ['devtools.timeline'], 'Paint')) {
                return normalizeEvent(event, { 'name': 'render' });
            }
            else if (this._isEvent(categories, name, ['devtools.timeline'], 'ResourceReceivedData')) {
                const normArgs = { 'encodedDataLength': args['data']['encodedDataLength'] };
                return normalizeEvent(event, { 'name': 'receivedData', 'args': normArgs });
            }
            else if (this._isEvent(categories, name, ['devtools.timeline'], 'ResourceSendRequest')) {
                const data = args['data'];
                const normArgs = { 'url': data['url'], 'method': data['requestMethod'] };
                return normalizeEvent(event, { 'name': 'sendRequest', 'args': normArgs });
            }
            else if (this._isEvent(categories, name, ['blink.user_timing'], 'navigationStart')) {
                return normalizeEvent(event, { 'name': 'navigationStart' });
            }
            return null; // nothing useful in this event
        }
        _parseCategories(categories) {
            return categories.split(',');
        }
        _isEvent(eventCategories, eventName, expectedCategories, expectedName = null) {
            const hasCategories = expectedCategories.reduce((value, cat) => value && eventCategories.indexOf(cat) !== -1, true);
            return !expectedName ? hasCategories : hasCategories && eventName === expectedName;
        }
        perfLogFeatures() {
            return new web_driver_extension_1.PerfLogFeatures({ render: true, gc: true, frameCapture: true, userTiming: true });
        }
        supports(capabilities) {
            const browserName = capabilities['browserName'].toLowerCase();
            return (this._majorChromeVersion >= 44 &&
                (browserName === 'chrome' || browserName === 'chrome-headless-shell'));
        }
    };
    __setFunctionName(_classThis, "ChromeDriverExtension");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChromeDriverExtension = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.PROVIDERS = [
        {
            provide: ChromeDriverExtension,
            deps: [web_driver_adapter_1.WebDriverAdapter, common_options_1.Options.USER_AGENT, common_options_1.Options.RAW_PERFLOG_PATH],
        },
    ];
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChromeDriverExtension = _classThis;
})();
exports.ChromeDriverExtension = ChromeDriverExtension;
function normalizeEvent(chromeEvent, data) {
    let ph = chromeEvent['ph'].toUpperCase();
    if (ph === 'S') {
        ph = 'B';
    }
    else if (ph === 'F') {
        ph = 'E';
    }
    else if (ph === 'R') {
        // mark events from navigation timing
        ph = 'I';
        // Chrome 65+ doesn't allow user timing measurements across page loads.
        // Instead, we use performance marks with special names.
        if (chromeEvent['name'].match(/-bpstart/)) {
            data['name'] = chromeEvent['name'].slice(0, -8);
            ph = 'B';
        }
        else if (chromeEvent['name'].match(/-bpend$/)) {
            data['name'] = chromeEvent['name'].slice(0, -6);
            ph = 'E';
        }
    }
    const result = {
        'pid': chromeEvent['pid'],
        'ph': ph,
        'cat': 'timeline',
        'ts': chromeEvent['ts'] / 1000,
    };
    if (ph === 'X') {
        let dur = chromeEvent['dur'];
        if (dur === undefined) {
            dur = chromeEvent['tdur'];
        }
        result['dur'] = !dur ? 0.0 : dur / 1000;
    }
    for (const prop in data) {
        result[prop] = data[prop];
    }
    return result;
}
function normalizeGCEvent(chromeEvent, majorGc) {
    const args = chromeEvent['args'];
    const heapSizeBefore = args['usedHeapSizeBefore'];
    const heapSizeAfter = args['usedHeapSizeAfter'];
    if (heapSizeBefore === undefined && heapSizeAfter === undefined) {
        throw new Error(`GC event didn't specify heap size to calculate amount of collected memory. Expected one of usedHeapSizeBefore / usedHeapSizeAfter arguments but got ${JSON.stringify(args)}`);
    }
    const normalizedArgs = {
        'majorGc': majorGc,
        'usedHeapSize': heapSizeAfter !== undefined ? heapSizeAfter : heapSizeBefore,
        'gcAmount': heapSizeBefore !== undefined && heapSizeAfter !== undefined
            ? heapSizeBefore - heapSizeAfter
            : 0,
    };
    return normalizeEvent(chromeEvent, { 'name': 'gc', 'args': normalizedArgs });
}
