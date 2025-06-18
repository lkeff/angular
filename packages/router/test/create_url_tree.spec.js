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
const platform_browser_1 = require("@angular/platform-browser");
const create_url_tree_1 = require("../src/create_url_tree");
const router_1 = require("../src/router");
const router_module_1 = require("../src/router_module");
const shared_1 = require("../src/shared");
const url_tree_1 = require("../src/url_tree");
const src_1 = require("../src");
const helpers_1 = require("./helpers");
describe('createUrlTree', () => {
    const serializer = new url_tree_1.DefaultUrlSerializer();
    let router;
    beforeEach(() => {
        router = testing_1.TestBed.inject(router_1.Router);
        router.resetConfig([
            {
                path: 'parent',
                children: [
                    { path: 'child', component: class {
                        } },
                    { path: '**', outlet: 'secondary', component: class {
                        } },
                ],
            },
            {
                path: 'a',
                children: [
                    { path: '**', component: class {
                        } },
                    { path: '**', outlet: 'right', component: class {
                        } },
                    { path: '**', outlet: 'left', component: class {
                        } },
                ],
            },
            { path: '**', component: class {
                } },
            { path: '**', outlet: 'right', component: class {
                } },
            { path: '**', outlet: 'left', component: class {
                } },
            { path: '**', outlet: 'rootSecondary', component: class {
                } },
        ]);
    });
    describe('query parameters', () => {
        it('should support parameter with multiple values', () => __awaiter(void 0, void 0, void 0, function* () {
            const p1 = serializer.parse('/');
            const t1 = yield createRoot(p1, ['/'], { m: ['v1', 'v2'] });
            expect(serializer.serialize(t1)).toEqual('/?m=v1&m=v2');
            yield router.navigateByUrl('/a/c');
            const t2 = create(router.routerState.root.children[0].children[0], ['c2'], { m: ['v1', 'v2'] });
            expect(serializer.serialize(t2)).toEqual('/a/c/c2?m=v1&m=v2');
        }));
        it('should support parameter with empty arrays as values', () => __awaiter(void 0, void 0, void 0, function* () {
            yield router.navigateByUrl('/a/c');
            const t1 = create(router.routerState.root.children[0].children[0], ['c2'], { m: [] });
            expect(serializer.serialize(t1)).toEqual('/a/c/c2');
            const t2 = create(router.routerState.root.children[0].children[0], ['c2'], { m: [], n: 1 });
            expect(serializer.serialize(t2)).toEqual('/a/c/c2?n=1');
        }));
        it('should set query params', () => __awaiter(void 0, void 0, void 0, function* () {
            const p = serializer.parse('/');
            const t = yield createRoot(p, [], { a: 'hey' });
            expect(t.queryParams).toEqual({ a: 'hey' });
            expect(t.queryParamMap.get('a')).toEqual('hey');
        }));
        it('should stringify query params', () => __awaiter(void 0, void 0, void 0, function* () {
            const p = serializer.parse('/');
            const t = yield createRoot(p, [], { a: 1 });
            expect(t.queryParams).toEqual({ a: '1' });
            expect(t.queryParamMap.get('a')).toEqual('1');
        }));
    });
    it('should navigate to the root', () => __awaiter(void 0, void 0, void 0, function* () {
        const p = serializer.parse('/');
        const t = yield createRoot(p, ['/']);
        expect(serializer.serialize(t)).toEqual('/');
    }));
    it('should error when navigating to the root segment with params', () => __awaiter(void 0, void 0, void 0, function* () {
        const p = serializer.parse('/');
        yield expectAsync(createRoot(p, ['/', { p: 11 }])).toBeRejectedWithError(/Root segment cannot have matrix parameters/);
    }));
    it('should support nested segments', () => __awaiter(void 0, void 0, void 0, function* () {
        const p = serializer.parse('/a/b');
        const t = yield createRoot(p, ['/one', 11, 'two', 22]);
        expect(serializer.serialize(t)).toEqual('/one/11/two/22');
    }));
    it('should stringify positional parameters', () => __awaiter(void 0, void 0, void 0, function* () {
        const p = serializer.parse('/a/b');
        const t = yield createRoot(p, ['/one', 11]);
        const params = t.root.children[shared_1.PRIMARY_OUTLET].segments;
        expect(params[0].path).toEqual('one');
        expect(params[1].path).toEqual('11');
    }));
    it('should support first segments containing slashes', () => __awaiter(void 0, void 0, void 0, function* () {
        const p = serializer.parse('/');
        const t = yield createRoot(p, [{ segmentPath: '/one' }, 'two/three']);
        expect(serializer.serialize(t)).toEqual('/%2Fone/two%2Fthree');
    }));
    describe('named outlets', () => {
        it('should preserve secondary segments', () => __awaiter(void 0, void 0, void 0, function* () {
            const p = serializer.parse('/a/11/b(right:c)');
            const t = yield createRoot(p, ['/a', 11, 'd']);
            expect(serializer.serialize(t)).toEqual('/a/11/d(right:c)');
        }));
        it('should support updating secondary segments (absolute)', () => __awaiter(void 0, void 0, void 0, function* () {
            const p = serializer.parse('/a(right:b)');
            const t = yield createRoot(p, ['/', { outlets: { right: ['c'] } }]);
            expect(serializer.serialize(t)).toEqual('/a(right:c)');
        }));
        it('should support updating secondary segments', () => __awaiter(void 0, void 0, void 0, function* () {
            const p = serializer.parse('/a(right:b)');
            const t = yield createRoot(p, [{ outlets: { right: ['c', 11, 'd'] } }]);
            expect(serializer.serialize(t)).toEqual('/a(right:c/11/d)');
        }));
        it('should support updating secondary segments (nested case)', () => __awaiter(void 0, void 0, void 0, function* () {
            const p = serializer.parse('/a/(b//right:c)');
            const t = yield createRoot(p, ['a', { outlets: { right: ['d', 11, 'e'] } }]);
            expect(serializer.serialize(t)).toEqual('/a/(b//right:d/11/e)');
        }));
        it('should support removing secondary outlet with prefix', () => __awaiter(void 0, void 0, void 0, function* () {
            const p = serializer.parse('/parent/(child//secondary:popup)');
            const t = yield createRoot(p, ['parent', { outlets: { secondary: null } }]);
            // - Segment index 0:
            //   * match and keep existing 'parent'
            // - Segment index 1:
            //   * 'secondary' outlet cleared with `null`
            //   * 'primary' outlet not provided in the commands list, so the existing value is kept
            expect(serializer.serialize(t)).toEqual('/parent/child');
        }));
        it('should support updating secondary and primary outlets with prefix', () => __awaiter(void 0, void 0, void 0, function* () {
            const p = serializer.parse('/parent/child');
            const t = yield createRoot(p, ['parent', { outlets: { primary: 'child', secondary: 'popup' } }]);
            expect(serializer.serialize(t)).toEqual('/parent/(child//secondary:popup)');
        }));
        it('should support updating two outlets at the same time relative to non-root segment', () => __awaiter(void 0, void 0, void 0, function* () {
            yield router.navigateByUrl('/parent/child');
            const t = create(router.routerState.root.children[0], [
                { outlets: { primary: 'child', secondary: 'popup' } },
            ]);
            expect(serializer.serialize(t)).toEqual('/parent/(child//secondary:popup)');
        }));
        it('should support adding multiple outlets with prefix', () => __awaiter(void 0, void 0, void 0, function* () {
            const p = serializer.parse('');
            const t = yield createRoot(p, ['parent', { outlets: { primary: 'child', secondary: 'popup' } }]);
            expect(serializer.serialize(t)).toEqual('/parent/(child//secondary:popup)');
        }));
        it('should support updating clearing primary and secondary with prefix', () => __awaiter(void 0, void 0, void 0, function* () {
            const p = serializer.parse('/parent/(child//secondary:popup)');
            const t = yield createRoot(p, ['other']);
            // Because we navigate away from the 'parent' route, the children of that route are cleared
            // because they are note valid for the 'other' path.
            expect(serializer.serialize(t)).toEqual('/other');
        }));
        it('should not clear secondary outlet when at root and prefix is used', () => __awaiter(void 0, void 0, void 0, function* () {
            const p = serializer.parse('/other(rootSecondary:rootPopup)');
            const t = yield createRoot(p, ['parent', { outlets: { primary: 'child', rootSecondary: null } }]);
            // We prefixed the navigation with 'parent' so we cannot clear the "rootSecondary" outlet
            // because once the outlets object is consumed, traversal is beyond the root segment.
            expect(serializer.serialize(t)).toEqual('/parent/child(rootSecondary:rootPopup)');
        }));
        it('should not clear non-root secondary outlet when command is targeting root', () => __awaiter(void 0, void 0, void 0, function* () {
            const p = serializer.parse('/parent/(child//secondary:popup)');
            const t = yield createRoot(p, [{ outlets: { secondary: null } }]);
            // The start segment index for the command is at 0, but the outlet lives at index 1
            // so we cannot clear the outlet from processing segment index 0.
            expect(serializer.serialize(t)).toEqual('/parent/(child//secondary:popup)');
        }));
        it('can clear an auxiliary outlet at the correct segment level', () => __awaiter(void 0, void 0, void 0, function* () {
            const p = serializer.parse('/parent/(child//secondary:popup)(rootSecondary:rootPopup)');
            //                                       ^^^^^^^^^^^^^^^^^^^^^^
            // The parens here show that 'child' and 'secondary:popup' appear at the same 'level' in the
            // config, i.e. are part of the same children list. You can also imagine an implicit paren
            // group around the whole URL to visualize how 'parent' and 'rootSecondary:rootPopup' are also
            // defined at the same level.
            const t = yield createRoot(p, ['parent', { outlets: { primary: 'child', secondary: null } }]);
            expect(serializer.serialize(t)).toEqual('/parent/child(rootSecondary:rootPopup)');
        }));
        it('works with named children of empty path primary, relative to non-empty parent', () => __awaiter(void 0, void 0, void 0, function* () {
            router.resetConfig([
                {
                    path: 'case',
                    component: class {
                    },
                    children: [
                        {
                            path: '',
                            component: class {
                            },
                            children: [{ path: 'foo', outlet: 'foo', children: [] }],
                        },
                    ],
                },
            ]);
            yield router.navigateByUrl('/case');
            expect(router.url).toEqual('/case');
            expect(router
                .createUrlTree([{ outlets: { 'foo': ['foo'] } }], 
            // relative to the 'case' route
            { relativeTo: router.routerState.root.firstChild })
                .toString()).toEqual('/case/(foo:foo)');
        }));
        it('can change both primary and named outlets under an empty path', () => __awaiter(void 0, void 0, void 0, function* () {
            router.resetConfig([
                {
                    path: 'foo',
                    children: [
                        {
                            path: '',
                            component: class {
                            },
                            children: [
                                { path: 'bar', component: class {
                                    } },
                                { path: 'baz', component: class {
                                    }, outlet: 'other' },
                            ],
                        },
                    ],
                },
            ]);
            yield router.navigateByUrl('/foo/(bar//other:baz)');
            expect(router.url).toEqual('/foo/(bar//other:baz)');
            expect(router
                .createUrlTree([
                {
                    outlets: {
                        other: null,
                        primary: ['bar'],
                    },
                },
            ], 
            // relative to the root '' route
            { relativeTo: router.routerState.root.firstChild })
                .toString()).toEqual('/foo/bar');
        }));
        describe('absolute navigations', () => {
            it('with and pathless root', () => __awaiter(void 0, void 0, void 0, function* () {
                router.resetConfig([
                    {
                        path: '',
                        children: [{ path: '**', outlet: 'left', component: class {
                                } }],
                    },
                ]);
                yield router.navigateByUrl('(left:search)');
                expect(router.url).toEqual('/(left:search)');
                expect(router.createUrlTree(['/', { outlets: { 'left': ['projects', '123'] } }]).toString()).toEqual('/(left:projects/123)');
            }));
            it('empty path parent and sibling with a path', () => __awaiter(void 0, void 0, void 0, function* () {
                router.resetConfig([
                    {
                        path: '',
                        children: [
                            { path: 'x', component: class {
                                } },
                            { path: '**', outlet: 'left', component: class {
                                } },
                        ],
                    },
                ]);
                yield router.navigateByUrl('/x(left:search)');
                expect(router.url).toEqual('/x(left:search)');
                expect(router.createUrlTree(['/', { outlets: { 'left': ['projects', '123'] } }]).toString()).toEqual('/x(left:projects/123)');
                expect(router
                    .createUrlTree([
                    '/',
                    {
                        outlets: {
                            'primary': [
                                {
                                    outlets: {
                                        'left': ['projects', '123'],
                                    },
                                },
                            ],
                        },
                    },
                ])
                    .toString()).toEqual('/x(left:projects/123)');
            }));
            it('empty path parent and sibling', () => __awaiter(void 0, void 0, void 0, function* () {
                router.resetConfig([
                    {
                        path: '',
                        children: [
                            { path: '', component: class {
                                } },
                            { path: '**', outlet: 'left', component: class {
                                } },
                            { path: '**', outlet: 'right', component: class {
                                } },
                        ],
                    },
                ]);
                yield router.navigateByUrl('/(left:search//right:define)');
                expect(router.url).toEqual('/(left:search//right:define)');
                expect(router.createUrlTree(['/', { outlets: { 'left': ['projects', '123'] } }]).toString()).toEqual('/(left:projects/123//right:define)');
            }));
            it('two pathless parents', () => __awaiter(void 0, void 0, void 0, function* () {
                router.resetConfig([
                    {
                        path: '',
                        children: [
                            {
                                path: '',
                                children: [{ path: '**', outlet: 'left', component: class {
                                        } }],
                            },
                        ],
                    },
                ]);
                yield router.navigateByUrl('(left:search)');
                expect(router.url).toEqual('/(left:search)');
                expect(router.createUrlTree(['/', { outlets: { 'left': ['projects', '123'] } }]).toString()).toEqual('/(left:projects/123)');
            }));
            it('maintains structure when primary outlet is not pathless', () => __awaiter(void 0, void 0, void 0, function* () {
                router.resetConfig([
                    {
                        path: 'a',
                        children: [{ path: '**', outlet: 'left', component: class {
                                } }],
                    },
                    { path: '**', outlet: 'left', component: class {
                        } },
                ]);
                yield router.navigateByUrl('/a/(left:search)');
                expect(router.url).toEqual('/a/(left:search)');
                expect(router.createUrlTree(['/', { outlets: { 'left': ['projects', '123'] } }]).toString()).toEqual('/a/(left:search)(left:projects/123)');
            }));
        });
    });
    it('can navigate to nested route where commands is string', () => __awaiter(void 0, void 0, void 0, function* () {
        const p = serializer.parse('/');
        const t = yield createRoot(p, [
            '/',
            { outlets: { primary: ['child', { outlets: { primary: 'nested-primary' } }] } },
        ]);
        expect(serializer.serialize(t)).toEqual('/child/nested-primary');
    }));
    it('should throw when outlets is not the last command', () => __awaiter(void 0, void 0, void 0, function* () {
        const p = serializer.parse('/a');
        yield expectAsync(createRoot(p, ['a', { outlets: { right: ['c'] } }, 'c'])).toBeRejected();
    }));
    it('should support updating using a string', () => __awaiter(void 0, void 0, void 0, function* () {
        const p = serializer.parse('/a(right:b)');
        const t = yield createRoot(p, [{ outlets: { right: 'c/11/d' } }]);
        expect(serializer.serialize(t)).toEqual('/a(right:c/11/d)');
    }));
    it('should support updating primary and secondary segments at once', () => __awaiter(void 0, void 0, void 0, function* () {
        const p = serializer.parse('/a(right:b)');
        const t = yield createRoot(p, [{ outlets: { primary: 'y/z', right: 'c/11/d' } }]);
        expect(serializer.serialize(t)).toEqual('/y/z(right:c/11/d)');
    }));
    it('should support removing primary segment', () => __awaiter(void 0, void 0, void 0, function* () {
        const p = serializer.parse('/a/(b//right:c)');
        const t = yield createRoot(p, ['a', { outlets: { primary: null, right: 'd' } }]);
        expect(serializer.serialize(t)).toEqual('/a/(right:d)');
    }));
    it('should support removing secondary segments', () => __awaiter(void 0, void 0, void 0, function* () {
        const p = serializer.parse('/a(right:b)');
        const t = yield createRoot(p, [{ outlets: { right: null } }]);
        expect(serializer.serialize(t)).toEqual('/a');
    }));
    it('should support removing parenthesis for primary segment on second path element', () => __awaiter(void 0, void 0, void 0, function* () {
        const p = serializer.parse('/a/(b//right:c)');
        const t = yield createRoot(p, ['a', { outlets: { right: null } }]);
        expect(serializer.serialize(t)).toEqual('/a/b');
    }));
    it('should update matrix parameters', () => __awaiter(void 0, void 0, void 0, function* () {
        const p = serializer.parse('/a;pp=11');
        const t = yield createRoot(p, ['/a', { pp: 22, dd: 33 }]);
        expect(serializer.serialize(t)).toEqual('/a;pp=22;dd=33');
    }));
    it('should create matrix parameters', () => __awaiter(void 0, void 0, void 0, function* () {
        const p = serializer.parse('/a');
        const t = yield createRoot(p, ['/a', { pp: 22, dd: 33 }]);
        expect(serializer.serialize(t)).toEqual('/a;pp=22;dd=33');
    }));
    it('should create matrix parameters together with other segments', () => __awaiter(void 0, void 0, void 0, function* () {
        const p = serializer.parse('/a');
        const t = yield createRoot(p, ['/a', 'b', { aa: 22, bb: 33 }]);
        expect(serializer.serialize(t)).toEqual('/a/b;aa=22;bb=33');
    }));
    it('should stringify matrix parameters', () => __awaiter(void 0, void 0, void 0, function* () {
        yield router.navigateByUrl('/a');
        const relative = create(router.routerState.root.children[0], [{ pp: 22 }]);
        const segmentR = relative.root.children[shared_1.PRIMARY_OUTLET].segments[0];
        expect(segmentR.parameterMap.get('pp')).toEqual('22');
        const pa = serializer.parse('/a');
        const absolute = yield createRoot(pa, ['/b', { pp: 33 }]);
        const segmentA = absolute.root.children[shared_1.PRIMARY_OUTLET].segments[0];
        expect(segmentA.parameterMap.get('pp')).toEqual('33');
    }));
    describe('relative navigation', () => {
        it('should work', () => __awaiter(void 0, void 0, void 0, function* () {
            yield router.navigateByUrl('/a/(c//left:cp)(left:ap)');
            const t = create(router.routerState.root.children[0], ['c2']);
            expect(serializer.serialize(t)).toEqual('/a/(c2//left:cp)(left:ap)');
        }));
        it('should work when the first command starts with a ./', () => __awaiter(void 0, void 0, void 0, function* () {
            yield router.navigateByUrl('/a/(c//left:cp)(left:ap)');
            const t = create(router.routerState.root.children[0], ['./c2']);
            expect(serializer.serialize(t)).toEqual('/a/(c2//left:cp)(left:ap)');
        }));
        it('should work when the first command is ./)', () => __awaiter(void 0, void 0, void 0, function* () {
            yield router.navigateByUrl('/a/(c//left:cp)(left:ap)');
            const t = create(router.routerState.root.children[0], ['./', 'c2']);
            expect(serializer.serialize(t)).toEqual('/a/(c2//left:cp)(left:ap)');
        }));
        it('should support parameters-only navigation', () => __awaiter(void 0, void 0, void 0, function* () {
            yield router.navigateByUrl('/a');
            const t = create(router.routerState.root.children[0], [{ k: 99 }]);
            expect(serializer.serialize(t)).toEqual('/a;k=99');
        }));
        it('should support parameters-only navigation (nested case)', () => __awaiter(void 0, void 0, void 0, function* () {
            yield router.navigateByUrl('/a/(c//left:cp)(left:ap)');
            const t = create(router.routerState.root.children[0], [{ 'x': 99 }]);
            expect(serializer.serialize(t)).toEqual('/a;x=99(left:ap)');
        }));
        it('should support parameters-only navigation (with a double dot)', () => __awaiter(void 0, void 0, void 0, function* () {
            yield router.navigateByUrl('/a/(c//left:cp)(left:ap)');
            const t = create(router.routerState.root.children[0].children[0], ['../', { x: 5 }]);
            expect(serializer.serialize(t)).toEqual('/a;x=5(left:ap)');
        }));
        it('should work when index > 0', () => __awaiter(void 0, void 0, void 0, function* () {
            yield router.navigateByUrl('/a/c');
            const t = create(router.routerState.root.children[0].children[0], ['c2']);
            expect(serializer.serialize(t)).toEqual('/a/c/c2');
        }));
        it('should support going to a parent (within a segment)', () => __awaiter(void 0, void 0, void 0, function* () {
            yield router.navigateByUrl('/a/c');
            const t = create(router.routerState.root.children[0].children[0], ['../c2']);
            expect(serializer.serialize(t)).toEqual('/a/c2');
        }));
        it('should support going to a parent (across segments)', () => __awaiter(void 0, void 0, void 0, function* () {
            yield router.navigateByUrl('/q/(a/(c//left:cp)//left:qp)(left:ap)');
            // The resulting URL isn't necessarily correct. Though we could never truly navigate to the
            // URL above, this should probably go to '/q/a/c(left:ap)' at the very least and potentially
            // be able to go somewhere like /q/a/c/(left:xyz)(left:ap). That is, allow matching named
            // outlets as long as they do not have a primary outlet sibling. Having a primary outlet
            // sibling isn't possible because the wildcard should consume all the primary outlet segments
            // so there cannot be any remaining in the children.
            // https://github.com/angular/angular/issues/40089
            expect(router.url).toEqual('/q(left:ap)');
            const t = create(router.routerState.root.children[0].children[0], ['../../q2']);
            expect(serializer.serialize(t)).toEqual('/q2(left:ap)');
        }));
        it('should navigate to the root', () => __awaiter(void 0, void 0, void 0, function* () {
            yield router.navigateByUrl('/a/c');
            const t = create(router.routerState.root.children[0], ['../']);
            expect(serializer.serialize(t)).toEqual('/');
        }));
        it('should work with ../ when absolute url', () => __awaiter(void 0, void 0, void 0, function* () {
            yield router.navigateByUrl('/a/c');
            const t = create(router.routerState.root.children[0].children[0], ['../', 'c2']);
            expect(serializer.serialize(t)).toEqual('/a/c2');
        }));
        it('should work relative to root', () => __awaiter(void 0, void 0, void 0, function* () {
            yield router.navigateByUrl('/');
            const t = create(router.routerState.root, ['11']);
            expect(serializer.serialize(t)).toEqual('/11');
        }));
        it('should throw when too many ..', () => __awaiter(void 0, void 0, void 0, function* () {
            yield router.navigateByUrl('/a/(c//left:cp)(left:ap)');
            expect(() => create(router.routerState.root.children[0], ['../../'])).toThrowError();
        }));
        it('should support updating secondary segments', () => __awaiter(void 0, void 0, void 0, function* () {
            yield router.navigateByUrl('/a/b');
            const t = create(router.routerState.root.children[0].children[0], [
                { outlets: { right: ['c'] } },
            ]);
            expect(serializer.serialize(t)).toEqual('/a/b/(right:c)');
        }));
    });
    it('should set fragment', () => __awaiter(void 0, void 0, void 0, function* () {
        const p = serializer.parse('/');
        const t = yield createRoot(p, [], {}, 'fragment');
        expect(t.fragment).toEqual('fragment');
    }));
    it('should support pathless route', () => __awaiter(void 0, void 0, void 0, function* () {
        const p = serializer.parse('/a');
        const t = create(router.routerState.root.children[0], ['b']);
        expect(serializer.serialize(t)).toEqual('/b');
    }));
    it('should support pathless route with ../ at root', () => __awaiter(void 0, void 0, void 0, function* () {
        const p = serializer.parse('/a');
        const t = create(router.routerState.root.children[0], ['../b']);
        expect(serializer.serialize(t)).toEqual('/b');
    }));
    it('should support pathless child of pathless root', () => __awaiter(void 0, void 0, void 0, function* () {
        router.resetConfig([
            {
                path: '',
                children: [
                    { path: '', component: class {
                        } },
                    { path: 'lazy', component: class {
                        } },
                ],
            },
        ]);
        yield router.navigateByUrl('/');
        const t = create(router.routerState.root.children[0].children[0], ['lazy']);
        expect(serializer.serialize(t)).toEqual('/lazy');
    }));
});
describe('defaultQueryParamsHandling', () => {
    function setupRouter(defaultQueryParamsHandling) {
        return __awaiter(this, void 0, void 0, function* () {
            testing_1.TestBed.configureTestingModule({
                providers: [
                    (0, src_1.provideRouter)([{ path: '**', component: class {
                            } }], (0, src_1.withRouterConfig)({
                        defaultQueryParamsHandling,
                    })),
                ],
            });
            const router = testing_1.TestBed.inject(router_1.Router);
            yield router.navigateByUrl('/initial?a=1');
            return router;
        });
    }
    it('can use "merge" as the default', () => __awaiter(void 0, void 0, void 0, function* () {
        const router = yield setupRouter('merge');
        yield router.navigate(['new'], { queryParams: { 'b': 2 } });
        expect(router.url).toEqual('/new?a=1&b=2');
    }));
    it('can use "perserve" as the default', () => __awaiter(void 0, void 0, void 0, function* () {
        const router = yield setupRouter('preserve');
        yield router.navigate(['new'], { queryParams: { 'b': 2 } });
        expect(router.url).toEqual('/new?a=1');
    }));
    it('can override the default by providing a new option', () => __awaiter(void 0, void 0, void 0, function* () {
        const router = yield setupRouter('preserve');
        yield router.navigate(['new'], { queryParams: { 'b': 2 }, queryParamsHandling: 'merge' });
        expect(router.url).toEqual('/new?a=1&b=2');
        yield router.navigate(['replace'], { queryParamsHandling: 'replace' });
        expect(router.url).toEqual('/replace');
    }));
});
function createRoot(tree, commands, queryParams, fragment) {
    return __awaiter(this, void 0, void 0, function* () {
        const router = testing_1.TestBed.inject(router_1.Router);
        yield router.navigateByUrl(tree);
        return router.createUrlTree(commands, {
            relativeTo: router.routerState.root,
            queryParams,
            fragment,
        });
    });
}
function create(relativeTo, commands, queryParams, fragment) {
    return testing_1.TestBed.inject(router_1.Router).createUrlTree(commands, { relativeTo, queryParams, fragment });
}
describe('createUrlTreeFromSnapshot', () => {
    it('can create a UrlTree relative to empty path named parent', () => __awaiter(void 0, void 0, void 0, function* () {
        let MainPageComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<router-outlet></router-outlet>`,
                    imports: [router_module_1.RouterModule],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MainPageComponent = _classThis = class {
                constructor(route, router) {
                    this.route = route;
                    this.router = router;
                }
                navigate() {
                    this.router.navigateByUrl((0, create_url_tree_1.createUrlTreeFromSnapshot)(this.route.snapshot, ['innerRoute'], null, null));
                }
            };
            __setFunctionName(_classThis, "MainPageComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MainPageComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MainPageComponent = _classThis;
        })();
        let ChildComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: 'child works!',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ChildComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "ChildComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ChildComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ChildComponent = _classThis;
        })();
        let RootCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<router-outlet name="main-page"></router-outlet>',
                    imports: [router_module_1.RouterModule],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var RootCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "RootCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                RootCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return RootCmp = _classThis;
        })();
        const routes = [
            {
                path: '',
                component: MainPageComponent,
                outlet: 'main-page',
                children: [{ path: 'innerRoute', component: ChildComponent }],
            },
        ];
        testing_1.TestBed.configureTestingModule({ imports: [router_module_1.RouterModule.forRoot(routes)] });
        const router = testing_1.TestBed.inject(router_1.Router);
        const fixture = testing_1.TestBed.createComponent(RootCmp);
        router.initialNavigation();
        yield advance(fixture);
        fixture.debugElement.query(platform_browser_1.By.directive(MainPageComponent)).componentInstance.navigate();
        yield advance(fixture);
        expect(fixture.nativeElement.innerHTML).toContain('child works!');
    }));
    it('can navigate to relative to `ActivatedRouteSnapshot` in guard', () => __awaiter(void 0, void 0, void 0, function* () {
        let Guard = (() => {
            let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Guard = _classThis = class {
                constructor(router) {
                    this.router = router;
                }
                canActivate(snapshot) {
                    this.router.navigateByUrl((0, create_url_tree_1.createUrlTreeFromSnapshot)(snapshot, ['../sibling'], null, null));
                }
            };
            __setFunctionName(_classThis, "Guard");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Guard = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Guard = _classThis;
        })();
        let GuardedComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `main`,
                    imports: [router_module_1.RouterModule],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var GuardedComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "GuardedComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                GuardedComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return GuardedComponent = _classThis;
        })();
        let SiblingComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: 'sibling' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SiblingComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "SiblingComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SiblingComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SiblingComponent = _classThis;
        })();
        let RootCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<router-outlet></router-outlet>',
                    imports: [router_module_1.RouterModule],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var RootCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "RootCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                RootCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return RootCmp = _classThis;
        })();
        const routes = [
            {
                path: 'parent',
                component: RootCmp,
                children: [
                    {
                        path: 'guarded',
                        component: GuardedComponent,
                        canActivate: [Guard],
                    },
                    {
                        path: 'sibling',
                        component: SiblingComponent,
                    },
                ],
            },
        ];
        testing_1.TestBed.configureTestingModule({ imports: [router_module_1.RouterModule.forRoot(routes)] });
        const router = testing_1.TestBed.inject(router_1.Router);
        const fixture = testing_1.TestBed.createComponent(RootCmp);
        router.navigateByUrl('parent/guarded');
        yield advance(fixture);
        expect(router.url).toEqual('/parent/sibling');
    }));
});
function advance(fixture) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, helpers_1.timeout)();
        fixture.detectChanges();
    });
}
