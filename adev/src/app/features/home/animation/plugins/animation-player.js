"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimationPlayer = void 0;
const animation_player_component_1 = require("./animation-player.component");
class AnimationPlayer {
    /**
     * USED FOR ANIMATION DEVELOPMENT.
     * Remove imports to this file before shipping the animation.
     *
     * Animation player.
     *
     * @param hostVcr VCR of the animation host component.
     * @param alignment Alignment of the player. Default: `center`
     */
    constructor(hostVcr, alignment) {
        this.hostVcr = hostVcr;
        this.alignment = alignment;
    }
    init(animation) {
        this.cmpRef = this.hostVcr.createComponent(animation_player_component_1.AnimationPlayerComponent);
        this.cmpRef.instance.animation.set(animation);
        this.cmpRef.instance.alignment.set(this.alignment || 'center');
    }
    destroy() {
        var _a;
        (_a = this.cmpRef) === null || _a === void 0 ? void 0 : _a.destroy();
    }
}
exports.AnimationPlayer = AnimationPlayer;
