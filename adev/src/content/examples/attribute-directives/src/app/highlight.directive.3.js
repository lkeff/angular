"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HighlightDirective = void 0;
// #docregion, imports
const core_1 = require("@angular/core");
// #enddocregion imports
let HighlightDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[appHighlight]',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _appHighlight_decorators;
    let _appHighlight_initializers = [];
    let _appHighlight_extraInitializers = [];
    let _onMouseEnter_decorators;
    let _onMouseLeave_decorators;
    var HighlightDirective = _classThis = class {
        // #enddocregion input
        // #docregion mouse-enter
        onMouseEnter() {
            this.highlight(this.appHighlight || 'red');
        }
        // #enddocregion mouse-enter
        onMouseLeave() {
            this.highlight('');
        }
        highlight(color) {
            this.el.nativeElement.style.backgroundColor = color;
        }
        constructor() {
            this.el = (__runInitializers(this, _instanceExtraInitializers), (0, core_1.inject)(core_1.ElementRef));
            // #docregion input
            this.appHighlight = __runInitializers(this, _appHighlight_initializers, '');
            __runInitializers(this, _appHighlight_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "HighlightDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _appHighlight_decorators = [(0, core_1.Input)()];
        _onMouseEnter_decorators = [(0, core_1.HostListener)('mouseenter')];
        _onMouseLeave_decorators = [(0, core_1.HostListener)('mouseleave')];
        __esDecorate(_classThis, null, _onMouseEnter_decorators, { kind: "method", name: "onMouseEnter", static: false, private: false, access: { has: obj => "onMouseEnter" in obj, get: obj => obj.onMouseEnter }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _onMouseLeave_decorators, { kind: "method", name: "onMouseLeave", static: false, private: false, access: { has: obj => "onMouseLeave" in obj, get: obj => obj.onMouseLeave }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _appHighlight_decorators, { kind: "field", name: "appHighlight", static: false, private: false, access: { has: obj => "appHighlight" in obj, get: obj => obj.appHighlight, set: (obj, value) => { obj.appHighlight = value; } }, metadata: _metadata }, _appHighlight_initializers, _appHighlight_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HighlightDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HighlightDirective = _classThis;
})();
exports.HighlightDirective = HighlightDirective;
