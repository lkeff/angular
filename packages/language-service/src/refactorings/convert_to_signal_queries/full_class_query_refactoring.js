"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertFullClassToSignalQueriesBestEffortRefactoring = exports.ConvertFullClassToSignalQueriesRefactoring = void 0;
const typescript_1 = __importDefault(require("typescript"));
const utils_1 = require("../../utils");
const ts_utils_1 = require("../../utils/ts_utils");
const decorators_1 = require("./decorators");
const apply_query_refactoring_1 = require("./apply_query_refactoring");
/**
 * Base language service refactoring action that can convert decorator
 * queries of a full class to signal queries.
 *
 * The user can click on an class with decorator queries and ask for all the queries
 * to be migrated. All references, imports and the declaration are updated automatically.
 */
class BaseConvertFullClassToSignalQueriesRefactoring {
    constructor(project) {
        this.project = project;
    }
    static isApplicable(compiler, fileName, positionOrRange) {
        if (!(0, utils_1.isTypeScriptFile)(fileName)) {
            return false;
        }
        const sf = compiler.getCurrentProgram().getSourceFile(fileName);
        if (sf === undefined) {
            return false;
        }
        const start = typeof positionOrRange === 'number' ? positionOrRange : positionOrRange.pos;
        const node = (0, ts_utils_1.findTightestNode)(sf, start);
        if (node === undefined) {
            return false;
        }
        const classDecl = (0, ts_utils_1.getParentClassDeclaration)(node);
        if (classDecl === undefined) {
            return false;
        }
        const { reflector } = compiler['ensureAnalyzed']();
        if (!(0, decorators_1.isDirectiveOrComponentWithQueries)(classDecl, reflector)) {
            return false;
        }
        const parentClassElement = typescript_1.default.findAncestor(node, (n) => typescript_1.default.isClassElement(n) || typescript_1.default.isBlock(n));
        if (parentClassElement === undefined) {
            return true;
        }
        // If we are inside a body of e.g. an accessor, this action should not show up.
        if (typescript_1.default.isBlock(parentClassElement)) {
            return false;
        }
        return (0, decorators_1.isDecoratorQueryClassField)(parentClassElement, reflector);
    }
    computeEditsForFix(compiler, compilerOptions, fileName, positionOrRange, reportProgress) {
        return __awaiter(this, void 0, void 0, function* () {
            const sf = compiler.getCurrentProgram().getSourceFile(fileName);
            if (sf === undefined) {
                return { edits: [] };
            }
            const start = typeof positionOrRange === 'number' ? positionOrRange : positionOrRange.pos;
            const node = (0, ts_utils_1.findTightestNode)(sf, start);
            if (node === undefined) {
                return { edits: [] };
            }
            const containingClass = (0, ts_utils_1.getParentClassDeclaration)(node);
            if (containingClass === null) {
                return { edits: [], errorMessage: 'Could not find a class for the refactoring.' };
            }
            return yield (0, apply_query_refactoring_1.applySignalQueriesRefactoring)(compiler, compilerOptions, this.config, this.project, reportProgress, (queryID) => queryID.node.parent === containingClass, 
            /** allowPartialMigration */ true);
        });
    }
}
class ConvertFullClassToSignalQueriesRefactoring extends BaseConvertFullClassToSignalQueriesRefactoring {
    constructor() {
        super(...arguments);
        this.config = {};
    }
}
exports.ConvertFullClassToSignalQueriesRefactoring = ConvertFullClassToSignalQueriesRefactoring;
ConvertFullClassToSignalQueriesRefactoring.id = 'convert-full-class-to-signal-queries-safe-mode';
ConvertFullClassToSignalQueriesRefactoring.description = 'Full class: Convert all decorator queries to signal queries (safe)';
class ConvertFullClassToSignalQueriesBestEffortRefactoring extends BaseConvertFullClassToSignalQueriesRefactoring {
    constructor() {
        super(...arguments);
        this.config = { bestEffortMode: true };
    }
}
exports.ConvertFullClassToSignalQueriesBestEffortRefactoring = ConvertFullClassToSignalQueriesBestEffortRefactoring;
ConvertFullClassToSignalQueriesBestEffortRefactoring.id = 'convert-full-class-to-signal-queries-best-effort-mode';
ConvertFullClassToSignalQueriesBestEffortRefactoring.description = 'Full class: Convert all decorator queries to signal queries (forcibly, ignoring errors)';
