"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimationRenderer = exports.BaseAnimationRenderer = void 0;
const ANIMATION_PREFIX = '@';
const DISABLE_ANIMATIONS_FLAG = '@.disabled';
const core_1 = require("@angular/core");
class BaseAnimationRenderer {
    constructor(namespaceId, delegate, engine, _onDestroy) {
        this.namespaceId = namespaceId;
        this.delegate = delegate;
        this.engine = engine;
        this._onDestroy = _onDestroy;
        // We need to explicitly type this property because of an api-extractor bug
        // See https://github.com/microsoft/rushstack/issues/4390
        this.ɵtype = core_1.ɵAnimationRendererType.Regular;
    }
    get data() {
        return this.delegate.data;
    }
    destroyNode(node) {
        var _a, _b;
        (_b = (_a = this.delegate).destroyNode) === null || _b === void 0 ? void 0 : _b.call(_a, node);
    }
    destroy() {
        var _a;
        this.engine.destroy(this.namespaceId, this.delegate);
        this.engine.afterFlushAnimationsDone(() => {
            // Call the renderer destroy method after the animations has finished as otherwise
            // styles will be removed too early which will cause an unstyled animation.
            queueMicrotask(() => {
                this.delegate.destroy();
            });
        });
        (_a = this._onDestroy) === null || _a === void 0 ? void 0 : _a.call(this);
    }
    createElement(name, namespace) {
        return this.delegate.createElement(name, namespace);
    }
    createComment(value) {
        return this.delegate.createComment(value);
    }
    createText(value) {
        return this.delegate.createText(value);
    }
    appendChild(parent, newChild) {
        this.delegate.appendChild(parent, newChild);
        this.engine.onInsert(this.namespaceId, newChild, parent, false);
    }
    insertBefore(parent, newChild, refChild, isMove = true) {
        this.delegate.insertBefore(parent, newChild, refChild);
        // If `isMove` true than we should animate this insert.
        this.engine.onInsert(this.namespaceId, newChild, parent, isMove);
    }
    removeChild(parent, oldChild, isHostElement) {
        // Prior to the changes in #57203, this method wasn't being called at all by `core` if the child
        // doesn't have a parent. There appears to be some animation-specific downstream logic that
        // depends on the null check happening before the animation engine. This check keeps the old
        // behavior while allowing `core` to not have to check for the parent element anymore.
        if (this.parentNode(oldChild)) {
            this.engine.onRemove(this.namespaceId, oldChild, this.delegate);
        }
    }
    selectRootElement(selectorOrNode, preserveContent) {
        return this.delegate.selectRootElement(selectorOrNode, preserveContent);
    }
    parentNode(node) {
        return this.delegate.parentNode(node);
    }
    nextSibling(node) {
        return this.delegate.nextSibling(node);
    }
    setAttribute(el, name, value, namespace) {
        this.delegate.setAttribute(el, name, value, namespace);
    }
    removeAttribute(el, name, namespace) {
        this.delegate.removeAttribute(el, name, namespace);
    }
    addClass(el, name) {
        this.delegate.addClass(el, name);
    }
    removeClass(el, name) {
        this.delegate.removeClass(el, name);
    }
    setStyle(el, style, value, flags) {
        this.delegate.setStyle(el, style, value, flags);
    }
    removeStyle(el, style, flags) {
        this.delegate.removeStyle(el, style, flags);
    }
    setProperty(el, name, value) {
        if (name.charAt(0) == ANIMATION_PREFIX && name == DISABLE_ANIMATIONS_FLAG) {
            this.disableAnimations(el, !!value);
        }
        else {
            this.delegate.setProperty(el, name, value);
        }
    }
    setValue(node, value) {
        this.delegate.setValue(node, value);
    }
    listen(target, eventName, callback, options) {
        return this.delegate.listen(target, eventName, callback, options);
    }
    disableAnimations(element, value) {
        this.engine.disableAnimations(element, value);
    }
}
exports.BaseAnimationRenderer = BaseAnimationRenderer;
class AnimationRenderer extends BaseAnimationRenderer {
    constructor(factory, namespaceId, delegate, engine, onDestroy) {
        super(namespaceId, delegate, engine, onDestroy);
        this.factory = factory;
        this.namespaceId = namespaceId;
    }
    setProperty(el, name, value) {
        if (name.charAt(0) == ANIMATION_PREFIX) {
            if (name.charAt(1) == '.' && name == DISABLE_ANIMATIONS_FLAG) {
                value = value === undefined ? true : !!value;
                this.disableAnimations(el, value);
            }
            else {
                this.engine.process(this.namespaceId, el, name.slice(1), value);
            }
        }
        else {
            this.delegate.setProperty(el, name, value);
        }
    }
    listen(target, eventName, callback, options) {
        if (eventName.charAt(0) == ANIMATION_PREFIX) {
            const element = resolveElementFromTarget(target);
            let name = eventName.slice(1);
            let phase = '';
            // @listener.phase is for trigger animation callbacks
            // @@listener is for animation builder callbacks
            if (name.charAt(0) != ANIMATION_PREFIX) {
                [name, phase] = parseTriggerCallbackName(name);
            }
            return this.engine.listen(this.namespaceId, element, name, phase, (event) => {
                const countId = event['_data'] || -1;
                this.factory.scheduleListenerCallback(countId, callback, event);
            });
        }
        return this.delegate.listen(target, eventName, callback, options);
    }
}
exports.AnimationRenderer = AnimationRenderer;
function resolveElementFromTarget(target) {
    switch (target) {
        case 'body':
            return document.body;
        case 'document':
            return document;
        case 'window':
            return window;
        default:
            return target;
    }
}
function parseTriggerCallbackName(triggerName) {
    const dotIndex = triggerName.indexOf('.');
    const trigger = triggerName.substring(0, dotIndex);
    const phase = triggerName.slice(dotIndex + 1);
    return [trigger, phase];
}
