"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetMessageIndex = resetMessageIndex;
exports.i18nMsg = i18nMsg;
exports.i18nMsgWithPostprocess = i18nMsgWithPostprocess;
exports.i18nIcuMsg = i18nIcuMsg;
/**
 * Unique message id index that is needed to avoid different i18n vars with the same name to appear
 * in the i18n block while generating an output string (used to verify compiler-generated code).
 */
let msgIndex = 0;
function resetMessageIndex() {
    msgIndex = 0;
}
/**
 * Generate a string that represents expected i18n block content for a simple message.
 */
function i18nMsg(message, placeholders, options, meta) {
    const varName = `$I18N_${msgIndex++}$`;
    const closurePlaceholders = i18nPlaceholdersToString(placeholders);
    const closureOptions = i18nOptionsToString(options);
    const locMessageWithPlaceholders = i18nMsgInsertLocalizePlaceholders(message, placeholders);
    return `
    let ${varName};
    if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        ${i18nMsgClosureMeta(meta)}
        const $MSG_EXTERNAL_${msgIndex}$ = goog.getMsg("${message}"${closurePlaceholders}${closureOptions});
        ${varName} = $MSG_EXTERNAL_${msgIndex}$;
    }
    else {
      ${varName} = $localize \`${i18nMsgLocalizeMeta(meta)}${locMessageWithPlaceholders}\`;
    }`;
}
/**
 * Generate a string that represents expected i18n block content for a message that requires
 * post-processing.
 */
function i18nMsgWithPostprocess(message, placeholders, options, meta, postprocessPlaceholders) {
    const varName = `$I18N_${msgIndex}$`;
    const ppPlaceholders = i18nPlaceholdersToString(postprocessPlaceholders);
    return String.raw `
        ${i18nMsg(message, placeholders, options, meta)}
        ${varName} = $r3$.ɵɵi18nPostprocess($${varName}$${ppPlaceholders});
      `;
}
/**
 * Generates a string that represents expected i18n block content for an ICU.
 */
function i18nIcuMsg(message, placeholders, options) {
    return i18nMsgWithPostprocess(message, [], options, {}, placeholders);
}
/**
 * Convert a set of placeholders to a string (as it's expected from compiler).
 */
function i18nPlaceholdersToString(placeholders) {
    if (placeholders.length === 0)
        return '';
    const result = placeholders.map(([name, identifier]) => `"${name}": ${quotedValue(identifier)}`);
    return `, { ${result.join(',')} }`;
}
/** Convert an object of `goog.getMsg()` options to the expected string. */
function i18nOptionsToString({ original_code: originals = {} } = {}) {
    if (Object.keys(originals).length === 0)
        return '';
    const result = Object.entries(originals).map(([key, value]) => `"${key}": ${quotedValue(value)}`);
    return `, { original_code: {\n${result.join(',\n')}\n} }`;
}
/**
 * Transform a message in a Closure format to a $localize version.
 */
function i18nMsgInsertLocalizePlaceholders(message, placeholders) {
    if (placeholders.length > 0) {
        message = message.replace(/{\$(.*?)}/g, function (_, name) {
            const placeholder = placeholders.find((p) => p[0] === name);
            // e.g. startDivTag -> START_DIV_TAG
            const key = name.replace(/[A-Z]/g, (ch) => '_' + ch).toUpperCase();
            const associated = placeholder.length === 3 ? `@@${placeholder[2]}` : '';
            return '$' + `{${quotedValue(placeholder[1])}}:${key}${associated}:`;
        });
    }
    return message;
}
/**
 * Generate a string that represents expected Closure metadata output comment.
 */
function i18nMsgClosureMeta(meta) {
    if (!meta)
        return '';
    return `
    /**
     * ${meta.desc ? '@desc ' + meta.desc : '@suppress {msgDescriptions}'}
     ${meta.meaning ? '* @meaning ' + meta.meaning : ''}
     */
  `;
}
/**
 * Generate a string that represents expected $localize metadata output.
 */
function i18nMsgLocalizeMeta(meta) {
    if (!meta)
        return '';
    let localizeMeta = '';
    if (meta.meaning)
        localizeMeta += `${meta.meaning}|`;
    if (meta.desc)
        localizeMeta += meta.desc;
    if (meta.id)
        localizeMeta += `@@${meta.id}`;
    return localizeMeta !== '' ? `:${localizeMeta}:` : '';
}
/**
 * Wrap a string into quotes if needed.
 *
 * Note: if `value` starts with `$` it is a special case in tests when ICU reference is used as a
 * placeholder value. Such special cases should not be wrapped in quotes.
 */
function quotedValue(value) {
    return value.startsWith('$') ? value : `"${value.replace(/"/g, '\\"')}"`;
}
