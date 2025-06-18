"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitializerApiJitTransform = exports.getDownlevelDecoratorsTransform = void 0;
exports.angularJitApplicationTransform = angularJitApplicationTransform;
const imports_1 = require("../../../imports");
const reflection_1 = require("../../../reflection");
const downlevel_decorators_transform_1 = require("./downlevel_decorators_transform");
const transform_1 = require("./initializer_api_transforms/transform");
var downlevel_decorators_transform_2 = require("./downlevel_decorators_transform");
Object.defineProperty(exports, "getDownlevelDecoratorsTransform", { enumerable: true, get: function () { return downlevel_decorators_transform_2.getDownlevelDecoratorsTransform; } });
var transform_2 = require("./initializer_api_transforms/transform");
Object.defineProperty(exports, "getInitializerApiJitTransform", { enumerable: true, get: function () { return transform_2.getInitializerApiJitTransform; } });
/**
 * JIT transform for Angular applications. Used by the Angular CLI for unit tests and
 * explicit JIT applications.
 *
 * The transforms include:
 *
 *  - A transform for downleveling Angular decorators and Angular-decorated class constructor
 *    parameters for dependency injection. This transform can be used by the CLI for JIT-mode
 *    compilation where constructor parameters and associated Angular decorators should be
 *    downleveled so that apps are not exposed to the ES2015 temporal dead zone limitation
 *    in TypeScript. See https://github.com/angular/angular-cli/pull/14473 for more details.
 *
 *  - A transform for adding `@Input` to signal inputs. Signal inputs cannot be recognized
 *    at runtime using reflection. That is because the class would need to be instantiated-
 *    but is not possible before creation. To fix this for JIT, a decorator is automatically
 *    added that will declare the input as a signal input while also capturing the necessary
 *    metadata
 */
function angularJitApplicationTransform(program, isCore = false, shouldTransformClass) {
    const typeChecker = program.getTypeChecker();
    const reflectionHost = new reflection_1.TypeScriptReflectionHost(typeChecker);
    const importTracker = new imports_1.ImportedSymbolsTracker();
    const downlevelDecoratorTransform = (0, downlevel_decorators_transform_1.getDownlevelDecoratorsTransform)(typeChecker, reflectionHost, [], isCore, 
    /* enableClosureCompiler */ false, shouldTransformClass);
    const initializerApisJitTransform = (0, transform_1.getInitializerApiJitTransform)(reflectionHost, importTracker, isCore, shouldTransformClass);
    return (ctx) => {
        return (sourceFile) => {
            sourceFile = initializerApisJitTransform(ctx)(sourceFile);
            sourceFile = downlevelDecoratorTransform(ctx)(sourceFile);
            return sourceFile;
        };
    };
}
