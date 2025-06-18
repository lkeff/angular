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
const common_1 = require("@angular/common");
const core_1 = require("../../src/core");
const provide_check_no_changes_config_1 = require("@angular/core/src/change_detection/provide_check_no_changes_config");
const testing_1 = require("../../testing");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
const rxjs_1 = require("rxjs");
describe('change detection for transplanted views', () => {
    describe('when declaration appears before insertion', () => {
        let OnPushInsertComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'onpush-insert-comp',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: `
        OnPushInsertComp({{greeting}})
        <div *ngIf="true">
          <!-- Add extra level of embedded view to ensure we can handle nesting -->
          <ng-container
              [ngTemplateOutlet]="template"
              [ngTemplateOutletContext]="{$implicit: greeting}">
          </ng-container>
        </div>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var OnPushInsertComp = _classThis = class {
                get template() {
                    return templateRef;
                }
                constructor(changeDetectorRef) {
                    this.changeDetectorRef = changeDetectorRef;
                    this.greeting = 'Hello';
                    onPushInsertComp = this;
                }
                ngDoCheck() {
                    logValue = 'Insert';
                }
                ngAfterViewChecked() {
                    logValue = null;
                }
            };
            __setFunctionName(_classThis, "OnPushInsertComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                OnPushInsertComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return OnPushInsertComp = _classThis;
        })();
        let DeclareComp = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _myTmpl_decorators;
            let _myTmpl_initializers = [];
            let _myTmpl_extraInitializers = [];
            var DeclareComp = _classThis = class {
                constructor(changeDetector) {
                    this.changeDetector = changeDetector;
                    this.myTmpl = __runInitializers(this, _myTmpl_initializers, void 0);
                    this.name = (__runInitializers(this, _myTmpl_extraInitializers), 'world');
                }
                ngDoCheck() {
                    logValue = 'Declare';
                }
                logName() {
                    // This will log when the embedded view gets CD. The `logValue` will show if the CD was
                    // from `Insert` or from `Declare` component.
                    viewExecutionLog.push(logValue);
                    return this.name;
                }
                ngAfterViewChecked() {
                    logValue = null;
                }
                ngAfterViewInit() {
                    templateRef = this.myTmpl;
                }
            };
            __setFunctionName(_classThis, "DeclareComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _myTmpl_decorators = [(0, core_1.ViewChild)('myTmpl')];
                __esDecorate(null, null, _myTmpl_decorators, { kind: "field", name: "myTmpl", static: false, private: false, access: { has: obj => "myTmpl" in obj, get: obj => obj.myTmpl, set: (obj, value) => { obj.myTmpl = value; } }, metadata: _metadata }, _myTmpl_initializers, _myTmpl_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DeclareComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DeclareComp = _classThis;
        })();
        let CheckAlwaysDeclareComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: `check-always-declare-comp`,
                    template: `
        DeclareComp({{name}})
        <ng-template #myTmpl let-greeting>
          {{greeting}} {{logName()}}!
        </ng-template>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classSuper = DeclareComp;
            var CheckAlwaysDeclareComp = _classThis = class extends _classSuper {
                constructor(changeDetector) {
                    super(changeDetector);
                    declareComp = this;
                }
            };
            __setFunctionName(_classThis, "CheckAlwaysDeclareComp");
            (() => {
                var _a;
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                CheckAlwaysDeclareComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return CheckAlwaysDeclareComp = _classThis;
        })();
        let OnPushDeclareComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: `onpush-declare-comp`,
                    template: `
        OnPushDeclareComp({{name}})
        <ng-template #myTmpl let-greeting>
          {{greeting}} {{logName()}}!
        </ng-template>`,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _classSuper = DeclareComp;
            var OnPushDeclareComp = _classThis = class extends _classSuper {
                constructor(changeDetector) {
                    super(changeDetector);
                    onPushDeclareComp = this;
                }
            };
            __setFunctionName(_classThis, "OnPushDeclareComp");
            (() => {
                var _a;
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                OnPushDeclareComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return OnPushDeclareComp = _classThis;
        })();
        let SignalOnPushDeclareComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: `signal-onpush-declare-comp`,
                    template: `
        SignalOnPushDeclareComp({{name()}})
        <ng-template #myTmpl let-greeting>
          {{greeting}} {{surname()}}{{logExecutionContext()}}!
        </ng-template>
      `,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _myTmpl_decorators;
            let _myTmpl_initializers = [];
            let _myTmpl_extraInitializers = [];
            var SignalOnPushDeclareComp = _classThis = class {
                logExecutionContext() {
                    viewExecutionLog.push(logValue);
                    return '';
                }
                constructor() {
                    this.myTmpl = __runInitializers(this, _myTmpl_initializers, void 0);
                    this.name = (__runInitializers(this, _myTmpl_extraInitializers), (0, core_1.signal)('world'));
                    this.templateName = (0, core_1.signal)('templateName');
                    this.surname = (0, core_1.computed)(() => {
                        const name = this.templateName();
                        return name;
                    });
                    signalDeclareComp = this;
                }
                ngAfterViewChecked() {
                    logValue = null;
                }
                ngAfterViewInit() {
                    templateRef = this.myTmpl;
                }
            };
            __setFunctionName(_classThis, "SignalOnPushDeclareComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _myTmpl_decorators = [(0, core_1.ViewChild)('myTmpl')];
                __esDecorate(null, null, _myTmpl_decorators, { kind: "field", name: "myTmpl", static: false, private: false, access: { has: obj => "myTmpl" in obj, get: obj => obj.myTmpl, set: (obj, value) => { obj.myTmpl = value; } }, metadata: _metadata }, _myTmpl_initializers, _myTmpl_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SignalOnPushDeclareComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SignalOnPushDeclareComp = _classThis;
        })();
        let AppComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
      <check-always-declare-comp *ngIf="showCheckAlwaysDeclare" />
      <onpush-declare-comp *ngIf="showOnPushDeclare" />
      <signal-onpush-declare-comp *ngIf="showSignalOnPushDeclare" />

      <onpush-insert-comp *ngIf="showOnPushInsert" />
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AppComp = _classThis = class {
                constructor() {
                    this.showCheckAlwaysDeclare = false;
                    this.showSignalOnPushDeclare = false;
                    this.showOnPushDeclare = false;
                    this.showOnPushInsert = false;
                    appComp = this;
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
        let viewExecutionLog;
        let logValue;
        let fixture;
        let appComp;
        let onPushInsertComp;
        let declareComp;
        let templateRef;
        let onPushDeclareComp;
        let signalDeclareComp;
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({
                declarations: [
                    OnPushInsertComp,
                    SignalOnPushDeclareComp,
                    CheckAlwaysDeclareComp,
                    OnPushDeclareComp,
                    AppComp,
                ],
                imports: [common_1.CommonModule],
            });
            viewExecutionLog = [];
            fixture = testing_1.TestBed.createComponent(AppComp);
        });
        describe('and declaration component is Onpush with signals and insertion is OnPush', () => {
            beforeEach(() => {
                fixture.componentInstance.showSignalOnPushDeclare = true;
                fixture.componentInstance.showOnPushInsert = true;
                fixture.detectChanges(false);
                viewExecutionLog.length = 0;
            });
            it('should set up the component under test correctly', () => {
                (0, matchers_1.expect)(viewExecutionLog.length).toEqual(0);
                (0, matchers_1.expect)(trim(fixture.nativeElement.textContent)).toEqual('SignalOnPushDeclareComp(world) OnPushInsertComp(Hello) Hello templateName!');
            });
            it('should CD at insertion and declaration', () => {
                signalDeclareComp.name.set('Angular');
                fixture.detectChanges(false);
                (0, matchers_1.expect)(viewExecutionLog).toEqual(['Insert']);
                viewExecutionLog.length = 0;
                (0, matchers_1.expect)(trim(fixture.nativeElement.textContent))
                    .withContext('CD did not run on the transplanted template because it is inside an OnPush component and no signal changed')
                    .toEqual('SignalOnPushDeclareComp(Angular) OnPushInsertComp(Hello) Hello templateName!');
                onPushInsertComp.greeting = 'Hi';
                fixture.detectChanges(false);
                (0, matchers_1.expect)(viewExecutionLog).toEqual([]);
                viewExecutionLog.length = 0;
                (0, matchers_1.expect)(trim(fixture.nativeElement.textContent))
                    .withContext('Insertion component is OnPush.')
                    .toEqual('SignalOnPushDeclareComp(Angular) OnPushInsertComp(Hello) Hello templateName!');
                onPushInsertComp.changeDetectorRef.markForCheck();
                fixture.detectChanges(false);
                (0, matchers_1.expect)(viewExecutionLog).toEqual(['Insert']);
                viewExecutionLog.length = 0;
                (0, matchers_1.expect)(trim(fixture.nativeElement.textContent)).toEqual('SignalOnPushDeclareComp(Angular) OnPushInsertComp(Hi) Hi templateName!');
                // Destroy insertion should also destroy declaration
                appComp.showOnPushInsert = false;
                fixture.detectChanges(false);
                (0, matchers_1.expect)(viewExecutionLog).toEqual([]);
                viewExecutionLog.length = 0;
                (0, matchers_1.expect)(trim(fixture.nativeElement.textContent)).toEqual('SignalOnPushDeclareComp(Angular)');
                // Restore both
                appComp.showOnPushInsert = true;
                fixture.detectChanges(false);
                (0, matchers_1.expect)(viewExecutionLog).toEqual(['Insert']);
                viewExecutionLog.length = 0;
                (0, matchers_1.expect)(trim(fixture.nativeElement.textContent)).toEqual('SignalOnPushDeclareComp(Angular) OnPushInsertComp(Hello) Hello templateName!');
            });
        });
        describe('and declaration component is CheckAlways', () => {
            beforeEach(() => {
                fixture.componentInstance.showCheckAlwaysDeclare = true;
                fixture.componentInstance.showOnPushInsert = true;
                fixture.detectChanges(false);
                viewExecutionLog.length = 0;
            });
            it('should set up the component under test correctly', () => {
                (0, matchers_1.expect)(viewExecutionLog.length).toEqual(0);
                (0, matchers_1.expect)(trim(fixture.nativeElement.textContent)).toEqual('DeclareComp(world) OnPushInsertComp(Hello) Hello world!');
            });
            it('should CD at insertion point only', () => {
                declareComp.name = 'Angular';
                fixture.detectChanges(false);
                (0, matchers_1.expect)(viewExecutionLog).toEqual(['Insert']);
                viewExecutionLog.length = 0;
                (0, matchers_1.expect)(trim(fixture.nativeElement.textContent)).toEqual('DeclareComp(Angular) OnPushInsertComp(Hello) Hello Angular!', 'Expect transplanted LView to be CD because the declaration is CD.');
                onPushInsertComp.greeting = 'Hi';
                fixture.detectChanges(false);
                (0, matchers_1.expect)(viewExecutionLog).toEqual(['Insert']);
                viewExecutionLog.length = 0;
                (0, matchers_1.expect)(trim(fixture.nativeElement.textContent)).toEqual('DeclareComp(Angular) OnPushInsertComp(Hello) Hello Angular!', 'expect no change because it is on push.');
                onPushInsertComp.changeDetectorRef.markForCheck();
                fixture.detectChanges(false);
                (0, matchers_1.expect)(viewExecutionLog).toEqual(['Insert']);
                viewExecutionLog.length = 0;
                (0, matchers_1.expect)(trim(fixture.nativeElement.textContent)).toEqual('DeclareComp(Angular) OnPushInsertComp(Hi) Hi Angular!');
                // Destroy insertion should also destroy declaration
                appComp.showOnPushInsert = false;
                fixture.detectChanges(false);
                (0, matchers_1.expect)(viewExecutionLog).toEqual([]);
                viewExecutionLog.length = 0;
                (0, matchers_1.expect)(trim(fixture.nativeElement.textContent)).toEqual('DeclareComp(Angular)');
                // Restore both
                appComp.showOnPushInsert = true;
                fixture.detectChanges(false);
                (0, matchers_1.expect)(viewExecutionLog).toEqual(['Insert']);
                viewExecutionLog.length = 0;
                (0, matchers_1.expect)(trim(fixture.nativeElement.textContent)).toEqual('DeclareComp(Angular) OnPushInsertComp(Hello) Hello Angular!');
                // Destroy declaration, But we should still be able to see updates in insertion
                appComp.showCheckAlwaysDeclare = false;
                onPushInsertComp.greeting = 'Hello';
                onPushInsertComp.changeDetectorRef.markForCheck();
                fixture.detectChanges(false);
                (0, matchers_1.expect)(viewExecutionLog).toEqual(['Insert']);
                viewExecutionLog.length = 0;
                (0, matchers_1.expect)(trim(fixture.nativeElement.textContent)).toEqual('OnPushInsertComp(Hello) Hello Angular!');
            });
            it('is not checked if detectChanges is called in declaration component', () => {
                declareComp.name = 'Angular';
                declareComp.changeDetector.detectChanges();
                (0, matchers_1.expect)(viewExecutionLog).toEqual([]);
                viewExecutionLog.length = 0;
                (0, matchers_1.expect)(trim(fixture.nativeElement.textContent)).toEqual('DeclareComp(Angular) OnPushInsertComp(Hello) Hello world!');
            });
            it('is checked as part of CheckNoChanges pass', () => {
                fixture.detectChanges(true);
                (0, matchers_1.expect)(viewExecutionLog).toEqual([
                    'Insert',
                    null /* logName set to null afterViewChecked */,
                ]);
                viewExecutionLog.length = 0;
                (0, matchers_1.expect)(trim(fixture.nativeElement.textContent)).toEqual('DeclareComp(world) OnPushInsertComp(Hello) Hello world!');
            });
        });
        describe('and declaration and insertion components are OnPush', () => {
            beforeEach(() => {
                fixture.componentInstance.showOnPushDeclare = true;
                fixture.componentInstance.showOnPushInsert = true;
                fixture.detectChanges(false);
                viewExecutionLog.length = 0;
            });
            it('should set up component under test correctly', () => {
                (0, matchers_1.expect)(viewExecutionLog.length).toEqual(0);
                (0, matchers_1.expect)(trim(fixture.nativeElement.textContent)).toEqual('OnPushDeclareComp(world) OnPushInsertComp(Hello) Hello world!');
            });
            it('should not check anything when no views are dirty', () => {
                fixture.detectChanges(false);
                (0, matchers_1.expect)(viewExecutionLog).toEqual([]);
            });
            it('should CD at insertion point only', () => {
                onPushDeclareComp.name = 'Angular';
                onPushInsertComp.greeting = 'Hi';
                // mark declaration point dirty
                onPushDeclareComp.changeDetector.markForCheck();
                fixture.detectChanges(false);
                (0, matchers_1.expect)(viewExecutionLog).toEqual(['Insert']);
                viewExecutionLog.length = 0;
                (0, matchers_1.expect)(trim(fixture.nativeElement.textContent)).toEqual('OnPushDeclareComp(Angular) OnPushInsertComp(Hello) Hello Angular!');
                // mark insertion point dirty
                onPushInsertComp.changeDetectorRef.markForCheck();
                fixture.detectChanges(false);
                (0, matchers_1.expect)(viewExecutionLog).toEqual(['Insert']);
                viewExecutionLog.length = 0;
                (0, matchers_1.expect)(trim(fixture.nativeElement.textContent)).toEqual('OnPushDeclareComp(Angular) OnPushInsertComp(Hi) Hi Angular!');
                // mark both insertion and declaration point dirty
                onPushInsertComp.changeDetectorRef.markForCheck();
                onPushDeclareComp.changeDetector.markForCheck();
                fixture.detectChanges(false);
                (0, matchers_1.expect)(viewExecutionLog).toEqual(['Insert']);
                viewExecutionLog.length = 0;
            });
            it('is checked if detectChanges is called in declaration component', () => {
                onPushDeclareComp.name = 'Angular';
                onPushDeclareComp.changeDetector.detectChanges();
                (0, matchers_1.expect)(trim(fixture.nativeElement.textContent)).toEqual('OnPushDeclareComp(Angular) OnPushInsertComp(Hello) Hello world!');
            });
            // TODO(FW-1774): blocked by https://github.com/angular/angular/pull/34443
            xit('is checked as part of CheckNoChanges pass', () => {
                // mark declaration point dirty
                onPushDeclareComp.changeDetector.markForCheck();
                fixture.detectChanges(false);
                (0, matchers_1.expect)(viewExecutionLog).toEqual([
                    'Insert',
                    null /* logName set to null in afterViewChecked */,
                ]);
                viewExecutionLog.length = 0;
                // mark insertion point dirty
                onPushInsertComp.changeDetectorRef.markForCheck();
                fixture.detectChanges(false);
                (0, matchers_1.expect)(viewExecutionLog).toEqual(['Insert', null]);
                viewExecutionLog.length = 0;
                // mark both insertion and declaration point dirty
                onPushInsertComp.changeDetectorRef.markForCheck();
                onPushDeclareComp.changeDetector.markForCheck();
                fixture.detectChanges(false);
                (0, matchers_1.expect)(viewExecutionLog).toEqual(['Insert', null]);
                viewExecutionLog.length = 0;
            });
            it('does not cause infinite change detection if transplanted view is dirty and destroyed before refresh', () => {
                // mark declaration point dirty
                onPushDeclareComp.changeDetector.markForCheck();
                // detach insertion so the transplanted view doesn't get refreshed when CD runs
                onPushInsertComp.changeDetectorRef.detach();
                // run CD, which will set the `RefreshView` flag on the transplanted view
                fixture.detectChanges(false);
                // reattach insertion so the DESCENDANT_VIEWS counters update
                onPushInsertComp.changeDetectorRef.reattach();
                // make it so the insertion is destroyed before getting refreshed
                fixture.componentInstance.showOnPushInsert = false;
                // run CD again. If we didn't clear the flag/counters when destroying the view, this
                // would cause an infinite CD because the counters will be >1 but we will never reach a
                // view to refresh and decrement the counters.
                fixture.detectChanges(false);
            });
        });
    });
    describe('backwards references', () => {
        let Insertion = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'insertion',
                    template: `
            <div>Insertion({{name}})</div>
            <ng-container [ngTemplateOutlet]="template" [ngTemplateOutletContext]="{$implicit: name}">
            </ng-container>`,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _template_decorators;
            let _template_initializers = [];
            let _template_extraInitializers = [];
            var Insertion = _classThis = class {
                constructor(changeDetectorRef) {
                    this.changeDetectorRef = changeDetectorRef;
                    this.template = __runInitializers(this, _template_initializers, void 0);
                    this.name = (__runInitializers(this, _template_extraInitializers), 'initial');
                }
            };
            __setFunctionName(_classThis, "Insertion");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _template_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Insertion = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Insertion = _classThis;
        })();
        let Declaration = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'declaration',
                    template: `
          <div>Declaration({{name}})</div>
          <ng-template #template let-contextName>
            <div>{{incrementChecks()}}</div>
            <div>TemplateDeclaration({{name}})</div>
            <div>TemplateContext({{contextName}})</div>
          </ng-template>
        `,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _template_decorators;
            let _template_initializers = [];
            let _template_extraInitializers = [];
            var Declaration = _classThis = class {
                constructor(changeDetectorRef) {
                    this.changeDetectorRef = changeDetectorRef;
                    this.template = __runInitializers(this, _template_initializers, void 0);
                    this.name = (__runInitializers(this, _template_extraInitializers), 'initial');
                    this.transplantedViewRefreshCount = 0;
                }
                incrementChecks() {
                    this.transplantedViewRefreshCount++;
                }
            };
            __setFunctionName(_classThis, "Declaration");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _template_decorators = [(0, core_1.ViewChild)('template')];
                __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Declaration = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Declaration = _classThis;
        })();
        let fixture;
        let appComponent;
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <insertion *ngIf="showInsertion" [template]="declaration?.template">
        </insertion>
        <declaration></declaration>
        `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _declaration_decorators;
            let _declaration_initializers = [];
            let _declaration_extraInitializers = [];
            let _insertion_decorators;
            let _insertion_initializers = [];
            let _insertion_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.declaration = __runInitializers(this, _declaration_initializers, void 0);
                    this.insertion = (__runInitializers(this, _declaration_extraInitializers), __runInitializers(this, _insertion_initializers, void 0));
                    this.template = __runInitializers(this, _insertion_extraInitializers);
                    this.showInsertion = false;
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _declaration_decorators = [(0, core_1.ViewChild)(Declaration)];
                _insertion_decorators = [(0, core_1.ViewChild)(Insertion)];
                __esDecorate(null, null, _declaration_decorators, { kind: "field", name: "declaration", static: false, private: false, access: { has: obj => "declaration" in obj, get: obj => obj.declaration, set: (obj, value) => { obj.declaration = value; } }, metadata: _metadata }, _declaration_initializers, _declaration_extraInitializers);
                __esDecorate(null, null, _insertion_decorators, { kind: "field", name: "insertion", static: false, private: false, access: { has: obj => "insertion" in obj, get: obj => obj.insertion, set: (obj, value) => { obj.insertion = value; } }, metadata: _metadata }, _insertion_initializers, _insertion_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        beforeEach(() => {
            fixture = testing_1.TestBed.configureTestingModule({
                declarations: [App, Declaration, Insertion],
            }).createComponent(App);
            appComponent = fixture.componentInstance;
            fixture.detectChanges(false);
            appComponent.showInsertion = true;
            fixture.detectChanges(false);
            appComponent.declaration.transplantedViewRefreshCount = 0;
        });
        it('should set up component under test correctly', () => {
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('Insertion(initial)TemplateDeclaration(initial)TemplateContext(initial)Declaration(initial)');
            (0, matchers_1.expect)(appComponent.declaration.transplantedViewRefreshCount).toEqual(0);
        });
        it('should update declaration view when there is a change in the declaration and insertion is marked dirty', () => {
            appComponent.declaration.name = 'new name';
            appComponent.insertion.changeDetectorRef.markForCheck();
            fixture.detectChanges(false);
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('Insertion(initial)TemplateDeclaration(new name)TemplateContext(initial)Declaration(initial)', 'Name should not update in declaration view because only insertion was marked dirty');
            (0, matchers_1.expect)(appComponent.declaration.transplantedViewRefreshCount).toEqual(1);
        });
        it('updates the declaration view when there is a change to either declaration or insertion', () => {
            appComponent.declaration.name = 'new name';
            appComponent.declaration.changeDetectorRef.markForCheck();
            fixture.detectChanges(false);
            const expectedContent = 'Insertion(initial)TemplateDeclaration(new name)TemplateContext(initial)Declaration(new name)';
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual(expectedContent);
            (0, matchers_1.expect)(appComponent.declaration.transplantedViewRefreshCount).toEqual(1);
        });
        it('should update when there is a change to insertion and declaration is marked dirty', () => {
            appComponent.insertion.name = 'new name';
            appComponent.declaration.changeDetectorRef.markForCheck();
            fixture.detectChanges(false);
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('Insertion(initial)TemplateDeclaration(initial)TemplateContext(initial)Declaration(initial)');
            (0, matchers_1.expect)(appComponent.declaration.transplantedViewRefreshCount).toEqual(1);
        });
        it('should update insertion view and template when there is a change to insertion and insertion marked dirty', () => {
            appComponent.insertion.name = 'new name';
            appComponent.insertion.changeDetectorRef.markForCheck();
            fixture.detectChanges(false);
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('Insertion(new name)TemplateDeclaration(initial)TemplateContext(new name)Declaration(initial)');
            (0, matchers_1.expect)(appComponent.declaration.transplantedViewRefreshCount).toEqual(1);
        });
        it('should not refresh the template if nothing is marked dirty', () => {
            fixture.detectChanges(false);
            (0, matchers_1.expect)(appComponent.declaration.transplantedViewRefreshCount).toEqual(0);
        });
        it('should refresh template when declaration and insertion are marked dirty', () => {
            appComponent.declaration.changeDetectorRef.markForCheck();
            appComponent.insertion.changeDetectorRef.markForCheck();
            fixture.detectChanges(false);
            (0, matchers_1.expect)(appComponent.declaration.transplantedViewRefreshCount)
                .withContext('Should refresh twice because insertion executes and then declaration marks transplanted view dirty again')
                .toEqual(2);
        });
    });
    describe('transplanted views shielded by OnPush', () => {
        let CheckAlwaysInsertion = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'check-always-insertion',
                    template: `<ng-container [ngTemplateOutlet]="template"></ng-container>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _template_decorators;
            let _template_initializers = [];
            let _template_extraInitializers = [];
            var CheckAlwaysInsertion = _classThis = class {
                constructor() {
                    this.template = __runInitializers(this, _template_initializers, void 0);
                    __runInitializers(this, _template_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "CheckAlwaysInsertion");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _template_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                CheckAlwaysInsertion = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return CheckAlwaysInsertion = _classThis;
        })();
        let OnPushInsertionHost = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'on-push-insertion-host',
                    template: `<check-always-insertion [template]="template"></check-always-insertion>`,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _template_decorators;
            let _template_initializers = [];
            let _template_extraInitializers = [];
            var OnPushInsertionHost = _classThis = class {
                constructor(cdr) {
                    this.cdr = cdr;
                    this.template = __runInitializers(this, _template_initializers, void 0);
                    __runInitializers(this, _template_extraInitializers);
                    this.cdr = cdr;
                }
            };
            __setFunctionName(_classThis, "OnPushInsertionHost");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _template_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                OnPushInsertionHost = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return OnPushInsertionHost = _classThis;
        })();
        let OnPushDeclaration = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
      <ng-template #template>{{value}}</ng-template>
      <on-push-insertion-host [template]="template"></on-push-insertion-host>
      `,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _onPushInsertionHost_decorators;
            let _onPushInsertionHost_initializers = [];
            let _onPushInsertionHost_extraInitializers = [];
            var OnPushDeclaration = _classThis = class {
                get value() {
                    if (this.throwErrorInView) {
                        throw new Error('error getting value in transplanted view');
                    }
                    return this._value;
                }
                set value(v) {
                    this._value = v;
                }
                constructor(cdr) {
                    this.cdr = cdr;
                    this.onPushInsertionHost = __runInitializers(this, _onPushInsertionHost_initializers, void 0);
                    this._value = (__runInitializers(this, _onPushInsertionHost_extraInitializers), 'initial');
                    this.throwErrorInView = false;
                }
            };
            __setFunctionName(_classThis, "OnPushDeclaration");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _onPushInsertionHost_decorators = [(0, core_1.ViewChild)(OnPushInsertionHost)];
                __esDecorate(null, null, _onPushInsertionHost_decorators, { kind: "field", name: "onPushInsertionHost", static: false, private: false, access: { has: obj => "onPushInsertionHost" in obj, get: obj => obj.onPushInsertionHost, set: (obj, value) => { obj.onPushInsertionHost = value; } }, metadata: _metadata }, _onPushInsertionHost_initializers, _onPushInsertionHost_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                OnPushDeclaration = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return OnPushDeclaration = _classThis;
        })();
        let CheckAlwaysDeclaration = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
      <ng-template #template>{{value}}</ng-template>
      <on-push-insertion-host [template]="template"></on-push-insertion-host>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _onPushInsertionHost_decorators;
            let _onPushInsertionHost_initializers = [];
            let _onPushInsertionHost_extraInitializers = [];
            var CheckAlwaysDeclaration = _classThis = class {
                constructor() {
                    this.onPushInsertionHost = __runInitializers(this, _onPushInsertionHost_initializers, void 0);
                    this.value = (__runInitializers(this, _onPushInsertionHost_extraInitializers), 'initial');
                }
            };
            __setFunctionName(_classThis, "CheckAlwaysDeclaration");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _onPushInsertionHost_decorators = [(0, core_1.ViewChild)(OnPushInsertionHost)];
                __esDecorate(null, null, _onPushInsertionHost_decorators, { kind: "field", name: "onPushInsertionHost", static: false, private: false, access: { has: obj => "onPushInsertionHost" in obj, get: obj => obj.onPushInsertionHost, set: (obj, value) => { obj.onPushInsertionHost = value; } }, metadata: _metadata }, _onPushInsertionHost_initializers, _onPushInsertionHost_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                CheckAlwaysDeclaration = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return CheckAlwaysDeclaration = _classThis;
        })();
        function getFixture(componentUnderTest) {
            return testing_1.TestBed.configureTestingModule({
                declarations: [
                    CheckAlwaysDeclaration,
                    OnPushDeclaration,
                    CheckAlwaysInsertion,
                    OnPushInsertionHost,
                ],
            }).createComponent(componentUnderTest);
        }
        it('can recover from errors thrown during change detection', () => {
            const fixture = getFixture(OnPushDeclaration);
            fixture.detectChanges();
            fixture.componentInstance.value = 'new';
            fixture.componentInstance.cdr.markForCheck();
            fixture.componentInstance.throwErrorInView = true;
            (0, matchers_1.expect)(() => {
                fixture.detectChanges();
            }).toThrow();
            // Ensure that the transplanted view can still get refreshed if we rerun change detection
            // without the error
            fixture.componentInstance.throwErrorInView = false;
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('new');
        });
        it('refresh when transplanted view is declared in CheckAlways component', () => {
            const fixture = getFixture(CheckAlwaysDeclaration);
            fixture.detectChanges();
            fixture.componentInstance.value = 'new';
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('new');
        });
        it('refresh when transplanted view is declared in OnPush component', () => {
            const fixture = getFixture(OnPushDeclaration);
            fixture.detectChanges();
            fixture.componentInstance.value = 'new';
            fixture.componentInstance.cdr.markForCheck();
            fixture.detectChanges();
            (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('new');
        });
        describe('when insertion is detached', () => {
            it('does not refresh CheckAlways transplants', () => {
                const fixture = getFixture(CheckAlwaysDeclaration);
                fixture.detectChanges();
                fixture.componentInstance.onPushInsertionHost.cdr.detach();
                fixture.componentInstance.value = 'new';
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('initial');
            });
            it('does not refresh OnPush transplants', () => {
                const fixture = getFixture(OnPushDeclaration);
                fixture.detectChanges();
                fixture.componentInstance.onPushInsertionHost.cdr.detach();
                fixture.componentInstance.value = 'new';
                fixture.detectChanges();
                (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('initial');
            });
        });
    });
    it('refreshes transplanted views used as template in ngForTemplate', () => {
        let TripleTemplate = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'triple',
                    template: '<div *ngFor="let unused of [1,2,3]; template: template"></div>',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _template_decorators;
            let _template_initializers = [];
            let _template_extraInitializers = [];
            var TripleTemplate = _classThis = class {
                constructor() {
                    this.template = __runInitializers(this, _template_initializers, void 0);
                    __runInitializers(this, _template_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "TripleTemplate");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _template_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TripleTemplate = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TripleTemplate = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
        <ng-template #template>{{name}}</ng-template>
        <triple [template]="template"></triple>
      `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.name = 'Penny';
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
        const fixture = testing_1.TestBed.configureTestingModule({
            declarations: [App, TripleTemplate],
        }).createComponent(App);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('PennyPennyPenny');
        fixture.componentInstance.name = 'Sheldon';
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.nativeElement.textContent).toEqual('SheldonSheldonSheldon', 'Expected transplanted view to be refreshed even when insertion is not dirty');
    });
    describe('ViewRef and ViewContainerRef operations', () => {
        let AppComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<ng-template>{{incrementChecks()}}</ng-template>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _templateRef_decorators;
            let _templateRef_initializers = [];
            let _templateRef_extraInitializers = [];
            var AppComponent = _classThis = class {
                constructor(rootViewContainerRef, cdr) {
                    this.rootViewContainerRef = rootViewContainerRef;
                    this.cdr = cdr;
                    this.templateRef = __runInitializers(this, _templateRef_initializers, void 0);
                    this.checks = (__runInitializers(this, _templateRef_extraInitializers), 0);
                }
                incrementChecks() {
                    this.checks++;
                }
            };
            __setFunctionName(_classThis, "AppComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _templateRef_decorators = [(0, core_1.ViewChild)(core_1.TemplateRef)];
                __esDecorate(null, null, _templateRef_decorators, { kind: "field", name: "templateRef", static: false, private: false, access: { has: obj => "templateRef" in obj, get: obj => obj.templateRef, set: (obj, value) => { obj.templateRef = value; } }, metadata: _metadata }, _templateRef_initializers, _templateRef_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                AppComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return AppComponent = _classThis;
        })();
        let fixture;
        let component;
        let viewRef;
        beforeEach(() => {
            fixture = testing_1.TestBed.configureTestingModule({ declarations: [AppComponent] }).createComponent(AppComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            viewRef = component.templateRef.createEmbeddedView({});
            component.rootViewContainerRef.insert(viewRef);
        });
        it('should not fail when change detecting detached transplanted view', () => {
            // This `ViewContainerRef` is for the root view
            // `detectChanges` on this `ChangeDetectorRef` will refresh this view and children, not the
            // root view that has the transplanted `viewRef` inserted.
            component.cdr.detectChanges();
            // The template should not have been refreshed because it was inserted "above" the component
            // so `detectChanges` will not refresh it.
            (0, matchers_1.expect)(component.checks).toEqual(0);
            // Detach view, manually call `detectChanges`, and verify the template was refreshed
            component.rootViewContainerRef.detach();
            viewRef.detectChanges();
            (0, matchers_1.expect)(component.checks).toEqual(1);
        });
        it('should work when change detecting detached transplanted view already marked for refresh', () => {
            // detach the viewRef only. This just removes the LViewFlags.Attached rather than actually
            // detaching the view from the container.
            viewRef.detach();
            // Calling detectChanges marks transplanted views for check
            component.cdr.detectChanges();
            (0, matchers_1.expect)(() => {
                // Calling detectChanges on the transplanted view itself will clear the refresh flag. It
                // _should not_ also attempt to update the parent counters because it's detached and
                // should not affect parent counters.
                viewRef.detectChanges();
            }).not.toThrow();
            (0, matchers_1.expect)(component.checks).toEqual(1);
        });
        it('should work when re-inserting a previously detached transplanted view marked for refresh', () => {
            // Test case for inserting a view with refresh flag
            viewRef.detach();
            // mark transplanted views for check but does not refresh transplanted view because it is
            // detached
            component.cdr.detectChanges();
            // reattach view itself
            viewRef.reattach();
            (0, matchers_1.expect)(() => {
                // detach and reattach view from ViewContainerRef
                component.rootViewContainerRef.detach();
                component.rootViewContainerRef.insert(viewRef);
                // calling detectChanges will clear the refresh flag. If the above operations messed up
                // the counter, this would fail when attempted to decrement.
                fixture.detectChanges(false);
            }).not.toThrow();
            // The transplanted view gets refreshed twice because it's actually inserted "backwards"
            // The view is defined in AppComponent but inserted in its ViewContainerRef (as an
            // embedded view in AppComponent's host view).
            (0, matchers_1.expect)(component.checks).toEqual(2);
        });
        it('should work when detaching an attached transplanted view with the refresh flag', () => {
            viewRef.detach();
            // mark transplanted views for check but does not refresh transplanted view because it is
            // detached
            component.cdr.detectChanges();
            // reattach view with refresh flag should increment parent counters
            viewRef.reattach();
            (0, matchers_1.expect)(() => {
                // detach view with refresh flag should decrement parent counters
                viewRef.detach();
                // detectChanges on parent should not cause infinite loop if the above counters were updated
                // correctly both times.
                fixture.detectChanges();
            }).not.toThrow();
        });
        it('should work when destroying a view with the refresh flag', () => {
            viewRef.detach();
            // mark transplanted views for check but does not refresh transplanted view because it is
            // detached
            component.cdr.detectChanges();
            viewRef.reattach();
            (0, matchers_1.expect)(() => {
                viewRef.destroy();
                fixture.detectChanges();
            }).not.toThrow();
        });
    });
    describe('when detached', () => {
        let OnPushComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'on-push-component',
                    template: `
          <ng-container #vc></ng-container>
        `,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _viewContainer_decorators;
            let _viewContainer_initializers = [];
            let _viewContainer_extraInitializers = [];
            let _template_decorators;
            let _template_initializers = [];
            let _template_extraInitializers = [];
            var OnPushComponent = _classThis = class {
                createTemplate() {
                    return this.viewContainer.createEmbeddedView(this.template);
                }
                constructor() {
                    this.viewContainer = __runInitializers(this, _viewContainer_initializers, void 0);
                    this.template = (__runInitializers(this, _viewContainer_extraInitializers), __runInitializers(this, _template_initializers, void 0));
                    __runInitializers(this, _template_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "OnPushComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _viewContainer_decorators = [(0, core_1.ViewChild)('vc', { read: core_1.ViewContainerRef })];
                _template_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _viewContainer_decorators, { kind: "field", name: "viewContainer", static: false, private: false, access: { has: obj => "viewContainer" in obj, get: obj => obj.viewContainer, set: (obj, value) => { obj.viewContainer = value; } }, metadata: _metadata }, _viewContainer_initializers, _viewContainer_extraInitializers);
                __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                OnPushComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return OnPushComponent = _classThis;
        })();
        let CheckAlwaysComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'check-always-component',
                    template: `
          <ng-container #vc></ng-container>
        `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _viewContainer_decorators;
            let _viewContainer_initializers = [];
            let _viewContainer_extraInitializers = [];
            let _template_decorators;
            let _template_initializers = [];
            let _template_extraInitializers = [];
            var CheckAlwaysComponent = _classThis = class {
                createTemplate() {
                    return this.viewContainer.createEmbeddedView(this.template);
                }
                constructor() {
                    this.viewContainer = __runInitializers(this, _viewContainer_initializers, void 0);
                    this.template = (__runInitializers(this, _viewContainer_extraInitializers), __runInitializers(this, _template_initializers, void 0));
                    __runInitializers(this, _template_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "CheckAlwaysComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _viewContainer_decorators = [(0, core_1.ViewChild)('vc', { read: core_1.ViewContainerRef })];
                _template_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _viewContainer_decorators, { kind: "field", name: "viewContainer", static: false, private: false, access: { has: obj => "viewContainer" in obj, get: obj => obj.viewContainer, set: (obj, value) => { obj.viewContainer = value; } }, metadata: _metadata }, _viewContainer_initializers, _viewContainer_extraInitializers);
                __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                CheckAlwaysComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return CheckAlwaysComponent = _classThis;
        })();
        let fixture;
        let appComponent;
        let onPushComponent;
        let checkAlwaysComponent;
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
      <ng-template #transplantedTemplate>{{ incrementChecks() }}</ng-template>
      <on-push-component [template]="transplantedTemplate"></on-push-component>
      <check-always-component [template]="transplantedTemplate"></check-always-component>
        `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _onPushComponent_decorators;
            let _onPushComponent_initializers = [];
            let _onPushComponent_extraInitializers = [];
            let _checkAlwaysComponent_decorators;
            let _checkAlwaysComponent_initializers = [];
            let _checkAlwaysComponent_extraInitializers = [];
            var App = _classThis = class {
                constructor() {
                    this.onPushComponent = __runInitializers(this, _onPushComponent_initializers, void 0);
                    this.checkAlwaysComponent = (__runInitializers(this, _onPushComponent_extraInitializers), __runInitializers(this, _checkAlwaysComponent_initializers, void 0));
                    this.transplantedViewRefreshCount = (__runInitializers(this, _checkAlwaysComponent_extraInitializers), 0);
                }
                incrementChecks() {
                    this.transplantedViewRefreshCount++;
                }
            };
            __setFunctionName(_classThis, "App");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _onPushComponent_decorators = [(0, core_1.ViewChild)(OnPushComponent)];
                _checkAlwaysComponent_decorators = [(0, core_1.ViewChild)(CheckAlwaysComponent)];
                __esDecorate(null, null, _onPushComponent_decorators, { kind: "field", name: "onPushComponent", static: false, private: false, access: { has: obj => "onPushComponent" in obj, get: obj => obj.onPushComponent, set: (obj, value) => { obj.onPushComponent = value; } }, metadata: _metadata }, _onPushComponent_initializers, _onPushComponent_extraInitializers);
                __esDecorate(null, null, _checkAlwaysComponent_decorators, { kind: "field", name: "checkAlwaysComponent", static: false, private: false, access: { has: obj => "checkAlwaysComponent" in obj, get: obj => obj.checkAlwaysComponent, set: (obj, value) => { obj.checkAlwaysComponent = value; } }, metadata: _metadata }, _checkAlwaysComponent_initializers, _checkAlwaysComponent_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                App = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return App = _classThis;
        })();
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({ declarations: [App, OnPushComponent, CheckAlwaysComponent] });
            fixture = testing_1.TestBed.createComponent(App);
            fixture.detectChanges();
            appComponent = fixture.componentInstance;
            onPushComponent = appComponent.onPushComponent;
            checkAlwaysComponent = appComponent.checkAlwaysComponent;
        });
        describe('inside OnPush components', () => {
            it('should detect changes when attached', () => {
                onPushComponent.createTemplate();
                fixture.detectChanges(false);
                (0, matchers_1.expect)(appComponent.transplantedViewRefreshCount).toEqual(1);
            });
            it('should not detect changes', () => {
                const viewRef = onPushComponent.createTemplate();
                viewRef.detach();
                fixture.detectChanges(false);
                (0, matchers_1.expect)(appComponent.transplantedViewRefreshCount).toEqual(0);
                viewRef.reattach();
                fixture.detectChanges(false);
                (0, matchers_1.expect)(appComponent.transplantedViewRefreshCount).toEqual(1);
            });
            it('should not detect changes on mixed detached/attached refs', () => {
                onPushComponent.createTemplate();
                const viewRef = onPushComponent.createTemplate();
                viewRef.detach();
                fixture.detectChanges(false);
                (0, matchers_1.expect)(appComponent.transplantedViewRefreshCount).toEqual(1);
                viewRef.reattach();
                fixture.detectChanges(false);
                (0, matchers_1.expect)(appComponent.transplantedViewRefreshCount).toEqual(3);
            });
        });
        describe('inside CheckAlways component', () => {
            it('should detect changes when attached', () => {
                checkAlwaysComponent.createTemplate();
                fixture.detectChanges(false);
                (0, matchers_1.expect)(appComponent.transplantedViewRefreshCount).toEqual(1);
            });
            it('should not detect changes', () => {
                const viewRef = checkAlwaysComponent.createTemplate();
                viewRef.detach();
                fixture.detectChanges(false);
                (0, matchers_1.expect)(appComponent.transplantedViewRefreshCount).toEqual(0);
                viewRef.reattach();
                fixture.detectChanges(false);
                (0, matchers_1.expect)(appComponent.transplantedViewRefreshCount).toEqual(1);
            });
            it('should not detect changes on mixed detached/attached refs', () => {
                checkAlwaysComponent.createTemplate();
                const viewRef = checkAlwaysComponent.createTemplate();
                viewRef.detach();
                fixture.detectChanges(false);
                (0, matchers_1.expect)(appComponent.transplantedViewRefreshCount).toEqual(1);
                viewRef.reattach();
                fixture.detectChanges(false);
                (0, matchers_1.expect)(appComponent.transplantedViewRefreshCount).toEqual(3);
            });
        });
        it('does not cause error if running change detection on detached view', () => {
            let Insertion = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'insertion',
                        template: `<ng-container #vc></ng-container>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _viewContainer_decorators;
                let _viewContainer_initializers = [];
                let _viewContainer_extraInitializers = [];
                let _template_decorators;
                let _template_initializers = [];
                let _template_extraInitializers = [];
                var Insertion = _classThis = class {
                    ngOnChanges() {
                        return this.viewContainer.createEmbeddedView(this.template);
                    }
                    constructor() {
                        this.viewContainer = __runInitializers(this, _viewContainer_initializers, void 0);
                        this.template = (__runInitializers(this, _viewContainer_extraInitializers), __runInitializers(this, _template_initializers, void 0));
                        __runInitializers(this, _template_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Insertion");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _viewContainer_decorators = [(0, core_1.ViewChild)('vc', { read: core_1.ViewContainerRef, static: true })];
                    _template_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _viewContainer_decorators, { kind: "field", name: "viewContainer", static: false, private: false, access: { has: obj => "viewContainer" in obj, get: obj => obj.viewContainer, set: (obj, value) => { obj.viewContainer = value; } }, metadata: _metadata }, _viewContainer_initializers, _viewContainer_extraInitializers);
                    __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Insertion = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Insertion = _classThis;
            })();
            let Root = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <ng-template #transplantedTemplate></ng-template>
          <insertion [template]="transplantedTemplate"></insertion>
        `,
                        imports: [Insertion],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Root = _classThis = class {
                    constructor() {
                        this.cdr = (0, core_1.inject)(core_1.ChangeDetectorRef);
                    }
                };
                __setFunctionName(_classThis, "Root");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Root = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Root = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(Root);
            fixture.componentInstance.cdr.detach();
            fixture.componentInstance.cdr.detectChanges();
        });
        it('backwards reference still updated if detaching root during change detection', () => {
            let Insertion = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'insertion',
                        template: `<ng-container #vc></ng-container>`,
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _viewContainer_decorators;
                let _viewContainer_initializers = [];
                let _viewContainer_extraInitializers = [];
                let _template_decorators;
                let _template_initializers = [];
                let _template_extraInitializers = [];
                var Insertion = _classThis = class {
                    ngOnChanges() {
                        return this.viewContainer.createEmbeddedView(this.template);
                    }
                    constructor() {
                        this.viewContainer = __runInitializers(this, _viewContainer_initializers, void 0);
                        this.template = (__runInitializers(this, _viewContainer_extraInitializers), __runInitializers(this, _template_initializers, void 0));
                        __runInitializers(this, _template_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Insertion");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _viewContainer_decorators = [(0, core_1.ViewChild)('vc', { read: core_1.ViewContainerRef, static: true })];
                    _template_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _viewContainer_decorators, { kind: "field", name: "viewContainer", static: false, private: false, access: { has: obj => "viewContainer" in obj, get: obj => obj.viewContainer, set: (obj, value) => { obj.viewContainer = value; } }, metadata: _metadata }, _viewContainer_initializers, _viewContainer_extraInitializers);
                    __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Insertion = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Insertion = _classThis;
            })();
            let Declaration = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<ng-template #template>{{value}}</ng-template>',
                        selector: 'declaration',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _transplantedTemplate_decorators;
                let _transplantedTemplate_initializers = [];
                let _transplantedTemplate_extraInitializers = [];
                let _value_decorators;
                let _value_initializers = [];
                let _value_extraInitializers = [];
                var Declaration = _classThis = class {
                    constructor() {
                        this.transplantedTemplate = __runInitializers(this, _transplantedTemplate_initializers, void 0);
                        this.value = (__runInitializers(this, _transplantedTemplate_extraInitializers), __runInitializers(this, _value_initializers, void 0));
                        __runInitializers(this, _value_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "Declaration");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _transplantedTemplate_decorators = [(0, core_1.ViewChild)('template', { static: true })];
                    _value_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _transplantedTemplate_decorators, { kind: "field", name: "transplantedTemplate", static: false, private: false, access: { has: obj => "transplantedTemplate" in obj, get: obj => obj.transplantedTemplate, set: (obj, value) => { obj.transplantedTemplate = value; } }, metadata: _metadata }, _transplantedTemplate_initializers, _transplantedTemplate_extraInitializers);
                    __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Declaration = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Declaration = _classThis;
            })();
            let Root = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <insertion [template]="declaration?.transplantedTemplate"></insertion>
          <declaration [value]="value"></declaration>
          {{incrementChecks()}}
        `,
                        imports: [Insertion, Declaration],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _declaration_decorators;
                let _declaration_initializers = [];
                let _declaration_extraInitializers = [];
                var Root = _classThis = class {
                    constructor() {
                        this.declaration = __runInitializers(this, _declaration_initializers, void 0);
                        this.cdr = (__runInitializers(this, _declaration_extraInitializers), (0, core_1.inject)(core_1.ChangeDetectorRef));
                        this.value = 'initial';
                        this.templateExecutions = 0;
                    }
                    incrementChecks() {
                        this.templateExecutions++;
                    }
                };
                __setFunctionName(_classThis, "Root");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _declaration_decorators = [(0, core_1.ViewChild)(Declaration, { static: true })];
                    __esDecorate(null, null, _declaration_decorators, { kind: "field", name: "declaration", static: false, private: false, access: { has: obj => "declaration" in obj, get: obj => obj.declaration, set: (obj, value) => { obj.declaration = value; } }, metadata: _metadata }, _declaration_initializers, _declaration_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Root = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Root = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(Root);
            fixture.detectChanges(false);
            (0, matchers_1.expect)(fixture.nativeElement.innerText).toEqual('initial');
            (0, matchers_1.expect)(fixture.componentInstance.templateExecutions).toEqual(1);
            // Root is detached and value in transplanted view updates during CD. Because it is inserted
            // backwards, this requires a rerun of the traversal at the root. This test ensures we still
            // get the rerun even when the root is detached.
            fixture.componentInstance.cdr.detach();
            fixture.componentInstance.value = 'new';
            fixture.componentInstance.cdr.detectChanges();
            (0, matchers_1.expect)(fixture.componentInstance.templateExecutions).toEqual(2);
            (0, matchers_1.expect)(fixture.nativeElement.innerText).toEqual('new');
        });
    });
    it('can use AsyncPipe on new Observable in insertion tree when used as backwards reference', () => {
        let Insertion = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'insertion',
                    imports: [common_1.NgTemplateOutlet],
                    template: ` <ng-container [ngTemplateOutlet]="template"> </ng-container>`,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _template_decorators;
            let _template_initializers = [];
            let _template_extraInitializers = [];
            var Insertion = _classThis = class {
                constructor(changeDetectorRef) {
                    this.changeDetectorRef = changeDetectorRef;
                    this.template = __runInitializers(this, _template_initializers, void 0);
                    __runInitializers(this, _template_extraInitializers);
                    this.changeDetectorRef = changeDetectorRef;
                }
            };
            __setFunctionName(_classThis, "Insertion");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _template_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Insertion = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Insertion = _classThis;
        })();
        let Declaration = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    imports: [Insertion, common_1.AsyncPipe],
                    template: `<ng-template #myTmpl> {{newObservable() | async}} </ng-template>`,
                    selector: 'declaration',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _template_decorators;
            let _template_initializers = [];
            let _template_extraInitializers = [];
            var Declaration = _classThis = class {
                newObservable() {
                    return (0, rxjs_1.of)('');
                }
                constructor() {
                    this.template = __runInitializers(this, _template_initializers, void 0);
                    __runInitializers(this, _template_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Declaration");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _template_decorators = [(0, core_1.ViewChild)('myTmpl', { static: true })];
                __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Declaration = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Declaration = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    imports: [Declaration, Insertion],
                    template: '<insertion [template]="declaration.template"/><declaration #declaration/>',
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
        testing_1.TestBed.configureTestingModule({
            providers: [
                {
                    provide: core_1.ErrorHandler,
                    useClass: class extends core_1.ErrorHandler {
                        handleError(e) {
                            throw e;
                        }
                    },
                },
            ],
        });
        const app = (0, core_1.createComponent)(App, { environmentInjector: testing_1.TestBed.inject(core_1.EnvironmentInjector) });
        const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
        appRef.attachView(app.hostView);
        // ApplicationRef has a loop to continue refreshing dirty views. If done incorrectly,
        // refreshing the backwards reference transplanted view can cause an infinite loop because it
        // goes and marks the root view dirty, which then starts the process all over again by
        // checking the declaration.
        (0, matchers_1.expect)(() => appRef.tick()).not.toThrow();
        app.destroy();
    });
    it('does not cause infinite loops with exhaustive checkNoChanges', () => __awaiter(void 0, void 0, void 0, function* () {
        testing_1.TestBed.configureTestingModule({
            providers: [(0, provide_check_no_changes_config_1.provideCheckNoChangesConfig)({ interval: 1, exhaustive: true })],
        });
        const errorSpy = spyOn(console, 'error').and.callFake((...v) => {
            fail('console errored with ' + v);
        });
        let Insertion = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'insertion',
                    template: `<ng-container #vc></ng-container>`,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _viewContainer_decorators;
            let _viewContainer_initializers = [];
            let _viewContainer_extraInitializers = [];
            let _template_decorators;
            let _template_initializers = [];
            let _template_extraInitializers = [];
            var Insertion = _classThis = class {
                ngOnChanges() {
                    return this.viewContainer.createEmbeddedView(this.template);
                }
                constructor() {
                    this.viewContainer = __runInitializers(this, _viewContainer_initializers, void 0);
                    this.template = (__runInitializers(this, _viewContainer_extraInitializers), __runInitializers(this, _template_initializers, void 0));
                    __runInitializers(this, _template_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Insertion");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _viewContainer_decorators = [(0, core_1.ViewChild)('vc', { read: core_1.ViewContainerRef, static: true })];
                _template_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _viewContainer_decorators, { kind: "field", name: "viewContainer", static: false, private: false, access: { has: obj => "viewContainer" in obj, get: obj => obj.viewContainer, set: (obj, value) => { obj.viewContainer = value; } }, metadata: _metadata }, _viewContainer_initializers, _viewContainer_extraInitializers);
                __esDecorate(null, null, _template_decorators, { kind: "field", name: "template", static: false, private: false, access: { has: obj => "template" in obj, get: obj => obj.template, set: (obj, value) => { obj.template = value; } }, metadata: _metadata }, _template_initializers, _template_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Insertion = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Insertion = _classThis;
        })();
        let Root = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `
          <ng-template #template>hello world</ng-template>
          <insertion [template]="transplantedTemplate"></insertion>
        `,
                    imports: [Insertion],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _transplantedTemplate_decorators;
            let _transplantedTemplate_initializers = [];
            let _transplantedTemplate_extraInitializers = [];
            var Root = _classThis = class {
                constructor() {
                    this.transplantedTemplate = __runInitializers(this, _transplantedTemplate_initializers, void 0);
                    __runInitializers(this, _transplantedTemplate_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Root");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _transplantedTemplate_decorators = [(0, core_1.ViewChild)('template', { static: true })];
                __esDecorate(null, null, _transplantedTemplate_decorators, { kind: "field", name: "transplantedTemplate", static: false, private: false, access: { has: obj => "transplantedTemplate" in obj, get: obj => obj.transplantedTemplate, set: (obj, value) => { obj.transplantedTemplate = value; } }, metadata: _metadata }, _transplantedTemplate_initializers, _transplantedTemplate_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Root = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Root = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(Root);
        testing_1.TestBed.inject(core_1.ApplicationRef).attachView(fixture.componentRef.hostView);
        // wait the 1 tick for exhaustive check to trigger
        yield new Promise((r) => setTimeout(r, 1));
        (0, matchers_1.expect)(errorSpy).not.toHaveBeenCalled();
    }));
});
function trim(text) {
    return text ? text.replace(/[\s\n]+/gm, ' ').trim() : '';
}
