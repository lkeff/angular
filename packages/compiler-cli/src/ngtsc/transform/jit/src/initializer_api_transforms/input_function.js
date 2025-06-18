"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.signalInputsTransform = void 0;
const annotations_1 = require("../../../../annotations");
const transform_api_1 = require("./transform_api");
/**
 * Transform that will automatically add an `@Input` decorator for all signal
 * inputs in Angular classes. The decorator will capture metadata of the signal
 * input, derived from the `input()/input.required()` initializer.
 *
 * This transform is useful for JIT environments where signal inputs would like to be
 * used. e.g. for Angular CLI unit testing. In such environments, signal inputs are not
 * statically retrievable at runtime. JIT compilation needs to know about all possible inputs
 * before instantiating directives. A decorator exposes this information to the class without
 * the class needing to be instantiated.
 */
const signalInputsTransform = (member, sourceFile, host, factory, importTracker, importManager, classDecorator, isCore) => {
    var _a, _b;
    // If the field already is decorated, we handle this gracefully and skip it.
    if ((_a = host
        .getDecoratorsOfDeclaration(member.node)) === null || _a === void 0 ? void 0 : _a.some((d) => (0, annotations_1.isAngularDecorator)(d, 'Input', isCore))) {
        return member.node;
    }
    const inputMapping = (0, annotations_1.tryParseSignalInputMapping)(member, host, importTracker);
    if (inputMapping === null) {
        return member.node;
    }
    const fields = {
        'isSignal': factory.createTrue(),
        'alias': factory.createStringLiteral(inputMapping.bindingPropertyName),
        'required': inputMapping.required ? factory.createTrue() : factory.createFalse(),
        // For signal inputs, transforms are captured by the input signal. The runtime will
        // determine whether a transform needs to be run via the input signal, so the `transform`
        // option is always `undefined`.
        'transform': factory.createIdentifier('undefined'),
    };
    const newDecorator = factory.createDecorator(factory.createCallExpression((0, transform_api_1.createSyntheticAngularCoreDecoratorAccess)(factory, importManager, classDecorator, sourceFile, 'Input'), undefined, [
        // Cast to `any` because `isSignal` will be private, and in case this
        // transform is used directly as a pre-compilation step, the decorator should
        // not fail. It is already validated now due to us parsing the input metadata.
        (0, transform_api_1.castAsAny)(factory, factory.createObjectLiteralExpression(Object.entries(fields).map(([name, value]) => factory.createPropertyAssignment(name, value)))),
    ]));
    return factory.updatePropertyDeclaration(member.node, [newDecorator, ...((_b = member.node.modifiers) !== null && _b !== void 0 ? _b : [])], member.name, member.node.questionToken, member.node.type, member.node.initializer);
};
exports.signalInputsTransform = signalInputsTransform;
