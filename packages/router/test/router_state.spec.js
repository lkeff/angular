"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const router_state_1 = require("../src/router_state");
const shared_1 = require("../src/shared");
const url_tree_1 = require("../src/url_tree");
const tree_1 = require("../src/utils/tree");
describe('RouterState & Snapshot', () => {
    describe('RouterStateSnapshot', () => {
        let state;
        let a;
        let b;
        let c;
        beforeEach(() => {
            a = createActivatedRouteSnapshot('a');
            b = createActivatedRouteSnapshot('b');
            c = createActivatedRouteSnapshot('c');
            const root = new tree_1.TreeNode(a, [new tree_1.TreeNode(b, []), new tree_1.TreeNode(c, [])]);
            state = new router_state_1.RouterStateSnapshot('url', root);
        });
        it('should return first child', () => {
            expect(state.root.firstChild).toBe(b);
        });
        it('should return children', () => {
            const cc = state.root.children;
            expect(cc[0]).toBe(b);
            expect(cc[1]).toBe(c);
        });
        it('should return root', () => {
            const b = state.root.firstChild;
            expect(b.root).toBe(state.root);
        });
        it('should return parent', () => {
            const b = state.root.firstChild;
            expect(b.parent).toBe(state.root);
        });
        it('should return path from root', () => {
            const b = state.root.firstChild;
            const p = b.pathFromRoot;
            expect(p[0]).toBe(state.root);
            expect(p[1]).toBe(b);
        });
    });
    describe('RouterState', () => {
        let state;
        let a;
        let b;
        let c;
        beforeEach(() => {
            a = createActivatedRoute('a');
            b = createActivatedRoute('b');
            c = createActivatedRoute('c');
            const root = new tree_1.TreeNode(a, [new tree_1.TreeNode(b, []), new tree_1.TreeNode(c, [])]);
            state = new router_state_1.RouterState(root, null);
        });
        it('should return first child', () => {
            expect(state.root.firstChild).toBe(b);
        });
        it('should return children', () => {
            const cc = state.root.children;
            expect(cc[0]).toBe(b);
            expect(cc[1]).toBe(c);
        });
        it('should return root', () => {
            const b = state.root.firstChild;
            expect(b.root).toBe(state.root);
        });
        it('should return parent', () => {
            const b = state.root.firstChild;
            expect(b.parent).toBe(state.root);
        });
        it('should return path from root', () => {
            const b = state.root.firstChild;
            const p = b.pathFromRoot;
            expect(p[0]).toBe(state.root);
            expect(p[1]).toBe(b);
        });
    });
    describe('equalParamsAndUrlSegments', () => {
        function createSnapshot(params, url) {
            const snapshot = new router_state_1.ActivatedRouteSnapshot(url, params, null, null, null, null, null, null, null, -1, null);
            snapshot._routerState = new router_state_1.RouterStateSnapshot('', new tree_1.TreeNode(snapshot, []));
            return snapshot;
        }
        function createSnapshotPairWithParent(params, parentParams, urls) {
            const snapshot1 = createSnapshot(params[0], []);
            const snapshot2 = createSnapshot(params[1], []);
            const snapshot1Parent = createSnapshot(parentParams[0], [new url_tree_1.UrlSegment(urls[0], {})]);
            const snapshot2Parent = createSnapshot(parentParams[1], [new url_tree_1.UrlSegment(urls[1], {})]);
            snapshot1._routerState = new router_state_1.RouterStateSnapshot('', new tree_1.TreeNode(snapshot1Parent, [new tree_1.TreeNode(snapshot1, [])]));
            snapshot2._routerState = new router_state_1.RouterStateSnapshot('', new tree_1.TreeNode(snapshot2Parent, [new tree_1.TreeNode(snapshot2, [])]));
            return [snapshot1, snapshot2];
        }
        it('should return false when params are different', () => {
            expect((0, router_state_1.equalParamsAndUrlSegments)(createSnapshot({ a: '1' }, []), createSnapshot({ a: '2' }, []))).toEqual(false);
        });
        it('should return false when urls are different', () => {
            expect((0, router_state_1.equalParamsAndUrlSegments)(createSnapshot({ a: '1' }, [new url_tree_1.UrlSegment('a', {})]), createSnapshot({ a: '1' }, [new url_tree_1.UrlSegment('b', {})]))).toEqual(false);
        });
        it('should return true othewise', () => {
            expect((0, router_state_1.equalParamsAndUrlSegments)(createSnapshot({ a: '1' }, [new url_tree_1.UrlSegment('a', {})]), createSnapshot({ a: '1' }, [new url_tree_1.UrlSegment('a', {})]))).toEqual(true);
        });
        it('should return false when upstream params are different', () => {
            const [snapshot1, snapshot2] = createSnapshotPairWithParent([{ a: '1' }, { a: '1' }], [{ b: '1' }, { c: '1' }], ['a', 'a']);
            expect((0, router_state_1.equalParamsAndUrlSegments)(snapshot1, snapshot2)).toEqual(false);
        });
        it('should return false when upstream urls are different', () => {
            const [snapshot1, snapshot2] = createSnapshotPairWithParent([{ a: '1' }, { a: '1' }], [{ b: '1' }, { b: '1' }], ['a', 'b']);
            expect((0, router_state_1.equalParamsAndUrlSegments)(snapshot1, snapshot2)).toEqual(false);
        });
        it('should return true when upstream urls and params are equal', () => {
            const [snapshot1, snapshot2] = createSnapshotPairWithParent([{ a: '1' }, { a: '1' }], [{ b: '1' }, { b: '1' }], ['a', 'a']);
            expect((0, router_state_1.equalParamsAndUrlSegments)(snapshot1, snapshot2)).toEqual(true);
        });
    });
    describe('advanceActivatedRoute', () => {
        let route;
        beforeEach(() => {
            route = createActivatedRoute('a');
        });
        function createSnapshot(params, url) {
            const queryParams = {};
            const fragment = '';
            const data = {};
            const snapshot = new router_state_1.ActivatedRouteSnapshot(url, params, queryParams, fragment, data, null, null, null, null, -1, null);
            const state = new router_state_1.RouterStateSnapshot('', new tree_1.TreeNode(snapshot, []));
            snapshot._routerState = state;
            return snapshot;
        }
        it('should call change observers', () => {
            const firstPlace = createSnapshot({ a: '1' }, []);
            const secondPlace = createSnapshot({ a: '2' }, []);
            route.snapshot = firstPlace;
            route._futureSnapshot = secondPlace;
            let hasSeenDataChange = false;
            route.data.forEach((data) => {
                hasSeenDataChange = true;
            });
            (0, router_state_1.advanceActivatedRoute)(route);
            expect(hasSeenDataChange).toEqual(true);
        });
    });
    describe('ActivatedRoute', () => {
        it('should get resolved route title', () => {
            const data = { [shared_1.RouteTitleKey]: 'resolved title' };
            const route = createActivatedRoute('a');
            const snapshot = new router_state_1.ActivatedRouteSnapshot([], null, null, null, data, null, 'test', null, null, -1, null);
            let resolvedTitle;
            route.data.next(data);
            route.title.forEach((title) => {
                resolvedTitle = title;
            });
            expect(resolvedTitle).toEqual('resolved title');
            expect(snapshot.title).toEqual('resolved title');
        });
    });
});
function createActivatedRouteSnapshot(cmp) {
    return new router_state_1.ActivatedRouteSnapshot([], null, null, null, null, null, cmp, null, null, -1, null);
}
function createActivatedRoute(cmp) {
    return new router_state_1.ActivatedRoute(new rxjs_1.BehaviorSubject([new url_tree_1.UrlSegment('', {})]), new rxjs_1.BehaviorSubject({}), null, null, new rxjs_1.BehaviorSubject({}), null, cmp, null);
}
