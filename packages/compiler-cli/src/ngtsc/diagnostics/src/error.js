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
exports.FatalDiagnosticError = void 0;
exports.makeDiagnostic = makeDiagnostic;
exports.makeDiagnosticChain = makeDiagnosticChain;
exports.makeRelatedInformation = makeRelatedInformation;
exports.addDiagnosticChain = addDiagnosticChain;
exports.isFatalDiagnosticError = isFatalDiagnosticError;
exports.isLocalCompilationDiagnostics = isLocalCompilationDiagnostics;
const typescript_1 = __importDefault(require("typescript"));
const error_code_1 = require("./error_code");
const util_1 = require("./util");
class FatalDiagnosticError extends Error {
    constructor(code, node, diagnosticMessage, relatedInformation) {
        super(`FatalDiagnosticError: Code: ${code}, Message: ${typescript_1.default.flattenDiagnosticMessageText(diagnosticMessage, '\n')}`);
        this.code = code;
        this.node = node;
        this.diagnosticMessage = diagnosticMessage;
        this.relatedInformation = relatedInformation;
        /**
         * @internal
         */
        this._isFatalDiagnosticError = true;
        // Extending `Error` ends up breaking some internal tests. This appears to be a known issue
        // when extending errors in TS and the workaround is to explicitly set the prototype.
        // https://stackoverflow.com/questions/41102060/typescript-extending-error-class
        Object.setPrototypeOf(this, new.target.prototype);
    }
    toDiagnostic() {
        return makeDiagnostic(this.code, this.node, this.diagnosticMessage, this.relatedInformation);
    }
}
exports.FatalDiagnosticError = FatalDiagnosticError;
function makeDiagnostic(code, node, messageText, relatedInformation, category = typescript_1.default.DiagnosticCategory.Error) {
    node = typescript_1.default.getOriginalNode(node);
    return {
        category,
        code: (0, util_1.ngErrorCode)(code),
        file: typescript_1.default.getOriginalNode(node).getSourceFile(),
        start: node.getStart(undefined, false),
        length: node.getWidth(),
        messageText,
        relatedInformation,
    };
}
function makeDiagnosticChain(messageText, next) {
    return {
        category: typescript_1.default.DiagnosticCategory.Message,
        code: 0,
        messageText,
        next,
    };
}
function makeRelatedInformation(node, messageText) {
    node = typescript_1.default.getOriginalNode(node);
    return {
        category: typescript_1.default.DiagnosticCategory.Message,
        code: 0,
        file: node.getSourceFile(),
        start: node.getStart(),
        length: node.getWidth(),
        messageText,
    };
}
function addDiagnosticChain(messageText, add) {
    if (typeof messageText === 'string') {
        return makeDiagnosticChain(messageText, add);
    }
    if (messageText.next === undefined) {
        messageText.next = add;
    }
    else {
        messageText.next.push(...add);
    }
    return messageText;
}
function isFatalDiagnosticError(err) {
    return err._isFatalDiagnosticError === true;
}
/**
 * Whether the compiler diagnostics represents an error related to local compilation mode.
 *
 * This helper has application in 1P where we check whether a diagnostic is related to local
 * compilation in order to add some g3 specific info to it.
 */
function isLocalCompilationDiagnostics(diagnostic) {
    return (diagnostic.code === (0, util_1.ngErrorCode)(error_code_1.ErrorCode.LOCAL_COMPILATION_UNRESOLVED_CONST) ||
        diagnostic.code === (0, util_1.ngErrorCode)(error_code_1.ErrorCode.LOCAL_COMPILATION_UNSUPPORTED_EXPRESSION));
}
