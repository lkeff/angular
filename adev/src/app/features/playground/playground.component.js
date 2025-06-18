"use strict";
/*!
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const rxjs_interop_1 = require("@angular/core/rxjs-interop");
const menu_1 = require("@angular/cdk/menu");
const docs_1 = require("@angular/docs");
const rxjs_1 = require("rxjs");
const inject_async_1 = require("../../core/services/inject-async");
const index_1 = require("../../editor/index");
const routes_json_1 = __importDefault(require("../../../../src/assets/tutorials/playground/routes.json"));
let PlaygroundComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'adev-playground',
            imports: [common_1.NgComponentOutlet, docs_1.IconComponent, menu_1.CdkMenu, menu_1.CdkMenuItem, menu_1.CdkMenuTrigger],
            templateUrl: './playground.component.html',
            styleUrls: [
                './playground.component.scss',
                '../tutorial/tutorial-navigation.scss',
                '../tutorial/tutorial-navigation-list.scss',
            ],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PlaygroundComponent = _classThis = class {
        constructor() {
            this.changeDetectorRef = (0, core_1.inject)(core_1.ChangeDetectorRef);
            this.environmentInjector = (0, core_1.inject)(core_1.EnvironmentInjector);
            this.destroyRef = (0, core_1.inject)(core_1.DestroyRef);
            this.isBrowser = (0, common_1.isPlatformBrowser)((0, core_1.inject)(core_1.PLATFORM_ID));
            this.templates = routes_json_1.default.templates;
            this.defaultTemplate = routes_json_1.default.defaultTemplate;
            this.starterTemplate = routes_json_1.default.starterTemplate;
            this.selectedTemplate = this.defaultTemplate;
        }
        ngAfterViewInit() {
            if (!this.isBrowser) {
                return;
            }
            // If using `async-await`, `this` will be captured until the function is executed
            // and completed, which can lead to a memory leak if the user navigates away from
            // the playground component to another page.
            (0, rxjs_1.forkJoin)({
                nodeRuntimeSandbox: (0, index_1.injectNodeRuntimeSandbox)(this.environmentInjector),
                embeddedEditorComponent: Promise.resolve().then(() => __importStar(require('../../editor/index'))).then((c) => c.EmbeddedEditor),
            })
                .pipe((0, rxjs_1.tap)(({ nodeRuntimeSandbox, embeddedEditorComponent }) => {
                this.nodeRuntimeSandbox = nodeRuntimeSandbox;
                this.embeddedEditorComponent = embeddedEditorComponent;
            }), (0, rxjs_1.switchMap)(() => this.loadTemplate(this.defaultTemplate.path)), (0, rxjs_interop_1.takeUntilDestroyed)(this.destroyRef))
                .subscribe(() => {
                this.changeDetectorRef.markForCheck();
                this.nodeRuntimeSandbox.init();
            });
        }
        newProject() {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.loadTemplate(this.starterTemplate.path);
            });
        }
        changeTemplate(template) {
            return __awaiter(this, void 0, void 0, function* () {
                this.selectedTemplate = template;
                yield this.loadTemplate(template.path);
                yield this.nodeRuntimeSandbox.reset();
            });
        }
        loadTemplate(tutorialPath) {
            return __awaiter(this, void 0, void 0, function* () {
                const embeddedTutorialManager = yield (0, inject_async_1.injectAsync)(this.environmentInjector, () => Promise.resolve().then(() => __importStar(require('../../editor/index'))).then((c) => c.EmbeddedTutorialManager));
                yield embeddedTutorialManager.fetchAndSetTutorialFiles(tutorialPath);
            });
        }
    };
    __setFunctionName(_classThis, "PlaygroundComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PlaygroundComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PlaygroundComponent = _classThis;
})();
exports.default = PlaygroundComponent;
