"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const dom_security_schema_1 = require("@angular/compiler/src/schema/dom_security_schema");
const view_1 = require("../../src/render3/interfaces/view");
const state_1 = require("../../src/render3/state");
const bypass_1 = require("../../src/sanitization/bypass");
const sanitization_1 = require("../../src/sanitization/sanitization");
const security_1 = require("../../src/sanitization/security");
function fakeLView() {
    const fake = [null, {}];
    fake[view_1.ENVIRONMENT] = {};
    return fake;
}
describe('sanitization', () => {
    beforeEach(() => (0, state_1.enterView)(fakeLView()));
    afterEach(() => (0, state_1.leaveView)());
    class Wrap {
        constructor(value) {
            this.value = value;
        }
        toString() {
            return this.value;
        }
    }
    it('should sanitize html', () => {
        expect((0, sanitization_1.ɵɵsanitizeHtml)('<div></div>').toString()).toEqual('<div></div>');
        expect((0, sanitization_1.ɵɵsanitizeHtml)(new Wrap('<div></div>')).toString()).toEqual('<div></div>');
        expect((0, sanitization_1.ɵɵsanitizeHtml)('<img src="javascript:true">').toString()).toEqual('<img src="unsafe:javascript:true">');
        expect((0, sanitization_1.ɵɵsanitizeHtml)(new Wrap('<img src="javascript:true">')).toString()).toEqual('<img src="unsafe:javascript:true">');
        expect(() => (0, sanitization_1.ɵɵsanitizeHtml)((0, bypass_1.bypassSanitizationTrustUrl)('<img src="javascript:true">'))).toThrowError(/Required a safe HTML, got a URL/);
        expect((0, sanitization_1.ɵɵsanitizeHtml)((0, bypass_1.bypassSanitizationTrustHtml)('<img src="javascript:true">')).toString()).toEqual('<img src="javascript:true">');
    });
    it('should sanitize url', () => {
        expect((0, sanitization_1.ɵɵsanitizeUrl)('http://server')).toEqual('http://server');
        expect((0, sanitization_1.ɵɵsanitizeUrl)(new Wrap('http://server'))).toEqual('http://server');
        expect((0, sanitization_1.ɵɵsanitizeUrl)('javascript:true')).toEqual('unsafe:javascript:true');
        expect((0, sanitization_1.ɵɵsanitizeUrl)(new Wrap('javascript:true'))).toEqual('unsafe:javascript:true');
        expect(() => (0, sanitization_1.ɵɵsanitizeUrl)((0, bypass_1.bypassSanitizationTrustHtml)('javascript:true'))).toThrowError(/Required a safe URL, got a HTML/);
        expect((0, sanitization_1.ɵɵsanitizeUrl)((0, bypass_1.bypassSanitizationTrustUrl)('javascript:true'))).toEqual('javascript:true');
    });
    it('should sanitize resourceUrl', () => {
        const ERROR = /NG0904: unsafe value used in a resource URL context.*/;
        expect(() => (0, sanitization_1.ɵɵsanitizeResourceUrl)('http://server')).toThrowError(ERROR);
        expect(() => (0, sanitization_1.ɵɵsanitizeResourceUrl)('javascript:true')).toThrowError(ERROR);
        expect(() => (0, sanitization_1.ɵɵsanitizeResourceUrl)((0, bypass_1.bypassSanitizationTrustHtml)('javascript:true'))).toThrowError(/Required a safe ResourceURL, got a HTML/);
        expect((0, sanitization_1.ɵɵsanitizeResourceUrl)((0, bypass_1.bypassSanitizationTrustResourceUrl)('javascript:true')).toString()).toEqual('javascript:true');
    });
    it('should sanitize style', () => {
        expect((0, sanitization_1.ɵɵsanitizeStyle)('red')).toEqual('red');
        expect((0, sanitization_1.ɵɵsanitizeStyle)(new Wrap('red'))).toEqual('red');
        expect((0, sanitization_1.ɵɵsanitizeStyle)('url("http://server")')).toEqual('url("http://server")');
        expect((0, sanitization_1.ɵɵsanitizeStyle)(new Wrap('url("http://server")'))).toEqual('url("http://server")');
        expect(() => (0, sanitization_1.ɵɵsanitizeStyle)((0, bypass_1.bypassSanitizationTrustHtml)('url("http://server")'))).toThrowError(/Required a safe Style, got a HTML/);
        expect((0, sanitization_1.ɵɵsanitizeStyle)((0, bypass_1.bypassSanitizationTrustStyle)('url("http://server")'))).toEqual('url("http://server")');
    });
    it('should sanitize script', () => {
        const ERROR = 'NG0905: unsafe value used in a script context';
        expect(() => (0, sanitization_1.ɵɵsanitizeScript)('true')).toThrowError(ERROR);
        expect(() => (0, sanitization_1.ɵɵsanitizeScript)('true')).toThrowError(ERROR);
        expect(() => (0, sanitization_1.ɵɵsanitizeScript)((0, bypass_1.bypassSanitizationTrustHtml)('true'))).toThrowError(/Required a safe Script, got a HTML/);
        expect((0, sanitization_1.ɵɵsanitizeScript)((0, bypass_1.bypassSanitizationTrustScript)('true')).toString()).toEqual('true');
    });
    it('should select correct sanitizer for URL props', () => {
        // making sure security schema we have on compiler side is in sync with the `getUrlSanitizer`
        // runtime function definition
        const schema = (0, dom_security_schema_1.SECURITY_SCHEMA)();
        const contextsByProp = new Map();
        const sanitizerNameByContext = new Map([
            [security_1.SecurityContext.URL, sanitization_1.ɵɵsanitizeUrl],
            [security_1.SecurityContext.RESOURCE_URL, sanitization_1.ɵɵsanitizeResourceUrl],
        ]);
        Object.entries(schema).forEach(([key, context]) => {
            if (context === security_1.SecurityContext.URL || security_1.SecurityContext.RESOURCE_URL) {
                const [tag, prop] = key.split('|');
                const contexts = contextsByProp.get(prop) || new Set();
                contexts.add(context);
                contextsByProp.set(prop, contexts);
                // check only in case a prop can be a part of both URL contexts
                if (contexts.size === 2) {
                    expect((0, sanitization_1.getUrlSanitizer)(tag, prop)).toEqual(sanitizerNameByContext.get(context));
                }
            }
        });
    });
    it('should sanitize resourceUrls via sanitizeUrlOrResourceUrl', () => {
        const ERROR = /NG0904: unsafe value used in a resource URL context.*/;
        expect(() => (0, sanitization_1.ɵɵsanitizeUrlOrResourceUrl)('http://server', 'iframe', 'src')).toThrowError(ERROR);
        expect(() => (0, sanitization_1.ɵɵsanitizeUrlOrResourceUrl)('javascript:true', 'iframe', 'src')).toThrowError(ERROR);
        expect(() => (0, sanitization_1.ɵɵsanitizeUrlOrResourceUrl)((0, bypass_1.bypassSanitizationTrustHtml)('javascript:true'), 'iframe', 'src')).toThrowError(/Required a safe ResourceURL, got a HTML/);
        expect((0, sanitization_1.ɵɵsanitizeUrlOrResourceUrl)((0, bypass_1.bypassSanitizationTrustResourceUrl)('javascript:true'), 'iframe', 'src').toString()).toEqual('javascript:true');
    });
    it('should sanitize urls via sanitizeUrlOrResourceUrl', () => {
        expect((0, sanitization_1.ɵɵsanitizeUrlOrResourceUrl)('http://server', 'a', 'href')).toEqual('http://server');
        expect((0, sanitization_1.ɵɵsanitizeUrlOrResourceUrl)(new Wrap('http://server'), 'a', 'href')).toEqual('http://server');
        expect((0, sanitization_1.ɵɵsanitizeUrlOrResourceUrl)('javascript:true', 'a', 'href')).toEqual('unsafe:javascript:true');
        expect((0, sanitization_1.ɵɵsanitizeUrlOrResourceUrl)(new Wrap('javascript:true'), 'a', 'href')).toEqual('unsafe:javascript:true');
        expect(() => (0, sanitization_1.ɵɵsanitizeUrlOrResourceUrl)((0, bypass_1.bypassSanitizationTrustHtml)('javascript:true'), 'a', 'href')).toThrowError(/Required a safe URL, got a HTML/);
        expect((0, sanitization_1.ɵɵsanitizeUrlOrResourceUrl)((0, bypass_1.bypassSanitizationTrustUrl)('javascript:true'), 'a', 'href')).toEqual('javascript:true');
    });
    it('should only trust constant strings from template literal tags without interpolation', () => {
        expect((0, sanitization_1.ɵɵtrustConstantHtml) `<h1>good</h1>`.toString()).toEqual('<h1>good</h1>');
        expect((0, sanitization_1.ɵɵtrustConstantResourceUrl) `http://good.com`.toString()).toEqual('http://good.com');
        expect(() => sanitization_1.ɵɵtrustConstantHtml `<h1>${'evil'}</h1>`).toThrowError(/Unexpected interpolation in trusted HTML constant/);
        expect(() => sanitization_1.ɵɵtrustConstantResourceUrl `http://${'evil'}.com`).toThrowError(/Unexpected interpolation in trusted URL constant/);
    });
});
