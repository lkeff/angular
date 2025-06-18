"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebAnimationsStyleNormalizer = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const error_helpers_1 = require("../../error_helpers");
const util_1 = require("../../util");
const animation_style_normalizer_1 = require("./animation_style_normalizer");
const DIMENSIONAL_PROP_SET = new Set([
    'width',
    'height',
    'minWidth',
    'minHeight',
    'maxWidth',
    'maxHeight',
    'left',
    'top',
    'bottom',
    'right',
    'fontSize',
    'outlineWidth',
    'outlineOffset',
    'paddingTop',
    'paddingLeft',
    'paddingBottom',
    'paddingRight',
    'marginTop',
    'marginLeft',
    'marginBottom',
    'marginRight',
    'borderRadius',
    'borderWidth',
    'borderTopWidth',
    'borderLeftWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'textIndent',
    'perspective',
]);
class WebAnimationsStyleNormalizer extends animation_style_normalizer_1.AnimationStyleNormalizer {
    normalizePropertyName(propertyName, errors) {
        return (0, util_1.dashCaseToCamelCase)(propertyName);
    }
    normalizeStyleValue(userProvidedProperty, normalizedProperty, value, errors) {
        let unit = '';
        const strVal = value.toString().trim();
        if (DIMENSIONAL_PROP_SET.has(normalizedProperty) && value !== 0 && value !== '0') {
            if (typeof value === 'number') {
                unit = 'px';
            }
            else {
                const valAndSuffixMatch = value.match(/^[+-]?[\d\.]+([a-z]*)$/);
                if (valAndSuffixMatch && valAndSuffixMatch[1].length == 0) {
                    errors.push((0, error_helpers_1.invalidCssUnitValue)(userProvidedProperty, value));
                }
            }
        }
        return strVal + unit;
    }
}
exports.WebAnimationsStyleNormalizer = WebAnimationsStyleNormalizer;
