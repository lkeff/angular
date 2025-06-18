"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialCasedStyles = void 0;
exports.packageNonAnimatableStyles = packageNonAnimatableStyles;
const util_1 = require("../util");
/**
 * Returns an instance of `SpecialCasedStyles` if and when any special (non animateable) styles are
 * detected.
 *
 * In CSS there exist properties that cannot be animated within a keyframe animation
 * (whether it be via CSS keyframes or web-animations) and the animation implementation
 * will ignore them. This function is designed to detect those special cased styles and
 * return a container that will be executed at the start and end of the animation.
 *
 * @returns an instance of `SpecialCasedStyles` if any special styles are detected otherwise `null`
 */
function packageNonAnimatableStyles(element, styles) {
    let startStyles = null;
    let endStyles = null;
    if (Array.isArray(styles) && styles.length) {
        startStyles = filterNonAnimatableStyles(styles[0]);
        if (styles.length > 1) {
            endStyles = filterNonAnimatableStyles(styles[styles.length - 1]);
        }
    }
    else if (styles instanceof Map) {
        startStyles = filterNonAnimatableStyles(styles);
    }
    return startStyles || endStyles ? new SpecialCasedStyles(element, startStyles, endStyles) : null;
}
/**
 * Designed to be executed during a keyframe-based animation to apply any special-cased styles.
 *
 * When started (when the `start()` method is run) then the provided `startStyles`
 * will be applied. When finished (when the `finish()` method is called) the
 * `endStyles` will be applied as well any any starting styles. Finally when
 * `destroy()` is called then all styles will be removed.
 */
class SpecialCasedStyles {
    constructor(_element, _startStyles, _endStyles) {
        this._element = _element;
        this._startStyles = _startStyles;
        this._endStyles = _endStyles;
        this._state = 0 /* SpecialCasedStylesState.Pending */;
        let initialStyles = SpecialCasedStyles.initialStylesByElement.get(_element);
        if (!initialStyles) {
            SpecialCasedStyles.initialStylesByElement.set(_element, (initialStyles = new Map()));
        }
        this._initialStyles = initialStyles;
    }
    start() {
        if (this._state < 1 /* SpecialCasedStylesState.Started */) {
            if (this._startStyles) {
                (0, util_1.setStyles)(this._element, this._startStyles, this._initialStyles);
            }
            this._state = 1 /* SpecialCasedStylesState.Started */;
        }
    }
    finish() {
        this.start();
        if (this._state < 2 /* SpecialCasedStylesState.Finished */) {
            (0, util_1.setStyles)(this._element, this._initialStyles);
            if (this._endStyles) {
                (0, util_1.setStyles)(this._element, this._endStyles);
                this._endStyles = null;
            }
            this._state = 1 /* SpecialCasedStylesState.Started */;
        }
    }
    destroy() {
        this.finish();
        if (this._state < 3 /* SpecialCasedStylesState.Destroyed */) {
            SpecialCasedStyles.initialStylesByElement.delete(this._element);
            if (this._startStyles) {
                (0, util_1.eraseStyles)(this._element, this._startStyles);
                this._endStyles = null;
            }
            if (this._endStyles) {
                (0, util_1.eraseStyles)(this._element, this._endStyles);
                this._endStyles = null;
            }
            (0, util_1.setStyles)(this._element, this._initialStyles);
            this._state = 3 /* SpecialCasedStylesState.Destroyed */;
        }
    }
}
exports.SpecialCasedStyles = SpecialCasedStyles;
SpecialCasedStyles.initialStylesByElement = new WeakMap();
function filterNonAnimatableStyles(styles) {
    let result = null;
    styles.forEach((val, prop) => {
        if (isNonAnimatableStyle(prop)) {
            result = result || new Map();
            result.set(prop, val);
        }
    });
    return result;
}
function isNonAnimatableStyle(prop) {
    return prop === 'display' || prop === 'position';
}
