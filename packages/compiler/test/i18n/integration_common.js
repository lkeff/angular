"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTML = exports.FrLocalization = exports.I18nComponent = void 0;
exports.validateHtml = validateHtml;
exports.configureCompiler = configureCompiler;
exports.createComponent = createComponent;
exports.serializeTranslations = serializeTranslations;
const common_1 = require("@angular/common");
const message_bundle_1 = require("../../src/i18n/message_bundle");
const defaults_1 = require("../../src/ml_parser/defaults");
const html_parser_1 = require("../../src/ml_parser/html_parser");
const resource_loader_1 = require("../../src/resource_loader");
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const by_1 = require("@angular/platform-browser/src/dom/debug/by");
const browser_util_1 = require("@angular/platform-browser/testing/src/browser_util");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
let I18nComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'i18n-cmp',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var I18nComponent = _classThis = class {
        constructor() {
            this.response = { getItemsList: () => [] };
        }
    };
    __setFunctionName(_classThis, "I18nComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        I18nComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return I18nComponent = _classThis;
})();
exports.I18nComponent = I18nComponent;
class FrLocalization extends common_1.NgLocalization {
    getPluralCategory(value) {
        switch (value) {
            case 0:
            case 1:
                return 'one';
            default:
                return 'other';
        }
    }
}
exports.FrLocalization = FrLocalization;
FrLocalization.PROVIDE = { provide: common_1.NgLocalization, useClass: FrLocalization, deps: [] };
function validateHtml(tb, cmp, el) {
    expectHtml(el, 'h1').toBe('<h1>attributs i18n sur les balises</h1>');
    expectHtml(el, '#i18n-1').toBe('<div id="i18n-1"><p>imbriqué</p></div>');
    expectHtml(el, '#i18n-2').toBe('<div id="i18n-2"><p>imbriqué</p></div>');
    expectHtml(el, '#i18n-3').toBe('<div id="i18n-3"><p><i>avec des espaces réservés</i></p></div>');
    expectHtml(el, '#i18n-3b').toBe('<div id="i18n-3b"><p><i class="preserved-on-placeholders">avec des espaces réservés</i></p></div>');
    expectHtml(el, '#i18n-4').toBe('<p data-html="<b>gras</b>" id="i18n-4" title="sur des balises non traductibles"></p>');
    expectHtml(el, '#i18n-5').toBe('<p id="i18n-5" title="sur des balises traductibles"></p>');
    expectHtml(el, '#i18n-6').toBe('<p id="i18n-6" title=""></p>');
    cmp.count = 0;
    tb.detectChanges();
    (0, matchers_1.expect)(el.query(by_1.By.css('#i18n-7')).nativeElement).toHaveText('zero');
    (0, matchers_1.expect)(el.query(by_1.By.css('#i18n-14')).nativeElement).toHaveText('zero');
    cmp.count = 1;
    tb.detectChanges();
    (0, matchers_1.expect)(el.query(by_1.By.css('#i18n-7')).nativeElement).toHaveText('un');
    (0, matchers_1.expect)(el.query(by_1.By.css('#i18n-14')).nativeElement).toHaveText('un');
    (0, matchers_1.expect)(el.query(by_1.By.css('#i18n-17')).nativeElement).toHaveText('un');
    cmp.count = 2;
    tb.detectChanges();
    (0, matchers_1.expect)(el.query(by_1.By.css('#i18n-7')).nativeElement).toHaveText('deux');
    (0, matchers_1.expect)(el.query(by_1.By.css('#i18n-14')).nativeElement).toHaveText('deux');
    (0, matchers_1.expect)(el.query(by_1.By.css('#i18n-17')).nativeElement).toHaveText('deux');
    cmp.count = 3;
    tb.detectChanges();
    (0, matchers_1.expect)(el.query(by_1.By.css('#i18n-7')).nativeElement).toHaveText('beaucoup');
    (0, matchers_1.expect)(el.query(by_1.By.css('#i18n-14')).nativeElement).toHaveText('beaucoup');
    (0, matchers_1.expect)(el.query(by_1.By.css('#i18n-17')).nativeElement).toHaveText('beaucoup');
    cmp.sex = 'male';
    cmp.sexB = 'female';
    tb.detectChanges();
    (0, matchers_1.expect)(el.query(by_1.By.css('#i18n-8')).nativeElement).toHaveText('homme');
    (0, matchers_1.expect)(el.query(by_1.By.css('#i18n-8b')).nativeElement).toHaveText('femme');
    cmp.sex = 'female';
    tb.detectChanges();
    (0, matchers_1.expect)(el.query(by_1.By.css('#i18n-8')).nativeElement).toHaveText('femme');
    cmp.sex = '0';
    tb.detectChanges();
    (0, matchers_1.expect)(el.query(by_1.By.css('#i18n-8')).nativeElement).toHaveText('autre');
    cmp.count = 123;
    tb.detectChanges();
    expectHtml(el, '#i18n-9').toEqual('<div id="i18n-9">count = 123</div>');
    cmp.sex = 'f';
    tb.detectChanges();
    expectHtml(el, '#i18n-10').toEqual('<div id="i18n-10">sexe = f</div>');
    expectHtml(el, '#i18n-11').toEqual('<div id="i18n-11">custom name</div>');
    expectHtml(el, '#i18n-12').toEqual('<h1 id="i18n-12">Balises dans les commentaires html</h1>');
    expectHtml(el, '#i18n-13').toBe('<div id="i18n-13" title="dans une section traductible"></div>');
    expectHtml(el, '#i18n-15').toMatch(/ca <b>devrait<\/b> marcher/);
    expectHtml(el, '#i18n-16').toMatch(/avec un ID explicite/);
    expectHtml(el, '#i18n-17-5').toContain('Pas de réponse');
    cmp.response.getItemsList = () => ['a'];
    tb.detectChanges();
    expectHtml(el, '#i18n-17-5').toContain('Une réponse');
    cmp.response.getItemsList = () => ['a', 'b'];
    tb.detectChanges();
    expectHtml(el, '#i18n-17-5').toContain('2 réponses');
    expectHtml(el, '#i18n-18').toEqual('<div id="i18n-18">FOO<a title="dans une section traductible">BAR</a></div>');
}
function expectHtml(el, cssSelector) {
    return (0, matchers_1.expect)((0, browser_util_1.stringifyElement)(el.query(by_1.By.css(cssSelector)).nativeElement));
}
exports.HTML = `
<div>
    <h1 i18n>i18n attribute on tags</h1>

    <div id="i18n-1"><p i18n>nested</p></div>

    <div id="i18n-2"><p i18n="different meaning|">nested</p></div>

    <div id="i18n-3"><p i18n><i>with placeholders</i></p></div>
    <div id="i18n-3b"><p i18n><i class="preserved-on-placeholders">with placeholders</i></p></div>
    <div id="i18n-3c"><div i18n><div>with <div>nested</div> placeholders</div></div></div>

    <div>
        <p id="i18n-4" i18n-title title="on not translatable node" i18n-data-html data-html="<b>bold</b>"></p>
        <p id="i18n-5" i18n i18n-title title="on translatable node"></p>
        <p id="i18n-6" i18n-title title></p>
    </div>

    <!-- no ph below because the ICU node is the only child of the div, i.e. no text nodes -->
    <div i18n id="i18n-7">{count, plural, =0 {zero} =1 {one} =2 {two} other {<b>many</b>}}</div>

    <div i18n id="i18n-8">
        {sex, select, male {m} female {f} other {other}}
    </div>
    <div i18n id="i18n-8b">
        {sexB, select, male {m} female {f}}
    </div>

    <div i18n id="i18n-9">{{ "count = " + count }}</div>
    <div i18n id="i18n-10">sex = {{ sex }}</div>
    <div i18n id="i18n-11">{{ "custom name" //i18n(ph="CUSTOM_NAME") }}</div>
</div>

<!-- i18n -->
    <h1 id="i18n-12" >Markers in html comments</h1>
    <div id="i18n-13" i18n-title title="in a translatable section"></div>
    <div id="i18n-14">{count, plural, =0 {zero} =1 {one} =2 {two} other {<b>many</b>}}</div>
<!-- /i18n -->

<div id="i18n-15"><ng-container i18n>it <b>should</b> work</ng-container></div>

<div id="i18n-16" i18n="@@i18n16">with an explicit ID</div>
<div id="i18n-17" i18n="@@i18n17">{count, plural, =0 {zero} =1 {one} =2 {two} other {<b>many</b>}}</div>

<!-- make sure that ICU messages are not treated as text nodes -->
<div id="i18n-17-5" i18n="desc">{
    response.getItemsList().length,
    plural,
    =0 {Found no results}
    =1 {Found one result}
    other {Found {{response.getItemsList().length}} results}
}</div>

<div i18n id="i18n-18">foo<a i18n-title title="in a translatable section">bar</a></div>

<div id="i18n-19" i18n>{{ 'test' //i18n(ph="map name") }}</div>
`;
function configureCompiler(translationsToMerge, format) {
    return __awaiter(this, void 0, void 0, function* () {
        testing_1.TestBed.configureCompiler({
            providers: [
                { provide: resource_loader_1.ResourceLoader, useValue: jasmine.createSpyObj('ResourceLoader', ['get']) },
                FrLocalization.PROVIDE,
                { provide: core_1.TRANSLATIONS, useValue: translationsToMerge },
                { provide: core_1.TRANSLATIONS_FORMAT, useValue: format },
            ],
        });
        testing_1.TestBed.configureTestingModule({ declarations: [I18nComponent] });
    });
}
function createComponent(html) {
    const tb = testing_1.TestBed.overrideTemplate(I18nComponent, html).createComponent(I18nComponent);
    return { tb, cmp: tb.componentInstance, el: tb.debugElement };
}
function serializeTranslations(html, serializer) {
    const catalog = new message_bundle_1.MessageBundle(new html_parser_1.HtmlParser(), [], {});
    catalog.updateFromTemplate(html, 'file.ts', defaults_1.DEFAULT_INTERPOLATION_CONFIG);
    return catalog.write(serializer);
}
