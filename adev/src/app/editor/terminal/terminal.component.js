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
exports.Terminal = void 0;
const core_1 = require("@angular/core");
const operators_1 = require("rxjs/operators");
const terminal_handler_service_1 = require("./terminal-handler.service");
const rxjs_interop_1 = require("@angular/core/rxjs-interop");
const rxjs_1 = require("rxjs");
let Terminal = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'docs-tutorial-terminal',
            templateUrl: './terminal.component.html',
            styleUrls: ['./terminal.component.scss'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            imports: [],
            // ViewEncapsulation is disabled to allow Xterm.js's styles to be applied
            // to the terminal element.
            encapsulation: core_1.ViewEncapsulation.None,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _type_decorators;
    let _type_initializers = [];
    let _type_extraInitializers = [];
    var Terminal = _classThis = class {
        constructor() {
            this.type = __runInitializers(this, _type_initializers, void 0);
            this.terminalElementRef = (__runInitializers(this, _type_extraInitializers), core_1.viewChild.required('terminalOutput'));
            this.destroyRef = (0, core_1.inject)(core_1.DestroyRef);
            this.terminalHandler = (0, core_1.inject)(terminal_handler_service_1.TerminalHandler);
            this.resize$ = new rxjs_1.Subject();
        }
        ngAfterViewInit() {
            this.terminalHandler.registerTerminal(this.type, this.terminalElementRef().nativeElement);
            this.setResizeObserver();
            this.resize$.pipe((0, operators_1.debounceTime)(50), (0, rxjs_interop_1.takeUntilDestroyed)(this.destroyRef)).subscribe(() => {
                this.handleResize();
            });
        }
        setResizeObserver() {
            const resizeObserver = new ResizeObserver((_) => {
                this.resize$.next();
            });
            resizeObserver.observe(this.terminalElementRef().nativeElement);
            this.destroyRef.onDestroy(() => resizeObserver.disconnect());
        }
        handleResize() {
            this.terminalHandler.resizeToFitParent(this.type);
        }
    };
    __setFunctionName(_classThis, "Terminal");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _type_decorators = [(0, core_1.Input)({ required: true })];
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: obj => "type" in obj, get: obj => obj.type, set: (obj, value) => { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Terminal = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Terminal = _classThis;
})();
exports.Terminal = Terminal;
