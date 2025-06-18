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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeAnimationComponent = exports.METEOR_WIDTH_DEFAULT = exports.METEOR_WIDTH_MAP = exports.METEOR_GAP_RATIO = exports.METEOR_HW_RATIO = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const docs_1 = require("@angular/docs");
const animation_1 = require("../../animation");
const animation_scroll_handler_1 = require("../../animation/plugins/animation-scroll-handler");
const animation_definition_1 = require("./animation-definition");
exports.METEOR_HW_RATIO = 1.42; // Height to width ratio
exports.METEOR_GAP_RATIO = 1.33; // Use 0.7 for WebGL-like field. Renders a lot of elements though.
// A map with screen size to meteor width
exports.METEOR_WIDTH_MAP = [
    [800, 60],
    [1100, 90],
];
exports.METEOR_WIDTH_DEFAULT = 120; // For screens larger than 1100px
let HomeAnimationComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'adev-home-animation',
            imports: [animation_1.AnimationLayerDirective, router_1.RouterLink],
            templateUrl: './home-animation.component.html',
            styleUrl: './home-animation.component.scss',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            providers: [animation_1.AnimationCreatorService],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HomeAnimationComponent = _classThis = class {
        constructor() {
            this.win = (0, core_1.inject)(docs_1.WINDOW);
            this.animCreator = (0, core_1.inject)(animation_1.AnimationCreatorService);
            this.injector = (0, core_1.inject)(core_1.Injector);
            this.elementRef = (0, core_1.inject)(core_1.ElementRef);
            this.animationLayers = (0, core_1.viewChildren)(animation_1.AnimationLayerDirective);
            this.ctaLink = docs_1.isIos ? 'overview' : 'tutorials/learn-angular';
            this.isUwu = core_1.input.required();
            this.ready = (0, core_1.output)();
            this.reducedMotion = (0, core_1.signal)((0, docs_1.shouldReduceMotion)());
            this.meteorFieldData = (0, core_1.signal)(null);
            this.meteors = (0, core_1.signal)([]);
            if (!this.reducedMotion()) {
                this.initAnimation();
            }
            else {
                this.ready.emit(true);
            }
        }
        ngOnDestroy() {
            var _a;
            (_a = this.animation) === null || _a === void 0 ? void 0 : _a.dispose();
        }
        initAnimation() {
            // Limitation: Meteor dimensions won't change on page resize
            const meteorDimensions = this.calculateMeteorDimensions();
            const data = this.calculateMeteorFieldData(meteorDimensions);
            this.setCssVariables(meteorDimensions);
            this.meteorFieldData.set(data);
            // Generate a meteor field. The number represents the type [1, 3]
            this.meteors.set(new Array(data.count).fill(1).map(() => Math.round(Math.random() * 2 + 1)));
            (0, core_1.afterNextRender)({
                read: () => {
                    this.animation = this.animCreator
                        .createAnimation(this.animationLayers(), {
                        timestep: animation_definition_1.ANIM_TIMESTEP,
                    })
                        .define((0, animation_definition_1.generateHomeAnimationDefinition)(this.isUwu(), this.meteors().length))
                        .addPlugin(new animation_scroll_handler_1.AnimationScrollHandler(this.elementRef, this.injector));
                    this.ready.emit(true);
                },
            });
        }
        /** Calculte the dimensions and sizes of a meteor – width, height, tail, tilt angle, etc. */
        calculateMeteorDimensions() {
            let width = exports.METEOR_WIDTH_DEFAULT;
            for (const [screenSize, meteorWidth] of exports.METEOR_WIDTH_MAP) {
                if (this.win.innerWidth <= screenSize) {
                    width = meteorWidth;
                }
            }
            const height = width * exports.METEOR_HW_RATIO;
            const gap = width * exports.METEOR_GAP_RATIO;
            // Pythagorean theorem + some trigonometry
            const tailLength = Math.sqrt(width * width + height * height);
            const tiltAngle = -Math.asin(width / tailLength);
            return {
                width,
                height,
                gap,
                tailLength,
                tiltAngle,
            };
        }
        /** Calculate the number of meteors and size of the field. */
        calculateMeteorFieldData(meteorDim) {
            const mW = meteorDim.width + meteorDim.gap;
            const mH = meteorDim.height + meteorDim.gap;
            let rows = 1;
            let cols = 1;
            while (cols * mW - meteorDim.gap <= this.win.innerWidth) {
                cols++;
            }
            while (rows * mH - meteorDim.gap <= this.win.innerHeight) {
                rows++;
            }
            const width = cols * mW - meteorDim.gap;
            const height = rows * mH - meteorDim.gap;
            return {
                count: rows * cols,
                width,
                height,
                marginLeft: -(width - this.win.innerWidth) / 2,
                marginTop: -(height - this.win.innerHeight) / 2,
            };
        }
        setCssVariables({ width, height, tailLength, tiltAngle, gap }) {
            const styleRef = this.elementRef.nativeElement.style;
            styleRef.setProperty('--meteor-width', width + 'px');
            styleRef.setProperty('--meteor-height', height + 'px');
            styleRef.setProperty('--meteor-tail-length', tailLength + 'px');
            styleRef.setProperty('--meteor-tilt-angle', tiltAngle + 'rad');
            styleRef.setProperty('--meteor-gap', gap + 'px');
        }
    };
    __setFunctionName(_classThis, "HomeAnimationComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HomeAnimationComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HomeAnimationComponent = _classThis;
})();
exports.HomeAnimationComponent = HomeAnimationComponent;
