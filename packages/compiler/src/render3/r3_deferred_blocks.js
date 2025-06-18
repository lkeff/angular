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
exports.isConnectedDeferLoopBlock = isConnectedDeferLoopBlock;
exports.createDeferredBlock = createDeferredBlock;
const html = __importStar(require("../ml_parser/ast"));
const parse_util_1 = require("../parse_util");
const t = __importStar(require("./r3_ast"));
const r3_deferred_triggers_1 = require("./r3_deferred_triggers");
/** Pattern to identify a `prefetch when` trigger. */
const PREFETCH_WHEN_PATTERN = /^prefetch\s+when\s/;
/** Pattern to identify a `prefetch on` trigger. */
const PREFETCH_ON_PATTERN = /^prefetch\s+on\s/;
/** Pattern to identify a `hydrate when` trigger. */
const HYDRATE_WHEN_PATTERN = /^hydrate\s+when\s/;
/** Pattern to identify a `hydrate on` trigger. */
const HYDRATE_ON_PATTERN = /^hydrate\s+on\s/;
/** Pattern to identify a `hydrate never` trigger. */
const HYDRATE_NEVER_PATTERN = /^hydrate\s+never(\s*)$/;
/** Pattern to identify a `minimum` parameter in a block. */
const MINIMUM_PARAMETER_PATTERN = /^minimum\s/;
/** Pattern to identify a `after` parameter in a block. */
const AFTER_PARAMETER_PATTERN = /^after\s/;
/** Pattern to identify a `when` parameter in a block. */
const WHEN_PARAMETER_PATTERN = /^when\s/;
/** Pattern to identify a `on` parameter in a block. */
const ON_PARAMETER_PATTERN = /^on\s/;
/**
 * Predicate function that determines if a block with
 * a specific name cam be connected to a `defer` block.
 */
function isConnectedDeferLoopBlock(name) {
    return name === 'placeholder' || name === 'loading' || name === 'error';
}
/** Creates a deferred block from an HTML AST node. */
function createDeferredBlock(ast, connectedBlocks, visitor, bindingParser) {
    const errors = [];
    const { placeholder, loading, error } = parseConnectedBlocks(connectedBlocks, errors, visitor);
    const { triggers, prefetchTriggers, hydrateTriggers } = parsePrimaryTriggers(ast, bindingParser, errors, placeholder);
    // The `defer` block has a main span encompassing all of the connected branches as well.
    let lastEndSourceSpan = ast.endSourceSpan;
    let endOfLastSourceSpan = ast.sourceSpan.end;
    if (connectedBlocks.length > 0) {
        const lastConnectedBlock = connectedBlocks[connectedBlocks.length - 1];
        lastEndSourceSpan = lastConnectedBlock.endSourceSpan;
        endOfLastSourceSpan = lastConnectedBlock.sourceSpan.end;
    }
    const sourceSpanWithConnectedBlocks = new parse_util_1.ParseSourceSpan(ast.sourceSpan.start, endOfLastSourceSpan);
    const node = new t.DeferredBlock(html.visitAll(visitor, ast.children, ast.children), triggers, prefetchTriggers, hydrateTriggers, placeholder, loading, error, ast.nameSpan, sourceSpanWithConnectedBlocks, ast.sourceSpan, ast.startSourceSpan, lastEndSourceSpan, ast.i18n);
    return { node, errors };
}
function parseConnectedBlocks(connectedBlocks, errors, visitor) {
    let placeholder = null;
    let loading = null;
    let error = null;
    for (const block of connectedBlocks) {
        try {
            if (!isConnectedDeferLoopBlock(block.name)) {
                errors.push(new parse_util_1.ParseError(block.startSourceSpan, `Unrecognized block "@${block.name}"`));
                break;
            }
            switch (block.name) {
                case 'placeholder':
                    if (placeholder !== null) {
                        errors.push(new parse_util_1.ParseError(block.startSourceSpan, `@defer block can only have one @placeholder block`));
                    }
                    else {
                        placeholder = parsePlaceholderBlock(block, visitor);
                    }
                    break;
                case 'loading':
                    if (loading !== null) {
                        errors.push(new parse_util_1.ParseError(block.startSourceSpan, `@defer block can only have one @loading block`));
                    }
                    else {
                        loading = parseLoadingBlock(block, visitor);
                    }
                    break;
                case 'error':
                    if (error !== null) {
                        errors.push(new parse_util_1.ParseError(block.startSourceSpan, `@defer block can only have one @error block`));
                    }
                    else {
                        error = parseErrorBlock(block, visitor);
                    }
                    break;
            }
        }
        catch (e) {
            errors.push(new parse_util_1.ParseError(block.startSourceSpan, e.message));
        }
    }
    return { placeholder, loading, error };
}
function parsePlaceholderBlock(ast, visitor) {
    let minimumTime = null;
    for (const param of ast.parameters) {
        if (MINIMUM_PARAMETER_PATTERN.test(param.expression)) {
            if (minimumTime != null) {
                throw new Error(`@placeholder block can only have one "minimum" parameter`);
            }
            const parsedTime = (0, r3_deferred_triggers_1.parseDeferredTime)(param.expression.slice((0, r3_deferred_triggers_1.getTriggerParametersStart)(param.expression)));
            if (parsedTime === null) {
                throw new Error(`Could not parse time value of parameter "minimum"`);
            }
            minimumTime = parsedTime;
        }
        else {
            throw new Error(`Unrecognized parameter in @placeholder block: "${param.expression}"`);
        }
    }
    return new t.DeferredBlockPlaceholder(html.visitAll(visitor, ast.children, ast.children), minimumTime, ast.nameSpan, ast.sourceSpan, ast.startSourceSpan, ast.endSourceSpan, ast.i18n);
}
function parseLoadingBlock(ast, visitor) {
    let afterTime = null;
    let minimumTime = null;
    for (const param of ast.parameters) {
        if (AFTER_PARAMETER_PATTERN.test(param.expression)) {
            if (afterTime != null) {
                throw new Error(`@loading block can only have one "after" parameter`);
            }
            const parsedTime = (0, r3_deferred_triggers_1.parseDeferredTime)(param.expression.slice((0, r3_deferred_triggers_1.getTriggerParametersStart)(param.expression)));
            if (parsedTime === null) {
                throw new Error(`Could not parse time value of parameter "after"`);
            }
            afterTime = parsedTime;
        }
        else if (MINIMUM_PARAMETER_PATTERN.test(param.expression)) {
            if (minimumTime != null) {
                throw new Error(`@loading block can only have one "minimum" parameter`);
            }
            const parsedTime = (0, r3_deferred_triggers_1.parseDeferredTime)(param.expression.slice((0, r3_deferred_triggers_1.getTriggerParametersStart)(param.expression)));
            if (parsedTime === null) {
                throw new Error(`Could not parse time value of parameter "minimum"`);
            }
            minimumTime = parsedTime;
        }
        else {
            throw new Error(`Unrecognized parameter in @loading block: "${param.expression}"`);
        }
    }
    return new t.DeferredBlockLoading(html.visitAll(visitor, ast.children, ast.children), afterTime, minimumTime, ast.nameSpan, ast.sourceSpan, ast.startSourceSpan, ast.endSourceSpan, ast.i18n);
}
function parseErrorBlock(ast, visitor) {
    if (ast.parameters.length > 0) {
        throw new Error(`@error block cannot have parameters`);
    }
    return new t.DeferredBlockError(html.visitAll(visitor, ast.children, ast.children), ast.nameSpan, ast.sourceSpan, ast.startSourceSpan, ast.endSourceSpan, ast.i18n);
}
function parsePrimaryTriggers(ast, bindingParser, errors, placeholder) {
    const triggers = {};
    const prefetchTriggers = {};
    const hydrateTriggers = {};
    for (const param of ast.parameters) {
        // The lexer ignores the leading spaces so we can assume
        // that the expression starts with a keyword.
        if (WHEN_PARAMETER_PATTERN.test(param.expression)) {
            (0, r3_deferred_triggers_1.parseWhenTrigger)(param, bindingParser, triggers, errors);
        }
        else if (ON_PARAMETER_PATTERN.test(param.expression)) {
            (0, r3_deferred_triggers_1.parseOnTrigger)(param, triggers, errors, placeholder);
        }
        else if (PREFETCH_WHEN_PATTERN.test(param.expression)) {
            (0, r3_deferred_triggers_1.parseWhenTrigger)(param, bindingParser, prefetchTriggers, errors);
        }
        else if (PREFETCH_ON_PATTERN.test(param.expression)) {
            (0, r3_deferred_triggers_1.parseOnTrigger)(param, prefetchTriggers, errors, placeholder);
        }
        else if (HYDRATE_WHEN_PATTERN.test(param.expression)) {
            (0, r3_deferred_triggers_1.parseWhenTrigger)(param, bindingParser, hydrateTriggers, errors);
        }
        else if (HYDRATE_ON_PATTERN.test(param.expression)) {
            (0, r3_deferred_triggers_1.parseOnTrigger)(param, hydrateTriggers, errors, placeholder);
        }
        else if (HYDRATE_NEVER_PATTERN.test(param.expression)) {
            (0, r3_deferred_triggers_1.parseNeverTrigger)(param, hydrateTriggers, errors);
        }
        else {
            errors.push(new parse_util_1.ParseError(param.sourceSpan, 'Unrecognized trigger'));
        }
    }
    if (hydrateTriggers.never && Object.keys(hydrateTriggers).length > 1) {
        errors.push(new parse_util_1.ParseError(ast.startSourceSpan, 'Cannot specify additional `hydrate` triggers if `hydrate never` is present'));
    }
    return { triggers, prefetchTriggers, hydrateTriggers };
}
