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
exports.TerminalHandler = exports.TerminalType = void 0;
const core_1 = require("@angular/core");
const xterm_1 = require("@xterm/xterm");
const addon_fit_1 = require("@xterm/addon-fit");
const interactive_terminal_1 = require("./interactive-terminal");
var TerminalType;
(function (TerminalType) {
    TerminalType[TerminalType["READONLY"] = 0] = "READONLY";
    TerminalType[TerminalType["INTERACTIVE"] = 1] = "INTERACTIVE";
})(TerminalType || (exports.TerminalType = TerminalType = {}));
let TerminalHandler = (() => {
    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TerminalHandler = _classThis = class {
        constructor() {
            this.terminals = {
                // Passing a theme with CSS custom properties colors does not work
                // Because colors are parsed
                // See https://github.com/xtermjs/xterm.js/blob/854e2736f66ca3e5d3ab5a7b65bf3fd6fba8b707/src/browser/services/ThemeService.ts#L125
                [TerminalType.READONLY]: {
                    instance: new xterm_1.Terminal({ convertEol: true, disableStdin: true }),
                    fitAddon: new addon_fit_1.FitAddon(),
                },
                [TerminalType.INTERACTIVE]: {
                    instance: new interactive_terminal_1.InteractiveTerminal(),
                    fitAddon: new addon_fit_1.FitAddon(),
                },
            };
            // Load fitAddon for each terminal instance
            for (const { instance, fitAddon } of Object.values(this.terminals)) {
                instance.loadAddon(fitAddon);
            }
        }
        get readonlyTerminalInstance() {
            return this.terminals[TerminalType.READONLY].instance;
        }
        get interactiveTerminalInstance() {
            return this.terminals[TerminalType.INTERACTIVE].instance;
        }
        registerTerminal(type, element) {
            const terminal = this.terminals[type];
            this.mapTerminalToElement(terminal.instance, terminal.fitAddon, element);
        }
        resizeToFitParent(type) {
            var _a;
            (_a = this.terminals[type]) === null || _a === void 0 ? void 0 : _a.fitAddon.fit();
        }
        clearTerminals() {
            this.terminals[TerminalType.READONLY].instance.clear();
            this.terminals[TerminalType.INTERACTIVE].instance.clear();
        }
        mapTerminalToElement(terminal, fitAddon, element) {
            terminal.open(element);
            fitAddon.fit();
        }
    };
    __setFunctionName(_classThis, "TerminalHandler");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TerminalHandler = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TerminalHandler = _classThis;
})();
exports.TerminalHandler = TerminalHandler;
