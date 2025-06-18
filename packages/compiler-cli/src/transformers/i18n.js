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
exports.i18nGetExtension = i18nGetExtension;
exports.i18nExtract = i18nExtract;
exports.i18nSerialize = i18nSerialize;
const compiler_1 = require("@angular/compiler");
const path = __importStar(require("path"));
function i18nGetExtension(formatName) {
    const format = formatName.toLowerCase();
    switch (format) {
        case 'xmb':
            return 'xmb';
        case 'xlf':
        case 'xlif':
        case 'xliff':
        case 'xlf2':
        case 'xliff2':
            return 'xlf';
    }
    throw new Error(`Unsupported format "${formatName}"`);
}
function i18nExtract(formatName, outFile, host, options, bundle, pathResolve = path.resolve) {
    formatName = formatName || 'xlf';
    // Checks the format and returns the extension
    const ext = i18nGetExtension(formatName);
    const content = i18nSerialize(bundle, formatName, options);
    const dstFile = outFile || `messages.${ext}`;
    const dstPath = pathResolve(options.outDir || options.basePath, dstFile);
    host.writeFile(dstPath, content, false, undefined, []);
    return [dstPath];
}
function i18nSerialize(bundle, formatName, options) {
    const format = formatName.toLowerCase();
    let serializer;
    switch (format) {
        case 'xmb':
            serializer = new compiler_1.Xmb();
            break;
        case 'xliff2':
        case 'xlf2':
            serializer = new compiler_1.Xliff2();
            break;
        case 'xlf':
        case 'xliff':
        default:
            serializer = new compiler_1.Xliff();
    }
    return bundle.write(serializer, getPathNormalizer(options.basePath));
}
function getPathNormalizer(basePath) {
    // normalize source paths by removing the base path and always using "/" as a separator
    return (sourcePath) => {
        sourcePath = basePath ? path.relative(basePath, sourcePath) : sourcePath;
        return sourcePath.split(path.sep).join('/');
    };
}
