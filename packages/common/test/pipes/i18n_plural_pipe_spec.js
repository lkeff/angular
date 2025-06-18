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
describe('I18nPluralPipe', () => {
    let localization;
    let pipe;
    const mapping = {
        '=0': 'No messages.',
        '=1': 'One message.',
        'many': 'Many messages.',
        'other': 'There are # messages, that is #.',
    };
    beforeEach(() => {
        localization = new TestLocalization();
        pipe = new index_1.I18nPluralPipe(localization);
    });
    describe('transform', () => {
        it('should return 0 text if value is 0', () => {
            const val = pipe.transform(0, mapping);
            expect(val).toEqual('No messages.');
        });
        it('should return 1 text if value is 1', () => {
            const val = pipe.transform(1, mapping);
            expect(val).toEqual('One message.');
        });
        it('should return category messages', () => {
            const val = pipe.transform(4, mapping);
            expect(val).toEqual('Many messages.');
        });
        it('should interpolate the value into the text where indicated', () => {
            const val = pipe.transform(6, mapping);
            expect(val).toEqual('There are 6 messages, that is 6.');
        });
        it('should use "" if value is undefined', () => {
            const val = pipe.transform(undefined, mapping);
            expect(val).toEqual('');
        });
        it('should use "" if value is null', () => {
            const val = pipe.transform(null, mapping);
            expect(val).toEqual('');
        });
        it('should not support bad arguments', () => {
            expect(() => pipe.transform(0, 'hey')).toThrowError();
        });
    });
    it('should be available as a standalone pipe', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-component',
                    imports: [index_1.I18nPluralPipe],
                    template: '{{ value | i18nPlural:mapping }}',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor() {
                    this.value = 1;
                    this.mapping = mapping;
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
        expect(content).toBe('One message.');
    });
});
class TestLocalization extends index_1.NgLocalization {
    getPluralCategory(value) {
        return value > 1 && value < 6 ? 'many' : 'other';
    }
}
