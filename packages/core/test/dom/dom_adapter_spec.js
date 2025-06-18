"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@angular/common");
const browser_util_1 = require("@angular/platform-browser/testing/src/browser_util");
describe('dom adapter', () => {
    let defaultDoc;
    beforeEach(() => {
        defaultDoc = (0, common_1.ɵgetDOM)().supportsDOMEvents ? document : (0, common_1.ɵgetDOM)().createHtmlDocument();
    });
    it('should be able to create text nodes and use them with the other APIs', () => {
        const t = (0, common_1.ɵgetDOM)().getDefaultDocument().createTextNode('hello');
        expect((0, browser_util_1.isTextNode)(t)).toBe(true);
        const d = (0, common_1.ɵgetDOM)().createElement('div');
        d.appendChild(t);
        expect(d.innerHTML).toEqual('hello');
    });
    it('should set className via the class attribute', () => {
        const d = (0, common_1.ɵgetDOM)().createElement('div');
        d.setAttribute('class', 'class1');
        expect(d.className).toEqual('class1');
    });
    it('should allow to remove nodes without parents', () => {
        const d = (0, common_1.ɵgetDOM)().createElement('div');
        expect(() => (0, common_1.ɵgetDOM)().remove(d)).not.toThrow();
    });
    if ((0, common_1.ɵgetDOM)().supportsDOMEvents) {
        describe('getBaseHref', () => {
            beforeEach(() => (0, common_1.ɵgetDOM)().resetBaseElement());
            it('should return null if base element is absent', () => {
                expect((0, common_1.ɵgetDOM)().getBaseHref(defaultDoc)).toBeNull();
            });
            it('should return the value of the base element', () => {
                const baseEl = (0, common_1.ɵgetDOM)().createElement('base');
                baseEl.setAttribute('href', '/drop/bass/connon/');
                const headEl = defaultDoc.head;
                headEl.appendChild(baseEl);
                const baseHref = (0, common_1.ɵgetDOM)().getBaseHref(defaultDoc);
                baseEl.remove();
                (0, common_1.ɵgetDOM)().resetBaseElement();
                expect(baseHref).toEqual('/drop/bass/connon/');
            });
            it('should return a relative url', () => {
                const baseEl = (0, common_1.ɵgetDOM)().createElement('base');
                baseEl.setAttribute('href', 'base');
                const headEl = defaultDoc.head;
                headEl.appendChild(baseEl);
                const baseHref = (0, common_1.ɵgetDOM)().getBaseHref(defaultDoc);
                baseEl.remove();
                (0, common_1.ɵgetDOM)().resetBaseElement();
                expect(baseHref.endsWith('/base')).toBe(true);
            });
        });
    }
});
