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
exports.IOsDriverExtension = void 0;
const core_1 = require("@angular/core");
const web_driver_adapter_1 = require("../web_driver_adapter");
const web_driver_extension_1 = require("../web_driver_extension");
let IOsDriverExtension = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = web_driver_extension_1.WebDriverExtension;
    var IOsDriverExtension = _classThis = class extends _classSuper {
        constructor(_driver) {
            super();
            this._driver = _driver;
        }
        gc() {
            throw new Error('Force GC is not supported on iOS');
        }
        timeBegin(name) {
            return this._driver.executeScript(`console.time('${name}');`);
        }
        timeEnd(name, restartName = null) {
            let script = `console.timeEnd('${name}');`;
            if (restartName != null) {
                script += `console.time('${restartName}');`;
            }
            return this._driver.executeScript(script);
        }
        // See https://github.com/WebKit/webkit/tree/master/Source/WebInspectorUI/Versions
        readPerfLog() {
            // TODO(tbosch): Bug in IOsDriver: Need to execute at least one command
            // so that the browser logs can be read out!
            return this._driver
                .executeScript('1+1')
                .then((_) => this._driver.logs('performance'))
                .then((entries) => {
                const records = [];
                entries.forEach((entry) => {
                    const message = JSON.parse(entry['message'])['message'];
                    if (message['method'] === 'Timeline.eventRecorded') {
                        records.push(message['params']['record']);
                    }
                });
                return this._convertPerfRecordsToEvents(records);
            });
        }
        /** @internal */
        _convertPerfRecordsToEvents(records, events = null) {
            if (!events) {
                events = [];
            }
            records.forEach((record) => {
                let endEvent = null;
                const type = record['type'];
                const data = record['data'];
                const startTime = record['startTime'];
                const endTime = record['endTime'];
                if (type === 'FunctionCall' && (data == null || data['scriptName'] !== 'InjectedScript')) {
                    events.push(createStartEvent('script', startTime));
                    endEvent = createEndEvent('script', endTime);
                }
                else if (type === 'Time') {
                    events.push(createMarkStartEvent(data['message'], startTime));
                }
                else if (type === 'TimeEnd') {
                    events.push(createMarkEndEvent(data['message'], startTime));
                }
                else if (type === 'RecalculateStyles' ||
                    type === 'Layout' ||
                    type === 'UpdateLayerTree' ||
                    type === 'Paint' ||
                    type === 'Rasterize' ||
                    type === 'CompositeLayers') {
                    events.push(createStartEvent('render', startTime));
                    endEvent = createEndEvent('render', endTime);
                }
                // Note: ios used to support GCEvent up until iOS 6 :-(
                if (record['children'] != null) {
                    this._convertPerfRecordsToEvents(record['children'], events);
                }
                if (endEvent != null) {
                    events.push(endEvent);
                }
            });
            return events;
        }
        perfLogFeatures() {
            return new web_driver_extension_1.PerfLogFeatures({ render: true });
        }
        supports(capabilities) {
            return capabilities['browserName'].toLowerCase() === 'safari';
        }
    };
    __setFunctionName(_classThis, "IOsDriverExtension");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IOsDriverExtension = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.PROVIDERS = [{ provide: IOsDriverExtension, deps: [web_driver_adapter_1.WebDriverAdapter] }];
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IOsDriverExtension = _classThis;
})();
exports.IOsDriverExtension = IOsDriverExtension;
function createEvent(ph, name, time, args = null) {
    const result = {
        'cat': 'timeline',
        'name': name,
        'ts': time,
        'ph': ph,
        // The ios protocol does not support the notions of multiple processes in
        // the perflog...
        'pid': 'pid0',
    };
    if (args != null) {
        result['args'] = args;
    }
    return result;
}
function createStartEvent(name, time, args = null) {
    return createEvent('B', name, time, args);
}
function createEndEvent(name, time, args = null) {
    return createEvent('E', name, time, args);
}
function createMarkStartEvent(name, time) {
    return createEvent('B', name, time);
}
function createMarkEndEvent(name, time) {
    return createEvent('E', name, time);
}
