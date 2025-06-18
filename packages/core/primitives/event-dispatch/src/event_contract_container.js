"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
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
exports.EventContractContainer = void 0;
const eventLib = __importStar(require("./event"));
/**
 * Whether the user agent is running on iOS.
 */
const isIos = typeof navigator !== 'undefined' && /iPhone|iPad|iPod/.test(navigator.userAgent);
/**
 * A class representing a container node and all the event handlers
 * installed on it. Used so that handlers can be cleaned up if the
 * container is removed from the contract.
 */
class EventContractContainer {
    /**
     * @param element The container Element.
     */
    constructor(element) {
        this.element = element;
        /**
         * Array of event handlers and their corresponding event types that are
         * installed on this container.
         *
         */
        this.handlerInfos = [];
    }
    /**
     * Installs the provided installer on the element owned by this container,
     * and maintains a reference to resulting handler in order to remove it
     * later if desired.
     */
    addEventListener(eventType, getHandler, passive) {
        // In iOS, event bubbling doesn't happen automatically in any DOM element,
        // unless it has an onclick attribute or DOM event handler attached to it.
        // This breaks JsAction in some cases. See "Making Elements Clickable"
        // section at http://goo.gl/2VoGnB.
        //
        // A workaround for this issue is to change the CSS cursor style to 'pointer'
        // for the container element, which magically turns on event bubbling. This
        // solution is described in the comments section at http://goo.gl/6pEO1z.
        //
        // We use a navigator.userAgent check here as this problem is present both
        // on Mobile Safari and thin WebKit wrappers, such as Chrome for iOS.
        if (isIos) {
            this.element.style.cursor = 'pointer';
        }
        this.handlerInfos.push(eventLib.addEventListener(this.element, eventType, getHandler(this.element), passive));
    }
    /**
     * Removes all the handlers installed on this container.
     */
    cleanUp() {
        for (let i = 0; i < this.handlerInfos.length; i++) {
            eventLib.removeEventListener(this.element, this.handlerInfos[i]);
        }
        this.handlerInfos = [];
    }
}
exports.EventContractContainer = EventContractContainer;
