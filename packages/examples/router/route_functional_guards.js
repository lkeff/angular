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
exports.heroResolver = exports.HeroService = exports.HeroDetailComponent = exports.UserComponent = exports.TeamComponent = exports.App = void 0;
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const router_1 = require("@angular/router");
let App = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: '',
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
exports.App = App;
let TeamComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TeamComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "TeamComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TeamComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TeamComponent = _classThis;
})();
exports.TeamComponent = TeamComponent;
// #docregion CanActivateFn
let UserToken = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var UserToken = _classThis = class {
    };
    __setFunctionName(_classThis, "UserToken");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserToken = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserToken = _classThis;
})();
let PermissionsService = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PermissionsService = _classThis = class {
        canActivate(currentUser, userId) {
            return true;
        }
        canMatch(currentUser) {
            return true;
        }
    };
    __setFunctionName(_classThis, "PermissionsService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PermissionsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PermissionsService = _classThis;
})();
const canActivateTeam = (route, state) => {
    return (0, core_1.inject)(PermissionsService).canActivate((0, core_1.inject)(UserToken), route.params['id']);
};
// #enddocregion
// #docregion CanActivateFnInRoute
(0, platform_browser_1.bootstrapApplication)(App, {
    providers: [
        (0, router_1.provideRouter)([
            {
                path: 'team/:id',
                component: TeamComponent,
                canActivate: [canActivateTeam],
            },
        ]),
    ],
});
// #enddocregion
// #docregion CanActivateChildFn
const canActivateChildExample = (route, state) => {
    return (0, core_1.inject)(PermissionsService).canActivate((0, core_1.inject)(UserToken), route.params['id']);
};
(0, platform_browser_1.bootstrapApplication)(App, {
    providers: [
        (0, router_1.provideRouter)([
            {
                path: 'team/:id',
                component: TeamComponent,
                canActivateChild: [canActivateChildExample],
                children: [],
            },
        ]),
    ],
});
// #enddocregion
// #docregion CanDeactivateFn
let UserComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var UserComponent = _classThis = class {
        constructor() {
            this.hasUnsavedChanges = true;
        }
    };
    __setFunctionName(_classThis, "UserComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserComponent = _classThis;
})();
exports.UserComponent = UserComponent;
(0, platform_browser_1.bootstrapApplication)(App, {
    providers: [
        (0, router_1.provideRouter)([
            {
                path: 'user/:id',
                component: UserComponent,
                canDeactivate: [(component) => !component.hasUnsavedChanges],
            },
        ]),
    ],
});
// #enddocregion
// #docregion CanMatchFn
const canMatchTeam = (route, segments) => {
    return (0, core_1.inject)(PermissionsService).canMatch((0, core_1.inject)(UserToken));
};
(0, platform_browser_1.bootstrapApplication)(App, {
    providers: [
        (0, router_1.provideRouter)([
            {
                path: 'team/:id',
                component: TeamComponent,
                canMatch: [canMatchTeam],
            },
        ]),
    ],
});
// #enddocregion
// #docregion ResolveDataUse
let HeroDetailComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HeroDetailComponent = _classThis = class {
        constructor(activatedRoute) {
            this.activatedRoute = activatedRoute;
        }
        ngOnInit() {
            this.activatedRoute.data.subscribe(({ hero }) => {
                // do something with your resolved data ...
            });
        }
    };
    __setFunctionName(_classThis, "HeroDetailComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HeroDetailComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HeroDetailComponent = _classThis;
})();
exports.HeroDetailComponent = HeroDetailComponent;
let HeroService = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HeroService = _classThis = class {
        getHero(id) {
            return { name: `Superman-${id}` };
        }
    };
    __setFunctionName(_classThis, "HeroService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HeroService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HeroService = _classThis;
})();
exports.HeroService = HeroService;
const heroResolver = (route, state) => {
    return (0, core_1.inject)(HeroService).getHero(route.paramMap.get('id'));
};
exports.heroResolver = heroResolver;
(0, platform_browser_1.bootstrapApplication)(App, {
    providers: [
        (0, router_1.provideRouter)([
            {
                path: 'detail/:id',
                component: HeroDetailComponent,
                resolve: { hero: exports.heroResolver },
            },
        ]),
    ],
});
// #enddocregion
