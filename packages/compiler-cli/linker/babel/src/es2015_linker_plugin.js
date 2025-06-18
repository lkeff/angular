"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEs2015LinkerPlugin = createEs2015LinkerPlugin;
const core_1 = require("@babel/core");
const linker_1 = require("../../../linker");
const babel_ast_factory_1 = require("./ast/babel_ast_factory");
const babel_ast_host_1 = require("./ast/babel_ast_host");
const babel_declaration_scope_1 = require("./babel_declaration_scope");
/**
 * Create a Babel plugin that visits the program, identifying and linking partial declarations.
 *
 * The plugin delegates most of its work to a generic `FileLinker` for each file (`t.Program` in
 * Babel) that is visited.
 */
function createEs2015LinkerPlugin(_a) {
    var { fileSystem, logger } = _a, options = __rest(_a, ["fileSystem", "logger"]);
    let fileLinker = null;
    return {
        visitor: {
            Program: {
                /**
                 * Create a new `FileLinker` as we enter each file (`t.Program` in Babel).
                 */
                enter(_, state) {
                    var _a, _b;
                    assertNull(fileLinker);
                    // Babel can be configured with a `filename` or `relativeFilename` (or both, or neither) -
                    // possibly relative to the optional `cwd` path.
                    const file = state.file;
                    const filename = (_a = file.opts.filename) !== null && _a !== void 0 ? _a : file.opts.filenameRelative;
                    if (!filename) {
                        throw new Error('No filename (nor filenameRelative) provided by Babel. This is required for the linking of partially compiled directives and components.');
                    }
                    const sourceUrl = fileSystem.resolve((_b = file.opts.cwd) !== null && _b !== void 0 ? _b : '.', filename);
                    const linkerEnvironment = linker_1.LinkerEnvironment.create(fileSystem, logger, new babel_ast_host_1.BabelAstHost(), new babel_ast_factory_1.BabelAstFactory(sourceUrl), options);
                    fileLinker = new linker_1.FileLinker(linkerEnvironment, sourceUrl, file.code);
                },
                /**
                 * On exiting the file, insert any shared constant statements that were generated during
                 * linking of the partial declarations.
                 */
                exit() {
                    assertNotNull(fileLinker);
                    for (const { constantScope, statements } of fileLinker.getConstantStatements()) {
                        insertStatements(constantScope, statements);
                    }
                    fileLinker = null;
                },
            },
            /**
             * Test each call expression to see if it is a partial declaration; it if is then replace it
             * with the results of linking the declaration.
             */
            CallExpression(call, state) {
                if (fileLinker === null) {
                    // Any statements that are inserted upon program exit will be visited outside of an active
                    // linker context. These call expressions are known not to contain partial declarations,
                    // so it's safe to skip visiting those call expressions.
                    return;
                }
                try {
                    const calleeName = getCalleeName(call);
                    if (calleeName === null) {
                        return;
                    }
                    const args = call.node.arguments;
                    if (!fileLinker.isPartialDeclaration(calleeName) || !isExpressionArray(args)) {
                        return;
                    }
                    const declarationScope = new babel_declaration_scope_1.BabelDeclarationScope(call.scope);
                    const replacement = fileLinker.linkPartialDeclaration(calleeName, args, declarationScope);
                    call.replaceWith(replacement);
                }
                catch (e) {
                    const node = (0, linker_1.isFatalLinkerError)(e) ? e.node : call.node;
                    throw buildCodeFrameError(state.file, e.message, node);
                }
            },
        },
    };
}
/**
 * Insert the `statements` at the location defined by `path`.
 *
 * The actual insertion strategy depends upon the type of the `path`.
 */
function insertStatements(path, statements) {
    if (path.isProgram()) {
        insertIntoProgram(path, statements);
    }
    else {
        insertIntoFunction(path, statements);
    }
}
/**
 * Insert the `statements` at the top of the body of the `fn` function.
 */
function insertIntoFunction(fn, statements) {
    const body = fn.get('body');
    body.unshiftContainer('body', statements);
}
/**
 * Insert the `statements` at the top of the `program`, below any import statements.
 */
function insertIntoProgram(program, statements) {
    const body = program.get('body');
    const insertBeforeIndex = body.findIndex((statement) => !statement.isImportDeclaration());
    if (insertBeforeIndex === -1) {
        program.unshiftContainer('body', statements);
    }
    else {
        body[insertBeforeIndex].insertBefore(statements);
    }
}
function getCalleeName(call) {
    const callee = call.node.callee;
    if (core_1.types.isIdentifier(callee)) {
        return callee.name;
    }
    else if (core_1.types.isMemberExpression(callee) && core_1.types.isIdentifier(callee.property)) {
        return callee.property.name;
    }
    else if (core_1.types.isMemberExpression(callee) && core_1.types.isStringLiteral(callee.property)) {
        return callee.property.value;
    }
    else {
        return null;
    }
}
/**
 * Return true if all the `nodes` are Babel expressions.
 */
function isExpressionArray(nodes) {
    return nodes.every((node) => core_1.types.isExpression(node));
}
/**
 * Assert that the given `obj` is `null`.
 */
function assertNull(obj) {
    if (obj !== null) {
        throw new Error('BUG - expected `obj` to be null');
    }
}
/**
 * Assert that the given `obj` is not `null`.
 */
function assertNotNull(obj) {
    if (obj === null) {
        throw new Error('BUG - expected `obj` not to be null');
    }
}
/**
 * Create a string representation of an error that includes the code frame of the `node`.
 */
function buildCodeFrameError(file, message, node) {
    const filename = file.opts.filename || '(unknown file)';
    const error = file.hub.buildError(node, message);
    return `${filename}: ${error.message}`;
}
