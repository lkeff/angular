"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupedTsAstVisitor = void 0;
const typescript_1 = __importDefault(require("typescript"));
/**
 * Class that allows for efficient grouping of TypeScript node AST
 * traversal.
 *
 * Allows visitors to execute in a single pass when visiting all
 * children of source files.
 */
class GroupedTsAstVisitor {
    constructor(files) {
        this.files = files;
        this.visitors = [];
        this.doneFns = [];
        this.state = {
            insidePropertyDeclaration: null,
        };
    }
    register(visitor, done) {
        this.visitors.push(visitor);
        if (done !== undefined) {
            this.doneFns.push(done);
        }
    }
    execute() {
        const visitor = (node) => {
            for (const v of this.visitors) {
                v(node);
            }
            if (typescript_1.default.isPropertyDeclaration(node)) {
                this.state.insidePropertyDeclaration = node;
                typescript_1.default.forEachChild(node, visitor);
                this.state.insidePropertyDeclaration = null;
            }
            else {
                typescript_1.default.forEachChild(node, visitor);
            }
        };
        for (const file of this.files) {
            typescript_1.default.forEachChild(file, visitor);
        }
        for (const doneFn of this.doneFns) {
            doneFn();
        }
        this.visitors = [];
    }
}
exports.GroupedTsAstVisitor = GroupedTsAstVisitor;
