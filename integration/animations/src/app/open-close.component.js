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
exports.OpenCloseComponent = void 0;
const animations_1 = require("@angular/animations");
const core_1 = require("@angular/core");
let OpenCloseComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-open-close',
            animations: [
                (0, animations_1.trigger)('openClose', [
                    // ...
                    (0, animations_1.state)('open', (0, animations_1.style)({ height: '200px', opacity: 1, backgroundColor: 'yellow' })),
                    (0, animations_1.state)('closed', (0, animations_1.style)({ height: '100px', opacity: 0.8, backgroundColor: 'blue' })),
                    (0, animations_1.transition)('open => closed', [(0, animations_1.animate)('1s')]),
                    (0, animations_1.transition)('closed => open', [(0, animations_1.animate)('0.5s')]),
                ]),
            ],
            template: `<nav>
    <button type="button" (click)="toggle()">Toggle Open/Close</button>
  </nav>
  
  <div [@openClose]="isOpen ? 'open' : 'closed'" class="open-close-container">
    <p>The box is now {{ isOpen ? 'Open' : 'Closed' }}!</p>
  </div>`,
            styles: [
                `:host {
        display: block;
        margin-top: 1rem;
      }
      
      .open-close-container {
        border: 1px solid #dddddd;
        margin-top: 1em;
        padding: 20px 20px 0px 20px;
        color: #000000;
        font-weight: bold;
        font-size: 20px;
      }`,
            ],
            standalone: true,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var OpenCloseComponent = _classThis = class {
        constructor() {
            this.isOpen = true;
        }
        toggle() {
            this.isOpen = !this.isOpen;
        }
    };
    __setFunctionName(_classThis, "OpenCloseComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OpenCloseComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OpenCloseComponent = _classThis;
})();
exports.OpenCloseComponent = OpenCloseComponent;
