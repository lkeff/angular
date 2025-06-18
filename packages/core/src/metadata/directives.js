"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostListener = exports.HostBinding = exports.Output = exports.Input = exports.Pipe = exports.Component = exports.Directive = void 0;
const constants_1 = require("../change_detection/constants");
const directive_1 = require("../render3/jit/directive");
const pipe_1 = require("../render3/jit/pipe");
const decorators_1 = require("../util/decorators");
/**
 * Type of the Directive metadata.
 *
 * @publicApi
 */
exports.Directive = (0, decorators_1.makeDecorator)('Directive', (dir = {}) => dir, undefined, undefined, (type, meta) => (0, directive_1.compileDirective)(type, meta));
/**
 * Component decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
exports.Component = (0, decorators_1.makeDecorator)('Component', (c = {}) => (Object.assign({ changeDetection: constants_1.ChangeDetectionStrategy.Default }, c)), exports.Directive, undefined, (type, meta) => (0, directive_1.compileComponent)(type, meta));
/**
 * @Annotation
 * @publicApi
 */
exports.Pipe = (0, decorators_1.makeDecorator)('Pipe', (p) => (Object.assign({ pure: true }, p)), undefined, undefined, (type, meta) => (0, pipe_1.compilePipe)(type, meta));
/**
 * @Annotation
 * @publicApi
 */
exports.Input = (0, decorators_1.makePropDecorator)('Input', (arg) => {
    if (!arg) {
        return {};
    }
    return typeof arg === 'string' ? { alias: arg } : arg;
});
/**
 * @Annotation
 * @publicApi
 */
exports.Output = (0, decorators_1.makePropDecorator)('Output', (alias) => ({ alias }));
/**
 * @Annotation
 * @publicApi
 */
exports.HostBinding = (0, decorators_1.makePropDecorator)('HostBinding', (hostPropertyName) => ({ hostPropertyName }));
/**
 * @Annotation
 * @publicApi
 */
exports.HostListener = (0, decorators_1.makePropDecorator)('HostListener', (eventName, args) => ({ eventName, args }));
