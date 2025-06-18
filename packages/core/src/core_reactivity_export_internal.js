"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNotInReactiveContext = exports.afterRenderEffect = exports.ɵEffectScheduler = exports.effect = exports.untracked = exports.linkedSignal = exports.ɵunwrapWritableSignal = exports.signal = exports.computed = exports.isSignal = exports.ɵSIGNAL = void 0;
var signals_1 = require("../primitives/signals");
Object.defineProperty(exports, "\u0275SIGNAL", { enumerable: true, get: function () { return signals_1.SIGNAL; } });
var api_1 = require("./render3/reactivity/api");
Object.defineProperty(exports, "isSignal", { enumerable: true, get: function () { return api_1.isSignal; } });
var computed_1 = require("./render3/reactivity/computed");
Object.defineProperty(exports, "computed", { enumerable: true, get: function () { return computed_1.computed; } });
var signal_1 = require("./render3/reactivity/signal");
Object.defineProperty(exports, "signal", { enumerable: true, get: function () { return signal_1.signal; } });
Object.defineProperty(exports, "\u0275unwrapWritableSignal", { enumerable: true, get: function () { return signal_1.ɵunwrapWritableSignal; } });
var linked_signal_1 = require("./render3/reactivity/linked_signal");
Object.defineProperty(exports, "linkedSignal", { enumerable: true, get: function () { return linked_signal_1.linkedSignal; } });
var untracked_1 = require("./render3/reactivity/untracked");
Object.defineProperty(exports, "untracked", { enumerable: true, get: function () { return untracked_1.untracked; } });
var effect_1 = require("./render3/reactivity/effect");
Object.defineProperty(exports, "effect", { enumerable: true, get: function () { return effect_1.effect; } });
var root_effect_scheduler_1 = require("./render3/reactivity/root_effect_scheduler");
Object.defineProperty(exports, "\u0275EffectScheduler", { enumerable: true, get: function () { return root_effect_scheduler_1.EffectScheduler; } });
var after_render_effect_1 = require("./render3/reactivity/after_render_effect");
Object.defineProperty(exports, "afterRenderEffect", { enumerable: true, get: function () { return after_render_effect_1.afterRenderEffect; } });
var asserts_1 = require("./render3/reactivity/asserts");
Object.defineProperty(exports, "assertNotInReactiveContext", { enumerable: true, get: function () { return asserts_1.assertNotInReactiveContext; } });
