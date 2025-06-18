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
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const index_1 = require("../../index");
const matchers_1 = require("../../testing/src/matchers");
describe('Meta service', () => {
    let doc;
    let metaService;
    let defaultMeta;
    beforeEach(() => {
        doc = (0, common_1.ɵgetDOM)().createHtmlDocument();
        metaService = new index_1.Meta(doc);
        defaultMeta = (0, common_1.ɵgetDOM)().createElement('meta', doc);
        defaultMeta.setAttribute('property', 'fb:app_id');
        defaultMeta.setAttribute('content', '123456789');
        doc.getElementsByTagName('head')[0].appendChild(defaultMeta);
    });
    afterEach(() => (0, common_1.ɵgetDOM)().remove(defaultMeta));
    it('should return meta tag matching selector', () => {
        const actual = metaService.getTag('property="fb:app_id"');
        (0, matchers_1.expect)(actual).not.toBeNull();
        (0, matchers_1.expect)(actual.getAttribute('content')).toEqual('123456789');
    });
    it('should return all meta tags matching selector', () => {
        const tag1 = metaService.addTag({ name: 'author', content: 'page author' });
        const tag2 = metaService.addTag({ name: 'author', content: 'another page author' });
        const actual = metaService.getTags('name=author');
        (0, matchers_1.expect)(actual.length).toEqual(2);
        (0, matchers_1.expect)(actual[0].getAttribute('content')).toEqual('page author');
        (0, matchers_1.expect)(actual[1].getAttribute('content')).toEqual('another page author');
        // clean up
        metaService.removeTagElement(tag1);
        metaService.removeTagElement(tag2);
    });
    it('should return null if meta tag does not exist', () => {
        const actual = metaService.getTag('fake=fake');
        (0, matchers_1.expect)(actual).toBeNull();
    });
    it('should remove meta tag by the given selector', () => {
        const selector = 'name=author';
        (0, matchers_1.expect)(metaService.getTag(selector)).toBeNull();
        metaService.addTag({ name: 'author', content: 'page author' });
        (0, matchers_1.expect)(metaService.getTag(selector)).not.toBeNull();
        metaService.removeTag(selector);
        (0, matchers_1.expect)(metaService.getTag(selector)).toBeNull();
    });
    it('should remove meta tag by the given element', () => {
        const selector = 'name=keywords';
        (0, matchers_1.expect)(metaService.getTag(selector)).toBeNull();
        metaService.addTags([{ name: 'keywords', content: 'meta test' }]);
        const meta = metaService.getTag(selector);
        (0, matchers_1.expect)(meta).not.toBeNull();
        metaService.removeTagElement(meta);
        (0, matchers_1.expect)(metaService.getTag(selector)).toBeNull();
    });
    it('should update meta tag matching the given selector', () => {
        const selector = 'property="fb:app_id"';
        metaService.updateTag({ content: '4321' }, selector);
        const actual = metaService.getTag(selector);
        (0, matchers_1.expect)(actual).not.toBeNull();
        (0, matchers_1.expect)(actual.getAttribute('content')).toEqual('4321');
    });
    it('should extract selector from the tag definition', () => {
        const selector = 'property="fb:app_id"';
        metaService.updateTag({ property: 'fb:app_id', content: '666' });
        const actual = metaService.getTag(selector);
        (0, matchers_1.expect)(actual).not.toBeNull();
        (0, matchers_1.expect)(actual.getAttribute('content')).toEqual('666');
    });
    it('should create meta tag if it does not exist', () => {
        const selector = 'name="twitter:title"';
        metaService.updateTag({ name: 'twitter:title', content: 'Content Title' }, selector);
        const actual = metaService.getTag(selector);
        (0, matchers_1.expect)(actual).not.toBeNull();
        (0, matchers_1.expect)(actual.getAttribute('content')).toEqual('Content Title');
        // clean up
        metaService.removeTagElement(actual);
    });
    it('should add new meta tag', () => {
        const selector = 'name="og:title"';
        (0, matchers_1.expect)(metaService.getTag(selector)).toBeNull();
        metaService.addTag({ name: 'og:title', content: 'Content Title' });
        const actual = metaService.getTag(selector);
        (0, matchers_1.expect)(actual).not.toBeNull();
        (0, matchers_1.expect)(actual.getAttribute('content')).toEqual('Content Title');
        // clean up
        metaService.removeTagElement(actual);
    });
    it('should add httpEquiv meta tag as http-equiv', () => {
        metaService.addTag({ httpEquiv: 'refresh', content: '3;url=http://test' });
        const actual = metaService.getTag('http-equiv');
        (0, matchers_1.expect)(actual).not.toBeNull();
        (0, matchers_1.expect)(actual.getAttribute('http-equiv')).toEqual('refresh');
        (0, matchers_1.expect)(actual.getAttribute('content')).toEqual('3;url=http://test');
        // clean up
        metaService.removeTagElement(actual);
    });
    it('should add multiple new meta tags', () => {
        const nameSelector = 'name="twitter:title"';
        const propertySelector = 'property="og:title"';
        (0, matchers_1.expect)(metaService.getTag(nameSelector)).toBeNull();
        (0, matchers_1.expect)(metaService.getTag(propertySelector)).toBeNull();
        metaService.addTags([
            { name: 'twitter:title', content: 'Content Title' },
            { property: 'og:title', content: 'Content Title' },
        ]);
        const twitterMeta = metaService.getTag(nameSelector);
        const fbMeta = metaService.getTag(propertySelector);
        (0, matchers_1.expect)(twitterMeta).not.toBeNull();
        (0, matchers_1.expect)(fbMeta).not.toBeNull();
        // clean up
        metaService.removeTagElement(twitterMeta);
        metaService.removeTagElement(fbMeta);
    });
    it('should not add meta tag if it is already present on the page and has the same attr', () => {
        const selector = 'property="fb:app_id"';
        (0, matchers_1.expect)(metaService.getTags(selector).length).toEqual(1);
        metaService.addTag({ property: 'fb:app_id', content: '123456789' });
        (0, matchers_1.expect)(metaService.getTags(selector).length).toEqual(1);
    });
    it('should not add meta tag if it is already present on the page, even if the first tag with the same name has different other attributes', () => {
        metaService.addTag({ name: 'description', content: 'aaa' });
        metaService.addTag({ name: 'description', content: 'bbb' });
        metaService.addTag({ name: 'description', content: 'aaa' });
        metaService.addTag({ name: 'description', content: 'bbb' });
        (0, matchers_1.expect)(metaService.getTags('name="description"').length).toEqual(2);
    });
    it('should add meta tag if it is already present on the page and but has different attr', () => {
        const selector = 'property="fb:app_id"';
        (0, matchers_1.expect)(metaService.getTags(selector).length).toEqual(1);
        const meta = metaService.addTag({ property: 'fb:app_id', content: '666' });
        (0, matchers_1.expect)(metaService.getTags(selector).length).toEqual(2);
        // clean up
        metaService.removeTagElement(meta);
    });
    it('should add meta tag if it is already present on the page and force true', () => {
        const selector = 'property="fb:app_id"';
        (0, matchers_1.expect)(metaService.getTags(selector).length).toEqual(1);
        const meta = metaService.addTag({ property: 'fb:app_id', content: '123456789' }, true);
        (0, matchers_1.expect)(metaService.getTags(selector).length).toEqual(2);
        // clean up
        metaService.removeTagElement(meta);
    });
});
describe('integration test', () => {
    let DependsOnMeta = (() => {
        let _classDecorators = [(0, core_1.Injectable)()];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var DependsOnMeta = _classThis = class {
            constructor(meta) {
                this.meta = meta;
            }
        };
        __setFunctionName(_classThis, "DependsOnMeta");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            DependsOnMeta = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return DependsOnMeta = _classThis;
    })();
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.BrowserModule],
            providers: [DependsOnMeta],
        });
    });
    it('should inject Meta service when using BrowserModule', () => (0, matchers_1.expect)(testing_1.TestBed.inject(DependsOnMeta).meta).toBeInstanceOf(index_1.Meta));
});
