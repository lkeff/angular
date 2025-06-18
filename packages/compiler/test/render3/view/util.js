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
exports.findExpression = findExpression;
exports.toStringExpression = toStringExpression;
exports.parseR3 = parseR3;
exports.processI18nMeta = processI18nMeta;
const e = __importStar(require("../../../src/expression_parser/ast"));
const lexer_1 = require("../../../src/expression_parser/lexer");
const parser_1 = require("../../../src/expression_parser/parser");
const html = __importStar(require("../../../src/ml_parser/ast"));
const defaults_1 = require("../../../src/ml_parser/defaults");
const html_parser_1 = require("../../../src/ml_parser/html_parser");
const html_whitespaces_1 = require("../../../src/ml_parser/html_whitespaces");
const parser_2 = require("../../../src/ml_parser/parser");
const a = __importStar(require("../../../src/render3/r3_ast"));
const r3_template_transform_1 = require("../../../src/render3/r3_template_transform");
const meta_1 = require("../../../src/render3/view/i18n/meta");
const template_1 = require("../../../src/render3/view/template");
const binding_parser_1 = require("../../../src/template_parser/binding_parser");
class MockSchemaRegistry {
    constructor(existingProperties, attrPropMapping, existingElements, invalidProperties, invalidAttributes) {
        this.existingProperties = existingProperties;
        this.attrPropMapping = attrPropMapping;
        this.existingElements = existingElements;
        this.invalidProperties = invalidProperties;
        this.invalidAttributes = invalidAttributes;
    }
    hasProperty(tagName, property, schemas) {
        const value = this.existingProperties[property];
        return value === void 0 ? true : value;
    }
    hasElement(tagName, schemaMetas) {
        const value = this.existingElements[tagName.toLowerCase()];
        return value === void 0 ? true : value;
    }
    allKnownElementNames() {
        return Object.keys(this.existingElements);
    }
    securityContext(selector, property, isAttribute) {
        return 0;
    }
    getMappedPropName(attrName) {
        return this.attrPropMapping[attrName] || attrName;
    }
    getDefaultComponentElementName() {
        return 'ng-component';
    }
    validateProperty(name) {
        if (this.invalidProperties.indexOf(name) > -1) {
            return { error: true, msg: `Binding to property '${name}' is disallowed for security reasons` };
        }
        else {
            return { error: false };
        }
    }
    validateAttribute(name) {
        if (this.invalidAttributes.indexOf(name) > -1) {
            return {
                error: true,
                msg: `Binding to attribute '${name}' is disallowed for security reasons`,
            };
        }
        else {
            return { error: false };
        }
    }
    normalizeAnimationStyleProperty(propName) {
        return propName;
    }
    normalizeAnimationStyleValue(camelCaseProp, userProvidedProp, val) {
        return { error: null, value: val.toString() };
    }
}
function findExpression(tmpl, expr) {
    const res = tmpl.reduce((found, node) => {
        if (found !== null) {
            return found;
        }
        else {
            return findExpressionInNode(node, expr);
        }
    }, null);
    if (res instanceof e.ASTWithSource) {
        return res.ast;
    }
    return res;
}
function findExpressionInNode(node, expr) {
    if (node instanceof a.Element || node instanceof a.Template || node instanceof a.Component) {
        return findExpression([...node.inputs, ...node.outputs, ...node.children], expr);
    }
    else if (node instanceof a.Directive) {
        return findExpression([...node.inputs, ...node.outputs], expr);
    }
    else if (node instanceof a.BoundAttribute || node instanceof a.BoundText) {
        const ts = toStringExpression(node.value);
        return ts === expr ? node.value : null;
    }
    else if (node instanceof a.BoundEvent) {
        return toStringExpression(node.handler) === expr ? node.handler : null;
    }
    else {
        return null;
    }
}
function toStringExpression(expr) {
    while (expr instanceof e.ASTWithSource) {
        expr = expr.ast;
    }
    if (expr instanceof e.PropertyRead) {
        if (expr.receiver instanceof e.ImplicitReceiver) {
            return expr.name;
        }
        else {
            return `${toStringExpression(expr.receiver)}.${expr.name}`;
        }
    }
    else if (expr instanceof e.ImplicitReceiver) {
        return '';
    }
    else if (expr instanceof e.Interpolation) {
        let str = '{{';
        for (let i = 0; i < expr.expressions.length; i++) {
            str += expr.strings[i] + toStringExpression(expr.expressions[i]);
        }
        str += expr.strings[expr.strings.length - 1] + '}}';
        return str;
    }
    else {
        throw new Error(`Unsupported type: ${expr.constructor.name}`);
    }
}
// Parse an html string to IVY specific info
function parseR3(input, options = {}) {
    var _a;
    const htmlParser = new html_parser_1.HtmlParser();
    const parseResult = htmlParser.parse(input, 'path:://to/template', {
        tokenizeExpansionForms: true,
        leadingTriviaChars: (_a = options.leadingTriviaChars) !== null && _a !== void 0 ? _a : template_1.LEADING_TRIVIA_CHARS,
        selectorlessEnabled: options.selectorlessEnabled,
    });
    if (parseResult.errors.length > 0 && !options.ignoreError) {
        const msg = parseResult.errors.map((e) => e.toString()).join('\n');
        throw new Error(msg);
    }
    let htmlNodes = processI18nMeta(parseResult).rootNodes;
    if (!options.preserveWhitespaces) {
        htmlNodes = (0, html_whitespaces_1.visitAllWithSiblings)(new html_whitespaces_1.WhitespaceVisitor(true /* preserveSignificantWhitespace */), htmlNodes);
    }
    const expressionParser = new parser_1.Parser(new lexer_1.Lexer());
    const schemaRegistry = new MockSchemaRegistry({ 'invalidProp': false }, { 'mappedAttr': 'mappedProp' }, { 'unknown': false, 'un-known': false }, ['onEvent'], ['onEvent']);
    const bindingParser = new binding_parser_1.BindingParser(expressionParser, defaults_1.DEFAULT_INTERPOLATION_CONFIG, schemaRegistry, []);
    const r3Result = (0, r3_template_transform_1.htmlAstToRender3Ast)(htmlNodes, bindingParser, { collectCommentNodes: false });
    if (r3Result.errors.length > 0 && !options.ignoreError) {
        const msg = r3Result.errors.map((e) => e.toString()).join('\n');
        throw new Error(msg);
    }
    return r3Result;
}
function processI18nMeta(htmlAstWithErrors, interpolationConfig = defaults_1.DEFAULT_INTERPOLATION_CONFIG) {
    return new parser_2.ParseTreeResult(html.visitAll(new meta_1.I18nMetaVisitor(interpolationConfig, /* keepI18nAttrs */ false), htmlAstWithErrors.rootNodes), htmlAstWithErrors.errors);
}
