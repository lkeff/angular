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
exports.TreeNodeComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const icon_1 = require("@angular/material/icon");
const tooltip_1 = require("@angular/material/tooltip");
const directive_forest_utils_1 = require("../directive-forest-utils");
const PADDING_LEFT_STEP = 15; // px
let TreeNodeComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'ng-tree-node',
            templateUrl: './tree-node.component.html',
            styleUrls: ['./tree-node.component.scss'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            imports: [icon_1.MatIcon, tooltip_1.MatTooltip],
            host: {
                '[style.padding-left]': 'paddingLeft()',
                '[class.selected]': 'isSelected',
                '[class.highlighted]': 'isHighlighted',
                '[class.new-node]': 'node().newItem',
                '(click)': 'selectNode.emit(this.node())',
                '(dblclick)': 'selectDomElement.emit(this.node())',
                '(mouseenter)': 'highlightNode.emit(this.node())',
                '(mouseleave)': 'removeHighlight.emit()',
            },
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TreeNodeComponent = _classThis = class {
        constructor() {
            this.renderer = (0, core_1.inject)(core_1.Renderer2);
            this.doc = (0, core_1.inject)(common_1.DOCUMENT);
            this.nodeName = core_1.viewChild.required('nodeName');
            this.node = core_1.input.required();
            this.selectedNode = core_1.input.required();
            this.highlightedId = core_1.input.required();
            this.treeControl = core_1.input.required();
            this.textMatch = (0, core_1.input)();
            this.selectNode = (0, core_1.output)();
            this.selectDomElement = (0, core_1.output)();
            this.highlightNode = (0, core_1.output)();
            this.removeHighlight = (0, core_1.output)();
            this.paddingLeft = (0, core_1.computed)(() => (this.node().level + 1) * PADDING_LEFT_STEP + 'px');
            this.isElement = (0, core_1.computed)(() => {
                const cmp = this.node().original.component;
                return cmp && cmp.isElement;
            });
            this.directivesArrayString = (0, core_1.computed)(() => (0, directive_forest_utils_1.getDirectivesArrayString)(this.node()));
            this.nodeNameString = (0, core_1.computed)(() => (0, directive_forest_utils_1.getFullNodeNameString)(this.node()));
            this.matchedText = null;
            this.PADDING_LEFT_STEP = PADDING_LEFT_STEP;
            (0, core_1.afterRenderEffect)({ write: () => this.handleMatchedText() });
        }
        get isSelected() {
            const selectedNode = this.selectedNode();
            return !!selectedNode && selectedNode.id === this.node().id;
        }
        get isHighlighted() {
            var _a;
            return !!this.highlightedId() && this.highlightedId() === ((_a = this.node().original.component) === null || _a === void 0 ? void 0 : _a.id);
        }
        handleMatchedText() {
            if (this.matchedText) {
                this.renderer.removeChild(this.nodeName().nativeElement, this.matchedText);
                this.matchedText = null;
            }
            const textMatch = this.textMatch();
            if (textMatch) {
                this.buildMatchedTextElement(textMatch.startIdx, textMatch.endIdx);
            }
        }
        buildMatchedTextElement(startIdx, endIdx) {
            const name = this.nodeNameString();
            let textBuffer = '';
            const matchedText = this.renderer.createElement('span');
            this.renderer.addClass(matchedText, 'matched-text');
            for (let i = 0; i < name.length; i++) {
                textBuffer += name[i];
                if (i === startIdx - 1 && textBuffer.length) {
                    // Add any text that precedes the matched text.
                    this.appendText(matchedText, textBuffer);
                    textBuffer = '';
                }
                else if (i === endIdx - 1) {
                    // Add the matched text. We don't really need to add the remaining text, if any.
                    const match = this.renderer.createElement('mark');
                    this.appendText(match, textBuffer);
                    this.renderer.appendChild(matchedText, match);
                }
            }
            this.matchedText = matchedText;
            this.renderer.appendChild(this.nodeName().nativeElement, this.matchedText);
        }
        appendText(parent, text) {
            const textNode = this.doc.createTextNode(text);
            this.renderer.appendChild(parent, textNode);
        }
    };
    __setFunctionName(_classThis, "TreeNodeComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TreeNodeComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TreeNodeComponent = _classThis;
})();
exports.TreeNodeComponent = TreeNodeComponent;
