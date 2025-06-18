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
exports.HeroListEnterLeaveComponent = void 0;
const core_1 = require("@angular/core");
const animations_1 = require("@angular/animations");
let HeroListEnterLeaveComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-hero-list-enter-leave',
            template: `
    <ul class="heroes">
      @for (hero of heroes; track hero) {
        <li [@flyInOut]="'in'">
          <button class="inner" type="button" (click)="removeHero(hero.id)">
            <span class="badge">{{ hero.id }}</span>
            <span class="name">{{ hero.name }}</span>
          </button>
        </li>
      }
    </ul>
  `,
            styleUrls: ['./hero-list-page.component.css'],
            // #docregion animationdef
            animations: [
                (0, animations_1.trigger)('flyInOut', [
                    (0, animations_1.state)('in', (0, animations_1.style)({ transform: 'translateX(0)' })),
                    (0, animations_1.transition)('void => *', [(0, animations_1.style)({ transform: 'translateX(-100%)' }), (0, animations_1.animate)(100)]),
                    (0, animations_1.transition)('* => void', [(0, animations_1.animate)(100, (0, animations_1.style)({ transform: 'translateX(100%)' }))]),
                ]),
            ],
            // #enddocregion animationdef
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _heroes_decorators;
    let _heroes_initializers = [];
    let _heroes_extraInitializers = [];
    let _remove_decorators;
    let _remove_initializers = [];
    let _remove_extraInitializers = [];
    var HeroListEnterLeaveComponent = _classThis = class {
        removeHero(id) {
            this.remove.emit(id);
        }
        constructor() {
            this.heroes = __runInitializers(this, _heroes_initializers, []);
            this.remove = (__runInitializers(this, _heroes_extraInitializers), __runInitializers(this, _remove_initializers, new core_1.EventEmitter()));
            __runInitializers(this, _remove_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "HeroListEnterLeaveComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _heroes_decorators = [(0, core_1.Input)()];
        _remove_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _heroes_decorators, { kind: "field", name: "heroes", static: false, private: false, access: { has: obj => "heroes" in obj, get: obj => obj.heroes, set: (obj, value) => { obj.heroes = value; } }, metadata: _metadata }, _heroes_initializers, _heroes_extraInitializers);
        __esDecorate(null, null, _remove_decorators, { kind: "field", name: "remove", static: false, private: false, access: { has: obj => "remove" in obj, get: obj => obj.remove, set: (obj, value) => { obj.remove = value; } }, metadata: _metadata }, _remove_initializers, _remove_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HeroListEnterLeaveComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HeroListEnterLeaveComponent = _classThis;
})();
exports.HeroListEnterLeaveComponent = HeroListEnterLeaveComponent;
