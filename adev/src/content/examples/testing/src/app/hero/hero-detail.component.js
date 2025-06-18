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
exports.HeroDetailComponent = void 0;
// #docplaster
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const shared_1 = require("../shared/shared");
const hero_detail_service_1 = require("./hero-detail.service");
// #docregion prototype
let HeroDetailComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-hero-detail',
            templateUrl: './hero-detail.component.html',
            styleUrls: ['./hero-detail.component.css'],
            providers: [hero_detail_service_1.HeroDetailService],
            imports: [shared_1.sharedImports, router_1.RouterLink],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HeroDetailComponent = _classThis = class {
        // #docregion ctor
        constructor() {
            // #docregion inject
            this.heroDetailService = (0, core_1.inject)(hero_detail_service_1.HeroDetailService);
            this.route = (0, core_1.inject)(router_1.ActivatedRoute);
            this.router = (0, core_1.inject)(router_1.Router);
            // get hero when `id` param changes
            this.route.paramMap.subscribe((pmap) => this.getHero(pmap.get('id')));
        }
        // #enddocregion ctor
        getHero(id) {
            // when no id or id===0, create new blank hero
            if (!id) {
                this.hero = { id: 0, name: '' };
                return;
            }
            this.heroDetailService.getHero(id).subscribe((hero) => {
                if (hero) {
                    this.hero = hero;
                }
                else {
                    this.gotoList(); // id not found; navigate to list
                }
            });
        }
        save() {
            this.heroDetailService.saveHero(this.hero).subscribe(() => this.gotoList());
        }
        cancel() {
            this.gotoList();
        }
        gotoList() {
            this.router.navigate(['../'], { relativeTo: this.route });
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
// #enddocregion prototype
