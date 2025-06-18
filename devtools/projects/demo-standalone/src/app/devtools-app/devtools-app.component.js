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
exports.DemoDevToolsComponent = void 0;
const core_1 = require("@angular/core");
const protocol_1 = require("protocol");
const iframe_message_bus_1 = require("../../../../../src/iframe-message-bus");
const ng_devtools_1 = require("ng-devtools");
const frame_manager_1 = require("../../../../../projects/ng-devtools/src/lib/application-services/frame_manager");
let DemoDevToolsComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            imports: [ng_devtools_1.DevToolsComponent],
            providers: [
                { provide: frame_manager_1.FrameManager, useFactory: () => frame_manager_1.FrameManager.initialize(null) },
                {
                    provide: protocol_1.MessageBus,
                    useFactory() {
                        return new protocol_1.PriorityAwareMessageBus(new iframe_message_bus_1.IFrameMessageBus('angular-devtools', 'angular-devtools-backend', () => document.querySelector('#sample-app').contentWindow));
                    },
                },
            ],
            styles: [
                `
      iframe {
        height: 340px;
        width: 100%;
        border: 0;
      }

      .devtools-wrapper {
        height: calc(100vh - 345px);
      }
    `,
            ],
            template: `
    <iframe #ref src="demo-app/todos/app" id="sample-app"></iframe>
    <br />
    <div class="devtools-wrapper">
      <ng-devtools></ng-devtools>
    </div>
  `,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _iframe_decorators;
    let _iframe_initializers = [];
    let _iframe_extraInitializers = [];
    var DemoDevToolsComponent = _classThis = class {
        constructor() {
            this.messageBus = null;
            this.iframe = __runInitializers(this, _iframe_initializers, void 0);
            __runInitializers(this, _iframe_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "DemoDevToolsComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _iframe_decorators = [(0, core_1.ViewChild)('ref')];
        __esDecorate(null, null, _iframe_decorators, { kind: "field", name: "iframe", static: false, private: false, access: { has: obj => "iframe" in obj, get: obj => obj.iframe, set: (obj, value) => { obj.iframe = value; } }, metadata: _metadata }, _iframe_initializers, _iframe_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DemoDevToolsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DemoDevToolsComponent = _classThis;
})();
exports.DemoDevToolsComponent = DemoDevToolsComponent;
