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
exports.ConvertFieldToSignalInputBestEffortRefactoring = exports.ConvertFieldToSignalInputRefactoring = void 0;
const src_1 = require("@angular/core/schematics/migrations/signal-migration/src");
const typescript_1 = __importDefault(require("typescript"));
const utils_1 = require("../../utils");
const ts_utils_1 = require("../../utils/ts_utils");
const apply_input_refactoring_1 = require("./apply_input_refactoring");
const decorators_1 = require("./decorators");
const decorators_2 = require("../../utils/decorators");
/**
 * Base language service refactoring action that can convert a
 * single individual `@Input()` declaration to a signal inputs
 *
 * The user can click on an `@Input` property declaration in e.g. the VSCode
 * extension and ask for the input to be migrated. All references, imports and
 * the declaration are updated automatically.
 */
class BaseConvertFieldToSignalInputRefactoring {
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
        if (!(0, decorators_2.isDirectiveOrComponent)(classDecl, reflector)) {
            return false;
        }
        const parentClassElement = typescript_1.default.findAncestor(node, (n) => typescript_1.default.isClassElement(n) || typescript_1.default.isBlock(n));
        // If we are inside a body of e.g. an accessor, this action should not show up.
        if (parentClassElement === undefined || typescript_1.default.isBlock(parentClassElement)) {
            return false;
        }
        return (0, decorators_1.isDecoratorInputClassField)(parentClassElement, reflector);
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
            const containingClassElement = typescript_1.default.findAncestor(node, typescript_1.default.isClassElement);
            if (containingClassElement === undefined || !(0, src_1.isInputContainerNode)(containingClassElement)) {
                return { edits: [], errorMessage: 'Selected node does not belong to an input.' };
            }
            return yield (0, apply_input_refactoring_1.applySignalInputRefactoring)(compiler, compilerOptions, this.config, this.project, reportProgress, (input) => input.descriptor.node === containingClassElement, 
            /** allowPartialMigration */ false);
        });
    }
}
class ConvertFieldToSignalInputRefactoring extends BaseConvertFieldToSignalInputRefactoring {
    constructor() {
        super(...arguments);
        this.config = {};
    }
}
exports.ConvertFieldToSignalInputRefactoring = ConvertFieldToSignalInputRefactoring;
ConvertFieldToSignalInputRefactoring.id = 'convert-field-to-signal-input-safe-mode';
ConvertFieldToSignalInputRefactoring.description = 'Convert this @Input() to a signal input (safe)';
class ConvertFieldToSignalInputBestEffortRefactoring extends BaseConvertFieldToSignalInputRefactoring {
    constructor() {
        super(...arguments);
        this.config = { bestEffortMode: true };
    }
}
exports.ConvertFieldToSignalInputBestEffortRefactoring = ConvertFieldToSignalInputBestEffortRefactoring;
ConvertFieldToSignalInputBestEffortRefactoring.id = 'convert-field-to-signal-input-best-effort-mode';
ConvertFieldToSignalInputBestEffortRefactoring.description = 'Convert this @Input() to a signal input (forcibly, ignoring errors)';
