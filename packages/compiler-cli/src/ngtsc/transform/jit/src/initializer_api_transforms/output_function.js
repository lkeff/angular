"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializerApiOutputTransform = void 0;
const annotations_1 = require("../../../../annotations");
const transform_api_1 = require("./transform_api");
/**
 * Transform that will automatically add an `@Output` decorator for all initializer API
 * outputs in Angular classes. The decorator will capture metadata of the output, such
 * as the alias.
 *
 * This transform is useful for JIT environments. In such environments, such outputs are not
 * statically retrievable at runtime. JIT compilation needs to know about all possible outputs
 * before instantiating directives. A decorator exposes this information to the class without
 * the class needing to be instantiated.
 */
const initializerApiOutputTransform = (member, sourceFile, host, factory, importTracker, importManager, classDecorator, isCore) => {
    var _a, _b;
    // If the field already is decorated, we handle this gracefully and skip it.
    if ((_a = host
        .getDecoratorsOfDeclaration(member.node)) === null || _a === void 0 ? void 0 : _a.some((d) => (0, annotations_1.isAngularDecorator)(d, 'Output', isCore))) {
        return member.node;
    }
    const output = (0, annotations_1.tryParseInitializerBasedOutput)(member, host, importTracker);
    if (output === null) {
        return member.node;
    }
    const newDecorator = factory.createDecorator(factory.createCallExpression((0, transform_api_1.createSyntheticAngularCoreDecoratorAccess)(factory, importManager, classDecorator, sourceFile, 'Output'), undefined, [factory.createStringLiteral(output.metadata.bindingPropertyName)]));
    return factory.updatePropertyDeclaration(member.node, [newDecorator, ...((_b = member.node.modifiers) !== null && _b !== void 0 ? _b : [])], member.node.name, member.node.questionToken, member.node.type, member.node.initializer);
};
exports.initializerApiOutputTransform = initializerApiOutputTransform;
