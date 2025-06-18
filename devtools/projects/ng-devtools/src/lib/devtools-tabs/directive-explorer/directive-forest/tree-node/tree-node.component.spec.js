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
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const tree_1 = require("@angular/cdk/tree");
const tree_node_component_1 = require("./tree-node.component");
const srcNode = {
    id: 'node',
    original: {
        component: {
            id: 1337,
        },
    },
};
describe('TreeNodeComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield testing_1.TestBed.configureTestingModule({
            imports: [tree_node_component_1.TreeNodeComponent],
        }).compileComponents();
        fixture = testing_1.TestBed.createComponent(tree_node_component_1.TreeNodeComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('node', srcNode);
        fixture.componentRef.setInput('selectedNode', null);
        fixture.componentRef.setInput('highlightedId', 0);
        fixture.componentRef.setInput('treeControl', new tree_1.FlatTreeControl((node) => node.level, (node) => node.expandable));
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should render node name', () => {
        fixture.componentRef.setInput('node', Object.assign(Object.assign({}, srcNode), { name: 'app-test' }));
        fixture.detectChanges();
        const name = fixture.debugElement.query(platform_browser_1.By.css('.node-name'));
        expect(name.nativeElement.innerText).toEqual('app-test');
    });
    it('should include directive name, if any', () => {
        fixture.componentRef.setInput('node', Object.assign(Object.assign({}, srcNode), { name: 'app-test', directives: ['TooltipDirective'] }));
        fixture.detectChanges();
        const name = fixture.debugElement.query(platform_browser_1.By.css('.node-name'));
        expect(name.nativeElement.innerText).toEqual('app-test[TooltipDirective]');
    });
    it('should include directive names (multiple), if any', () => {
        fixture.componentRef.setInput('node', Object.assign(Object.assign({}, srcNode), { name: 'app-test', directives: ['TooltipDirective', 'CtxMenuDirective'] }));
        fixture.detectChanges();
        const name = fixture.debugElement.query(platform_browser_1.By.css('.node-name'));
        expect(name.nativeElement.innerText).toEqual('app-test[TooltipDirective][CtxMenuDirective]');
    });
    it('should render "OnPush" label, if OnPush', () => {
        let onPush = fixture.debugElement.query(platform_browser_1.By.css('.on-push'));
        expect(onPush).toBeFalsy();
        fixture.componentRef.setInput('node', Object.assign(Object.assign({}, srcNode), { name: 'app-test', onPush: true }));
        fixture.detectChanges();
        onPush = fixture.debugElement.query(platform_browser_1.By.css('.on-push'));
        expect(onPush).toBeTruthy();
    });
    it('should handle selection', () => {
        const consoleRef = fixture.debugElement.query(platform_browser_1.By.css('.console-reference'));
        expect(getComputedStyle(consoleRef.nativeElement).display).toEqual('none');
        fixture.componentRef.setInput('selectedNode', { id: 'node' });
        fixture.detectChanges();
        expect(getComputedStyle(consoleRef.nativeElement).display).toEqual('block');
        expect(fixture.debugElement.nativeElement.classList.contains('selected')).toBeTrue();
    });
    it('should handle highlighting', () => {
        fixture.componentRef.setInput('highlightedId', 1337);
        fixture.detectChanges();
        const classList = fixture.debugElement.nativeElement.classList;
        expect(classList.contains('highlighted')).toBeTrue();
    });
    it('should add respective class, if a new node', () => {
        fixture.componentRef.setInput('node', Object.assign(Object.assign({}, srcNode), { newItem: true }));
        fixture.detectChanges();
        const classList = fixture.debugElement.nativeElement.classList;
        expect(classList.contains('new-node')).toBeTrue();
    });
    it('should mark the text that matches the filter', () => {
        fixture.componentRef.setInput('textMatch', { startIdx: 3, endIdx: 27 });
        fixture.componentRef.setInput('node', Object.assign(Object.assign({}, srcNode), { name: 'my-long-component-name[WithADirective]' }));
        fixture.detectChanges();
        const marked = fixture.debugElement.query(platform_browser_1.By.css('mark'));
        expect(marked.nativeElement.innerText).toEqual('long-component-name[With');
    });
    it('should mark the text that matches the filter (beginning of the string)', () => {
        fixture.componentRef.setInput('textMatch', { startIdx: 0, endIdx: 9 });
        fixture.componentRef.setInput('node', Object.assign(Object.assign({}, srcNode), { name: 'app-large-component' }));
        fixture.detectChanges();
        const marked = fixture.debugElement.query(platform_browser_1.By.css('mark'));
        expect(marked.nativeElement.innerText).toEqual('app-large');
    });
    it('should mark the text that matches the filter (end of the string)', () => {
        fixture.componentRef.setInput('textMatch', { startIdx: 10, endIdx: 19 });
        fixture.componentRef.setInput('node', Object.assign(Object.assign({}, srcNode), { name: 'app-large-component' }));
        fixture.detectChanges();
        const marked = fixture.debugElement.query(platform_browser_1.By.css('mark'));
        expect(marked.nativeElement.innerText).toEqual('component');
    });
    it('should mark the whole text, if it matches completely the filter', () => {
        fixture.componentRef.setInput('textMatch', { startIdx: 0, endIdx: 8 });
        fixture.componentRef.setInput('node', Object.assign(Object.assign({}, srcNode), { name: 'app-test' }));
        fixture.detectChanges();
        const marked = fixture.debugElement.query(platform_browser_1.By.css('mark'));
        expect(marked.nativeElement.innerText).toEqual('app-test');
    });
});
