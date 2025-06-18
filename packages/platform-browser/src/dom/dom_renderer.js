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
exports.DomRendererFactory2 = exports.REMOVE_STYLES_ON_COMPONENT_DESTROY = exports.CONTENT_ATTR = exports.HOST_ATTR = exports.COMPONENT_VARIABLE = exports.NAMESPACE_URIS = void 0;
exports.shimContentAttribute = shimContentAttribute;
exports.shimHostAttribute = shimHostAttribute;
exports.shimStylesContent = shimStylesContent;
exports.addBaseHrefToCssSourceMap = addBaseHrefToCssSourceMap;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const shared_styles_host_1 = require("./shared_styles_host");
exports.NAMESPACE_URIS = {
    'svg': 'http://www.w3.org/2000/svg',
    'xhtml': 'http://www.w3.org/1999/xhtml',
    'xlink': 'http://www.w3.org/1999/xlink',
    'xml': 'http://www.w3.org/XML/1998/namespace',
    'xmlns': 'http://www.w3.org/2000/xmlns/',
    'math': 'http://www.w3.org/1998/Math/MathML',
};
const COMPONENT_REGEX = /%COMP%/g;
const SOURCEMAP_URL_REGEXP = /\/\*#\s*sourceMappingURL=(.+?)\s*\*\//;
const PROTOCOL_REGEXP = /^https?:/;
exports.COMPONENT_VARIABLE = '%COMP%';
exports.HOST_ATTR = `_nghost-${exports.COMPONENT_VARIABLE}`;
exports.CONTENT_ATTR = `_ngcontent-${exports.COMPONENT_VARIABLE}`;
/**
 * The default value for the `REMOVE_STYLES_ON_COMPONENT_DESTROY` DI token.
 */
const REMOVE_STYLES_ON_COMPONENT_DESTROY_DEFAULT = true;
/**
 * A DI token that indicates whether styles
 * of destroyed components should be removed from DOM.
 *
 * By default, the value is set to `true`.
 * @publicApi
 */
exports.REMOVE_STYLES_ON_COMPONENT_DESTROY = new core_1.InjectionToken(ngDevMode ? 'RemoveStylesOnCompDestroy' : '', {
    providedIn: 'root',
    factory: () => REMOVE_STYLES_ON_COMPONENT_DESTROY_DEFAULT,
});
function shimContentAttribute(componentShortId) {
    return exports.CONTENT_ATTR.replace(COMPONENT_REGEX, componentShortId);
}
function shimHostAttribute(componentShortId) {
    return exports.HOST_ATTR.replace(COMPONENT_REGEX, componentShortId);
}
function shimStylesContent(compId, styles) {
    return styles.map((s) => s.replace(COMPONENT_REGEX, compId));
}
/**
 * Prepends a baseHref to the `sourceMappingURL` within the provided CSS content.
 * If the `sourceMappingURL` contains an inline (encoded) map, the function skips processing.
 *
 * @note For inline stylesheets, the `sourceMappingURL` is relative to the page's origin
 * and not the provided baseHref. This function is needed as when accessing the page with a URL
 * containing two or more segments.
 * For example, if the baseHref is set to `/`, and you visit a URL like `http://localhost/foo/bar`,
 * the map would be requested from `http://localhost/foo/bar/comp.css.map` instead of what you'd expect,
 * which is `http://localhost/comp.css.map`. This behavior is corrected by modifying the `sourceMappingURL`
 * to ensure external source maps are loaded relative to the baseHref.
 *

 * @param baseHref - The base URL to prepend to the `sourceMappingURL`.
 * @param styles - An array of CSS content strings, each potentially containing a `sourceMappingURL`.
 * @returns The updated array of CSS content strings with modified `sourceMappingURL` values,
 * or the original content if no modification is needed.
 */
function addBaseHrefToCssSourceMap(baseHref, styles) {
    if (!baseHref) {
        return styles;
    }
    const absoluteBaseHrefUrl = new URL(baseHref, 'http://localhost');
    return styles.map((cssContent) => {
        if (!cssContent.includes('sourceMappingURL=')) {
            return cssContent;
        }
        return cssContent.replace(SOURCEMAP_URL_REGEXP, (_, sourceMapUrl) => {
            if (sourceMapUrl[0] === '/' ||
                sourceMapUrl.startsWith('data:') ||
                PROTOCOL_REGEXP.test(sourceMapUrl)) {
                return `/*# sourceMappingURL=${sourceMapUrl} */`;
            }
            const { pathname: resolvedSourceMapUrl } = new URL(sourceMapUrl, absoluteBaseHrefUrl);
            return `/*# sourceMappingURL=${resolvedSourceMapUrl} */`;
        });
    });
}
let DomRendererFactory2 = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DomRendererFactory2 = _classThis = class {
        constructor(eventManager, sharedStylesHost, appId, removeStylesOnCompDestroy, doc, platformId, ngZone, nonce = null, tracingService = null) {
            this.eventManager = eventManager;
            this.sharedStylesHost = sharedStylesHost;
            this.appId = appId;
            this.removeStylesOnCompDestroy = removeStylesOnCompDestroy;
            this.doc = doc;
            this.platformId = platformId;
            this.ngZone = ngZone;
            this.nonce = nonce;
            this.tracingService = tracingService;
            this.rendererByCompId = new Map();
            this.platformIsServer = (0, common_1.isPlatformServer)(platformId);
            this.defaultRenderer = new DefaultDomRenderer2(eventManager, doc, ngZone, this.platformIsServer, this.tracingService);
        }
        createRenderer(element, type) {
            if (!element || !type) {
                return this.defaultRenderer;
            }
            if (this.platformIsServer && type.encapsulation === core_1.ViewEncapsulation.ShadowDom) {
                // Domino does not support shadow DOM.
                type = Object.assign(Object.assign({}, type), { encapsulation: core_1.ViewEncapsulation.Emulated });
            }
            const renderer = this.getOrCreateRenderer(element, type);
            // Renderers have different logic due to different encapsulation behaviours.
            // Ex: for emulated, an attribute is added to the element.
            if (renderer instanceof EmulatedEncapsulationDomRenderer2) {
                renderer.applyToHost(element);
            }
            else if (renderer instanceof NoneEncapsulationDomRenderer) {
                renderer.applyStyles();
            }
            return renderer;
        }
        getOrCreateRenderer(element, type) {
            const rendererByCompId = this.rendererByCompId;
            let renderer = rendererByCompId.get(type.id);
            if (!renderer) {
                const doc = this.doc;
                const ngZone = this.ngZone;
                const eventManager = this.eventManager;
                const sharedStylesHost = this.sharedStylesHost;
                const removeStylesOnCompDestroy = this.removeStylesOnCompDestroy;
                const platformIsServer = this.platformIsServer;
                const tracingService = this.tracingService;
                switch (type.encapsulation) {
                    case core_1.ViewEncapsulation.Emulated:
                        renderer = new EmulatedEncapsulationDomRenderer2(eventManager, sharedStylesHost, type, this.appId, removeStylesOnCompDestroy, doc, ngZone, platformIsServer, tracingService);
                        break;
                    case core_1.ViewEncapsulation.ShadowDom:
                        return new ShadowDomRenderer(eventManager, sharedStylesHost, element, type, doc, ngZone, this.nonce, platformIsServer, tracingService);
                    default:
                        renderer = new NoneEncapsulationDomRenderer(eventManager, sharedStylesHost, type, removeStylesOnCompDestroy, doc, ngZone, platformIsServer, tracingService);
                        break;
                }
                rendererByCompId.set(type.id, renderer);
            }
            return renderer;
        }
        ngOnDestroy() {
            this.rendererByCompId.clear();
        }
        /**
         * Used during HMR to clear any cached data about a component.
         * @param componentId ID of the component that is being replaced.
         */
        componentReplaced(componentId) {
            this.rendererByCompId.delete(componentId);
        }
    };
    __setFunctionName(_classThis, "DomRendererFactory2");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DomRendererFactory2 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DomRendererFactory2 = _classThis;
})();
exports.DomRendererFactory2 = DomRendererFactory2;
class DefaultDomRenderer2 {
    constructor(eventManager, doc, ngZone, platformIsServer, tracingService) {
        this.eventManager = eventManager;
        this.doc = doc;
        this.ngZone = ngZone;
        this.platformIsServer = platformIsServer;
        this.tracingService = tracingService;
        this.data = Object.create(null);
        /**
         * By default this renderer throws when encountering synthetic properties
         * This can be disabled for example by the AsyncAnimationRendererFactory
         */
        this.throwOnSyntheticProps = true;
        this.destroyNode = null;
    }
    destroy() { }
    createElement(name, namespace) {
        if (namespace) {
            // TODO: `|| namespace` was added in
            // https://github.com/angular/angular/commit/2b9cc8503d48173492c29f5a271b61126104fbdb to
            // support how Ivy passed around the namespace URI rather than short name at the time. It did
            // not, however extend the support to other parts of the system (setAttribute, setAttribute,
            // and the ServerRenderer). We should decide what exactly the semantics for dealing with
            // namespaces should be and make it consistent.
            // Related issues:
            // https://github.com/angular/angular/issues/44028
            // https://github.com/angular/angular/issues/44883
            return this.doc.createElementNS(exports.NAMESPACE_URIS[namespace] || namespace, name);
        }
        return this.doc.createElement(name);
    }
    createComment(value) {
        return this.doc.createComment(value);
    }
    createText(value) {
        return this.doc.createTextNode(value);
    }
    appendChild(parent, newChild) {
        const targetParent = isTemplateNode(parent) ? parent.content : parent;
        targetParent.appendChild(newChild);
    }
    insertBefore(parent, newChild, refChild) {
        if (parent) {
            const targetParent = isTemplateNode(parent) ? parent.content : parent;
            targetParent.insertBefore(newChild, refChild);
        }
    }
    removeChild(_parent, oldChild) {
        oldChild.remove();
    }
    selectRootElement(selectorOrNode, preserveContent) {
        let el = typeof selectorOrNode === 'string' ? this.doc.querySelector(selectorOrNode) : selectorOrNode;
        if (!el) {
            throw new core_1.ɵRuntimeError(-5104 /* RuntimeErrorCode.ROOT_NODE_NOT_FOUND */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
                `The selector "${selectorOrNode}" did not match any elements`);
        }
        if (!preserveContent) {
            el.textContent = '';
        }
        return el;
    }
    parentNode(node) {
        return node.parentNode;
    }
    nextSibling(node) {
        return node.nextSibling;
    }
    setAttribute(el, name, value, namespace) {
        if (namespace) {
            name = namespace + ':' + name;
            const namespaceUri = exports.NAMESPACE_URIS[namespace];
            if (namespaceUri) {
                el.setAttributeNS(namespaceUri, name, value);
            }
            else {
                el.setAttribute(name, value);
            }
        }
        else {
            el.setAttribute(name, value);
        }
    }
    removeAttribute(el, name, namespace) {
        if (namespace) {
            const namespaceUri = exports.NAMESPACE_URIS[namespace];
            if (namespaceUri) {
                el.removeAttributeNS(namespaceUri, name);
            }
            else {
                el.removeAttribute(`${namespace}:${name}`);
            }
        }
        else {
            el.removeAttribute(name);
        }
    }
    addClass(el, name) {
        el.classList.add(name);
    }
    removeClass(el, name) {
        el.classList.remove(name);
    }
    setStyle(el, style, value, flags) {
        if (flags & (core_1.RendererStyleFlags2.DashCase | core_1.RendererStyleFlags2.Important)) {
            el.style.setProperty(style, value, flags & core_1.RendererStyleFlags2.Important ? 'important' : '');
        }
        else {
            el.style[style] = value;
        }
    }
    removeStyle(el, style, flags) {
        if (flags & core_1.RendererStyleFlags2.DashCase) {
            // removeProperty has no effect when used on camelCased properties.
            el.style.removeProperty(style);
        }
        else {
            el.style[style] = '';
        }
    }
    setProperty(el, name, value) {
        if (el == null) {
            return;
        }
        (typeof ngDevMode === 'undefined' || ngDevMode) &&
            this.throwOnSyntheticProps &&
            checkNoSyntheticProp(name, 'property');
        el[name] = value;
    }
    setValue(node, value) {
        node.nodeValue = value;
    }
    listen(target, event, callback, options) {
        var _a;
        (typeof ngDevMode === 'undefined' || ngDevMode) &&
            this.throwOnSyntheticProps &&
            checkNoSyntheticProp(event, 'listener');
        if (typeof target === 'string') {
            target = (0, common_1.ɵgetDOM)().getGlobalEventTarget(this.doc, target);
            if (!target) {
                throw new core_1.ɵRuntimeError(5102 /* RuntimeErrorCode.UNSUPPORTED_EVENT_TARGET */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
                    `Unsupported event target ${target} for event ${event}`);
            }
        }
        let wrappedCallback = this.decoratePreventDefault(callback);
        if ((_a = this.tracingService) === null || _a === void 0 ? void 0 : _a.wrapEventListener) {
            wrappedCallback = this.tracingService.wrapEventListener(target, event, wrappedCallback);
        }
        return this.eventManager.addEventListener(target, event, wrappedCallback, options);
    }
    decoratePreventDefault(eventHandler) {
        // `DebugNode.triggerEventHandler` needs to know if the listener was created with
        // decoratePreventDefault or is a listener added outside the Angular context so it can handle
        // the two differently. In the first case, the special '__ngUnwrap__' token is passed to the
        // unwrap the listener (see below).
        return (event) => {
            // Ivy uses '__ngUnwrap__' as a special token that allows us to unwrap the function
            // so that it can be invoked programmatically by `DebugNode.triggerEventHandler`. The
            // debug_node can inspect the listener toString contents for the existence of this special
            // token. Because the token is a string literal, it is ensured to not be modified by compiled
            // code.
            if (event === '__ngUnwrap__') {
                return eventHandler;
            }
            // Run the event handler inside the ngZone because event handlers are not patched
            // by Zone on the server. This is required only for tests.
            const allowDefaultBehavior = this.platformIsServer
                ? this.ngZone.runGuarded(() => eventHandler(event))
                : eventHandler(event);
            if (allowDefaultBehavior === false) {
                event.preventDefault();
            }
            return undefined;
        };
    }
}
const AT_CHARCODE = (() => '@'.charCodeAt(0))();
function checkNoSyntheticProp(name, nameKind) {
    if (name.charCodeAt(0) === AT_CHARCODE) {
        throw new core_1.ɵRuntimeError(5105 /* RuntimeErrorCode.UNEXPECTED_SYNTHETIC_PROPERTY */, `Unexpected synthetic ${nameKind} ${name} found. Please make sure that:
  - Make sure \`provideAnimationsAsync()\`, \`provideAnimations()\` or \`provideNoopAnimations()\` call was added to a list of providers used to bootstrap an application.
  - There is a corresponding animation configuration named \`${name}\` defined in the \`animations\` field of the \`@Component\` decorator (see https://angular.dev/api/core/Component#animations).`);
    }
}
function isTemplateNode(node) {
    return node.tagName === 'TEMPLATE' && node.content !== undefined;
}
class ShadowDomRenderer extends DefaultDomRenderer2 {
    constructor(eventManager, sharedStylesHost, hostEl, component, doc, ngZone, nonce, platformIsServer, tracingService) {
        var _a, _b;
        super(eventManager, doc, ngZone, platformIsServer, tracingService);
        this.sharedStylesHost = sharedStylesHost;
        this.hostEl = hostEl;
        this.shadowRoot = hostEl.attachShadow({ mode: 'open' });
        this.sharedStylesHost.addHost(this.shadowRoot);
        let styles = component.styles;
        if (ngDevMode) {
            // We only do this in development, as for production users should not add CSS sourcemaps to components.
            const baseHref = (_a = (0, common_1.ɵgetDOM)().getBaseHref(doc)) !== null && _a !== void 0 ? _a : '';
            styles = addBaseHrefToCssSourceMap(baseHref, styles);
        }
        styles = shimStylesContent(component.id, styles);
        for (const style of styles) {
            const styleEl = document.createElement('style');
            if (nonce) {
                styleEl.setAttribute('nonce', nonce);
            }
            styleEl.textContent = style;
            this.shadowRoot.appendChild(styleEl);
        }
        // Apply any external component styles to the shadow root for the component's element.
        // The ShadowDOM renderer uses an alternative execution path for component styles that
        // does not use the SharedStylesHost that other encapsulation modes leverage. Much like
        // the manual addition of embedded styles directly above, any external stylesheets
        // must be manually added here to ensure ShadowDOM components are correctly styled.
        // TODO: Consider reworking the DOM Renderers to consolidate style handling.
        const styleUrls = (_b = component.getExternalStyles) === null || _b === void 0 ? void 0 : _b.call(component);
        if (styleUrls) {
            for (const styleUrl of styleUrls) {
                const linkEl = (0, shared_styles_host_1.createLinkElement)(styleUrl, doc);
                if (nonce) {
                    linkEl.setAttribute('nonce', nonce);
                }
                this.shadowRoot.appendChild(linkEl);
            }
        }
    }
    nodeOrShadowRoot(node) {
        return node === this.hostEl ? this.shadowRoot : node;
    }
    appendChild(parent, newChild) {
        return super.appendChild(this.nodeOrShadowRoot(parent), newChild);
    }
    insertBefore(parent, newChild, refChild) {
        return super.insertBefore(this.nodeOrShadowRoot(parent), newChild, refChild);
    }
    removeChild(_parent, oldChild) {
        return super.removeChild(null, oldChild);
    }
    parentNode(node) {
        return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(node)));
    }
    destroy() {
        this.sharedStylesHost.removeHost(this.shadowRoot);
    }
}
class NoneEncapsulationDomRenderer extends DefaultDomRenderer2 {
    constructor(eventManager, sharedStylesHost, component, removeStylesOnCompDestroy, doc, ngZone, platformIsServer, tracingService, compId) {
        var _a, _b;
        super(eventManager, doc, ngZone, platformIsServer, tracingService);
        this.sharedStylesHost = sharedStylesHost;
        this.removeStylesOnCompDestroy = removeStylesOnCompDestroy;
        let styles = component.styles;
        if (ngDevMode) {
            // We only do this in development, as for production users should not add CSS sourcemaps to components.
            const baseHref = (_a = (0, common_1.ɵgetDOM)().getBaseHref(doc)) !== null && _a !== void 0 ? _a : '';
            styles = addBaseHrefToCssSourceMap(baseHref, styles);
        }
        this.styles = compId ? shimStylesContent(compId, styles) : styles;
        this.styleUrls = (_b = component.getExternalStyles) === null || _b === void 0 ? void 0 : _b.call(component, compId);
    }
    applyStyles() {
        this.sharedStylesHost.addStyles(this.styles, this.styleUrls);
    }
    destroy() {
        if (!this.removeStylesOnCompDestroy) {
            return;
        }
        this.sharedStylesHost.removeStyles(this.styles, this.styleUrls);
    }
}
class EmulatedEncapsulationDomRenderer2 extends NoneEncapsulationDomRenderer {
    constructor(eventManager, sharedStylesHost, component, appId, removeStylesOnCompDestroy, doc, ngZone, platformIsServer, tracingService) {
        const compId = appId + '-' + component.id;
        super(eventManager, sharedStylesHost, component, removeStylesOnCompDestroy, doc, ngZone, platformIsServer, tracingService, compId);
        this.contentAttr = shimContentAttribute(compId);
        this.hostAttr = shimHostAttribute(compId);
    }
    applyToHost(element) {
        this.applyStyles();
        this.setAttribute(element, this.hostAttr, '');
    }
    createElement(parent, name) {
        const el = super.createElement(parent, name);
        super.setAttribute(el, this.contentAttr, '');
        return el;
    }
}
