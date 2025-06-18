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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const rxjs_interop_1 = require("@angular/core/rxjs-interop");
const docs_1 = require("@angular/docs");
const router_1 = require("@angular/router");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const pages_1 = require("../../core/enums/pages");
const index_1 = require("../../editor/index");
const split_resizer_handler_service_1 = require("./split-resizer-handler.service");
const INTRODUCTION_LABEL = 'Introduction';
let Tutorial = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'adev-tutorial',
            imports: [
                common_1.NgComponentOutlet,
                common_1.NgTemplateOutlet,
                docs_1.DocViewer,
                docs_1.NavigationList,
                docs_1.ClickOutside,
                router_1.RouterLink,
                docs_1.IconComponent,
            ],
            templateUrl: './tutorial.component.html',
            styleUrls: [
                './tutorial.component.scss',
                './tutorial-navigation.scss',
                './tutorial-navigation-list.scss',
            ],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            providers: [split_resizer_handler_service_1.SplitResizerHandler],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Tutorial = _classThis = class {
        constructor() {
            this.content = (0, core_1.viewChild)('content');
            this.editor = (0, core_1.viewChild)('editor');
            this.resizer = core_1.viewChild.required('resizer');
            this.revealAnswerButton = (0, core_1.viewChild)('revealAnswerButton');
            this.changeDetectorRef = (0, core_1.inject)(core_1.ChangeDetectorRef);
            this.environmentInjector = (0, core_1.inject)(core_1.EnvironmentInjector);
            this.elementRef = (0, core_1.inject)((core_1.ElementRef));
            this.embeddedTutorialManager = (0, core_1.inject)(index_1.EmbeddedTutorialManager);
            this.nodeRuntimeState = (0, core_1.inject)(index_1.NodeRuntimeState);
            this.route = (0, core_1.inject)(router_1.ActivatedRoute);
            this.splitResizerHandler = (0, core_1.inject)(split_resizer_handler_service_1.SplitResizerHandler);
            this.isBrowser = (0, common_1.isPlatformBrowser)((0, core_1.inject)(core_1.PLATFORM_ID));
            this.documentContent = (0, core_1.signal)(null);
            this.localTutorialZipUrl = (0, core_1.signal)(undefined);
            this.nextTutorialPath = (0, core_1.signal)(null);
            this.stepName = (0, core_1.signal)(null);
            this.tutorialName = (0, core_1.signal)(null);
            this.tutorialNavigationItems = (0, core_1.signal)([]);
            this.showNavigationDropdown = (0, core_1.signal)(false);
            this.shouldRenderContent = (0, core_1.signal)(false);
            this.shouldRenderEmbeddedEditor = (0, core_1.signal)(false);
            this.shouldRenderRevealAnswer = (0, core_1.signal)(false);
            this.canRevealAnswer = (0, core_1.signal)(false);
            this.answerRevealed = (0, core_1.signal)(false);
            this.route.data
                .pipe((0, operators_1.filter)(() => { var _a, _b, _c; return Boolean((_c = (_b = (_a = this.route) === null || _a === void 0 ? void 0 : _a.routeConfig) === null || _b === void 0 ? void 0 : _b.path) === null || _c === void 0 ? void 0 : _c.startsWith(`${pages_1.PagePrefix.TUTORIALS}/`)); }), (0, rxjs_interop_1.takeUntilDestroyed)())
                .subscribe((data) => {
                var _a, _b;
                const docContent = (_b = (_a = data['docContent']) === null || _a === void 0 ? void 0 : _a.contents) !== null && _b !== void 0 ? _b : null;
                this.documentContent.set(docContent);
                this.setTutorialData(data);
            });
            const destroyRef = (0, core_1.inject)(core_1.DestroyRef);
            (0, core_1.afterNextRender)(() => {
                this.splitResizerHandler.init(this.elementRef, this.content(), this.resizer(), this.editor());
                (0, rxjs_1.from)(this.loadEmbeddedEditorComponent())
                    .pipe((0, rxjs_interop_1.takeUntilDestroyed)(destroyRef))
                    .subscribe((editorComponent) => {
                    this.embeddedEditorComponent = editorComponent;
                    this.changeDetectorRef.markForCheck();
                });
            });
        }
        toggleNavigationDropdown($event) {
            // Stop propagation required to avoid detecting click inside ClickOutside
            // directive.
            $event.stopPropagation();
            this.showNavigationDropdown.update((state) => !state);
        }
        hideNavigationDropdown() {
            this.showNavigationDropdown.set(false);
        }
        handleRevealAnswer() {
            return __awaiter(this, void 0, void 0, function* () {
                if (!this.canRevealAnswer())
                    return;
                this.embeddedTutorialManager.revealAnswer();
                const nodeRuntimeSandbox = yield (0, index_1.injectNodeRuntimeSandbox)(this.environmentInjector);
                yield Promise.all(Object.entries(this.embeddedTutorialManager.answerFiles()).map(([path, contents]) => nodeRuntimeSandbox.writeFile(path, contents)));
                this.answerRevealed.set(true);
            });
        }
        handleResetAnswer() {
            return __awaiter(this, void 0, void 0, function* () {
                if (!this.canRevealAnswer())
                    return;
                this.embeddedTutorialManager.resetRevealAnswer();
                const nodeRuntimeSandbox = yield (0, index_1.injectNodeRuntimeSandbox)(this.environmentInjector);
                yield Promise.all(Object.entries(this.embeddedTutorialManager.tutorialFiles()).map(([path, contents]) => nodeRuntimeSandbox.writeFile(path, contents)));
                this.answerRevealed.set(false);
            });
        }
        /**
         * Set tutorial data based on current tutorial
         */
        setTutorialData(tutorialNavigationItem) {
            return __awaiter(this, void 0, void 0, function* () {
                this.showNavigationDropdown.set(false);
                this.answerRevealed.set(false);
                this.setRouteData(tutorialNavigationItem);
                const { tutorialData: routeData } = tutorialNavigationItem;
                if (routeData.type === docs_1.TutorialType.LOCAL) {
                    this.setLocalTutorialData(routeData);
                }
                else if (routeData.type === docs_1.TutorialType.EDITOR && this.isBrowser) {
                    yield this.setEditorTutorialData(tutorialNavigationItem.path.replace(`${pages_1.PagePrefix.TUTORIALS}/`, ''));
                }
            });
        }
        /**
         * Set tutorial data from route data
         */
        setRouteData(tutorialNavigationItem) {
            const { tutorialData: routeData } = tutorialNavigationItem;
            const tutorialName = tutorialNavigationItem.parent
                ? tutorialNavigationItem.parent.label
                : tutorialNavigationItem.label;
            const stepName = routeData.title === tutorialName ? INTRODUCTION_LABEL : routeData.title;
            this.tutorialName.set(tutorialName);
            this.stepName.set(stepName);
            this.tutorialNavigationItems.set(tutorialNavigationItem.parent
                ? [Object.assign(Object.assign({}, tutorialNavigationItem.parent), { label: INTRODUCTION_LABEL })]
                : [Object.assign(Object.assign({}, tutorialNavigationItem), { label: INTRODUCTION_LABEL })]);
            this.shouldRenderContent.set(routeData.type !== docs_1.TutorialType.EDITOR_ONLY);
            this.nextStepPath = routeData.nextStep ? `/${routeData.nextStep}` : undefined;
            this.previousStepPath = routeData.previousStep ? `/${routeData.previousStep}` : undefined;
            this.nextTutorialPath.set(routeData.nextTutorial ? `/${routeData.nextTutorial}` : null);
        }
        /**
         * Set values for tutorials that do not use the embedded editor
         */
        setLocalTutorialData(routeData) {
            this.localTutorialZipUrl.set(routeData.sourceCodeZipPath);
            this.shouldRenderEmbeddedEditor.set(false);
            this.shouldRenderRevealAnswer.set(false);
        }
        /**
         * Set values for tutorials that use the embedded editor
         */
        setEditorTutorialData(tutorialPath) {
            return __awaiter(this, void 0, void 0, function* () {
                this.shouldRenderEmbeddedEditor.set(true);
                const currentTutorial = tutorialPath.replace(`${pages_1.PagePrefix.TUTORIALS}/`, '');
                yield this.embeddedTutorialManager.fetchAndSetTutorialFiles(currentTutorial);
                const hasAnswers = Object.keys(this.embeddedTutorialManager.answerFiles()).length > 0;
                this.shouldRenderRevealAnswer.set(hasAnswers);
                yield this.loadEmbeddedEditor();
            });
        }
        loadEmbeddedEditor() {
            return __awaiter(this, void 0, void 0, function* () {
                const nodeRuntimeSandbox = yield (0, index_1.injectNodeRuntimeSandbox)(this.environmentInjector);
                this.canRevealAnswer = (0, core_1.computed)(() => this.nodeRuntimeState.loadingStep() > index_1.LoadingStep.BOOT);
                yield nodeRuntimeSandbox.init();
            });
        }
        loadEmbeddedEditorComponent() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield Promise.resolve().then(() => __importStar(require('../../editor/index'))).then((c) => c.EmbeddedEditor);
            });
        }
    };
    __setFunctionName(_classThis, "Tutorial");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Tutorial = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Tutorial = _classThis;
})();
exports.default = Tutorial;
