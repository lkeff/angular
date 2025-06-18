"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
describe('ShadowCss', () => {
    it('should handle empty string', () => {
        expect((0, utils_1.shim)('', 'contenta')).toEqualCss('');
    });
    it('should add an attribute to every rule', () => {
        const css = 'one {color: red;}two {color: red;}';
        const expected = 'one[contenta] {color:red;}two[contenta] {color:red;}';
        expect((0, utils_1.shim)(css, 'contenta')).toEqualCss(expected);
    });
    it('should handle invalid css', () => {
        const css = 'one {color: red;}garbage';
        const expected = 'one[contenta] {color:red;}garbage';
        expect((0, utils_1.shim)(css, 'contenta')).toEqualCss(expected);
    });
    it('should add an attribute to every selector', () => {
        const css = 'one, two {color: red;}';
        const expected = 'one[contenta], two[contenta] {color:red;}';
        expect((0, utils_1.shim)(css, 'contenta')).toEqualCss(expected);
    });
    it('should support newlines in the selector and content ', () => {
        const css = `
      one,
      two {
        color: red;
      }
    `;
        const expected = `
      one[contenta],
      two[contenta] {
        color: red;
      }
    `;
        expect((0, utils_1.shim)(css, 'contenta')).toEqualCss(expected);
    });
    it('should support newlines in the same selector and content ', () => {
        const selector = `.foo:not(
      .bar) {
        background-color:
          green;
    }`;
        expect((0, utils_1.shim)(selector, 'contenta', 'a-host')).toEqualCss('.foo[contenta]:not( .bar) { background-color:green;}');
    });
    it('should handle complicated selectors', () => {
        expect((0, utils_1.shim)('one::before {}', 'contenta')).toEqualCss('one[contenta]::before {}');
        expect((0, utils_1.shim)('one two {}', 'contenta')).toEqualCss('one[contenta] two[contenta] {}');
        expect((0, utils_1.shim)('one > two {}', 'contenta')).toEqualCss('one[contenta] > two[contenta] {}');
        expect((0, utils_1.shim)('one + two {}', 'contenta')).toEqualCss('one[contenta] + two[contenta] {}');
        expect((0, utils_1.shim)('one ~ two {}', 'contenta')).toEqualCss('one[contenta] ~ two[contenta] {}');
        expect((0, utils_1.shim)('.one.two > three {}', 'contenta')).toEqualCss('.one.two[contenta] > three[contenta] {}');
        expect((0, utils_1.shim)('one[attr="value"] {}', 'contenta')).toEqualCss('one[attr="value"][contenta] {}');
        expect((0, utils_1.shim)('one[attr=value] {}', 'contenta')).toEqualCss('one[attr=value][contenta] {}');
        expect((0, utils_1.shim)('one[attr^="value"] {}', 'contenta')).toEqualCss('one[attr^="value"][contenta] {}');
        expect((0, utils_1.shim)('one[attr$="value"] {}', 'contenta')).toEqualCss('one[attr$="value"][contenta] {}');
        expect((0, utils_1.shim)('one[attr*="value"] {}', 'contenta')).toEqualCss('one[attr*="value"][contenta] {}');
        expect((0, utils_1.shim)('one[attr|="value"] {}', 'contenta')).toEqualCss('one[attr|="value"][contenta] {}');
        expect((0, utils_1.shim)('one[attr~="value"] {}', 'contenta')).toEqualCss('one[attr~="value"][contenta] {}');
        expect((0, utils_1.shim)('one[attr="va lue"] {}', 'contenta')).toEqualCss('one[attr="va lue"][contenta] {}');
        expect((0, utils_1.shim)('one[attr] {}', 'contenta')).toEqualCss('one[attr][contenta] {}');
        expect((0, utils_1.shim)('[is="one"] {}', 'contenta')).toEqualCss('[is="one"][contenta] {}');
        expect((0, utils_1.shim)('[attr] {}', 'contenta')).toEqualCss('[attr][contenta] {}');
    });
    it('should transform :host with attributes', () => {
        expect((0, utils_1.shim)(':host [attr] {}', 'contenta', 'hosta')).toEqualCss('[hosta] [attr][contenta] {}');
        expect((0, utils_1.shim)(':host(create-first-project) {}', 'contenta', 'hosta')).toEqualCss('create-first-project[hosta] {}');
        expect((0, utils_1.shim)(':host[attr] {}', 'contenta', 'hosta')).toEqualCss('[attr][hosta] {}');
        expect((0, utils_1.shim)(':host[attr]:where(:not(.cm-button)) {}', 'contenta', 'hosta')).toEqualCss('[attr][hosta]:where(:not(.cm-button)) {}');
    });
    it('should handle escaped sequences in selectors', () => {
        expect((0, utils_1.shim)('one\\/two {}', 'contenta')).toEqualCss('one\\/two[contenta] {}');
        expect((0, utils_1.shim)('one\\:two {}', 'contenta')).toEqualCss('one\\:two[contenta] {}');
        expect((0, utils_1.shim)('one\\\\:two {}', 'contenta')).toEqualCss('one\\\\[contenta]:two {}');
        expect((0, utils_1.shim)('.one\\:two {}', 'contenta')).toEqualCss('.one\\:two[contenta] {}');
        expect((0, utils_1.shim)('.one\\:\\fc ber {}', 'contenta')).toEqualCss('.one\\:\\fc ber[contenta] {}');
        expect((0, utils_1.shim)('.one\\:two .three\\:four {}', 'contenta')).toEqualCss('.one\\:two[contenta] .three\\:four[contenta] {}');
        expect((0, utils_1.shim)('div:where(.one) {}', 'contenta', 'hosta')).toEqualCss('div[contenta]:where(.one) {}');
        expect((0, utils_1.shim)('div:where() {}', 'contenta', 'hosta')).toEqualCss('div[contenta]:where() {}');
        expect((0, utils_1.shim)(':where(a):where(b) {}', 'contenta', 'hosta')).toEqualCss(':where(a[contenta]):where(b[contenta]) {}');
        expect((0, utils_1.shim)('*:where(.one) {}', 'contenta', 'hosta')).toEqualCss('*[contenta]:where(.one) {}');
        expect((0, utils_1.shim)('*:where(.one) ::ng-deep .foo {}', 'contenta', 'hosta')).toEqualCss('*[contenta]:where(.one) .foo {}');
    });
    it('should handle pseudo functions correctly', () => {
        // :where()
        expect((0, utils_1.shim)(':where(.one) {}', 'contenta', 'hosta')).toEqualCss(':where(.one[contenta]) {}');
        expect((0, utils_1.shim)(':where(div.one span.two) {}', 'contenta', 'hosta')).toEqualCss(':where(div.one[contenta] span.two[contenta]) {}');
        expect((0, utils_1.shim)(':where(.one) .two {}', 'contenta', 'hosta')).toEqualCss(':where(.one[contenta]) .two[contenta] {}');
        expect((0, utils_1.shim)(':where(:host) {}', 'contenta', 'hosta')).toEqualCss(':where([hosta]) {}');
        expect((0, utils_1.shim)(':where(:host) .one {}', 'contenta', 'hosta')).toEqualCss(':where([hosta]) .one[contenta] {}');
        expect((0, utils_1.shim)(':where(.one) :where(:host) {}', 'contenta', 'hosta')).toEqualCss(':where(.one) :where([hosta]) {}');
        expect((0, utils_1.shim)(':where(.one :host) {}', 'contenta', 'hosta')).toEqualCss(':where(.one [hosta]) {}');
        expect((0, utils_1.shim)('div :where(.one) {}', 'contenta', 'hosta')).toEqualCss('div[contenta] :where(.one[contenta]) {}');
        expect((0, utils_1.shim)(':host :where(.one .two) {}', 'contenta', 'hosta')).toEqualCss('[hosta] :where(.one[contenta] .two[contenta]) {}');
        expect((0, utils_1.shim)(':where(.one, .two) {}', 'contenta', 'hosta')).toEqualCss(':where(.one[contenta], .two[contenta]) {}');
        expect((0, utils_1.shim)(':where(.one > .two) {}', 'contenta', 'hosta')).toEqualCss(':where(.one[contenta] > .two[contenta]) {}');
        expect((0, utils_1.shim)(':where(> .one) {}', 'contenta', 'hosta')).toEqualCss(':where( > .one[contenta]) {}');
        expect((0, utils_1.shim)(':where(:not(.one) ~ .two) {}', 'contenta', 'hosta')).toEqualCss(':where([contenta]:not(.one) ~ .two[contenta]) {}');
        expect((0, utils_1.shim)(':where([foo]) {}', 'contenta', 'hosta')).toEqualCss(':where([foo][contenta]) {}');
        // :is()
        expect((0, utils_1.shim)('div:is(.foo) {}', 'contenta', 'a-host')).toEqualCss('div[contenta]:is(.foo) {}');
        expect((0, utils_1.shim)(':is(.dark :host) {}', 'contenta', 'a-host')).toEqualCss(':is(.dark [a-host]) {}');
        expect((0, utils_1.shim)(':is(.dark) :is(:host) {}', 'contenta', 'a-host')).toEqualCss(':is(.dark) :is([a-host]) {}');
        expect((0, utils_1.shim)(':host:is(.foo) {}', 'contenta', 'a-host')).toEqualCss('[a-host]:is(.foo) {}');
        expect((0, utils_1.shim)(':is(.foo) {}', 'contenta', 'a-host')).toEqualCss(':is(.foo[contenta]) {}');
        expect((0, utils_1.shim)(':is(.foo, .bar, .baz) {}', 'contenta', 'a-host')).toEqualCss(':is(.foo[contenta], .bar[contenta], .baz[contenta]) {}');
        expect((0, utils_1.shim)(':is(.foo, .bar) :host {}', 'contenta', 'a-host')).toEqualCss(':is(.foo, .bar) [a-host] {}');
        // :is() and :where()
        expect((0, utils_1.shim)(':is(.foo, .bar) :is(.baz) :where(.one, .two) :host :where(.three:first-child) {}', 'contenta', 'a-host')).toEqualCss(':is(.foo, .bar) :is(.baz) :where(.one, .two) [a-host] :where(.three[contenta]:first-child) {}');
        expect((0, utils_1.shim)(':where(:is(a)) {}', 'contenta', 'hosta')).toEqualCss(':where(:is(a[contenta])) {}');
        expect((0, utils_1.shim)(':where(:is(a, b)) {}', 'contenta', 'hosta')).toEqualCss(':where(:is(a[contenta], b[contenta])) {}');
        expect((0, utils_1.shim)(':where(:host:is(.one, .two)) {}', 'contenta', 'hosta')).toEqualCss(':where([hosta]:is(.one, .two)) {}');
        expect((0, utils_1.shim)(':where(:host :is(.one, .two)) {}', 'contenta', 'hosta')).toEqualCss(':where([hosta] :is(.one[contenta], .two[contenta])) {}');
        expect((0, utils_1.shim)(':where(:is(a, b) :is(.one, .two)) {}', 'contenta', 'hosta')).toEqualCss(':where(:is(a[contenta], b[contenta]) :is(.one[contenta], .two[contenta])) {}');
        expect((0, utils_1.shim)(':where(:where(a:has(.foo), b) :is(.one, .two:where(.foo > .bar))) {}', 'contenta', 'hosta')).toEqualCss(':where(:where(a[contenta]:has(.foo), b[contenta]) :is(.one[contenta], .two[contenta]:where(.foo > .bar))) {}');
        expect((0, utils_1.shim)(':where(.two):first-child {}', 'contenta', 'hosta')).toEqualCss('[contenta]:where(.two):first-child {}');
        expect((0, utils_1.shim)(':first-child:where(.two) {}', 'contenta', 'hosta')).toEqualCss('[contenta]:first-child:where(.two) {}');
        expect((0, utils_1.shim)(':where(.two):nth-child(3) {}', 'contenta', 'hosta')).toEqualCss('[contenta]:where(.two):nth-child(3) {}');
        expect((0, utils_1.shim)('table :where(td, th):hover { color: lime; }', 'contenta', 'hosta')).toEqualCss('table[contenta] [contenta]:where(td, th):hover { color:lime;}');
        // complex selectors
        expect((0, utils_1.shim)(':host:is([foo],[foo-2])>div.example-2 {}', 'contenta', 'a-host')).toEqualCss('[a-host]:is([foo],[foo-2]) > div.example-2[contenta] {}');
        expect((0, utils_1.shim)(':host:is([foo], [foo-2]) > div.example-2 {}', 'contenta', 'a-host')).toEqualCss('[a-host]:is([foo], [foo-2]) > div.example-2[contenta] {}');
        expect((0, utils_1.shim)(':host:has([foo],[foo-2])>div.example-2 {}', 'contenta', 'a-host')).toEqualCss('[a-host]:has([foo],[foo-2]) > div.example-2[contenta] {}');
        // :has()
        expect((0, utils_1.shim)('div:has(a) {}', 'contenta', 'hosta')).toEqualCss('div[contenta]:has(a) {}');
        expect((0, utils_1.shim)('div:has(a) :host {}', 'contenta', 'hosta')).toEqualCss('div:has(a) [hosta] {}');
        expect((0, utils_1.shim)(':has(a) :host :has(b) {}', 'contenta', 'hosta')).toEqualCss(':has(a) [hosta] [contenta]:has(b) {}');
        expect((0, utils_1.shim)('div:has(~ .one) {}', 'contenta', 'hosta')).toEqualCss('div[contenta]:has(~ .one) {}');
        // Unlike `:is()` or `:where()` the attribute selector isn't placed inside
        // of `:has()`. That is deliberate, `[contenta]:has(a)` would select all
        // `[contenta]` with `a` inside, while `:has(a[contenta])` would select
        // everything that contains `a[contenta]`, targeting elements outside of
        // encapsulated scope.
        expect((0, utils_1.shim)(':has(a) :has(b) {}', 'contenta', 'hosta')).toEqualCss('[contenta]:has(a) [contenta]:has(b) {}');
        expect((0, utils_1.shim)(':has(a, b) {}', 'contenta', 'hosta')).toEqualCss('[contenta]:has(a, b) {}');
        expect((0, utils_1.shim)(':has(a, b:where(.foo), :is(.bar)) {}', 'contenta', 'hosta')).toEqualCss('[contenta]:has(a, b:where(.foo), :is(.bar)) {}');
        expect((0, utils_1.shim)(':has(a, b:where(.foo), :is(.bar):first-child):first-letter {}', 'contenta', 'hosta')).toEqualCss('[contenta]:has(a, b:where(.foo), :is(.bar):first-child):first-letter {}');
        expect((0, utils_1.shim)(':where(a, b:where(.foo), :has(.bar):first-child) {}', 'contenta', 'hosta')).toEqualCss(':where(a[contenta], b[contenta]:where(.foo), [contenta]:has(.bar):first-child) {}');
        expect((0, utils_1.shim)(':has(.one :host, .two) {}', 'contenta', 'hosta')).toEqualCss('[contenta]:has(.one [hosta], .two) {}');
        expect((0, utils_1.shim)(':has(.one, :host) {}', 'contenta', 'hosta')).toEqualCss('[contenta]:has(.one, [hosta]) {}');
    });
    it('should handle :host inclusions inside pseudo-selectors selectors', () => {
        expect((0, utils_1.shim)('.header:not(.admin) {}', 'contenta', 'hosta')).toEqualCss('.header[contenta]:not(.admin) {}');
        expect((0, utils_1.shim)('.header:is(:host > .toolbar, :host ~ .panel) {}', 'contenta', 'hosta')).toEqualCss('.header[contenta]:is([hosta] > .toolbar, [hosta] ~ .panel) {}');
        expect((0, utils_1.shim)('.header:where(:host > .toolbar, :host ~ .panel) {}', 'contenta', 'hosta')).toEqualCss('.header[contenta]:where([hosta] > .toolbar, [hosta] ~ .panel) {}');
        expect((0, utils_1.shim)('.header:not(.admin, :host.super .header) {}', 'contenta', 'hosta')).toEqualCss('.header[contenta]:not(.admin, .super[hosta] .header) {}');
        expect((0, utils_1.shim)('.header:not(.admin, :host.super .header, :host.mega .header) {}', 'contenta', 'hosta')).toEqualCss('.header[contenta]:not(.admin, .super[hosta] .header, .mega[hosta] .header) {}');
        expect((0, utils_1.shim)('.one :where(.two, :host) {}', 'contenta', 'hosta')).toEqualCss('.one :where(.two[contenta], [hosta]) {}');
        expect((0, utils_1.shim)('.one :where(:host, .two) {}', 'contenta', 'hosta')).toEqualCss('.one :where([hosta], .two[contenta]) {}');
        expect((0, utils_1.shim)(':is(.foo):is(:host):is(.two) {}', 'contenta', 'hosta')).toEqualCss(':is(.foo):is([hosta]):is(.two[contenta]) {}');
        expect((0, utils_1.shim)(':where(.one, :host .two):first-letter {}', 'contenta', 'hosta')).toEqualCss('[contenta]:where(.one, [hosta] .two):first-letter {}');
        expect((0, utils_1.shim)(':first-child:where(.one, :host .two) {}', 'contenta', 'hosta')).toEqualCss('[contenta]:first-child:where(.one, [hosta] .two) {}');
        expect((0, utils_1.shim)(':where(.one, :host .two):nth-child(3):is(.foo, a:where(.bar)) {}', 'contenta', 'hosta')).toEqualCss('[contenta]:where(.one, [hosta] .two):nth-child(3):is(.foo, a:where(.bar)) {}');
    });
    it('should handle escaped selector with space (if followed by a hex char)', () => {
        // When esbuild runs with optimization.minify
        // selectors are escaped: .über becomes .\fc ber.
        // The space here isn't a separator between 2 selectors
        expect((0, utils_1.shim)('.\\fc ber {}', 'contenta')).toEqual('.\\fc ber[contenta] {}');
        expect((0, utils_1.shim)('.\\fc ker {}', 'contenta')).toEqual('.\\fc[contenta]   ker[contenta] {}');
        expect((0, utils_1.shim)('.pr\\fc fung {}', 'contenta')).toEqual('.pr\\fc fung[contenta] {}');
    });
    it('should handle ::shadow', () => {
        const css = (0, utils_1.shim)('x::shadow > y {}', 'contenta');
        expect(css).toEqualCss('x[contenta] > y[contenta] {}');
    });
    it('should leave calc() unchanged', () => {
        const styleStr = 'div {height:calc(100% - 55px);}';
        const css = (0, utils_1.shim)(styleStr, 'contenta');
        expect(css).toEqualCss('div[contenta] {height:calc(100% - 55px);}');
    });
    it('should shim rules with quoted content', () => {
        const styleStr = 'div {background-image: url("a.jpg"); color: red;}';
        const css = (0, utils_1.shim)(styleStr, 'contenta');
        expect(css).toEqualCss('div[contenta] {background-image:url("a.jpg"); color:red;}');
    });
    it('should shim rules with an escaped quote inside quoted content', () => {
        const styleStr = 'div::after { content: "\\"" }';
        const css = (0, utils_1.shim)(styleStr, 'contenta');
        expect(css).toEqualCss('div[contenta]::after { content:"\\""}');
    });
    it('should shim rules with curly braces inside quoted content', () => {
        const styleStr = 'div::after { content: "{}" }';
        const css = (0, utils_1.shim)(styleStr, 'contenta');
        expect(css).toEqualCss('div[contenta]::after { content:"{}"}');
    });
    it('should keep retain multiline selectors', () => {
        // This is needed as shifting in line number will cause sourcemaps to break.
        const styleStr = '.foo,\n.bar { color: red;}';
        const css = (0, utils_1.shim)(styleStr, 'contenta');
        expect(css).toEqual('.foo[contenta], \n.bar[contenta] { color: red;}');
    });
    describe('comments', () => {
        // Comments should be kept in the same position as otherwise inline sourcemaps break due to
        // shift in lines.
        it('should replace multiline comments with newline', () => {
            expect((0, utils_1.shim)('/* b {c} */ b {c}', 'contenta')).toBe('\n b[contenta] {c}');
        });
        it('should replace multiline comments with newline in the original position', () => {
            expect((0, utils_1.shim)('/* b {c}\n */ b {c}', 'contenta')).toBe('\n\n b[contenta] {c}');
        });
        it('should replace comments with newline in the original position', () => {
            expect((0, utils_1.shim)('/* b {c} */ b {c} /* a {c} */ a {c}', 'contenta')).toBe('\n b[contenta] {c} \n a[contenta] {c}');
        });
        it('should keep sourceMappingURL comments', () => {
            expect((0, utils_1.shim)('b {c} /*# sourceMappingURL=data:x */', 'contenta')).toBe('b[contenta] {c} /*# sourceMappingURL=data:x */');
            expect((0, utils_1.shim)('b {c}/* #sourceMappingURL=data:x */', 'contenta')).toBe('b[contenta] {c}/* #sourceMappingURL=data:x */');
        });
        it('should handle adjacent comments', () => {
            expect((0, utils_1.shim)('/* comment 1 */ /* comment 2 */ b {c}', 'contenta')).toBe('\n \n b[contenta] {c}');
        });
    });
});
