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
const html = __importStar(require("../../src/ml_parser/ast"));
const html_parser_1 = require("../../src/ml_parser/html_parser");
const icu_ast_expander_1 = require("../../src/ml_parser/icu_ast_expander");
const ast_spec_utils_1 = require("./ast_spec_utils");
describe('Expander', () => {
    function expand(template, options = {}) {
        const htmlParser = new html_parser_1.HtmlParser();
        const res = htmlParser.parse(template, 'url', Object.assign({ tokenizeExpansionForms: true }, options));
        return (0, icu_ast_expander_1.expandNodes)(res.rootNodes);
    }
    it('should handle the plural expansion form', () => {
        const res = expand(`{messages.length, plural,=0 {zero<b>bold</b>}}`);
        expect((0, ast_spec_utils_1.humanizeNodes)(res.nodes)).toEqual([
            [html.Element, 'ng-container', 0],
            [html.Attribute, '[ngPlural]', 'messages.length'],
            [html.Element, 'ng-template', 1],
            [html.Attribute, 'ngPluralCase', '=0'],
            [html.Text, 'zero', 2, ['zero']],
            [html.Element, 'b', 2],
            [html.Text, 'bold', 3, ['bold']],
        ]);
    });
    it('should handle nested expansion forms', () => {
        const res = expand(`{messages.length, plural, =0 { {p.gender, select, male {m}} }}`);
        expect((0, ast_spec_utils_1.humanizeNodes)(res.nodes)).toEqual([
            [html.Element, 'ng-container', 0],
            [html.Attribute, '[ngPlural]', 'messages.length'],
            [html.Element, 'ng-template', 1],
            [html.Attribute, 'ngPluralCase', '=0'],
            [html.Element, 'ng-container', 2],
            [html.Attribute, '[ngSwitch]', 'p.gender'],
            [html.Element, 'ng-template', 3],
            [html.Attribute, 'ngSwitchCase', 'male'],
            [html.Text, 'm', 4, ['m']],
            [html.Text, ' ', 2, [' ']],
        ]);
    });
    it('should correctly set source code positions', () => {
        const nodes = expand(`{messages.length, plural,=0 {<b>bold</b>}}`).nodes;
        const container = nodes[0];
        expect(container.sourceSpan.start.col).toEqual(0);
        expect(container.sourceSpan.end.col).toEqual(42);
        expect(container.startSourceSpan.start.col).toEqual(0);
        expect(container.startSourceSpan.end.col).toEqual(42);
        expect(container.endSourceSpan.start.col).toEqual(0);
        expect(container.endSourceSpan.end.col).toEqual(42);
        const switchExp = container.attrs[0];
        expect(switchExp.sourceSpan.start.col).toEqual(1);
        expect(switchExp.sourceSpan.end.col).toEqual(16);
        const template = container.children[0];
        expect(template.sourceSpan.start.col).toEqual(25);
        expect(template.sourceSpan.end.col).toEqual(41);
        const switchCheck = template.attrs[0];
        expect(switchCheck.sourceSpan.start.col).toEqual(25);
        expect(switchCheck.sourceSpan.end.col).toEqual(28);
        const b = template.children[0];
        expect(b.sourceSpan.start.col).toEqual(29);
        expect(b.endSourceSpan.end.col).toEqual(40);
    });
    it('should handle other special forms', () => {
        const res = expand(`{person.gender, select, male {m} other {default}}`);
        expect((0, ast_spec_utils_1.humanizeNodes)(res.nodes)).toEqual([
            [html.Element, 'ng-container', 0],
            [html.Attribute, '[ngSwitch]', 'person.gender'],
            [html.Element, 'ng-template', 1],
            [html.Attribute, 'ngSwitchCase', 'male'],
            [html.Text, 'm', 2, ['m']],
            [html.Element, 'ng-template', 1],
            [html.Attribute, 'ngSwitchDefault', ''],
            [html.Text, 'default', 2, ['default']],
        ]);
    });
    it('should parse an expansion form as a tag single child', () => {
        const res = expand(`<div><span>{a, b, =4 {c}}</span></div>`);
        expect((0, ast_spec_utils_1.humanizeNodes)(res.nodes)).toEqual([
            [html.Element, 'div', 0],
            [html.Element, 'span', 1],
            [html.Element, 'ng-container', 2],
            [html.Attribute, '[ngSwitch]', 'a'],
            [html.Element, 'ng-template', 3],
            [html.Attribute, 'ngSwitchCase', '=4'],
            [html.Text, 'c', 4, ['c']],
        ]);
    });
    it('should parse an expansion forms inside of blocks', () => {
        const res = expand('@if (cond) {{a, b, =4 {c}}@if (otherCond) {{d, e, =4 {f}}}}');
        expect((0, ast_spec_utils_1.humanizeNodes)(res.nodes)).toEqual([
            [html.Block, 'if', 0],
            [html.BlockParameter, 'cond'],
            [html.Element, 'ng-container', 1],
            [html.Attribute, '[ngSwitch]', 'a'],
            [html.Element, 'ng-template', 2],
            [html.Attribute, 'ngSwitchCase', '=4'],
            [html.Text, 'c', 3, ['c']],
            [html.Block, 'if', 1],
            [html.BlockParameter, 'otherCond'],
            [html.Element, 'ng-container', 2],
            [html.Attribute, '[ngSwitch]', 'd'],
            [html.Element, 'ng-template', 3],
            [html.Attribute, 'ngSwitchCase', '=4'],
            [html.Text, 'f', 4, ['f']],
        ]);
    });
    describe('errors', () => {
        it('should error on unknown plural cases', () => {
            expect(humanizeErrors(expand('{n, plural, unknown {-}}').errors)).toEqual([
                `Plural cases should be "=<number>" or one of zero, one, two, few, many, other`,
            ]);
        });
    });
});
function humanizeErrors(errors) {
    return errors.map((error) => error.msg);
}
