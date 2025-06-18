"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withBody = withBody;
exports.withHead = withHead;
exports.ensureDocument = ensureDocument;
exports.cleanupDocument = cleanupDocument;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const core_1 = require("@angular/core");
/**
 * Wraps a function in a new function which sets up document and HTML for running a test.
 *
 * This function wraps an existing testing function. The wrapper adds HTML to the `body` element of
 * the `document` and subsequently tears it down.
 *
 * This function can be used with `async await` and `Promise`s. If the wrapped function returns a
 * promise (or is `async`) then the teardown is delayed until that `Promise` is resolved.
 *
 * In the NodeJS environment this function detects if `document` is present and if not, it creates
 * one by loading `domino` and installing it.
 *
 * Example:
 *
 * ```ts
 * describe('something', () => {
 *   it('should do something', withBody('<app-root></app-root>', async () => {
 *     const fixture = TestBed.createComponent(MyApp);
 *     fixture.detectChanges();
 *     expect(fixture.nativeElement.textContent).toEqual('Hello World!');
 *   }));
 * });
 * ```
 *
 * @param html HTML which should be inserted into the `body` of the `document`.
 * @param blockFn function to wrap. The function can return promise or be `async`.
 */
function withBody(html, blockFn) {
    return wrapTestFn(() => document.body, html, blockFn);
}
/**
 * Wraps a function in a new function which sets up document and HTML for running a test.
 *
 * This function wraps an existing testing function. The wrapper adds HTML to the `head` element of
 * the `document` and subsequently tears it down.
 *
 * This function can be used with `async await` and `Promise`s. If the wrapped function returns a
 * promise (or is `async`) then the teardown is delayed until that `Promise` is resolved.
 *
 * In the NodeJS environment this function detects if `document` is present and if not, it creates
 * one by loading `domino` and installing it.
 *
 * Example:
 *
 * ```ts
 * describe('something', () => {
 *   it('should do something', withHead('<link rel="preconnect" href="...">', async () => {
 *     // ...
 *   }));
 * });
 * ```
 *
 * @param html HTML which should be inserted into the `head` of the `document`.
 * @param blockFn function to wrap. The function can return promise or be `async`.
 */
function withHead(html, blockFn) {
    return wrapTestFn(() => document.head, html, blockFn);
}
/**
 * Wraps provided function (which typically contains the code of a test) into a new function that
 * performs the necessary setup of the environment.
 */
function wrapTestFn(elementGetter, html, blockFn) {
    return () => {
        elementGetter().innerHTML = html;
        return blockFn();
    };
}
let savedDocument = undefined;
let savedRequestAnimationFrame = undefined;
let savedNode = undefined;
let requestAnimationFrameCount = 0;
let domino = undefined;
function loadDominoOrNull() {
    return __awaiter(this, void 0, void 0, function* () {
        if (domino !== undefined) {
            return domino;
        }
        try {
            return (domino = (yield Promise.resolve().then(() => __importStar(require('../../../platform-server/src/bundled-domino')))).default);
        }
        catch (_a) {
            return (domino = null);
        }
    });
}
/**
 * Ensure that global has `Document` if we are in node.js
 */
function ensureDocument() {
    return __awaiter(this, void 0, void 0, function* () {
        if (global.isBrowser) {
            return;
        }
        const domino = yield loadDominoOrNull();
        if (domino === null) {
            return;
        }
        // we are in node.js.
        const window = domino.createWindow('', 'http://localhost');
        savedDocument = global.document;
        global.window = window;
        global.document = window.document;
        savedNode = global.Node;
        // Domino types do not type `impl`, but it's a documented field.
        // See: https://www.npmjs.com/package/domino#usage.
        global.Event = domino.impl.Event;
        global.Node = domino.impl.Node;
        savedRequestAnimationFrame = global.requestAnimationFrame;
        global.requestAnimationFrame = function (cb) {
            setImmediate(cb);
            return requestAnimationFrameCount++;
        };
    });
}
/**
 * Restore the state of `Document` between tests.
 * @publicApi
 */
function cleanupDocument() {
    if (savedDocument) {
        global.document = savedDocument;
        global.window = undefined;
        savedDocument = undefined;
    }
    if (savedNode) {
        global.Node = savedNode;
        savedNode = undefined;
    }
    if (savedRequestAnimationFrame) {
        global.requestAnimationFrame = savedRequestAnimationFrame;
        savedRequestAnimationFrame = undefined;
    }
}
if (typeof beforeEach == 'function')
    beforeEach(ensureDocument);
if (typeof afterEach == 'function')
    afterEach(cleanupDocument);
if (typeof afterEach === 'function')
    afterEach(core_1.ɵresetJitOptions);
