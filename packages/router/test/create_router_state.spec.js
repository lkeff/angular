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
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const operators_1 = require("rxjs/operators");
const create_router_state_1 = require("../src/create_router_state");
const recognize_1 = require("../src/recognize");
const route_reuse_strategy_1 = require("../src/route_reuse_strategy");
const router_config_loader_1 = require("../src/router_config_loader");
const router_state_1 = require("../src/router_state");
const shared_1 = require("../src/shared");
const url_tree_1 = require("../src/url_tree");
describe('create router state', () => {
    let reuseStrategy;
    beforeEach(() => {
        reuseStrategy = new route_reuse_strategy_1.DefaultRouteReuseStrategy();
    });
    const emptyState = () => (0, router_state_1.createEmptyState)(RootComponent);
    it('should create new state', () => __awaiter(void 0, void 0, void 0, function* () {
        const state = (0, create_router_state_1.createRouterState)(reuseStrategy, yield createState([
            { path: 'a', component: ComponentA },
            { path: 'b', component: ComponentB, outlet: 'left' },
            { path: 'c', component: ComponentC, outlet: 'right' },
        ], 'a(left:b//right:c)'), emptyState());
        checkActivatedRoute(state.root, RootComponent);
        const c = state.children(state.root);
        checkActivatedRoute(c[0], ComponentA);
        checkActivatedRoute(c[1], ComponentB, 'left');
        checkActivatedRoute(c[2], ComponentC, 'right');
    }));
    it('should reuse existing nodes when it can', () => __awaiter(void 0, void 0, void 0, function* () {
        const config = [
            { path: 'a', component: ComponentA },
            { path: 'b', component: ComponentB, outlet: 'left' },
            { path: 'c', component: ComponentC, outlet: 'left' },
        ];
        const prevState = (0, create_router_state_1.createRouterState)(reuseStrategy, yield createState(config, 'a(left:b)'), emptyState());
        advanceState(prevState);
        const state = (0, create_router_state_1.createRouterState)(reuseStrategy, yield createState(config, 'a(left:c)'), prevState);
        expect(prevState.root).toBe(state.root);
        const prevC = prevState.children(prevState.root);
        const currC = state.children(state.root);
        expect(prevC[0]).toBe(currC[0]);
        expect(prevC[1]).not.toBe(currC[1]);
        checkActivatedRoute(currC[1], ComponentC, 'left');
    }));
    it('should handle componentless routes', () => __awaiter(void 0, void 0, void 0, function* () {
        const config = [
            {
                path: 'a/:id',
                children: [
                    { path: 'b', component: ComponentA },
                    { path: 'c', component: ComponentB, outlet: 'right' },
                ],
            },
        ];
        const prevState = (0, create_router_state_1.createRouterState)(reuseStrategy, yield createState(config, 'a/1;p=11/(b//right:c)'), emptyState());
        advanceState(prevState);
        const state = (0, create_router_state_1.createRouterState)(reuseStrategy, yield createState(config, 'a/2;p=22/(b//right:c)'), prevState);
        expect(prevState.root).toBe(state.root);
        const prevP = prevState.firstChild(prevState.root);
        const currP = state.firstChild(state.root);
        expect(prevP).toBe(currP);
        const currC = state.children(currP);
        expect(currP._futureSnapshot.params).toEqual({ id: '2', p: '22' });
        expect(currP._futureSnapshot.paramMap.get('id')).toEqual('2');
        expect(currP._futureSnapshot.paramMap.get('p')).toEqual('22');
        checkActivatedRoute(currC[0], ComponentA);
        checkActivatedRoute(currC[1], ComponentB, 'right');
    }));
    it('should not retrieve routes when `shouldAttach` is always false', () => __awaiter(void 0, void 0, void 0, function* () {
        const config = [
            { path: 'a', component: ComponentA },
            { path: 'b', component: ComponentB, outlet: 'left' },
            { path: 'c', component: ComponentC, outlet: 'left' },
        ];
        spyOn(reuseStrategy, 'retrieve');
        const prevState = (0, create_router_state_1.createRouterState)(reuseStrategy, yield createState(config, 'a(left:b)'), emptyState());
        advanceState(prevState);
        (0, create_router_state_1.createRouterState)(reuseStrategy, yield createState(config, 'a(left:c)'), prevState);
        expect(reuseStrategy.retrieve).not.toHaveBeenCalled();
    }));
    it('should consistently represent future and current state', () => __awaiter(void 0, void 0, void 0, function* () {
        const config = [
            { path: '', pathMatch: 'full', component: ComponentA },
            { path: 'product/:id', component: ComponentB },
        ];
        spyOn(reuseStrategy, 'shouldReuseRoute').and.callThrough();
        const previousState = (0, create_router_state_1.createRouterState)(reuseStrategy, yield createState(config, ''), emptyState());
        advanceState(previousState);
        reuseStrategy.shouldReuseRoute.calls.reset();
        (0, create_router_state_1.createRouterState)(reuseStrategy, yield createState(config, 'product/30'), previousState);
        // One call for the root and one call for each of the children
        expect(reuseStrategy.shouldReuseRoute).toHaveBeenCalledTimes(2);
        const reuseCalls = reuseStrategy.shouldReuseRoute.calls;
        const future1 = reuseCalls.argsFor(0)[0];
        const current1 = reuseCalls.argsFor(0)[1];
        const future2 = reuseCalls.argsFor(1)[0];
        const current2 = reuseCalls.argsFor(1)[1];
        // Routing from '' to 'product/30'
        expect(current1._routerState.url).toEqual(tree('').toString());
        expect(future1._routerState.url).toEqual(tree('product/30').toString());
        expect(current2._routerState.url).toEqual(tree('').toString());
        expect(future2._routerState.url).toEqual(tree('product/30').toString());
    }));
});
function advanceState(state) {
    advanceNode(state._root);
}
function advanceNode(node) {
    (0, router_state_1.advanceActivatedRoute)(node.value);
    node.children.forEach(advanceNode);
}
function createState(config, url) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, recognize_1.recognize)(testing_1.TestBed.inject(core_1.EnvironmentInjector), testing_1.TestBed.inject(router_config_loader_1.RouterConfigLoader), RootComponent, config, tree(url), new url_tree_1.DefaultUrlSerializer())
            .pipe((0, operators_1.map)((result) => result.state))
            .toPromise();
    });
}
function checkActivatedRoute(actual, cmp, outlet = shared_1.PRIMARY_OUTLET) {
    if (actual === null) {
        expect(actual).toBeDefined();
    }
    else {
        expect(actual.component).toBe(cmp);
        expect(actual.outlet).toEqual(outlet);
    }
}
function tree(url) {
    return new url_tree_1.DefaultUrlSerializer().parse(url);
}
class RootComponent {
}
class ComponentA {
}
class ComponentB {
}
class ComponentC {
}
