"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const get_roots_1 = require("./get-roots");
function createRoot() {
    const root = document.createElement('div');
    root.setAttribute('ng-version', '');
    return root;
}
describe('getRoots', () => {
    afterEach(() => {
        document.body.replaceChildren();
    });
    it('should return root element', () => {
        const rootElement = createRoot();
        const childElement = createRoot();
        rootElement.appendChild(childElement);
        document.body.appendChild(rootElement);
        const roots = (0, get_roots_1.getRoots)();
        expect(roots.length).toEqual(1);
        expect(roots.pop()).toEqual(rootElement);
    });
    it('should return root elements', () => {
        const firstRoot = createRoot();
        const secondRoot = createRoot();
        document.body.appendChild(firstRoot);
        document.body.appendChild(secondRoot);
        const roots = (0, get_roots_1.getRoots)();
        expect(roots.length).toEqual(2);
        expect(roots).toContain(firstRoot);
        expect(roots).toContain(secondRoot);
    });
});
