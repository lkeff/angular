"use strict";
/**
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
exports.PropertyEditorComponent = void 0;
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
var PropertyEditorState;
(function (PropertyEditorState) {
    PropertyEditorState[PropertyEditorState["Read"] = 0] = "Read";
    PropertyEditorState[PropertyEditorState["Write"] = 1] = "Write";
})(PropertyEditorState || (PropertyEditorState = {}));
const parseValue = (value) => {
    try {
        return JSON.parse(value);
    }
    catch (_a) {
        return value.toString();
    }
};
let PropertyEditorComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            templateUrl: './property-editor.component.html',
            selector: 'ng-property-editor',
            styleUrls: ['./property-editor.component.scss'],
            imports: [forms_1.FormsModule],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PropertyEditorComponent = _classThis = class {
        constructor() {
            this.key = core_1.input.required();
            this.initialValue = core_1.input.required();
            this.containerType = (0, core_1.input)();
            this.updateValue = (0, core_1.output)();
            this.inputEl = (0, core_1.viewChild)('inputEl');
            this.readState = PropertyEditorState.Read;
            this.writeState = PropertyEditorState.Write;
            this.valueToSubmit = (0, core_1.signal)(undefined);
            this.currentPropertyState = (0, core_1.signal)(this.readState);
            (0, core_1.afterNextRender)({
                read: () => {
                    this.valueToSubmit.set(this.initialValue());
                },
            });
            (0, core_1.effect)(() => {
                var _a;
                const editor = (_a = this.inputEl()) === null || _a === void 0 ? void 0 : _a.nativeElement;
                if (editor && this.currentPropertyState() === this.writeState) {
                    editor.focus();
                    editor.select();
                }
            });
        }
        accept() {
            const parsed = parseValue(this.valueToSubmit());
            this.updateValue.emit(parsed);
            this.currentPropertyState.set(this.readState);
        }
        reject() {
            this.valueToSubmit.set(this.initialValue());
            this.currentPropertyState.set(this.readState);
        }
        onClick() {
            if (this.currentPropertyState() === this.readState) {
                this.currentPropertyState.set(this.writeState);
            }
        }
        onBlur() {
            if (this.currentPropertyState() === this.writeState) {
                this.accept();
            }
        }
    };
    __setFunctionName(_classThis, "PropertyEditorComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PropertyEditorComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PropertyEditorComponent = _classThis;
})();
exports.PropertyEditorComponent = PropertyEditorComponent;
