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
exports.I18N_ICU_VAR_PREFIX = exports.I18N_ATTR_PREFIX = exports.I18N_ATTR = void 0;
exports.isI18nAttribute = isI18nAttribute;
exports.hasI18nAttrs = hasI18nAttrs;
exports.icuFromI18nMessage = icuFromI18nMessage;
exports.placeholdersToParams = placeholdersToParams;
exports.formatI18nPlaceholderNamesInMap = formatI18nPlaceholderNamesInMap;
exports.formatI18nPlaceholderName = formatI18nPlaceholderName;
const xmb_1 = require("../../../i18n/serializers/xmb");
const o = __importStar(require("../../../output/output_ast"));
/** Name of the i18n attributes **/
exports.I18N_ATTR = 'i18n';
exports.I18N_ATTR_PREFIX = 'i18n-';
/** Prefix of var expressions used in ICUs */
exports.I18N_ICU_VAR_PREFIX = 'VAR_';
function isI18nAttribute(name) {
    return name === exports.I18N_ATTR || name.startsWith(exports.I18N_ATTR_PREFIX);
}
function hasI18nAttrs(node) {
    return node.attrs.some((attr) => isI18nAttribute(attr.name));
}
function icuFromI18nMessage(message) {
    return message.nodes[0];
}
function placeholdersToParams(placeholders) {
    const params = {};
    placeholders.forEach((values, key) => {
        params[key] = o.literal(values.length > 1 ? `[${values.join('|')}]` : values[0]);
    });
    return params;
}
/**
 * Format the placeholder names in a map of placeholders to expressions.
 *
 * The placeholder names are converted from "internal" format (e.g. `START_TAG_DIV_1`) to "external"
 * format (e.g. `startTagDiv_1`).
 *
 * @param params A map of placeholder names to expressions.
 * @param useCamelCase whether to camelCase the placeholder name when formatting.
 * @returns A new map of formatted placeholder names to expressions.
 */
function formatI18nPlaceholderNamesInMap(params = {}, useCamelCase) {
    const _params = {};
    if (params && Object.keys(params).length) {
        Object.keys(params).forEach((key) => (_params[formatI18nPlaceholderName(key, useCamelCase)] = params[key]));
    }
    return _params;
}
/**
 * Converts internal placeholder names to public-facing format
 * (for example to use in goog.getMsg call).
 * Example: `START_TAG_DIV_1` is converted to `startTagDiv_1`.
 *
 * @param name The placeholder name that should be formatted
 * @returns Formatted placeholder name
 */
function formatI18nPlaceholderName(name, useCamelCase = true) {
    const publicName = (0, xmb_1.toPublicName)(name);
    if (!useCamelCase) {
        return publicName;
    }
    const chunks = publicName.split('_');
    if (chunks.length === 1) {
        // if no "_" found - just lowercase the value
        return name.toLowerCase();
    }
    let postfix;
    // eject last element if it's a number
    if (/^\d+$/.test(chunks[chunks.length - 1])) {
        postfix = chunks.pop();
    }
    let raw = chunks.shift().toLowerCase();
    if (chunks.length) {
        raw += chunks.map((c) => c.charAt(0).toUpperCase() + c.slice(1).toLowerCase()).join('');
    }
    return postfix ? `${raw}_${postfix}` : raw;
}
