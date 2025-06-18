"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRECONNECT_CHECK_BLOCKLIST = exports.NgOptimizedImage = exports.provideNetlifyLoader = exports.provideImgixLoader = exports.provideImageKitLoader = exports.IMAGE_LOADER = exports.provideCloudinaryLoader = exports.provideCloudflareLoader = exports.ImageConfig = exports.IMAGE_CONFIG = void 0;
var core_1 = require("@angular/core");
Object.defineProperty(exports, "IMAGE_CONFIG", { enumerable: true, get: function () { return core_1.ɵIMAGE_CONFIG; } });
Object.defineProperty(exports, "ImageConfig", { enumerable: true, get: function () { return core_1.ɵImageConfig; } });
// These exports represent the set of symbols exposed as a public API.
var cloudflare_loader_1 = require("./image_loaders/cloudflare_loader");
Object.defineProperty(exports, "provideCloudflareLoader", { enumerable: true, get: function () { return cloudflare_loader_1.provideCloudflareLoader; } });
var cloudinary_loader_1 = require("./image_loaders/cloudinary_loader");
Object.defineProperty(exports, "provideCloudinaryLoader", { enumerable: true, get: function () { return cloudinary_loader_1.provideCloudinaryLoader; } });
var image_loader_1 = require("./image_loaders/image_loader");
Object.defineProperty(exports, "IMAGE_LOADER", { enumerable: true, get: function () { return image_loader_1.IMAGE_LOADER; } });
var imagekit_loader_1 = require("./image_loaders/imagekit_loader");
Object.defineProperty(exports, "provideImageKitLoader", { enumerable: true, get: function () { return imagekit_loader_1.provideImageKitLoader; } });
var imgix_loader_1 = require("./image_loaders/imgix_loader");
Object.defineProperty(exports, "provideImgixLoader", { enumerable: true, get: function () { return imgix_loader_1.provideImgixLoader; } });
var netlify_loader_1 = require("./image_loaders/netlify_loader");
Object.defineProperty(exports, "provideNetlifyLoader", { enumerable: true, get: function () { return netlify_loader_1.provideNetlifyLoader; } });
var ng_optimized_image_1 = require("./ng_optimized_image");
Object.defineProperty(exports, "NgOptimizedImage", { enumerable: true, get: function () { return ng_optimized_image_1.NgOptimizedImage; } });
var preconnect_link_checker_1 = require("./preconnect_link_checker");
Object.defineProperty(exports, "PRECONNECT_CHECK_BLOCKLIST", { enumerable: true, get: function () { return preconnect_link_checker_1.PRECONNECT_CHECK_BLOCKLIST; } });
