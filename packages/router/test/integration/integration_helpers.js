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
exports.TestModule = exports.LazyComponent = exports.ConditionalThrowingCmp = exports.ThrowingCmp = exports.RootCmpWithNamedOutlet = exports.RootCmpWithTwoOutlets = exports.RootCmpWithOnInit = exports.RootCmp = exports.ComponentRecordingRoutePathAndUrl = exports.DummyLinkWithParentCmp = exports.OutletInNgIf = exports.RelativeLinkInIfCmp = exports.RouteCmp = exports.EmptyQueryParamsCmp = exports.QueryParamsAndFragmentCmp = exports.WrapperCmp = exports.UserCmp = exports.TwoOutletsCmp = exports.TeamCmp = exports.ModuleWithBlankCmpAsRoute = exports.BlankCmp = exports.CollectParamsCmp = exports.SimpleCmp = exports.DivLinkWithState = exports.LinkWithState = exports.LinkWithQueryParamsAndFragment = exports.RelativeLinkCmp = exports.AbsoluteSimpleLinkCmp = exports.DummyLinkCmp = exports.AbsoluteLinkCmp = exports.StringLinkButtonCmp = exports.StringLinkCmp = exports.ROUTER_DIRECTIVES = void 0;
exports.expectEvents = expectEvents;
exports.onlyNavigationStartAndEnd = onlyNavigationStartAndEnd;
exports.advance = advance;
exports.createRoot = createRoot;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const index_1 = require("../../index");
const operators_1 = require("rxjs/operators");
const helpers_1 = require("../helpers");
exports.ROUTER_DIRECTIVES = [index_1.RouterLink, index_1.RouterLinkActive, index_1.RouterOutlet];
function expectEvents(events, pairs) {
    expect(events.length).toEqual(pairs.length);
    for (let i = 0; i < events.length; ++i) {
        expect(events[i].constructor.name).toBe(pairs[i][0].name);
        expect(events[i].url).toBe(pairs[i][1]);
    }
}
function onlyNavigationStartAndEnd(e) {
    return e instanceof index_1.NavigationStart || e instanceof index_1.NavigationEnd;
}
let StringLinkCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'link-cmp',
            template: `<a routerLink="/team/33/simple" [target]="'_self'">link</a>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var StringLinkCmp = _classThis = class {
    };
    __setFunctionName(_classThis, "StringLinkCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StringLinkCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StringLinkCmp = _classThis;
})();
exports.StringLinkCmp = StringLinkCmp;
let StringLinkButtonCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'link-cmp',
            template: `<button routerLink="/team/33/simple">link</button>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var StringLinkButtonCmp = _classThis = class {
    };
    __setFunctionName(_classThis, "StringLinkButtonCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StringLinkButtonCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StringLinkButtonCmp = _classThis;
})();
exports.StringLinkButtonCmp = StringLinkButtonCmp;
let AbsoluteLinkCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'link-cmp',
            template: `<router-outlet></router-outlet><a [routerLink]="['/team/33/simple']">link</a>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AbsoluteLinkCmp = _classThis = class {
    };
    __setFunctionName(_classThis, "AbsoluteLinkCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AbsoluteLinkCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AbsoluteLinkCmp = _classThis;
})();
exports.AbsoluteLinkCmp = AbsoluteLinkCmp;
let DummyLinkCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'link-cmp',
            template: `<router-outlet></router-outlet><a routerLinkActive="active" (isActiveChange)="this.onRouterLinkActivated($event)" [routerLinkActiveOptions]="{exact: exact}" ariaCurrentWhenActive="page" [routerLink]="['./']">link</a>
 <button routerLinkActive="active" [routerLinkActiveOptions]="{exact: exact}" [routerLink]="['./']">button</button>
 `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DummyLinkCmp = _classThis = class {
        constructor(route) {
            this.exact = route.snapshot.paramMap.get('exact') === 'true';
        }
        onRouterLinkActivated(isActive) {
            this.isLinkActivated = isActive;
        }
    };
    __setFunctionName(_classThis, "DummyLinkCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DummyLinkCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DummyLinkCmp = _classThis;
})();
exports.DummyLinkCmp = DummyLinkCmp;
let AbsoluteSimpleLinkCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'link-cmp',
            template: `<a [routerLink]="['/simple']">link</a>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AbsoluteSimpleLinkCmp = _classThis = class {
    };
    __setFunctionName(_classThis, "AbsoluteSimpleLinkCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AbsoluteSimpleLinkCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AbsoluteSimpleLinkCmp = _classThis;
})();
exports.AbsoluteSimpleLinkCmp = AbsoluteSimpleLinkCmp;
let RelativeLinkCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'link-cmp',
            template: `<a [routerLink]="['../simple']">link</a>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RelativeLinkCmp = _classThis = class {
    };
    __setFunctionName(_classThis, "RelativeLinkCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RelativeLinkCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RelativeLinkCmp = _classThis;
})();
exports.RelativeLinkCmp = RelativeLinkCmp;
let LinkWithQueryParamsAndFragment = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'link-cmp',
            template: `<a [routerLink]="['../simple']" [queryParams]="{q: '1'}" fragment="f">link</a>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var LinkWithQueryParamsAndFragment = _classThis = class {
    };
    __setFunctionName(_classThis, "LinkWithQueryParamsAndFragment");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LinkWithQueryParamsAndFragment = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LinkWithQueryParamsAndFragment = _classThis;
})();
exports.LinkWithQueryParamsAndFragment = LinkWithQueryParamsAndFragment;
let LinkWithState = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'link-cmp',
            template: `<a id="link" [routerLink]="['../simple']" [state]="{foo: 'bar'}">link</a>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var LinkWithState = _classThis = class {
    };
    __setFunctionName(_classThis, "LinkWithState");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LinkWithState = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LinkWithState = _classThis;
})();
exports.LinkWithState = LinkWithState;
let DivLinkWithState = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'div-link-cmp',
            template: `<div id="link" [routerLink]="['../simple']" [state]="{foo: 'bar'}">link</div>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DivLinkWithState = _classThis = class {
    };
    __setFunctionName(_classThis, "DivLinkWithState");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DivLinkWithState = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DivLinkWithState = _classThis;
})();
exports.DivLinkWithState = DivLinkWithState;
let SimpleCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'simple-cmp',
            template: `simple`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SimpleCmp = _classThis = class {
    };
    __setFunctionName(_classThis, "SimpleCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SimpleCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SimpleCmp = _classThis;
})();
exports.SimpleCmp = SimpleCmp;
let CollectParamsCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'collect-params-cmp',
            template: `collect-params`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CollectParamsCmp = _classThis = class {
        constructor(route) {
            this.route = route;
            this.params = [];
            this.urls = [];
            route.params.forEach((p) => this.params.push(p));
            route.url.forEach((u) => this.urls.push(u));
        }
        recordedUrls() {
            return this.urls.map((a) => a.map((p) => p.path).join('/'));
        }
    };
    __setFunctionName(_classThis, "CollectParamsCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CollectParamsCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CollectParamsCmp = _classThis;
})();
exports.CollectParamsCmp = CollectParamsCmp;
let BlankCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'blank-cmp',
            template: ``,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var BlankCmp = _classThis = class {
    };
    __setFunctionName(_classThis, "BlankCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BlankCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BlankCmp = _classThis;
})();
exports.BlankCmp = BlankCmp;
let ModuleWithBlankCmpAsRoute = (() => {
    let _classDecorators = [(0, core_1.NgModule)({ imports: [index_1.RouterModule.forChild([{ path: '', component: BlankCmp }])] })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ModuleWithBlankCmpAsRoute = _classThis = class {
    };
    __setFunctionName(_classThis, "ModuleWithBlankCmpAsRoute");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ModuleWithBlankCmpAsRoute = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ModuleWithBlankCmpAsRoute = _classThis;
})();
exports.ModuleWithBlankCmpAsRoute = ModuleWithBlankCmpAsRoute;
let TeamCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'team-cmp',
            template: 'team {{id | async}} ' +
                '[ <router-outlet></router-outlet>, right: <router-outlet name="right"></router-outlet> ]' +
                '<a [routerLink]="routerLink()" skipLocationChange></a>' +
                '<button [routerLink]="routerLink()" skipLocationChange></button>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TeamCmp = _classThis = class {
        constructor(route) {
            this.route = route;
            this.recordedParams = [];
            this.snapshotParams = [];
            this.routerLink = (0, core_1.signal)(['.']);
            this.id = route.params.pipe((0, operators_1.map)((p) => p['id']));
            route.params.forEach((p) => {
                this.recordedParams.push(p);
                this.snapshotParams.push(route.snapshot.params);
            });
        }
    };
    __setFunctionName(_classThis, "TeamCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TeamCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TeamCmp = _classThis;
})();
exports.TeamCmp = TeamCmp;
let TwoOutletsCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'two-outlets-cmp',
            template: `[ <router-outlet></router-outlet>, aux: <router-outlet name="aux"></router-outlet> ]`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TwoOutletsCmp = _classThis = class {
    };
    __setFunctionName(_classThis, "TwoOutletsCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TwoOutletsCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TwoOutletsCmp = _classThis;
})();
exports.TwoOutletsCmp = TwoOutletsCmp;
let UserCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'user-cmp',
            template: `user {{name | async}}`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var UserCmp = _classThis = class {
        constructor(route) {
            this.recordedParams = [];
            this.snapshotParams = [];
            this.name = route.params.pipe((0, operators_1.map)((p) => p['name']));
            route.params.forEach((p) => {
                this.recordedParams.push(p);
                this.snapshotParams.push(route.snapshot.params);
            });
        }
    };
    __setFunctionName(_classThis, "UserCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserCmp = _classThis;
})();
exports.UserCmp = UserCmp;
let WrapperCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'wrapper',
            template: `<router-outlet></router-outlet>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var WrapperCmp = _classThis = class {
    };
    __setFunctionName(_classThis, "WrapperCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WrapperCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WrapperCmp = _classThis;
})();
exports.WrapperCmp = WrapperCmp;
let QueryParamsAndFragmentCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'query-cmp',
            template: `query: {{name | async}} fragment: {{fragment | async}}`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var QueryParamsAndFragmentCmp = _classThis = class {
        constructor(route) {
            this.name = route.queryParamMap.pipe((0, operators_1.map)((p) => p.get('name')));
            this.fragment = route.fragment.pipe((0, operators_1.map)((p) => {
                if (p === undefined) {
                    return 'undefined';
                }
                else if (p === null) {
                    return 'null';
                }
                else {
                    return p;
                }
            }));
        }
    };
    __setFunctionName(_classThis, "QueryParamsAndFragmentCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        QueryParamsAndFragmentCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return QueryParamsAndFragmentCmp = _classThis;
})();
exports.QueryParamsAndFragmentCmp = QueryParamsAndFragmentCmp;
let EmptyQueryParamsCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'empty-query-cmp',
            template: ``,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var EmptyQueryParamsCmp = _classThis = class {
        constructor(route) {
            this.recordedParams = [];
            route.queryParams.forEach((_) => this.recordedParams.push(_));
        }
    };
    __setFunctionName(_classThis, "EmptyQueryParamsCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EmptyQueryParamsCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EmptyQueryParamsCmp = _classThis;
})();
exports.EmptyQueryParamsCmp = EmptyQueryParamsCmp;
let RouteCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'route-cmp',
            template: `route`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RouteCmp = _classThis = class {
        constructor(route) {
            this.route = route;
        }
    };
    __setFunctionName(_classThis, "RouteCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RouteCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RouteCmp = _classThis;
})();
exports.RouteCmp = RouteCmp;
let RelativeLinkInIfCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'link-cmp',
            template: `<div *ngIf="show()"><a [routerLink]="['./simple']">link</a></div> <router-outlet></router-outlet>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RelativeLinkInIfCmp = _classThis = class {
        constructor() {
            this.show = (0, core_1.signal)(false);
        }
    };
    __setFunctionName(_classThis, "RelativeLinkInIfCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RelativeLinkInIfCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RelativeLinkInIfCmp = _classThis;
})();
exports.RelativeLinkInIfCmp = RelativeLinkInIfCmp;
let OutletInNgIf = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'child',
            template: '<div *ngIf="alwaysTrue"><router-outlet></router-outlet></div>',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var OutletInNgIf = _classThis = class {
        constructor() {
            this.alwaysTrue = true;
        }
    };
    __setFunctionName(_classThis, "OutletInNgIf");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OutletInNgIf = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OutletInNgIf = _classThis;
})();
exports.OutletInNgIf = OutletInNgIf;
let DummyLinkWithParentCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'link-cmp',
            template: `<router-outlet></router-outlet>
              <div id="link-parent" routerLinkActive="active" [routerLinkActiveOptions]="{exact: exact}">
                <div ngClass="{one: 'true'}"><a [routerLink]="['./']">link</a></div>
              </div>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DummyLinkWithParentCmp = _classThis = class {
        constructor(route) {
            this.exact = route.snapshot.params['exact'] === 'true';
        }
    };
    __setFunctionName(_classThis, "DummyLinkWithParentCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DummyLinkWithParentCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DummyLinkWithParentCmp = _classThis;
})();
exports.DummyLinkWithParentCmp = DummyLinkWithParentCmp;
let ComponentRecordingRoutePathAndUrl = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'cmp',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ComponentRecordingRoutePathAndUrl = _classThis = class {
        constructor(router, route) {
            this.path = route.pathFromRoot;
            this.url = router.url.toString();
        }
    };
    __setFunctionName(_classThis, "ComponentRecordingRoutePathAndUrl");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ComponentRecordingRoutePathAndUrl = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ComponentRecordingRoutePathAndUrl = _classThis;
})();
exports.ComponentRecordingRoutePathAndUrl = ComponentRecordingRoutePathAndUrl;
let RootCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'root-cmp',
            template: `<router-outlet></router-outlet>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RootCmp = _classThis = class {
    };
    __setFunctionName(_classThis, "RootCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RootCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RootCmp = _classThis;
})();
exports.RootCmp = RootCmp;
let RootCmpWithOnInit = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'root-cmp-on-init',
            template: `<router-outlet></router-outlet>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RootCmpWithOnInit = _classThis = class {
        constructor(router) {
            this.router = router;
        }
        ngOnInit() {
            this.router.navigate(['one']);
        }
    };
    __setFunctionName(_classThis, "RootCmpWithOnInit");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RootCmpWithOnInit = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RootCmpWithOnInit = _classThis;
})();
exports.RootCmpWithOnInit = RootCmpWithOnInit;
let RootCmpWithTwoOutlets = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'root-cmp',
            template: `primary [<router-outlet></router-outlet>] right [<router-outlet name="right"></router-outlet>]`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RootCmpWithTwoOutlets = _classThis = class {
    };
    __setFunctionName(_classThis, "RootCmpWithTwoOutlets");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RootCmpWithTwoOutlets = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RootCmpWithTwoOutlets = _classThis;
})();
exports.RootCmpWithTwoOutlets = RootCmpWithTwoOutlets;
let RootCmpWithNamedOutlet = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'root-cmp',
            template: `main [<router-outlet name="main"></router-outlet>]`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RootCmpWithNamedOutlet = _classThis = class {
    };
    __setFunctionName(_classThis, "RootCmpWithNamedOutlet");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RootCmpWithNamedOutlet = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RootCmpWithNamedOutlet = _classThis;
})();
exports.RootCmpWithNamedOutlet = RootCmpWithNamedOutlet;
let ThrowingCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'throwing-cmp',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ThrowingCmp = _classThis = class {
        constructor() {
            throw new Error('Throwing Cmp');
        }
    };
    __setFunctionName(_classThis, "ThrowingCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ThrowingCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ThrowingCmp = _classThis;
})();
exports.ThrowingCmp = ThrowingCmp;
let ConditionalThrowingCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'conditional-throwing-cmp',
            template: 'conditional throwing',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ConditionalThrowingCmp = _classThis = class {
        constructor() {
            if (ConditionalThrowingCmp.throwError) {
                throw new Error('Throwing Cmp');
            }
        }
    };
    __setFunctionName(_classThis, "ConditionalThrowingCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ConditionalThrowingCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.throwError = true;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ConditionalThrowingCmp = _classThis;
})();
exports.ConditionalThrowingCmp = ConditionalThrowingCmp;
function advance(fixture_1) {
    return __awaiter(this, arguments, void 0, function* (fixture, millis = 1) {
        yield (0, helpers_1.timeout)(millis);
        fixture.detectChanges();
    });
}
function createRoot(router, type) {
    return __awaiter(this, void 0, void 0, function* () {
        const f = testing_1.TestBed.createComponent(type);
        yield advance(f);
        router.initialNavigation();
        yield advance(f);
        return f;
    });
}
let LazyComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'lazy',
            template: 'lazy-loaded',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var LazyComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "LazyComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LazyComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LazyComponent = _classThis;
})();
exports.LazyComponent = LazyComponent;
let TestModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            imports: [common_1.CommonModule, ...exports.ROUTER_DIRECTIVES],
            exports: [
                BlankCmp,
                SimpleCmp,
                TwoOutletsCmp,
                TeamCmp,
                UserCmp,
                StringLinkCmp,
                DummyLinkCmp,
                AbsoluteLinkCmp,
                AbsoluteSimpleLinkCmp,
                RelativeLinkCmp,
                DummyLinkWithParentCmp,
                LinkWithQueryParamsAndFragment,
                DivLinkWithState,
                LinkWithState,
                CollectParamsCmp,
                QueryParamsAndFragmentCmp,
                StringLinkButtonCmp,
                WrapperCmp,
                OutletInNgIf,
                ComponentRecordingRoutePathAndUrl,
                RouteCmp,
                RootCmp,
                RootCmpWithOnInit,
                RelativeLinkInIfCmp,
                RootCmpWithTwoOutlets,
                RootCmpWithNamedOutlet,
                EmptyQueryParamsCmp,
                ThrowingCmp,
                ConditionalThrowingCmp,
            ],
            declarations: [
                BlankCmp,
                SimpleCmp,
                TeamCmp,
                TwoOutletsCmp,
                UserCmp,
                StringLinkCmp,
                DummyLinkCmp,
                AbsoluteLinkCmp,
                AbsoluteSimpleLinkCmp,
                RelativeLinkCmp,
                DummyLinkWithParentCmp,
                LinkWithQueryParamsAndFragment,
                DivLinkWithState,
                LinkWithState,
                CollectParamsCmp,
                QueryParamsAndFragmentCmp,
                StringLinkButtonCmp,
                WrapperCmp,
                OutletInNgIf,
                ComponentRecordingRoutePathAndUrl,
                RouteCmp,
                RootCmp,
                RootCmpWithOnInit,
                RelativeLinkInIfCmp,
                RootCmpWithTwoOutlets,
                RootCmpWithNamedOutlet,
                EmptyQueryParamsCmp,
                ThrowingCmp,
                ConditionalThrowingCmp,
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestModule = _classThis = class {
    };
    __setFunctionName(_classThis, "TestModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestModule = _classThis;
})();
exports.TestModule = TestModule;
