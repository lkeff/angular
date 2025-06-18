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
exports.createLocalizeStatements = createLocalizeStatements;
exports.serializeI18nMessageForLocalize = serializeI18nMessageForLocalize;
const o = __importStar(require("../../../output/output_ast"));
const parse_util_1 = require("../../../parse_util");
const icu_serializer_1 = require("./icu_serializer");
const util_1 = require("./util");
function createLocalizeStatements(variable, message, params) {
    const { messageParts, placeHolders } = serializeI18nMessageForLocalize(message);
    const sourceSpan = getSourceSpan(message);
    const expressions = placeHolders.map((ph) => params[ph.text]);
    const localizedString = o.localizedString(message, messageParts, placeHolders, expressions, sourceSpan);
    const variableInitialization = variable.set(localizedString);
    return [new o.ExpressionStatement(variableInitialization)];
}
/**
 * This visitor walks over an i18n tree, capturing literal strings and placeholders.
 *
 * The result can be used for generating the `$localize` tagged template literals.
 */
class LocalizeSerializerVisitor {
    constructor(placeholderToMessage, pieces) {
        this.placeholderToMessage = placeholderToMessage;
        this.pieces = pieces;
    }
    visitText(text) {
        if (this.pieces[this.pieces.length - 1] instanceof o.LiteralPiece) {
            // Two literal pieces in a row means that there was some comment node in-between.
            this.pieces[this.pieces.length - 1].text += text.value;
        }
        else {
            const sourceSpan = new parse_util_1.ParseSourceSpan(text.sourceSpan.fullStart, text.sourceSpan.end, text.sourceSpan.fullStart, text.sourceSpan.details);
            this.pieces.push(new o.LiteralPiece(text.value, sourceSpan));
        }
    }
    visitContainer(container) {
        container.children.forEach((child) => child.visit(this));
    }
    visitIcu(icu) {
        this.pieces.push(new o.LiteralPiece((0, icu_serializer_1.serializeIcuNode)(icu), icu.sourceSpan));
    }
    visitTagPlaceholder(ph) {
        var _a, _b;
        this.pieces.push(this.createPlaceholderPiece(ph.startName, (_a = ph.startSourceSpan) !== null && _a !== void 0 ? _a : ph.sourceSpan));
        if (!ph.isVoid) {
            ph.children.forEach((child) => child.visit(this));
            this.pieces.push(this.createPlaceholderPiece(ph.closeName, (_b = ph.endSourceSpan) !== null && _b !== void 0 ? _b : ph.sourceSpan));
        }
    }
    visitPlaceholder(ph) {
        this.pieces.push(this.createPlaceholderPiece(ph.name, ph.sourceSpan));
    }
    visitBlockPlaceholder(ph) {
        var _a, _b;
        this.pieces.push(this.createPlaceholderPiece(ph.startName, (_a = ph.startSourceSpan) !== null && _a !== void 0 ? _a : ph.sourceSpan));
        ph.children.forEach((child) => child.visit(this));
        this.pieces.push(this.createPlaceholderPiece(ph.closeName, (_b = ph.endSourceSpan) !== null && _b !== void 0 ? _b : ph.sourceSpan));
    }
    visitIcuPlaceholder(ph) {
        this.pieces.push(this.createPlaceholderPiece(ph.name, ph.sourceSpan, this.placeholderToMessage[ph.name]));
    }
    createPlaceholderPiece(name, sourceSpan, associatedMessage) {
        return new o.PlaceholderPiece((0, util_1.formatI18nPlaceholderName)(name, /* useCamelCase */ false), sourceSpan, associatedMessage);
    }
}
/**
 * Serialize an i18n message into two arrays: messageParts and placeholders.
 *
 * These arrays will be used to generate `$localize` tagged template literals.
 *
 * @param message The message to be serialized.
 * @returns an object containing the messageParts and placeholders.
 */
function serializeI18nMessageForLocalize(message) {
    const pieces = [];
    const serializerVisitor = new LocalizeSerializerVisitor(message.placeholderToMessage, pieces);
    message.nodes.forEach((node) => node.visit(serializerVisitor));
    return processMessagePieces(pieces);
}
function getSourceSpan(message) {
    const startNode = message.nodes[0];
    const endNode = message.nodes[message.nodes.length - 1];
    return new parse_util_1.ParseSourceSpan(startNode.sourceSpan.fullStart, endNode.sourceSpan.end, startNode.sourceSpan.fullStart, startNode.sourceSpan.details);
}
/**
 * Convert the list of serialized MessagePieces into two arrays.
 *
 * One contains the literal string pieces and the other the placeholders that will be replaced by
 * expressions when rendering `$localize` tagged template literals.
 *
 * @param pieces The pieces to process.
 * @returns an object containing the messageParts and placeholders.
 */
function processMessagePieces(pieces) {
    const messageParts = [];
    const placeHolders = [];
    if (pieces[0] instanceof o.PlaceholderPiece) {
        // The first piece was a placeholder so we need to add an initial empty message part.
        messageParts.push(createEmptyMessagePart(pieces[0].sourceSpan.start));
    }
    for (let i = 0; i < pieces.length; i++) {
        const part = pieces[i];
        if (part instanceof o.LiteralPiece) {
            messageParts.push(part);
        }
        else {
            placeHolders.push(part);
            if (pieces[i - 1] instanceof o.PlaceholderPiece) {
                // There were two placeholders in a row, so we need to add an empty message part.
                messageParts.push(createEmptyMessagePart(pieces[i - 1].sourceSpan.end));
            }
        }
    }
    if (pieces[pieces.length - 1] instanceof o.PlaceholderPiece) {
        // The last piece was a placeholder so we need to add a final empty message part.
        messageParts.push(createEmptyMessagePart(pieces[pieces.length - 1].sourceSpan.end));
    }
    return { messageParts, placeHolders };
}
function createEmptyMessagePart(location) {
    return new o.LiteralPiece('', new parse_util_1.ParseSourceSpan(location, location));
}
