"use strict";
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
exports.createGoogleGetMsgStatements = createGoogleGetMsgStatements;
exports.serializeI18nMessageForGetMsg = serializeI18nMessageForGetMsg;
const map_util_1 = require("../../../output/map_util");
const o = __importStar(require("../../../output/output_ast"));
const icu_serializer_1 = require("./icu_serializer");
const meta_1 = require("./meta");
const util_1 = require("./util");
/** Closure uses `goog.getMsg(message)` to lookup translations */
const GOOG_GET_MSG = 'goog.getMsg';
/**
 * Generates a `goog.getMsg()` statement and reassignment. The template:
 *
 * ```html
 * <div i18n>Sent from {{ sender }} to <span class="receiver">{{ receiver }}</span></div>
 * ```
 *
 * Generates:
 *
 * ```ts
 * const MSG_FOO = goog.getMsg(
 *   // Message template.
 *   'Sent from {$interpolation} to {$startTagSpan}{$interpolation_1}{$closeTagSpan}.',
 *   // Placeholder values, set to magic strings which get replaced by the Angular runtime.
 *   {
 *     'interpolation': '\uFFFD0\uFFFD',
 *     'startTagSpan': '\uFFFD1\uFFFD',
 *     'interpolation_1': '\uFFFD2\uFFFD',
 *     'closeTagSpan': '\uFFFD3\uFFFD',
 *   },
 *   // Options bag.
 *   {
 *     // Maps each placeholder to the original Angular source code which generates it's value.
 *     original_code: {
 *       'interpolation': '{{ sender }}',
 *       'startTagSpan': '<span class="receiver">',
 *       'interpolation_1': '{{ receiver }}',
 *       'closeTagSpan': '</span>',
 *     },
 *   },
 * );
 * const I18N_0 = MSG_FOO;
 * ```
 */
function createGoogleGetMsgStatements(variable, message, closureVar, placeholderValues) {
    const messageString = serializeI18nMessageForGetMsg(message);
    const args = [o.literal(messageString)];
    if (Object.keys(placeholderValues).length) {
        // Message template parameters containing the magic strings replaced by the Angular runtime with
        // real data, e.g. `{'interpolation': '\uFFFD0\uFFFD'}`.
        args.push((0, map_util_1.mapLiteral)((0, util_1.formatI18nPlaceholderNamesInMap)(placeholderValues, true /* useCamelCase */), true /* quoted */));
        // Message options object, which contains original source code for placeholders (as they are
        // present in a template, e.g.
        // `{original_code: {'interpolation': '{{ name }}', 'startTagSpan': '<span>'}}`.
        args.push((0, map_util_1.mapLiteral)({
            original_code: o.literalMap(Object.keys(placeholderValues).map((param) => ({
                key: (0, util_1.formatI18nPlaceholderName)(param),
                quoted: true,
                value: message.placeholders[param]
                    ? // Get source span for typical placeholder if it exists.
                        o.literal(message.placeholders[param].sourceSpan.toString())
                    : // Otherwise must be an ICU expression, get it's source span.
                        o.literal(message.placeholderToMessage[param].nodes
                            .map((node) => node.sourceSpan.toString())
                            .join('')),
            }))),
        }));
    }
    // /**
    //  * @desc description of message
    //  * @meaning meaning of message
    //  */
    // const MSG_... = goog.getMsg(..);
    // I18N_X = MSG_...;
    const googGetMsgStmt = closureVar.set(o.variable(GOOG_GET_MSG).callFn(args)).toConstDecl();
    googGetMsgStmt.addLeadingComment((0, meta_1.i18nMetaToJSDoc)(message));
    const i18nAssignmentStmt = new o.ExpressionStatement(variable.set(closureVar));
    return [googGetMsgStmt, i18nAssignmentStmt];
}
/**
 * This visitor walks over i18n tree and generates its string representation, including ICUs and
 * placeholders in `{$placeholder}` (for plain messages) or `{PLACEHOLDER}` (inside ICUs) format.
 */
class GetMsgSerializerVisitor {
    formatPh(value) {
        return `{$${(0, util_1.formatI18nPlaceholderName)(value)}}`;
    }
    visitText(text) {
        return text.value;
    }
    visitContainer(container) {
        return container.children.map((child) => child.visit(this)).join('');
    }
    visitIcu(icu) {
        return (0, icu_serializer_1.serializeIcuNode)(icu);
    }
    visitTagPlaceholder(ph) {
        return ph.isVoid
            ? this.formatPh(ph.startName)
            : `${this.formatPh(ph.startName)}${ph.children
                .map((child) => child.visit(this))
                .join('')}${this.formatPh(ph.closeName)}`;
    }
    visitPlaceholder(ph) {
        return this.formatPh(ph.name);
    }
    visitBlockPlaceholder(ph) {
        return `${this.formatPh(ph.startName)}${ph.children
            .map((child) => child.visit(this))
            .join('')}${this.formatPh(ph.closeName)}`;
    }
    visitIcuPlaceholder(ph, context) {
        return this.formatPh(ph.name);
    }
}
const serializerVisitor = new GetMsgSerializerVisitor();
function serializeI18nMessageForGetMsg(message) {
    return message.nodes.map((node) => node.visit(serializerVisitor, null)).join('');
}
