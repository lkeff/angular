"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpansionError = exports.ExpansionResult = void 0;
exports.expandNodes = expandNodes;
const parse_util_1 = require("../parse_util");
const html = __importStar(require("./ast"));
// http://cldr.unicode.org/index/cldr-spec/plural-rules
const PLURAL_CASES = ['zero', 'one', 'two', 'few', 'many', 'other'];
/**
 * Expands special forms into elements.
 *
 * For example,
 *
 * ```
 * { messages.length, plural,
 *   =0 {zero}
 *   =1 {one}
 *   other {more than one}
 * }
 * ```
 *
 * will be expanded into
 *
 * ```html
 * <ng-container [ngPlural]="messages.length">
 *   <ng-template ngPluralCase="=0">zero</ng-template>
 *   <ng-template ngPluralCase="=1">one</ng-template>
 *   <ng-template ngPluralCase="other">more than one</ng-template>
 * </ng-container>
 * ```
 */
function expandNodes(nodes) {
    const expander = new _Expander();
    return new ExpansionResult(html.visitAll(expander, nodes), expander.isExpanded, expander.errors);
}
class ExpansionResult {
    constructor(nodes, expanded, errors) {
        this.nodes = nodes;
        this.expanded = expanded;
        this.errors = errors;
    }
}
exports.ExpansionResult = ExpansionResult;
class ExpansionError extends parse_util_1.ParseError {
    constructor(span, errorMsg) {
        super(span, errorMsg);
    }
}
exports.ExpansionError = ExpansionError;
/**
 * Expand expansion forms (plural, select) to directives
 *
 * @internal
 */
class _Expander {
    constructor() {
        this.isExpanded = false;
        this.errors = [];
    }
    visitElement(element, context) {
        return new html.Element(element.name, element.attrs, element.directives, html.visitAll(this, element.children), element.sourceSpan, element.startSourceSpan, element.endSourceSpan);
    }
    visitAttribute(attribute, context) {
        return attribute;
    }
    visitText(text, context) {
        return text;
    }
    visitComment(comment, context) {
        return comment;
    }
    visitExpansion(icu, context) {
        this.isExpanded = true;
        return icu.type === 'plural'
            ? _expandPluralForm(icu, this.errors)
            : _expandDefaultForm(icu, this.errors);
    }
    visitExpansionCase(icuCase, context) {
        throw new Error('Should not be reached');
    }
    visitBlock(block, context) {
        return new html.Block(block.name, block.parameters, html.visitAll(this, block.children), block.sourceSpan, block.nameSpan, block.startSourceSpan, block.endSourceSpan);
    }
    visitBlockParameter(parameter, context) {
        return parameter;
    }
    visitLetDeclaration(decl, context) {
        return decl;
    }
    visitComponent(node, context) {
        return new html.Component(node.componentName, node.tagName, node.fullName, node.attrs, node.directives, html.visitAll(this, node.children), node.sourceSpan, node.startSourceSpan, node.endSourceSpan);
    }
    visitDirective(directive, context) {
        return directive;
    }
}
// Plural forms are expanded to `NgPlural` and `NgPluralCase`s
function _expandPluralForm(ast, errors) {
    const children = ast.cases.map((c) => {
        if (PLURAL_CASES.indexOf(c.value) === -1 && !c.value.match(/^=\d+$/)) {
            errors.push(new ExpansionError(c.valueSourceSpan, `Plural cases should be "=<number>" or one of ${PLURAL_CASES.join(', ')}`));
        }
        const expansionResult = expandNodes(c.expression);
        errors.push(...expansionResult.errors);
        return new html.Element(`ng-template`, [
            new html.Attribute('ngPluralCase', `${c.value}`, c.valueSourceSpan, undefined /* keySpan */, undefined /* valueSpan */, undefined /* valueTokens */, undefined /* i18n */),
        ], [], expansionResult.nodes, c.sourceSpan, c.sourceSpan, c.sourceSpan);
    });
    const switchAttr = new html.Attribute('[ngPlural]', ast.switchValue, ast.switchValueSourceSpan, undefined /* keySpan */, undefined /* valueSpan */, undefined /* valueTokens */, undefined /* i18n */);
    return new html.Element('ng-container', [switchAttr], [], children, ast.sourceSpan, ast.sourceSpan, ast.sourceSpan);
}
// ICU messages (excluding plural form) are expanded to `NgSwitch`  and `NgSwitchCase`s
function _expandDefaultForm(ast, errors) {
    const children = ast.cases.map((c) => {
        const expansionResult = expandNodes(c.expression);
        errors.push(...expansionResult.errors);
        if (c.value === 'other') {
            // other is the default case when no values match
            return new html.Element(`ng-template`, [
                new html.Attribute('ngSwitchDefault', '', c.valueSourceSpan, undefined /* keySpan */, undefined /* valueSpan */, undefined /* valueTokens */, undefined /* i18n */),
            ], [], expansionResult.nodes, c.sourceSpan, c.sourceSpan, c.sourceSpan);
        }
        return new html.Element(`ng-template`, [
            new html.Attribute('ngSwitchCase', `${c.value}`, c.valueSourceSpan, undefined /* keySpan */, undefined /* valueSpan */, undefined /* valueTokens */, undefined /* i18n */),
        ], [], expansionResult.nodes, c.sourceSpan, c.sourceSpan, c.sourceSpan);
    });
    const switchAttr = new html.Attribute('[ngSwitch]', ast.switchValue, ast.switchValueSourceSpan, undefined /* keySpan */, undefined /* valueSpan */, undefined /* valueTokens */, undefined /* i18n */);
    return new html.Element('ng-container', [switchAttr], children, [], ast.sourceSpan, ast.sourceSpan, ast.sourceSpan);
}
