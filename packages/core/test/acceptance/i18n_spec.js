"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloseBtn = exports.DialogDir = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
// Make the `$localize()` global function available to the compiled templates, and the direct calls
// below. This would normally be done inside the application `polyfills.ts` file.
require("@angular/localize/init");
const common_1 = require("@angular/common");
const es_1 = __importDefault(require("@angular/common/locales/es"));
const ro_1 = __importDefault(require("@angular/common/locales/ro"));
const compiler_1 = require("@angular/compiler");
const core_1 = require("../../src/core");
const view_1 = require("../../src/render3/interfaces/view");
const discovery_utils_1 = require("../../src/render3/util/discovery_utils");
const testing_1 = require("../../testing");
const localize_1 = require("@angular/localize");
const platform_browser_1 = require("@angular/platform-browser");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
const rxjs_1 = require("rxjs");
const ng_reflect_1 = require("../../src/ng_reflect");
describe('runtime i18n', () => {
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [AppComp, DirectiveWithTplRef, UppercasePipe],
            providers: [(0, ng_reflect_1.provideNgReflectAttributes)()],
            // In some of the tests we use made-up tag names for better readability, however
            // they'll cause validation errors. Add the `NO_ERRORS_SCHEMA` so that we don't have
            // to declare dummy components for each one of them.
            schemas: [core_1.NO_ERRORS_SCHEMA],
        });
    });
    afterEach(() => {
        (0, localize_1.clearTranslations)();
    });
    it('should translate text', () => {
        (0, localize_1.loadTranslations)({ [(0, compiler_1.computeMsgId)('text')]: 'texte' });
        const fixture = initWithTemplate(AppComp, `<div i18n>text</div>`);
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div>texte</div>`);
    });
    it('should support interpolations', () => {
        (0, localize_1.loadTranslations)({ [(0, compiler_1.computeMsgId)('Hello {$INTERPOLATION}!')]: 'Bonjour {$INTERPOLATION}!' });
        const fixture = initWithTemplate(AppComp, `<div i18n>Hello {{name}}!</div>`);
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div>Bonjour Angular!</div>`);
        fixture.componentRef.instance.name = `John`;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div>Bonjour John!</div>`);
    });
    it('should support named interpolations', () => {
        (0, localize_1.loadTranslations)({
            [(0, compiler_1.computeMsgId)(' Hello {$USER_NAME}! Emails: {$AMOUNT_OF_EMAILS_RECEIVED} ')]: ' Bonjour {$USER_NAME}! Emails: {$AMOUNT_OF_EMAILS_RECEIVED} ',
        });
        const fixture = initWithTemplate(AppComp, `
      <div i18n>
        Hello {{ name // i18n(ph="user_name") }}!
        Emails: {{ count // i18n(ph="amount of emails received") }}
      </div>
    `);
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div> Bonjour Angular! Emails: 0 </div>`);
        fixture.componentRef.instance.name = `John`;
        fixture.componentRef.instance.count = 5;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div> Bonjour John! Emails: 5 </div>`);
    });
    it('should support named interpolations with the same name', () => {
        (0, localize_1.loadTranslations)({
            [(0, compiler_1.computeMsgId)(' Hello {$PH_NAME} {$PH_NAME_1}! ')]: ' Bonjour {$PH_NAME} {$PH_NAME_1}! ',
        });
        const fixture = initWithTemplate(AppComp, `
      <div i18n>
        Hello {{ name // i18n(ph="ph_name") }} {{ description // i18n(ph="ph_name") }}!
      </div>
    `);
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div> Bonjour Angular Web Framework! </div>`);
        fixture.componentRef.instance.name = 'Other';
        fixture.componentRef.instance.description = 'Backend Framework';
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div> Bonjour Other Backend Framework! </div>`);
    });
    it('should support interpolations with custom interpolation config', () => {
        (0, localize_1.loadTranslations)({ [(0, compiler_1.computeMsgId)('Hello {$INTERPOLATION}')]: 'Bonjour {$INTERPOLATION}' });
        const interpolation = ['{%', '%}'];
        testing_1.TestBed.overrideComponent(AppComp, { set: { interpolation } });
        const fixture = initWithTemplate(AppComp, `<div i18n>Hello {% name %}</div>`);
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toBe('<div>Bonjour Angular</div>');
    });
    it('should support &ngsp; in translatable sections', () => {
        // note: the `` unicode symbol represents the `&ngsp;` in translations
        (0, localize_1.loadTranslations)({ [(0, compiler_1.computeMsgId)('text ||')]: 'texte ||' });
        const fixture = initWithTemplate(AppCompWithWhitespaces, `<div i18n>text |&ngsp;|</div>`);
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div>texte | |</div>`);
    });
    it('should support interpolations with complex expressions', () => {
        (0, localize_1.loadTranslations)({
            [(0, compiler_1.computeMsgId)(' {$INTERPOLATION} - {$INTERPOLATION_1} - {$INTERPOLATION_2} ')]: ' {$INTERPOLATION} - {$INTERPOLATION_1} - {$INTERPOLATION_2} (fr) ',
        });
        const fixture = initWithTemplate(AppComp, `
      <div i18n>
        {{ name | uppercase }} -
        {{ obj?.a?.b }} -
        {{ obj?.getA()?.b }}
      </div>
    `);
        // the `obj` field is not yet defined, so 2nd and 3rd interpolations return empty
        // strings
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div> ANGULAR -  -  (fr) </div>`);
        fixture.componentRef.instance.obj = {
            a: { b: 'value 1' },
            getA: () => ({ b: 'value 2' }),
        };
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div> ANGULAR - value 1 - value 2 (fr) </div>`);
    });
    it('should support elements', () => {
        (0, localize_1.loadTranslations)({
            [(0, compiler_1.computeMsgId)('Hello {$START_TAG_SPAN}world{$CLOSE_TAG_SPAN} and {$START_TAG_DIV}universe{$CLOSE_TAG_DIV}!', '')]: 'Bonjour {$START_TAG_SPAN}monde{$CLOSE_TAG_SPAN} et {$START_TAG_DIV}univers{$CLOSE_TAG_DIV}!',
        });
        const fixture = initWithTemplate(AppComp, `<div i18n>Hello <span>world</span> and <div>universe</div>!</div>`);
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div>Bonjour <span>monde</span> et <div>univers</div>!</div>`);
    });
    it('should support removing elements', () => {
        (0, localize_1.loadTranslations)({
            [(0, compiler_1.computeMsgId)('Hello {$START_BOLD_TEXT}my{$CLOSE_BOLD_TEXT}{$START_TAG_SPAN}world{$CLOSE_TAG_SPAN}', '')]: 'Bonjour {$START_TAG_SPAN}monde{$CLOSE_TAG_SPAN}',
        });
        const fixture = initWithTemplate(AppComp, `<div i18n>Hello <b>my</b><span>world</span></div><div>!</div>`);
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div>Bonjour <span>monde</span></div><div>!</div>`);
    });
    it('should support moving elements', () => {
        (0, localize_1.loadTranslations)({
            [(0, compiler_1.computeMsgId)('Hello {$START_TAG_SPAN}world{$CLOSE_TAG_SPAN} and {$START_TAG_DIV}universe{$CLOSE_TAG_DIV}!', '')]: 'Bonjour {$START_TAG_DIV}univers{$CLOSE_TAG_DIV} et {$START_TAG_SPAN}monde{$CLOSE_TAG_SPAN}!',
        });
        const fixture = initWithTemplate(AppComp, `<div i18n>Hello <span>world</span> and <div>universe</div>!</div>`);
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div>Bonjour <div>univers</div> et <span>monde</span>!</div>`);
    });
    it('should support template directives', () => {
        (0, localize_1.loadTranslations)({
            [(0, compiler_1.computeMsgId)('Content: {$START_TAG_DIV}before{$START_TAG_SPAN}middle{$CLOSE_TAG_SPAN}after{$CLOSE_TAG_DIV}!', '')]: 'Contenu: {$START_TAG_DIV}avant{$START_TAG_SPAN}milieu{$CLOSE_TAG_SPAN}après{$CLOSE_TAG_DIV}!',
        });
        const fixture = initWithTemplate(AppComp, `<div i18n>Content: <div *ngIf="visible">before<span>middle</span>after</div>!</div>`);
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML)
            .toEqual(`<div>Contenu: <div>avant<span>milieu</span>après</div><!--bindings={
  "ng-reflect-ng-if": "true"
}-->!</div>`);
        fixture.componentRef.instance.visible = false;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div>Contenu: <!--bindings={
  "ng-reflect-ng-if": "false"
}-->!</div>`);
    });
    it('should support multiple i18n blocks', () => {
        (0, localize_1.loadTranslations)({
            [(0, compiler_1.computeMsgId)('trad {$INTERPOLATION}')]: 'traduction {$INTERPOLATION}',
            [(0, compiler_1.computeMsgId)('start {$INTERPOLATION} middle {$INTERPOLATION_1} end')]: 'start {$INTERPOLATION_1} middle {$INTERPOLATION} end',
            [(0, compiler_1.computeMsgId)('{$START_TAG_C}trad{$CLOSE_TAG_C}{$START_TAG_D}{$CLOSE_TAG_D}{$START_TAG_E}{$CLOSE_TAG_E}', '')]: '{$START_TAG_E}{$CLOSE_TAG_E}{$START_TAG_C}traduction{$CLOSE_TAG_C}',
        });
        const fixture = initWithTemplate(AppComp, `
      <div>
        <a i18n>trad {{name}}</a>
        hello
        <b i18n i18n-title title="start {{count}} middle {{name}} end">
          <c>trad</c>
          <d></d>
          <e></e>
        </b>
      </div>`);
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div><a>traduction Angular</a> hello <b title="start Angular middle 0 end"><e></e><c>traduction</c></b></div>`);
    });
    it('should support multiple sibling i18n blocks', () => {
        (0, localize_1.loadTranslations)({
            [(0, compiler_1.computeMsgId)('Section 1')]: 'Section un',
            [(0, compiler_1.computeMsgId)('Section 2')]: 'Section deux',
            [(0, compiler_1.computeMsgId)('Section 3')]: 'Section trois',
        });
        const fixture = initWithTemplate(AppComp, `
      <div>
        <div i18n>Section 1</div>
        <div i18n>Section 2</div>
        <div i18n>Section 3</div>
      </div>`);
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div><div>Section un</div><div>Section deux</div><div>Section trois</div></div>`);
    });
    it('should support multiple sibling i18n blocks inside of a template directive', () => {
        (0, localize_1.loadTranslations)({
            [(0, compiler_1.computeMsgId)('Section 1')]: 'Section un',
            [(0, compiler_1.computeMsgId)('Section 2')]: 'Section deux',
            [(0, compiler_1.computeMsgId)('Section 3')]: 'Section trois',
        });
        const fixture = initWithTemplate(AppComp, `
      <ul *ngFor="let item of [1,2,3]">
        <li i18n>Section 1</li>
        <li i18n>Section 2</li>
        <li i18n>Section 3</li>
      </ul>`);
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<ul><li>Section un</li><li>Section deux</li><li>Section trois</li></ul><ul><li>Section un</li><li>Section deux</li><li>Section trois</li></ul><ul><li>Section un</li><li>Section deux</li><li>Section trois</li></ul><!--bindings={
  "ng-reflect-ng-for-of": "1,2,3"
}-->`);
    });
    it('should properly escape quotes in content', () => {
        (0, localize_1.loadTranslations)({
            [(0, compiler_1.computeMsgId)('\'Single quotes\' and "Double quotes"')]: '\'Guillemets simples\' et "Guillemets doubles"',
        });
        const fixture = initWithTemplate(AppComp, `<div i18n>'Single quotes' and "Double quotes"</div>`);
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual('<div>\'Guillemets simples\' et "Guillemets doubles"</div>');
    });
    it('should correctly bind to context in nested template', () => {
        (0, localize_1.loadTranslations)({ [(0, compiler_1.computeMsgId)('Item {$INTERPOLATION}')]: 'Article {$INTERPOLATION}' });
        const fixture = initWithTemplate(AppComp, `
          <div *ngFor='let id of items'>
            <div i18n>Item {{ id }}</div>
          </div>
        `);
        const element = fixture.nativeElement;
        for (let i = 0; i < element.children.length; i++) {
            const child = element.children[i];
            (0, matchers_1.expect)(child).toHaveText(`Article ${i + 1}`);
        }
    });
    it('should ignore i18n attributes on self-closing tags', () => {
        const fixture = initWithTemplate(AppComp, '<img src="logo.png" i18n>');
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toBe(`<img src="logo.png">`);
    });
    it('should handle i18n attribute with directives', () => {
        (0, localize_1.loadTranslations)({ [(0, compiler_1.computeMsgId)('Hello {$INTERPOLATION}')]: 'Bonjour {$INTERPOLATION}' });
        const fixture = initWithTemplate(AppComp, `<div *ngIf="visible" i18n>Hello {{ name }}</div>`);
        (0, matchers_1.expect)(fixture.nativeElement.firstChild).toHaveText('Bonjour Angular');
    });
    it('should work correctly with event listeners', () => {
        (0, localize_1.loadTranslations)({ [(0, compiler_1.computeMsgId)('Hello {$INTERPOLATION}')]: 'Bonjour {$INTERPOLATION}' });
        let ListenerComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app-comp',
                    template: `<div i18n (click)="onClick()">Hello {{ name }}</div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ListenerComp = _classThis = class {
                constructor() {
                    this.name = `Angular`;
                    this.clicks = 0;
                }
                onClick() {
                    this.clicks++;
                }
            };
            __setFunctionName(_classThis, "ListenerComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ListenerComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ListenerComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [ListenerComp] });
        const fixture = testing_1.TestBed.createComponent(ListenerComp);
        fixture.detectChanges();
        const element = fixture.nativeElement.firstChild;
        const instance = fixture.componentInstance;
        (0, matchers_1.expect)(element).toHaveText('Bonjour Angular');
        (0, matchers_1.expect)(instance.clicks).toBe(0);
        element.click();
        (0, matchers_1.expect)(instance.clicks).toBe(1);
    });
    it('should support local refs inside i18n block', () => {
        (0, localize_1.loadTranslations)({
            [(0, compiler_1.computeMsgId)('{$START_TAG_NG_CONTAINER} One {$CLOSE_TAG_NG_CONTAINER}' +
                '{$START_TAG_DIV} Two {$CLOSE_TAG_DIV}' +
                '{$START_TAG_SPAN} Three {$CLOSE_TAG_SPAN}' +
                '{$START_TAG_NG_TEMPLATE} Four {$CLOSE_TAG_NG_TEMPLATE}' +
                '{$START_TAG_NG_CONTAINER_1}{$CLOSE_TAG_NG_CONTAINER}')]: '{$START_TAG_NG_CONTAINER} Une {$CLOSE_TAG_NG_CONTAINER}' +
                '{$START_TAG_DIV} Deux {$CLOSE_TAG_DIV}' +
                '{$START_TAG_SPAN} Trois {$CLOSE_TAG_SPAN}' +
                '{$START_TAG_NG_TEMPLATE} Quatre {$CLOSE_TAG_NG_TEMPLATE}' +
                '{$START_TAG_NG_CONTAINER_1}{$CLOSE_TAG_NG_CONTAINER}',
        });
        const fixture = initWithTemplate(AppComp, `
      <div i18n>
        <ng-container #localRefA> One </ng-container>
        <div #localRefB> Two </div>
        <span #localRefC> Three </span>

        <ng-template #localRefD> Four </ng-template>
        <ng-container *ngTemplateOutlet="localRefD"></ng-container>
      </div>
    `);
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe(' Une  Deux  Trois  Quatre ');
    });
    it('should handle local refs correctly in case an element is removed in translation', () => {
        (0, localize_1.loadTranslations)({
            [(0, compiler_1.computeMsgId)('{$START_TAG_NG_CONTAINER} One {$CLOSE_TAG_NG_CONTAINER}' +
                '{$START_TAG_DIV} Two {$CLOSE_TAG_DIV}' +
                '{$START_TAG_SPAN} Three {$CLOSE_TAG_SPAN}')]: '{$START_TAG_DIV} Deux {$CLOSE_TAG_DIV}',
        });
        const fixture = initWithTemplate(AppComp, `
      <div i18n>
        <ng-container #localRefA> One </ng-container>
        <div #localRefB> Two </div>
        <span #localRefC> Three </span>
      </div>
    `);
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe(' Deux ');
    });
    it('should support conditional blocks', () => {
        (0, localize_1.loadTranslations)({
            [(0, compiler_1.computeMsgId)('Content: {$START_BLOCK_IF}before{$START_TAG_SPAN}zero{$CLOSE_TAG_SPAN}after' +
                '{$CLOSE_BLOCK_IF}{$START_BLOCK_ELSE_IF}before{$START_TAG_DIV}one{$CLOSE_TAG_DIV}' +
                'after{$CLOSE_BLOCK_ELSE_IF}{$START_BLOCK_ELSE}before{$START_TAG_BUTTON}' +
                'otherwise{$CLOSE_TAG_BUTTON}after{$CLOSE_BLOCK_ELSE}!', '')]: 'Contenido: {$START_BLOCK_IF}antes{$START_TAG_SPAN}cero{$CLOSE_TAG_SPAN}después' +
                '{$CLOSE_BLOCK_IF}{$START_BLOCK_ELSE_IF}antes{$START_TAG_DIV}uno{$CLOSE_TAG_DIV}' +
                'después{$CLOSE_BLOCK_ELSE_IF}{$START_BLOCK_ELSE}antes{$START_TAG_BUTTON}' +
                'si no{$CLOSE_TAG_BUTTON}después{$CLOSE_BLOCK_ELSE}!',
        });
        const fixture = initWithTemplate(AppComp, '<div i18n>Content: @if (count === 0) {before<span>zero</span>after} ' +
            '@else if (count === 1) {before<div>one</div>after} ' +
            '@else {before<button>otherwise</button>after}!</div>');
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual('<div>Contenido: antes<span>cero</span>después<!--container--><!--container-->' +
            '<!--container-->!</div>');
        fixture.componentInstance.count = 1;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual('<div>Contenido: <!--container-->antes<div>uno</div>después<!--container-->' +
            '<!--container-->!</div>');
        fixture.componentInstance.count = 2;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual('<div>Contenido: <!--container--><!--container-->antes<button>si no</button>después' +
            '<!--container-->!</div>');
    });
    it('should support switch blocks', () => {
        (0, localize_1.loadTranslations)({
            [(0, compiler_1.computeMsgId)('Content: {$START_BLOCK_CASE}before{$START_TAG_SPAN}zero{$CLOSE_TAG_SPAN}after' +
                '{$CLOSE_BLOCK_CASE}{$START_BLOCK_CASE_1}before{$START_TAG_DIV}one' +
                '{$CLOSE_TAG_DIV}after{$CLOSE_BLOCK_CASE}{$START_BLOCK_DEFAULT}before' +
                '{$START_TAG_BUTTON}otherwise{$CLOSE_TAG_BUTTON}after{$CLOSE_BLOCK_DEFAULT}', '')]: 'Contenido: {$START_BLOCK_CASE}antes{$START_TAG_SPAN}cero{$CLOSE_TAG_SPAN}después' +
                '{$CLOSE_BLOCK_CASE}{$START_BLOCK_CASE_1}antes{$START_TAG_DIV}uno' +
                '{$CLOSE_TAG_DIV}después{$CLOSE_BLOCK_CASE}{$START_BLOCK_DEFAULT}antes' +
                '{$START_TAG_BUTTON}si no{$CLOSE_TAG_BUTTON}después{$CLOSE_BLOCK_DEFAULT}',
        });
        const fixture = initWithTemplate(AppComp, '<div i18n>Content: @switch (count) {' +
            '@case (0) {before<span>zero</span>after}' +
            '@case (1) {before<div>one</div>after}' +
            '@default {before<button>otherwise</button>after}' +
            '}</div>');
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual('<div>Contenido: antes<span>cero</span>después<!--container--><!--container-->' +
            '<!--container--></div>');
        fixture.componentInstance.count = 1;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual('<div>Contenido: <!--container-->antes<div>uno</div>después<!--container-->' +
            '<!--container--></div>');
        fixture.componentInstance.count = 2;
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual('<div>Contenido: <!--container--><!--container-->antes<button>si no</button>después' +
            '<!--container--></div>');
    });
    it('should support for loop blocks', () => {
        (0, localize_1.loadTranslations)({
            [(0, compiler_1.computeMsgId)('Content: {$START_BLOCK_FOR}before{$START_TAG_SPAN}' +
                'middle{$CLOSE_TAG_SPAN}after{$CLOSE_BLOCK_FOR}{$START_BLOCK_EMPTY}' +
                'before{$START_TAG_DIV}empty{$CLOSE_TAG_DIV}after{$CLOSE_BLOCK_EMPTY}!')]: 'Contenido: {$START_BLOCK_FOR}antes{$START_TAG_SPAN}' +
                'medio{$CLOSE_TAG_SPAN}después{$CLOSE_BLOCK_FOR}{$START_BLOCK_EMPTY}' +
                'antes{$START_TAG_DIV}vacío{$CLOSE_TAG_DIV}después{$CLOSE_BLOCK_EMPTY}!',
        });
        const fixture = initWithTemplate(AppComp, '<div i18n>Content: @for (item of items; track item) {before<span>middle</span>after}' +
            '@empty {before<div>empty</div>after}!</div>');
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual('<div>Contenido: antes<span>medio</span>' +
            'despuésantes<span>medio</span>despuésantes<span>medio</span>' +
            'después<!--container--><!--container-->!</div>');
        fixture.componentInstance.items = [];
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual('<div>Contenido: <!--container-->antes<div>' + 'vacío</div>después<!--container-->!</div>');
    });
    it('should support deferred blocks', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, localize_1.loadTranslations)({
            [(0, compiler_1.computeMsgId)('Content: {$START_BLOCK_DEFER}before{$START_TAG_SPAN}middle' +
                '{$CLOSE_TAG_SPAN}after{$CLOSE_BLOCK_DEFER}{$START_BLOCK_PLACEHOLDER}before' +
                '{$START_TAG_DIV}placeholder{$CLOSE_TAG_DIV}after{$CLOSE_BLOCK_PLACEHOLDER}!', '')]: 'Contenido: {$START_BLOCK_DEFER}before{$START_TAG_SPAN}medio' +
                '{$CLOSE_TAG_SPAN}after{$CLOSE_BLOCK_DEFER}{$START_BLOCK_PLACEHOLDER}before' +
                '{$START_TAG_DIV}marcador de posición{$CLOSE_TAG_DIV}after{$CLOSE_BLOCK_PLACEHOLDER}!',
        });
        let DeferComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'defer-comp',
                    template: '<div i18n>Content: @defer (when isLoaded) {before<span>middle</span>after} ' +
                        '@placeholder {before<div>placeholder</div>after}!</div>',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DeferComp = _classThis = class {
                constructor() {
                    this.isLoaded = false;
                }
            };
            __setFunctionName(_classThis, "DeferComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DeferComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DeferComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            imports: [DeferComp],
            deferBlockBehavior: testing_1.DeferBlockBehavior.Manual,
            teardown: { destroyAfterEach: true },
        });
        const fixture = testing_1.TestBed.createComponent(DeferComp);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual('<div>Contenido: <!--container-->' +
            '<!--container-->!before<div>marcador de posición</div>after<!--container--></div>');
        const deferBlock = (yield fixture.getDeferBlocks())[0];
        fixture.componentInstance.isLoaded = true;
        fixture.detectChanges();
        yield deferBlock.render(testing_1.DeferBlockState.Complete);
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual('<div>Contenido: <!--container-->' +
            '<!--container-->!before<span>medio</span>after<!--container--></div>');
    }));
    describe('ng-container and ng-template support', () => {
        it('should support ng-container', () => {
            (0, localize_1.loadTranslations)({ [(0, compiler_1.computeMsgId)('text')]: 'texte' });
            const fixture = initWithTemplate(AppComp, `<ng-container i18n>text</ng-container>`);
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`texte<!--ng-container-->`);
        });
        it('should handle single translation message within ng-template', () => {
            (0, localize_1.loadTranslations)({ [(0, compiler_1.computeMsgId)('Hello {$INTERPOLATION}')]: 'Bonjour {$INTERPOLATION}' });
            const fixture = initWithTemplate(AppComp, `<ng-template i18n tplRef>Hello {{ name }}</ng-template>`);
            const element = fixture.nativeElement;
            (0, matchers_1.expect)(element).toHaveText('Bonjour Angular');
        });
        // Note: applying structural directives to <ng-template> is typically user error, but it
        // is technically allowed, so we need to support it.
        it('should handle structural directives on ng-template', () => {
            (0, localize_1.loadTranslations)({ [(0, compiler_1.computeMsgId)('Hello {$INTERPOLATION}')]: 'Bonjour {$INTERPOLATION}' });
            const fixture = initWithTemplate(AppComp, `<ng-template *ngIf="name" i18n tplRef>Hello {{ name }}</ng-template>`);
            const element = fixture.nativeElement;
            (0, matchers_1.expect)(element).toHaveText('Bonjour Angular');
        });
        it('should be able to act as child elements inside i18n block (plain text content)', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{$START_TAG_NG_TEMPLATE} Hello {$CLOSE_TAG_NG_TEMPLATE}{$START_TAG_NG_CONTAINER} Bye {$CLOSE_TAG_NG_CONTAINER}', '')]: '{$START_TAG_NG_TEMPLATE} Bonjour {$CLOSE_TAG_NG_TEMPLATE}{$START_TAG_NG_CONTAINER} Au revoir {$CLOSE_TAG_NG_CONTAINER}',
            });
            const fixture = initWithTemplate(AppComp, `
        <div i18n>
          <ng-template tplRef>
            Hello
          </ng-template>
          <ng-container>
            Bye
          </ng-container>
        </div>
      `);
            const element = fixture.nativeElement.firstChild;
            (0, matchers_1.expect)(element.textContent.replace(/\s+/g, ' ').trim()).toBe('Bonjour Au revoir');
        });
        it('should be able to act as child elements inside i18n block (text + tags)', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{$START_TAG_NG_TEMPLATE}{$START_TAG_SPAN}Hello{$CLOSE_TAG_SPAN}{$CLOSE_TAG_NG_TEMPLATE}{$START_TAG_NG_CONTAINER}{$START_TAG_SPAN}Hello{$CLOSE_TAG_SPAN}{$CLOSE_TAG_NG_CONTAINER}', '')]: '{$START_TAG_NG_TEMPLATE}{$START_TAG_SPAN}Bonjour{$CLOSE_TAG_SPAN}{$CLOSE_TAG_NG_TEMPLATE}{$START_TAG_NG_CONTAINER}{$START_TAG_SPAN}Bonjour{$CLOSE_TAG_SPAN}{$CLOSE_TAG_NG_CONTAINER}',
            });
            const fixture = initWithTemplate(AppComp, `
        <div i18n>
          <ng-template tplRef>
            <span>Hello</span>
          </ng-template>
          <ng-container>
            <span>Hello</span>
          </ng-container>
        </div>
      `);
            const element = fixture.nativeElement;
            const spans = element.getElementsByTagName('span');
            for (let i = 0; i < spans.length; i++) {
                (0, matchers_1.expect)(spans[i]).toHaveText('Bonjour');
            }
        });
        it('should be able to act as child elements inside i18n block (text + pipes)', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{$START_TAG_NG_TEMPLATE}Hello {$INTERPOLATION}{$CLOSE_TAG_NG_TEMPLATE}{$START_TAG_NG_CONTAINER}Bye {$INTERPOLATION}{$CLOSE_TAG_NG_CONTAINER}', '')]: '{$START_TAG_NG_TEMPLATE}Hej {$INTERPOLATION}{$CLOSE_TAG_NG_TEMPLATE}{$START_TAG_NG_CONTAINER}Vi ses {$INTERPOLATION}{$CLOSE_TAG_NG_CONTAINER}',
            });
            const fixture = initWithTemplate(AppComp, `
        <div i18n>
          <ng-template tplRef>Hello {{name | uppercase}}</ng-template>
          <ng-container>Bye {{name | uppercase}}</ng-container>
        </div>
      `);
            const element = fixture.nativeElement.firstChild;
            (0, matchers_1.expect)(element.textContent.replace(/\s+/g, ' ').trim()).toBe('Hej ANGULARVi ses ANGULAR');
        });
        it('should be able to handle deep nested levels with templates', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{$START_TAG_SPAN} Hello - 1 {$CLOSE_TAG_SPAN}{$START_TAG_SPAN_1} Hello - 2 {$START_TAG_SPAN_1} Hello - 3 {$START_TAG_SPAN_1} Hello - 4 {$CLOSE_TAG_SPAN}{$CLOSE_TAG_SPAN}{$CLOSE_TAG_SPAN}{$START_TAG_SPAN} Hello - 5 {$CLOSE_TAG_SPAN}', '')]: '{$START_TAG_SPAN} Bonjour - 1 {$CLOSE_TAG_SPAN}{$START_TAG_SPAN_1} Bonjour - 2 {$START_TAG_SPAN_1} Bonjour - 3 {$START_TAG_SPAN_1} Bonjour - 4 {$CLOSE_TAG_SPAN}{$CLOSE_TAG_SPAN}{$CLOSE_TAG_SPAN}{$START_TAG_SPAN} Bonjour - 5 {$CLOSE_TAG_SPAN}',
            });
            const fixture = initWithTemplate(AppComp, `
        <div i18n>
          <span>
            Hello - 1
          </span>
          <span *ngIf="visible">
            Hello - 2
            <span *ngIf="visible">
              Hello - 3
              <span *ngIf="visible">
                Hello - 4
              </span>
            </span>
          </span>
          <span>
            Hello - 5
          </span>
        </div>
      `);
            const element = fixture.nativeElement;
            const spans = element.getElementsByTagName('span');
            for (let i = 0; i < spans.length; i++) {
                (0, matchers_1.expect)(spans[i].innerHTML).toContain(`Bonjour - ${i + 1}`);
            }
        });
        it('should handle self-closing tags as content', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{$START_TAG_SPAN}My logo{$TAG_IMG}{$CLOSE_TAG_SPAN}')]: '{$START_TAG_SPAN}Mon logo{$TAG_IMG}{$CLOSE_TAG_SPAN}',
            });
            const content = `My logo<img src="logo.png" title="Logo">`;
            const fixture = initWithTemplate(AppComp, `
        <ng-container i18n>
          <span>${content}</span>
        </ng-container>
        <ng-template i18n tplRef>
          <span>${content}</span>
        </ng-template>
      `);
            const element = fixture.nativeElement;
            const spans = element.getElementsByTagName('span');
            for (let i = 0; i < spans.length; i++) {
                const child = spans[i];
                (0, matchers_1.expect)(child).toHaveText('Mon logo');
            }
        });
        it('should correctly find context for an element inside i18n section in <ng-template>', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{$START_LINK}Not logged in{$CLOSE_LINK}')]: '{$START_LINK}Not logged in{$CLOSE_LINK}',
            });
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[myDir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                    constructor() {
                        this.condition = true;
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-cmp',
                        template: `
              <div *ngIf="isLogged; else notLoggedIn">
                <span>Logged in</span>
              </div>
              <ng-template #notLoggedIn i18n>
                <a myDir>Not logged in</a>
              </ng-template>
            `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Cmp = _classThis = class {
                    constructor() {
                        this.isLogged = false;
                    }
                };
                __setFunctionName(_classThis, "Cmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Cmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Cmp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [Cmp, Dir],
            });
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            const a = fixture.debugElement.query(platform_browser_1.By.css('a'));
            const dir = a.injector.get(Dir);
            (0, matchers_1.expect)(dir.condition).toEqual(true);
        });
    });
    describe('should work correctly with namespaces', () => {
        beforeEach(() => {
            function _document() {
                // Tell Ivy about the global document
                (0, core_1.ɵsetDocument)(document);
                return document;
            }
            testing_1.TestBed.configureTestingModule({
                providers: [{ provide: common_1.DOCUMENT, useFactory: _document, deps: [] }],
            });
        });
        it('should handle namespaces inside i18n blocks', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{$START_TAG__XHTML_DIV} Hello ' +
                    '{$START_TAG__XHTML_SPAN}world{$CLOSE_TAG__XHTML_SPAN}{$CLOSE_TAG__XHTML_DIV}')]: '{$START_TAG__XHTML_DIV} Bonjour ' +
                    '{$START_TAG__XHTML_SPAN}monde{$CLOSE_TAG__XHTML_SPAN}{$CLOSE_TAG__XHTML_DIV}',
            });
            const fixture = initWithTemplate(AppComp, `
        <svg xmlns="http://www.w3.org/2000/svg">
          <foreignObject i18n>
            <xhtml:div xmlns="http://www.w3.org/1999/xhtml">
              Hello <span>world</span>
            </xhtml:div>
          </foreignObject>
        </svg>
      `);
            const element = fixture.nativeElement;
            (0, matchers_1.expect)(element.textContent.trim()).toBe('Bonjour monde');
            (0, matchers_1.expect)(element.querySelector('svg').namespaceURI).toBe('http://www.w3.org/2000/svg');
            (0, matchers_1.expect)(element.querySelector('div').namespaceURI).toBe('http://www.w3.org/1999/xhtml');
            (0, matchers_1.expect)(element.querySelector('span').namespaceURI).toBe('http://www.w3.org/1999/xhtml');
        });
        it('should handle namespaces on i18n block containers', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)(' Hello {$START_TAG__XHTML_SPAN}world{$CLOSE_TAG__XHTML_SPAN}')]: ' Bonjour {$START_TAG__XHTML_SPAN}monde{$CLOSE_TAG__XHTML_SPAN}',
            });
            const fixture = initWithTemplate(AppComp, `
        <svg xmlns="http://www.w3.org/2000/svg">
          <foreignObject>
            <xhtml:div xmlns="http://www.w3.org/1999/xhtml" i18n>
              Hello <span>world</span>
            </xhtml:div>
          </foreignObject>
        </svg>
      `);
            const element = fixture.nativeElement;
            (0, matchers_1.expect)(element.textContent.trim()).toBe('Bonjour monde');
            (0, matchers_1.expect)(element.querySelector('svg').namespaceURI).toBe('http://www.w3.org/2000/svg');
            (0, matchers_1.expect)(element.querySelector('div').namespaceURI).toBe('http://www.w3.org/1999/xhtml');
            (0, matchers_1.expect)(element.querySelector('span').namespaceURI).toBe('http://www.w3.org/1999/xhtml');
        });
    });
    describe('dynamic TNodes', () => {
        // When translation occurs the i18n system needs to create dynamic TNodes for the text
        // nodes so that they can be correctly processed by the `addRemoveViewFromContainer`.
        describe('ICU', () => {
            // In the case of ICUs we can't create TNodes for each ICU part, as different ICU
            // instances may have different selections active and hence have different shape. In
            // such a case a single `TIcuContainerNode` should be generated only.
            it('should create a single dynamic TNode for ICU', () => {
                const fixture = initWithTemplate(AppComp, `
          {count, plural,
            =0 {just now}
            =1 {one minute ago}
            other {{{count}} minutes ago}
          }
        `.trim());
                const lView = (0, discovery_utils_1.getComponentLView)(fixture.componentInstance);
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('just now');
                // We want to ensure that the ICU container does not have any content!
                // This is because the content is instance dependent and therefore can't be shared
                // across `TNode`s.
                (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`just now<!--ICU ${view_1.HEADER_OFFSET + 0}:0-->`);
            });
            it('should support multiple ICUs', () => {
                const fixture = initWithTemplate(AppComp, `
          {count, plural,
            =0 {just now}
            =1 {one minute ago}
            other {{{count}} minutes ago}
          }
          {name, select,
            Angular {Mr. Angular}
            other {Sir}
          }
        `);
                // We want to ensure that the ICU container does not have any content!
                // This is because the content is instance dependent and therefore can't be shared
                // across `TNode`s.
                (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`just now<!--ICU ${view_1.HEADER_OFFSET + 0}:0-->Mr. Angular<!--ICU ${view_1.HEADER_OFFSET + 1}:0-->`);
            });
        });
    });
    describe('should support ICU expressions', () => {
        it('with no root node', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{VAR_SELECT, select, 10 {ten} 20 {twenty} other {other}}')]: '{VAR_SELECT, select, 10 {dix} 20 {vingt} other {autre}}',
            });
            const fixture = initWithTemplate(AppComp, `{count, select, 10 {ten} 20 {twenty} other {other}}`);
            const element = fixture.nativeElement;
            (0, matchers_1.expect)(element).toHaveText('autre');
        });
        it('with no root node and text surrounding ICU', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{VAR_SELECT, select, 10 {Ten} 20 {Twenty} other {Other}}')]: '{VAR_SELECT, select, 10 {Dix} 20 {Vingt} other {Autre}}',
            });
            const fixture = initWithTemplate(AppComp, `
        ICU start -->
        {count, select, 10 {Ten} 20 {Twenty} other {Other}}
        <-- ICU end
      `);
            const element = fixture.nativeElement;
            (0, matchers_1.expect)(element.textContent).toContain('ICU start --> Autre <-- ICU end');
        });
        it('when `select` or `plural` keywords have spaces after them', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{VAR_SELECT , select , 10 {ten} 20 {twenty} other {other}}')]: '{VAR_SELECT , select , 10 {dix} 20 {vingt} other {autre}}',
                [(0, compiler_1.computeMsgId)('{VAR_PLURAL , plural , =0 {zero} =1 {one} other {other}}')]: '{VAR_PLURAL , plural , =0 {zéro} =1 {une} other {autre}}',
            });
            const fixture = initWithTemplate(AppComp, `
        <div i18n>
          {count, select , 10 {ten} 20 {twenty} other {other}} -
          {count, plural , =0 {zero} =1 {one} other {other}}
        </div>
      `);
            const element = fixture.nativeElement;
            (0, matchers_1.expect)(element.textContent).toContain('autre - zéro');
        });
        it('with no root node and text and DOM nodes surrounding ICU', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{VAR_SELECT, select, 10 {Ten} 20 {Twenty} other {Other}}')]: '{VAR_SELECT, select, 10 {Dix} 20 {Vingt} other {Autre}}',
            });
            const fixture = initWithTemplate(AppComp, `
        <span>ICU start --> </span>
        {count, select, 10 {Ten} 20 {Twenty} other {Other}}
        <-- ICU end
      `);
            const element = fixture.nativeElement;
            (0, matchers_1.expect)(element.textContent).toContain('ICU start --> Autre <-- ICU end');
        });
        it('with no i18n tag', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{VAR_SELECT, select, 10 {ten} 20 {twenty} other {other}}')]: '{VAR_SELECT, select, 10 {dix} 20 {vingt} other {autre}}',
            });
            const fixture = initWithTemplate(AppComp, `<div>{count, select, 10 {ten} 20 {twenty} other {other}}</div>`);
            const element = fixture.nativeElement;
            (0, matchers_1.expect)(element).toHaveText('autre');
        });
        it('multiple', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{VAR_PLURAL, plural, =0 {no {START_BOLD_TEXT}emails{CLOSE_BOLD_TEXT}!} =1 {one {START_ITALIC_TEXT}email{CLOSE_ITALIC_TEXT}} other {{INTERPOLATION} {START_TAG_SPAN}emails{CLOSE_TAG_SPAN}}}', '')]: '{VAR_PLURAL, plural, =0 {aucun {START_BOLD_TEXT}email{CLOSE_BOLD_TEXT}!} =1 {un {START_ITALIC_TEXT}email{CLOSE_ITALIC_TEXT}} other {{INTERPOLATION} {START_TAG_SPAN}emails{CLOSE_TAG_SPAN}}}',
                [(0, compiler_1.computeMsgId)('{VAR_SELECT, select, other {({INTERPOLATION})}}')]: '{VAR_SELECT, select, other {({INTERPOLATION})}}',
                [(0, compiler_1.computeMsgId)('{$ICU} - {$ICU_1}')]: '{$ICU} - {$ICU_1}',
            });
            const fixture = initWithTemplate(AppComp, `<div i18n>{count, plural,
        =0 {no <b>emails</b>!}
        =1 {one <i>email</i>}
        other {{{count}} <span title="{{name}}">emails</span>}
      } - {name, select,
        other {({{name}})}
      }</div>`);
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div>aucun <b>email</b>!<!--ICU ${view_1.HEADER_OFFSET + 1}:0--> - (Angular)<!--ICU ${view_1.HEADER_OFFSET + 1}:3--></div>`);
            fixture.componentRef.instance.count = 4;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div>4 <span title="Angular">emails</span><!--ICU ${view_1.HEADER_OFFSET + 1}:0--> - (Angular)<!--ICU ${view_1.HEADER_OFFSET + 1}:3--></div>`);
            fixture.componentRef.instance.count = 0;
            fixture.componentRef.instance.name = 'John';
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div>aucun <b>email</b>!<!--ICU ${view_1.HEADER_OFFSET + 1}:0--> - (John)<!--ICU ${view_1.HEADER_OFFSET + 1}:3--></div>`);
        });
        it('with custom interpolation config', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{VAR_SELECT, select, 10 {ten} other {{INTERPOLATION}}}')]: '{VAR_SELECT, select, 10 {dix} other {{INTERPOLATION}}}',
            });
            const interpolation = ['{%', '%}'];
            testing_1.TestBed.overrideComponent(AppComp, { set: { interpolation } });
            const fixture = initWithTemplate(AppComp, `<div i18n>{count, select, 10 {ten} other {{% name %}}}</div>`);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText(`Angular`);
        });
        it('inside HTML elements', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{VAR_PLURAL, plural, =0 {no {START_BOLD_TEXT}emails{CLOSE_BOLD_TEXT}!} =1 {one {START_ITALIC_TEXT}email{CLOSE_ITALIC_TEXT}} other {{INTERPOLATION} {START_TAG_SPAN}emails{CLOSE_TAG_SPAN}}}', '')]: '{VAR_PLURAL, plural, =0 {aucun {START_BOLD_TEXT}email{CLOSE_BOLD_TEXT}!} =1 {un {START_ITALIC_TEXT}email{CLOSE_ITALIC_TEXT}} other {{INTERPOLATION} {START_TAG_SPAN}emails{CLOSE_TAG_SPAN}}}',
                [(0, compiler_1.computeMsgId)('{VAR_SELECT, select, other {({INTERPOLATION})}}')]: '{VAR_SELECT, select, other {({INTERPOLATION})}}',
                [(0, compiler_1.computeMsgId)('{$START_TAG_SPAN_1}{$ICU}{$CLOSE_TAG_SPAN} - ' +
                    '{$START_TAG_SPAN_1}{$ICU_1}{$CLOSE_TAG_SPAN}')]: '{$START_TAG_SPAN_1}{$ICU}{$CLOSE_TAG_SPAN} - {$START_TAG_SPAN_1}{$ICU_1}{$CLOSE_TAG_SPAN}',
            });
            const fixture = initWithTemplate(AppComp, `<div i18n><span>{count, plural,
        =0 {no <b>emails</b>!}
        =1 {one <i>email</i>}
        other {{{count}} <span title="{{name}}">emails</span>}
      }</span> - <span>{name, select,
        other {({{name}})}
      }</span></div>`);
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div>` +
                `<span>aucun <b>email</b>!<!--ICU ${view_1.HEADER_OFFSET + 1}:0--></span>` +
                ` - ` +
                `<span>(Angular)<!--ICU ${view_1.HEADER_OFFSET + 1}:3--></span>` +
                `</div>`);
            fixture.componentRef.instance.count = 4;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div>` +
                `<span>4 <span title="Angular">emails</span><!--ICU ${view_1.HEADER_OFFSET + 1}:0--></span>` +
                ` - ` +
                `<span>(Angular)<!--ICU ${view_1.HEADER_OFFSET + 1}:3--></span>` +
                `</div>`);
            fixture.componentRef.instance.count = 0;
            fixture.componentRef.instance.name = 'John';
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div>` +
                `<span>aucun <b>email</b>!<!--ICU ${view_1.HEADER_OFFSET + 1}:0--></span>` +
                ` - ` +
                `<span>(John)<!--ICU ${view_1.HEADER_OFFSET + 1}:3--></span>` +
                `</div>`);
        });
        it('inside template directives', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{$START_TAG_SPAN}{$ICU}{$CLOSE_TAG_SPAN}')]: '{$START_TAG_SPAN}{$ICU}{$CLOSE_TAG_SPAN}',
                [(0, compiler_1.computeMsgId)('{VAR_SELECT, select, other {({INTERPOLATION})}}')]: '{VAR_SELECT, select, other {({INTERPOLATION})}}',
            });
            const fixture = initWithTemplate(AppComp, `<div i18n><span *ngIf="visible">{name, select,
        other {({{name}})}
      }</span></div>`);
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div><span>(Angular)<!--ICU ${view_1.HEADER_OFFSET + 0}:0--></span><!--bindings={
  "ng-reflect-ng-if": "true"
}--></div>`);
            fixture.componentRef.instance.visible = false;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div><!--bindings={
  "ng-reflect-ng-if": "false"
}--></div>`);
        });
        it('inside ng-container', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{VAR_SELECT, select, other {({INTERPOLATION})}}')]: '{VAR_SELECT, select, other {({INTERPOLATION})}}',
            });
            const fixture = initWithTemplate(AppComp, `<ng-container i18n>{name, select,
        other {({{name}})}
      }</ng-container>`);
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`(Angular)<!--ICU ${view_1.HEADER_OFFSET + 1}:0--><!--ng-container-->`);
        });
        it('inside <ng-template>', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{VAR_SELECT, select, 10 {ten} 20 {twenty} other {other}}')]: '{VAR_SELECT, select, 10 {dix} 20 {vingt} other {autre}}',
            });
            const fixture = initWithTemplate(AppComp, `
        <ng-template i18n tplRef>` +
                `{count, select, 10 {ten} 20 {twenty} other {other}}` +
                `</ng-template>
      `);
            const element = fixture.nativeElement;
            (0, matchers_1.expect)(element).toHaveText('autre');
        });
        it('nested', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{VAR_PLURAL, plural, =0 {zero} other {{INTERPOLATION} {VAR_SELECT, select, cat {cats} dog {dogs} other {animals}}!}}', '')]: '{VAR_PLURAL, plural, =0 {zero} other {{INTERPOLATION} {VAR_SELECT, select, cat {chats} dog {chiens} other {animaux}}!}}',
            });
            const fixture = initWithTemplate(AppComp, `<div i18n>{count, plural,
        =0 {zero}
        other {{{count}} {name, select,
                       cat {cats}
                       dog {dogs}
                       other {animals}
                     }!}
      }</div>`);
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div>zero<!--ICU ${view_1.HEADER_OFFSET + 1}:1--></div>`);
            fixture.componentRef.instance.count = 4;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div>4 animaux<!--nested ICU 0-->!<!--ICU ${view_1.HEADER_OFFSET + 1}:1--></div>`);
        });
        it('nested with interpolations in "other" blocks', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{VAR_PLURAL, plural, =0 {zero} =2 {{INTERPOLATION} {VAR_SELECT, select, cat {cats} dog {dogs} other {animals}}!} other {other - {INTERPOLATION}}}', '')]: '{VAR_PLURAL, plural, =0 {zero} =2 {{INTERPOLATION} {VAR_SELECT, select, cat {chats} dog {chiens} other {animaux}}!} other {autre - {INTERPOLATION}}}',
            });
            const fixture = initWithTemplate(AppComp, `<div i18n>{count, plural,
        =0 {zero}
        =2 {{{count}} {name, select,
                       cat {cats}
                       dog {dogs}
                       other {animals}
                     }!}
        other {other - {{count}}}
      }</div>`);
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div>zero<!--ICU ${view_1.HEADER_OFFSET + 1}:1--></div>`);
            fixture.componentRef.instance.count = 2;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div>2 animaux<!--nested ICU 0-->!<!--ICU ${view_1.HEADER_OFFSET + 1}:1--></div>`);
            fixture.componentRef.instance.count = 4;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div>autre - 4<!--ICU ${view_1.HEADER_OFFSET + 1}:1--></div>`);
        });
        it('should return the correct plural form for ICU expressions when using "ro" locale', () => {
            // The "ro" locale has a complex plural function that can handle muliple options
            // (and string inputs)
            //
            // function plural(n: number): number {
            //   let i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, '').length;
            //   if (i === 1 && v === 0) return 1;
            //   if (!(v === 0) || n === 0 ||
            //       !(n === 1) && n % 100 === Math.floor(n % 100) && n % 100 >= 1 && n % 100 <= 19)
            //     return 3;
            //   return 5;
            // }
            //
            // Compare this to the "es" locale in the next test
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{VAR_PLURAL, plural, =0 {no email} =one {one email} =few {a few emails} =other {lots of emails}}')]: '{VAR_PLURAL, plural, =0 {no email} =one {one email} =few {a few emails} =other {lots of emails}}',
            });
            (0, common_1.registerLocaleData)(ro_1.default);
            testing_1.TestBed.configureTestingModule({ providers: [{ provide: core_1.LOCALE_ID, useValue: 'ro' }] });
            // We could also use `TestBed.overrideProvider(LOCALE_ID, {useValue: 'ro'});`
            const fixture = initWithTemplate(AppComp, `
          {count, plural,
            =0 {no email}
            =one {one email}
            =few {a few emails}
            =other {lots of emails}
          }`);
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`no email<!--ICU ${view_1.HEADER_OFFSET + 0}:0-->`);
            // Change detection cycle, no model changes
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`no email<!--ICU ${view_1.HEADER_OFFSET + 0}:0-->`);
            fixture.componentInstance.count = 3;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`a few emails<!--ICU ${view_1.HEADER_OFFSET + 0}:0-->`);
            fixture.componentInstance.count = 1;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`one email<!--ICU ${view_1.HEADER_OFFSET + 0}:0-->`);
            fixture.componentInstance.count = 10;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`a few emails<!--ICU ${view_1.HEADER_OFFSET + 0}:0-->`);
            fixture.componentInstance.count = 20;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`lots of emails<!--ICU ${view_1.HEADER_OFFSET + 0}:0-->`);
            fixture.componentInstance.count = 0;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`no email<!--ICU ${view_1.HEADER_OFFSET + 0}:0-->`);
        });
        it(`should return the correct plural form for ICU expressions when using "es" locale`, () => {
            // The "es" locale has a simple plural function that can only handle a few options
            // (and not string inputs)
            //
            // function plural(n: number): number {
            //   if (n === 1) return 1;
            //   return 5;
            // }
            //
            // Compare this to the "ro" locale in the previous test
            const icuMessage = '{VAR_PLURAL, plural, =0 {no email} =one ' +
                '{one email} =few {a few emails} =other {lots of emails}}';
            (0, localize_1.loadTranslations)({ [(0, compiler_1.computeMsgId)(icuMessage)]: icuMessage });
            (0, common_1.registerLocaleData)(es_1.default);
            testing_1.TestBed.configureTestingModule({ providers: [{ provide: core_1.LOCALE_ID, useValue: 'es' }] });
            // We could also use `TestBed.overrideProvider(LOCALE_ID, {useValue: 'es'});`
            const fixture = initWithTemplate(AppComp, `
          {count, plural,
            =0 {no email}
            =one {one email}
            =few {a few emails}
            =other {lots of emails}
          }`);
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`no email<!--ICU ${view_1.HEADER_OFFSET + 0}:0-->`);
            // Change detection cycle, no model changes
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`no email<!--ICU ${view_1.HEADER_OFFSET + 0}:0-->`);
            fixture.componentInstance.count = 3;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`lots of emails<!--ICU ${view_1.HEADER_OFFSET + 0}:0-->`);
            fixture.componentInstance.count = 1;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`one email<!--ICU ${view_1.HEADER_OFFSET + 0}:0-->`);
            fixture.componentInstance.count = 10;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`lots of emails<!--ICU ${view_1.HEADER_OFFSET + 0}:0-->`);
            fixture.componentInstance.count = 20;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`lots of emails<!--ICU ${view_1.HEADER_OFFSET + 0}:0-->`);
            fixture.componentInstance.count = 0;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`no email<!--ICU ${view_1.HEADER_OFFSET + 0}:0-->`);
        });
        it('projection', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{VAR_PLURAL, plural, =1 {one} other {at least {INTERPOLATION} .}}')]: '{VAR_PLURAL, plural, =1 {one} other {at least {INTERPOLATION} .}}',
            });
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: '<div><ng-content></ng-content></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Child = _classThis = class {
                };
                __setFunctionName(_classThis, "Child");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Child = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Child = _classThis;
            })();
            let Parent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'parent',
                        template: `
      <child i18n>{
        value // i18n(ph = "blah"),
        plural,
         =1 {one}
        other {at least {{value}} .}
      }</child>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
                    constructor() {
                        this.value = 3;
                    }
                };
                __setFunctionName(_classThis, "Parent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Parent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Parent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [Parent, Child] });
            const fixture = testing_1.TestBed.createComponent(Parent);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toContain('at least');
        });
        it('with empty values', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{VAR_SELECT, select, 10 {} 20 {twenty} other {other}}')]: '{VAR_SELECT, select, 10 {} 20 {twenty} other {other}}',
            });
            const fixture = initWithTemplate(AppComp, `{count, select, 10 {} 20 {twenty} other {other}}`);
            const element = fixture.nativeElement;
            (0, matchers_1.expect)(element).toHaveText('other');
        });
        it('inside a container when creating a view via vcr.createEmbeddedView', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{VAR_PLURAL, plural, =1 {ONE} other {OTHER}}')]: '{VAR_PLURAL, plural, =1 {ONE} other {OTHER}}',
            });
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[someDir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                    constructor(viewContainerRef, templateRef) {
                        this.viewContainerRef = viewContainerRef;
                        this.templateRef = templateRef;
                    }
                    ngOnInit() {
                        this.viewContainerRef.createEmbeddedView(this.templateRef);
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-cmp',
                        template: `
              <div *someDir>
                <ng-content></ng-content>
              </div>
            `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Cmp = _classThis = class {
                };
                __setFunctionName(_classThis, "Cmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Cmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Cmp = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-app',
                        template: `
            <my-cmp i18n="test" *ngIf="condition">{
              count,
              plural,
              =1 {ONE}
              other {OTHER}
            }</my-cmp>
          `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.count = 1;
                        this.condition = true;
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [App, Cmp, Dir],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.nativeElement.innerHTML).toContain(`<my-cmp><div>ONE<!--ICU ${view_1.HEADER_OFFSET + 1}:0--></div><!--container--></my-cmp>`);
            fixture.componentRef.instance.count = 2;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.nativeElement.innerHTML).toContain(`<my-cmp><div>OTHER<!--ICU ${view_1.HEADER_OFFSET + 1}:0--></div><!--container--></my-cmp>`);
            // destroy component
            fixture.componentInstance.condition = false;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.nativeElement.textContent).toBe('');
            // render it again and also change ICU case
            fixture.componentInstance.condition = true;
            fixture.componentInstance.count = 1;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.nativeElement.innerHTML).toContain(`<my-cmp><div>ONE<!--ICU ${view_1.HEADER_OFFSET + 1}:0--></div><!--container--></my-cmp>`);
        });
        it('with nested ICU expression and inside a container when creating a view via vcr.createEmbeddedView', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{VAR_PLURAL, plural, =1 {ONE} other {{INTERPOLATION} ' +
                    '{VAR_SELECT, select, cat {cats} dog {dogs} other {animals}}!}}')]: '{VAR_PLURAL, plural, =1 {ONE} other {{INTERPOLATION} ' +
                    '{VAR_SELECT, select, cat {cats} dog {dogs} other {animals}}!}}',
            });
            let dir = null;
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[someDir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                    constructor(viewContainerRef, templateRef) {
                        this.viewContainerRef = viewContainerRef;
                        this.templateRef = templateRef;
                        dir = this;
                    }
                    attachEmbeddedView() {
                        this.viewContainerRef.createEmbeddedView(this.templateRef);
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-cmp',
                        template: `
              <div *someDir>
                <ng-content></ng-content>
              </div>
            `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Cmp = _classThis = class {
                };
                __setFunctionName(_classThis, "Cmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Cmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Cmp = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-app',
                        template: `
            <my-cmp i18n="test">{
              count,
              plural,
              =1 {ONE}
              other {{{count}} {name, select,
                cat {cats}
                dog {dogs}
                other {animals}
              }!}
            }</my-cmp>
          `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                    constructor() {
                        this.count = 1;
                    }
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [App, Cmp, Dir],
            });
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.componentRef.instance.count = 2;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.nativeElement.innerHTML).toBe('<my-cmp><!--container--></my-cmp>');
            dir.attachEmbeddedView();
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.nativeElement.innerHTML).toBe(`<my-cmp><div>2 animals<!--nested ICU 0-->!<!--ICU ${view_1.HEADER_OFFSET + 1}:1--></div><!--container--></my-cmp>`);
            fixture.componentRef.instance.count = 1;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.nativeElement.innerHTML).toBe(`<my-cmp><div>ONE<!--ICU ${view_1.HEADER_OFFSET + 1}:1--></div><!--container--></my-cmp>`);
        });
        it('with nested containers', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{VAR_SELECT, select, A {A } B {B } other {C }}')]: '{VAR_SELECT, select, A {A } B {B } other {C }}',
                [(0, compiler_1.computeMsgId)('{VAR_SELECT, select, A1 {A1 } B1 {B1 } other {C1 }}')]: '{VAR_SELECT, select, A1 {A1 } B1 {B1 } other {C1 }}',
                [(0, compiler_1.computeMsgId)(' {$ICU} ')]: ' {$ICU} ',
            });
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: `
        <ng-container [ngSwitch]="visible">
          <ng-container *ngSwitchCase="isVisible()" i18n>
            {type, select, A { A } B { B } other { C }}
          </ng-container>
          <ng-container *ngSwitchCase="!isVisible()" i18n>
            {type, select, A1 { A1 } B1 { B1 } other { C1 }}
          </ng-container>
        </ng-container>
      `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Comp = _classThis = class {
                    constructor() {
                        this.type = 'A';
                        this.visible = true;
                    }
                    isVisible() {
                        return true;
                    }
                };
                __setFunctionName(_classThis, "Comp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Comp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Comp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [Comp] });
            const fixture = testing_1.TestBed.createComponent(Comp);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.nativeElement.innerHTML).toContain('A');
            fixture.componentInstance.visible = false;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.nativeElement.innerHTML).not.toContain('A');
            (0, matchers_1.expect)(fixture.debugElement.nativeElement.innerHTML).toContain('C1');
        });
        it('with named interpolations', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{VAR_SELECT, select, A {A - {PH_A}} ' +
                    'B {B - {PH_B}} other {other - {PH_WITH_SPACES}}}')]: '{VAR_SELECT, select, A {A (translated) - {PH_A}} ' +
                    'B {B (translated) - {PH_B}} other {other (translated) - {PH_WITH_SPACES}}}',
            });
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: `
          <ng-container i18n>{
            type,
            select,
              A {A - {{ typeA // i18n(ph="PH_A") }}}
              B {B - {{ typeB // i18n(ph="PH_B") }}}
              other {other - {{ typeC // i18n(ph="PH WITH SPACES") }}}
          }</ng-container>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Comp = _classThis = class {
                    constructor() {
                        this.type = 'A';
                        this.typeA = 'Type A';
                        this.typeB = 'Type B';
                        this.typeC = 'Type C';
                    }
                };
                __setFunctionName(_classThis, "Comp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Comp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Comp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [Comp] });
            const fixture = testing_1.TestBed.createComponent(Comp);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.nativeElement.innerHTML).toContain('A (translated) - Type A');
            fixture.componentInstance.type = 'C'; // trigger "other" case
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.nativeElement.innerHTML).not.toContain('A (translated) - Type A');
            (0, matchers_1.expect)(fixture.debugElement.nativeElement.innerHTML).toContain('other (translated) - Type C');
        });
        it('should work inside an ngTemplateOutlet inside an ngFor', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{VAR_SELECT, select, A {A } B {B } other {other - {PH_WITH_SPACES}}}')]: '{VAR_SELECT, select, A {A } B {B } other {other - {PH_WITH_SPACES}}}',
                [(0, compiler_1.computeMsgId)('{$ICU} ')]: '{$ICU} ',
            });
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app',
                        template: `
          <ng-template #myTemp i18n let-type>{
            type,
            select,
            A {A }
            B {B }
            other {other - {{ typeC // i18n(ph="PH WITH SPACES") }}}
          }
          </ng-template>

          <div *ngFor="let type of types">
            <ng-container *ngTemplateOutlet="myTemp; context: {$implicit: type}">
            </ng-container>
          </div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                    constructor() {
                        this.types = ['A', 'B', 'C'];
                    }
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [AppComponent] });
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.nativeElement.innerHTML).toContain('A');
            (0, matchers_1.expect)(fixture.debugElement.nativeElement.innerHTML).toContain('B');
        });
        it('should use metadata from container element if a message is a single ICU', () => {
            (0, localize_1.loadTranslations)({ idA: "{VAR_SELECT, select, 1 {un} other {plus d'un}}" });
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app',
                        template: `
          <div i18n="@@idA">{count, select, 1 {one} other {more than one}}</div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                    constructor() {
                        this.count = 2;
                    }
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [AppComponent] });
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.nativeElement.innerHTML).toContain("plus d'un");
        });
        it('should support ICUs without "other" cases', () => {
            (0, localize_1.loadTranslations)({
                idA: '{VAR_SELECT, select, 1 {un (select)} 2 {deux (select)}}',
                idB: '{VAR_PLURAL, plural, =1 {un (plural)} =2 {deux (plural)}}',
            });
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app',
                        template: `
          <div i18n="@@idA">{count, select, 1 {one (select)} 2 {two (select)}}</div> -
          <div i18n="@@idB">{count, plural, =1 {one (plural)} =2 {two (plural)}}</div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                    constructor() {
                        this.count = 1;
                    }
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [AppComponent] });
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('un (select) - un (plural)');
            fixture.componentInstance.count = 3;
            fixture.detectChanges();
            // there is no ICU case for count=3
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toBe('-');
            fixture.componentInstance.count = 4;
            fixture.detectChanges();
            // there is no ICU case for count=4, making sure content is still empty
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toBe('-');
            fixture.componentInstance.count = 2;
            fixture.detectChanges();
            // check switching to an existing case after processing an ICU without matching case
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toBe('deux (select) - deux (plural)');
            fixture.componentInstance.count = 1;
            fixture.detectChanges();
            // check that we can go back to the first ICU case
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('un (select) - un (plural)');
        });
        it('should support nested ICUs without "other" cases', () => {
            (0, localize_1.loadTranslations)({
                idA: '{VAR_SELECT_1, select, A {{VAR_SELECT, select, ' +
                    '1 {un (select)} 2 {deux (select)}}} other {}}',
                idB: '{VAR_SELECT, select, A {{VAR_PLURAL, plural, ' +
                    '=1 {un (plural)} =2 {deux (plural)}}} other {}}',
            });
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app',
                        template: `
          <div i18n="@@idA">{
            type, select,
              A {{count, select, 1 {one (select)} 2 {two (select)}}}
              other {}
          }</div> -
          <div i18n="@@idB">{
            type, select,
              A {{count, plural, =1 {one (plural)} =2 {two (plural)}}}
              other {}
          }</div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                    constructor() {
                        this.type = 'A';
                        this.count = 1;
                    }
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [AppComponent] });
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('un (select) - un (plural)');
            fixture.componentInstance.count = 3;
            fixture.detectChanges();
            // there is no case for count=3 in nested ICU
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toBe('-');
            fixture.componentInstance.count = 4;
            fixture.detectChanges();
            // there is no case for count=4 in nested ICU, making sure content is still empty
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toBe('-');
            fixture.componentInstance.count = 2;
            fixture.detectChanges();
            // check switching to an existing case after processing nested ICU without matching
            // case
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toBe('deux (select) - deux (plural)');
            fixture.componentInstance.count = 1;
            fixture.detectChanges();
            // check that we can go back to the first case in nested ICU
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('un (select) - un (plural)');
            fixture.componentInstance.type = 'B';
            fixture.detectChanges();
            // check that nested ICU is removed if root ICU case has changed
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toBe('-');
        });
        it('should support ICUs with pipes', () => {
            (0, localize_1.loadTranslations)({
                idA: '{VAR_SELECT, select, 1 {{INTERPOLATION} article} 2 {deux articles}}',
            });
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app',
                        template: `
          <div i18n="@@idA">{count$ | async, select, 1 {{{count$ | async}} item} 2 {two items}}</div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                    constructor() {
                        this.count$ = new rxjs_1.BehaviorSubject(1);
                    }
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                imports: [common_1.CommonModule],
                declarations: [AppComponent],
            });
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('1 article');
            fixture.componentInstance.count$.next(3);
            fixture.detectChanges();
            // there is no ICU case for count=3, expecting empty content
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toBe('');
            fixture.componentInstance.count$.next(2);
            fixture.detectChanges();
            // checking the second ICU case
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toBe('deux articles');
        });
        it('should handle select expressions without an `other` parameter inside a template', () => {
            const fixture = initWithTemplate(AppComp, `
        <ng-container *ngFor="let item of items">{item.value, select, 0 {A} 1 {B} 2 {C}}</ng-container>
      `);
            fixture.componentInstance.items = [{ value: 0 }, { value: 1 }, { value: 1337 }];
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toBe('AB');
            fixture.componentInstance.items[0].value = 2;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toBe('CB');
        });
        it('should render an element whose case did not match initially', () => {
            const fixture = initWithTemplate(AppComp, `
        <p *ngFor="let item of items">{item.value, select, 0 {A} 1 {B} 2 {C}}</p>
      `);
            fixture.componentInstance.items = [{ value: 0 }, { value: 1 }, { value: 1337 }];
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toBe('AB');
            fixture.componentInstance.items[2].value = 2;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toBe('ABC');
        });
        it('should remove an element whose case matched initially, but does not anymore', () => {
            const fixture = initWithTemplate(AppComp, `
        <p *ngFor="let item of items">{item.value, select, 0 {A} 1 {B} 2 {C}}</p>
      `);
            fixture.componentInstance.items = [{ value: 0 }, { value: 1 }];
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toBe('AB');
            fixture.componentInstance.items[0].value = 1337;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent.trim()).toBe('B');
        });
    });
    describe('should support attributes', () => {
        it('text', () => {
            (0, localize_1.loadTranslations)({ [(0, compiler_1.computeMsgId)('text')]: 'texte' });
            const fixture = initWithTemplate(AppComp, `<div i18n i18n-title title='text'></div>`);
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div title="texte"></div>`);
        });
        it('interpolations', () => {
            (0, localize_1.loadTranslations)({ [(0, compiler_1.computeMsgId)('hello {$INTERPOLATION}')]: 'bonjour {$INTERPOLATION}' });
            const fixture = initWithTemplate(AppComp, `<div i18n i18n-title title="hello {{name}}"></div>`);
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div title="bonjour Angular"></div>`);
            fixture.componentRef.instance.name = 'John';
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div title="bonjour John"></div>`);
        });
        it('with pipes', () => {
            (0, localize_1.loadTranslations)({ [(0, compiler_1.computeMsgId)('hello {$INTERPOLATION}')]: 'bonjour {$INTERPOLATION}' });
            const fixture = initWithTemplate(AppComp, `<div i18n i18n-title title="hello {{name | uppercase}}"></div>`);
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div title="bonjour ANGULAR"></div>`);
        });
        it('multiple attributes', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('hello {$INTERPOLATION} - {$INTERPOLATION_1}')]: 'bonjour {$INTERPOLATION} - {$INTERPOLATION_1}',
                [(0, compiler_1.computeMsgId)('bye {$INTERPOLATION} - {$INTERPOLATION_1}')]: 'au revoir {$INTERPOLATION} - {$INTERPOLATION_1}',
            });
            const fixture = initWithTemplate(AppComp, `<input i18n i18n-title title="hello {{name}} - {{count}}" i18n-placeholder placeholder="bye {{count}} - {{name}}">`);
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<input title="bonjour Angular - 0" placeholder="au revoir 0 - Angular">`);
            fixture.componentRef.instance.name = 'John';
            fixture.componentRef.instance.count = 5;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<input title="bonjour John - 5" placeholder="au revoir 5 - John">`);
        });
        it('on removed elements', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('text')]: 'texte',
                [(0, compiler_1.computeMsgId)('{$START_TAG_SPAN}content{$CLOSE_TAG_SPAN}')]: 'contenu',
            });
            const fixture = initWithTemplate(AppComp, `<div i18n><span i18n-title title="text">content</span></div>`);
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div>contenu</div>`);
        });
        it('with custom interpolation config', () => {
            (0, localize_1.loadTranslations)({ [(0, compiler_1.computeMsgId)('Hello {$INTERPOLATION}', 'm')]: 'Bonjour {$INTERPOLATION}' });
            const interpolation = ['{%', '%}'];
            testing_1.TestBed.overrideComponent(AppComp, { set: { interpolation } });
            const fixture = initWithTemplate(AppComp, `<div i18n-title="m|d" title="Hello {% name %}"></div>`);
            const element = fixture.nativeElement.firstChild;
            (0, matchers_1.expect)(element.title).toBe('Bonjour Angular');
        });
        it('in nested template', () => {
            (0, localize_1.loadTranslations)({ [(0, compiler_1.computeMsgId)('Item {$INTERPOLATION}', 'm')]: 'Article {$INTERPOLATION}' });
            const fixture = initWithTemplate(AppComp, `
          <div *ngFor='let item of [1,2,3]'>
            <div i18n-title='m|d' title='Item {{ item }}'></div>
          </div>`);
            const element = fixture.nativeElement;
            for (let i = 0; i < element.children.length; i++) {
                const child = element.children[i];
                (0, matchers_1.expect)(child.innerHTML).toBe(`<div title="Article ${i + 1}"></div>`);
            }
        });
        it('should add i18n attributes on self-closing tags', () => {
            (0, localize_1.loadTranslations)({ [(0, compiler_1.computeMsgId)('Hello {$INTERPOLATION}')]: 'Bonjour {$INTERPOLATION}' });
            const fixture = initWithTemplate(AppComp, `<img src="logo.png" i18n-title title="Hello {{ name }}">`);
            const element = fixture.nativeElement.firstChild;
            (0, matchers_1.expect)(element.title).toBe('Bonjour Angular');
        });
        it('should process i18n attributes on explicit <ng-template> elements', () => {
            const titleDirInstances = [];
            (0, localize_1.loadTranslations)({ [(0, compiler_1.computeMsgId)('Hello')]: 'Bonjour' });
            let TitleDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[title]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _title_decorators;
                let _title_initializers = [];
                let _title_extraInitializers = [];
                var TitleDir = _classThis = class {
                    constructor() {
                        this.title = __runInitializers(this, _title_initializers, '');
                        __runInitializers(this, _title_extraInitializers);
                        titleDirInstances.push(this);
                    }
                };
                __setFunctionName(_classThis, "TitleDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _title_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TitleDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TitleDir = _classThis;
            })();
            let Comp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'comp',
                        template: '<ng-template i18n-title title="Hello"></ng-template>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Comp = _classThis = class {
                };
                __setFunctionName(_classThis, "Comp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Comp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Comp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [Comp, TitleDir],
            });
            const fixture = testing_1.TestBed.createComponent(Comp);
            fixture.detectChanges();
            // make sure we only match `TitleDir` once
            (0, matchers_1.expect)(titleDirInstances.length).toBe(1);
            (0, matchers_1.expect)(titleDirInstances[0].title).toBe('Bonjour');
        });
        it('should match directive only once in case i18n attrs are present on inline template', () => {
            const titleDirInstances = [];
            (0, localize_1.loadTranslations)({ [(0, compiler_1.computeMsgId)('Hello')]: 'Bonjour' });
            let TitleDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[title]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _title_decorators;
                let _title_initializers = [];
                let _title_extraInitializers = [];
                var TitleDir = _classThis = class {
                    constructor(elRef) {
                        this.elRef = elRef;
                        this.title = __runInitializers(this, _title_initializers, '');
                        __runInitializers(this, _title_extraInitializers);
                        this.elRef = elRef;
                        titleDirInstances.push(this);
                    }
                };
                __setFunctionName(_classThis, "TitleDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _title_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TitleDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TitleDir = _classThis;
            })();
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-cmp',
                        template: `
          <button *ngIf="true" i18n-title title="Hello"></button>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Cmp = _classThis = class {
                };
                __setFunctionName(_classThis, "Cmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Cmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Cmp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                imports: [common_1.CommonModule],
                declarations: [Cmp, TitleDir],
            });
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            // make sure we only match `TitleDir` once and on the right element
            (0, matchers_1.expect)(titleDirInstances.length).toBe(1);
            (0, matchers_1.expect)(titleDirInstances[0].elRef.nativeElement instanceof HTMLButtonElement).toBeTruthy();
            (0, matchers_1.expect)(titleDirInstances[0].title).toBe('Bonjour');
        });
        it('should support static i18n attributes on inline templates', () => {
            (0, localize_1.loadTranslations)({ [(0, compiler_1.computeMsgId)('Hello')]: 'Bonjour' });
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-cmp',
                        template: `
          <div *ngIf="true" i18n-title title="Hello"></div>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Cmp = _classThis = class {
                };
                __setFunctionName(_classThis, "Cmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Cmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Cmp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                imports: [common_1.CommonModule],
                declarations: [Cmp],
            });
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.firstChild.title).toBe('Bonjour');
        });
        it('should allow directive inputs (as an interpolated prop) on <ng-template>', () => {
            (0, localize_1.loadTranslations)({ [(0, compiler_1.computeMsgId)('Hello {$INTERPOLATION}')]: 'Bonjour {$INTERPOLATION}' });
            let dirInstance;
            let WithInput = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var WithInput = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, '');
                        __runInitializers(this, _dir_extraInitializers);
                        dirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "WithInput");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    WithInput = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return WithInput = _classThis;
            })();
            let TestComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-app',
                        template: '<ng-template i18n-dir dir="Hello {{ name }}"></ng-template>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComp = _classThis = class {
                    constructor() {
                        this.name = 'Angular';
                    }
                };
                __setFunctionName(_classThis, "TestComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestComp, WithInput] });
            const fixture = testing_1.TestBed.createComponent(TestComp);
            fixture.detectChanges();
            (0, matchers_1.expect)(dirInstance.dir).toBe('Bonjour Angular');
        });
        it('should allow directive inputs (as interpolated props)' +
            'on <ng-template> with structural directives present', () => {
            (0, localize_1.loadTranslations)({ [(0, compiler_1.computeMsgId)('Hello {$INTERPOLATION}')]: 'Bonjour {$INTERPOLATION}' });
            let dirInstance;
            let WithInput = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _dir_decorators;
                let _dir_initializers = [];
                let _dir_extraInitializers = [];
                var WithInput = _classThis = class {
                    constructor() {
                        this.dir = __runInitializers(this, _dir_initializers, '');
                        __runInitializers(this, _dir_extraInitializers);
                        dirInstance = this;
                    }
                };
                __setFunctionName(_classThis, "WithInput");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    WithInput = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return WithInput = _classThis;
            })();
            let TestComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-app',
                        template: '<ng-template *ngIf="true" i18n-dir dir="Hello {{ name }}"></ng-template>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComp = _classThis = class {
                    constructor() {
                        this.name = 'Angular';
                    }
                };
                __setFunctionName(_classThis, "TestComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TestComp, WithInput] });
            const fixture = testing_1.TestBed.createComponent(TestComp);
            fixture.detectChanges();
            (0, matchers_1.expect)(dirInstance.dir).toBe('Bonjour Angular');
        });
        it('should apply i18n attributes during second template pass', () => {
            (0, localize_1.loadTranslations)({ [(0, compiler_1.computeMsgId)('Set')]: 'Set' });
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[test]',
                        inputs: ['test'],
                        exportAs: 'dir',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let Other = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'other',
                        template: `<div i18n #ref="dir" test="Set" i18n-test="This is also a test"></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Other = _classThis = class {
                };
                __setFunctionName(_classThis, "Other");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Other = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Other = _classThis;
            })();
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'blah',
                        template: `
          <other></other>
          <other></other>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Cmp = _classThis = class {
                };
                __setFunctionName(_classThis, "Cmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Cmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Cmp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [Dir, Cmp, Other],
            });
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.debugElement.children[0].children[0].references['ref'].test).toBe('Set');
            (0, matchers_1.expect)(fixture.debugElement.children[1].children[0].references['ref'].test).toBe('Set');
        });
        it('with complex expressions', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{$INTERPOLATION} - {$INTERPOLATION_1} - {$INTERPOLATION_2}')]: '{$INTERPOLATION} - {$INTERPOLATION_1} - {$INTERPOLATION_2} (fr)',
            });
            const fixture = initWithTemplate(AppComp, `
        <div i18n-title title="{{ name | uppercase }} - {{ obj?.a?.b }} - {{ obj?.getA()?.b }}"></div>
      `);
            // the `obj` field is not yet defined, so 2nd and 3rd interpolations return empty
            // strings
            (0, matchers_1.expect)(fixture.nativeElement.firstChild.title).toEqual(`ANGULAR -  -  (fr)`);
            fixture.componentRef.instance.obj = {
                a: { b: 'value 1' },
                getA: () => ({ b: 'value 2' }),
            };
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.firstChild.title).toEqual(`ANGULAR - value 1 - value 2 (fr)`);
        });
        it('should support i18n attributes on <ng-container> elements', () => {
            (0, localize_1.loadTranslations)({ [(0, compiler_1.computeMsgId)('Hello', 'meaning')]: 'Bonjour' });
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[mydir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _mydir_decorators;
                let _mydir_initializers = [];
                let _mydir_extraInitializers = [];
                var Dir = _classThis = class {
                    constructor() {
                        this.mydir = __runInitializers(this, _mydir_initializers, '');
                        __runInitializers(this, _mydir_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _mydir_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _mydir_decorators, { kind: "field", name: "mydir", static: false, private: false, access: { has: obj => "mydir" in obj, get: obj => obj.mydir, set: (obj, value) => { obj.mydir = value; } }, metadata: _metadata }, _mydir_initializers, _mydir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-cmp',
                        template: `
          <ng-container i18n-mydir="meaning|description" mydir="Hello"></ng-container>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Cmp = _classThis = class {
                };
                __setFunctionName(_classThis, "Cmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Cmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Cmp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [Cmp, Dir],
            });
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            const dir = fixture.debugElement.childNodes[0].injector.get(Dir);
            (0, matchers_1.expect)(dir.mydir).toEqual('Bonjour');
        });
    });
    describe('empty translations', () => {
        it('should replace existing text content with empty translation', () => {
            (0, localize_1.loadTranslations)({ [(0, compiler_1.computeMsgId)('Some Text')]: '' });
            const fixture = initWithTemplate(AppComp, '<div i18n>Some Text</div>');
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('');
        });
        it('should replace existing DOM elements with empty translation', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)(' Start {$START_TAG_DIV}DIV{$CLOSE_TAG_DIV}' +
                    '{$START_TAG_SPAN}SPAN{$CLOSE_TAG_SPAN} End ')]: '',
            });
            const fixture = initWithTemplate(AppComp, `
        <div i18n>
          Start
          <div>DIV</div>
          <span>SPAN</span>
          End
        </div>
      `);
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('');
        });
        it('should replace existing ICU content with empty translation', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{VAR_PLURAL, plural, =0 {zero} other {more than zero}}')]: '',
            });
            const fixture = initWithTemplate(AppComp, `
        <div i18n>{count, plural, =0 {zero} other {more than zero}}</div>
      `);
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('');
        });
    });
    it('should work with directives and host bindings', () => {
        let directiveInstances = [];
        let ClsDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[test]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _klass_decorators;
            let _klass_initializers = [];
            let _klass_extraInitializers = [];
            var ClsDir = _classThis = class {
                constructor() {
                    this.klass = __runInitializers(this, _klass_initializers, 'foo');
                    __runInitializers(this, _klass_extraInitializers);
                    directiveInstances.push(this);
                }
            };
            __setFunctionName(_classThis, "ClsDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _klass_decorators = [(0, core_1.HostBinding)('className')];
                __esDecorate(null, null, _klass_decorators, { kind: "field", name: "klass", static: false, private: false, access: { has: obj => "klass" in obj, get: obj => obj.klass, set: (obj, value) => { obj.klass = value; } }, metadata: _metadata }, _klass_initializers, _klass_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ClsDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ClsDir = _classThis;
        })();
        let MyApp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: `my-app`,
                    template: `
      <div i18n test i18n-title title="start {{exp1}} middle {{exp2}} end" outer>
         trad: {exp1, plural,
              =0 {no <b title="none">emails</b>!}
              =1 {one <i>email</i>}
              other {{{exp1}} emails}
         }
      </div><div test inner></div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyApp = _classThis = class {
                constructor() {
                    this.exp1 = 1;
                    this.exp2 = 2;
                }
            };
            __setFunctionName(_classThis, "MyApp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyApp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyApp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [ClsDir, MyApp] });
        (0, localize_1.loadTranslations)({
            // Note that this translation switches the order of the expressions!
            [(0, compiler_1.computeMsgId)('start {$INTERPOLATION} middle {$INTERPOLATION_1} end')]: 'début {$INTERPOLATION_1} milieu {$INTERPOLATION} fin',
            [(0, compiler_1.computeMsgId)('{VAR_PLURAL, plural, =0 {no {START_BOLD_TEXT}emails{CLOSE_BOLD_TEXT}!} =1 {one {START_ITALIC_TEXT}email{CLOSE_ITALIC_TEXT}} other {{INTERPOLATION} emails}}')]: '{VAR_PLURAL, plural, =0 {aucun {START_BOLD_TEXT}email{CLOSE_BOLD_TEXT}!} =1 {un {START_ITALIC_TEXT}email{CLOSE_ITALIC_TEXT}} other {{INTERPOLATION} emails}}',
            [(0, compiler_1.computeMsgId)(' trad: {$ICU} ')]: ' traduction: {$ICU} ',
        });
        const fixture = testing_1.TestBed.createComponent(MyApp);
        fixture.detectChanges();
        const outerDiv = fixture.nativeElement.querySelector('div[outer]');
        const innerDiv = fixture.nativeElement.querySelector('div[inner]');
        // Note that ideally we'd just compare the innerHTML here, but different browsers return
        // the order of attributes differently. E.g. most browsers preserve the declaration
        // order, but IE does not.
        (0, matchers_1.expect)(outerDiv.getAttribute('title')).toBe('début 2 milieu 1 fin');
        (0, matchers_1.expect)(outerDiv.getAttribute('class')).toBe('foo');
        (0, matchers_1.expect)(outerDiv.textContent.trim()).toBe('traduction: un email');
        (0, matchers_1.expect)(innerDiv.getAttribute('class')).toBe('foo');
        directiveInstances.forEach((instance) => (instance.klass = 'bar'));
        fixture.componentRef.instance.exp1 = 2;
        fixture.componentRef.instance.exp2 = 3;
        fixture.detectChanges();
        (0, matchers_1.expect)(outerDiv.getAttribute('title')).toBe('début 3 milieu 2 fin');
        (0, matchers_1.expect)(outerDiv.getAttribute('class')).toBe('bar');
        (0, matchers_1.expect)(outerDiv.textContent.trim()).toBe('traduction: 2 emails');
        (0, matchers_1.expect)(innerDiv.getAttribute('class')).toBe('bar');
    });
    it('should handle i18n attribute with directive inputs', () => {
        let calledTitle = false;
        let calledValue = false;
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _get_title_decorators;
            let _get_value_decorators;
            var MyComp = _classThis = class {
                constructor() {
                    this.t = __runInitializers(this, _instanceExtraInitializers);
                }
                get title() {
                    return this.t;
                }
                set title(title) {
                    calledTitle = true;
                    this.t = title;
                }
                get value() {
                    return this.val;
                }
                set value(value) {
                    calledValue = true;
                    this.val = value;
                }
            };
            __setFunctionName(_classThis, "MyComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _get_title_decorators = [(0, core_1.Input)()];
                _get_value_decorators = [(0, core_1.Input)()];
                __esDecorate(_classThis, null, _get_title_decorators, { kind: "getter", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(_classThis, null, _get_value_decorators, { kind: "getter", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value }, metadata: _metadata }, null, _instanceExtraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [AppComp, MyComp] });
        (0, localize_1.loadTranslations)({
            [(0, compiler_1.computeMsgId)('Hello {$INTERPOLATION}')]: 'Bonjour {$INTERPOLATION}',
            [(0, compiler_1.computeMsgId)('works')]: 'fonctionne',
        });
        const fixture = initWithTemplate(AppComp, `<my-comp i18n i18n-title title="works" i18n-value="hi" value="Hello {{name}}"></my-comp>`);
        fixture.detectChanges();
        const directive = fixture.debugElement.children[0].injector.get(MyComp);
        (0, matchers_1.expect)(calledValue).toEqual(true);
        (0, matchers_1.expect)(calledTitle).toEqual(true);
        (0, matchers_1.expect)(directive.value).toEqual(`Bonjour Angular`);
        (0, matchers_1.expect)(directive.title).toEqual(`fonctionne`);
    });
    it('should support adding/moving/removing nodes', () => {
        (0, localize_1.loadTranslations)({
            [(0, compiler_1.computeMsgId)('{$START_TAG_DIV2}{$CLOSE_TAG_DIV2}' +
                '{$START_TAG_DIV3}{$CLOSE_TAG_DIV3}' +
                '{$START_TAG_DIV4}{$CLOSE_TAG_DIV4}' +
                '{$START_TAG_DIV5}{$CLOSE_TAG_DIV5}' +
                '{$START_TAG_DIV6}{$CLOSE_TAG_DIV6}' +
                '{$START_TAG_DIV7}{$CLOSE_TAG_DIV7}' +
                '{$START_TAG_DIV8}{$CLOSE_TAG_DIV8}')]: '{$START_TAG_DIV2}{$CLOSE_TAG_DIV2}' +
                '{$START_TAG_DIV8}{$CLOSE_TAG_DIV8}' +
                '{$START_TAG_DIV4}{$CLOSE_TAG_DIV4}' +
                '{$START_TAG_DIV5}{$CLOSE_TAG_DIV5}Bonjour monde' +
                '{$START_TAG_DIV3}{$CLOSE_TAG_DIV3}' +
                '{$START_TAG_DIV7}{$CLOSE_TAG_DIV7}',
        });
        const fixture = initWithTemplate(AppComp, `
      <div i18n>
        <div2></div2>
        <div3></div3>
        <div4></div4>
        <div5></div5>
        <div6></div6>
        <div7></div7>
        <div8></div8>
      </div>`);
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div><div2></div2><div8></div8><div4></div4><div5></div5>Bonjour monde<div3></div3><div7></div7></div>`);
    });
    describe('projection', () => {
        it('should project the translations', () => {
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: '<p><ng-content></ng-content></p>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Child = _classThis = class {
                };
                __setFunctionName(_classThis, "Child");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Child = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Child = _classThis;
            })();
            let Parent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'parent',
                        template: `
            <div i18n>
              <child>I am projected from
                <b i18n-title title="Child of {{name}}">{{name}}<remove-me-1></remove-me-1></b>
                <remove-me-2></remove-me-2>
              </child>
              <remove-me-3></remove-me-3>
            </div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
                    constructor() {
                        this.name = 'Parent';
                    }
                };
                __setFunctionName(_classThis, "Parent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Parent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Parent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [Parent, Child] });
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('Child of {$INTERPOLATION}')]: 'Enfant de {$INTERPOLATION}',
                [(0, compiler_1.computeMsgId)('{$START_TAG_CHILD}I am projected from' +
                    ' {$START_BOLD_TEXT}{$INTERPOLATION}{$START_TAG_REMOVE_ME_1}{$CLOSE_TAG_REMOVE_ME_1}{$CLOSE_BOLD_TEXT}' +
                    '{$START_TAG_REMOVE_ME_2}{$CLOSE_TAG_REMOVE_ME_2}' +
                    '{$CLOSE_TAG_CHILD}' +
                    '{$START_TAG_REMOVE_ME_3}{$CLOSE_TAG_REMOVE_ME_3}')]: '{$START_TAG_CHILD}Je suis projeté depuis {$START_BOLD_TEXT}{$INTERPOLATION}{$CLOSE_BOLD_TEXT}{$CLOSE_TAG_CHILD}',
            });
            const fixture = testing_1.TestBed.createComponent(Parent);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div><child><p>Je suis projeté depuis <b title="Enfant de Parent">Parent</b></p></child></div>`);
        });
        it('should project a translated i18n block', () => {
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: '<p><ng-content></ng-content></p>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Child = _classThis = class {
                };
                __setFunctionName(_classThis, "Child");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Child = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Child = _classThis;
            })();
            let Parent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'parent',
                        template: `
          <div>
            <child>
              <any></any>
              <b i18n i18n-title title="Child of {{name}}">I am projected from {{name}}</b>
              <any></any>
            </child>
          </div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
                    constructor() {
                        this.name = 'Parent';
                    }
                };
                __setFunctionName(_classThis, "Parent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Parent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Parent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [Parent, Child] });
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('Child of {$INTERPOLATION}')]: 'Enfant de {$INTERPOLATION}',
                [(0, compiler_1.computeMsgId)('I am projected from {$INTERPOLATION}')]: 'Je suis projeté depuis {$INTERPOLATION}',
            });
            const fixture = testing_1.TestBed.createComponent(Parent);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div><child><p><any></any><b title="Enfant de Parent">Je suis projeté depuis Parent</b><any></any></p></child></div>`);
            // it should be able to render a new component with the same template code
            const fixture2 = testing_1.TestBed.createComponent(Parent);
            fixture2.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(fixture2.nativeElement.innerHTML);
            fixture2.componentRef.instance.name = 'Parent 2';
            fixture2.detectChanges();
            (0, matchers_1.expect)(fixture2.nativeElement.innerHTML).toEqual(`<div><child><p><any></any><b title="Enfant de Parent 2">Je suis projeté depuis Parent 2</b><any></any></p></child></div>`);
            // The first fixture should not have changed
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).not.toEqual(fixture2.nativeElement.innerHTML);
        });
        it('should re-project translations when multiple projections', () => {
            let GrandChild = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'grand-child',
                        template: '<div><ng-content></ng-content></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var GrandChild = _classThis = class {
                };
                __setFunctionName(_classThis, "GrandChild");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    GrandChild = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return GrandChild = _classThis;
            })();
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: '<grand-child><ng-content></ng-content></grand-child>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Child = _classThis = class {
                };
                __setFunctionName(_classThis, "Child");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Child = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Child = _classThis;
            })();
            let Parent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'parent',
                        template: `<child i18n><b>Hello</b> World!</child>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
                    constructor() {
                        this.name = 'Parent';
                    }
                };
                __setFunctionName(_classThis, "Parent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Parent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Parent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [Parent, Child, GrandChild] });
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{$START_BOLD_TEXT}Hello{$CLOSE_BOLD_TEXT} World!')]: '{$START_BOLD_TEXT}Bonjour{$CLOSE_BOLD_TEXT} monde!',
            });
            const fixture = testing_1.TestBed.createComponent(Parent);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual('<child><grand-child><div><b>Bonjour</b> monde!</div></grand-child></child>');
        });
        it('should be able to remove projected placeholders', () => {
            let GrandChild = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'grand-child',
                        template: '<div><ng-content></ng-content></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var GrandChild = _classThis = class {
                };
                __setFunctionName(_classThis, "GrandChild");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    GrandChild = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return GrandChild = _classThis;
            })();
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: '<grand-child><ng-content></ng-content></grand-child>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Child = _classThis = class {
                };
                __setFunctionName(_classThis, "Child");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Child = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Child = _classThis;
            })();
            let Parent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'parent',
                        template: `<child i18n><b>Hello</b> World!</child>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
                    constructor() {
                        this.name = 'Parent';
                    }
                };
                __setFunctionName(_classThis, "Parent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Parent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Parent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [Parent, Child, GrandChild] });
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{$START_BOLD_TEXT}Hello{$CLOSE_BOLD_TEXT} World!')]: 'Bonjour monde!',
            });
            const fixture = testing_1.TestBed.createComponent(Parent);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual('<child><grand-child><div>Bonjour monde!</div></grand-child></child>');
        });
        it('should project translations with selectors', () => {
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: `<ng-content select='span'></ng-content>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Child = _classThis = class {
                };
                __setFunctionName(_classThis, "Child");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Child = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Child = _classThis;
            })();
            let Parent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'parent',
                        template: `
          <child i18n>
            <span title="keepMe"></span>
            <span title="deleteMe"></span>
          </child>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
                };
                __setFunctionName(_classThis, "Parent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Parent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Parent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [Parent, Child] });
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{$START_TAG_SPAN}{$CLOSE_TAG_SPAN}{$START_TAG_SPAN_1}{$CLOSE_TAG_SPAN}')]: '{$START_TAG_SPAN}Contenu{$CLOSE_TAG_SPAN}',
            });
            const fixture = testing_1.TestBed.createComponent(Parent);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual('<child><span title="keepMe">Contenu</span></child>');
        });
        it('should project content in i18n blocks', () => {
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: `<div i18n>Content projected from <ng-content></ng-content></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Child = _classThis = class {
                };
                __setFunctionName(_classThis, "Child");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Child = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Child = _classThis;
            })();
            let Parent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'parent',
                        template: `<child>{{name}}</child>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
                    constructor() {
                        this.name = 'Parent';
                    }
                };
                __setFunctionName(_classThis, "Parent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Parent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Parent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [Parent, Child] });
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('Content projected from {$START_TAG_NG_CONTENT}{$CLOSE_TAG_NG_CONTENT}')]: 'Contenu projeté depuis {$START_TAG_NG_CONTENT}{$CLOSE_TAG_NG_CONTENT}',
            });
            const fixture = testing_1.TestBed.createComponent(Parent);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<child><div>Contenu projeté depuis Parent</div></child>`);
            fixture.componentRef.instance.name = 'Parent component';
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<child><div>Contenu projeté depuis Parent component</div></child>`);
        });
        it('should project content in i18n blocks with placeholders', () => {
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: `<div i18n>Content projected from <ng-content></ng-content></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Child = _classThis = class {
                };
                __setFunctionName(_classThis, "Child");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Child = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Child = _classThis;
            })();
            let Parent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'parent',
                        template: `<child><b>{{name}}</b></child>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
                    constructor() {
                        this.name = 'Parent';
                    }
                };
                __setFunctionName(_classThis, "Parent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Parent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Parent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [Parent, Child] });
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('Content projected from {$START_TAG_NG_CONTENT}{$CLOSE_TAG_NG_CONTENT}')]: '{$START_TAG_NG_CONTENT}{$CLOSE_TAG_NG_CONTENT} a projeté le contenu',
            });
            const fixture = testing_1.TestBed.createComponent(Parent);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<child><div><b>Parent</b> a projeté le contenu</div></child>`);
        });
        it('should project translated content in i18n blocks', () => {
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: `<div i18n>Child content <ng-content></ng-content></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Child = _classThis = class {
                };
                __setFunctionName(_classThis, "Child");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Child = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Child = _classThis;
            })();
            let Parent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'parent',
                        template: `<child i18n>and projection from {{name}}</child>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
                    constructor() {
                        this.name = 'Parent';
                    }
                };
                __setFunctionName(_classThis, "Parent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Parent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Parent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [Parent, Child] });
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('Child content {$START_TAG_NG_CONTENT}{$CLOSE_TAG_NG_CONTENT}')]: 'Contenu enfant {$START_TAG_NG_CONTENT}{$CLOSE_TAG_NG_CONTENT}',
                [(0, compiler_1.computeMsgId)('and projection from {$INTERPOLATION}')]: 'et projection depuis {$INTERPOLATION}',
            });
            const fixture = testing_1.TestBed.createComponent(Parent);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<child><div>Contenu enfant et projection depuis Parent</div></child>`);
        });
        it('should project bare ICU expressions', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{VAR_PLURAL, plural, =1 {one} other {at least {INTERPOLATION} .}}')]: '{VAR_PLURAL, plural, =1 {one} other {at least {INTERPOLATION} .}}',
            });
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: '<div><ng-content></ng-content></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Child = _classThis = class {
                };
                __setFunctionName(_classThis, "Child");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Child = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Child = _classThis;
            })();
            let Parent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'parent',
                        template: `
      <child i18n>{
        value // i18n(ph = "blah"),
        plural,
         =1 {one}
        other {at least {{value}} .}
      }</child>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
                    constructor() {
                        this.value = 3;
                    }
                };
                __setFunctionName(_classThis, "Parent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Parent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Parent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [Parent, Child] });
            const fixture = testing_1.TestBed.createComponent(Parent);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toContain('at least');
        });
        it('should project ICUs in i18n blocks', () => {
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: `<div i18n>Child content <ng-content></ng-content></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Child = _classThis = class {
                };
                __setFunctionName(_classThis, "Child");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Child = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Child = _classThis;
            })();
            let Parent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'parent',
                        template: `<child i18n>and projection from {name, select, angular {Angular} other {{{name}}}}</child>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
                    constructor() {
                        this.name = 'Parent';
                    }
                };
                __setFunctionName(_classThis, "Parent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Parent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Parent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [Parent, Child] });
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{VAR_SELECT, select, angular {Angular} other {{INTERPOLATION}}}')]: '{VAR_SELECT, select, angular {Angular} other {{INTERPOLATION}}}',
                [(0, compiler_1.computeMsgId)('Child content {$START_TAG_NG_CONTENT}{$CLOSE_TAG_NG_CONTENT}')]: 'Contenu enfant {$START_TAG_NG_CONTENT}{$CLOSE_TAG_NG_CONTENT}',
                [(0, compiler_1.computeMsgId)('and projection from {$ICU}')]: 'et projection depuis {$ICU}',
            });
            const fixture = testing_1.TestBed.createComponent(Parent);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<child><div>Contenu enfant et projection depuis Parent<!--ICU ${view_1.HEADER_OFFSET + 1}:0--></div></child>`);
            fixture.componentRef.instance.name = 'angular';
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<child><div>Contenu enfant et projection depuis Angular<!--ICU ${view_1.HEADER_OFFSET + 1}:0--></div></child>`);
        });
        it(`shouldn't project deleted projections in i18n blocks`, () => {
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: `<div i18n>Child content <ng-content></ng-content></div>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Child = _classThis = class {
                };
                __setFunctionName(_classThis, "Child");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Child = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Child = _classThis;
            })();
            let Parent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'parent',
                        template: `<child i18n>and projection from {{name}}</child>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
                    constructor() {
                        this.name = 'Parent';
                    }
                };
                __setFunctionName(_classThis, "Parent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Parent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Parent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [Parent, Child] });
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('Child content {$START_TAG_NG_CONTENT}{$CLOSE_TAG_NG_CONTENT}')]: 'Contenu enfant',
                [(0, compiler_1.computeMsgId)('and projection from {$INTERPOLATION}')]: 'et projection depuis {$INTERPOLATION}',
            });
            const fixture = testing_1.TestBed.createComponent(Parent);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<child><div>Contenu enfant</div></child>`);
        });
        it('should display/destroy projected i18n content', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{VAR_SELECT, select, A {A} B {B} other {other}}')]: '{VAR_SELECT, select, A {A} B {B} other {other}}',
            });
            let MyContentApp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app',
                        template: `
            <ng-container>(<ng-content></ng-content>)</ng-container>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyContentApp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyContentApp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyContentApp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyContentApp = _classThis;
            })();
            let MyApp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-app',
                        template: `
          <app i18n *ngIf="condition">{type, select, A {A} B {B} other {other}}</app>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyApp = _classThis = class {
                    constructor() {
                        this.type = 'A';
                        this.condition = true;
                    }
                };
                __setFunctionName(_classThis, "MyApp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyApp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyApp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyApp, MyContentApp] });
            const fixture = testing_1.TestBed.createComponent(MyApp);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toContain('(A)');
            // change `condition` to remove <app>
            fixture.componentInstance.condition = false;
            fixture.detectChanges();
            // should not contain 'A'
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toBe('');
            // display <app> again
            fixture.componentInstance.type = 'B';
            fixture.componentInstance.condition = true;
            fixture.detectChanges();
            // expect that 'B' is now displayed
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toContain('(B)');
        });
    });
    describe('queries', () => {
        function toHtml(element) {
            return element.innerHTML
                .replace(/\sng-reflect-\S*="[^"]*"/g, '')
                .replace(/<!--bindings=\{(\W.*\W\s*)?\}-->/g, '');
        }
        it('detached nodes should still be part of query', () => {
            let TextDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[text]',
                        inputs: ['text'],
                        exportAs: 'textDir',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TextDirective = _classThis = class {
                    constructor() { }
                };
                __setFunctionName(_classThis, "TextDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TextDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TextDirective = _classThis;
            })();
            let DivQuery = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'div-query',
                        template: '<ng-container #vc></ng-container>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _template_decorators;
                let _template_initializers = [];
                let _template_extraInitializers = [];
                let _vc_decorators;
                let _vc_initializers = [];
                let _vc_extraInitializers = [];
                let _query_decorators;
                let _query_initializers = [];
                let _query_extraInitializers = [];
                var DivQuery = _classThis = class {
                    create() {
                        this.vc.createEmbeddedView(this.template);
                    }
                    destroy() {
                        this.vc.clear();
                    }
                    constructor() {
                        this.template = __runInitializers(this, _template_initializers, void 0);
                        this.vc = (__runInitializers(this, _template_extraInitializers), __runInitializers(this, _vc_initializers, void 0));
                        this.query = (__runInitializers(this, _vc_extraInitializers), __runInitializers(this, _query_initializers, void 0));
                        __runInitializers(this, _query_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "DivQuery");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _template_decorators = [(0, core_1.ContentChild)(core_1.TemplateRef, { static: true })];
                    _vc_decorators = [(0, core_1.ViewChild)('vc', { read: core_1.ViewContainerRef, static: true })];
                    _query_decorators = [(0, core_1.ContentChildren)(TextDirective, { descendants: true })];
                    __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
                    __esDecorate(null, null, _vc_decorators, { kind: "field", name: "vc", static: false, private: false, access: { has: obj => "vc" in obj, get: obj => obj.vc, set: (obj, value) => { obj.vc = value; } }, metadata: _metadata }, _vc_initializers, _vc_extraInitializers);
                    __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DivQuery = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DivQuery = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [TextDirective, DivQuery] });
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{$START_TAG_NG_TEMPLATE}{$START_TAG_DIV_1}' +
                    '{$START_TAG_DIV}' +
                    '{$START_TAG_SPAN}Content{$CLOSE_TAG_SPAN}' +
                    '{$CLOSE_TAG_DIV}' +
                    '{$CLOSE_TAG_DIV}{$CLOSE_TAG_NG_TEMPLATE}')]: '{$START_TAG_NG_TEMPLATE}Contenu{$CLOSE_TAG_NG_TEMPLATE}',
            });
            const fixture = initWithTemplate(AppComp, `
          <div-query #q i18n>
            <ng-template>
              <div>
                <div *ngIf="visible">
                  <span text="1">Content</span>
                </div>
              </div>
            </ng-template>
          </div-query>
        `);
            const q = fixture.debugElement.children[0].references['q'];
            (0, matchers_1.expect)(q.query.length).toEqual(0);
            // Create embedded view
            q.create();
            fixture.detectChanges();
            (0, matchers_1.expect)(q.query.length).toEqual(1);
            (0, matchers_1.expect)(toHtml(fixture.nativeElement)).toEqual(`<div-query>Contenu<!--ng-container--></div-query>`);
            // Disable ng-if
            fixture.componentInstance.visible = false;
            fixture.detectChanges();
            (0, matchers_1.expect)(q.query.length).toEqual(0);
            (0, matchers_1.expect)(toHtml(fixture.nativeElement)).toEqual(`<div-query>Contenu<!--ng-container--></div-query>`);
        });
    });
    describe('invalid translations handling', () => {
        it('should throw in case invalid ICU is present in a template', () => {
            // Error message is produced by Compiler.
            (0, matchers_1.expect)(() => initWithTemplate(AppComp, '{count, select, 10 {ten} other {other}')).toThrowError(/Invalid ICU message. Missing '}'. \("{count, select, 10 {ten} other {other}\[ERROR ->\]"\)/);
        });
        it('should throw in case invalid ICU is present in translation', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{VAR_SELECT, select, 10 {ten} other {other}}')]: 
                // Missing "}" at the end of translation.
                '{VAR_SELECT, select, 10 {dix} other {autre}',
            });
            // Error message is produced at runtime.
            (0, matchers_1.expect)(() => initWithTemplate(AppComp, '{count, select, 10 {ten} other {other}}')).toThrowError(/Unable to parse ICU expression in "{�0�, select, 10 {dix} other {autre}" message./);
        });
        it('should throw in case unescaped curly braces are present in a template', () => {
            // Error message is produced by Compiler.
            (0, matchers_1.expect)(() => initWithTemplate(AppComp, 'Text { count }')).toThrowError(/Do you have an unescaped "{" in your template\? Use "{{ '{' }}"\) to escape it/);
        });
        it('should throw in case curly braces are added into translation', () => {
            (0, localize_1.loadTranslations)({
                // Curly braces which were not present in a template were added into translation.
                [(0, compiler_1.computeMsgId)('Text')]: 'Text { count }',
            });
            (0, matchers_1.expect)(() => initWithTemplate(AppComp, '<div i18n>Text</div>')).toThrowError(/Unable to parse ICU expression in "Text { count }" message./);
        });
    });
    it('should handle extra HTML in translation as plain text', () => {
        (0, localize_1.loadTranslations)({
            // Translation contains HTML tags that were not present in original message.
            [(0, compiler_1.computeMsgId)('Text')]: 'Text <div *ngIf="true">Extra content</div>',
        });
        const fixture = initWithTemplate(AppComp, '<div i18n>Text</div>');
        const element = fixture.nativeElement;
        (0, matchers_1.expect)(element).toHaveText('Text <div *ngIf="true">Extra content</div>');
    });
    it('should reflect lifecycle hook changes in text interpolations in i18n block', () => {
        let InputsDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: 'input',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var InputsDir = _classThis = class {
                constructor(elementRef) {
                    this.elementRef = elementRef;
                }
                ngOnInit() {
                    this.elementRef.nativeElement.value = 'value set in Directive.ngOnInit';
                }
            };
            __setFunctionName(_classThis, "InputsDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InputsDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InputsDir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <input #myinput>
        <div i18n>{{myinput.value}}</div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, InputsDir] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toContain('value set in Directive.ngOnInit');
    });
    it('should reflect lifecycle hook changes in text interpolations in i18n attributes', () => {
        let InputsDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: 'input',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var InputsDir = _classThis = class {
                constructor(elementRef) {
                    this.elementRef = elementRef;
                }
                ngOnInit() {
                    this.elementRef.nativeElement.value = 'value set in Directive.ngOnInit';
                }
            };
            __setFunctionName(_classThis, "InputsDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InputsDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InputsDir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <input #myinput>
        <div i18n-title title="{{myinput.value}}"></div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, InputsDir] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.querySelector('div').title).toContain('value set in Directive.ngOnInit');
    });
    it('should not alloc expando slots when there is no new variable to create', () => {
        (0, localize_1.loadTranslations)({
            [(0, compiler_1.computeMsgId)('{$START_TAG_DIV} Some content {$CLOSE_TAG_DIV}')]: '{$START_TAG_DIV} Some content {$CLOSE_TAG_DIV}',
            [(0, compiler_1.computeMsgId)('{$START_TAG_SPAN_1}{$ICU}{$CLOSE_TAG_SPAN} - {$START_TAG_SPAN_1}{$ICU_1}{$CLOSE_TAG_SPAN}')]: '{$START_TAG_SPAN_1}{$ICU}{$CLOSE_TAG_SPAN} - {$START_TAG_SPAN_1}{$ICU_1}{$CLOSE_TAG_SPAN}',
        });
        let ContentElementDialog = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
      <div dialog i18n>
          <div *ngIf="data">
              Some content
          </div>
      </div>
      <button [close]="true">Button label</button>
  `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ContentElementDialog = _classThis = class {
                constructor() {
                    this.data = false;
                }
            };
            __setFunctionName(_classThis, "ContentElementDialog");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ContentElementDialog = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ContentElementDialog = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [DialogDir, CloseBtn, ContentElementDialog] });
        const fixture = testing_1.TestBed.createComponent(ContentElementDialog);
        fixture.detectChanges();
        // Remove the reflect attribute, because the attribute order in innerHTML
        // isn't guaranteed in different browsers so it could throw off our assertions.
        const button = fixture.nativeElement.querySelector('button');
        button.removeAttribute('ng-reflect-dialog-result');
        (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toEqual(`<div dialog=""><!--bindings={
  "ng-reflect-ng-if": "false"
}--></div><button title="Close dialog">Button label</button>`);
    });
    describe('ngTemplateOutlet', () => {
        it('should work with i18n content that includes elements', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{$START_TAG_SPAN}A{$CLOSE_TAG_SPAN} B ')]: '{$START_TAG_SPAN}a{$CLOSE_TAG_SPAN} b',
            });
            const fixture = initWithTemplate(AppComp, `
        <ng-container *ngTemplateOutlet="tmpl"></ng-container>
        <ng-template #tmpl i18n>
          <span>A</span> B
        </ng-template>
      `);
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toContain('a b');
        });
        it('should work with i18n content that includes other templates (*ngIf)', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{$START_TAG_SPAN}A{$CLOSE_TAG_SPAN} B ')]: '{$START_TAG_SPAN}a{$CLOSE_TAG_SPAN} b',
            });
            const fixture = initWithTemplate(AppComp, `
        <ng-container *ngTemplateOutlet="tmpl"></ng-container>
        <ng-template #tmpl i18n>
          <span *ngIf="visible">A</span> B
        </ng-template>
      `);
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toContain('a b');
        });
        it('should work with i18n content that includes projection', () => {
            (0, localize_1.loadTranslations)({
                [(0, compiler_1.computeMsgId)('{$START_TAG_NG_CONTENT}{$CLOSE_TAG_NG_CONTENT} B ')]: '{$START_TAG_NG_CONTENT}{$CLOSE_TAG_NG_CONTENT} b',
            });
            let Projector = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'projector',
                        template: `
          <ng-container *ngTemplateOutlet="tmpl"></ng-container>
          <ng-template #tmpl i18n>
            <ng-content></ng-content> B
          </ng-template>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Projector = _classThis = class {
                };
                __setFunctionName(_classThis, "Projector");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Projector = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Projector = _classThis;
            })();
            let AppComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app',
                        template: `
          <projector>a</projector>
        `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AppComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "AppComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AppComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AppComponent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [AppComponent, Projector] });
            const fixture = testing_1.TestBed.createComponent(AppComponent);
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toContain('a b');
        });
    });
    describe('viewContainerRef with i18n', () => {
        it('should create ViewContainerRef with i18n', () => {
            // This test demonstrates an issue with creating a `ViewContainerRef` and having i18n at the
            // parent element. The reason this broke is that in this case the `ViewContainerRef` creates
            // an dynamic anchor comment but uses `HostTNode` for it which is incorrect. `appendChild`
            // then tries to add internationalization to the comment node and fails.
            let MyApp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
            <div i18n>before|<div myDir>inside</div>|after</div>
          `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyApp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyApp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyApp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyApp = _classThis;
            })();
            let MyDir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[myDir]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyDir = _classThis = class {
                    constructor(vcRef) {
                        myDir = this;
                    }
                };
                __setFunctionName(_classThis, "MyDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyDir = _classThis;
            })();
            let myDir;
            testing_1.TestBed.configureTestingModule({ declarations: [MyApp, MyDir] });
            const fixture = testing_1.TestBed.createComponent(MyApp);
            fixture.detectChanges();
            (0, matchers_1.expect)(myDir).toBeDefined();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual(`before|inside|after`);
        });
    });
    it('should create ICU with attributes', () => {
        // This test demonstrates an issue with setting attributes on ICU elements.
        // NOTE: This test is extracted from g3.
        let MyApp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
            <h1 class="num-cart-items" i18n *ngIf="true">{
              registerItemCount, plural,
              =0 {Your cart}
              =1 {Your cart <span class="item-count">(1 item)</span>}
              other {
                Your cart <span class="item-count">({{
                  registerItemCount
                }} items)</span>
              }
          }</h1>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyApp = _classThis = class {
                constructor() {
                    this.registerItemCount = 1;
                }
            };
            __setFunctionName(_classThis, "MyApp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyApp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyApp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [MyApp] });
        const fixture = testing_1.TestBed.createComponent(MyApp);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual(`Your cart (1 item)`);
    });
    it('should not insertBeforeIndex non-projected content text', () => {
        // This test demonstrates an issue with setting attributes on ICU elements.
        // NOTE: This test is extracted from g3.
        let MyApp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<div i18n>before|<child>TextNotProjected</child>|after</div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyApp = _classThis = class {
            };
            __setFunctionName(_classThis, "MyApp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyApp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyApp = _classThis;
        })();
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    template: 'CHILD',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Child = _classThis = class {
            };
            __setFunctionName(_classThis, "Child");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Child = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Child = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [MyApp, Child] });
        const fixture = testing_1.TestBed.createComponent(MyApp);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual(`before|CHILD|after`);
    });
    it('should create a pipe inside i18n block', () => {
        // This test demonstrates an issue with i18n messing up `getCurrentTNode` which subsequently
        // breaks the DI. The issue is that the `i18nStartFirstCreatePass` would create placeholder
        // NODES, and than leave `getCurrentTNode` in undetermined state which would then break DI.
        // NOTE: This test is extracted from g3.
        let MyApp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
      <div i18n [title]="null | async"><div>A</div></div>
      <div i18n>{{(null | async)||'B'}}<div></div></div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyApp = _classThis = class {
            };
            __setFunctionName(_classThis, "MyApp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyApp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyApp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [MyApp] });
        const fixture = testing_1.TestBed.createComponent(MyApp);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual(`AB`);
    });
    it('should copy injector information unto placeholder', () => {
        // This test demonstrates an issue with i18n Placeholders loosing `injectorIndex` information.
        // NOTE: This test is extracted from g3.
        let MyApp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <parent i18n>
          <middle>
            <child>Text</child>
          </middle>
        </parent>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyApp = _classThis = class {
            };
            __setFunctionName(_classThis, "MyApp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyApp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyApp = _classThis;
        })();
        let Parent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'parent',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Parent = _classThis = class {
            };
            __setFunctionName(_classThis, "Parent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Parent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Parent = _classThis;
        })();
        let Middle = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'middle',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Middle = _classThis = class {
            };
            __setFunctionName(_classThis, "Middle");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Middle = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Middle = _classThis;
        })();
        let Child = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'child',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Child = _classThis = class {
                constructor(middle) {
                    this.middle = middle;
                    child = this;
                }
            };
            __setFunctionName(_classThis, "Child");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Child = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Child = _classThis;
        })();
        let child;
        testing_1.TestBed.configureTestingModule({ declarations: [MyApp, Parent, Middle, Child] });
        const fixture = testing_1.TestBed.createComponent(MyApp);
        fixture.detectChanges();
        (0, matchers_1.expect)(child === null || child === void 0 ? void 0 : child.middle).toBeInstanceOf(Middle);
    });
    it('should allow container in gotClosestRElement', () => {
        // A second iteration of the loop will have `Container` `TNode`s pass through the system.
        // NOTE: This test is extracted from g3.
        let MyApp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
      <div *ngFor="let i of [1,2]">
        <ng-template #tmpl i18n><span *ngIf="true">X</span></ng-template>
        <span [ngTemplateOutlet]="tmpl"></span>
      </div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyApp = _classThis = class {
            };
            __setFunctionName(_classThis, "MyApp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyApp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyApp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [MyApp] });
        const fixture = testing_1.TestBed.createComponent(MyApp);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual(`XX`);
    });
    it('should link text after ICU', () => {
        // i18n block must restore the current `currentTNode` so that trailing text node can link to it.
        // NOTE: This test is extracted from g3.
        let MyApp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <ng-container *ngFor="let index of [1, 2]">
          {{'['}}
          {index, plural, =1 {1} other {*}}
          {index, plural, =1 {one} other {many}}
          {{'-'}}
          <span>+</span>
          {{'-'}}
          {index, plural, =1 {first} other {rest}}
          {{']'}}
        </ng-container>
        /
        <ng-container *ngFor="let index of [1, 2]" i18n>
          {{'['}}
          {index, plural, =1 {1} other {*}}
          {index, plural, =1 {one} other {many}}
          {{'-'}}
          <span>+</span>
          {{'-'}}
          {index, plural, =1 {first} other {rest}}
          {{']'}}
        </ng-container>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyApp = _classThis = class {
            };
            __setFunctionName(_classThis, "MyApp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyApp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyApp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [MyApp] });
        const fixture = testing_1.TestBed.createComponent(MyApp);
        fixture.detectChanges();
        const textContent = fixture.nativeElement.textContent;
        (0, matchers_1.expect)(textContent.split('/').map((s) => s.trim())).toEqual([
            '[ 1 one - + - first ]  [ * many - + - rest ]',
            '[ 1 one - + - first ]  [ * many - + - rest ]',
        ]);
    });
    it('should ignore non-instantiated ICUs on update', () => {
        // Demonstrates an issue of same selector expression used in nested ICUs, causes non
        // instantiated nested ICUs to be updated.
        // NOTE: This test is extracted from g3.
        let MyApp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        before|
        { retention.unit, select,
          SECONDS {
              {retention.durationInUnits, plural,
                  =1 {1 second}
                  other {{{retention.durationInUnits}} seconds}
                  }
              }
          DAYS {
              {retention.durationInUnits, plural,
                  =1 {1 day}
                  other {{{retention.durationInUnits}} days}
                  }
              }
          MONTHS {
              {retention.durationInUnits, plural,
                  =1 {1 month}
                  other {{{retention.durationInUnits}} months}
                  }
              }
          YEARS {
              {retention.durationInUnits, plural,
                  =1 {1 year}
                  other {{{retention.durationInUnits}} years}
                  }
              }
          other {}
          }
        |after.
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyApp = _classThis = class {
                constructor() {
                    this.retention = {
                        durationInUnits: 10,
                        unit: 'SECONDS',
                    };
                }
            };
            __setFunctionName(_classThis, "MyApp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyApp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyApp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [MyApp] });
        const fixture = testing_1.TestBed.createComponent(MyApp);
        fixture.detectChanges();
        const textContent = fixture.nativeElement.textContent;
        (0, matchers_1.expect)(textContent.replace(/\s+/g, ' ').trim()).toEqual(`before| 10 seconds |after.`);
    });
    it('should render attributes defined in ICUs', () => {
        // NOTE: This test is extracted from g3.
        let MyApp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <div i18n>{
          parameters.length,
          plural,
          =1 {Affects parameter <span class="parameter-name" attr="should_be_present">{{parameters[0].name}}</span>}
          other {Affects {{parameters.length}} parameters, including <span
              class="parameter-name">{{parameters[0].name}}</span>}
          }</div>
        `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyApp = _classThis = class {
                constructor() {
                    this.parameters = [{ name: 'void_abt_param' }];
                }
            };
            __setFunctionName(_classThis, "MyApp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyApp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyApp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [MyApp] });
        const fixture = testing_1.TestBed.createComponent(MyApp);
        fixture.detectChanges();
        const span = fixture.nativeElement.querySelector('span');
        (0, matchers_1.expect)(span.getAttribute('attr')).toEqual('should_be_present');
        (0, matchers_1.expect)(span.getAttribute('class')).toEqual('parameter-name');
    });
    it('should support different ICUs cases for each *ngFor iteration', () => {
        let MyApp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
      <ul i18n>
        <li *ngFor="let item of items">{
          item, plural,
          =1 {<b>one</b>}
          =2 {<i>two</i>}
      },</li>
      </ul>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyApp = _classThis = class {
                constructor() {
                    this.items = [1, 2];
                }
            };
            __setFunctionName(_classThis, "MyApp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyApp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyApp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [MyApp] });
        const fixture = testing_1.TestBed.createComponent(MyApp);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual(`one,two,`);
        fixture.componentInstance.items = [2, 1];
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual(`two,one,`);
    });
    it('should be able to inject a static i18n attribute', () => {
        (0, localize_1.loadTranslations)({ [(0, compiler_1.computeMsgId)('text')]: 'translatedText' });
        let InjectTitleDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[injectTitle]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var InjectTitleDir = _classThis = class {
                constructor(title) {
                    this.title = title;
                }
            };
            __setFunctionName(_classThis, "InjectTitleDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InjectTitleDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InjectTitleDir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<div i18n-title title="text" injectTitle></div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.dir = __runInitializers(this, _dir_initializers, void 0);
                    __runInitializers(this, _dir_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.ViewChild)(InjectTitleDir)];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, InjectTitleDir] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.componentInstance.dir.title).toBe('translatedText');
        (0, matchers_1.expect)(fixture.nativeElement.querySelector('div').getAttribute('title')).toBe('translatedText');
    });
    it('should inject `null` for an i18n attribute with an interpolation', () => {
        (0, localize_1.loadTranslations)({ [(0, compiler_1.computeMsgId)('text {$INTERPOLATION}')]: 'translatedText {$INTERPOLATION}' });
        let InjectTitleDir = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[injectTitle]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var InjectTitleDir = _classThis = class {
                constructor(title) {
                    this.title = title;
                }
            };
            __setFunctionName(_classThis, "InjectTitleDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                InjectTitleDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return InjectTitleDir = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<div i18n-title title="text {{ value }}" injectTitle></div>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _dir_decorators;
            let _dir_initializers = [];
            let _dir_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.dir = __runInitializers(this, _dir_initializers, void 0);
                    this.value = (__runInitializers(this, _dir_extraInitializers), 'value');
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.ViewChild)(InjectTitleDir)];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [App, InjectTitleDir] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.componentInstance.dir.title).toBeNull();
        (0, matchers_1.expect)(fixture.nativeElement.querySelector('div').getAttribute('title')).toBe('translatedText value');
    });
});
function initWithTemplate(compType, template) {
    testing_1.TestBed.overrideComponent(compType, { set: { template } });
    const fixture = testing_1.TestBed.createComponent(compType);
    fixture.detectChanges();
    return fixture;
}
let AppComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-comp',
            template: ``,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AppComp = _classThis = class {
        constructor() {
            this.name = `Angular`;
            this.description = `Web Framework`;
            this.visible = true;
            this.count = 0;
            this.items = [1, 2, 3];
        }
    };
    __setFunctionName(_classThis, "AppComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppComp = _classThis;
})();
let AppCompWithWhitespaces = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-comp-with-whitespaces',
            template: ``,
            preserveWhitespaces: true,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AppCompWithWhitespaces = _classThis = class {
    };
    __setFunctionName(_classThis, "AppCompWithWhitespaces");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppCompWithWhitespaces = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppCompWithWhitespaces = _classThis;
})();
let DirectiveWithTplRef = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[tplRef]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DirectiveWithTplRef = _classThis = class {
        constructor(vcRef, tplRef) {
            this.vcRef = vcRef;
            this.tplRef = tplRef;
        }
        ngOnInit() {
            this.vcRef.createEmbeddedView(this.tplRef, {});
        }
    };
    __setFunctionName(_classThis, "DirectiveWithTplRef");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectiveWithTplRef = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectiveWithTplRef = _classThis;
})();
let UppercasePipe = (() => {
    let _classDecorators = [(0, core_1.Pipe)({
            name: 'uppercase',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var UppercasePipe = _classThis = class {
        transform(value) {
            return value.toUpperCase();
        }
    };
    __setFunctionName(_classThis, "UppercasePipe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UppercasePipe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UppercasePipe = _classThis;
})();
let DialogDir = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: `[dialog]`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DialogDir = _classThis = class {
    };
    __setFunctionName(_classThis, "DialogDir");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DialogDir = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DialogDir = _classThis;
})();
exports.DialogDir = DialogDir;
let CloseBtn = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: `button[close]`,
            host: { '[title]': 'name' },
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _dialogResult_decorators;
    let _dialogResult_initializers = [];
    let _dialogResult_extraInitializers = [];
    var CloseBtn = _classThis = class {
        constructor() {
            this.dialogResult = __runInitializers(this, _dialogResult_initializers, void 0);
            this.name = (__runInitializers(this, _dialogResult_extraInitializers), 'Close dialog');
        }
    };
    __setFunctionName(_classThis, "CloseBtn");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _dialogResult_decorators = [(0, core_1.Input)('close')];
        __esDecorate(null, null, _dialogResult_decorators, { kind: "field", name: "dialogResult", static: false, private: false, access: { has: obj => "dialogResult" in obj, get: obj => obj.dialogResult, set: (obj, value) => { obj.dialogResult = value; } }, metadata: _metadata }, _dialogResult_initializers, _dialogResult_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CloseBtn = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CloseBtn = _classThis;
})();
exports.CloseBtn = CloseBtn;
