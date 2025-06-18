"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const render_tree_1 = require("./render-tree");
describe('render tree extraction', () => {
    let treeStrategy;
    let directiveMap;
    let componentMap;
    let directiveMetadataMap;
    beforeEach(() => {
        treeStrategy = new render_tree_1.RTreeStrategy();
        directiveMap = new Map();
        componentMap = new Map();
        directiveMetadataMap = new Map();
        window.ng = {
            getDirectiveMetadata(dir) {
                var _a;
                return (_a = directiveMetadataMap.get(dir)) !== null && _a !== void 0 ? _a : null;
            },
            getComponent(element) {
                return componentMap.get(element);
            },
            getDirectives(node) {
                return directiveMap.get(node) || [];
            },
        };
    });
    afterEach(() => delete window.ng);
    it('should detect Angular Ivy apps', () => {
        expect(treeStrategy.supports()).toBeTrue();
    });
    it('should fail with detection of non-Ivy apps', () => {
        delete window.ng.getDirectiveMetadata;
        expect(treeStrategy.supports()).toBeFalse();
    });
    it('should extract render tree from an empty element', () => {
        expect(treeStrategy.build(document.createElement('div'))).toEqual([]);
    });
    it('should extract trees without structural directives', () => {
        var _a;
        const appNode = document.createElement('app');
        const childNode = document.createElement('child');
        const childDirectiveNode = document.createElement('div');
        appNode.appendChild(childNode);
        appNode.appendChild(childDirectiveNode);
        const appComponent = {};
        const childComponent = {};
        const childDirective = {};
        componentMap.set(appNode, appComponent);
        componentMap.set(childNode, childComponent);
        directiveMap.set(childDirectiveNode, [childDirective]);
        const rtree = treeStrategy.build(appNode);
        expect(rtree.length).toBe(1);
        expect(rtree[0].children.length).toBe(2);
        expect((_a = rtree[0].children[0].component) === null || _a === void 0 ? void 0 : _a.instance).toBe(childComponent);
        expect(rtree[0].children[1].component).toBe(null);
        expect(rtree[0].children[1].directives[0].instance).toBe(childDirective);
    });
    it('should skip nodes without directives', () => {
        const appNode = document.createElement('app');
        const childNode = document.createElement('div');
        const childComponentNode = document.createElement('child');
        appNode.appendChild(childNode);
        childNode.appendChild(childComponentNode);
        const appComponent = {};
        const childComponent = {};
        componentMap.set(appNode, appComponent);
        componentMap.set(childComponentNode, childComponent);
        const rtree = treeStrategy.build(appNode);
        expect(rtree[0].children.length).toBe(1);
        expect(rtree[0].children[0].children.length).toBe(0);
    });
    it('should go all the way to the root element to look up for nodes', () => {
        var _a;
        const rootNode = document.createElement('body');
        const siblingNode = document.createElement('section');
        const appNode = document.createElement('app');
        const childNode = document.createElement('div');
        const childComponentNode = document.createElement('child');
        rootNode.appendChild(appNode);
        rootNode.appendChild(siblingNode);
        appNode.appendChild(childNode);
        childNode.appendChild(childComponentNode);
        const appComponent = {};
        const childComponent = {};
        const siblingComponent = {};
        componentMap.set(siblingNode, siblingComponent);
        componentMap.set(appNode, appComponent);
        componentMap.set(childComponentNode, childComponent);
        const rtree = treeStrategy.build(appNode);
        expect(rtree[0].children.length).toBe(1);
        expect(rtree[0].children[0].children.length).toBe(0);
        expect((_a = rtree[1].component) === null || _a === void 0 ? void 0 : _a.instance).toBe(siblingComponent);
    });
    it('should use component name from `ng.getDirectiveMetadata`', () => {
        const appNode = document.createElement('app');
        const appComponent = {};
        componentMap.set(appNode, appComponent);
        directiveMetadataMap.set(appComponent, {
            framework: core_1.ɵFramework.Angular,
            name: 'AppComponent',
            inputs: {},
            outputs: {},
        });
        const rtree = treeStrategy.build(appNode);
        expect(rtree[0].component.name).toBe('AppComponent');
    });
});
