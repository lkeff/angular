"use strict";
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
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
// #docregion mark-for-check
let AppComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-root',
            template: `Number of ticks: {{ numberOfTicks }}`,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AppComponent = _classThis = class {
        constructor(ref) {
            this.ref = ref;
            this.numberOfTicks = 0;
            setInterval(() => {
                this.numberOfTicks++;
                // require view to be updated
                this.ref.markForCheck();
            }, 1000);
        }
    };
    __setFunctionName(_classThis, "AppComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppComponent = _classThis;
})();
// #enddocregion mark-for-check
// #docregion detach
class DataListProvider {
    // in a real application the returned data will be different every time
    get data() {
        return [1, 2, 3, 4, 5];
    }
}
let GiantList = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'giant-list',
            template: ` <li *ngFor="let d of dataProvider.data">Data {{ d }}</li> `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var GiantList = _classThis = class {
        constructor(ref, dataProvider) {
            this.ref = ref;
            this.dataProvider = dataProvider;
            ref.detach();
            setInterval(() => {
                this.ref.detectChanges();
            }, 5000);
        }
    };
    __setFunctionName(_classThis, "GiantList");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GiantList = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GiantList = _classThis;
})();
let App = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app',
            providers: [DataListProvider],
            template: ` <giant-list></giant-list> `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var App = _classThis = class {
    };
    __setFunctionName(_classThis, "App");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        App = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return App = _classThis;
})();
// #enddocregion detach
// #docregion reattach
class DataProvider {
    constructor() {
        this.data = 1;
        setInterval(() => {
            this.data = 2;
        }, 500);
    }
}
let LiveData = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'live-data',
            inputs: ['live'],
            template: 'Data: {{dataProvider.data}}',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _set_live_decorators;
    var LiveData = _classThis = class {
        constructor(ref, dataProvider) {
            this.ref = (__runInitializers(this, _instanceExtraInitializers), ref);
            this.dataProvider = dataProvider;
        }
        set live(value) {
            if (value) {
                this.ref.reattach();
            }
            else {
                this.ref.detach();
            }
        }
    };
    __setFunctionName(_classThis, "LiveData");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _set_live_decorators = [(0, core_1.Input)()];
        __esDecorate(_classThis, null, _set_live_decorators, { kind: "setter", name: "live", static: false, private: false, access: { has: obj => "live" in obj, set: (obj, value) => { obj.live = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LiveData = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LiveData = _classThis;
})();
let App1 = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app',
            providers: [DataProvider],
            template: `
    Live Update: <input type="checkbox" [(ngModel)]="live" />
    <live-data [live]="live"></live-data>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var App1 = _classThis = class {
        constructor() {
            this.live = true;
        }
    };
    __setFunctionName(_classThis, "App1");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        App1 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return App1 = _classThis;
})();
// #enddocregion reattach
let CoreExamplesModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({ declarations: [AppComponent, GiantList, App, LiveData, App1], imports: [forms_1.FormsModule] })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CoreExamplesModule = _classThis = class {
    };
    __setFunctionName(_classThis, "CoreExamplesModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CoreExamplesModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CoreExamplesModule = _classThis;
})();
