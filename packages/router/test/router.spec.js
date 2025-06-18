"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const index_1 = require("../index");
const rxjs_1 = require("rxjs");
const events_1 = require("../src/events");
const check_guards_1 = require("../src/operators/check_guards");
const resolve_data_1 = require("../src/operators/resolve_data");
const router_1 = require("../src/router");
const router_outlet_context_1 = require("../src/router_outlet_context");
const router_state_1 = require("../src/router_state");
const url_tree_1 = require("../src/url_tree");
const preactivation_1 = require("../src/utils/preactivation");
const tree_1 = require("../src/utils/tree");
const helpers_1 = require("./helpers");
describe('Router', () => {
    describe('resetConfig', () => {
        class TestComponent {
        }
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({ imports: [index_1.RouterModule.forRoot([])] });
        });
        it('should copy config to avoid mutations of user-provided objects', () => {
            const r = testing_1.TestBed.inject(router_1.Router);
            const configs = [
                {
                    path: 'a',
                    component: TestComponent,
                    children: [
                        { path: 'b', component: TestComponent },
                        { path: 'c', component: TestComponent },
                    ],
                },
            ];
            const children = configs[0].children;
            r.resetConfig(configs);
            const rConfigs = r.config;
            const rChildren = rConfigs[0].children;
            // routes array and shallow copy
            expect(configs).not.toBe(rConfigs);
            expect(configs[0]).not.toBe(rConfigs[0]);
            expect(configs[0].path).toBe(rConfigs[0].path);
            expect(configs[0].component).toBe(rConfigs[0].component);
            // children should be new array and routes shallow copied
            expect(children).not.toBe(rChildren);
            expect(children[0]).not.toBe(rChildren[0]);
            expect(children[0].path).toBe(rChildren[0].path);
            expect(children[1]).not.toBe(rChildren[1]);
            expect(children[1].path).toBe(rChildren[1].path);
        });
    });
    describe('resetRootComponentType', () => {
        class NewRootComponent {
        }
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({ imports: [index_1.RouterModule.forRoot([])] });
        });
        it('should not change root route when updating the root component', () => {
            const r = testing_1.TestBed.inject(router_1.Router);
            const root = r.routerState.root;
            r.resetRootComponentType(NewRootComponent);
            expect(r.routerState.root).toBe(root);
        });
    });
    describe('setUpLocationChangeListener', () => {
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({ imports: [index_1.RouterModule.forRoot([])] });
        });
        it('should be idempotent', () => {
            const r = testing_1.TestBed.inject(router_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            r.setUpLocationChangeListener();
            const a = r.nonRouterCurrentEntryChangeSubscription;
            r.setUpLocationChangeListener();
            const b = r.nonRouterCurrentEntryChangeSubscription;
            expect(a).toBe(b);
            r.dispose();
            r.setUpLocationChangeListener();
            const c = r.nonRouterCurrentEntryChangeSubscription;
            expect(c).not.toBe(b);
        });
    });
    describe('PreActivation', () => {
        const serializer = new url_tree_1.DefaultUrlSerializer();
        let empty;
        let logger;
        function createLoggerGuard(token, returnValue = true) {
            return () => {
                (0, core_1.inject)(helpers_1.Logger).add(token);
                return returnValue;
            };
        }
        let events;
        const CA_CHILD = createLoggerGuard('canActivate_child');
        const CA_CHILD_FALSE = createLoggerGuard('canActivate_child_false', false);
        const CA_CHILD_REDIRECT = createLoggerGuard('canActivate_child_redirect', serializer.parse('/canActivate_child_redirect'));
        const CAC_CHILD = createLoggerGuard('canActivateChild_child');
        const CAC_CHILD_FALSE = createLoggerGuard('canActivateChild_child_false', false);
        const CAC_CHILD_REDIRECT = createLoggerGuard('canActivateChild_child_redirect', serializer.parse('/canActivateChild_child_redirect'));
        const CA_GRANDCHILD = createLoggerGuard('canActivate_grandchild');
        const CA_GRANDCHILD_REDIRECT = createLoggerGuard('canActivate_grandchild_redirect', serializer.parse('/canActivate_grandchild_redirect'));
        const CDA_CHILD = createLoggerGuard('canDeactivate_child');
        const CDA_CHILD_FALSE = createLoggerGuard('canDeactivate_child_false', false);
        const CDA_CHILD_REDIRECT = createLoggerGuard('canDeactivate_child_redirect', serializer.parse('/canDeactivate_child_redirect'));
        const CDA_GRANDCHILD = createLoggerGuard('canDeactivate_grandchild');
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({
                imports: [index_1.RouterModule],
                providers: [helpers_1.Logger],
            });
        });
        beforeEach(() => {
            const _logger = testing_1.TestBed.inject(helpers_1.Logger);
            empty = (0, router_state_1.createEmptyStateSnapshot)(null);
            logger = _logger;
            events = [];
        });
        describe('ChildActivation', () => {
            it('should run', () => {
                /**
                 * R  -->  R (ChildActivationStart)
                 *          \
                 *           child
                 */
                let result = false;
                const childSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                    component: 'child',
                    routeConfig: { path: 'child' },
                });
                const futureState = new router_state_1.RouterStateSnapshot('url', new tree_1.TreeNode(empty.root, [new tree_1.TreeNode(childSnapshot, [])]));
                // Since we only test the guards, we don't need to provide a full navigation
                // transition object with all properties set.
                const testTransition = {
                    guards: (0, preactivation_1.getAllRouteGuards)(futureState, empty, new router_outlet_context_1.ChildrenOutletContexts(testing_1.TestBed.inject(core_1.EnvironmentInjector))),
                };
                (0, rxjs_1.of)(testTransition)
                    .pipe((0, check_guards_1.checkGuards)(testing_1.TestBed.inject(core_1.EnvironmentInjector), (evt) => {
                    events.push(evt);
                }))
                    .subscribe((x) => (result = !!x.guardsResult), (e) => {
                    throw e;
                });
                expect(result).toBe(true);
                expect(events.length).toEqual(2);
                expect(events[0].snapshot).toBe(events[0].snapshot.root);
                expect(events[1].snapshot.routeConfig.path).toBe('child');
            });
            it('should run from top to bottom', () => {
                /**
                 * R  -->  R (ChildActivationStart)
                 *          \
                 *           child (ChildActivationStart)
                 *            \
                 *             grandchild (ChildActivationStart)
                 *              \
                 *               great grandchild
                 */
                let result = false;
                const childSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                    component: 'child',
                    routeConfig: { path: 'child' },
                });
                const grandchildSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                    component: 'grandchild',
                    routeConfig: { path: 'grandchild' },
                });
                const greatGrandchildSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                    component: 'great-grandchild',
                    routeConfig: { path: 'great-grandchild' },
                });
                const futureState = new router_state_1.RouterStateSnapshot('url', new tree_1.TreeNode(empty.root, [
                    new tree_1.TreeNode(childSnapshot, [
                        new tree_1.TreeNode(grandchildSnapshot, [new tree_1.TreeNode(greatGrandchildSnapshot, [])]),
                    ]),
                ]));
                // Since we only test the guards, we don't need to provide a full navigation
                // transition object with all properties set.
                const testTransition = {
                    guards: (0, preactivation_1.getAllRouteGuards)(futureState, empty, new router_outlet_context_1.ChildrenOutletContexts(testing_1.TestBed.inject(core_1.EnvironmentInjector))),
                };
                (0, rxjs_1.of)(testTransition)
                    .pipe((0, check_guards_1.checkGuards)(testing_1.TestBed.inject(core_1.EnvironmentInjector), (evt) => {
                    events.push(evt);
                }))
                    .subscribe((x) => (result = !!x.guardsResult), (e) => {
                    throw e;
                });
                expect(result).toBe(true);
                expect(events.length).toEqual(6);
                expect(events[0].snapshot).toBe(events[0].snapshot.root);
                expect(events[2].snapshot.routeConfig.path).toBe('child');
                expect(events[4].snapshot.routeConfig.path).toBe('grandchild');
                expect(events[5].snapshot.routeConfig.path).toBe('great-grandchild');
            });
            it('should not run for unchanged routes', () => {
                /**
                 *         R  -->  R
                 *        / \
                 *   child   child (ChildActivationStart)
                 *            \
                 *             grandchild
                 */
                let result = false;
                const childSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                    component: 'child',
                    routeConfig: { path: 'child' },
                });
                const grandchildSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                    component: 'grandchild',
                    routeConfig: { path: 'grandchild' },
                });
                const currentState = new router_state_1.RouterStateSnapshot('url', new tree_1.TreeNode(empty.root, [new tree_1.TreeNode(childSnapshot, [])]));
                const futureState = new router_state_1.RouterStateSnapshot('url', new tree_1.TreeNode(empty.root, [
                    new tree_1.TreeNode(childSnapshot, [new tree_1.TreeNode(grandchildSnapshot, [])]),
                ]));
                // Since we only test the guards, we don't need to provide a full navigation
                // transition object with all properties set.
                const testTransition = {
                    guards: (0, preactivation_1.getAllRouteGuards)(futureState, currentState, new router_outlet_context_1.ChildrenOutletContexts(testing_1.TestBed.inject(core_1.EnvironmentInjector))),
                };
                (0, rxjs_1.of)(testTransition)
                    .pipe((0, check_guards_1.checkGuards)(testing_1.TestBed.inject(core_1.EnvironmentInjector), (evt) => {
                    events.push(evt);
                }))
                    .subscribe((x) => (result = !!x.guardsResult), (e) => {
                    throw e;
                });
                expect(result).toBe(true);
                expect(events.length).toEqual(2);
                expect(events[0].snapshot).not.toBe(events[0].snapshot.root);
                expect(events[0].snapshot.routeConfig.path).toBe('child');
            });
            it('should skip multiple unchanged routes but fire for all changed routes', () => {
                /**
                 *         R  -->  R
                 *            / \
                 *       child   child
                 *          /     \
                 * grandchild      grandchild (ChildActivationStart)
                 *                  \
                 *                   greatgrandchild (ChildActivationStart)
                 *                    \
                 *                     great-greatgrandchild
                 */
                let result = false;
                const childSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                    component: 'child',
                    routeConfig: { path: 'child' },
                });
                const grandchildSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                    component: 'grandchild',
                    routeConfig: { path: 'grandchild' },
                });
                const greatGrandchildSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                    component: 'greatgrandchild',
                    routeConfig: { path: 'greatgrandchild' },
                });
                const greatGreatGrandchildSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                    component: 'great-greatgrandchild',
                    routeConfig: { path: 'great-greatgrandchild' },
                });
                const currentState = new router_state_1.RouterStateSnapshot('url', new tree_1.TreeNode(empty.root, [
                    new tree_1.TreeNode(childSnapshot, [new tree_1.TreeNode(grandchildSnapshot, [])]),
                ]));
                const futureState = new router_state_1.RouterStateSnapshot('url', new tree_1.TreeNode(empty.root, [
                    new tree_1.TreeNode(childSnapshot, [
                        new tree_1.TreeNode(grandchildSnapshot, [
                            new tree_1.TreeNode(greatGrandchildSnapshot, [
                                new tree_1.TreeNode(greatGreatGrandchildSnapshot, []),
                            ]),
                        ]),
                    ]),
                ]));
                // Since we only test the guards, we don't need to provide a full navigation
                // transition object with all properties set.
                const testTransition = {
                    guards: (0, preactivation_1.getAllRouteGuards)(futureState, currentState, new router_outlet_context_1.ChildrenOutletContexts(testing_1.TestBed.inject(core_1.EnvironmentInjector))),
                };
                (0, rxjs_1.of)(testTransition)
                    .pipe((0, check_guards_1.checkGuards)(testing_1.TestBed.inject(core_1.EnvironmentInjector), (evt) => {
                    events.push(evt);
                }))
                    .subscribe((x) => (result = !!x.guardsResult), (e) => {
                    throw e;
                });
                expect(result).toBe(true);
                expect(events.length).toEqual(4);
                expect(events[0] instanceof events_1.ChildActivationStart).toBe(true);
                expect(events[0].snapshot).not.toBe(events[0].snapshot.root);
                expect(events[0].snapshot.routeConfig.path).toBe('grandchild');
                expect(events[2].snapshot.routeConfig.path).toBe('greatgrandchild');
            });
        });
        describe('guards', () => {
            it('should run CanActivate checks', () => {
                /**
                 * R  -->  R
                 *          \
                 *           child (CA, CAC)
                 *            \
                 *             grandchild (CA)
                 */
                const childSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                    component: 'child',
                    routeConfig: {
                        canActivate: [CA_CHILD],
                        canActivateChild: [CAC_CHILD],
                    },
                });
                const grandchildSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                    component: 'grandchild',
                    routeConfig: { canActivate: [CA_GRANDCHILD] },
                });
                const futureState = new router_state_1.RouterStateSnapshot('url', new tree_1.TreeNode(empty.root, [
                    new tree_1.TreeNode(childSnapshot, [new tree_1.TreeNode(grandchildSnapshot, [])]),
                ]));
                checkGuards(futureState, empty, testing_1.TestBed.inject(core_1.EnvironmentInjector), (result) => {
                    expect(result).toBe(true);
                    expect(logger.logs).toEqual([
                        'canActivate_child',
                        'canActivateChild_child',
                        'canActivate_grandchild',
                    ]);
                });
            });
            it('should not run grandchild guards if child fails', () => {
                /**
                 * R  -->  R
                 *          \
                 *           child (CA: x, CAC)
                 *            \
                 *             grandchild (CA)
                 */
                const childSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                    component: 'child',
                    routeConfig: { canActivate: [CA_CHILD_FALSE], canActivateChild: [CAC_CHILD] },
                });
                const grandchildSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                    component: 'grandchild',
                    routeConfig: { canActivate: [CA_GRANDCHILD] },
                });
                const futureState = new router_state_1.RouterStateSnapshot('url', new tree_1.TreeNode(empty.root, [
                    new tree_1.TreeNode(childSnapshot, [new tree_1.TreeNode(grandchildSnapshot, [])]),
                ]));
                checkGuards(futureState, empty, testing_1.TestBed.inject(core_1.EnvironmentInjector), (result) => {
                    expect(result).toBe(false);
                    expect(logger.logs).toEqual(['canActivate_child_false']);
                });
            });
            it('should not run grandchild guards if child canActivateChild fails', () => {
                /**
                 * R  -->  R
                 *          \
                 *           child (CA, CAC: x)
                 *            \
                 *             grandchild (CA)
                 */
                const childSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                    component: 'child',
                    routeConfig: { canActivate: [CA_CHILD], canActivateChild: [CAC_CHILD_FALSE] },
                });
                const grandchildSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                    component: 'grandchild',
                    routeConfig: { canActivate: [CA_GRANDCHILD] },
                });
                const futureState = new router_state_1.RouterStateSnapshot('url', new tree_1.TreeNode(empty.root, [
                    new tree_1.TreeNode(childSnapshot, [new tree_1.TreeNode(grandchildSnapshot, [])]),
                ]));
                checkGuards(futureState, empty, testing_1.TestBed.inject(core_1.EnvironmentInjector), (result) => {
                    expect(result).toBe(false);
                    expect(logger.logs).toEqual(['canActivate_child', 'canActivateChild_child_false']);
                });
            });
            it('should run deactivate guards before activate guards', () => {
                /**
                 *      R  -->  R
                 *     /         \
                 *    prev (CDA)  child (CA)
                 *                 \
                 *                  grandchild (CA)
                 */
                const prevSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                    component: 'prev',
                    routeConfig: { canDeactivate: [CDA_CHILD] },
                });
                const childSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                    component: 'child',
                    routeConfig: { canActivate: [CA_CHILD], canActivateChild: [CAC_CHILD] },
                });
                const grandchildSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                    component: 'grandchild',
                    routeConfig: { canActivate: [CA_GRANDCHILD] },
                });
                const currentState = new router_state_1.RouterStateSnapshot('prev', new tree_1.TreeNode(empty.root, [new tree_1.TreeNode(prevSnapshot, [])]));
                const futureState = new router_state_1.RouterStateSnapshot('url', new tree_1.TreeNode(empty.root, [
                    new tree_1.TreeNode(childSnapshot, [new tree_1.TreeNode(grandchildSnapshot, [])]),
                ]));
                checkGuards(futureState, currentState, testing_1.TestBed.inject(core_1.EnvironmentInjector), (result) => {
                    expect(logger.logs).toEqual([
                        'canDeactivate_child',
                        'canActivate_child',
                        'canActivateChild_child',
                        'canActivate_grandchild',
                    ]);
                });
            });
            it('should not run activate if deactivate fails guards', () => {
                /**
                 *      R  -->     R
                 *     /            \
                 *    prev (CDA: x)  child (CA)
                 *                    \
                 *                     grandchild (CA)
                 */
                const prevSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                    component: 'prev',
                    routeConfig: { canDeactivate: [CDA_CHILD_FALSE] },
                });
                const childSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                    component: 'child',
                    routeConfig: { canActivate: [CA_CHILD], canActivateChild: [CAC_CHILD] },
                });
                const grandchildSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                    component: 'grandchild',
                    routeConfig: { canActivate: [CA_GRANDCHILD] },
                });
                const currentState = new router_state_1.RouterStateSnapshot('prev', new tree_1.TreeNode(empty.root, [new tree_1.TreeNode(prevSnapshot, [])]));
                const futureState = new router_state_1.RouterStateSnapshot('url', new tree_1.TreeNode(empty.root, [
                    new tree_1.TreeNode(childSnapshot, [new tree_1.TreeNode(grandchildSnapshot, [])]),
                ]));
                checkGuards(futureState, currentState, testing_1.TestBed.inject(core_1.EnvironmentInjector), (result) => {
                    expect(result).toBe(false);
                    expect(logger.logs).toEqual(['canDeactivate_child_false']);
                });
            });
            it('should deactivate from bottom up, then activate top down', () => {
                /**
                 *      R     -->      R
                 *     /                \
                 *    prevChild (CDA)    child (CA)
                 *   /                    \
                 *  prevGrandchild(CDA)    grandchild (CA)
                 */
                const prevChildSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                    component: 'prev_child',
                    routeConfig: { canDeactivate: [CDA_CHILD] },
                });
                const prevGrandchildSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                    component: 'prev_grandchild',
                    routeConfig: { canDeactivate: [CDA_GRANDCHILD] },
                });
                const childSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                    component: 'child',
                    routeConfig: { canActivate: [CA_CHILD], canActivateChild: [CAC_CHILD] },
                });
                const grandchildSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                    component: 'grandchild',
                    routeConfig: { canActivate: [CA_GRANDCHILD] },
                });
                const currentState = new router_state_1.RouterStateSnapshot('prev', new tree_1.TreeNode(empty.root, [
                    new tree_1.TreeNode(prevChildSnapshot, [new tree_1.TreeNode(prevGrandchildSnapshot, [])]),
                ]));
                const futureState = new router_state_1.RouterStateSnapshot('url', new tree_1.TreeNode(empty.root, [
                    new tree_1.TreeNode(childSnapshot, [new tree_1.TreeNode(grandchildSnapshot, [])]),
                ]));
                checkGuards(futureState, currentState, testing_1.TestBed.inject(core_1.EnvironmentInjector), (result) => {
                    expect(result).toBe(true);
                    expect(logger.logs).toEqual([
                        'canDeactivate_grandchild',
                        'canDeactivate_child',
                        'canActivate_child',
                        'canActivateChild_child',
                        'canActivate_grandchild',
                    ]);
                });
                logger.empty();
                checkGuards(currentState, futureState, testing_1.TestBed.inject(core_1.EnvironmentInjector), (result) => {
                    expect(result).toBe(true);
                    expect(logger.logs).toEqual([]);
                });
            });
            describe('UrlTree', () => {
                it('should allow return of UrlTree from CanActivate', () => {
                    /**
                     * R  -->  R
                     *          \
                     *           child (CA: redirect)
                     */
                    const childSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                        component: 'child',
                        routeConfig: {
                            canActivate: [CA_CHILD_REDIRECT],
                        },
                    });
                    const futureState = new router_state_1.RouterStateSnapshot('url', new tree_1.TreeNode(empty.root, [new tree_1.TreeNode(childSnapshot, [])]));
                    checkGuards(futureState, empty, testing_1.TestBed.inject(core_1.EnvironmentInjector), (result) => {
                        expect(serializer.serialize(result)).toBe('/' + 'canActivate_child_redirect');
                        expect(logger.logs).toEqual(['canActivate_child_redirect']);
                    });
                });
                it('should allow return of UrlTree from CanActivateChild', () => {
                    /**
                     * R  -->  R
                     *          \
                     *           child (CAC: redirect)
                     *            \
                     *             grandchild (CA)
                     */
                    const childSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                        component: 'child',
                        routeConfig: { canActivateChild: [CAC_CHILD_REDIRECT] },
                    });
                    const grandchildSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                        component: 'grandchild',
                        routeConfig: { canActivate: [CA_GRANDCHILD] },
                    });
                    const futureState = new router_state_1.RouterStateSnapshot('url', new tree_1.TreeNode(empty.root, [
                        new tree_1.TreeNode(childSnapshot, [new tree_1.TreeNode(grandchildSnapshot, [])]),
                    ]));
                    checkGuards(futureState, empty, testing_1.TestBed.inject(core_1.EnvironmentInjector), (result) => {
                        expect(serializer.serialize(result)).toBe('/' + 'canActivateChild_child_redirect');
                        expect(logger.logs).toEqual(['canActivateChild_child_redirect']);
                    });
                });
                it('should allow return of UrlTree from a child CanActivate', () => {
                    /**
                     * R  -->  R
                     *          \
                     *           child (CAC)
                     *            \
                     *             grandchild (CA: redirect)
                     */
                    const childSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                        component: 'child',
                        routeConfig: { canActivateChild: [CAC_CHILD] },
                    });
                    const grandchildSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                        component: 'grandchild',
                        routeConfig: { canActivate: [CA_GRANDCHILD_REDIRECT] },
                    });
                    const futureState = new router_state_1.RouterStateSnapshot('url', new tree_1.TreeNode(empty.root, [
                        new tree_1.TreeNode(childSnapshot, [new tree_1.TreeNode(grandchildSnapshot, [])]),
                    ]));
                    checkGuards(futureState, empty, testing_1.TestBed.inject(core_1.EnvironmentInjector), (result) => {
                        expect(serializer.serialize(result)).toBe('/' + 'canActivate_grandchild_redirect');
                        expect(logger.logs).toEqual([
                            'canActivateChild_child',
                            'canActivate_grandchild_redirect',
                        ]);
                    });
                });
                it('should allow return of UrlTree from a child CanDeactivate', () => {
                    /**
                     *      R  -->            R
                     *     /                   \
                     *    prev (CDA: redirect)  child (CA)
                     *                           \
                     *                            grandchild (CA)
                     */
                    const prevSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                        component: 'prev',
                        routeConfig: { canDeactivate: [CDA_CHILD_REDIRECT] },
                    });
                    const childSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                        component: 'child',
                        routeConfig: { canActivate: [CA_CHILD], canActivateChild: [CAC_CHILD] },
                    });
                    const grandchildSnapshot = (0, helpers_1.createActivatedRouteSnapshot)({
                        component: 'grandchild',
                        routeConfig: { canActivate: [CA_GRANDCHILD] },
                    });
                    const currentState = new router_state_1.RouterStateSnapshot('prev', new tree_1.TreeNode(empty.root, [new tree_1.TreeNode(prevSnapshot, [])]));
                    const futureState = new router_state_1.RouterStateSnapshot('url', new tree_1.TreeNode(empty.root, [
                        new tree_1.TreeNode(childSnapshot, [new tree_1.TreeNode(grandchildSnapshot, [])]),
                    ]));
                    checkGuards(futureState, currentState, testing_1.TestBed.inject(core_1.EnvironmentInjector), (result) => {
                        expect(serializer.serialize(result)).toBe('/' + 'canDeactivate_child_redirect');
                        expect(logger.logs).toEqual(['canDeactivate_child_redirect']);
                    });
                });
            });
        });
        describe('resolve', () => {
            it('should resolve data', () => {
                /**
                 * R  -->  R
                 *          \
                 *           a
                 */
                const r = { data: () => 'resolver_value' };
                const n = (0, helpers_1.createActivatedRouteSnapshot)({ component: 'a', resolve: r });
                const s = new router_state_1.RouterStateSnapshot('url', new tree_1.TreeNode(empty.root, [new tree_1.TreeNode(n, [])]));
                checkResolveData(s, empty, testing_1.TestBed.inject(core_1.EnvironmentInjector), () => {
                    expect(s.root.firstChild.data).toEqual({ data: 'resolver_value' });
                });
            });
            it('should wait for the parent resolve to complete', () => {
                /**
                 * R  -->  R
                 *          \
                 *           null (resolve: parentResolve)
                 *            \
                 *             b (resolve: childResolve)
                 */
                const parentResolve = { data: () => 'resolver_value' };
                const childResolve = {};
                const parent = (0, helpers_1.createActivatedRouteSnapshot)({ component: null, resolve: parentResolve });
                const child = (0, helpers_1.createActivatedRouteSnapshot)({ component: 'b', resolve: childResolve });
                const s = new router_state_1.RouterStateSnapshot('url', new tree_1.TreeNode(empty.root, [new tree_1.TreeNode(parent, [new tree_1.TreeNode(child, [])])]));
                checkResolveData(s, empty, testing_1.TestBed.inject(core_1.EnvironmentInjector), () => {
                    expect(s.root.firstChild.firstChild.data).toEqual({ data: 'resolver_value' });
                });
            });
            it('should copy over data when creating a snapshot', () => {
                /**
                 * R  -->  R         -->         R
                 *          \                     \
                 *           n1 (resolve: r1)      n21 (resolve: r1)
                 *                                  \
                 *                                   n22 (resolve: r2)
                 */
                const r1 = { data: () => 'resolver1_value' };
                const r2 = { data: () => 'resolver2_value' };
                const n1 = (0, helpers_1.createActivatedRouteSnapshot)({ component: 'a', resolve: r1 });
                const s1 = new router_state_1.RouterStateSnapshot('url', new tree_1.TreeNode(empty.root, [new tree_1.TreeNode(n1, [])]));
                checkResolveData(s1, empty, testing_1.TestBed.inject(core_1.EnvironmentInjector), () => { });
                const n21 = (0, helpers_1.createActivatedRouteSnapshot)({ component: 'a', resolve: r1 });
                const n22 = (0, helpers_1.createActivatedRouteSnapshot)({ component: 'b', resolve: r2 });
                const s2 = new router_state_1.RouterStateSnapshot('url', new tree_1.TreeNode(empty.root, [new tree_1.TreeNode(n21, [new tree_1.TreeNode(n22, [])])]));
                checkResolveData(s2, s1, testing_1.TestBed.inject(core_1.EnvironmentInjector), () => {
                    expect(s2.root.firstChild.data).toEqual({ data: 'resolver1_value' });
                    expect(s2.root.firstChild.firstChild.data).toEqual({ data: 'resolver2_value' });
                });
            });
        });
    });
});
function checkResolveData(future, curr, injector, check) {
    // Since we only test the guards and their resolve data function, we don't need to provide
    // a full navigation transition object with all properties set.
    (0, rxjs_1.of)({
        guards: (0, preactivation_1.getAllRouteGuards)(future, curr, new router_outlet_context_1.ChildrenOutletContexts(injector)),
    })
        .pipe((0, resolve_data_1.resolveData)('emptyOnly', injector))
        .subscribe(check, (e) => {
        throw e;
    });
}
function checkGuards(future, curr, injector, check) {
    // Since we only test the guards, we don't need to provide a full navigation
    // transition object with all properties set.
    (0, rxjs_1.of)({
        guards: (0, preactivation_1.getAllRouteGuards)(future, curr, new router_outlet_context_1.ChildrenOutletContexts(injector)),
    })
        .pipe((0, check_guards_1.checkGuards)(injector))
        .subscribe({
        next(t) {
            if (t.guardsResult === null)
                throw new Error('Guard result expected');
            return check(t.guardsResult);
        },
        error(e) {
            throw e;
        },
    });
}
