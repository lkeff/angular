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
const core_1 = require("@angular/core");
const recommendations_1 = require("./recommendations");
const clipboard_1 = require("@angular/cdk/clipboard");
const menu_1 = require("@angular/cdk/menu");
const checkbox_1 = require("@angular/material/checkbox");
const input_1 = require("@angular/material/input");
const card_1 = require("@angular/material/card");
const grid_list_1 = require("@angular/material/grid-list");
const button_toggle_1 = require("@angular/material/button-toggle");
const docs_1 = require("@angular/docs");
const router_1 = require("@angular/router");
const marked_1 = require("marked");
let AppComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'adev-update-guide',
            templateUrl: './update.component.html',
            styleUrl: './update.component.scss',
            imports: [
                checkbox_1.MatCheckboxModule,
                input_1.MatInputModule,
                card_1.MatCardModule,
                grid_list_1.MatGridListModule,
                button_toggle_1.MatButtonToggleModule,
                menu_1.CdkMenuModule,
                docs_1.IconComponent,
            ],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _copyCode_decorators;
    var AppComponent = _classThis = class {
        constructor() {
            this.title = (__runInitializers(this, _instanceExtraInitializers), '');
            this.level = 1;
            this.options = {
                ngUpgrade: false,
                material: false,
                windows: isWindows(),
            };
            this.optionList = [
                { id: 'ngUpgrade', name: 'ngUpgrade', description: 'to combine AngularJS & Angular' },
                { id: 'material', name: 'Angular Material', description: '' },
                { id: 'windows', name: 'Windows', description: '' },
            ];
            this.packageManager = 'npm install';
            this.beforeRecommendations = [];
            this.duringRecommendations = [];
            this.afterRecommendations = [];
            this.versions = [
                { name: '19.0', number: 1900 },
                { name: '18.0', number: 1800 },
                { name: '17.0', number: 1700 },
                { name: '16.0', number: 1600 },
                { name: '15.0', number: 1500 },
                { name: '14.0', number: 1400 },
                { name: '13.0', number: 1300 },
                { name: '12.0', number: 1200 },
                { name: '11.0', number: 1100 },
                { name: '10.2', number: 1020 },
                { name: '10.1', number: 1010 },
                { name: '10.0', number: 1000 },
                { name: '9.1', number: 910 },
                { name: '9.0', number: 900 },
                { name: '8.2', number: 820 },
                { name: '8.1', number: 810 },
                { name: '8.0', number: 800 },
                { name: '7.2', number: 720 },
                { name: '7.1', number: 710 },
                { name: '7.0', number: 700 },
                { name: '6.1', number: 610 },
                { name: '6.0', number: 600 },
                { name: '5.2', number: 520 },
                { name: '5.1', number: 510 },
                { name: '5.0', number: 500 },
                { name: '4.4', number: 440 },
                { name: '4.3', number: 430 },
                { name: '4.2', number: 420 },
                { name: '4.1', number: 410 },
                { name: '4.0', number: 400 },
                { name: '2.4', number: 204 },
                { name: '2.3', number: 203 },
                { name: '2.2', number: 202 },
                { name: '2.1', number: 201 },
                { name: '2.0', number: 200 },
            ];
            this.from = this.versions.find((version) => version.name === '17.0');
            this.to = this.versions.find((version) => version.name === '18.0');
            this.futureVersion = 2000;
            this.steps = recommendations_1.RECOMMENDATIONS;
            this.clipboard = (0, core_1.inject)(clipboard_1.Clipboard);
            this.router = (0, core_1.inject)(router_1.Router);
            this.activatedRoute = (0, core_1.inject)(router_1.ActivatedRoute);
            const queryMap = this.activatedRoute.snapshot.queryParamMap;
            // Detect settings in URL
            this.level = parseInt(queryMap.get('l'), 10) || this.level;
            // Detect versions of from and to
            const versions = queryMap.get('v');
            if (versions) {
                const [from, to] = versions.split('-');
                this.from = this.versions.find((version) => version.name === from);
                this.to = this.versions.find((version) => version.name === to);
                this.showUpdatePath();
            }
        }
        copyCode({ tagName, textContent }) {
            if (tagName === 'CODE') {
                // TODO: add a toast notification
                this.clipboard.copy(textContent);
            }
        }
        showUpdatePath() {
            return __awaiter(this, void 0, void 0, function* () {
                this.beforeRecommendations = [];
                this.duringRecommendations = [];
                this.afterRecommendations = [];
                // Refuse to generate recommendations for downgrades
                if (this.to.number < this.from.number) {
                    alert('We do not support downgrading versions of Angular.');
                    return;
                }
                const labelTitle = 'Guide to update your Angular application';
                const labelBasic = 'basic applications';
                const labelMedium = 'medium applications';
                const labelAdvanced = 'advanced applications';
                this.title = `${labelTitle} v${this.from.name} -> v${this.to.name}
    for
    ${this.level < 2 ? labelBasic : this.level < 3 ? labelMedium : labelAdvanced}`;
                // Find applicable steps and organize them into before, during, and after upgrade
                for (const step of this.steps) {
                    if (step.level <= this.level && step.necessaryAsOf > this.from.number) {
                        // Check Options
                        // Only show steps that don't have a required option
                        // Or when the user has a matching option selected
                        let skip = false;
                        for (const option of this.optionList) {
                            // Skip steps which require an option not set by the user.
                            if (step[option.id] && !this.options[option.id]) {
                                skip = true;
                            }
                            // Skip steps which require **not** using an option which **is** set
                            // by the user.
                            if (step[option.id] === false && this.options[option.id]) {
                                skip = true;
                            }
                        }
                        if (skip) {
                            continue;
                        }
                        // Render and replace variables
                        step.renderedStep = yield (0, marked_1.marked)(this.replaceVariables(step.action));
                        // If you could do it before now, but didn't have to finish it before now
                        if (step.possibleIn <= this.from.number && step.necessaryAsOf >= this.from.number) {
                            this.beforeRecommendations.push(step);
                            // If you couldn't do it before now, and you must do it now
                        }
                        else if (step.possibleIn > this.from.number && step.necessaryAsOf <= this.to.number) {
                            this.duringRecommendations.push(step);
                        }
                        else if (step.possibleIn <= this.to.number) {
                            this.afterRecommendations.push(step);
                        }
                    }
                }
                // Update the URL so users can link to this transition
                this.router.navigate([], {
                    relativeTo: this.activatedRoute,
                    queryParams: { v: `${this.from.name}-${this.to.name}`, l: this.level },
                    queryParamsHandling: 'merge',
                });
                // Tell everyone how to upgrade for v6 or earlier
                this.renderPreV6Instructions();
            });
        }
        getAdditionalDependencies(version) {
            if (version < 500) {
                return `typescript@'>=2.1.0 <2.4.0'`;
            }
            else if (version < 600) {
                return `typescript@2.4.2 rxjs@^5.5.2`;
            }
            else {
                return `typescript@2.7.x rxjs@^6.0.0`;
            }
        }
        getAngularVersion(version) {
            if (version < 400) {
                return `'^2.0.0'`;
            }
            else {
                const major = Math.floor(version / 100);
                const minor = Math.floor((version - major * 100) / 10);
                return `^${major}.${minor}.0`;
            }
        }
        renderPreV6Instructions() {
            return __awaiter(this, void 0, void 0, function* () {
                let upgradeStep;
                const additionalDeps = this.getAdditionalDependencies(this.to.number);
                const angularVersion = this.getAngularVersion(this.to.number);
                const angularPackages = [
                    'animations',
                    'common',
                    'compiler',
                    'compiler-cli',
                    'core',
                    'forms',
                    'http',
                    'platform-browser',
                    'platform-browser-dynamic',
                    'platform-server',
                    'router',
                ];
                // Provide npm/yarn instructions for versions before 6
                if (this.to.number < 600) {
                    const actionMessage = `Update all of your dependencies to the latest Angular and the right version of TypeScript.`;
                    if (isWindows()) {
                        const packages = angularPackages
                            .map((packageName) => `@angular/${packageName}@${angularVersion}`)
                            .join(' ') +
                            ' ' +
                            additionalDeps;
                        upgradeStep = {
                            step: 'General Update',
                            action: `${actionMessage}
          If you are using Windows, you can use:

\`${this.packageManager} ${packages}\``,
                        };
                    }
                    else {
                        const packages = `@angular/{${angularPackages.join(',')}}@${angularVersion} ${additionalDeps}`;
                        upgradeStep = {
                            step: 'General update',
                            action: `${actionMessage}
          If you are using Linux/Mac, you can use:

\`${this.packageManager} ${packages}\``,
                        };
                    }
                    // Npm installs typescript wrong in v5, let's manually specify
                    // https://github.com/npm/npm/issues/16813
                    if (this.packageManager === 'npm install' && this.to.number === 500) {
                        upgradeStep.action += `

\`npm install typescript@2.4.2 --save-exact\``;
                    }
                    upgradeStep.renderedStep = yield (0, marked_1.marked)(upgradeStep.action);
                    this.duringRecommendations.push(upgradeStep);
                }
            });
        }
        replaceVariables(action) {
            let newAction = action;
            newAction = newAction.replace('${packageManagerGlobalInstall}', this.packageManager === 'npm install' ? 'npm install -g' : 'yarn global add');
            newAction = newAction.replace('${packageManagerInstall}', this.packageManager);
            return newAction;
        }
    };
    __setFunctionName(_classThis, "AppComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _copyCode_decorators = [(0, core_1.HostListener)('click', ['$event.target'])];
        __esDecorate(_classThis, null, _copyCode_decorators, { kind: "method", name: "copyCode", static: false, private: false, access: { has: obj => "copyCode" in obj, get: obj => obj.copyCode }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppComponent = _classThis;
})();
exports.default = AppComponent;
/** Whether or not the user is running on a Windows OS. */
function isWindows() {
    if (typeof navigator === 'undefined') {
        return false;
    }
    const platform = navigator.platform.toLowerCase();
    return platform.includes('windows') || platform.includes('win32');
}
