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
exports.AnimationPlayerComponent = void 0;
const core_1 = require("@angular/core");
// In milliseconds. Used for going forward or back through the animation.
const TIMESTEP = 100;
/**
 * Animation player component.
 */
let AnimationPlayerComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'adev-animation-player',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: `
    @if (animation(); as anim) {
      <div class="deck" [class]="[alignment()]">
        <div class="progress-bar" (click)="seek($event)" title="Seek">
          <div class="progress" [style.width]="progressPerc()"></div>
        </div>
        <div class="controls">
          <button (click)="anim.back(TIMESTEP)" title="Go back">⏪</button>
          <button
            (click)="playPause()"
            [attr.title]="!anim.isPlaying() ? 'Play' : 'Pause'"
            [style.background-color]="anim.isPlaying() ? '#666' : null"
          >
            {{ !anim.isPlaying() ? '▶️' : '⏸️' }}
          </button>
          <button (click)="anim.stop()" title="Stop">⏹️</button>
          <button (click)="anim.forward(TIMESTEP)" title="Go forward">⏩</button>
        </div>
      </div>
    }
  `,
            styles: `
    .deck {
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      bottom: 30px;
      padding: 10px;
      border-radius: 12px;
      background: rgba(0,0,0, 0.7);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      z-index: 999999;
    }
    .deck.left {
      left: 130px;
      transform: initial;
    }
    .deck.right {
      right: 30px;
      left: initial;
      transform: initial;
    }
    .progress-bar {
      position: relative;
      width: 400px;
      height: 6px;
      border-radius: 3px;
      background-color: #444;
      overflow: hidden;
      margin-bottom: 10px;
      cursor: pointer;
    }
    .progress {
      position: absolute;
      top: 0;
      left: 0;
      height: inherit;
      background-color: #ba2391;
      pointer-events: none;
    }
    .controls {
      display: flex;
      justify-content: center;
      gap: 10px;
    }
    button {
      width: 3Opx;
      height: 30px;
      border-radius: 7px;
      background-color: #333;
      font-size: 20px;
    }
    button:hover {
      background-color: #444;
    }
  `,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AnimationPlayerComponent = _classThis = class {
        constructor() {
            this.animation = (0, core_1.signal)(null);
            this.alignment = (0, core_1.signal)('center');
            this.TIMESTEP = TIMESTEP;
            this.progressPerc = (0, core_1.computed)(() => this.animation().progress() * 100 + '%');
        }
        playPause() {
            const anim = this.animation();
            if (!anim.isPlaying()) {
                anim.play();
            }
            else {
                anim.pause();
            }
        }
        seek(e) {
            const target = e.target;
            const progress = e.offsetX / target.clientWidth;
            this.animation().seek(progress);
        }
    };
    __setFunctionName(_classThis, "AnimationPlayerComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AnimationPlayerComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AnimationPlayerComponent = _classThis;
})();
exports.AnimationPlayerComponent = AnimationPlayerComponent;
