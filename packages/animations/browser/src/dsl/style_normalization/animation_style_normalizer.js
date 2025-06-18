"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoopAnimationStyleNormalizer = exports.AnimationStyleNormalizer = void 0;
class AnimationStyleNormalizer {
}
exports.AnimationStyleNormalizer = AnimationStyleNormalizer;
class NoopAnimationStyleNormalizer {
    normalizePropertyName(propertyName, errors) {
        return propertyName;
    }
    normalizeStyleValue(userProvidedProperty, normalizedProperty, value, errors) {
        return value;
    }
}
exports.NoopAnimationStyleNormalizer = NoopAnimationStyleNormalizer;
