"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineAnimationEngine = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const animations_1 = require("../../../src/animations");
const animation_ast_builder_1 = require("../dsl/animation_ast_builder");
const animation_timeline_builder_1 = require("../dsl/animation_timeline_builder");
const element_instruction_map_1 = require("../dsl/element_instruction_map");
const error_helpers_1 = require("../error_helpers");
const util_1 = require("../util");
const warning_helpers_1 = require("../warning_helpers");
const shared_1 = require("./shared");
const EMPTY_INSTRUCTION_MAP = new element_instruction_map_1.ElementInstructionMap();
class TimelineAnimationEngine {
    constructor(bodyNode, _driver, _normalizer) {
        this.bodyNode = bodyNode;
        this._driver = _driver;
        this._normalizer = _normalizer;
        this._animations = new Map();
        this._playersById = new Map();
        this.players = [];
    }
    register(id, metadata) {
        const errors = [];
        const warnings = [];
        const ast = (0, animation_ast_builder_1.buildAnimationAst)(this._driver, metadata, errors, warnings);
        if (errors.length) {
            throw (0, error_helpers_1.registerFailed)(errors);
        }
        else {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                if (warnings.length) {
                    (0, warning_helpers_1.warnRegister)(warnings);
                }
            }
            this._animations.set(id, ast);
        }
    }
    _buildPlayer(i, preStyles, postStyles) {
        const element = i.element;
        const keyframes = (0, shared_1.normalizeKeyframes)(this._normalizer, i.keyframes, preStyles, postStyles);
        return this._driver.animate(element, keyframes, i.duration, i.delay, i.easing, [], true);
    }
    create(id, element, options = {}) {
        const errors = [];
        const ast = this._animations.get(id);
        let instructions;
        const autoStylesMap = new Map();
        if (ast) {
            instructions = (0, animation_timeline_builder_1.buildAnimationTimelines)(this._driver, element, ast, util_1.ENTER_CLASSNAME, util_1.LEAVE_CLASSNAME, new Map(), new Map(), options, EMPTY_INSTRUCTION_MAP, errors);
            instructions.forEach((inst) => {
                const styles = (0, shared_1.getOrSetDefaultValue)(autoStylesMap, inst.element, new Map());
                inst.postStyleProps.forEach((prop) => styles.set(prop, null));
            });
        }
        else {
            errors.push((0, error_helpers_1.missingOrDestroyedAnimation)());
            instructions = [];
        }
        if (errors.length) {
            throw (0, error_helpers_1.createAnimationFailed)(errors);
        }
        autoStylesMap.forEach((styles, element) => {
            styles.forEach((_, prop) => {
                styles.set(prop, this._driver.computeStyle(element, prop, animations_1.AUTO_STYLE));
            });
        });
        const players = instructions.map((i) => {
            const styles = autoStylesMap.get(i.element);
            return this._buildPlayer(i, new Map(), styles);
        });
        const player = (0, shared_1.optimizeGroupPlayer)(players);
        this._playersById.set(id, player);
        player.onDestroy(() => this.destroy(id));
        this.players.push(player);
        return player;
    }
    destroy(id) {
        const player = this._getPlayer(id);
        player.destroy();
        this._playersById.delete(id);
        const index = this.players.indexOf(player);
        if (index >= 0) {
            this.players.splice(index, 1);
        }
    }
    _getPlayer(id) {
        const player = this._playersById.get(id);
        if (!player) {
            throw (0, error_helpers_1.missingPlayer)(id);
        }
        return player;
    }
    listen(id, element, eventName, callback) {
        // triggerName, fromState, toState are all ignored for timeline animations
        const baseEvent = (0, shared_1.makeAnimationEvent)(element, '', '', '');
        (0, shared_1.listenOnPlayer)(this._getPlayer(id), eventName, baseEvent, callback);
        return () => { };
    }
    command(id, element, command, args) {
        if (command == 'register') {
            this.register(id, args[0]);
            return;
        }
        if (command == 'create') {
            const options = (args[0] || {});
            this.create(id, element, options);
            return;
        }
        const player = this._getPlayer(id);
        switch (command) {
            case 'play':
                player.play();
                break;
            case 'pause':
                player.pause();
                break;
            case 'reset':
                player.reset();
                break;
            case 'restart':
                player.restart();
                break;
            case 'finish':
                player.finish();
                break;
            case 'init':
                player.init();
                break;
            case 'setPosition':
                player.setPosition(parseFloat(args[0]));
                break;
            case 'destroy':
                this.destroy(id);
                break;
        }
    }
}
exports.TimelineAnimationEngine = TimelineAnimationEngine;
