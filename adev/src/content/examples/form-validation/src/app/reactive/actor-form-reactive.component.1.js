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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroFormReactiveComponent = void 0;
// #docplaster
// #docregion
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const forbidden_name_directive_1 = require("../shared/forbidden-name.directive");
let HeroFormReactiveComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-actor-form-reactive',
            templateUrl: './actor-form-reactive.component.html',
            styleUrls: ['./actor-form-reactive.component.css'],
            imports: [forms_1.ReactiveFormsModule],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HeroFormReactiveComponent = _classThis = class {
        constructor() {
            this.skills = ['Method Acting', 'Singing', 'Dancing', 'Swordfighting'];
            this.actor = { name: 'Tom Cruise', role: 'Romeo', skill: this.skills[3] };
            // #docregion form-group
            // #docregion custom-validator
            this.actorForm = new forms_1.FormGroup({
                name: new forms_1.FormControl(this.actor.name, [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(4),
                    (0, forbidden_name_directive_1.forbiddenNameValidator)(/bob/i), // <-- Here's how you pass in the custom validator.
                ]),
                role: new forms_1.FormControl(this.actor.role),
                skill: new forms_1.FormControl(this.actor.skill, forms_1.Validators.required),
            });
            // #enddocregion form-group
        }
        // #enddocregion custom-validator
        get name() {
            return this.actorForm.get('name');
        }
        get skill() {
            return this.actorForm.get('skill');
        }
    };
    __setFunctionName(_classThis, "HeroFormReactiveComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HeroFormReactiveComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HeroFormReactiveComponent = _classThis;
})();
exports.HeroFormReactiveComponent = HeroFormReactiveComponent;
// #enddocregion
