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
const testing_1 = require("../../testing");
const render3_1 = require("../../src/render3");
const core_1 = require("../../src/core");
// The `ɵɵattachSourceLocation` calls are produced only in
// AoT so these tests need to "be compiled manually".
describe('attaching source locations', () => {
    it('should attach the source location to DOM nodes', () => {
        // @Component({
        //   selector: 'comp',
        //   template: \`
        //     <div>
        //       <span>
        //         @if (true) {
        //           <strong>Hello</strong>
        //         }
        //       </span>
        //     </div>
        //   \`,
        // })
        // class Comp {}
        function conditionalTemplate(rf) {
            if (rf & 1 /* RenderFlags.Create */) {
                (0, render3_1.ɵɵelementStart)(0, 'strong');
                (0, render3_1.ɵɵtext)(1, 'Hello');
                (0, render3_1.ɵɵelementEnd)();
                (0, render3_1.ɵɵattachSourceLocations)('test.ts', [[0, 240, 9, 22]]);
            }
        }
        class Comp {
        }
        Comp.ɵfac = () => new Comp();
        Comp.ɵcmp = (0, render3_1.ɵɵdefineComponent)({
            type: Comp,
            selectors: [['comp']],
            decls: 3,
            vars: 1,
            template: (rf) => {
                if (rf & 1 /* RenderFlags.Create */) {
                    (0, render3_1.ɵɵelementStart)(0, 'div')(1, 'span');
                    (0, render3_1.ɵɵtemplate)(2, conditionalTemplate, 2, 0, 'strong');
                    (0, render3_1.ɵɵelementEnd)()();
                    (0, render3_1.ɵɵattachSourceLocations)('test.ts', [
                        [0, 154, 6, 16],
                        [1, 178, 7, 18],
                    ]);
                }
                if (rf & 2) {
                    (0, render3_1.ɵɵadvance)(2);
                    (0, render3_1.ɵɵconditional)(true ? 2 : -1);
                }
            },
            encapsulation: 2,
        });
        const fixture = testing_1.TestBed.createComponent(Comp);
        fixture.detectChanges();
        const content = fixture.nativeElement.innerHTML;
        expect(content).toContain('<div data-ng-source-location="test.ts@o:154,l:6,c:16">');
        expect(content).toContain('<span data-ng-source-location="test.ts@o:178,l:7,c:18">');
        expect(content).toContain('<strong data-ng-source-location="test.ts@o:240,l:9,c:22">');
    });
    it('should not match directives on the data-ng-source-location attribute', () => {
        let isUsed = false;
        let Dir = (() => {
            let _classDecorators = [(0, core_1.Directive)({ selector: '[data-ng-source-location]' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Dir = _classThis = class {
                constructor() {
                    isUsed = true;
                }
            };
            __setFunctionName(_classThis, "Dir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Dir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Dir = _classThis;
        })();
        // @Component({
        //   selector: 'comp',
        //   template: '<div></div>',
        //   imports: [Dir],
        // })
        // class Comp {}
        class Comp {
        }
        Comp.ɵfac = () => new Comp();
        Comp.ɵcmp = (0, render3_1.ɵɵdefineComponent)({
            type: Comp,
            selectors: [['comp']],
            dependencies: [Dir],
            decls: 1,
            vars: 0,
            template: (rf) => {
                if (rf & 1) {
                    (0, render3_1.ɵɵelement)(0, 'div');
                    (0, render3_1.ɵɵattachSourceLocations)('test.ts', [[0, 231, 8, 23]]);
                }
            },
            encapsulation: 2,
        });
        const fixture = testing_1.TestBed.createComponent(Comp);
        fixture.detectChanges();
        expect(fixture.nativeElement.innerHTML).toContain('<div data-ng-source-location="test.ts@o:231,l:8,c:23">');
        expect(isUsed).toBe(false);
    });
    it('should not overwrite a pre-existing data-ng-source-location attribute', () => {
        // @Component({
        //   selector: 'comp',
        //   template: '<div data-ng-source-location="pre-existing"></div>',
        // })
        // class Comp {}
        class Comp {
        }
        Comp.ɵfac = () => new Comp();
        Comp.ɵcmp = (0, render3_1.ɵɵdefineComponent)({
            type: Comp,
            selectors: [['comp']],
            decls: 1,
            vars: 0,
            consts: [['data-ng-source-location', 'pre-existing']],
            template: (rf) => {
                if (rf & 1) {
                    (0, render3_1.ɵɵelement)(0, 'div', 0);
                    (0, render3_1.ɵɵattachSourceLocations)('test.ts', [[0, 140, 5, 23]]);
                }
            },
            encapsulation: 2,
        });
        const fixture = testing_1.TestBed.createComponent(Comp);
        fixture.detectChanges();
        expect(fixture.nativeElement.innerHTML).toContain('<div data-ng-source-location="pre-existing">');
    });
});
