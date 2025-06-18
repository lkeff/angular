"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signalModelTransform = void 0;
const typescript_1 = __importDefault(require("typescript"));
const annotations_1 = require("../../../../annotations");
const transform_api_1 = require("./transform_api");
/**
 * Transform that automatically adds `@Input` and `@Output` to members initialized as `model()`.
 * It is useful for JIT environments where models can't be recognized based on the initializer.
 */
const signalModelTransform = (member, sourceFile, host, factory, importTracker, importManager, classDecorator, isCore) => {
    var _a, _b;
    if ((_a = host.getDecoratorsOfDeclaration(member.node)) === null || _a === void 0 ? void 0 : _a.some((d) => {
        return (0, annotations_1.isAngularDecorator)(d, 'Input', isCore) || (0, annotations_1.isAngularDecorator)(d, 'Output', isCore);
    })) {
        return member.node;
    }
    const modelMapping = (0, annotations_1.tryParseSignalModelMapping)(member, host, importTracker);
    if (modelMapping === null) {
        return member.node;
    }
    const inputConfig = factory.createObjectLiteralExpression([
        factory.createPropertyAssignment('isSignal', modelMapping.input.isSignal ? factory.createTrue() : factory.createFalse()),
        factory.createPropertyAssignment('alias', factory.createStringLiteral(modelMapping.input.bindingPropertyName)),
        factory.createPropertyAssignment('required', modelMapping.input.required ? factory.createTrue() : factory.createFalse()),
    ]);
    const inputDecorator = createDecorator('Input', 
    // Config is cast to `any` because `isSignal` will be private, and in case this
    // transform is used directly as a pre-compilation step, the decorator should
    // not fail. It is already validated now due to us parsing the input metadata.
    factory.createAsExpression(inputConfig, factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.AnyKeyword)), classDecorator, factory, sourceFile, importManager);
    const outputDecorator = createDecorator('Output', factory.createStringLiteral(modelMapping.output.bindingPropertyName), classDecorator, factory, sourceFile, importManager);
    return factory.updatePropertyDeclaration(member.node, [inputDecorator, outputDecorator, ...((_b = member.node.modifiers) !== null && _b !== void 0 ? _b : [])], member.node.name, member.node.questionToken, member.node.type, member.node.initializer);
};
exports.signalModelTransform = signalModelTransform;
function createDecorator(name, config, classDecorator, factory, sourceFile, importManager) {
    const callTarget = (0, transform_api_1.createSyntheticAngularCoreDecoratorAccess)(factory, importManager, classDecorator, sourceFile, name);
    return factory.createDecorator(factory.createCallExpression(callTarget, undefined, [config]));
}
