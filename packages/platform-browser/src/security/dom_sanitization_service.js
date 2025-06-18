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
exports.DomSanitizerImpl = exports.DomSanitizer = exports.SecurityContext = void 0;
const core_1 = require("@angular/core");
Object.defineProperty(exports, "SecurityContext", { enumerable: true, get: function () { return core_1.SecurityContext; } });
/**
 * DomSanitizer helps preventing Cross Site Scripting Security bugs (XSS) by sanitizing
 * values to be safe to use in the different DOM contexts.
 *
 * For example, when binding a URL in an `<a [href]="someValue">` hyperlink, `someValue` will be
 * sanitized so that an attacker cannot inject e.g. a `javascript:` URL that would execute code on
 * the website.
 *
 * In specific situations, it might be necessary to disable sanitization, for example if the
 * application genuinely needs to produce a `javascript:` style link with a dynamic value in it.
 * Users can bypass security by constructing a value with one of the `bypassSecurityTrust...`
 * methods, and then binding to that value from the template.
 *
 * These situations should be very rare, and extraordinary care must be taken to avoid creating a
 * Cross Site Scripting (XSS) security bug!
 *
 * When using `bypassSecurityTrust...`, make sure to call the method as early as possible and as
 * close as possible to the source of the value, to make it easy to verify no security bug is
 * created by its use.
 *
 * It is not required (and not recommended) to bypass security if the value is safe, e.g. a URL that
 * does not start with a suspicious protocol, or an HTML snippet that does not contain dangerous
 * code. The sanitizer leaves safe values intact.
 *
 * @security Calling any of the `bypassSecurityTrust...` APIs disables Angular's built-in
 * sanitization for the value passed in. Carefully check and audit all values and code paths going
 * into this call. Make sure any user data is appropriately escaped for this security context.
 * For more detail, see the [Security Guide](https://g.co/ng/security).
 *
 * @publicApi
 */
let DomSanitizer = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root', useExisting: (0, core_1.forwardRef)(() => DomSanitizerImpl) })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DomSanitizer = _classThis = class {
    };
    __setFunctionName(_classThis, "DomSanitizer");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DomSanitizer = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DomSanitizer = _classThis;
})();
exports.DomSanitizer = DomSanitizer;
let DomSanitizerImpl = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = DomSanitizer;
    var DomSanitizerImpl = _classThis = class extends _classSuper {
        constructor(_doc) {
            super();
            this._doc = _doc;
        }
        sanitize(ctx, value) {
            if (value == null)
                return null;
            switch (ctx) {
                case core_1.SecurityContext.NONE:
                    return value;
                case core_1.SecurityContext.HTML:
                    if ((0, core_1.ɵallowSanitizationBypassAndThrow)(value, core_1.ɵBypassType.Html)) {
                        return (0, core_1.ɵunwrapSafeValue)(value);
                    }
                    return (0, core_1.ɵ_sanitizeHtml)(this._doc, String(value)).toString();
                case core_1.SecurityContext.STYLE:
                    if ((0, core_1.ɵallowSanitizationBypassAndThrow)(value, core_1.ɵBypassType.Style)) {
                        return (0, core_1.ɵunwrapSafeValue)(value);
                    }
                    return value;
                case core_1.SecurityContext.SCRIPT:
                    if ((0, core_1.ɵallowSanitizationBypassAndThrow)(value, core_1.ɵBypassType.Script)) {
                        return (0, core_1.ɵunwrapSafeValue)(value);
                    }
                    throw new core_1.ɵRuntimeError(5200 /* RuntimeErrorCode.SANITIZATION_UNSAFE_SCRIPT */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
                        'unsafe value used in a script context');
                case core_1.SecurityContext.URL:
                    if ((0, core_1.ɵallowSanitizationBypassAndThrow)(value, core_1.ɵBypassType.Url)) {
                        return (0, core_1.ɵunwrapSafeValue)(value);
                    }
                    return (0, core_1.ɵ_sanitizeUrl)(String(value));
                case core_1.SecurityContext.RESOURCE_URL:
                    if ((0, core_1.ɵallowSanitizationBypassAndThrow)(value, core_1.ɵBypassType.ResourceUrl)) {
                        return (0, core_1.ɵunwrapSafeValue)(value);
                    }
                    throw new core_1.ɵRuntimeError(5201 /* RuntimeErrorCode.SANITIZATION_UNSAFE_RESOURCE_URL */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
                        `unsafe value used in a resource URL context (see ${core_1.ɵXSS_SECURITY_URL})`);
                default:
                    throw new core_1.ɵRuntimeError(5202 /* RuntimeErrorCode.SANITIZATION_UNEXPECTED_CTX */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
                        `Unexpected SecurityContext ${ctx} (see ${core_1.ɵXSS_SECURITY_URL})`);
            }
        }
        bypassSecurityTrustHtml(value) {
            return (0, core_1.ɵbypassSanitizationTrustHtml)(value);
        }
        bypassSecurityTrustStyle(value) {
            return (0, core_1.ɵbypassSanitizationTrustStyle)(value);
        }
        bypassSecurityTrustScript(value) {
            return (0, core_1.ɵbypassSanitizationTrustScript)(value);
        }
        bypassSecurityTrustUrl(value) {
            return (0, core_1.ɵbypassSanitizationTrustUrl)(value);
        }
        bypassSecurityTrustResourceUrl(value) {
            return (0, core_1.ɵbypassSanitizationTrustResourceUrl)(value);
        }
    };
    __setFunctionName(_classThis, "DomSanitizerImpl");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DomSanitizerImpl = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DomSanitizerImpl = _classThis;
})();
exports.DomSanitizerImpl = DomSanitizerImpl;
