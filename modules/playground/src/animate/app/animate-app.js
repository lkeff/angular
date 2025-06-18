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
exports.AnimateApp = void 0;
const animations_1 = require("@angular/animations");
const core_1 = require("@angular/core");
let AnimateApp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            host: {
                '[@backgroundAnimation]': 'bgStatus',
                '(@backgroundAnimation.start)': 'bgStatusChanged($event, "started")',
                '(@backgroundAnimation.done)': 'bgStatusChanged($event, "completed")',
            },
            selector: 'animate-app',
            styleUrls: ['../css/animate-app.css'],
            template: `
    <button (click)="state = 'start'">Start State</button>
    <button (click)="state = 'active'">Active State</button>
    |
    <button (click)="state = 'void'">Void State</button>
    <button (click)="reorderAndRemove()">Scramble!</button>
    <button (click)="state = 'default'">Unhandled (default) State</button>
    <button style="float:right" (click)="bgStatus = 'blur'">Blur Page (Host)</button>
    <hr />
    <div *ngFor="let item of items; let i = index" class="box" [@boxAnimation]="state">
      {{ item }} - {{ i }}
      <button (click)="remove(item)">x</button>
    </div>
  `,
            animations: [
                (0, animations_1.trigger)('backgroundAnimation', [
                    (0, animations_1.state)('focus', (0, animations_1.style)({ 'background-color': 'white' })),
                    (0, animations_1.state)('blur', (0, animations_1.style)({ 'background-color': 'grey' })),
                    (0, animations_1.transition)('* => *', [(0, animations_1.animate)(500)]),
                ]),
                (0, animations_1.trigger)('boxAnimation', [
                    (0, animations_1.state)('*', (0, animations_1.style)({ 'height': '*', 'background-color': '#dddddd', 'color': 'black' })),
                    (0, animations_1.state)('void, hidden', (0, animations_1.style)({ 'height': 0, 'opacity': 0 })),
                    (0, animations_1.state)('start', (0, animations_1.style)({ 'background-color': 'red', 'height': '*' })),
                    (0, animations_1.state)('active', (0, animations_1.style)({ 'background-color': 'orange', 'color': 'white', 'font-size': '100px' })),
                    (0, animations_1.transition)('active <=> start', [
                        (0, animations_1.animate)(500, (0, animations_1.style)({ 'transform': 'scale(2)' })),
                        (0, animations_1.animate)(500),
                    ]),
                    (0, animations_1.transition)('* => *', [
                        (0, animations_1.animate)(1000, (0, animations_1.style)({ 'opacity': 1, 'height': 300 })),
                        (0, animations_1.animate)(1000, (0, animations_1.style)({ 'background-color': 'blue' })),
                        (0, animations_1.animate)(1000, (0, animations_1.keyframes)([
                            (0, animations_1.style)({ 'background-color': 'blue', 'color': 'black', 'offset': 0.2 }),
                            (0, animations_1.style)({ 'background-color': 'brown', 'color': 'black', 'offset': 0.5 }),
                            (0, animations_1.style)({ 'background-color': 'black', 'color': 'white', 'offset': 1 }),
                        ])),
                        (0, animations_1.animate)(2000),
                    ]),
                ]),
            ],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AnimateApp = _classThis = class {
        constructor() {
            this.items = [];
            this.bgStatus = 'focus';
        }
        remove(item) {
            const index = this.items.indexOf(item);
            if (index >= 0) {
                this.items.splice(index, 1);
            }
        }
        reorderAndRemove() {
            this.items = this.items.sort((a, b) => Math.random() - 0.5);
            this.items.splice(Math.floor(Math.random() * this.items.length), 1);
            this.items.splice(Math.floor(Math.random() * this.items.length), 1);
            this.items[Math.floor(Math.random() * this.items.length)] = 99;
        }
        bgStatusChanged(data, phase) {
            alert(`backgroundAnimation has ${phase} from ${data['fromState']} to ${data['toState']}`);
        }
        get state() {
            return this._state;
        }
        set state(s) {
            this._state = s;
            if (s == 'void') {
                this.items = [];
            }
            else {
                this.items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
            }
        }
    };
    __setFunctionName(_classThis, "AnimateApp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AnimateApp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AnimateApp = _classThis;
})();
exports.AnimateApp = AnimateApp;
