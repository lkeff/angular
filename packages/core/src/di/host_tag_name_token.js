"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HOST_TAG_NAME = void 0;
const errors_1 = require("../errors");
const state_1 = require("../render3/state");
const injection_token_1 = require("./injection_token");
/**
 * A token that can be used to inject the tag name of the host node.
 *
 * @usageNotes
 * ### Injecting a tag name that is known to exist
 * ```ts
 * @Directive()
 * class MyDir {
 *   tagName: string = inject(HOST_TAG_NAME);
 * }
 * ```
 *
 * ### Optionally injecting a tag name
 * ```ts
 * @Directive()
 * class MyDir {
 *   tagName: string | null = inject(HOST_TAG_NAME, {optional: true});
 * }
 * ```
 * @publicApi
 */
exports.HOST_TAG_NAME = new injection_token_1.InjectionToken(ngDevMode ? 'HOST_TAG_NAME' : '');
// HOST_TAG_NAME should be resolved at the current node, similar to e.g. ElementRef,
// so we manually specify __NG_ELEMENT_ID__ here, instead of using a factory.
// tslint:disable-next-line:no-toplevel-property-access
exports.HOST_TAG_NAME.__NG_ELEMENT_ID__ = (flags) => {
    const tNode = (0, state_1.getCurrentTNode)();
    if (tNode === null) {
        throw new errors_1.RuntimeError(204 /* RuntimeErrorCode.INVALID_INJECTION_TOKEN */, ngDevMode &&
            'HOST_TAG_NAME can only be injected in directives and components ' +
                'during construction time (in a class constructor or as a class field initializer)');
    }
    if (tNode.type & 2 /* TNodeType.Element */) {
        return tNode.value;
    }
    if (flags & 8 /* InternalInjectFlags.Optional */) {
        return null;
    }
    throw new errors_1.RuntimeError(204 /* RuntimeErrorCode.INVALID_INJECTION_TOKEN */, ngDevMode &&
        `HOST_TAG_NAME was used on ${getDevModeNodeName(tNode)} which doesn't have an underlying element in the DOM. ` +
            `This is invalid, and so the dependency should be marked as optional.`);
};
function getDevModeNodeName(tNode) {
    if (tNode.type & 8 /* TNodeType.ElementContainer */) {
        return 'an <ng-container>';
    }
    else if (tNode.type & 4 /* TNodeType.Container */) {
        return 'an <ng-template>';
    }
    else if (tNode.type & 128 /* TNodeType.LetDeclaration */) {
        return 'an @let declaration';
    }
    else {
        return 'a node';
    }
}
