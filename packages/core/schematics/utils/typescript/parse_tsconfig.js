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
exports.parseTsconfigFile = parseTsconfigFile;
const path = __importStar(require("path"));
const typescript_1 = __importDefault(require("typescript"));
function parseTsconfigFile(tsconfigPath, basePath) {
    const { config } = typescript_1.default.readConfigFile(tsconfigPath, typescript_1.default.sys.readFile);
    const parseConfigHost = {
        useCaseSensitiveFileNames: typescript_1.default.sys.useCaseSensitiveFileNames,
        fileExists: typescript_1.default.sys.fileExists,
        readDirectory: typescript_1.default.sys.readDirectory,
        readFile: typescript_1.default.sys.readFile,
    };
    // Throw if incorrect arguments are passed to this function. Passing relative base paths
    // results in root directories not being resolved and in later type checking runtime errors.
    // More details can be found here: https://github.com/microsoft/TypeScript/issues/37731.
    if (!path.isAbsolute(basePath)) {
        throw Error('Unexpected relative base path has been specified.');
    }
    return typescript_1.default.parseJsonConfigFileContent(config, parseConfigHost, basePath, {});
}
