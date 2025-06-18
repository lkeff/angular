"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectiveSourceManager = void 0;
const compiler_1 = require("@angular/compiler");
const diagnostics_1 = require("../diagnostics");
const line_mappings_1 = require("./line_mappings");
/**
 * Represents the source of code processed during type-checking. This information is used when
 * translating parse offsets in diagnostics back to their original line/column location.
 */
class Source {
    constructor(mapping, file) {
        this.mapping = mapping;
        this.file = file;
        this.lineStarts = null;
    }
    toParseSourceSpan(start, end) {
        const startLoc = this.toParseLocation(start);
        const endLoc = this.toParseLocation(end);
        return new compiler_1.ParseSourceSpan(startLoc, endLoc);
    }
    toParseLocation(position) {
        const lineStarts = this.acquireLineStarts();
        const { line, character } = (0, line_mappings_1.getLineAndCharacterFromPosition)(lineStarts, position);
        return new compiler_1.ParseLocation(this.file, position, line, character);
    }
    acquireLineStarts() {
        if (this.lineStarts === null) {
            this.lineStarts = (0, line_mappings_1.computeLineStartsMap)(this.file.content);
        }
        return this.lineStarts;
    }
}
/**
 * Assigns IDs for type checking and keeps track of their origins.
 *
 * Implements `TypeCheckSourceResolver` to resolve the source of a template based on these IDs.
 */
class DirectiveSourceManager {
    constructor() {
        /**
         * This map keeps track of all template sources that have been type-checked by the id that is
         * attached to a TCB's function declaration as leading trivia. This enables translation of
         * diagnostics produced for TCB code to their source location in the template.
         */
        this.templateSources = new Map();
        /** Keeps track of type check IDs and the source location of their host bindings. */
        this.hostBindingSources = new Map();
    }
    getTypeCheckId(node) {
        return (0, diagnostics_1.getTypeCheckId)(node);
    }
    captureTemplateSource(id, mapping, file) {
        this.templateSources.set(id, new Source(mapping, file));
    }
    captureHostBindingsMapping(id, mapping, file) {
        this.hostBindingSources.set(id, new Source(mapping, file));
    }
    getTemplateSourceMapping(id) {
        if (!this.templateSources.has(id)) {
            throw new Error(`Unexpected unknown type check ID: ${id}`);
        }
        return this.templateSources.get(id).mapping;
    }
    getHostBindingsMapping(id) {
        if (!this.hostBindingSources.has(id)) {
            throw new Error(`Unexpected unknown type check ID: ${id}`);
        }
        return this.hostBindingSources.get(id).mapping;
    }
    toTemplateParseSourceSpan(id, span) {
        if (!this.templateSources.has(id)) {
            return null;
        }
        const templateSource = this.templateSources.get(id);
        return templateSource.toParseSourceSpan(span.start, span.end);
    }
    toHostParseSourceSpan(id, span) {
        if (!this.hostBindingSources.has(id)) {
            return null;
        }
        const source = this.hostBindingSources.get(id);
        return source.toParseSourceSpan(span.start, span.end);
    }
}
exports.DirectiveSourceManager = DirectiveSourceManager;
