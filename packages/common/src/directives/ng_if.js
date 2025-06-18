"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgIfContext = exports.NgIf = void 0;
const core_1 = require("@angular/core");
/**
 * A structural directive that conditionally includes a template based on the value of
 * an expression coerced to Boolean.
 * When the expression evaluates to true, Angular renders the template
 * provided in a `then` clause, and when  false or null,
 * Angular renders the template provided in an optional `else` clause. The default
 * template for the `else` clause is blank.
 *
 * A [shorthand form](guide/directives/structural-directives#asterisk) of the directive,
 * `*ngIf="condition"`, is generally used, provided
 * as an attribute of the anchor element for the inserted template.
 * Angular expands this into a more explicit version, in which the anchor element
 * is contained in an `<ng-template>` element.
 *
 * Simple form with shorthand syntax:
 *
 * ```html
 * <div *ngIf="condition">Content to render when condition is true.</div>
 * ```
 *
 * Simple form with expanded syntax:
 *
 * ```html
 * <ng-template [ngIf]="condition"><div>Content to render when condition is
 * true.</div></ng-template>
 * ```
 *
 * Form with an "else" block:
 *
 * ```html
 * <div *ngIf="condition; else elseBlock">Content to render when condition is true.</div>
 * <ng-template #elseBlock>Content to render when condition is false.</ng-template>
 * ```
 *
 * Shorthand form with "then" and "else" blocks:
 *
 * ```html
 * <div *ngIf="condition; then thenBlock else elseBlock"></div>
 * <ng-template #thenBlock>Content to render when condition is true.</ng-template>
 * <ng-template #elseBlock>Content to render when condition is false.</ng-template>
 * ```
 *
 * Form with storing the value locally:
 *
 * ```html
 * <div *ngIf="condition as value; else elseBlock">{{value}}</div>
 * <ng-template #elseBlock>Content to render when value is null.</ng-template>
 * ```
 *
 * @usageNotes
 *
 * The `*ngIf` directive is most commonly used to conditionally show an inline template,
 * as seen in the following  example.
 * The default `else` template is blank.
 *
 * {@example common/ngIf/ts/module.ts region='NgIfSimple'}
 *
 * ### Showing an alternative template using `else`
 *
 * To display a template when `expression` evaluates to false, use an `else` template
 * binding as shown in the following example.
 * The `else` binding points to an `<ng-template>`  element labeled `#elseBlock`.
 * The template can be defined anywhere in the component view, but is typically placed right after
 * `ngIf` for readability.
 *
 * {@example common/ngIf/ts/module.ts region='NgIfElse'}
 *
 * ### Using an external `then` template
 *
 * In the previous example, the then-clause template is specified inline, as the content of the
 * tag that contains the `ngIf` directive. You can also specify a template that is defined
 * externally, by referencing a labeled `<ng-template>` element. When you do this, you can
 * change which template to use at runtime, as shown in the following example.
 *
 * {@example common/ngIf/ts/module.ts region='NgIfThenElse'}
 *
 * ### Storing a conditional result in a variable
 *
 * You might want to show a set of properties from the same object. If you are waiting
 * for asynchronous data, the object can be undefined.
 * In this case, you can use `ngIf` and store the result of the condition in a local
 * variable as shown in the following example.
 *
 * {@example common/ngIf/ts/module.ts region='NgIfAs'}
 *
 * This code uses only one `AsyncPipe`, so only one subscription is created.
 * The conditional statement stores the result of `userStream|async` in the local variable `user`.
 * You can then bind the local `user` repeatedly.
 *
 * The conditional displays the data only if `userStream` returns a value,
 * so you don't need to use the
 * safe-navigation-operator (`?.`)
 * to guard against null values when accessing properties.
 * You can display an alternative template while waiting for the data.
 *
 * ### Shorthand syntax
 *
 * The shorthand syntax `*ngIf` expands into two separate template specifications
 * for the "then" and "else" clauses. For example, consider the following shorthand statement,
 * that is meant to show a loading page while waiting for data to be loaded.
 *
 * ```html
 * <div class="hero-list" *ngIf="heroes else loading">
 *  ...
 * </div>
 *
 * <ng-template #loading>
 *  <div>Loading...</div>
 * </ng-template>
 * ```
 *
 * You can see that the "else" clause references the `<ng-template>`
 * with the `#loading` label, and the template for the "then" clause
 * is provided as the content of the anchor element.
 *
 * However, when Angular expands the shorthand syntax, it creates
 * another `<ng-template>` tag, with `ngIf` and `ngIfElse` directives.
 * The anchor element containing the template for the "then" clause becomes
 * the content of this unlabeled `<ng-template>` tag.
 *
 * ```html
 * <ng-template [ngIf]="heroes" [ngIfElse]="loading">
 *  <div class="hero-list">
 *   ...
 *  </div>
 * </ng-template>
 *
 * <ng-template #loading>
 *  <div>Loading...</div>
 * </ng-template>
 * ```
 *
 * The presence of the implicit template object has implications for the nesting of
 * structural directives. For more on this subject, see
 * [Structural Directives](guide/directives/structural-directives#one-per-element).
 *
 * @ngModule CommonModule
 * @publicApi
 *
 * @deprecated 20.0
 * Use the @if block instead. Intent to remove in v22
 */
let NgIf = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[ngIf]',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _set_ngIf_decorators;
    let _set_ngIfThen_decorators;
    let _set_ngIfElse_decorators;
    var NgIf = _classThis = class {
        constructor(_viewContainer, templateRef) {
            this._viewContainer = (__runInitializers(this, _instanceExtraInitializers), _viewContainer);
            this._context = new NgIfContext();
            this._thenTemplateRef = null;
            this._elseTemplateRef = null;
            this._thenViewRef = null;
            this._elseViewRef = null;
            this._thenTemplateRef = templateRef;
        }
        /**
         * The Boolean expression to evaluate as the condition for showing a template.
         * @deprecated Use the @if block instead. Intent to remove in v22
         */
        set ngIf(condition) {
            this._context.$implicit = this._context.ngIf = condition;
            this._updateView();
        }
        /**
         * A template to show if the condition expression evaluates to true.
         * @deprecated Use the @if block instead. Intent to remove in v22
         */
        set ngIfThen(templateRef) {
            assertTemplate(templateRef, (typeof ngDevMode === 'undefined' || ngDevMode) && 'ngIfThen');
            this._thenTemplateRef = templateRef;
            this._thenViewRef = null; // clear previous view if any.
            this._updateView();
        }
        /**
         * A template to show if the condition expression evaluates to false.
         * @deprecated Use the @if block instead. Intent to remove in v22
         */
        set ngIfElse(templateRef) {
            assertTemplate(templateRef, (typeof ngDevMode === 'undefined' || ngDevMode) && 'ngIfElse');
            this._elseTemplateRef = templateRef;
            this._elseViewRef = null; // clear previous view if any.
            this._updateView();
        }
        _updateView() {
            if (this._context.$implicit) {
                if (!this._thenViewRef) {
                    this._viewContainer.clear();
                    this._elseViewRef = null;
                    if (this._thenTemplateRef) {
                        this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context);
                    }
                }
            }
            else {
                if (!this._elseViewRef) {
                    this._viewContainer.clear();
                    this._thenViewRef = null;
                    if (this._elseTemplateRef) {
                        this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context);
                    }
                }
            }
        }
        /**
         * Asserts the correct type of the context for the template that `NgIf` will render.
         *
         * The presence of this method is a signal to the Ivy template type-check compiler that the
         * `NgIf` structural directive renders its template with a specific context type.
         */
        static ngTemplateContextGuard(dir, ctx) {
            return true;
        }
    };
    __setFunctionName(_classThis, "NgIf");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _set_ngIf_decorators = [(0, core_1.Input)()];
        _set_ngIfThen_decorators = [(0, core_1.Input)()];
        _set_ngIfElse_decorators = [(0, core_1.Input)()];
        __esDecorate(_classThis, null, _set_ngIf_decorators, { kind: "setter", name: "ngIf", static: false, private: false, access: { has: obj => "ngIf" in obj, set: (obj, value) => { obj.ngIf = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _set_ngIfThen_decorators, { kind: "setter", name: "ngIfThen", static: false, private: false, access: { has: obj => "ngIfThen" in obj, set: (obj, value) => { obj.ngIfThen = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _set_ngIfElse_decorators, { kind: "setter", name: "ngIfElse", static: false, private: false, access: { has: obj => "ngIfElse" in obj, set: (obj, value) => { obj.ngIfElse = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NgIf = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NgIf = _classThis;
})();
exports.NgIf = NgIf;
/**
 * @publicApi
 *
 * @deprecated 20.0
 * The ngIf directive is deprecated in favor of the @if block instead.
 */
class NgIfContext {
    constructor() {
        this.$implicit = null;
        this.ngIf = null;
    }
}
exports.NgIfContext = NgIfContext;
function assertTemplate(templateRef, property) {
    if (templateRef && !templateRef.createEmbeddedView) {
        throw new core_1.ɵRuntimeError(2020 /* RuntimeErrorCode.NG_IF_NOT_A_TEMPLATE_REF */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
            `${property} must be a TemplateRef, but received '${(0, core_1.ɵstringify)(templateRef)}'.`);
    }
}
