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
exports.SplitAreaDirective = void 0;
const core_1 = require("@angular/core");
const utils_1 = require("./utils");
let SplitAreaDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: 'as-split-area, [as-split-area]',
            exportAs: 'asSplitArea',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _set_order_decorators;
    let _set_size_decorators;
    let _set_minSize_decorators;
    let _set_maxSize_decorators;
    let _set_lockSize_decorators;
    let _set_visible_decorators;
    var SplitAreaDirective = _classThis = class {
        set order(v) {
            this._order = (0, utils_1.getInputPositiveNumber)(v, null);
            this.split.updateArea(this, true, false);
        }
        get order() {
            return this._order;
        }
        set size(v) {
            this._size = (0, utils_1.getInputPositiveNumber)(v, null);
            this.split.updateArea(this, false, true);
        }
        get size() {
            return this._size;
        }
        set minSize(v) {
            this._minSize = (0, utils_1.getInputPositiveNumber)(v, null);
            this.split.updateArea(this, false, true);
        }
        get minSize() {
            return this._minSize;
        }
        set maxSize(v) {
            this._maxSize = (0, utils_1.getInputPositiveNumber)(v, null);
            this.split.updateArea(this, false, true);
        }
        get maxSize() {
            return this._maxSize;
        }
        set lockSize(v) {
            this._lockSize = (0, utils_1.getInputBoolean)(v);
            this.split.updateArea(this, false, true);
        }
        get lockSize() {
            return this._lockSize;
        }
        set visible(v) {
            this._visible = (0, utils_1.getInputBoolean)(v);
            if (this._visible) {
                this.split.showArea(this);
                this.renderer.removeClass(this.elRef.nativeElement, 'as-hidden');
            }
            else {
                this.split.hideArea(this);
                this.renderer.addClass(this.elRef.nativeElement, 'as-hidden');
            }
        }
        get visible() {
            return this._visible;
        }
        constructor(ngZone, elRef, renderer, split) {
            this.ngZone = (__runInitializers(this, _instanceExtraInitializers), ngZone);
            this.elRef = elRef;
            this.renderer = renderer;
            this.split = split;
            this._order = null;
            ////
            this._size = null;
            ////
            this._minSize = null;
            ////
            this._maxSize = null;
            ////
            this._lockSize = false;
            ////
            this._visible = true;
            this.lockListeners = [];
            this.renderer.addClass(this.elRef.nativeElement, 'as-split-area');
        }
        ngOnInit() {
            this.split.addArea(this);
            this.ngZone.runOutsideAngular(() => {
                this.transitionListener = this.renderer.listen(this.elRef.nativeElement, 'transitionend', (event) => {
                    // Limit only flex-basis transition to trigger the event
                    if (event.propertyName === 'flex-basis') {
                        this.split.notify('transitionEnd', -1);
                    }
                });
            });
        }
        setStyleOrder(value) {
            this.renderer.setStyle(this.elRef.nativeElement, 'order', value);
        }
        setStyleFlex(grow, shrink, basis, isMin, isMax) {
            // Need 3 separated properties to work on IE11
            // (https://github.com/angular/flex-layout/issues/323)
            this.renderer.setStyle(this.elRef.nativeElement, 'flex-grow', grow);
            this.renderer.setStyle(this.elRef.nativeElement, 'flex-shrink', shrink);
            this.renderer.setStyle(this.elRef.nativeElement, 'flex-basis', basis);
            if (isMin === true)
                this.renderer.addClass(this.elRef.nativeElement, 'as-min');
            else
                this.renderer.removeClass(this.elRef.nativeElement, 'as-min');
            if (isMax === true)
                this.renderer.addClass(this.elRef.nativeElement, 'as-max');
            else
                this.renderer.removeClass(this.elRef.nativeElement, 'as-max');
        }
        lockEvents() {
            this.ngZone.runOutsideAngular(() => {
                this.lockListeners.push(this.renderer.listen(this.elRef.nativeElement, 'selectstart', (e) => false));
                this.lockListeners.push(this.renderer.listen(this.elRef.nativeElement, 'dragstart', (e) => false));
            });
        }
        unlockEvents() {
            while (this.lockListeners.length > 0) {
                const fct = this.lockListeners.pop();
                if (fct)
                    fct();
            }
        }
        ngOnDestroy() {
            this.unlockEvents();
            if (this.transitionListener) {
                this.transitionListener();
            }
            this.split.removeArea(this);
        }
    };
    __setFunctionName(_classThis, "SplitAreaDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _set_order_decorators = [(0, core_1.Input)()];
        _set_size_decorators = [(0, core_1.Input)()];
        _set_minSize_decorators = [(0, core_1.Input)()];
        _set_maxSize_decorators = [(0, core_1.Input)()];
        _set_lockSize_decorators = [(0, core_1.Input)()];
        _set_visible_decorators = [(0, core_1.Input)()];
        __esDecorate(_classThis, null, _set_order_decorators, { kind: "setter", name: "order", static: false, private: false, access: { has: obj => "order" in obj, set: (obj, value) => { obj.order = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _set_size_decorators, { kind: "setter", name: "size", static: false, private: false, access: { has: obj => "size" in obj, set: (obj, value) => { obj.size = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _set_minSize_decorators, { kind: "setter", name: "minSize", static: false, private: false, access: { has: obj => "minSize" in obj, set: (obj, value) => { obj.minSize = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _set_maxSize_decorators, { kind: "setter", name: "maxSize", static: false, private: false, access: { has: obj => "maxSize" in obj, set: (obj, value) => { obj.maxSize = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _set_lockSize_decorators, { kind: "setter", name: "lockSize", static: false, private: false, access: { has: obj => "lockSize" in obj, set: (obj, value) => { obj.lockSize = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _set_visible_decorators, { kind: "setter", name: "visible", static: false, private: false, access: { has: obj => "visible" in obj, set: (obj, value) => { obj.visible = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SplitAreaDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SplitAreaDirective = _classThis;
})();
exports.SplitAreaDirective = SplitAreaDirective;
