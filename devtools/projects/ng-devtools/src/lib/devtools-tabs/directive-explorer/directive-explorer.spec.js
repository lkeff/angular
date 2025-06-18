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
const testing_1 = require("@angular/core/testing");
const application_operations_1 = require("../../application-operations");
const protocol_1 = require("protocol");
const directive_explorer_component_1 = require("./directive-explorer.component");
const directive_forest_component_1 = require("./directive-forest/directive-forest.component");
const platform_browser_1 = require("@angular/platform-browser");
const frame_manager_1 = require("../../application-services/frame_manager");
const core_1 = require("@angular/core");
const element_property_resolver_1 = require("./property-resolver/element-property-resolver");
const breadcrumbs_component_1 = require("./directive-forest/breadcrumbs/breadcrumbs.component");
const property_tab_component_1 = require("./property-tab/property-tab.component");
let MockDirectiveForestComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-directive-forest',
            template: '',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MockDirectiveForestComponent = _classThis = class {
        constructor() {
            this.forest = (0, core_1.input)([]);
            this.currentSelectedElement = (0, core_1.input)(null);
            this.showCommentNodes = (0, core_1.input)(false);
            this.selectNode = (0, core_1.output)();
            this.selectDomElement = (0, core_1.output)();
            this.setParents = (0, core_1.output)();
            this.highlightComponent = (0, core_1.output)();
            this.removeComponentHighlight = (0, core_1.output)();
            this.toggleInspector = (0, core_1.output)();
        }
    };
    __setFunctionName(_classThis, "MockDirectiveForestComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MockDirectiveForestComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MockDirectiveForestComponent = _classThis;
})();
let MockBreadcrumbsComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-breadcrumbs',
            template: '',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MockBreadcrumbsComponent = _classThis = class {
        constructor() {
            this.parents = (0, core_1.input)([]);
            this.handleSelect = (0, core_1.output)();
            this.mouseLeaveNode = (0, core_1.output)();
            this.mouseOverNode = (0, core_1.output)();
        }
    };
    __setFunctionName(_classThis, "MockBreadcrumbsComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MockBreadcrumbsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MockBreadcrumbsComponent = _classThis;
})();
let MockPropertyTabComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-property-tab',
            template: '',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MockPropertyTabComponent = _classThis = class {
        constructor() {
            this.currentSelectedElement = (0, core_1.input)(null);
            this.inspect = (0, core_1.output)();
            this.viewSource = (0, core_1.output)();
        }
    };
    __setFunctionName(_classThis, "MockPropertyTabComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MockPropertyTabComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MockPropertyTabComponent = _classThis;
})();
describe('DirectiveExplorerComponent', () => {
    let messageBusMock;
    let fixture;
    let comp;
    let applicationOperationsSpy;
    let contentScriptConnected = (frameId, name, url) => { };
    let frameConnected = (frameId) => { };
    beforeEach(() => {
        applicationOperationsSpy = jasmine.createSpyObj('_appOperations', [
            'viewSource',
            'selectDomElement',
            'inspect',
        ]);
        messageBusMock = jasmine.createSpyObj('messageBus', ['on', 'once', 'emit', 'destroy']);
        messageBusMock.on.and.callFake((topic, cb) => {
            if (topic === 'contentScriptConnected') {
                contentScriptConnected = cb;
            }
            if (topic === 'frameConnected') {
                frameConnected = cb;
            }
        });
        messageBusMock.emit.and.callFake((topic, args) => {
            if (topic === 'enableFrameConnection') {
                frameConnected(args[0]);
            }
        });
        testing_1.TestBed.configureTestingModule({
            providers: [
                { provide: application_operations_1.ApplicationOperations, useValue: applicationOperationsSpy },
                { provide: protocol_1.MessageBus, useValue: messageBusMock },
                {
                    provide: element_property_resolver_1.ElementPropertyResolver,
                    useValue: new element_property_resolver_1.ElementPropertyResolver(messageBusMock),
                },
                { provide: frame_manager_1.FrameManager, useFactory: () => frame_manager_1.FrameManager.initialize(123) },
            ],
        }).overrideComponent(directive_explorer_component_1.DirectiveExplorerComponent, {
            add: { schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA] },
            remove: { imports: [directive_forest_component_1.DirectiveForestComponent] },
        });
        fixture = testing_1.TestBed.overrideComponent(directive_explorer_component_1.DirectiveExplorerComponent, {
            remove: { imports: [directive_forest_component_1.DirectiveForestComponent, breadcrumbs_component_1.BreadcrumbsComponent, property_tab_component_1.PropertyTabComponent] },
            add: {
                imports: [MockDirectiveForestComponent, MockBreadcrumbsComponent, MockPropertyTabComponent],
            },
        }).createComponent(directive_explorer_component_1.DirectiveExplorerComponent);
        comp = fixture.componentInstance;
        testing_1.TestBed.inject(frame_manager_1.FrameManager);
        comp = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create instance from class', () => {
        expect(comp).toBeTruthy();
    });
    it('subscribe to backend events', () => {
        expect(messageBusMock.on).toHaveBeenCalledWith('latestComponentExplorerView', jasmine.any(Function));
        expect(messageBusMock.on).toHaveBeenCalledWith('componentTreeDirty', jasmine.any(Function));
    });
    describe('refresh', () => {
        it('should emit getLatestComponentExplorerView event on refresh', () => {
            comp.refresh();
            expect(messageBusMock.emit).toHaveBeenCalledWith('getLatestComponentExplorerView', [
                undefined,
            ]);
        });
        it('should emit getLatestComponentExplorerView event with null view query', () => {
            comp.refresh();
            expect(messageBusMock.emit).toHaveBeenCalledWith('getLatestComponentExplorerView', [
                undefined,
            ]);
        });
        it('should emit getLatestComponentExplorerView event on refresh with view query no properties', () => {
            const currentSelectedElement = jasmine.createSpyObj('currentSelectedElement', [
                'position',
                'children',
            ]);
            currentSelectedElement.position = [0];
            currentSelectedElement.children = [];
            comp.currentSelectedElement.set(currentSelectedElement);
            comp.refresh();
            expect(comp.currentSelectedElement()).toBeTruthy();
            expect(messageBusMock.emit).toHaveBeenCalledWith('getLatestComponentExplorerView', [
                undefined,
            ]);
        });
    });
    describe('node selection event', () => {
        let nodeMock;
        beforeEach(() => {
            nodeMock = jasmine.createSpyObj('node', ['position', 'children']);
        });
        it('fires node selection events', () => {
            const position = [0];
            nodeMock.position = position;
            comp.handleNodeSelection(nodeMock);
            expect(messageBusMock.emit).toHaveBeenCalledWith('setSelectedComponent', [nodeMock.position]);
            expect(messageBusMock.emit).toHaveBeenCalledWith('getLatestComponentExplorerView', [
                {
                    selectedElement: position,
                    propertyQuery: {
                        type: protocol_1.PropertyQueryTypes.All,
                    },
                },
            ]);
        });
    });
    describe('hydration', () => {
        it('should highlight hydration nodes', () => {
            comp.hightlightHydrationNodes();
            expect(messageBusMock.emit).toHaveBeenCalledWith('createHydrationOverlay');
            comp.removeHydrationNodesHightlights();
            expect(messageBusMock.emit).toHaveBeenCalledWith('removeHydrationOverlay');
        });
        it('should show hydration slide toggle', () => {
            fixture.componentRef.setInput('isHydrationEnabled', true);
            fixture.detectChanges();
            const toggle = fixture.debugElement.query(platform_browser_1.By.css('mat-slide-toggle'));
            expect(toggle).toBeTruthy();
            fixture.componentRef.setInput('isHydrationEnabled', false);
            fixture.detectChanges();
            const toggle2 = fixture.debugElement.query(platform_browser_1.By.css('mat-slide-toggle'));
            expect(toggle2).toBeFalsy();
        });
    });
    describe('applicaton operations', () => {
        describe('view source', () => {
            it('should not call application operations view source if no frames are detected', () => {
                const directiveName = 'test';
                comp.currentSelectedElement.set({
                    directives: [{ name: directiveName }],
                    position: [0],
                    children: [],
                });
                comp.viewSource(directiveName);
                expect(applicationOperationsSpy.viewSource).toHaveBeenCalledTimes(0);
            });
            it('should not call application operations view source if a frame is selected that does not have a unique url on the page', () => {
                contentScriptConnected(0, 'test1', 'http://localhost:4200/url');
                contentScriptConnected(1, 'test2', 'http://localhost:4200/url');
                const directiveName = 'test';
                comp.currentSelectedElement.set({
                    directives: [{ name: directiveName }],
                    position: [0],
                    children: [],
                });
                comp.viewSource(directiveName);
                expect(applicationOperationsSpy.viewSource).toHaveBeenCalledTimes(0);
                expect(messageBusMock.emit).toHaveBeenCalledWith('enableFrameConnection', [0, 123]);
                expect(messageBusMock.emit).toHaveBeenCalledWith('log', [
                    {
                        level: 'warn',
                        message: `The currently inspected frame does not have a unique url on this page. Cannot view source.`,
                    },
                ]);
            });
            it('should call application operations view source if a frame is selected that has a unique url on the page', () => {
                contentScriptConnected(0, 'test1', 'http://localhost:4200/url');
                contentScriptConnected(1, 'test2', 'http://localhost:4200/url2');
                const directiveName = 'test';
                comp.currentSelectedElement.set({
                    directives: [{ name: directiveName }],
                    position: [0],
                    children: [],
                });
                comp.viewSource(directiveName);
                expect(applicationOperationsSpy.viewSource).toHaveBeenCalledTimes(1);
                expect(messageBusMock.emit).toHaveBeenCalledWith('enableFrameConnection', [0, 123]);
                expect(applicationOperationsSpy.viewSource).toHaveBeenCalledWith([0], // current selected element position
                { name: 'test1', id: 0, url: new URL('http://localhost:4200/url') }, 0);
            });
        });
        describe('select dom element', () => {
            it('should not call application operations select dom element if no frames are detected', () => {
                comp.handleSelectDomElement({ position: [0], children: [] });
                expect(applicationOperationsSpy.selectDomElement).toHaveBeenCalledTimes(0);
            });
            it('should not call application operations select dom element if a frame is selected that does not have a unique url on the page', () => {
                contentScriptConnected(0, 'test1', 'http://localhost:4200/url');
                contentScriptConnected(1, 'test2', 'http://localhost:4200/url');
                comp.handleSelectDomElement({ position: [0], children: [] });
                expect(applicationOperationsSpy.selectDomElement).toHaveBeenCalledTimes(0);
                expect(messageBusMock.emit).toHaveBeenCalledWith('enableFrameConnection', [0, 123]);
                expect(messageBusMock.emit).toHaveBeenCalledWith('log', [
                    {
                        level: 'warn',
                        message: `The currently inspected frame does not have a unique url on this page. Cannot select DOM element.`,
                    },
                ]);
            });
            it('should call application operations select dom element if a frame is selected that has a unique url on the page', () => {
                contentScriptConnected(0, 'test1', 'http://localhost:4200/url');
                contentScriptConnected(1, 'test2', 'http://localhost:4200/url2');
                comp.handleSelectDomElement({ position: [0], children: [] });
                expect(applicationOperationsSpy.selectDomElement).toHaveBeenCalledTimes(1);
                expect(messageBusMock.emit).toHaveBeenCalledWith('enableFrameConnection', [0, 123]);
                expect(applicationOperationsSpy.selectDomElement).toHaveBeenCalledWith([0], // current selected element position
                { name: 'test1', id: 0, url: new URL('http://localhost:4200/url') });
            });
        });
        describe('inspect', () => {
            let node;
            let directivePosition;
            beforeEach(() => {
                node = {
                    expandable: true,
                    prop: {
                        name: 'foo',
                        parent: null,
                        descriptor: {
                            expandable: true,
                            editable: false,
                            type: protocol_1.PropType.String,
                            preview: 'preview',
                            containerType: null,
                        },
                    },
                    level: 1,
                };
                directivePosition = { element: [0], directive: 0 };
            });
            it('should not call application operations inspect if no frames are detected', () => {
                comp.inspect({ node, directivePosition });
                expect(applicationOperationsSpy.selectDomElement).toHaveBeenCalledTimes(0);
            });
            it('should not call application operations inspect if a frame is selected that does not have a unique url on the page', () => {
                contentScriptConnected(0, 'test1', 'http://localhost:4200/url');
                contentScriptConnected(1, 'test2', 'http://localhost:4200/url');
                comp.inspect({ node, directivePosition });
                expect(applicationOperationsSpy.inspect).toHaveBeenCalledTimes(0);
                expect(messageBusMock.emit).toHaveBeenCalledWith('enableFrameConnection', [0, 123]);
                expect(messageBusMock.emit).toHaveBeenCalledWith('log', [
                    {
                        level: 'warn',
                        message: `The currently inspected frame does not have a unique url on this page. Cannot inspect object.`,
                    },
                ]);
            });
            it('should call application operations inspect if a frame is selected that has a unique url on the page', () => {
                contentScriptConnected(0, 'test1', 'http://localhost:4200/url');
                contentScriptConnected(1, 'test2', 'http://localhost:4200/url2');
                comp.inspect({ node, directivePosition });
                expect(applicationOperationsSpy.inspect).toHaveBeenCalledTimes(1);
                expect(messageBusMock.emit).toHaveBeenCalledWith('enableFrameConnection', [0, 123]);
                expect(applicationOperationsSpy.inspect).toHaveBeenCalledWith(directivePosition, ['foo'], {
                    name: 'test1',
                    id: 0,
                    url: new URL('http://localhost:4200/url'),
                });
            });
        });
    });
});
