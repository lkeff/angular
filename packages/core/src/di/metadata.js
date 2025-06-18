"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Host = exports.SkipSelf = exports.Self = exports.Optional = exports.Inject = void 0;
const decorators_1 = require("../util/decorators");
const injector_compatibility_1 = require("./injector_compatibility");
/**
 * Inject decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
exports.Inject = (0, injector_compatibility_1.attachInjectFlag)(
// Disable tslint because `DecoratorFlags` is a const enum which gets inlined.
(0, decorators_1.makeParamDecorator)('Inject', (token) => ({ token })), -1 /* DecoratorFlags.Inject */);
/**
 * Optional decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
exports.Optional = 
// Disable tslint because `InternalInjectFlags` is a const enum which gets inlined.
// tslint:disable-next-line: no-toplevel-property-access
(0, injector_compatibility_1.attachInjectFlag)((0, decorators_1.makeParamDecorator)('Optional'), 8 /* InternalInjectFlags.Optional */);
/**
 * Self decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
exports.Self = 
// Disable tslint because `InternalInjectFlags` is a const enum which gets inlined.
// tslint:disable-next-line: no-toplevel-property-access
(0, injector_compatibility_1.attachInjectFlag)((0, decorators_1.makeParamDecorator)('Self'), 2 /* InternalInjectFlags.Self */);
/**
 * `SkipSelf` decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
exports.SkipSelf = 
// Disable tslint because `InternalInjectFlags` is a const enum which gets inlined.
// tslint:disable-next-line: no-toplevel-property-access
(0, injector_compatibility_1.attachInjectFlag)((0, decorators_1.makeParamDecorator)('SkipSelf'), 4 /* InternalInjectFlags.SkipSelf */);
/**
 * Host decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
exports.Host = 
// Disable tslint because `InternalInjectFlags` is a const enum which gets inlined.
// tslint:disable-next-line: no-toplevel-property-access
(0, injector_compatibility_1.attachInjectFlag)((0, decorators_1.makeParamDecorator)('Host'), 1 /* InternalInjectFlags.Host */);
