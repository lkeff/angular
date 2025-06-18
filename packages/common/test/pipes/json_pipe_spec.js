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
const index_1 = require("../../index");
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
describe('JsonPipe', () => {
    const regNewLine = '\n';
    let inceptionObj;
    let inceptionObjString;
    let pipe;
    function normalize(obj) {
        return obj.replace(regNewLine, '');
    }
    beforeEach(() => {
        inceptionObj = { dream: { dream: { dream: 'Limbo' } } };
        inceptionObjString =
            '{\n' +
                '  "dream": {\n' +
                '    "dream": {\n' +
                '      "dream": "Limbo"\n' +
                '    }\n' +
                '  }\n' +
                '}';
        pipe = new index_1.JsonPipe();
    });
    describe('transform', () => {
        it('should return JSON-formatted string', () => {
            (0, matchers_1.expect)(pipe.transform(inceptionObj)).toEqual(inceptionObjString);
        });
        it('should return JSON-formatted string even when normalized', () => {
            const dream1 = normalize(pipe.transform(inceptionObj));
            const dream2 = normalize(inceptionObjString);
            (0, matchers_1.expect)(dream1).toEqual(dream2);
        });
        it('should return JSON-formatted string similar to Json.stringify', () => {
            const dream1 = normalize(pipe.transform(inceptionObj));
            const dream2 = normalize(JSON.stringify(inceptionObj, null, 2));
            (0, matchers_1.expect)(dream1).toEqual(dream2);
        });
    });
    describe('integration', () => {
        let TestComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-comp',
                    template: '{{data | json}}',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComp = _classThis = class {
            };
            __setFunctionName(_classThis, "TestComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestComp = _classThis;
        })();
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({ declarations: [TestComp], imports: [index_1.CommonModule] });
        });
        it('should work with mutable objects', (0, testing_1.waitForAsync)(() => {
            const fixture = testing_1.TestBed.createComponent(TestComp);
            const mutable = [1];
            fixture.componentInstance.data = mutable;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('[\n  1\n]');
            mutable.push(2);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('[\n  1,\n  2\n]');
        }));
    });
    it('should be available as a standalone pipe', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-component',
                    imports: [index_1.JsonPipe],
                    template: '{{ value | json }}',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.value = { 'a': 1 };
                }
            };
            __setFunctionName(_classThis, "TestComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestComponent = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        const content = fixture.nativeElement.textContent;
        (0, matchers_1.expect)(content.replace(/\s/g, '')).toBe('{"a":1}');
    });
});
