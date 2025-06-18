"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BabelParseError = void 0;
exports.isLocalize = isLocalize;
exports.isNamedIdentifier = isNamedIdentifier;
exports.isGlobalIdentifier = isGlobalIdentifier;
exports.buildLocalizeReplacement = buildLocalizeReplacement;
exports.unwrapMessagePartsFromLocalizeCall = unwrapMessagePartsFromLocalizeCall;
exports.unwrapSubstitutionsFromLocalizeCall = unwrapSubstitutionsFromLocalizeCall;
exports.unwrapMessagePartsFromTemplateLiteral = unwrapMessagePartsFromTemplateLiteral;
exports.unwrapExpressionsFromTemplateLiteral = unwrapExpressionsFromTemplateLiteral;
exports.wrapInParensIfNecessary = wrapInParensIfNecessary;
exports.unwrapStringLiteralArray = unwrapStringLiteralArray;
exports.unwrapLazyLoadHelperCall = unwrapLazyLoadHelperCall;
exports.isStringLiteralArray = isStringLiteralArray;
exports.isArrayOfExpressions = isArrayOfExpressions;
exports.translate = translate;
exports.isBabelParseError = isBabelParseError;
exports.buildCodeFrameError = buildCodeFrameError;
exports.getLocation = getLocation;
exports.serializeLocationPosition = serializeLocationPosition;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const localize_1 = require("@angular/compiler-cli/private/localize");
const index_1 = require("../../index");
const core_1 = require("@babel/core");
/**
 * Is the given `expression` the global `$localize` identifier?
 *
 * @param expression The expression to check.
 * @param localizeName The configured name of `$localize`.
 */
function isLocalize(expression, localizeName) {
    return isNamedIdentifier(expression, localizeName) && isGlobalIdentifier(expression);
}
/**
 * Is the given `expression` an identifier with the correct `name`?
 *
 * @param expression The expression to check.
 * @param name The name of the identifier we are looking for.
 */
function isNamedIdentifier(expression, name) {
    return expression.isIdentifier() && expression.node.name === name;
}
/**
 * Is the given `identifier` declared globally.
 *
 * @param identifier The identifier to check.
 * @publicApi used by CLI
 */
function isGlobalIdentifier(identifier) {
    return !identifier.scope || !identifier.scope.hasBinding(identifier.node.name);
}
/**
 * Build a translated expression to replace the call to `$localize`.
 * @param messageParts The static parts of the message.
 * @param substitutions The expressions to substitute into the message.
 * @publicApi used by CLI
 */
function buildLocalizeReplacement(messageParts, substitutions) {
    let mappedString = core_1.types.stringLiteral(messageParts[0]);
    for (let i = 1; i < messageParts.length; i++) {
        mappedString = core_1.types.binaryExpression('+', mappedString, wrapInParensIfNecessary(substitutions[i - 1]));
        mappedString = core_1.types.binaryExpression('+', mappedString, core_1.types.stringLiteral(messageParts[i]));
    }
    return mappedString;
}
/**
 * Extract the message parts from the given `call` (to `$localize`).
 *
 * The message parts will either by the first argument to the `call` or it will be wrapped in call
 * to a helper function like `__makeTemplateObject`.
 *
 * @param call The AST node of the call to process.
 * @param fs The file system to use when computing source-map paths. If not provided then it uses
 *     the "current" FileSystem.
 * @publicApi used by CLI
 */
function unwrapMessagePartsFromLocalizeCall(call, fs = (0, localize_1.getFileSystem)()) {
    let cooked = call.get('arguments')[0];
    if (cooked === undefined) {
        throw new BabelParseError(call.node, '`$localize` called without any arguments.');
    }
    if (!cooked.isExpression()) {
        throw new BabelParseError(cooked.node, 'Unexpected argument to `$localize` (expected an array).');
    }
    // If there is no call to `__makeTemplateObject(...)`, then `raw` must be the same as `cooked`.
    let raw = cooked;
    // Check for a memoized form: `x || x = ...`
    if (cooked.isLogicalExpression() &&
        cooked.node.operator === '||' &&
        cooked.get('left').isIdentifier()) {
        const right = cooked.get('right');
        if (right.isAssignmentExpression()) {
            cooked = right.get('right');
            if (!cooked.isExpression()) {
                throw new BabelParseError(cooked.node, 'Unexpected "makeTemplateObject()" function (expected an expression).');
            }
        }
        else if (right.isSequenceExpression()) {
            const expressions = right.get('expressions');
            if (expressions.length > 2) {
                // This is a minified sequence expression, where the first two expressions in the sequence
                // are assignments of the cooked and raw arrays respectively.
                const [first, second] = expressions;
                if (first.isAssignmentExpression()) {
                    cooked = first.get('right');
                    if (!cooked.isExpression()) {
                        throw new BabelParseError(first.node, 'Unexpected cooked value, expected an expression.');
                    }
                    if (second.isAssignmentExpression()) {
                        raw = second.get('right');
                        if (!raw.isExpression()) {
                            throw new BabelParseError(second.node, 'Unexpected raw value, expected an expression.');
                        }
                    }
                    else {
                        // If the second expression is not an assignment then it is probably code to take a copy
                        // of the cooked array. For example: `raw || (raw=cooked.slice(0))`.
                        raw = cooked;
                    }
                }
            }
        }
    }
    // Check for `__makeTemplateObject(cooked, raw)` or `__templateObject()` calls.
    if (cooked.isCallExpression()) {
        let call = cooked;
        if (call.get('arguments').length === 0) {
            // No arguments so perhaps it is a `__templateObject()` call.
            // Unwrap this to get the `_taggedTemplateLiteral(cooked, raw)` call.
            call = unwrapLazyLoadHelperCall(call);
        }
        cooked = call.get('arguments')[0];
        if (!cooked.isExpression()) {
            throw new BabelParseError(cooked.node, 'Unexpected `cooked` argument to the "makeTemplateObject()" function (expected an expression).');
        }
        const arg2 = call.get('arguments')[1];
        if (arg2 && !arg2.isExpression()) {
            throw new BabelParseError(arg2.node, 'Unexpected `raw` argument to the "makeTemplateObject()" function (expected an expression).');
        }
        // If there is no second argument then assume that raw and cooked are the same
        raw = arg2 !== undefined ? arg2 : cooked;
    }
    const [cookedStrings] = unwrapStringLiteralArray(cooked, fs);
    const [rawStrings, rawLocations] = unwrapStringLiteralArray(raw, fs);
    return [(0, index_1.ɵmakeTemplateObject)(cookedStrings, rawStrings), rawLocations];
}
/**
 * Parse the localize call expression to extract the arguments that hold the substitution
 * expressions.
 *
 * @param call The AST node of the call to process.
 * @param fs The file system to use when computing source-map paths. If not provided then it uses
 *     the "current" FileSystem.
 * @publicApi used by CLI
 */
function unwrapSubstitutionsFromLocalizeCall(call, fs = (0, localize_1.getFileSystem)()) {
    const expressions = call.get('arguments').splice(1);
    if (!isArrayOfExpressions(expressions)) {
        const badExpression = expressions.find((expression) => !expression.isExpression());
        throw new BabelParseError(badExpression.node, 'Invalid substitutions for `$localize` (expected all substitution arguments to be expressions).');
    }
    return [
        expressions.map((path) => path.node),
        expressions.map((expression) => getLocation(fs, expression)),
    ];
}
/**
 * Parse the tagged template literal to extract the message parts.
 *
 * @param elements The elements of the template literal to process.
 * @param fs The file system to use when computing source-map paths. If not provided then it uses
 *     the "current" FileSystem.
 * @publicApi used by CLI
 */
function unwrapMessagePartsFromTemplateLiteral(elements, fs = (0, localize_1.getFileSystem)()) {
    const cooked = elements.map((q) => {
        if (q.node.value.cooked === undefined) {
            throw new BabelParseError(q.node, `Unexpected undefined message part in "${elements.map((q) => q.node.value.cooked)}"`);
        }
        return q.node.value.cooked;
    });
    const raw = elements.map((q) => q.node.value.raw);
    const locations = elements.map((q) => getLocation(fs, q));
    return [(0, index_1.ɵmakeTemplateObject)(cooked, raw), locations];
}
/**
 * Parse the tagged template literal to extract the interpolation expressions.
 *
 * @param quasi The AST node of the template literal to process.
 * @param fs The file system to use when computing source-map paths. If not provided then it uses
 *     the "current" FileSystem.
 * @publicApi used by CLI
 */
function unwrapExpressionsFromTemplateLiteral(quasi, fs = (0, localize_1.getFileSystem)()) {
    return [
        quasi.node.expressions,
        quasi.get('expressions').map((e) => getLocation(fs, e)),
    ];
}
/**
 * Wrap the given `expression` in parentheses if it is a binary expression.
 *
 * This ensures that this expression is evaluated correctly if it is embedded in another expression.
 *
 * @param expression The expression to potentially wrap.
 */
function wrapInParensIfNecessary(expression) {
    if (core_1.types.isBinaryExpression(expression)) {
        return core_1.types.parenthesizedExpression(expression);
    }
    else {
        return expression;
    }
}
/**
 * Extract the string values from an `array` of string literals.
 *
 * @param array The array to unwrap.
 * @param fs The file system to use when computing source-map paths. If not provided then it uses
 *     the "current" FileSystem.
 */
function unwrapStringLiteralArray(array, fs = (0, localize_1.getFileSystem)()) {
    if (!isStringLiteralArray(array.node)) {
        throw new BabelParseError(array.node, 'Unexpected messageParts for `$localize` (expected an array of strings).');
    }
    const elements = array.get('elements');
    return [elements.map((str) => str.node.value), elements.map((str) => getLocation(fs, str))];
}
/**
 * This expression is believed to be a call to a "lazy-load" template object helper function.
 * This is expected to be of the form:
 *
 * ```ts
 *  function _templateObject() {
 *    var e = _taggedTemplateLiteral(['cooked string', 'raw string']);
 *    return _templateObject = function() { return e }, e
 *  }
 * ```
 *
 * We unwrap this to return the call to `_taggedTemplateLiteral()`.
 *
 * @param call the call expression to unwrap
 * @returns the  call expression
 */
function unwrapLazyLoadHelperCall(call) {
    const callee = call.get('callee');
    if (!callee.isIdentifier()) {
        throw new BabelParseError(callee.node, 'Unexpected lazy-load helper call (expected a call of the form `_templateObject()`).');
    }
    const lazyLoadBinding = call.scope.getBinding(callee.node.name);
    if (!lazyLoadBinding) {
        throw new BabelParseError(callee.node, 'Missing declaration for lazy-load helper function');
    }
    const lazyLoadFn = lazyLoadBinding.path;
    if (!lazyLoadFn.isFunctionDeclaration()) {
        throw new BabelParseError(lazyLoadFn.node, 'Unexpected expression (expected a function declaration');
    }
    const returnedNode = getReturnedExpression(lazyLoadFn);
    if (returnedNode.isCallExpression()) {
        return returnedNode;
    }
    if (returnedNode.isIdentifier()) {
        const identifierName = returnedNode.node.name;
        const declaration = returnedNode.scope.getBinding(identifierName);
        if (declaration === undefined) {
            throw new BabelParseError(returnedNode.node, 'Missing declaration for return value from helper.');
        }
        if (!declaration.path.isVariableDeclarator()) {
            throw new BabelParseError(declaration.path.node, 'Unexpected helper return value declaration (expected a variable declaration).');
        }
        const initializer = declaration.path.get('init');
        if (!initializer.isCallExpression()) {
            throw new BabelParseError(declaration.path.node, 'Unexpected return value from helper (expected a call expression).');
        }
        // Remove the lazy load helper if this is the only reference to it.
        if (lazyLoadBinding.references === 1) {
            lazyLoadFn.remove();
        }
        return initializer;
    }
    return call;
}
function getReturnedExpression(fn) {
    const bodyStatements = fn.get('body').get('body');
    for (const statement of bodyStatements) {
        if (statement.isReturnStatement()) {
            const argument = statement.get('argument');
            if (argument.isSequenceExpression()) {
                const expressions = argument.get('expressions');
                return Array.isArray(expressions) ? expressions[expressions.length - 1] : expressions;
            }
            else if (argument.isExpression()) {
                return argument;
            }
            else {
                throw new BabelParseError(statement.node, 'Invalid return argument in helper function (expected an expression).');
            }
        }
    }
    throw new BabelParseError(fn.node, 'Missing return statement in helper function.');
}
/**
 * Is the given `node` an array of literal strings?
 *
 * @param node The node to test.
 */
function isStringLiteralArray(node) {
    return core_1.types.isArrayExpression(node) && node.elements.every((element) => core_1.types.isStringLiteral(element));
}
/**
 * Are all the given `nodes` expressions?
 * @param nodes The nodes to test.
 */
function isArrayOfExpressions(paths) {
    return paths.every((element) => element.isExpression());
}
/**
 * Translate the text of the given message, using the given translations.
 *
 * Logs as warning if the translation is not available
 * @publicApi used by CLI
 */
function translate(diagnostics, translations, messageParts, substitutions, missingTranslation) {
    try {
        return (0, index_1.ɵtranslate)(translations, messageParts, substitutions);
    }
    catch (e) {
        if ((0, index_1.ɵisMissingTranslationError)(e)) {
            diagnostics.add(missingTranslation, e.message);
            // Return the parsed message because this will have the meta blocks stripped
            return [
                (0, index_1.ɵmakeTemplateObject)(e.parsedMessage.messageParts, e.parsedMessage.messageParts),
                substitutions,
            ];
        }
        else {
            diagnostics.error(e.message);
            return [messageParts, substitutions];
        }
    }
}
class BabelParseError extends Error {
    constructor(node, message) {
        super(message);
        this.node = node;
        this.type = 'BabelParseError';
    }
}
exports.BabelParseError = BabelParseError;
function isBabelParseError(e) {
    return e.type === 'BabelParseError';
}
function buildCodeFrameError(fs, path, file, e) {
    let filename = file.opts.filename;
    if (filename) {
        filename = fs.resolve(filename);
        let cwd = file.opts.cwd;
        if (cwd) {
            cwd = fs.resolve(cwd);
            filename = fs.relative(cwd, filename);
        }
    }
    else {
        filename = '(unknown file)';
    }
    const { message } = file.hub.buildError(e.node, e.message);
    return `${filename}: ${message}`;
}
function getLocation(fs, startPath, endPath) {
    const startLocation = startPath.node.loc;
    const file = getFileFromPath(fs, startPath);
    if (!startLocation || !file) {
        return undefined;
    }
    const endLocation = (endPath && getFileFromPath(fs, endPath) === file && endPath.node.loc) || startLocation;
    return {
        start: getLineAndColumn(startLocation.start),
        end: getLineAndColumn(endLocation.end),
        file,
        text: startPath.getSource() || undefined,
    };
}
function serializeLocationPosition(location) {
    const endLineString = location.end !== undefined && location.end.line !== location.start.line
        ? `,${location.end.line + 1}`
        : '';
    return `${location.start.line + 1}${endLineString}`;
}
function getFileFromPath(fs, path) {
    var _a, _b, _c;
    // The file field is not guaranteed to be present for all node paths
    const opts = (_a = (path === null || path === void 0 ? void 0 : path.hub).file) === null || _a === void 0 ? void 0 : _a.opts;
    const filename = opts === null || opts === void 0 ? void 0 : opts.filename;
    if (!filename || !opts.cwd) {
        return null;
    }
    const relativePath = fs.relative(opts.cwd, filename);
    const root = (_c = (_b = opts.generatorOpts) === null || _b === void 0 ? void 0 : _b.sourceRoot) !== null && _c !== void 0 ? _c : opts.cwd;
    const absPath = fs.resolve(root, relativePath);
    return absPath;
}
function getLineAndColumn(loc) {
    // Note we want 0-based line numbers but Babel returns 1-based.
    return { line: loc.line - 1, column: loc.column };
}
