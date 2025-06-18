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
exports.QueryingComponent = void 0;
const core_1 = require("@angular/core");
const animations_1 = require("@angular/animations");
const mock_heroes_1 = require("./mock-heroes");
let QueryingComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-querying',
            template: `
    <nav>
      <button class="toggle" (click)="show = !show" [disabled]="toggleDisabled">Toggle View</button>
    </nav>
    @if (show) {
      <section @query (@query.start)="toggleDisabled = true" (@query.done)="toggleDisabled = false">
        <p>I am a simple child element</p>
        @if (show) {
          <p>I am a child element that enters and leaves with its parent</p>
        }
        <p @animateMe>I am a child element with an animation trigger</p>
        <div class="hero">
          <span class="badge">{{ hero.id }}</span>
          <span class="name">{{ hero.name }} <small>(heroes are always animated!)</small></span>
        </div>
      </section>
    }
  `,
            styleUrls: ['./querying.component.css'],
            animations: [
                (0, animations_1.trigger)('query', [
                    (0, animations_1.transition)(':enter', [
                        (0, animations_1.style)({ height: 0 }),
                        (0, animations_1.group)([
                            (0, animations_1.animate)(500, (0, animations_1.style)({ height: '*' })),
                            (0, animations_1.query)(':enter', [
                                (0, animations_1.style)({ opacity: 0, transform: 'scale(0)' }),
                                (0, animations_1.animate)(2000, (0, animations_1.style)({ opacity: 1, transform: 'scale(1)' })),
                            ]),
                            (0, animations_1.query)('.hero', [
                                (0, animations_1.style)({ transform: 'translateX(-100%)' }),
                                (0, animations_1.animate)('.7s 500ms ease-in', (0, animations_1.style)({ transform: 'translateX(0)' })),
                            ]),
                        ]),
                        (0, animations_1.query)('@animateMe', (0, animations_1.animateChild)()),
                    ]),
                    (0, animations_1.transition)(':leave', [
                        (0, animations_1.style)({ height: '*' }),
                        (0, animations_1.query)('@animateMe', (0, animations_1.animateChild)()),
                        (0, animations_1.group)([
                            (0, animations_1.animate)('500ms 500ms', (0, animations_1.style)({ height: '0', padding: '0' })),
                            (0, animations_1.query)(':leave', [
                                (0, animations_1.style)({ opacity: 1, transform: 'scale(1)' }),
                                (0, animations_1.animate)('1s', (0, animations_1.style)({ opacity: 0, transform: 'scale(0)' })),
                            ]),
                            (0, animations_1.query)('.hero', [
                                (0, animations_1.style)({ transform: 'translateX(0)' }),
                                (0, animations_1.animate)('.7s ease-out', (0, animations_1.style)({ transform: 'translateX(-100%)' })),
                            ]),
                        ]),
                    ]),
                ]),
                (0, animations_1.trigger)('animateMe', [
                    (0, animations_1.transition)('* <=> *', (0, animations_1.animate)('500ms cubic-bezier(.68,-0.73,.26,1.65)', (0, animations_1.keyframes)([
                        (0, animations_1.style)({ backgroundColor: 'transparent', color: '*', offset: 0 }),
                        (0, animations_1.style)({ backgroundColor: 'blue', color: 'white', offset: 0.2 }),
                        (0, animations_1.style)({ backgroundColor: 'transparent', color: '*', offset: 1 }),
                    ]))),
                ]),
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var QueryingComponent = _classThis = class {
        constructor() {
            this.toggleDisabled = false;
            this.show = true;
            this.hero = mock_heroes_1.HEROES[0];
        }
    };
    __setFunctionName(_classThis, "QueryingComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        QueryingComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return QueryingComponent = _classThis;
})();
exports.QueryingComponent = QueryingComponent;
