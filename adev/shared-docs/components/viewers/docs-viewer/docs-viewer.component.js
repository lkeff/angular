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
exports.DocViewer = exports.GITHUB_CONTENT_URL = exports.DOCS_CODE_MUTLIFILE_SELECTOR = exports.DOCS_CODE_SELECTOR = exports.DOCS_VIEWER_SELECTOR = exports.ASSETS_EXAMPLES_PATH = void 0;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const rxjs_interop_1 = require("@angular/core/rxjs-interop");
const index_1 = require("../../../services/index");
const table_of_contents_component_1 = require("../../table-of-contents/table-of-contents.component");
const icon_component_1 = require("../../icon/icon.component");
const index_2 = require("../../../utils/index");
const router_1 = require("@angular/router");
const rxjs_1 = require("rxjs");
const breadcrumb_component_1 = require("../../breadcrumb/breadcrumb.component");
const copy_source_code_button_component_1 = require("../../copy-source-code-button/copy-source-code-button.component");
const example_viewer_component_1 = require("../example-viewer/example-viewer.component");
const TOC_HOST_ELEMENT_NAME = 'docs-table-of-contents';
exports.ASSETS_EXAMPLES_PATH = 'assets/content/examples';
exports.DOCS_VIEWER_SELECTOR = 'docs-viewer';
exports.DOCS_CODE_SELECTOR = '.docs-code';
exports.DOCS_CODE_MUTLIFILE_SELECTOR = '.docs-code-multifile';
// TODO: Update the branch/sha
exports.GITHUB_CONTENT_URL = 'https://github.com/angular/angular/blob/main/';
let DocViewer = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: exports.DOCS_VIEWER_SELECTOR,
            imports: [common_1.CommonModule],
            template: '',
            styleUrls: ['docs-viewer.component.scss'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            encapsulation: core_1.ViewEncapsulation.None,
            host: {
                '[class.docs-animate-content]': 'animateContent',
            },
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _docContent_decorators;
    let _docContent_initializers = [];
    let _docContent_extraInitializers = [];
    let _hasToc_decorators;
    let _hasToc_initializers = [];
    let _hasToc_extraInitializers = [];
    var DocViewer = _classThis = class {
        constructor() {
            this.docContent = __runInitializers(this, _docContent_initializers, void 0);
            this.hasToc = (__runInitializers(this, _docContent_extraInitializers), __runInitializers(this, _hasToc_initializers, false));
            this.contentLoaded = (__runInitializers(this, _hasToc_extraInitializers), (0, core_1.output)());
            this.destroyRef = (0, core_1.inject)(core_1.DestroyRef);
            this.document = (0, core_1.inject)(common_1.DOCUMENT);
            this.elementRef = (0, core_1.inject)(core_1.ElementRef);
            this.location = (0, core_1.inject)(common_1.Location);
            this.navigationState = (0, core_1.inject)(index_1.NavigationState);
            this.router = (0, core_1.inject)(router_1.Router);
            this.viewContainer = (0, core_1.inject)(core_1.ViewContainerRef);
            this.environmentInjector = (0, core_1.inject)(core_1.EnvironmentInjector);
            this.injector = (0, core_1.inject)(core_1.Injector);
            this.appRef = (0, core_1.inject)(core_1.ApplicationRef);
            this.animateContent = false;
            this.pendingTasks = (0, core_1.inject)(core_1.PendingTasks);
            this.isBrowser = (0, common_1.isPlatformBrowser)((0, core_1.inject)(core_1.PLATFORM_ID));
            this.countOfExamples = 0;
        }
        ngOnChanges(changes) {
            return __awaiter(this, void 0, void 0, function* () {
                const removeTask = this.pendingTasks.add();
                if ('docContent' in changes) {
                    yield this.renderContentsAndRunClientSetup(this.docContent);
                }
                removeTask();
            });
        }
        renderContentsAndRunClientSetup(content) {
            return __awaiter(this, void 0, void 0, function* () {
                const contentContainer = this.elementRef.nativeElement;
                if (content) {
                    if (this.isBrowser && !this.document.startViewTransition) {
                        // Apply a special class to the host node to trigger animation.
                        // Note: when a page is hydrated, the `content` would be empty,
                        // so we don't trigger an animation to avoid a content flickering
                        // visual effect. In addition, if the browser supports view transitions (startViewTransition is present), the animation is handled by the native View Transition API so it does not need to be done here.
                        this.animateContent = true;
                    }
                    contentContainer.innerHTML = content;
                }
                if (this.isBrowser) {
                    // First we setup event listeners on the HTML we just loaded.
                    // We want to do this before things like the example viewers are loaded.
                    this.setupAnchorListeners(contentContainer);
                    // Rewrite relative anchors (hrefs starting with `#`) because relative hrefs are relative to the base URL, which is '/'
                    this.rewriteRelativeAnchors(contentContainer);
                    // In case when content contains placeholders for executable examples, create ExampleViewer components.
                    yield this.loadExamples();
                    // In case when content contains static code snippets, then create buttons
                    // responsible for copy source code.
                    this.loadCopySourceCodeButtons();
                }
                // Display Breadcrumb component if the `<docs-breadcrumb>` element exists
                this.loadBreadcrumb(contentContainer);
                // Display Icon component if the `<docs-icon>` element exists
                this.loadIcons(contentContainer);
                // Render ToC
                this.renderTableOfContents(contentContainer);
                this.contentLoaded.emit();
            });
        }
        /**
         * Load ExampleViewer component when:
         * - exists docs-code-multifile element with multiple files OR
         * - exists docs-code element with single file AND
         *   - 'preview' attribute was provided OR
         *   - 'visibleLines' attribute was provided
         */
        loadExamples() {
            return __awaiter(this, void 0, void 0, function* () {
                const multifileCodeExamples = (Array.from(this.elementRef.nativeElement.querySelectorAll(exports.DOCS_CODE_MUTLIFILE_SELECTOR)));
                for (let placeholder of multifileCodeExamples) {
                    const path = placeholder.getAttribute('path');
                    const snippets = this.getCodeSnippetsFromMultifileWrapper(placeholder);
                    yield this.renderExampleViewerComponents(placeholder, snippets, path);
                }
                const docsCodeElements = this.elementRef.nativeElement.querySelectorAll(exports.DOCS_CODE_SELECTOR);
                for (const placeholder of docsCodeElements) {
                    const snippet = this.getStandaloneCodeSnippet(placeholder);
                    if (snippet) {
                        yield this.renderExampleViewerComponents(placeholder, [snippet], snippet.name);
                    }
                }
            });
        }
        renderTableOfContents(element) {
            var _a;
            if (!this.hasToc) {
                return;
            }
            const firstHeading = element.querySelector('h2,h3[id]');
            if (!firstHeading) {
                return;
            }
            // Since the content of the main area is dynamically created and there is
            // no host element for a ToC component, we create it manually.
            let tocHostElement = element.querySelector(TOC_HOST_ELEMENT_NAME);
            if (!tocHostElement) {
                tocHostElement = this.document.createElement(TOC_HOST_ELEMENT_NAME);
                tocHostElement.setAttribute(index_1.TOC_SKIP_CONTENT_MARKER, 'true');
                (_a = firstHeading === null || firstHeading === void 0 ? void 0 : firstHeading.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(tocHostElement, firstHeading);
            }
            this.renderComponent(table_of_contents_component_1.TableOfContents, tocHostElement, { contentSourceElement: element });
        }
        renderExampleViewerComponents(placeholder, snippets, path) {
            return __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                const preview = Boolean(placeholder.getAttribute('preview'));
                const title = (_a = placeholder.getAttribute('header')) !== null && _a !== void 0 ? _a : undefined;
                const firstCodeSnippetTitle = snippets.length > 0 ? ((_b = snippets[0].title) !== null && _b !== void 0 ? _b : snippets[0].name) : undefined;
                const exampleRef = this.viewContainer.createComponent(example_viewer_component_1.ExampleViewer);
                this.countOfExamples++;
                exampleRef.setInput('metadata', {
                    title: title !== null && title !== void 0 ? title : firstCodeSnippetTitle,
                    path,
                    files: snippets,
                    preview,
                    id: this.countOfExamples,
                });
                exampleRef.instance.githubUrl = `${exports.GITHUB_CONTENT_URL}/${snippets[0].name}`;
                exampleRef.instance.stackblitzUrl = `${exports.ASSETS_EXAMPLES_PATH}/${snippets[0].name}.html`;
                placeholder.parentElement.replaceChild(exampleRef.location.nativeElement, placeholder);
                yield exampleRef.instance.renderExample();
            });
        }
        getCodeSnippetsFromMultifileWrapper(element) {
            const tabs = Array.from(element.querySelectorAll(exports.DOCS_CODE_SELECTOR));
            return tabs.map((tab) => {
                var _a, _b, _c;
                return ({
                    name: (_b = (_a = tab.getAttribute('path')) !== null && _a !== void 0 ? _a : tab.getAttribute('header')) !== null && _b !== void 0 ? _b : '',
                    content: tab.innerHTML,
                    visibleLinesRange: (_c = tab.getAttribute('visibleLines')) !== null && _c !== void 0 ? _c : undefined,
                });
            });
        }
        getStandaloneCodeSnippet(element) {
            var _a, _b;
            const visibleLines = (_a = element.getAttribute('visibleLines')) !== null && _a !== void 0 ? _a : undefined;
            const preview = element.getAttribute('preview');
            if (!visibleLines && !preview) {
                return null;
            }
            const content = element.querySelector('pre');
            const path = element.getAttribute('path');
            const title = (_b = element.getAttribute('header')) !== null && _b !== void 0 ? _b : undefined;
            return {
                title,
                name: path,
                content: content === null || content === void 0 ? void 0 : content.outerHTML,
                visibleLinesRange: visibleLines,
            };
        }
        // If the content contains static code snippets, we should add buttons to copy
        // the code
        loadCopySourceCodeButtons() {
            const staticCodeSnippets = (Array.from(this.elementRef.nativeElement.querySelectorAll('.docs-code:not([mermaid])')));
            for (let codeSnippet of staticCodeSnippets) {
                const copySourceCodeButton = this.viewContainer.createComponent(copy_source_code_button_component_1.CopySourceCodeButton);
                codeSnippet.appendChild(copySourceCodeButton.location.nativeElement);
            }
        }
        loadBreadcrumb(element) {
            const breadcrumbPlaceholder = element.querySelector('docs-breadcrumb');
            const activeNavigationItem = this.navigationState.activeNavigationItem();
            if (breadcrumbPlaceholder && !!(activeNavigationItem === null || activeNavigationItem === void 0 ? void 0 : activeNavigationItem.parent)) {
                this.renderComponent(breadcrumb_component_1.Breadcrumb, breadcrumbPlaceholder);
            }
        }
        loadIcons(element) {
            // We need to make sure that we don't reload the icons in loadCopySourceCodeButtons
            element
                .querySelectorAll('docs-icon:not([docs-copy-source-code] docs-icon)')
                .forEach((iconsPlaceholder) => {
                this.renderComponent(icon_component_1.IconComponent, iconsPlaceholder);
            });
        }
        /**
         * Helper method to render a component dynamically in a context of this class.
         */
        renderComponent(type, hostElement, inputs) {
            const componentRef = (0, core_1.createComponent)(type, {
                hostElement,
                elementInjector: this.injector,
                environmentInjector: this.environmentInjector,
            });
            if (inputs) {
                for (const [name, value] of Object.entries(inputs)) {
                    componentRef.setInput(name, value);
                }
            }
            // Attach a view to the ApplicationRef for change detection
            // purposes and for hydration serialization to pick it up
            // during SSG.
            this.appRef.attachView(componentRef.hostView);
            // This is wrapped with `isBrowser` in for hydration purposes.
            if (this.isBrowser) {
                // The `docs-viewer` may be rendered multiple times when navigating
                // between pages, which will create new components that need to be
                // destroyed for gradual cleanup.
                this.destroyRef.onDestroy(() => componentRef.destroy());
            }
            return componentRef;
        }
        setupAnchorListeners(element) {
            element.querySelectorAll(`a[href]`).forEach((anchor) => {
                // Get the target element's ID from the href attribute
                const url = new URL(anchor.href);
                const isExternalLink = url.origin !== this.document.location.origin;
                if (isExternalLink) {
                    return;
                }
                (0, rxjs_1.fromEvent)(anchor, 'click')
                    .pipe((0, rxjs_interop_1.takeUntilDestroyed)(this.destroyRef))
                    .subscribe((e) => {
                    var _a;
                    const closestAnchor = e.target.closest('a');
                    if ((closestAnchor === null || closestAnchor === void 0 ? void 0 : closestAnchor.target) && closestAnchor.target !== 'self') {
                        return;
                    }
                    const hrefAttr = (_a = closestAnchor === null || closestAnchor === void 0 ? void 0 : closestAnchor.getAttribute) === null || _a === void 0 ? void 0 : _a.call(closestAnchor, 'href');
                    if (!hrefAttr) {
                        return;
                    }
                    let relativeUrl;
                    if (hrefAttr.startsWith('http')) {
                        // Url is absolute but we're targeting the same domain
                        const url = new URL(hrefAttr);
                        relativeUrl = `${url.pathname}${url.hash}${url.search}`;
                    }
                    else {
                        relativeUrl = hrefAttr;
                    }
                    // Unless this is a link to an element within the same page, use the Angular router.
                    // https://github.com/angular/angular/issues/30139
                    const scrollToElementExists = relativeUrl.startsWith(this.location.path() + '#');
                    if (!scrollToElementExists) {
                        (0, index_2.handleHrefClickEventWithRouter)(e, this.router, relativeUrl);
                    }
                });
            });
        }
        rewriteRelativeAnchors(element) {
            for (const anchor of Array.from(element.querySelectorAll(`a[href^="#"]:not(a[download])`))) {
                const url = new URL(anchor.href);
                anchor.href = this.location.path() + url.hash;
            }
        }
    };
    __setFunctionName(_classThis, "DocViewer");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _docContent_decorators = [(0, core_1.Input)()];
        _hasToc_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _docContent_decorators, { kind: "field", name: "docContent", static: false, private: false, access: { has: obj => "docContent" in obj, get: obj => obj.docContent, set: (obj, value) => { obj.docContent = value; } }, metadata: _metadata }, _docContent_initializers, _docContent_extraInitializers);
        __esDecorate(null, null, _hasToc_decorators, { kind: "field", name: "hasToc", static: false, private: false, access: { has: obj => "hasToc" in obj, get: obj => obj.hasToc, set: (obj, value) => { obj.hasToc = value; } }, metadata: _metadata }, _hasToc_initializers, _hasToc_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DocViewer = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DocViewer = _classThis;
})();
exports.DocViewer = DocViewer;
