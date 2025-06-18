"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fullLabelsMap = exports.shortLabelsMap = exports.ApiLabel = void 0;
const core_1 = require("@angular/core");
const api_item_type_1 = require("../interfaces/api-item-type");
let ApiLabel = (() => {
    let _classDecorators = [(0, core_1.Pipe)({
            name: 'adevApiLabel',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ApiLabel = _classThis = class {
        transform(value, labelType) {
            return labelType === 'full' ? exports.fullLabelsMap[value] : exports.shortLabelsMap[value];
        }
    };
    __setFunctionName(_classThis, "ApiLabel");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ApiLabel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ApiLabel = _classThis;
})();
exports.ApiLabel = ApiLabel;
exports.shortLabelsMap = {
    [api_item_type_1.ApiItemType.BLOCK]: 'B',
    [api_item_type_1.ApiItemType.CLASS]: 'C',
    [api_item_type_1.ApiItemType.CONST]: 'K',
    [api_item_type_1.ApiItemType.DECORATOR]: '@',
    [api_item_type_1.ApiItemType.DIRECTIVE]: 'D',
    [api_item_type_1.ApiItemType.ELEMENT]: 'El',
    [api_item_type_1.ApiItemType.ENUM]: 'E',
    [api_item_type_1.ApiItemType.FUNCTION]: 'F',
    [api_item_type_1.ApiItemType.INTERFACE]: 'I',
    [api_item_type_1.ApiItemType.PIPE]: 'P',
    [api_item_type_1.ApiItemType.NG_MODULE]: 'M',
    [api_item_type_1.ApiItemType.TYPE_ALIAS]: 'T',
    [api_item_type_1.ApiItemType.INITIALIZER_API_FUNCTION]: 'IA',
};
exports.fullLabelsMap = {
    [api_item_type_1.ApiItemType.BLOCK]: 'Block',
    [api_item_type_1.ApiItemType.CLASS]: 'Class',
    [api_item_type_1.ApiItemType.CONST]: 'Const',
    [api_item_type_1.ApiItemType.DECORATOR]: 'Decorator',
    [api_item_type_1.ApiItemType.DIRECTIVE]: 'Directive',
    [api_item_type_1.ApiItemType.ELEMENT]: 'Element',
    [api_item_type_1.ApiItemType.ENUM]: 'Enum',
    [api_item_type_1.ApiItemType.FUNCTION]: 'Function',
    [api_item_type_1.ApiItemType.INTERFACE]: 'Interface',
    [api_item_type_1.ApiItemType.PIPE]: 'Pipe',
    [api_item_type_1.ApiItemType.NG_MODULE]: 'Module',
    [api_item_type_1.ApiItemType.TYPE_ALIAS]: 'Type Alias',
    [api_item_type_1.ApiItemType.INITIALIZER_API_FUNCTION]: 'Initializer API',
};
