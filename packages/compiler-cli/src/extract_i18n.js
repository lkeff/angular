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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainXi18n = mainXi18n;
/**
 * Extract i18n messages from source code
 */
const yargs_1 = __importDefault(require("yargs"));
const main_1 = require("./main");
const api = __importStar(require("./transformers/api"));
function mainXi18n(args, consoleError = console.error) {
    const config = readXi18nCommandLineAndConfiguration(args);
    return (0, main_1.main)(args, consoleError, config, undefined, undefined, undefined);
}
function readXi18nCommandLineAndConfiguration(args) {
    const options = {};
    const parsedArgs = (0, yargs_1.default)(args)
        .option('i18nFormat', { type: 'string' })
        .option('locale', { type: 'string' })
        .option('outFile', { type: 'string' })
        .parseSync();
    if (parsedArgs.outFile)
        options.i18nOutFile = parsedArgs.outFile;
    if (parsedArgs.i18nFormat)
        options.i18nOutFormat = parsedArgs.i18nFormat;
    if (parsedArgs.locale)
        options.i18nOutLocale = parsedArgs.locale;
    const config = (0, main_1.readCommandLineAndConfiguration)(args, options, [
        'outFile',
        'i18nFormat',
        'locale',
    ]);
    // only emit the i18nBundle but nothing else.
    return Object.assign(Object.assign({}, config), { emitFlags: api.EmitFlags.I18nBundle });
}
