"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SYNTAX_STYLES = void 0;
const highlight_1 = require("@lezer/highlight");
exports.SYNTAX_STYLES = [
    /** A comment. */
    { tag: highlight_1.tags.comment, color: 'var(--code-comment)' },
    /** A language keyword. */
    { tag: highlight_1.tags.keyword, color: 'var(--code-keyword)' },
    /** A string literal */
    { tag: highlight_1.tags.string, color: 'var(--code-string)' },
    /** A number literal. */
    { tag: highlight_1.tags.number, color: 'var(--code-number)' },
    /** A tag name, subtag of typeName. */
    { tag: highlight_1.tags.tagName, color: 'var(--code-tags)' },
    /** The name of a class. */
    { tag: highlight_1.tags.className, color: 'var(--code-component)' },
    /** A line comment. */
    { tag: highlight_1.tags.lineComment, color: 'var(--code-line-comment)' },
    /** A block comment. */
    { tag: highlight_1.tags.blockComment, color: 'var(--code-block-comment)' },
    /** A documentation comment. */
    { tag: highlight_1.tags.docComment, color: 'var(--code-doc-comment)' },
    /** Any kind of identifier. */
    { tag: highlight_1.tags.name, color: 'var(--code-name)' },
    /** The name of a variable. */
    { tag: highlight_1.tags.variableName, color: 'var(--code-variable-name)' },
    /** A type name */
    { tag: highlight_1.tags.typeName, color: 'var(--code-type-name)' },
    /** A property or field name. */
    { tag: highlight_1.tags.propertyName, color: 'var(--code-property-name)' },
    /** An attribute name, subtag of propertyName. */
    { tag: highlight_1.tags.attributeName, color: 'var(--code-attribute-name)' },
    /** A label name. */
    { tag: highlight_1.tags.labelName, color: 'var(--code-label-name)' },
    /** A namespace name. */
    { tag: highlight_1.tags.namespace, color: 'var(--code-namespace)' },
    /** The name of a macro. */
    { tag: highlight_1.tags.macroName, color: 'var(--code-macro-name)' },
    /** A literal value. */
    { tag: highlight_1.tags.literal, color: 'var(--code-literal)' },
    /** A documentation string. */
    { tag: highlight_1.tags.docString, color: 'var(--code-doc-string)' },
    /** A character literal (subtag of string). */
    { tag: highlight_1.tags.character, color: 'var(--code-character)' },
    /** An attribute value (subtag of string). */
    { tag: highlight_1.tags.attributeValue, color: 'var(--code-attribute-value)' },
    /** An integer number literal. */
    { tag: highlight_1.tags.integer, color: 'var(--code-integer)' },
    /** A floating-point number literal. */
    { tag: highlight_1.tags.float, color: 'var(--code-float)' },
    /** A boolean literal. */
    { tag: highlight_1.tags.bool, color: 'var(--code-bool)' },
    /** Regular expression literal. */
    { tag: highlight_1.tags.regexp, color: 'var(--code-regexp)' },
    /** An escape literal, for example a backslash escape in a string. */
    { tag: highlight_1.tags.escape, color: 'var(--code-escape)' },
    /** A color literal . */
    { tag: highlight_1.tags.color, color: 'var(--code-color)' },
    /** A URL literal. */
    { tag: highlight_1.tags.url, color: 'var(--code-url)' },
    /** The keyword for the self or this object. */
    { tag: highlight_1.tags.self, color: 'var(--code-self)' },
    /** The keyword for null. */
    { tag: highlight_1.tags.null, color: 'var(--code-null)' },
    /** A keyword denoting some atomic value. */
    { tag: highlight_1.tags.atom, color: 'var(--code-atom)' },
    /** A keyword that represents a unit. */
    { tag: highlight_1.tags.unit, color: 'var(--code-unit)' },
    /** A modifier keyword. */
    { tag: highlight_1.tags.modifier, color: 'var(--code-modifier)' },
    /** A keyword that acts as an operator. */
    { tag: highlight_1.tags.operatorKeyword, color: 'var(--code-operator-keyword)' },
    /** A control-flow related keyword. */
    { tag: highlight_1.tags.controlKeyword, color: 'var(--code-control-keyword)' },
    /** A keyword that defines something. */
    { tag: highlight_1.tags.definitionKeyword, color: 'var(--code-definition-keyword)' },
    /** A keyword related to defining or interfacing with modules. */
    { tag: highlight_1.tags.moduleKeyword, color: 'var(--code-module-keyword)' },
    /** An operator. */
    { tag: highlight_1.tags.operator, color: 'var(--code-operator)' },
    /** An operator that dereferences something. */
    { tag: highlight_1.tags.derefOperator, color: 'var(--code-deref-operator)' },
    /** Arithmetic-related operator. */
    { tag: highlight_1.tags.arithmeticOperator, color: 'var(--code-arithmetic-operator)' },
    /** Logical operator. */
    { tag: highlight_1.tags.logicOperator, color: 'var(--code-logic-operator)' },
    /** Bit operator. */
    { tag: highlight_1.tags.bitwiseOperator, color: 'var(--code-bitwise-operator)' },
    /** Comparison operator. */
    { tag: highlight_1.tags.compareOperator, color: 'var(--code-compare-operator)' },
    /** Operator that updates its operand. */
    { tag: highlight_1.tags.updateOperator, color: 'var(--code-update-operator)' },
    /** Operator that defines something. */
    { tag: highlight_1.tags.definitionOperator, color: 'var(--code-definition-operator)' },
    /** Type-related operator. */
    { tag: highlight_1.tags.typeOperator, color: 'var(--code-type-operator)' },
    /** Control-flow operator. */
    { tag: highlight_1.tags.controlOperator, color: 'var(--code-control-operator)' },
    /** Program or markup punctuation. */
    { tag: highlight_1.tags.punctuation, color: 'var(--code-punctuation)' },
    /** Punctuation that separates things. */
    { tag: highlight_1.tags.separator, color: 'var(--code-separator)' },
    /** Bracket-style punctuation. */
    { tag: highlight_1.tags.bracket, color: 'var(--code-bracket)' },
    /** Angle brackets (usually `<` and `>` tokens). */
    { tag: highlight_1.tags.angleBracket, color: 'var(--code-angle-bracket)' },
    /** Square brackets (usually `[` and `]` tokens). */
    { tag: highlight_1.tags.squareBracket, color: 'var(--code-square-bracket)' },
    /** Parentheses (usually `(` and `)` tokens). Subtag of bracket. */
    { tag: highlight_1.tags.paren, color: 'var(--code-paren)' },
    /** Braces (usually `{` and `}` tokens). Subtag of bracket. */
    { tag: highlight_1.tags.brace, color: 'var(--code-brace)' },
    /** Content, for example plain text in XML or markup documents. */
    { tag: highlight_1.tags.content, color: 'var(--code-content)' },
    /** Content that represents a heading. */
    { tag: highlight_1.tags.heading, color: 'var(--code-heading)' },
    /** A level 1 heading. */
    { tag: highlight_1.tags.heading1, color: 'var(--code-heading1)' },
    /** A level 2 heading. */
    { tag: highlight_1.tags.heading2, color: 'var(--code-heading2)' },
    /** A level 3 heading. */
    { tag: highlight_1.tags.heading3, color: 'var(--code-heading3)' },
    /** A level 4 heading. */
    { tag: highlight_1.tags.heading4, color: 'var(--code-heading4)' },
    /** A level 5 heading. */
    { tag: highlight_1.tags.heading5, color: 'var(--code-heading5)' },
    /** A level 6 heading. */
    { tag: highlight_1.tags.heading6, color: 'var(--code-heading6)' },
    /** A prose separator (such as a horizontal rule). */
    { tag: highlight_1.tags.contentSeparator, color: 'var(--code-content-separator)' },
    /** Content that represents a list. */
    { tag: highlight_1.tags.list, color: 'var(--code-list)' },
    /** Content that represents a quote. */
    { tag: highlight_1.tags.quote, color: 'var(--code-quote)' },
    /** Content that is emphasized. */
    { tag: highlight_1.tags.emphasis, color: 'var(--code-emphasis)' },
    /** Content that is styled strong. */
    { tag: highlight_1.tags.strong, color: 'var(--code-strong)' },
    /** Content that is part of a link. */
    { tag: highlight_1.tags.link, color: 'var(--code-link)' },
    /** Content that is styled as code or monospace. */
    { tag: highlight_1.tags.monospace, color: 'var(--code-monospace)' },
    /** Content that has a strike-through style. */
    { tag: highlight_1.tags.strikethrough, color: 'var(--code-strikethrough)' },
    /** Inserted text in a change-tracking format. */
    { tag: highlight_1.tags.inserted, color: 'var(--code-inserted)' },
    /** Deleted text. */
    { tag: highlight_1.tags.deleted, color: 'var(--code-deleted)' },
    /** Changed text. */
    { tag: highlight_1.tags.changed, color: 'var(--code-changed)' },
    /** An invalid or unsyntactic element. */
    { tag: highlight_1.tags.invalid, color: 'var(--code-invalid)' },
    /** Metadata or meta-instruction. */
    { tag: highlight_1.tags.meta, color: 'var(--code-meta)' },
    /** Metadata that applies to the entire document. */
    { tag: highlight_1.tags.documentMeta, color: 'var(--code-document-meta)' },
    /** Metadata that annotates or adds attributes to a given syntactic element. */
    { tag: highlight_1.tags.annotation, color: 'var(--code-annotation)' },
    /** Processing instruction or preprocessor directive. Subtag of meta. */
    { tag: highlight_1.tags.processingInstruction, color: 'var(--code-processing-instruction)' },
];
