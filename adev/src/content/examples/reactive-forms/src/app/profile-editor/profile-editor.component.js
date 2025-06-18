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
exports.ProfileEditorComponent = void 0;
// #docplaster
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
// #docregion validator-imports
const forms_2 = require("@angular/forms");
const common_1 = require("@angular/common");
let ProfileEditorComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-profile-editor',
            templateUrl: './profile-editor.component.html',
            styleUrls: ['./profile-editor.component.css'],
            imports: [forms_1.ReactiveFormsModule, common_1.JsonPipe],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ProfileEditorComponent = _classThis = class {
        constructor() {
            // #docregion required-validator, aliases
            this.formBuilder = (0, core_1.inject)(forms_1.FormBuilder);
            this.profileForm = this.formBuilder.group({
                firstName: ['', forms_2.Validators.required],
                lastName: [''],
                address: this.formBuilder.group({
                    street: [''],
                    city: [''],
                    state: [''],
                    zip: [''],
                }),
                // #enddocregion required-validator
                aliases: this.formBuilder.array([this.formBuilder.control('')]),
                // #docregion required-validator
            });
            // #enddocregion on-submit
        }
        // #enddocregion required-validator, aliases
        // #docregion aliases-getter
        get aliases() {
            return this.profileForm.get('aliases');
        }
        // #enddocregion aliases-getter
        updateProfile() {
            this.profileForm.patchValue({
                firstName: 'Nancy',
                address: {
                    street: '123 Drew Street',
                },
            });
        }
        // #docregion add-alias
        addAlias() {
            this.aliases.push(this.formBuilder.control(''));
        }
        // #enddocregion add-alias
        // #docregion on-submit
        onSubmit() {
            // TODO: Use EventEmitter with form value
            console.warn(this.profileForm.value);
        }
    };
    __setFunctionName(_classThis, "ProfileEditorComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProfileEditorComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProfileEditorComponent = _classThis;
})();
exports.ProfileEditorComponent = ProfileEditorComponent;
