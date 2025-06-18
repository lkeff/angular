"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵpipe = ɵɵpipe;
exports.ɵɵpipeBind1 = ɵɵpipeBind1;
exports.ɵɵpipeBind2 = ɵɵpipeBind2;
exports.ɵɵpipeBind3 = ɵɵpipeBind3;
exports.ɵɵpipeBind4 = ɵɵpipeBind4;
exports.ɵɵpipeBindV = ɵɵpipeBindV;
const inject_switch_1 = require("../di/inject_switch");
const errors_1 = require("../errors");
const injector_profiler_1 = require("./debug/injector_profiler");
const definition_factory_1 = require("./definition_factory");
const di_1 = require("./di");
const all_1 = require("./instructions/all");
const element_validation_1 = require("./instructions/element_validation");
const view_1 = require("./interfaces/view");
const pure_function_1 = require("./pure_function");
const state_1 = require("./state");
const view_utils_1 = require("./util/view_utils");
/**
 * Create a pipe.
 *
 * @param index Pipe index where the pipe will be stored.
 * @param pipeName The name of the pipe
 * @returns T the instance of the pipe.
 *
 * @codeGenApi
 */
function ɵɵpipe(index, pipeName) {
    var _a;
    const tView = (0, state_1.getTView)();
    let pipeDef;
    const adjustedIndex = index + view_1.HEADER_OFFSET;
    if (tView.firstCreatePass) {
        // The `getPipeDef` throws if a pipe with a given name is not found
        // (so we use non-null assertion below).
        pipeDef = getPipeDef(pipeName, tView.pipeRegistry);
        tView.data[adjustedIndex] = pipeDef;
        if (pipeDef.onDestroy) {
            ((_a = tView.destroyHooks) !== null && _a !== void 0 ? _a : (tView.destroyHooks = [])).push(adjustedIndex, pipeDef.onDestroy);
        }
    }
    else {
        pipeDef = tView.data[adjustedIndex];
    }
    const pipeFactory = pipeDef.factory || (pipeDef.factory = (0, definition_factory_1.getFactoryDef)(pipeDef.type, true));
    let previousInjectorProfilerContext;
    if (ngDevMode) {
        previousInjectorProfilerContext = (0, injector_profiler_1.setInjectorProfilerContext)({
            injector: new di_1.NodeInjector((0, state_1.getCurrentTNode)(), (0, state_1.getLView)()),
            token: pipeDef.type,
        });
    }
    const previousInjectImplementation = (0, inject_switch_1.setInjectImplementation)(all_1.ɵɵdirectiveInject);
    try {
        // DI for pipes is supposed to behave like directives when placed on a component
        // host node, which means that we have to disable access to `viewProviders`.
        const previousIncludeViewProviders = (0, di_1.setIncludeViewProviders)(false);
        const pipeInstance = pipeFactory();
        (0, di_1.setIncludeViewProviders)(previousIncludeViewProviders);
        (0, all_1.store)(tView, (0, state_1.getLView)(), adjustedIndex, pipeInstance);
        return pipeInstance;
    }
    finally {
        // we have to restore the injector implementation in finally, just in case the creation of the
        // pipe throws an error.
        (0, inject_switch_1.setInjectImplementation)(previousInjectImplementation);
        ngDevMode && (0, injector_profiler_1.setInjectorProfilerContext)(previousInjectorProfilerContext);
    }
}
/**
 * Searches the pipe registry for a pipe with the given name. If one is found,
 * returns the pipe. Otherwise, an error is thrown because the pipe cannot be resolved.
 *
 * @param name Name of pipe to resolve
 * @param registry Full list of available pipes
 * @returns Matching PipeDef
 */
function getPipeDef(name, registry) {
    if (registry) {
        if (ngDevMode) {
            const pipes = registry.filter((pipe) => pipe.name === name);
            // TODO: Throw an error in the next major
            if (pipes.length > 1) {
                console.warn((0, errors_1.formatRuntimeError)(313 /* RuntimeErrorCode.MULTIPLE_MATCHING_PIPES */, getMultipleMatchingPipesMessage(name)));
            }
        }
        for (let i = registry.length - 1; i >= 0; i--) {
            const pipeDef = registry[i];
            if (name === pipeDef.name) {
                return pipeDef;
            }
        }
    }
    if (ngDevMode) {
        throw new errors_1.RuntimeError(-302 /* RuntimeErrorCode.PIPE_NOT_FOUND */, getPipeNotFoundErrorMessage(name));
    }
    return;
}
/**
 * Generates a helpful error message for the user when multiple pipes match the name.
 *
 * @param name Name of the pipe
 * @returns The error message
 */
function getMultipleMatchingPipesMessage(name) {
    const lView = (0, state_1.getLView)();
    const declarationLView = lView[view_1.DECLARATION_COMPONENT_VIEW];
    const context = declarationLView[view_1.CONTEXT];
    const hostIsStandalone = (0, element_validation_1.isHostComponentStandalone)(lView);
    const componentInfoMessage = context ? ` in the '${context.constructor.name}' component` : '';
    const verifyMessage = `check ${hostIsStandalone ? "'@Component.imports' of this component" : 'the imports of this module'}`;
    const errorMessage = `Multiple pipes match the name \`${name}\`${componentInfoMessage}. ${verifyMessage}`;
    return errorMessage;
}
/**
 * Generates a helpful error message for the user when a pipe is not found.
 *
 * @param name Name of the missing pipe
 * @returns The error message
 */
function getPipeNotFoundErrorMessage(name) {
    const lView = (0, state_1.getLView)();
    const declarationLView = lView[view_1.DECLARATION_COMPONENT_VIEW];
    const context = declarationLView[view_1.CONTEXT];
    const hostIsStandalone = (0, element_validation_1.isHostComponentStandalone)(lView);
    const componentInfoMessage = context ? ` in the '${context.constructor.name}' component` : '';
    const verifyMessage = `Verify that it is ${hostIsStandalone
        ? "included in the '@Component.imports' of this component"
        : 'declared or imported in this module'}`;
    const errorMessage = `The pipe '${name}' could not be found${componentInfoMessage}. ${verifyMessage}`;
    return errorMessage;
}
/**
 * Invokes a pipe with 1 arguments.
 *
 * This instruction acts as a guard to {@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param index Pipe index where the pipe was stored on creation.
 * @param offset the binding offset
 * @param v1 1st argument to {@link PipeTransform#transform}.
 *
 * @codeGenApi
 */
function ɵɵpipeBind1(index, offset, v1) {
    const adjustedIndex = index + view_1.HEADER_OFFSET;
    const lView = (0, state_1.getLView)();
    const pipeInstance = (0, view_utils_1.load)(lView, adjustedIndex);
    return isPure(lView, adjustedIndex)
        ? (0, pure_function_1.pureFunction1Internal)(lView, (0, state_1.getBindingRoot)(), offset, pipeInstance.transform, v1, pipeInstance)
        : pipeInstance.transform(v1);
}
/**
 * Invokes a pipe with 2 arguments.
 *
 * This instruction acts as a guard to {@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param index Pipe index where the pipe was stored on creation.
 * @param slotOffset the offset in the reserved slot space
 * @param v1 1st argument to {@link PipeTransform#transform}.
 * @param v2 2nd argument to {@link PipeTransform#transform}.
 *
 * @codeGenApi
 */
function ɵɵpipeBind2(index, slotOffset, v1, v2) {
    const adjustedIndex = index + view_1.HEADER_OFFSET;
    const lView = (0, state_1.getLView)();
    const pipeInstance = (0, view_utils_1.load)(lView, adjustedIndex);
    return isPure(lView, adjustedIndex)
        ? (0, pure_function_1.pureFunction2Internal)(lView, (0, state_1.getBindingRoot)(), slotOffset, pipeInstance.transform, v1, v2, pipeInstance)
        : pipeInstance.transform(v1, v2);
}
/**
 * Invokes a pipe with 3 arguments.
 *
 * This instruction acts as a guard to {@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param index Pipe index where the pipe was stored on creation.
 * @param slotOffset the offset in the reserved slot space
 * @param v1 1st argument to {@link PipeTransform#transform}.
 * @param v2 2nd argument to {@link PipeTransform#transform}.
 * @param v3 4rd argument to {@link PipeTransform#transform}.
 *
 * @codeGenApi
 */
function ɵɵpipeBind3(index, slotOffset, v1, v2, v3) {
    const adjustedIndex = index + view_1.HEADER_OFFSET;
    const lView = (0, state_1.getLView)();
    const pipeInstance = (0, view_utils_1.load)(lView, adjustedIndex);
    return isPure(lView, adjustedIndex)
        ? (0, pure_function_1.pureFunction3Internal)(lView, (0, state_1.getBindingRoot)(), slotOffset, pipeInstance.transform, v1, v2, v3, pipeInstance)
        : pipeInstance.transform(v1, v2, v3);
}
/**
 * Invokes a pipe with 4 arguments.
 *
 * This instruction acts as a guard to {@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param index Pipe index where the pipe was stored on creation.
 * @param slotOffset the offset in the reserved slot space
 * @param v1 1st argument to {@link PipeTransform#transform}.
 * @param v2 2nd argument to {@link PipeTransform#transform}.
 * @param v3 3rd argument to {@link PipeTransform#transform}.
 * @param v4 4th argument to {@link PipeTransform#transform}.
 *
 * @codeGenApi
 */
function ɵɵpipeBind4(index, slotOffset, v1, v2, v3, v4) {
    const adjustedIndex = index + view_1.HEADER_OFFSET;
    const lView = (0, state_1.getLView)();
    const pipeInstance = (0, view_utils_1.load)(lView, adjustedIndex);
    return isPure(lView, adjustedIndex)
        ? (0, pure_function_1.pureFunction4Internal)(lView, (0, state_1.getBindingRoot)(), slotOffset, pipeInstance.transform, v1, v2, v3, v4, pipeInstance)
        : pipeInstance.transform(v1, v2, v3, v4);
}
/**
 * Invokes a pipe with variable number of arguments.
 *
 * This instruction acts as a guard to {@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param index Pipe index where the pipe was stored on creation.
 * @param slotOffset the offset in the reserved slot space
 * @param values Array of arguments to pass to {@link PipeTransform#transform} method.
 *
 * @codeGenApi
 */
function ɵɵpipeBindV(index, slotOffset, values) {
    const adjustedIndex = index + view_1.HEADER_OFFSET;
    const lView = (0, state_1.getLView)();
    const pipeInstance = (0, view_utils_1.load)(lView, adjustedIndex);
    return isPure(lView, adjustedIndex)
        ? (0, pure_function_1.pureFunctionVInternal)(lView, (0, state_1.getBindingRoot)(), slotOffset, pipeInstance.transform, values, pipeInstance)
        : pipeInstance.transform.apply(pipeInstance, values);
}
function isPure(lView, index) {
    return lView[view_1.TVIEW].data[index].pure;
}
