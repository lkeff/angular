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
const shared_styles_host_1 = require("../../src/dom/shared_styles_host");
const matchers_1 = require("../../testing/src/matchers");
describe('SharedStylesHost', () => {
    let doc;
    let ssh;
    let someHost;
    beforeEach(() => {
        doc = (0, common_1.ɵgetDOM)().createHtmlDocument();
        doc.title = '';
        ssh = new shared_styles_host_1.SharedStylesHost(doc, 'app-id');
        someHost = (0, common_1.ɵgetDOM)().createElement('div');
    });
    describe('inline', () => {
        it('should add existing styles to new hosts', () => {
            ssh.addStyles(['a {};']);
            ssh.addHost(someHost);
            (0, matchers_1.expect)(someHost.innerHTML).toEqual('<style>a {};</style>');
        });
        it('should add new styles to hosts', () => {
            ssh.addHost(someHost);
            ssh.addStyles(['a {};']);
            (0, matchers_1.expect)(someHost.innerHTML).toEqual('<style>a {};</style>');
        });
        it('should add styles only once to hosts', () => {
            ssh.addStyles(['a {};']);
            ssh.addHost(someHost);
            ssh.addStyles(['a {};']);
            (0, matchers_1.expect)(someHost.innerHTML).toEqual('<style>a {};</style>');
        });
        it('should use the document head as default host', () => {
            ssh.addStyles(['a {};', 'b {};']);
            (0, matchers_1.expect)(doc.head).toHaveText('a {};b {};');
        });
        it('should remove style nodes on destroy', () => {
            ssh.addStyles(['a {};']);
            ssh.addHost(someHost);
            (0, matchers_1.expect)(someHost.innerHTML).toEqual('<style>a {};</style>');
            ssh.ngOnDestroy();
            (0, matchers_1.expect)(someHost.innerHTML).toEqual('');
        });
        it(`should add 'nonce' attribute when a nonce value is provided`, () => {
            ssh = new shared_styles_host_1.SharedStylesHost(doc, 'app-id', '{% nonce %}');
            ssh.addStyles(['a {};']);
            ssh.addHost(someHost);
            (0, matchers_1.expect)(someHost.innerHTML).toEqual('<style nonce="{% nonce %}">a {};</style>');
        });
        it(`should reuse SSR generated element`, () => {
            const style = doc.createElement('style');
            style.setAttribute('ng-app-id', 'app-id');
            style.textContent = 'a {};';
            doc.head.appendChild(style);
            ssh = new shared_styles_host_1.SharedStylesHost(doc, 'app-id');
            ssh.addStyles(['a {};']);
            (0, matchers_1.expect)(doc.head.innerHTML).toContain('<style ng-style-reused="">a {};</style>');
            (0, matchers_1.expect)(doc.head.innerHTML).not.toContain('ng-app-id');
        });
    });
    describe('external', () => {
        it('should add existing styles to new hosts', () => {
            ssh.addStyles([], ['component-1.css']);
            ssh.addHost(someHost);
            (0, matchers_1.expect)(someHost.innerHTML).toEqual('<link rel="stylesheet" href="component-1.css">');
        });
        it('should add new styles to hosts', () => {
            ssh.addHost(someHost);
            ssh.addStyles([], ['component-1.css']);
            (0, matchers_1.expect)(someHost.innerHTML).toEqual('<link rel="stylesheet" href="component-1.css">');
        });
        it('should add styles only once to hosts', () => {
            ssh.addStyles([], ['component-1.css']);
            ssh.addHost(someHost);
            ssh.addStyles([], ['component-1.css']);
            (0, matchers_1.expect)(someHost.innerHTML).toEqual('<link rel="stylesheet" href="component-1.css">');
        });
        it('should use the document head as default host', () => {
            ssh.addStyles([], ['component-1.css', 'component-2.css']);
            (0, matchers_1.expect)(doc.head.innerHTML).toContain('<link rel="stylesheet" href="component-1.css">');
            (0, matchers_1.expect)(doc.head.innerHTML).toContain('<link rel="stylesheet" href="component-2.css">');
        });
        it('should remove style nodes on destroy', () => {
            ssh.addStyles([], ['component-1.css']);
            ssh.addHost(someHost);
            (0, matchers_1.expect)(someHost.innerHTML).toEqual('<link rel="stylesheet" href="component-1.css">');
            ssh.ngOnDestroy();
            (0, matchers_1.expect)(someHost.innerHTML).toEqual('');
        });
        it(`should add 'nonce' attribute when a nonce value is provided`, () => {
            ssh = new shared_styles_host_1.SharedStylesHost(doc, 'app-id', '{% nonce %}');
            ssh.addStyles([], ['component-1.css']);
            ssh.addHost(someHost);
            (0, matchers_1.expect)(someHost.innerHTML).toEqual('<link rel="stylesheet" href="component-1.css" nonce="{% nonce %}">');
        });
        it('should keep search parameters of urls', () => {
            ssh.addHost(someHost);
            ssh.addStyles([], ['component-1.css?ngcomp=ng-app-c123456789']);
            (0, matchers_1.expect)(someHost.innerHTML).toEqual('<link rel="stylesheet" href="component-1.css?ngcomp=ng-app-c123456789">');
        });
        it(`should reuse SSR generated element`, () => {
            const link = doc.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('href', 'component-1.css');
            link.setAttribute('ng-app-id', 'app-id');
            doc.head.appendChild(link);
            ssh = new shared_styles_host_1.SharedStylesHost(doc, 'app-id');
            ssh.addStyles([], ['component-1.css']);
            (0, matchers_1.expect)(doc.head.innerHTML).toContain('<link rel="stylesheet" href="component-1.css" ng-style-reused="">');
            (0, matchers_1.expect)(doc.head.innerHTML).not.toContain('ng-app-id');
        });
    });
});
