"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleDomEventsPlugin = void 0;
exports.getRendererFactory2 = getRendererFactory2;
const platform_id_1 = require("@angular/common/src/platform_id");
const ng_zone_1 = require("../../src/zone/ng_zone");
const platform_browser_1 = require("@angular/platform-browser");
const event_manager_1 = require("@angular/platform-browser/src/dom/events/event_manager");
class SimpleDomEventsPlugin extends event_manager_1.EventManagerPlugin {
    constructor(doc) {
        super(doc);
    }
    supports(eventName) {
        return true;
    }
    addEventListener(element, eventName, handler, options) {
        let callback = handler;
        element.addEventListener(eventName, callback, options);
        return () => this.removeEventListener(element, eventName, callback, options);
    }
    removeEventListener(target, eventName, callback, options) {
        return target.removeEventListener.apply(target, [eventName, callback, false]);
    }
}
exports.SimpleDomEventsPlugin = SimpleDomEventsPlugin;
function getRendererFactory2(document) {
    const fakeNgZone = new ng_zone_1.NoopNgZone();
    const eventManager = new platform_browser_1.EventManager([new SimpleDomEventsPlugin(document)], fakeNgZone);
    const appId = 'appid';
    const rendererFactory = new platform_browser_1.ɵDomRendererFactory2(eventManager, new platform_browser_1.ɵSharedStylesHost(document, appId), appId, true, document, isNode ? platform_id_1.PLATFORM_SERVER_ID : platform_id_1.PLATFORM_BROWSER_ID, fakeNgZone);
    const origCreateRenderer = rendererFactory.createRenderer;
    rendererFactory.createRenderer = function (element, type) {
        const renderer = origCreateRenderer.call(this, element, type);
        renderer.destroyNode = () => { };
        return renderer;
    };
    return rendererFactory;
}
