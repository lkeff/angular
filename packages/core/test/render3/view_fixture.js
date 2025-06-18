"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewFixture = void 0;
const browser_util_1 = require("@angular/platform-browser/testing/src/browser_util");
const definition_1 = require("../../src/render3/definition");
const change_detection_1 = require("../../src/render3/instructions/change_detection");
const render_1 = require("../../src/render3/instructions/render");
const view_1 = require("../../src/render3/interfaces/view");
const state_1 = require("../../src/render3/state");
const noop_1 = require("../../src/util/noop");
const imported_renderer2_1 = require("./imported_renderer2");
const tnode_manipulation_1 = require("../../src/render3/tnode_manipulation");
const construction_1 = require("../../src/render3/view/construction");
/**
 * Fixture useful for testing operations which need `LView` / `TView`
 */
class ViewFixture {
    /**
     * Clean up the `LFrame` stack between tests.
     */
    static cleanUp() {
        while (!(0, state_1.specOnlyIsInstructionStateEmpty)()) {
            (0, state_1.leaveView)();
        }
    }
    constructor({ create, update, decls, vars, consts, context, directives, sanitizer, } = {}) {
        this.context = context;
        this.createFn = create;
        this.updateFn = update;
        const document = ((typeof global == 'object' && global) || window).document;
        const rendererFactory = (0, imported_renderer2_1.getRendererFactory2)(document);
        const hostRenderer = rendererFactory.createRenderer(null, null);
        this.host = hostRenderer.createElement('host-element');
        const hostTView = (0, construction_1.createTView)(0 /* TViewType.Root */, null, null, 1, 0, null, null, null, null, null, null);
        const hostLView = (0, construction_1.createLView)(null, hostTView, {}, 16 /* LViewFlags.CheckAlways */ | 512 /* LViewFlags.IsRoot */, null, null, {
            rendererFactory,
            sanitizer: sanitizer || null,
            changeDetectionScheduler: null,
            ngReflect: false,
        }, hostRenderer, null, null, null);
        let template = noop_1.noop;
        if (create) {
            // If `create` function is provided - assemble a template function
            // based on it and pass to the `createTView` function to store in
            // `tView` for future use. The update function would be stored and
            // invoked separately.
            template = (rf, ctx) => {
                if (rf & 1 /* RenderFlags.Create */) {
                    create();
                }
            };
        }
        this.tView = (0, construction_1.createTView)(1 /* TViewType.Component */, null, template, decls || 0, vars || 0, directives ? toDefs(directives, (dir) => (0, definition_1.extractDirectiveDef)(dir)) : null, null, null, null, consts || null, null);
        const hostTNode = (0, tnode_manipulation_1.createTNode)(hostTView, null, 2 /* TNodeType.Element */, 0, 'host-element', null);
        // Store TNode at the first slot right after the header part
        hostTView.data[view_1.HEADER_OFFSET] = hostTNode;
        this.lView = (0, construction_1.createLView)(hostLView, this.tView, context || {}, 16 /* LViewFlags.CheckAlways */, this.host, hostTNode, null, hostRenderer, null, null, null);
        if (this.createFn) {
            (0, render_1.renderView)(this.tView, this.lView, this.context);
        }
    }
    get html() {
        return toHtml(this.host.firstChild);
    }
    /**
     * Invokes an update block function, which can either be provided during
     * the `ViewFixture` initialization or as an argument.
     *
     * @param updateFn An update block function to invoke.
     */
    update(updateFn) {
        updateFn || (updateFn = this.updateFn);
        if (!updateFn) {
            throw new Error('The `ViewFixture.update` was invoked, but there was no `update` function ' +
                'provided during the `ViewFixture` instantiation or specified as an argument ' +
                'in this call.');
        }
        (0, change_detection_1.refreshView)(this.tView, this.lView, updateFn, this.context);
    }
    /**
     * If you use `ViewFixture` and `enter()`, please add `afterEach(ViewFixture.cleanup);` to ensure
     * that he global `LFrame` stack gets cleaned up between the tests.
     */
    enterView() {
        (0, state_1.enterView)(this.lView);
    }
    leaveView() {
        (0, state_1.leaveView)();
    }
    apply(fn) {
        this.enterView();
        try {
            fn();
        }
        finally {
            this.leaveView();
        }
    }
}
exports.ViewFixture = ViewFixture;
function toDefs(types, mapFn) {
    if (!types)
        return null;
    if (typeof types == 'function') {
        types = types();
    }
    return types.map(mapFn);
}
function toHtml(element, keepNgReflect = false) {
    if (element) {
        let html = (0, browser_util_1.stringifyElement)(element);
        if (!keepNgReflect) {
            html = html
                .replace(/\sng-reflect-\S*="[^"]*"/g, '')
                .replace(/<!--bindings=\{(\W.*\W\s*)?\}-->/g, '');
        }
        html = html
            .replace(/^<div host="">(.*)<\/div>$/, '$1')
            .replace(/^<div fixture="mark">(.*)<\/div>$/, '$1')
            .replace(/^<div host="mark">(.*)<\/div>$/, '$1')
            .replace(' style=""', '')
            .replace(/<!--container-->/g, '')
            .replace(/<!--ng-container-->/g, '');
        return html;
    }
    else {
        return '';
    }
}
