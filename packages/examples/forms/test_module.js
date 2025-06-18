"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestsAppModule = exports.TestsAppComponent = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const formBuilderExample = __importStar(require("./ts/formBuilder/module"));
const nestedFormArrayExample = __importStar(require("./ts/nestedFormArray/module"));
const nestedFormGroupExample = __importStar(require("./ts/nestedFormGroup/module"));
const ngModelGroupExample = __importStar(require("./ts/ngModelGroup/module"));
const radioButtonsExample = __importStar(require("./ts/radioButtons/module"));
const reactiveRadioButtonsExample = __importStar(require("./ts/reactiveRadioButtons/module"));
const reactiveSelectControlExample = __importStar(require("./ts/reactiveSelectControl/module"));
const selectControlExample = __importStar(require("./ts/selectControl/module"));
const simpleFormExample = __importStar(require("./ts/simpleForm/module"));
const simpleFormControlExample = __importStar(require("./ts/simpleFormControl/module"));
const simpleFormGroupExample = __importStar(require("./ts/simpleFormGroup/module"));
const simpleNgModelExample = __importStar(require("./ts/simpleNgModel/module"));
let TestsAppComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'example-app',
            template: '<router-outlet></router-outlet>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestsAppComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "TestsAppComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestsAppComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestsAppComponent = _classThis;
})();
exports.TestsAppComponent = TestsAppComponent;
let TestsAppModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            imports: [
                formBuilderExample.AppModule,
                nestedFormArrayExample.AppModule,
                nestedFormGroupExample.AppModule,
                ngModelGroupExample.AppModule,
                radioButtonsExample.AppModule,
                reactiveRadioButtonsExample.AppModule,
                reactiveSelectControlExample.AppModule,
                selectControlExample.AppModule,
                simpleFormExample.AppModule,
                simpleFormControlExample.AppModule,
                simpleFormGroupExample.AppModule,
                simpleNgModelExample.AppModule,
                // Router configuration so that the individual e2e tests can load their
                // app components.
                router_1.RouterModule.forRoot([
                    { path: 'formBuilder', component: formBuilderExample.AppComponent },
                    { path: 'nestedFormArray', component: nestedFormArrayExample.AppComponent },
                    { path: 'nestedFormGroup', component: nestedFormGroupExample.AppComponent },
                    { path: 'ngModelGroup', component: ngModelGroupExample.AppComponent },
                    { path: 'radioButtons', component: radioButtonsExample.AppComponent },
                    { path: 'reactiveRadioButtons', component: reactiveRadioButtonsExample.AppComponent },
                    { path: 'reactiveSelectControl', component: reactiveSelectControlExample.AppComponent },
                    { path: 'selectControl', component: selectControlExample.AppComponent },
                    { path: 'simpleForm', component: simpleFormExample.AppComponent },
                    { path: 'simpleFormControl', component: simpleFormControlExample.AppComponent },
                    { path: 'simpleFormGroup', component: simpleFormGroupExample.AppComponent },
                    { path: 'simpleNgModel', component: simpleNgModelExample.AppComponent },
                ]),
            ],
            declarations: [TestsAppComponent],
            bootstrap: [TestsAppComponent],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestsAppModule = _classThis = class {
    };
    __setFunctionName(_classThis, "TestsAppModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestsAppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestsAppModule = _classThis;
})();
exports.TestsAppModule = TestsAppModule;
