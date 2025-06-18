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
exports.BarChartComponent = void 0;
exports.createBarText = createBarText;
const animations_1 = require("@angular/animations");
const core_1 = require("@angular/core");
const tooltip_1 = require("@angular/material/tooltip");
let BarChartComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-bar-chart',
            templateUrl: './bar-chart.component.html',
            styleUrls: ['./bar-chart.component.scss'],
            animations: [
                (0, animations_1.trigger)('appear', [
                    (0, animations_1.transition)(':enter', [(0, animations_1.style)({ width: 0 }), (0, animations_1.animate)('.3s ease', (0, animations_1.style)({ width: '*' }))]),
                ]),
                (0, animations_1.trigger)('stagger', [(0, animations_1.transition)(':enter', [(0, animations_1.query)(':enter', (0, animations_1.stagger)('.1s', [(0, animations_1.animateChild)()]))])]),
            ],
            imports: [tooltip_1.MatTooltip],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var BarChartComponent = _classThis = class {
        constructor() {
            this.data = (0, core_1.input)([]);
            this.internalData = (0, core_1.computed)(() => {
                var _a, _b;
                const nodes = (_a = this.data()) !== null && _a !== void 0 ? _a : [];
                const values = [];
                const max = nodes.reduce((a, c) => Math.max(a, c.value), -Infinity);
                for (const node of nodes) {
                    values.push({
                        label: node.label,
                        count: (_b = node.count) !== null && _b !== void 0 ? _b : 1,
                        width: (node.value / max) * 100,
                        time: node.value,
                        text: createBarText(node),
                    });
                }
                return values;
            });
            this.color = core_1.input.required();
            this.barClick = (0, core_1.output)();
        }
    };
    __setFunctionName(_classThis, "BarChartComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BarChartComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BarChartComponent = _classThis;
})();
exports.BarChartComponent = BarChartComponent;
function createBarText(bar) {
    return `${bar.label} | ${bar.value.toFixed(1)} ms | ${bar.count} ${bar.count === 1 ? 'instance' : 'instances'}`;
}
