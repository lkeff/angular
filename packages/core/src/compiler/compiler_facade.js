"use strict";
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompilerFacade = getCompilerFacade;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const global_1 = require("../util/global");
__exportStar(require("./compiler_facade_interface"), exports);
function getCompilerFacade(request) {
    const globalNg = global_1.global['ng'];
    if (globalNg && globalNg.ɵcompilerFacade) {
        return globalNg.ɵcompilerFacade;
    }
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
        // Log the type as an error so that a developer can easily navigate to the type from the
        // console.
        console.error(`JIT compilation failed for ${request.kind}`, request.type);
        let message = `The ${request.kind} '${request.type.name}' needs to be compiled using the JIT compiler, but '@angular/compiler' is not available.\n\n`;
        if (request.usage === 1 /* JitCompilerUsage.PartialDeclaration */) {
            message += `The ${request.kind} is part of a library that has been partially compiled.\n`;
            message += `However, the Angular Linker has not processed the library such that JIT compilation is used as fallback.\n`;
            message += '\n';
            message += `Ideally, the library is processed using the Angular Linker to become fully AOT compiled.\n`;
        }
        else {
            message += `JIT compilation is discouraged for production use-cases! Consider using AOT mode instead.\n`;
        }
        message += `Alternatively, the JIT compiler should be loaded by bootstrapping using '@angular/platform-browser-dynamic' or '@angular/platform-server',\n`;
        message += `or manually provide the compiler with 'import "@angular/compiler";' before bootstrapping.`;
        throw new Error(message);
    }
    else {
        throw new Error('JIT compiler unavailable');
    }
}
