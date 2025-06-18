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
exports.Search = exports.provideAlgoliaSearchClient = exports.ALGOLIA_CLIENT = exports.MAX_VALUE_PER_FACET = exports.SEARCH_DELAY = void 0;
const core_1 = require("@angular/core");
const index_1 = require("../providers/index");
const lite_1 = require("algoliasearch/lite");
exports.SEARCH_DELAY = 200;
// Maximum number of facet values to return for each facet during a regular search.
exports.MAX_VALUE_PER_FACET = 5;
exports.ALGOLIA_CLIENT = new core_1.InjectionToken('Search service');
const provideAlgoliaSearchClient = (config) => {
    return {
        provide: exports.ALGOLIA_CLIENT,
        useFactory: () => (0, lite_1.liteClient)(config.algolia.appId, config.algolia.apiKey),
    };
};
exports.provideAlgoliaSearchClient = provideAlgoliaSearchClient;
let Search = (() => {
    let _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Search = _classThis = class {
        constructor() {
            this.searchQuery = (0, core_1.signal)('');
            this.config = (0, core_1.inject)(index_1.ENVIRONMENT);
            this.client = (0, core_1.inject)(exports.ALGOLIA_CLIENT);
            this.searchResults = (0, core_1.resource)({
                params: () => this.searchQuery() || undefined, // coerces empty string to undefined
                loader: (_a) => __awaiter(this, [_a], void 0, function* ({ params: query, abortSignal }) {
                    // Until we have a better alternative we debounce by awaiting for a short delay.
                    yield wait(exports.SEARCH_DELAY, abortSignal);
                    return this.client
                        .search([
                        {
                            indexName: this.config.algolia.indexName,
                            params: {
                                query: query,
                                maxValuesPerFacet: exports.MAX_VALUE_PER_FACET,
                                attributesToRetrieve: [
                                    'hierarchy.lvl0',
                                    'hierarchy.lvl1',
                                    'hierarchy.lvl2',
                                    'hierarchy.lvl3',
                                    'hierarchy.lvl4',
                                    'hierarchy.lvl5',
                                    'hierarchy.lvl6',
                                    'content',
                                    'type',
                                    'url',
                                ],
                                hitsPerPage: 20,
                                snippetEllipsisText: '…',
                                highlightPreTag: '<ɵ>',
                                highlightPostTag: '</ɵ>',
                                attributesToHighlight: [],
                                attributesToSnippet: [
                                    'hierarchy.lvl1:10',
                                    'hierarchy.lvl2:10',
                                    'hierarchy.lvl3:10',
                                    'hierarchy.lvl4:10',
                                    'hierarchy.lvl5:10',
                                    'hierarchy.lvl6:10',
                                    'content:10',
                                ],
                            },
                            type: 'default',
                        },
                    ])
                        .then((response) => {
                        return this.parseResult(response);
                    });
                }),
            });
        }
        getUniqueSearchResultItems(items) {
            const uniqueUrls = new Set();
            return items.filter((item) => {
                var _a, _b;
                if (item.type === 'content' && !item._snippetResult.content) {
                    return false;
                }
                // Ensure that this result actually matched on the type.
                // If not, this is going to be a duplicate. There should be another result in
                // the list that already matched on its type.
                // A lvl2 match will also return all its lvl3 results as well, even if those
                // values don't also match the query.
                if (item.type.indexOf('lvl') === 0 &&
                    ((_b = (_a = item._snippetResult.hierarchy) === null || _a === void 0 ? void 0 : _a[item.type]) === null || _b === void 0 ? void 0 : _b.matchLevel) === 'none') {
                    return false;
                }
                if (item['url'] && typeof item['url'] === 'string' && !uniqueUrls.has(item['url'])) {
                    uniqueUrls.add(item['url']);
                    return true;
                }
                return false;
            });
        }
        parseResult(response) {
            if (!response) {
                return;
            }
            const result = response.results[0];
            if (!result || !('hits' in result)) {
                return;
            }
            const items = result.hits;
            return this.getUniqueSearchResultItems(items).map((hitItem) => {
                var _a, _b, _c, _d, _e;
                const content = hitItem._snippetResult.content;
                const hierarchy = hitItem._snippetResult.hierarchy;
                const hasSubLabel = content || (hierarchy === null || hierarchy === void 0 ? void 0 : hierarchy.lvl2) || (hierarchy === null || hierarchy === void 0 ? void 0 : hierarchy.lvl3) || (hierarchy === null || hierarchy === void 0 ? void 0 : hierarchy.lvl4);
                return {
                    id: hitItem.objectID,
                    type: hitItem.hierarchy.lvl0 === 'Tutorials' ? 'code' : 'doc',
                    url: hitItem.url,
                    labelHtml: this.parseLabelToHtml((_c = (_b = (_a = hitItem._snippetResult.hierarchy) === null || _a === void 0 ? void 0 : _a.lvl1) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : ''),
                    subLabelHtml: this.parseLabelToHtml(hasSubLabel ? this.getBestSnippetForMatch(hitItem) : null),
                    category: (_e = (_d = hitItem.hierarchy) === null || _d === void 0 ? void 0 : _d.lvl0) !== null && _e !== void 0 ? _e : null,
                };
            });
        }
        getBestSnippetForMatch(result) {
            var _a, _b, _c, _d;
            // if there is content, return it
            if (result._snippetResult.content !== undefined) {
                return result._snippetResult.content.value;
            }
            const hierarchy = result._snippetResult.hierarchy;
            if (hierarchy === undefined) {
                return '';
            }
            // return the most specific subheader match
            if (matched(hierarchy.lvl4)) {
                return hierarchy.lvl4.value;
            }
            if (matched(hierarchy.lvl3)) {
                return hierarchy.lvl3.value;
            }
            if (matched(hierarchy.lvl2)) {
                return hierarchy.lvl2.value;
            }
            // if no subheader matched the query, fall back to just returning the most specific one
            return (_d = (_b = (_a = hierarchy.lvl3) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : (_c = hierarchy.lvl2) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : '';
        }
        /**
         * Returns an HTML string with marked text for the matches
         */
        parseLabelToHtml(label) {
            if (label === null) {
                return null;
            }
            const parts = [];
            while (label.indexOf('<ɵ>') !== -1) {
                const beforeMatch = label.substring(0, label.indexOf('<ɵ>'));
                const match = label.substring(label.indexOf('<ɵ>') + 3, label.indexOf('</ɵ>'));
                parts.push({ highlight: false, text: beforeMatch });
                parts.push({ highlight: true, text: match });
                label = label.substring(label.indexOf('</ɵ>') + 4);
            }
            parts.push({ highlight: false, text: label });
            return parts
                .map((part) => {
                return part.highlight ? `<mark>${part.text}</mark>` : `<span>${part.text}</span>`;
            })
                .join('');
        }
    };
    __setFunctionName(_classThis, "Search");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Search = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Search = _classThis;
})();
exports.Search = Search;
function matched(snippet) {
    return (snippet === null || snippet === void 0 ? void 0 : snippet.matchLevel) !== undefined && snippet.matchLevel !== 'none';
}
/**
 * Temporary helper to implement the debounce functionality on the search resource
 */
function wait(ms, signal) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => resolve(), ms);
        signal.addEventListener('abort', () => {
            clearTimeout(timeout);
            reject(new Error('Operation aborted'));
        }, { once: true });
    });
}
