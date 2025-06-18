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
exports.DirectiveExplorerComponent = void 0;
const core_1 = require("@angular/core");
const protocol_1 = require("protocol");
const public_api_1 = require("../../../lib/vendor/angular-split/public_api");
const index_1 = require("../../application-operations/index");
const frame_manager_1 = require("../../application-services/frame_manager");
const breadcrumbs_component_1 = require("./directive-forest/breadcrumbs/breadcrumbs.component");
const directive_forest_component_1 = require("./directive-forest/directive-forest.component");
const directive_property_resolver_1 = require("./property-resolver/directive-property-resolver");
const element_property_resolver_1 = require("./property-resolver/element-property-resolver");
const property_tab_component_1 = require("./property-tab/property-tab.component");
const splitArea_directive_1 = require("../../vendor/angular-split/lib/component/splitArea.directive");
const slide_toggle_1 = require("@angular/material/slide-toggle");
const forms_1 = require("@angular/forms");
const platform_1 = require("@angular/cdk/platform");
const snack_bar_1 = require("@angular/material/snack-bar");
const sameDirectives = (a, b) => {
    if ((a.component && !b.component) || (!a.component && b.component)) {
        return false;
    }
    if (a.component && b.component && a.component.id !== b.component.id) {
        return false;
    }
    const aDirectives = new Set(a.directives.map((d) => d.id));
    for (const dir of b.directives) {
        if (!aDirectives.has(dir.id)) {
            return false;
        }
    }
    return true;
};
let DirectiveExplorerComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-directive-explorer',
            templateUrl: './directive-explorer.component.html',
            styleUrls: ['./directive-explorer.component.scss'],
            providers: [
                {
                    provide: element_property_resolver_1.ElementPropertyResolver,
                    useClass: element_property_resolver_1.ElementPropertyResolver,
                },
            ],
            imports: [
                public_api_1.SplitComponent,
                splitArea_directive_1.SplitAreaDirective,
                directive_forest_component_1.DirectiveForestComponent,
                breadcrumbs_component_1.BreadcrumbsComponent,
                property_tab_component_1.PropertyTabComponent,
                slide_toggle_1.MatSlideToggle,
                forms_1.FormsModule,
                snack_bar_1.MatSnackBarModule,
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _isHydrationEnabled_decorators;
    let _isHydrationEnabled_initializers = [];
    let _isHydrationEnabled_extraInitializers = [];
    var DirectiveExplorerComponent = _classThis = class {
        constructor() {
            this.showCommentNodes = (0, core_1.input)(false);
            this.isHydrationEnabled = __runInitializers(this, _isHydrationEnabled_initializers, false);
            this.toggleInspector = (__runInitializers(this, _isHydrationEnabled_extraInitializers), (0, core_1.output)());
            this.directiveForest = core_1.viewChild.required(directive_forest_component_1.DirectiveForestComponent);
            this.splitElementRef = core_1.viewChild.required(public_api_1.SplitComponent, { read: core_1.ElementRef });
            this.directiveForestSplitArea = core_1.viewChild.required('directiveForestSplitArea', {
                read: core_1.ElementRef,
            });
            this.currentSelectedElement = (0, core_1.signal)(null);
            this.forest = (0, core_1.signal)([]);
            this.splitDirection = (0, core_1.signal)('horizontal');
            this.parents = (0, core_1.signal)(null);
            this.showHydrationNodeHighlights = (0, core_1.signal)(false);
            this._clickedElement = null;
            this._refreshRetryTimeout = null;
            this._appOperations = (0, core_1.inject)(index_1.ApplicationOperations);
            this._messageBus = (0, core_1.inject)(protocol_1.MessageBus);
            this._propResolver = (0, core_1.inject)(element_property_resolver_1.ElementPropertyResolver);
            this._frameManager = (0, core_1.inject)(frame_manager_1.FrameManager);
            this.platform = (0, core_1.inject)(platform_1.Platform);
            this.snackBar = (0, core_1.inject)(snack_bar_1.MatSnackBar);
            (0, core_1.afterRenderEffect)((cleanup) => {
                const splitElement = this.splitElementRef().nativeElement;
                const directiveForestSplitArea = this.directiveForestSplitArea().nativeElement;
                const resizeObserver = new ResizeObserver((entries) => {
                    this.refreshHydrationNodeHighlightsIfNeeded();
                    const resizedEntry = entries[0];
                    if (resizedEntry.target === splitElement) {
                        this.splitDirection.set(resizedEntry.contentRect.width <= 500 ? 'vertical' : 'horizontal');
                    }
                });
                resizeObserver.observe(splitElement);
                resizeObserver.observe(directiveForestSplitArea);
                cleanup(() => {
                    resizeObserver.disconnect();
                });
            });
            this.subscribeToBackendEvents();
            this.refresh();
        }
        isNonTopLevelFirefoxFrame() {
            return this.platform.FIREFOX && !this._frameManager.topLevelFrameIsActive();
        }
        handleNodeSelection(node) {
            if (node) {
                // We want to guarantee that we're not reusing any of the previous properties.
                // That's possible if the user has selected an NgForOf and after that
                // they select another NgForOf instance. In this case, we don't want to diff the props
                // we want to render from scratch.
                if (this._clickedElement && !sameDirectives(this._clickedElement, node)) {
                    this._propResolver.clearProperties();
                }
                this._clickedElement = node;
                this._messageBus.emit('setSelectedComponent', [node.position]);
                this.refresh();
            }
            else {
                this._clickedElement = null;
                this.currentSelectedElement.set(null);
            }
        }
        subscribeToBackendEvents() {
            this._messageBus.on('latestComponentExplorerView', (view) => {
                this.forest.set(view.forest);
                this.currentSelectedElement.set(this._clickedElement);
                if (view.properties && this._clickedElement) {
                    this._propResolver.setProperties(this._clickedElement, view.properties);
                }
            });
            this._messageBus.on('componentTreeDirty', () => this.refresh());
        }
        refresh() {
            const success = this._messageBus.emit('getLatestComponentExplorerView', [
                this._constructViewQuery(),
            ]);
            this._messageBus.emit('getRoutes');
            // If the event was not throttled, we no longer need to retry.
            if (success) {
                this._refreshRetryTimeout && clearTimeout(this._refreshRetryTimeout);
                this._refreshRetryTimeout = null;
                return;
            }
            // If the event was throttled and we haven't scheduled a retry yet.
            if (!this._refreshRetryTimeout) {
                this._refreshRetryTimeout = setTimeout(() => this.refresh(), 500);
            }
            this.refreshHydrationNodeHighlightsIfNeeded();
        }
        viewSource(directiveName) {
            // find the index of the directive with directiveName in this.currentSelectedElement.directives
            const selectedEl = this.currentSelectedElement();
            if (!selectedEl)
                return;
            const directiveIndex = selectedEl.directives.findIndex((directive) => directive.name === directiveName);
            const selectedFrame = this._frameManager.selectedFrame();
            if (!this._frameManager.activeFrameHasUniqueUrl()) {
                const error = `The currently inspected frame does not have a unique url on this page. Cannot view source.`;
                this.snackBar.open(error, 'Dismiss', { duration: 5000, horizontalPosition: 'left' });
                this._messageBus.emit('log', [{ level: 'warn', message: error }]);
                return;
            }
            if (this.isNonTopLevelFirefoxFrame()) {
                const error = `Viewing source is not supported in Firefox when the inspected frame is not the top-level frame.`;
                this.snackBar.open(error, 'Dismiss', { duration: 5000, horizontalPosition: 'left' });
                this._messageBus.emit('log', [{ level: 'warn', message: error }]);
            }
            else {
                this._appOperations.viewSource(selectedEl.position, selectedFrame, directiveIndex !== -1 ? directiveIndex : undefined);
            }
        }
        handleSelectDomElement(node) {
            const selectedFrame = this._frameManager.selectedFrame();
            if (!this._frameManager.activeFrameHasUniqueUrl()) {
                const error = `The currently inspected frame does not have a unique url on this page. Cannot select DOM element.`;
                this.snackBar.open(error, 'Dismiss', { duration: 5000, horizontalPosition: 'left' });
                this._messageBus.emit('log', [{ level: 'warn', message: error }]);
                return;
            }
            if (this.isNonTopLevelFirefoxFrame()) {
                const error = `Inspecting a component's DOM element is not supported in Firefox when the inspected frame is not the top-level frame.`;
                this.snackBar.open(error, 'Dismiss', { duration: 5000, horizontalPosition: 'left' });
                this._messageBus.emit('log', [{ level: 'warn', message: error }]);
            }
            else {
                this._appOperations.selectDomElement(node.position, selectedFrame);
            }
        }
        highlight(node) {
            if (!node.original.component) {
                return;
            }
            this._messageBus.emit('createHighlightOverlay', [node.position]);
        }
        unhighlight() {
            this._messageBus.emit('removeHighlightOverlay');
        }
        _constructViewQuery() {
            if (!this._clickedElement) {
                return;
            }
            return {
                selectedElement: this._clickedElement.position,
                propertyQuery: this._getPropertyQuery(),
            };
        }
        _getPropertyQuery() {
            // Here we handle the case when a given element has already been selected.
            // We check if we're dealing with the same instance (i.e., if we have the same
            // set of directives and component on it), if we do, we want to get the same
            // set of properties which are already expanded.
            if (!this._clickedElement ||
                !this.currentSelectedElement() ||
                !sameDirectives(this._clickedElement, this.currentSelectedElement())) {
                return {
                    type: protocol_1.PropertyQueryTypes.All,
                };
            }
            return {
                type: protocol_1.PropertyQueryTypes.Specified,
                properties: this._propResolver.getExpandedProperties() || {},
            };
        }
        highlightComponent(position) {
            this._messageBus.emit('createHighlightOverlay', [position]);
        }
        removeComponentHighlight() {
            this._messageBus.emit('removeHighlightOverlay');
        }
        handleSelect(node) {
            var _a;
            (_a = this.directiveForest()) === null || _a === void 0 ? void 0 : _a.selectAndEnsureVisible(node);
        }
        handleSetParents(parents) {
            this.parents.set(parents);
        }
        inspect({ node, directivePosition, }) {
            const objectPath = (0, directive_property_resolver_1.constructPathOfKeysToPropertyValue)(node.prop);
            const selectedFrame = this._frameManager.selectedFrame();
            if (!this._frameManager.activeFrameHasUniqueUrl()) {
                const error = `The currently inspected frame does not have a unique url on this page. Cannot inspect object.`;
                this.snackBar.open(error, 'Dismiss', { duration: 5000, horizontalPosition: 'left' });
                this._messageBus.emit('log', [{ level: 'warn', message: error }]);
                return;
            }
            if (this.isNonTopLevelFirefoxFrame()) {
                const error = `Inspecting object is not supported in Firefox when the inspected frame is not the top-level frame.`;
                this.snackBar.open(error, 'Dismiss', { duration: 5000, horizontalPosition: 'left' });
                this._messageBus.emit('log', [{ level: 'warn', message: error }]);
            }
            else {
                this._appOperations.inspect(directivePosition, objectPath, selectedFrame);
            }
        }
        hightlightHydrationNodes() {
            this._messageBus.emit('createHydrationOverlay');
        }
        removeHydrationNodesHightlights() {
            this._messageBus.emit('removeHydrationOverlay');
        }
        refreshHydrationNodeHighlightsIfNeeded() {
            if (this.showHydrationNodeHighlights()) {
                this.removeHydrationNodesHightlights();
                this.hightlightHydrationNodes();
            }
        }
    };
    __setFunctionName(_classThis, "DirectiveExplorerComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _isHydrationEnabled_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _isHydrationEnabled_decorators, { kind: "field", name: "isHydrationEnabled", static: false, private: false, access: { has: obj => "isHydrationEnabled" in obj, get: obj => obj.isHydrationEnabled, set: (obj, value) => { obj.isHydrationEnabled = value; } }, metadata: _metadata }, _isHydrationEnabled_initializers, _isHydrationEnabled_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectiveExplorerComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectiveExplorerComponent = _classThis;
})();
exports.DirectiveExplorerComponent = DirectiveExplorerComponent;
