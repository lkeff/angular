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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Options = void 0;
const core_1 = require("@angular/core");
const fs = __importStar(require("fs"));
class Options {
}
exports.Options = Options;
Options.SAMPLE_ID = new core_1.InjectionToken('Options.sampleId');
Options.DEFAULT_DESCRIPTION = new core_1.InjectionToken('Options.defaultDescription');
Options.SAMPLE_DESCRIPTION = new core_1.InjectionToken('Options.sampleDescription');
Options.FORCE_GC = new core_1.InjectionToken('Options.forceGc');
Options.NO_PREPARE = () => true;
Options.PREPARE = new core_1.InjectionToken('Options.prepare');
Options.EXECUTE = new core_1.InjectionToken('Options.execute');
Options.CAPABILITIES = new core_1.InjectionToken('Options.capabilities');
Options.USER_AGENT = new core_1.InjectionToken('Options.userAgent');
Options.MICRO_METRICS = new core_1.InjectionToken('Options.microMetrics');
Options.USER_METRICS = new core_1.InjectionToken('Options.userMetrics');
Options.NOW = new core_1.InjectionToken('Options.now');
Options.WRITE_FILE = new core_1.InjectionToken('Options.writeFile');
Options.RECEIVED_DATA = new core_1.InjectionToken('Options.receivedData');
Options.REQUEST_COUNT = new core_1.InjectionToken('Options.requestCount');
Options.CAPTURE_FRAMES = new core_1.InjectionToken('Options.frameCapture');
Options.RAW_PERFLOG_PATH = new core_1.InjectionToken('Options.rawPerflogPath');
Options.DEFAULT_PROVIDERS = [
    { provide: Options.DEFAULT_DESCRIPTION, useValue: {} },
    { provide: Options.SAMPLE_DESCRIPTION, useValue: {} },
    { provide: Options.FORCE_GC, useValue: false },
    { provide: Options.PREPARE, useValue: Options.NO_PREPARE },
    { provide: Options.MICRO_METRICS, useValue: {} },
    { provide: Options.USER_METRICS, useValue: {} },
    { provide: Options.NOW, useValue: () => new Date() },
    { provide: Options.RECEIVED_DATA, useValue: false },
    { provide: Options.REQUEST_COUNT, useValue: false },
    { provide: Options.CAPTURE_FRAMES, useValue: false },
    { provide: Options.WRITE_FILE, useValue: writeFile },
    { provide: Options.RAW_PERFLOG_PATH, useValue: null },
];
function writeFile(filename, content) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(filename, content, (error) => {
            if (error) {
                reject(error);
            }
            else {
                resolve();
            }
        });
    });
}
