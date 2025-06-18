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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleModule = exports.PersonManagementApplication = exports.PersonsComponent = exports.PersonsDetailComponent = exports.FullNameComponent = exports.DataService = void 0;
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const platform_browser_1 = require("@angular/platform-browser");
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
/**
 * You can find the AngularJS implementation of this example here:
 * https://github.com/wardbell/ng1DataBinding
 */
// ---- model
let _nextId = 1;
class Person {
    constructor(firstName, lastName, yearOfBirth) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.yearOfBirth = yearOfBirth;
        this.personId = _nextId++;
        this.firstName = firstName;
        this.lastName = lastName;
        this.mom = null;
        this.dad = null;
        this.friends = [];
        this.personId = _nextId++;
    }
    get age() {
        return 2015 - this.yearOfBirth;
    }
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    get friendNames() {
        return this.friends.map((f) => f.fullName).join(', ');
    }
}
// ---- services
let DataService = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DataService = _classThis = class {
        constructor() {
            this.persons = [
                new Person('Victor', 'Savkin', 1930),
                new Person('Igor', 'Minar', 1920),
                new Person('John', 'Papa', 1910),
                new Person('Nancy', 'Duarte', 1910),
                new Person('Jack', 'Papa', 1910),
                new Person('Jill', 'Papa', 1910),
                new Person('Ward', 'Bell', 1910),
                new Person('Robert', 'Bell', 1910),
                new Person('Tracy', 'Ward', 1910),
                new Person('Dan', 'Wahlin', 1910),
            ];
            this.persons[0].friends = [0, 1, 2, 6, 9].map((_) => this.persons[_]);
            this.persons[1].friends = [0, 2, 6, 9].map((_) => this.persons[_]);
            this.persons[2].friends = [0, 1, 6, 9].map((_) => this.persons[_]);
            this.persons[6].friends = [0, 1, 2, 9].map((_) => this.persons[_]);
            this.persons[9].friends = [0, 1, 2, 6].map((_) => this.persons[_]);
            this.persons[2].mom = this.persons[5];
            this.persons[2].dad = this.persons[4];
            this.persons[6].mom = this.persons[8];
            this.persons[6].dad = this.persons[7];
            this.currentPerson = this.persons[0];
        }
    };
    __setFunctionName(_classThis, "DataService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DataService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DataService = _classThis;
})();
exports.DataService = DataService;
// ---- components
let FullNameComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'full-name-cmp',
            template: `
    <h1>Edit Full Name</h1>
    <div>
      <form>
        <div>
          <label>
            First:
            <input
              [(ngModel)]="person.firstName"
              type="text"
              placeholder="First name"
              name="firstName"
            />
          </label>
        </div>

        <div>
          <label>
            Last:
            <input
              [(ngModel)]="person.lastName"
              type="text"
              placeholder="Last name"
              name="lastName"
            />
          </label>
        </div>

        <div>
          <label>{{ person.fullName }}</label>
        </div>
      </form>
    </div>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FullNameComponent = _classThis = class {
        constructor(_service) {
            this._service = _service;
        }
        get person() {
            return this._service.currentPerson;
        }
    };
    __setFunctionName(_classThis, "FullNameComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FullNameComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FullNameComponent = _classThis;
})();
exports.FullNameComponent = FullNameComponent;
let PersonsDetailComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'person-detail-cmp',
            template: `
    <h2>{{ person.fullName }}</h2>

    <div>
      <form>
        <div>
          <label
            >First:
            <input
              [(ngModel)]="person.firstName"
              type="text"
              placeholder="First name"
              name="firstName"
          /></label>
        </div>

        <div>
          <label
            >Last:
            <input
              [(ngModel)]="person.lastName"
              type="text"
              placeholder="Last name"
              name="lastName"
          /></label>
        </div>

        <div>
          <label
            >Year of birth:
            <input
              [(ngModel)]="person.yearOfBirth"
              type="number"
              placeholder="Year of birth"
              name="yearOfBirth"
          /></label>
          Age: {{ person.age }}
        </div>
        <div *ngIf="person.mom != null">
          <label>Mom:</label>
          <input
            [(ngModel)]="person.mom.firstName"
            type="text"
            placeholder="Mom's first name"
            name="momFirstName"
          />
          <input
            [(ngModel)]="person.mom.lastName"
            type="text"
            placeholder="Mom's last name"
            name="momLastName"
          />
          {{ person.mom.fullName }}
        </div>

        <div *ngIf="person.dad != null">
          <label>Dad:</label>
          <input
            [(ngModel)]="person.dad.firstName"
            type="text"
            placeholder="Dad's first name"
            name="dasFirstName"
          />
          <input
            [(ngModel)]="person.dad.lastName"
            type="text"
            placeholder="Dad's last name"
            name="dadLastName"
          />
          {{ person.dad.fullName }}
        </div>

        <div *ngIf="person.friends.length > 0">
          <label>Friends:</label>
          {{ person.friendNames }}
        </div>
      </form>
    </div>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PersonsDetailComponent = _classThis = class {
        constructor(_service) {
            this._service = _service;
        }
        get person() {
            return this._service.currentPerson;
        }
    };
    __setFunctionName(_classThis, "PersonsDetailComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PersonsDetailComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PersonsDetailComponent = _classThis;
})();
exports.PersonsDetailComponent = PersonsDetailComponent;
let PersonsComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'persons-cmp',
            template: `
    <h1>FullName Demo</h1>
    <div>
      <ul>
        <li *ngFor="let person of persons">
          <label (click)="select(person)">{{ person.fullName }}</label>
        </li>
      </ul>

      <person-detail-cmp></person-detail-cmp>
    </div>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PersonsComponent = _classThis = class {
        constructor(_service) {
            this._service = _service;
            this.persons = _service.persons;
        }
        select(person) {
            this._service.currentPerson = person;
        }
    };
    __setFunctionName(_classThis, "PersonsComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PersonsComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PersonsComponent = _classThis;
})();
exports.PersonsComponent = PersonsComponent;
let PersonManagementApplication = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'person-management-app',
            viewProviders: [DataService],
            template: `
    <button (click)="switchToEditName()">Edit Full Name</button>
    <button (click)="switchToPersonList()">Person Array</button>

    <full-name-cmp *ngIf="mode == 'editName'"></full-name-cmp>
    <persons-cmp *ngIf="mode == 'personList'"></persons-cmp>
  `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PersonManagementApplication = _classThis = class {
        switchToEditName() {
            this.mode = 'editName';
        }
        switchToPersonList() {
            this.mode = 'personList';
        }
    };
    __setFunctionName(_classThis, "PersonManagementApplication");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PersonManagementApplication = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PersonManagementApplication = _classThis;
})();
exports.PersonManagementApplication = PersonManagementApplication;
let ExampleModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            bootstrap: [PersonManagementApplication],
            declarations: [
                PersonManagementApplication,
                FullNameComponent,
                PersonsComponent,
                PersonsDetailComponent,
            ],
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ExampleModule = _classThis = class {
    };
    __setFunctionName(_classThis, "ExampleModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExampleModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExampleModule = _classThis;
})();
exports.ExampleModule = ExampleModule;
(0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(ExampleModule);
