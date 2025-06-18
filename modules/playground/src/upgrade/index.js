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
exports.Ng2AppModule = exports.UpgradeApp = exports.Pane = void 0;
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const upgrade_1 = require("@angular/upgrade");
const styles = [
    `
    .border {
      border: solid 2px DodgerBlue;
    }
    .title {
      background-color: LightSkyBlue;
      padding: .2em 1em;
      font-size: 1.2em;
    }
    .content {
      padding: 1em;
    }
  `,
];
const adapter = new upgrade_1.UpgradeAdapter((0, core_1.forwardRef)(() => Ng2AppModule));
const ng1module = angular.module('myExample', []);
ng1module.controller('Index', function ($scope) {
    $scope.name = 'World';
});
ng1module.directive('ng1User', function () {
    return {
        scope: { handle: '@', reset: '&' },
        template: `
      User: {{handle}}
      <hr>
      <button ng-click="reset()">clear</button>`,
    };
});
let Pane = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'pane',
            template: `<div class="border">
    <div class="title">{{ title }}</div>
    <div class="content"><ng-content></ng-content></div>
  </div>`,
            styles: styles,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _title_decorators;
    let _title_initializers = [];
    let _title_extraInitializers = [];
    var Pane = _classThis = class {
        constructor() {
            this.title = __runInitializers(this, _title_initializers, void 0);
            __runInitializers(this, _title_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Pane");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _title_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Pane = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Pane = _classThis;
})();
exports.Pane = Pane;
let UpgradeApp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'upgrade-app',
            template: `<div class="border">
    <pane title="Title: {{ user }}">
      <table cellpadding="3">
        <tr>
          <td class="projected-content"><ng-content></ng-content></td>
          <td><ng1-user [handle]="user" (reset)="reset.emit()"></ng1-user></td>
        </tr>
      </table>
    </pane>
  </div>`,
            styles: styles,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _user_decorators;
    let _user_initializers = [];
    let _user_extraInitializers = [];
    let _reset_decorators;
    let _reset_initializers = [];
    let _reset_extraInitializers = [];
    var UpgradeApp = _classThis = class {
        constructor() {
            this.user = __runInitializers(this, _user_initializers, void 0);
            this.reset = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _reset_initializers, new core_1.EventEmitter()));
            __runInitializers(this, _reset_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "UpgradeApp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _user_decorators = [(0, core_1.Input)()];
        _reset_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: obj => "user" in obj, get: obj => obj.user, set: (obj, value) => { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _reset_decorators, { kind: "field", name: "reset", static: false, private: false, access: { has: obj => "reset" in obj, get: obj => obj.reset, set: (obj, value) => { obj.reset = value; } }, metadata: _metadata }, _reset_initializers, _reset_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UpgradeApp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UpgradeApp = _classThis;
})();
exports.UpgradeApp = UpgradeApp;
let Ng2AppModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [Pane, UpgradeApp, adapter.upgradeNg1Component('ng1User')],
            imports: [platform_browser_1.BrowserModule],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Ng2AppModule = _classThis = class {
    };
    __setFunctionName(_classThis, "Ng2AppModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Ng2AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Ng2AppModule = _classThis;
})();
exports.Ng2AppModule = Ng2AppModule;
ng1module.directive('upgradeApp', adapter.downgradeNg2Component(UpgradeApp));
adapter.bootstrap(document.body, ['myExample']);
