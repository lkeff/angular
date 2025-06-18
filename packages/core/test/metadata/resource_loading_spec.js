"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const resource_loading_1 = require("../../src/metadata/resource_loading");
const directive_1 = require("../../src/render3/jit/directive");
describe('resource_loading', () => {
    afterEach(resource_loading_1.clearResolutionOfComponentResourcesQueue);
    describe('error handling', () => {
        it('should throw an error when compiling component that has unresolved templateUrl', () => {
            const MyComponent = class MyComponent {
            };
            (0, directive_1.compileComponent)(MyComponent, { templateUrl: 'someUrl' });
            expect(() => MyComponent.ɵcmp).toThrowError(`
Component 'MyComponent' is not resolved:
 - templateUrl: someUrl
Did you run and wait for 'resolveComponentResources()'?`.trim());
        });
        it('should throw an error when compiling component that has unresolved styleUrls', () => {
            const MyComponent = class MyComponent {
            };
            (0, directive_1.compileComponent)(MyComponent, { styleUrls: ['someUrl1', 'someUrl2'] });
            expect(() => MyComponent.ɵcmp).toThrowError(`
Component 'MyComponent' is not resolved:
 - styleUrls: ["someUrl1","someUrl2"]
Did you run and wait for 'resolveComponentResources()'?`.trim());
        });
        it('should throw an error when compiling component that has unresolved templateUrl and styleUrls', () => {
            const MyComponent = class MyComponent {
            };
            (0, directive_1.compileComponent)(MyComponent, { templateUrl: 'someUrl', styleUrls: ['someUrl1', 'someUrl2'] });
            expect(() => MyComponent.ɵcmp).toThrowError(`
Component 'MyComponent' is not resolved:
 - templateUrl: someUrl
 - styleUrls: ["someUrl1","someUrl2"]
Did you run and wait for 'resolveComponentResources()'?`.trim());
        });
    });
    describe('resolution', () => {
        const URLS = {
            'test://content': Promise.resolve('content'),
            'test://style': Promise.resolve('style'),
            'test://style1': Promise.resolve('style1'),
            'test://style2': Promise.resolve('style2'),
        };
        let resourceFetchCount;
        function testResolver(url) {
            resourceFetchCount++;
            return URLS[url] || Promise.reject('NOT_FOUND: ' + url);
        }
        beforeEach(() => (resourceFetchCount = 0));
        it('should resolve template', () => __awaiter(void 0, void 0, void 0, function* () {
            const MyComponent = class MyComponent {
            };
            const metadata = { templateUrl: 'test://content' };
            (0, directive_1.compileComponent)(MyComponent, metadata);
            yield (0, resource_loading_1.resolveComponentResources)(testResolver);
            expect(MyComponent.ɵcmp).toBeDefined();
            expect(metadata.template).toBe('content');
            expect(resourceFetchCount).toBe(1);
        }));
        it('should resolve styleUrls', () => __awaiter(void 0, void 0, void 0, function* () {
            const MyComponent = class MyComponent {
            };
            const metadata = { template: '', styleUrls: ['test://style1', 'test://style2'] };
            (0, directive_1.compileComponent)(MyComponent, metadata);
            yield (0, resource_loading_1.resolveComponentResources)(testResolver);
            expect(MyComponent.ɵcmp).toBeDefined();
            expect(metadata.styleUrls).toBe(undefined);
            expect(metadata.styles).toEqual(['style1', 'style2']);
            expect(resourceFetchCount).toBe(2);
        }));
        it('should cache multiple resolution to same URL', () => __awaiter(void 0, void 0, void 0, function* () {
            const MyComponent = class MyComponent {
            };
            const metadata = { template: '', styleUrls: ['test://style1', 'test://style1'] };
            (0, directive_1.compileComponent)(MyComponent, metadata);
            yield (0, resource_loading_1.resolveComponentResources)(testResolver);
            expect(MyComponent.ɵcmp).toBeDefined();
            expect(metadata.styleUrls).toBe(undefined);
            expect(metadata.styles).toEqual(['style1', 'style1']);
            expect(resourceFetchCount).toBe(1);
        }));
        it('should keep order even if the resolution is out of order', () => __awaiter(void 0, void 0, void 0, function* () {
            const MyComponent = class MyComponent {
            };
            const metadata = {
                template: '',
                styles: ['existing'],
                styleUrls: ['test://style1', 'test://style2'],
            };
            (0, directive_1.compileComponent)(MyComponent, metadata);
            const resolvers = [];
            const resolved = (0, resource_loading_1.resolveComponentResources)((url) => new Promise((resolve, response) => resolvers.push(url, resolve)));
            // Out of order resolution
            expect(resolvers[0]).toEqual('test://style1');
            expect(resolvers[2]).toEqual('test://style2');
            resolvers[3]('second');
            resolvers[1]('first');
            yield resolved;
            expect(metadata.styleUrls).toBe(undefined);
            expect(metadata.styles).toEqual(['existing', 'first', 'second']);
        }));
        it('should not add components without external resources to resolution queue', () => {
            const MyComponent = class MyComponent {
            };
            const MyComponent2 = class MyComponent {
            };
            (0, directive_1.compileComponent)(MyComponent, { template: '' });
            expect((0, resource_loading_1.isComponentResourceResolutionQueueEmpty)()).toBe(true);
            (0, directive_1.compileComponent)(MyComponent2, { templateUrl: 'test://template' });
            expect((0, resource_loading_1.isComponentResourceResolutionQueueEmpty)()).toBe(false);
        });
        it('should resolve styles passed in as a string', () => __awaiter(void 0, void 0, void 0, function* () {
            const MyComponent = class MyComponent {
            };
            const metadata = { template: '', styles: 'existing' };
            (0, directive_1.compileComponent)(MyComponent, metadata);
            yield (0, resource_loading_1.resolveComponentResources)(testResolver);
            expect(MyComponent.ɵcmp).toBeDefined();
            expect(metadata.styleUrls).toBe(undefined);
            expect(metadata.styles).toEqual('existing');
            expect(resourceFetchCount).toBe(0);
        }));
        it('should resolve styleUrl', () => __awaiter(void 0, void 0, void 0, function* () {
            const MyComponent = class MyComponent {
            };
            const metadata = { template: '', styleUrl: 'test://style' };
            (0, directive_1.compileComponent)(MyComponent, metadata);
            yield (0, resource_loading_1.resolveComponentResources)(testResolver);
            expect(MyComponent.ɵcmp).toBeDefined();
            expect(metadata.styleUrl).toBe(undefined);
            expect(metadata.styles).toEqual(['style']);
            expect(resourceFetchCount).toBe(1);
        }));
        it('should resolve both styles passed in as a string together with styleUrl', () => __awaiter(void 0, void 0, void 0, function* () {
            const MyComponent = class MyComponent {
            };
            const metadata = { template: '', styleUrl: 'test://style', styles: 'existing' };
            (0, directive_1.compileComponent)(MyComponent, metadata);
            yield (0, resource_loading_1.resolveComponentResources)(testResolver);
            expect(MyComponent.ɵcmp).toBeDefined();
            expect(metadata.styleUrls).toBe(undefined);
            expect(metadata.styles).toEqual(['existing', 'style']);
            expect(resourceFetchCount).toBe(1);
        }));
        it('should throw if both styleUrls and styleUrl are passed in', () => __awaiter(void 0, void 0, void 0, function* () {
            const MyComponent = class MyComponent {
            };
            const metadata = {
                template: '',
                styleUrl: 'test://style1',
                styleUrls: ['test://style2'],
            };
            (0, directive_1.compileComponent)(MyComponent, metadata);
            expect(() => (0, resource_loading_1.resolveComponentResources)(testResolver)).toThrowError(/@Component cannot define both `styleUrl` and `styleUrls`/);
        }));
    });
    describe('fetch', () => {
        function fetch(url) {
            return Promise.resolve({
                text() {
                    return 'response for ' + url;
                },
            });
        }
        it('should work with fetch', () => __awaiter(void 0, void 0, void 0, function* () {
            const MyComponent = class MyComponent {
            };
            const metadata = { templateUrl: 'test://content' };
            (0, directive_1.compileComponent)(MyComponent, metadata);
            yield (0, resource_loading_1.resolveComponentResources)(fetch);
            expect(MyComponent.ɵcmp).toBeDefined();
            expect(metadata.template).toBe('response for test://content');
        }));
    });
});
