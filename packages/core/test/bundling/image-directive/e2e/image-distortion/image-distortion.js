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
exports.ImageDistortionFailingComponent = exports.ImageDistortionPassingComponent = void 0;
const common_1 = require("@angular/common");
const core_1 = require("../../../../../src/core");
let ImageDistortionPassingComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'image-distortion-passing',
            standalone: true,
            imports: [common_1.NgOptimizedImage],
            template: `
     <!-- All the images in this template should not throw -->
     <!-- This image is here for the sake of making sure the "LCP image is priority" assertion is passed -->
     <img ngSrc="/e2e/logo-500w.jpg" width="500" height="500" priority>
     <br>
     <!-- width and height attributes exactly match the intrinsic size of image -->
     <img ngSrc="/e2e/a.png" width="25" height="25">
     <br>
     <!-- supplied aspect ratio exactly matches intrinsic aspect ratio-->
     <img ngSrc="/e2e/a.png" width="250" height="250">
     <img ngSrc="/e2e/b.png" width="40" height="40">
     <img ngSrc="/e2e/b.png" width="240" height="240">
     <br>
     <!-- supplied aspect ratio is similar to intrinsic aspect ratio -->
     <!-- Aspect-ratio: 0.93333333333 -->
     <img ngSrc="/e2e/b.png" width="28" height="30">
     <!-- Aspect-ratio: 0.9 -->
     <img ngSrc="/e2e/b.png" width="27" height="30">
     <!-- Aspect-ratio: 1.09375 -->
     <img ngSrc="/e2e/b.png" width="350" height="320">
     <!-- Aspect-ratio: 1.0652173913 -->
     <img ngSrc="/e2e/b.png" width="245" height="230">
     <br>
     <!-- Fill mode disables aspect ratio warning -->
     <!-- Aspect-ratio: 0.1 -->
     <img ngSrc="/e2e/b.png" width="24" height="240" disableOptimizedSrcset fill>
     <br>
     <!-- Supplied aspect ratio is correct & image has 0x0 rendered size -->
     <img ngSrc="/e2e/a.png" width="25" height="25" style="display: none">
     <br>
     <!-- styling is correct -->
     <img ngSrc="/e2e/a.png" width="25" height="25" style="width: 100%; height: 100%">
     <img ngSrc="/e2e/a.png" width="250" height="250" style="max-width: 100%; height: 100%">
     <img ngSrc="/e2e/a.png" width="25" height="25" style="height: 25%; width: 25%;">
     <br>
     <!-- handles padding -->
     <img ngSrc="/e2e/a.png" width="25" height="25" style="padding: 4px">
     <img ngSrc="/e2e/a.png" width="25" height="25" style="padding-top: 4px">
     <img ngSrc="/e2e/a.png" width="25" height="25" style="padding-right: 4px">
     <img ngSrc="/e2e/a.png" width="25" height="25" style="padding-bottom: 4px">
     <img ngSrc="/e2e/a.png" width="25" height="25" style="padding-left: 4px; box-sizing: content-box; height: 25px; width: auto">
     <img ngSrc="/e2e/a.png" width="25" height="25" style="padding-left: 4px; box-sizing: border-box; height: 25px; width: auto">
     <img ngSrc="/e2e/a.png" width="25" height="25" style="padding: 1px 2px 5px 10px; box-sizing: content-box; height: 25px; width: auto">
     <img ngSrc="/e2e/a.png" width="25" height="25" style="padding: 1px 2px 5px 10px; box-sizing: border-box; height: 25px; width: auto">
     <br>
     <!-- autoscale with large difference between width and height resulting in rounding -->
     <img ngSrc="/e2e/white-607x3.png" width="607" height="3" style="width: auto; height: 2px">
     <br>
    `,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ImageDistortionPassingComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "ImageDistortionPassingComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ImageDistortionPassingComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ImageDistortionPassingComponent = _classThis;
})();
exports.ImageDistortionPassingComponent = ImageDistortionPassingComponent;
let ImageDistortionFailingComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'image-distortion-failing',
            standalone: true,
            imports: [common_1.NgOptimizedImage],
            template: `
     <!-- With the exception of the priority image, all the images in this template should throw -->
     <!-- This image is here for the sake of making sure the "LCP image is priority" assertion is passed -->
     <img ngSrc="/e2e/logo-500w.jpg" width="500" height="500" priority>
     <br>
     <!-- These images should throw -->
     <!-- Supplied aspect ratio differs from intrinsic aspect ratio by > .1 -->
     <!-- Aspect-ratio: 0.86666666666 -->
     <img ngSrc="/e2e/b.png" width="26" height="30" disableOptimizedSrcset>
     <!-- Aspect-ratio: 0.1 -->
     <img ngSrc="/e2e/b.png" width="24" height="240" disableOptimizedSrcset>
     <!-- Supplied aspect ratio is incorrect & image has 0x0 rendered size -->
     <img ngSrc="/e2e/a.png" width="222" height="25" style="display: none" disableOptimizedSrcset>
     <br>
     <!-- Image styling is causing distortion -->
     <div style="width: 300px; height: 300px">
       <img ngSrc="/e2e/b.png" width="250" height="250" style="width: 10%" disableOptimizedSrcset>
       <img ngSrc="/e2e/b.png" width="250" height="250" style="max-height: 10%" disableOptimizedSrcset>
       <!-- Images dimensions are incorrect AND image styling is incorrect -->
       <img ngSrc="/e2e/b.png" width="150" height="250" style="max-height: 10%" disableOptimizedSrcset>
     </div>
     <!-- Image is distorted but padding is applied to trick clientWidth -->
     <img
       ngSrc="/e2e/logo-500w.jpg"
       width="500"
       height="500"
       priority
       style="width: 100px; height: 500px; padding-left: 400px; box-sizing: content-box">
     <img
       ngSrc="/e2e/logo-500w.jpg"
       width="500"
       height="500"
       priority
       style="width: 400px; height: 400px; padding-left: 200px; box-sizing: border-box">
     `,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ImageDistortionFailingComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "ImageDistortionFailingComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ImageDistortionFailingComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ImageDistortionFailingComponent = _classThis;
})();
exports.ImageDistortionFailingComponent = ImageDistortionFailingComponent;
