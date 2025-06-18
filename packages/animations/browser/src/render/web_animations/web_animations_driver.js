"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebAnimationsDriver = void 0;
const util_1 = require("../../util");
const shared_1 = require("../shared");
const special_cased_styles_1 = require("../special_cased_styles");
const web_animations_player_1 = require("./web_animations_player");
class WebAnimationsDriver {
    validateStyleProperty(prop) {
        // Perform actual validation in dev mode only, in prod mode this check is a noop.
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            return (0, shared_1.validateStyleProperty)(prop);
        }
        return true;
    }
    validateAnimatableStyleProperty(prop) {
        // Perform actual validation in dev mode only, in prod mode this check is a noop.
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            const cssProp = (0, util_1.camelCaseToDashCase)(prop);
            return (0, shared_1.validateWebAnimatableStyleProperty)(cssProp);
        }
        return true;
    }
    containsElement(elm1, elm2) {
        return (0, shared_1.containsElement)(elm1, elm2);
    }
    getParentElement(element) {
        return (0, shared_1.getParentElement)(element);
    }
    query(element, selector, multi) {
        return (0, shared_1.invokeQuery)(element, selector, multi);
    }
    computeStyle(element, prop, defaultValue) {
        return (0, util_1.computeStyle)(element, prop);
    }
    animate(element, keyframes, duration, delay, easing, previousPlayers = []) {
        const fill = delay == 0 ? 'both' : 'forwards';
        const playerOptions = { duration, delay, fill };
        // we check for this to avoid having a null|undefined value be present
        // for the easing (which results in an error for certain browsers #9752)
        if (easing) {
            playerOptions['easing'] = easing;
        }
        const previousStyles = new Map();
        const previousWebAnimationPlayers = (previousPlayers.filter((player) => player instanceof web_animations_player_1.WebAnimationsPlayer));
        if ((0, util_1.allowPreviousPlayerStylesMerge)(duration, delay)) {
            previousWebAnimationPlayers.forEach((player) => {
                player.currentSnapshot.forEach((val, prop) => previousStyles.set(prop, val));
            });
        }
        let _keyframes = (0, util_1.normalizeKeyframes)(keyframes).map((styles) => new Map(styles));
        _keyframes = (0, util_1.balancePreviousStylesIntoKeyframes)(element, _keyframes, previousStyles);
        const specialStyles = (0, special_cased_styles_1.packageNonAnimatableStyles)(element, _keyframes);
        return new web_animations_player_1.WebAnimationsPlayer(element, _keyframes, playerOptions, specialStyles);
    }
}
exports.WebAnimationsDriver = WebAnimationsDriver;
