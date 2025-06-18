"use strict";
/*!
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
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const animation_layer_directive_1 = require("./animation-layer.directive");
const animation_creator_service_1 = require("./animation-creator.service");
// Test component
const TEST_TIMESTEP = 500;
let AnimationHost = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'adev-animation-host',
            imports: [animation_layer_directive_1.AnimationLayerDirective],
            providers: [animation_creator_service_1.AnimationCreatorService],
            template: `
    <div adevAnimationLayer layerId="layer-1">
      <div class="circle"></div>
    </div>
    <div adevAnimationLayer layerId="layer-2">
      <div class="square"></div>
    </div>
    <div adevAnimationLayer layerId="layer-3">
      <div class="triangle"></div>
      <div class="triangle"></div>
    </div>
  `,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AnimationHost = _classThis = class {
        constructor() {
            this.animationCreator = (0, core_1.inject)(animation_creator_service_1.AnimationCreatorService);
            this.layers = (0, core_1.viewChildren)(animation_layer_directive_1.AnimationLayerDirective);
        }
        ngAfterViewInit() {
            this.animation = this.animationCreator.createAnimation(this.layers(), {
                timestep: TEST_TIMESTEP,
            });
        }
    };
    __setFunctionName(_classThis, "AnimationHost");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AnimationHost = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AnimationHost = _classThis;
})();
// Animation definition
const DEFINITION = [
    {
        selector: 'layer-1 >> .circle',
        timeframe: [0, 4],
        from: {
            'opacity': '0',
            'transform': 'translateX(0)',
        },
        to: {
            'opacity': '1',
            'transform': 'translateX(100%)',
        },
    },
    {
        selector: 'layer-2 >> .square',
        timeframe: [1, 5],
        from: {
            'font-size': '20px',
            'color': '#000',
        },
        to: {
            'font-size': '10px',
            'color': '#ffffff',
        },
    },
];
describe('Animation', () => {
    let component;
    let fixture;
    let animation;
    const layerObjects = new Map();
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield testing_1.TestBed.configureTestingModule({
            imports: [AnimationHost],
        }).compileComponents();
        fixture = testing_1.TestBed.createComponent(AnimationHost);
        component = fixture.componentInstance;
        fixture.detectChanges();
        animation = component.animation;
        // Store all layer objects in a map for easier access.
        for (const l of component.layers()) {
            const layerEl = l.elementRef.nativeElement;
            layerObjects.set(l.id(), layerEl);
            const layerObj = layerEl.firstChild;
            layerObjects.set('.' + layerObj.className, layerObj);
        }
    }));
    it('should load the layers and initialize the animation', () => {
        expect(animation).toBeTruthy();
        expect(layerObjects.get('layer-1')).toBeInstanceOf(HTMLElement);
        expect(layerObjects.get('.circle')).toBeInstanceOf(HTMLElement);
        expect(layerObjects.get('layer-2')).toBeInstanceOf(HTMLElement);
        expect(layerObjects.get('.square')).toBeInstanceOf(HTMLElement);
        expect(layerObjects.get('layer-3')).toBeInstanceOf(HTMLElement);
    });
    it(`should throw an error if a layer doesn't exist`, () => {
        const defineFn = () => animation.define([
            {
                selector: 'layer-4',
                at: 1,
                styles: {},
            },
        ]);
        expect(defineFn).toThrowError('Animation: Missing layer ID: layer-4');
    });
    it('should return the config timestep', () => {
        expect(animation.timestep).toEqual(TEST_TIMESTEP);
    });
    it(`should throw an error if a layer object doesn't exist`, () => {
        const defineFn = () => animation.define([
            {
                selector: 'layer-1 >> .triangle',
                at: 1,
                styles: {},
            },
        ]);
        expect(defineFn).toThrowError('Animation: Missing layer object(s): layer-1 >> .triangle');
    });
    it('should throw an error if the animation duration is negative', () => {
        const defineFn = () => animation.define([
            {
                selector: 'layer-1 >> .circle',
                timeframe: [5, 4],
                from: {
                    'background': '#000',
                },
                to: {
                    'background': '#fff',
                },
            },
        ]);
        expect(defineFn).toThrowError(`Animation: Incorrect time frame for selector 'layer-1 >> .circle'. Start time is greater than end time`);
    });
    it('should throw an error if the animation duration is zero', () => {
        const defineFn = () => animation.define([
            {
                selector: 'layer-1 >> .circle',
                timeframe: [5, 5],
                from: {
                    'background': '#000',
                },
                to: {
                    'background': '#fff',
                },
            },
        ]);
        expect(defineFn).toThrowError(`Animation: Duration for selector 'layer-1 >> .circle' is zero. Use 'at' time selector instead`);
    });
    it('should throw an error if there is a mismatch between the number of "from" and "to" styles', () => {
        const defineFn = () => animation.define([
            {
                selector: 'layer-1 >> .circle',
                timeframe: [0, 1],
                from: {
                    'background': '#000',
                    'opacity': '0.5',
                },
                to: {
                    'background': '#fff',
                },
            },
        ]);
        expect(defineFn).toThrowError(`Animation: There is a mismatch between the number of "from" and "to" styles for selector 'layer-1 >> .circle'`);
    });
    it('should throw an error if there is a mismatch between the "from" and "to" styles properties', () => {
        const defineFn = () => animation.define([
            {
                selector: 'layer-1 >> .circle',
                timeframe: [0, 1],
                from: {
                    'background': '#000',
                    'opacity': '0.5',
                },
                to: {
                    'background': '#fff',
                    'transform': 'scale(2)',
                },
            },
        ]);
        expect(defineFn).toThrowError(`Animation: "from" style 'transform' is missing for selector 'layer-1 >> .circle'`);
    });
    it('should return animation duration', () => {
        animation.define([
            {
                selector: 'layer-2 >> .square',
                timeframe: [3, 7],
                from: {},
                to: {},
            },
            {
                selector: 'layer-1 >> .circle',
                timeframe: [0, 5],
                from: {},
                to: {},
            },
        ]);
        expect(animation.duration).toEqual(7000);
    });
    it('should return animation duration (single rule)', () => {
        animation.define([
            {
                selector: 'layer-2 >> .square',
                at: 3,
                styles: {},
            },
        ]);
        expect(animation.duration).toEqual(3000);
    });
    it('should add an initialize a plugin', () => {
        const mockPlugin = {
            init: () => { },
            destroy: () => { },
        };
        const initSpy = spyOn(mockPlugin, 'init');
        animation.addPlugin(mockPlugin);
        expect(initSpy).toHaveBeenCalled();
    });
    it('should dispose the animation', () => {
        const mockPlugin = {
            init: () => { },
            destroy: () => { },
        };
        const destroySpy = spyOn(mockPlugin, 'destroy');
        animation.addPlugin(mockPlugin);
        animation.dispose();
        expect(destroySpy).toHaveBeenCalled();
        expect(animation.duration).toEqual(0);
        expect(animation.progress()).toEqual(0);
        expect(animation.isPlaying()).toEqual(false);
    });
    it('should move the animation forward in time', () => {
        animation.define(DEFINITION);
        animation.forward(2000);
        const circle = layerObjects.get('.circle');
        expect(circle === null || circle === void 0 ? void 0 : circle.style.opacity).toEqual('0.5');
        expect(circle === null || circle === void 0 ? void 0 : circle.style.transform).toEqual('translateX(50%)');
        const square = layerObjects.get('.square');
        expect(square === null || square === void 0 ? void 0 : square.style.fontSize).toEqual('17.5px');
        expect(square === null || square === void 0 ? void 0 : square.style.color).toEqual('rgb(64, 64, 64)');
    });
    it('should move the animation back in time', () => {
        animation.define(DEFINITION);
        animation.forward(5000);
        animation.back(2000);
        const circle = layerObjects.get('.circle');
        expect(circle === null || circle === void 0 ? void 0 : circle.style.opacity).toEqual('0.75');
        expect(circle === null || circle === void 0 ? void 0 : circle.style.transform).toEqual('translateX(75%)');
        const square = layerObjects.get('.square');
        expect(square === null || square === void 0 ? void 0 : square.style.fontSize).toEqual('15px');
        expect(square === null || square === void 0 ? void 0 : square.style.color).toEqual('rgb(128, 128, 128)');
    });
    it('should seek', () => {
        animation.define(DEFINITION);
        animation.seek(4 / 5); // 4th second; 0.8
        const circle = layerObjects.get('.circle');
        expect(circle === null || circle === void 0 ? void 0 : circle.style.opacity).toEqual('1');
        expect(circle === null || circle === void 0 ? void 0 : circle.style.transform).toEqual('translateX(100%)');
        const square = layerObjects.get('.square');
        expect(square === null || square === void 0 ? void 0 : square.style.fontSize).toEqual('12.5px');
        expect(square === null || square === void 0 ? void 0 : square.style.color).toEqual('rgb(191, 191, 191)');
    });
    it('should reset the animation', () => {
        animation.define(DEFINITION);
        animation.seek(1);
        animation.reset();
        expect(animation.progress()).toEqual(0);
        const circle = layerObjects.get('.circle');
        // i.e. CSS styles are in use
        expect(circle === null || circle === void 0 ? void 0 : circle.style.opacity).toEqual('');
        expect(circle === null || circle === void 0 ? void 0 : circle.style.transform).toEqual('');
        const square = layerObjects.get('.square');
        expect(square === null || square === void 0 ? void 0 : square.style.fontSize).toEqual('');
        expect(square === null || square === void 0 ? void 0 : square.style.color).toEqual('');
    });
    it('should animate layers', () => {
        animation.define([
            {
                selector: 'layer-1',
                timeframe: [0, 1],
                from: {
                    'padding': '0',
                },
                to: {
                    'padding': '32px',
                },
            },
        ]);
        animation.seek(0.5);
        const layer1 = layerObjects.get('layer-1');
        expect(layer1 === null || layer1 === void 0 ? void 0 : layer1.style.padding).toEqual('16px');
    });
    it('should animate all objects that are matching a selector', () => {
        animation.define([
            {
                selector: 'layer-3 >> .triangle',
                timeframe: [0, 1],
                from: {
                    'transform': 'rotate(0)',
                },
                to: {
                    'transform': 'rotate(360deg)',
                },
            },
        ]);
        animation.seek(0.5);
        const layer3 = layerObjects.get('layer-3');
        const triangles = layer3.querySelectorAll('.triangle');
        for (let i = 0; i < triangles.length; i++) {
            expect(triangles[i].style.transform).toEqual('rotate(180deg)');
        }
    });
    it('should animate a single static rule', () => {
        animation.define([
            {
                selector: 'layer-2 >> .square',
                at: 1.5,
                styles: {
                    'top': '100px',
                },
            },
        ]);
        animation.seek(1);
        const square = layerObjects.get('.square');
        expect(square === null || square === void 0 ? void 0 : square.style.top).toEqual('100px');
    });
    it('should track animation progress', () => {
        animation.define(DEFINITION);
        animation.seek(0.5);
        expect(animation.progress()).toEqual(0.5);
    });
});
