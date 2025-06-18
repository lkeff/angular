"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.netlifyLoaderInfo = void 0;
exports.provideNetlifyLoader = provideNetlifyLoader;
const core_1 = require("@angular/core");
const url_1 = require("../url");
const image_loader_1 = require("./image_loader");
const constants_1 = require("./constants");
/**
 * Name and URL tester for Netlify.
 */
exports.netlifyLoaderInfo = {
    name: 'Netlify',
    testUrl: isNetlifyUrl,
};
const NETLIFY_LOADER_REGEX = /https?\:\/\/[^\/]+\.netlify\.app\/.+/;
/**
 * Tests whether a URL is from a Netlify site. This won't catch sites with a custom domain,
 * but it's a good start for sites in development. This is only used to warn users who haven't
 * configured an image loader.
 */
function isNetlifyUrl(url) {
    return NETLIFY_LOADER_REGEX.test(url);
}
/**
 * Function that generates an ImageLoader for Netlify and turns it into an Angular provider.
 *
 * @param path optional URL of the desired Netlify site. Defaults to the current site.
 * @returns Set of providers to configure the Netlify loader.
 *
 * @publicApi
 */
function provideNetlifyLoader(path) {
    if (path && !(0, url_1.isValidPath)(path)) {
        throw new core_1.ɵRuntimeError(2959 /* RuntimeErrorCode.INVALID_LOADER_ARGUMENTS */, ngDevMode &&
            `Image loader has detected an invalid path (\`${path}\`). ` +
                `To fix this, supply either the full URL to the Netlify site, or leave it empty to use the current site.`);
    }
    if (path) {
        const url = new URL(path);
        path = url.origin;
    }
    const loaderFn = (config) => {
        return createNetlifyUrl(config, path);
    };
    const providers = [{ provide: image_loader_1.IMAGE_LOADER, useValue: loaderFn }];
    return providers;
}
const validParams = new Map([
    ['height', 'h'],
    ['fit', 'fit'],
    ['quality', 'q'],
    ['q', 'q'],
    ['position', 'position'],
]);
function createNetlifyUrl(config, path) {
    var _a, _b, _c, _d;
    // Note: `path` can be undefined, in which case we use a fake one to construct a `URL` instance.
    const url = new URL(path !== null && path !== void 0 ? path : 'https://a/');
    url.pathname = '/.netlify/images';
    if (!(0, url_1.isAbsoluteUrl)(config.src) && !config.src.startsWith('/')) {
        config.src = '/' + config.src;
    }
    url.searchParams.set('url', config.src);
    if (config.width) {
        url.searchParams.set('w', config.width.toString());
    }
    // When requesting a placeholder image we ask for a low quality image to reduce the load time.
    // If the quality is specified in the loader config - always use provided value.
    const configQuality = (_b = (_a = config.loaderParams) === null || _a === void 0 ? void 0 : _a['quality']) !== null && _b !== void 0 ? _b : (_c = config.loaderParams) === null || _c === void 0 ? void 0 : _c['q'];
    if (config.isPlaceholder && !configQuality) {
        url.searchParams.set('q', constants_1.PLACEHOLDER_QUALITY);
    }
    for (const [param, value] of Object.entries((_d = config.loaderParams) !== null && _d !== void 0 ? _d : {})) {
        if (validParams.has(param)) {
            url.searchParams.set(validParams.get(param), value.toString());
        }
        else {
            if (ngDevMode) {
                console.warn((0, core_1.ɵformatRuntimeError)(2959 /* RuntimeErrorCode.INVALID_LOADER_ARGUMENTS */, `The Netlify image loader has detected an \`<img>\` tag with the unsupported attribute "\`${param}\`".`));
            }
        }
    }
    // The "a" hostname is used for relative URLs, so we can remove it from the final URL.
    return url.hostname === 'a' ? url.href.replace(url.origin, '') : url.href;
}
