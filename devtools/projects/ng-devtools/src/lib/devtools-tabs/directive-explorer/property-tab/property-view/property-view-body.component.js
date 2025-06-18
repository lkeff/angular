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
exports.InjectedServicesComponent = exports.PropertyViewBodyComponent = void 0;
const drag_drop_1 = require("@angular/cdk/drag-drop");
const core_1 = require("@angular/core");
const property_view_tree_component_1 = require("./property-view-tree.component");
const icon_1 = require("@angular/material/icon");
const tooltip_1 = require("@angular/material/tooltip");
const expansion_1 = require("@angular/material/expansion");
const dependency_viewer_component_1 = require("./dependency-viewer.component");
let PropertyViewBodyComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-property-view-body',
            templateUrl: './property-view-body.component.html',
            styleUrls: ['./property-view-body.component.scss'],
            imports: [
                expansion_1.MatExpansionModule,
                drag_drop_1.CdkDropList,
                tooltip_1.MatTooltip,
                icon_1.MatIcon,
                (0, core_1.forwardRef)(() => InjectedServicesComponent),
                drag_drop_1.CdkDrag,
                property_view_tree_component_1.PropertyViewTreeComponent,
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PropertyViewBodyComponent = _classThis = class {
        constructor() {
            this.controller = core_1.input.required();
            this.directiveInputControls = core_1.input.required();
            this.directivePropControls = core_1.input.required();
            this.directiveOutputControls = core_1.input.required();
            this.directiveStateControls = core_1.input.required();
            this.inspect = (0, core_1.output)();
            this.dependencies = (0, core_1.computed)(() => {
                const metadata = this.controller().directiveMetadata;
                if (!metadata)
                    return [];
                if (!('dependencies' in metadata))
                    return [];
                return metadata.dependencies;
            });
            this.panels = (0, core_1.signal)([
                {
                    title: () => 'Inputs',
                    controls: () => this.directiveInputControls(),
                },
                {
                    title: () => 'Props',
                    controls: () => this.directivePropControls(),
                },
                {
                    title: () => 'Outputs',
                    controls: () => this.directiveOutputControls(),
                },
                {
                    title: () => { var _a; return ((_a = this.controller().directiveMetadata) === null || _a === void 0 ? void 0 : _a.framework) === core_1.ɵFramework.Wiz ? 'State' : 'Properties'; },
                    controls: () => this.directiveStateControls(),
                },
            ]);
            this.controlsLoaded = (0, core_1.computed)(() => {
                return (!!this.directiveStateControls() &&
                    !!this.directiveOutputControls() &&
                    !!this.directiveInputControls());
            });
        }
        updateValue({ node, newValue }) {
            this.controller().updateValue(node, newValue);
        }
        drop(event) {
            const panels = this.panels();
            (0, drag_drop_1.moveItemInArray)(panels, event.previousIndex, event.currentIndex);
            this.panels.set(Array.from(panels)); // Clone array for immutable update.
        }
        handleInspect(node) {
            this.inspect.emit({
                node,
                directivePosition: this.controller().directivePosition,
            });
        }
    };
    __setFunctionName(_classThis, "PropertyViewBodyComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PropertyViewBodyComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PropertyViewBodyComponent = _classThis;
})();
exports.PropertyViewBodyComponent = PropertyViewBodyComponent;
let InjectedServicesComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-injected-services',
            template: `
    <div class="services">
      @for (dependency of dependencies(); track dependency.position[0]) {
        <ng-dependency-viewer [dependency]="dependency" />
      }
    </div>
  `,
            styles: [
                `
      :host {
        display: block;
        padding: 0.5rem;

        .services {
          border-radius: 0.375rem;
          background: color-mix(in srgb, var(--senary-contrast) 50%, var(--color-background) 50%);
          overflow: hidden;

          .wrapper {
            ng-dependency-viewer {
              display: block;
            }
          }
        }
    `,
            ],
            imports: [dependency_viewer_component_1.DependencyViewerComponent],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var InjectedServicesComponent = _classThis = class {
        constructor() {
            this.controller = core_1.input.required();
            this.dependencies = (0, core_1.computed)(() => {
                var _a;
                const metadata = this.controller().directiveMetadata;
                if (!metadata)
                    return [];
                if (!('dependencies' in metadata))
                    return [];
                return (_a = metadata.dependencies) !== null && _a !== void 0 ? _a : [];
            });
        }
    };
    __setFunctionName(_classThis, "InjectedServicesComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InjectedServicesComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InjectedServicesComponent = _classThis;
})();
exports.InjectedServicesComponent = InjectedServicesComponent;
