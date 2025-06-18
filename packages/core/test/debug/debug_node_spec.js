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
const common_1 = require("@angular/common");
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
const by_1 = require("@angular/platform-browser/src/dom/debug/by");
const browser_util_1 = require("@angular/platform-browser/testing/src/browser_util");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
let Logger = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Logger = _classThis = class {
        constructor() {
            this.logs = [];
        }
        add(thing) {
            this.logs.push(thing);
        }
    };
    __setFunctionName(_classThis, "Logger");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Logger = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Logger = _classThis;
})();
let MessageDir = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[message]',
            inputs: ['message'],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MessageDir = _classThis = class {
        constructor(logger) {
            this.logger = logger;
        }
        set message(newMessage) {
            this.logger.add(newMessage);
        }
    };
    __setFunctionName(_classThis, "MessageDir");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MessageDir = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MessageDir = _classThis;
})();
let WithTitleDir = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[with-title]',
            inputs: ['title'],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var WithTitleDir = _classThis = class {
        constructor() {
            this.title = '';
        }
    };
    __setFunctionName(_classThis, "WithTitleDir");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WithTitleDir = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WithTitleDir = _classThis;
})();
let ChildComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'child-comp',
            template: `<div class="child" message="child">
               <span class="childnested" message="nestedchild">Child</span>
             </div>
             <span class="child" [innerHtml]="childBinding"></span>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ChildComp = _classThis = class {
        constructor() {
            this.childBinding = 'Original';
        }
    };
    __setFunctionName(_classThis, "ChildComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChildComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChildComp = _classThis;
})();
let ParentComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'parent-comp',
            viewProviders: [Logger],
            template: `<div class="parent" message="parent">
               <span class="parentnested" message="nestedparent">Parent</span>
             </div>
             <span class="parent" [innerHtml]="parentBinding"></span>
             <child-comp class="child-comp-class"></child-comp>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ParentComp = _classThis = class {
        constructor() {
            this.parentBinding = 'OriginalParent';
        }
    };
    __setFunctionName(_classThis, "ParentComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ParentComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ParentComp = _classThis;
})();
let CustomEmitter = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: 'custom-emitter',
            outputs: ['myevent'],
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CustomEmitter = _classThis = class {
        constructor() {
            this.myevent = new core_1.EventEmitter();
        }
    };
    __setFunctionName(_classThis, "CustomEmitter");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CustomEmitter = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CustomEmitter = _classThis;
})();
let EventsComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'events-comp',
            template: `<button (click)="handleClick()"></button>
             <custom-emitter (myevent)="handleCustom()"></custom-emitter>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var EventsComp = _classThis = class {
        constructor() {
            this.clicked = false;
            this.customed = false;
        }
        handleClick() {
            this.clicked = true;
        }
        handleCustom() {
            this.customed = true;
        }
    };
    __setFunctionName(_classThis, "EventsComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EventsComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EventsComp = _classThis;
})();
let ConditionalContentComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'cond-content-comp',
            viewProviders: [Logger],
            template: `<div class="child" message="child" *ngIf="myBool"><ng-content></ng-content></div>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ConditionalContentComp = _classThis = class {
        constructor() {
            this.myBool = false;
        }
    };
    __setFunctionName(_classThis, "ConditionalContentComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ConditionalContentComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ConditionalContentComp = _classThis;
})();
let ConditionalParentComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'conditional-parent-comp',
            viewProviders: [Logger],
            template: `<span class="parent" [innerHtml]="parentBinding"></span>
            <cond-content-comp class="cond-content-comp-class">
              <span class="from-parent"></span>
            </cond-content-comp>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ConditionalParentComp = _classThis = class {
        constructor() {
            this.parentBinding = 'OriginalParent';
        }
    };
    __setFunctionName(_classThis, "ConditionalParentComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ConditionalParentComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ConditionalParentComp = _classThis;
})();
let UsingFor = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'using-for',
            viewProviders: [Logger],
            template: `<span *ngFor="let thing of stuff" [innerHtml]="thing"></span>
            <ul message="list">
              <li *ngFor="let item of stuff" [innerHtml]="item"></li>
            </ul>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var UsingFor = _classThis = class {
        constructor() {
            this.stuff = ['one', 'two', 'three'];
        }
    };
    __setFunctionName(_classThis, "UsingFor");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsingFor = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsingFor = _classThis;
})();
let MyDir = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[mydir]',
            exportAs: 'mydir',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyDir = _classThis = class {
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
let LocalsComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'locals-comp',
            template: `
   <div mydir #alice="mydir"></div>
 `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var LocalsComp = _classThis = class {
    };
    __setFunctionName(_classThis, "LocalsComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LocalsComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LocalsComp = _classThis;
})();
let BankAccount = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'bank-account',
            template: `
   Bank Name: {{bank}}
   Account Id: {{id}}
 `,
            host: {
                'class': 'static-class',
                '[class.absent-class]': 'false',
                '[class.present-class]': 'true',
            },
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _bank_decorators;
    let _bank_initializers = [];
    let _bank_extraInitializers = [];
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    var BankAccount = _classThis = class {
        constructor() {
            this.bank = __runInitializers(this, _bank_initializers, void 0);
            this.id = (__runInitializers(this, _bank_extraInitializers), __runInitializers(this, _id_initializers, void 0));
            this.normalizedBankName = __runInitializers(this, _id_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "BankAccount");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _bank_decorators = [(0, core_1.Input)()];
        _id_decorators = [(0, core_1.Input)('account')];
        __esDecorate(null, null, _bank_decorators, { kind: "field", name: "bank", static: false, private: false, access: { has: obj => "bank" in obj, get: obj => obj.bank, set: (obj, value) => { obj.bank = value; } }, metadata: _metadata }, _bank_initializers, _bank_extraInitializers);
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BankAccount = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BankAccount = _classThis;
})();
let SimpleContentComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: `
    <div class="content" #content>Some content</div>
 `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    var SimpleContentComp = _classThis = class {
        constructor() {
            this.content = __runInitializers(this, _content_initializers, void 0);
            __runInitializers(this, _content_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "SimpleContentComp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _content_decorators = [(0, core_1.ViewChild)('content')];
        __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SimpleContentComp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SimpleContentComp = _classThis;
})();
let TestApp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'test-app',
            template: `
   <bank-account bank="RBC"
                 account="4747"
                 [style.width.px]="width"
                 [style.color]="color"
                 [class.closed]="isClosed"
                 [class.open]="!isClosed"></bank-account>
 `,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestApp = _classThis = class {
        constructor(renderer) {
            this.renderer = renderer;
            this.width = 200;
            this.color = 'red';
            this.isClosed = true;
        }
    };
    __setFunctionName(_classThis, "TestApp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestApp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestApp = _classThis;
})();
let TestCmpt = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'test-cmpt',
            template: ``,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestCmpt = _classThis = class {
    };
    __setFunctionName(_classThis, "TestCmpt");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestCmpt = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestCmpt = _classThis;
})();
let TestCmptWithRenderer = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'test-cmpt-renderer',
            template: ``,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestCmptWithRenderer = _classThis = class {
        constructor(renderer) {
            this.renderer = renderer;
        }
    };
    __setFunctionName(_classThis, "TestCmptWithRenderer");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestCmptWithRenderer = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestCmptWithRenderer = _classThis;
})();
let HostClassBindingCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'host-class-binding',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _hostClasses_decorators;
    let _hostClasses_initializers = [];
    let _hostClasses_extraInitializers = [];
    var HostClassBindingCmp = _classThis = class {
        constructor() {
            this.hostClasses = __runInitializers(this, _hostClasses_initializers, 'class-one class-two');
            __runInitializers(this, _hostClasses_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "HostClassBindingCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _hostClasses_decorators = [(0, core_1.HostBinding)('class')];
        __esDecorate(null, null, _hostClasses_decorators, { kind: "field", name: "hostClasses", static: false, private: false, access: { has: obj => "hostClasses" in obj, get: obj => obj.hostClasses, set: (obj, value) => { obj.hostClasses = value; } }, metadata: _metadata }, _hostClasses_initializers, _hostClasses_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HostClassBindingCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HostClassBindingCmp = _classThis;
})();
let TestCmptWithViewContainerRef = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'test-cmpt-vcref',
            template: `<div></div>`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestCmptWithViewContainerRef = _classThis = class {
        constructor(vcref) {
            this.vcref = vcref;
        }
    };
    __setFunctionName(_classThis, "TestCmptWithViewContainerRef");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestCmptWithViewContainerRef = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestCmptWithViewContainerRef = _classThis;
})();
let TestCmptWithPropBindings = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: `
  <button
    [disabled]="disabled"
    [tabIndex]="tabIndex"
    [title]="title">Click me</button>
`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestCmptWithPropBindings = _classThis = class {
        constructor() {
            this.disabled = true;
            this.tabIndex = 1337;
            this.title = 'hello';
        }
    };
    __setFunctionName(_classThis, "TestCmptWithPropBindings");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestCmptWithPropBindings = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestCmptWithPropBindings = _classThis;
})();
let TestCmptWithPropInterpolation = (() => {
    let _classDecorators = [(0, core_1.Component)({
            template: `
  <button title="{{0}}"></button>
  <button title="a{{1}}b"></button>
  <button title="a{{1}}b{{2}}c"></button>
  <button title="a{{1}}b{{2}}c{{3}}d"></button>
  <button title="a{{1}}b{{2}}c{{3}}d{{4}}e"></button>
  <button title="a{{1}}b{{2}}c{{3}}d{{4}}e{{5}}f"></button>
  <button title="a{{1}}b{{2}}c{{3}}d{{4}}e{{5}}f{{6}}g"></button>
  <button title="a{{1}}b{{2}}c{{3}}d{{4}}e{{5}}f{{6}}g{{7}}h"></button>
  <button title="a{{1}}b{{2}}c{{3}}d{{4}}e{{5}}f{{6}}g{{7}}h{{8}}i"></button>
  <button title="a{{1}}b{{2}}c{{3}}d{{4}}e{{5}}f{{6}}g{{7}}h{{8}}i{{9}}j"></button>
`,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestCmptWithPropInterpolation = _classThis = class {
    };
    __setFunctionName(_classThis, "TestCmptWithPropInterpolation");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestCmptWithPropInterpolation = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestCmptWithPropInterpolation = _classThis;
})();
describe('debug element', () => {
    let fixture;
    beforeEach((0, testing_1.waitForAsync)(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                ChildComp,
                ConditionalContentComp,
                ConditionalParentComp,
                CustomEmitter,
                EventsComp,
                LocalsComp,
                MessageDir,
                MyDir,
                ParentComp,
                TestApp,
                UsingFor,
                BankAccount,
                TestCmpt,
                HostClassBindingCmp,
                TestCmptWithViewContainerRef,
                SimpleContentComp,
                TestCmptWithPropBindings,
                TestCmptWithPropInterpolation,
                TestCmptWithRenderer,
                WithTitleDir,
            ],
            providers: [Logger],
            schemas: [core_1.NO_ERRORS_SCHEMA],
        });
    }));
    it('should list all child nodes', () => {
        fixture = testing_1.TestBed.createComponent(ParentComp);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.debugElement.childNodes.length).toEqual(3);
    });
    it('should list all component child elements', () => {
        fixture = testing_1.TestBed.createComponent(ParentComp);
        fixture.detectChanges();
        const childEls = fixture.debugElement.children;
        // The root component has 3 elements in its view.
        (0, matchers_1.expect)(childEls.length).toEqual(3);
        (0, matchers_1.expect)((0, browser_util_1.hasClass)(childEls[0].nativeElement, 'parent')).toBe(true);
        (0, matchers_1.expect)((0, browser_util_1.hasClass)(childEls[1].nativeElement, 'parent')).toBe(true);
        (0, matchers_1.expect)((0, browser_util_1.hasClass)(childEls[2].nativeElement, 'child-comp-class')).toBe(true);
        const nested = childEls[0].children;
        (0, matchers_1.expect)(nested.length).toEqual(1);
        (0, matchers_1.expect)((0, browser_util_1.hasClass)(nested[0].nativeElement, 'parentnested')).toBe(true);
        const childComponent = childEls[2];
        const childCompChildren = childComponent.children;
        (0, matchers_1.expect)(childCompChildren.length).toEqual(2);
        (0, matchers_1.expect)((0, browser_util_1.hasClass)(childCompChildren[0].nativeElement, 'child')).toBe(true);
        (0, matchers_1.expect)((0, browser_util_1.hasClass)(childCompChildren[1].nativeElement, 'child')).toBe(true);
        const childNested = childCompChildren[0].children;
        (0, matchers_1.expect)(childNested.length).toEqual(1);
        (0, matchers_1.expect)((0, browser_util_1.hasClass)(childNested[0].nativeElement, 'childnested')).toBe(true);
    });
    it('should list conditional component child elements', () => {
        fixture = testing_1.TestBed.createComponent(ConditionalParentComp);
        fixture.detectChanges();
        const childEls = fixture.debugElement.children;
        // The root component has 2 elements in its view.
        (0, matchers_1.expect)(childEls.length).toEqual(2);
        (0, matchers_1.expect)((0, browser_util_1.hasClass)(childEls[0].nativeElement, 'parent')).toBe(true);
        (0, matchers_1.expect)((0, browser_util_1.hasClass)(childEls[1].nativeElement, 'cond-content-comp-class')).toBe(true);
        const conditionalContentComp = childEls[1];
        (0, matchers_1.expect)(conditionalContentComp.children.length).toEqual(0);
        conditionalContentComp.componentInstance.myBool = true;
        fixture.detectChanges();
        (0, matchers_1.expect)(conditionalContentComp.children.length).toEqual(1);
    });
    it('should list child elements within viewports', () => {
        fixture = testing_1.TestBed.createComponent(UsingFor);
        fixture.detectChanges();
        const childEls = fixture.debugElement.children;
        (0, matchers_1.expect)(childEls.length).toEqual(4);
        // The 4th child is the <ul>
        const list = childEls[3];
        (0, matchers_1.expect)(list.children.length).toEqual(3);
    });
    it('should list element attributes', () => {
        fixture = testing_1.TestBed.createComponent(TestApp);
        fixture.detectChanges();
        const bankElem = fixture.debugElement.children[0];
        (0, matchers_1.expect)(bankElem.attributes['bank']).toEqual('RBC');
        (0, matchers_1.expect)(bankElem.attributes['account']).toEqual('4747');
    });
    it('should list element classes', () => {
        fixture = testing_1.TestBed.createComponent(TestApp);
        fixture.detectChanges();
        const bankElem = fixture.debugElement.children[0];
        (0, matchers_1.expect)(bankElem.classes['closed']).toBe(true);
        (0, matchers_1.expect)(bankElem.classes['open']).toBeFalsy();
    });
    it('should get element classes from host bindings', () => {
        fixture = testing_1.TestBed.createComponent(TestApp);
        fixture.detectChanges();
        const debugElement = fixture.debugElement.children[0];
        (0, matchers_1.expect)(debugElement.classes['present-class']).toBe(true, 'Expected bound host CSS class "present-class" to be present');
        (0, matchers_1.expect)(debugElement.classes['absent-class']).toBeFalsy('Expected bound host CSS class "absent-class" to be absent');
    });
    it('should list classes on SVG nodes', () => {
        // Class bindings on SVG elements require a polyfill
        // on IE which we don't include when running tests.
        if (typeof SVGElement !== 'undefined' && !('classList' in SVGElement.prototype)) {
            return;
        }
        testing_1.TestBed.overrideTemplate(TestApp, `<svg [class.foo]="true" [class.bar]="true"></svg>`);
        fixture = testing_1.TestBed.createComponent(TestApp);
        fixture.detectChanges();
        const classes = fixture.debugElement.children[0].classes;
        (0, matchers_1.expect)(classes['foo']).toBe(true);
        (0, matchers_1.expect)(classes['bar']).toBe(true);
    });
    it('should list element styles', () => {
        fixture = testing_1.TestBed.createComponent(TestApp);
        fixture.detectChanges();
        const bankElem = fixture.debugElement.children[0];
        (0, matchers_1.expect)(bankElem.styles['width']).toEqual('200px');
        (0, matchers_1.expect)(bankElem.styles['color']).toEqual('red');
    });
    it('should query child elements by css', () => {
        fixture = testing_1.TestBed.createComponent(ParentComp);
        fixture.detectChanges();
        const childTestEls = fixture.debugElement.queryAll(by_1.By.css('child-comp'));
        (0, matchers_1.expect)(childTestEls.length).toBe(1);
        (0, matchers_1.expect)((0, browser_util_1.hasClass)(childTestEls[0].nativeElement, 'child-comp-class')).toBe(true);
    });
    it('should query child elements by directive', () => {
        fixture = testing_1.TestBed.createComponent(ParentComp);
        fixture.detectChanges();
        const childTestEls = fixture.debugElement.queryAll(by_1.By.directive(MessageDir));
        (0, matchers_1.expect)(childTestEls.length).toBe(4);
        (0, matchers_1.expect)((0, browser_util_1.hasClass)(childTestEls[0].nativeElement, 'parent')).toBe(true);
        (0, matchers_1.expect)((0, browser_util_1.hasClass)(childTestEls[1].nativeElement, 'parentnested')).toBe(true);
        (0, matchers_1.expect)((0, browser_util_1.hasClass)(childTestEls[2].nativeElement, 'child')).toBe(true);
        (0, matchers_1.expect)((0, browser_util_1.hasClass)(childTestEls[3].nativeElement, 'childnested')).toBe(true);
    });
    it('should query projected child elements by directive', () => {
        let ExampleDirectiveA = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: 'example-directive-a',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ExampleDirectiveA = _classThis = class {
            };
            __setFunctionName(_classThis, "ExampleDirectiveA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ExampleDirectiveA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ExampleDirectiveA = _classThis;
        })();
        let WrapperComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'wrapper-component',
                    template: `
          <ng-content select="example-directive-a"></ng-content>
        `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var WrapperComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "WrapperComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                WrapperComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return WrapperComponent = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            declarations: [WrapperComponent, ExampleDirectiveA],
        });
        testing_1.TestBed.overrideTemplate(TestApp, `<wrapper-component>
        <div></div>
        <example-directive-a></example-directive-a>
       </wrapper-component>`);
        const fixture = testing_1.TestBed.createComponent(TestApp);
        fixture.detectChanges();
        const debugElement = fixture.debugElement.query(by_1.By.directive(ExampleDirectiveA));
        (0, matchers_1.expect)(debugElement).toBeTruthy();
    });
    it('should query re-projected child elements by directive', () => {
        let ExampleDirectiveA = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: 'example-directive-a',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ExampleDirectiveA = _classThis = class {
            };
            __setFunctionName(_classThis, "ExampleDirectiveA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ExampleDirectiveA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ExampleDirectiveA = _classThis;
        })();
        let ProxyComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'proxy-component',
                    template: `
          <ng-content></ng-content>
        `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ProxyComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "ProxyComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ProxyComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ProxyComponent = _classThis;
        })();
        let WrapperComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'wrapper-component',
                    template: `
          <proxy-component>
            <ng-content select="div"></ng-content>
            <ng-content select="example-directive-a"></ng-content>
          </proxy-component>
        `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var WrapperComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "WrapperComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                WrapperComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return WrapperComponent = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            declarations: [ProxyComponent, WrapperComponent, ExampleDirectiveA],
        });
        testing_1.TestBed.overrideTemplate(TestApp, `<wrapper-component>
        <div></div>
        <example-directive-a></example-directive-a>
       </wrapper-component>`);
        const fixture = testing_1.TestBed.createComponent(TestApp);
        fixture.detectChanges();
        const debugElements = fixture.debugElement.queryAll(by_1.By.directive(ExampleDirectiveA));
        (0, matchers_1.expect)(debugElements.length).toBe(1);
    });
    it('should query directives on containers before directives in a view', () => {
        let TextDirective = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[text]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _text_decorators;
            let _text_initializers = [];
            let _text_extraInitializers = [];
            var TextDirective = _classThis = class {
                constructor() {
                    this.text = __runInitializers(this, _text_initializers, void 0);
                    __runInitializers(this, _text_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "TextDirective");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _text_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TextDirective = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TextDirective = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [TextDirective] });
        testing_1.TestBed.overrideTemplate(TestApp, `<ng-template text="first" [ngIf]="true"><div text="second"></div></ng-template>`);
        const fixture = testing_1.TestBed.createComponent(TestApp);
        fixture.detectChanges();
        const debugNodes = fixture.debugElement.queryAllNodes(by_1.By.directive(TextDirective));
        (0, matchers_1.expect)(debugNodes.length).toBe(2);
        (0, matchers_1.expect)(debugNodes[0].injector.get(TextDirective).text).toBe('first');
        (0, matchers_1.expect)(debugNodes[1].injector.get(TextDirective).text).toBe('second');
    });
    it('should query directives on views moved in the DOM', () => {
        let TextDirective = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[text]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _text_decorators;
            let _text_initializers = [];
            let _text_extraInitializers = [];
            var TextDirective = _classThis = class {
                constructor() {
                    this.text = __runInitializers(this, _text_initializers, void 0);
                    __runInitializers(this, _text_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "TextDirective");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _text_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TextDirective = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TextDirective = _classThis;
        })();
        let ViewManipulatingDirective = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[moveView]',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ViewManipulatingDirective = _classThis = class {
                constructor(_vcRef, _tplRef) {
                    this._vcRef = _vcRef;
                    this._tplRef = _tplRef;
                }
                insert() {
                    this._vcRef.createEmbeddedView(this._tplRef);
                }
                removeFromTheDom() {
                    const viewRef = this._vcRef.get(0);
                    viewRef.rootNodes.forEach((rootNode) => {
                        (0, common_1.ɵgetDOM)().remove(rootNode);
                    });
                }
            };
            __setFunctionName(_classThis, "ViewManipulatingDirective");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ViewManipulatingDirective = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ViewManipulatingDirective = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [TextDirective, ViewManipulatingDirective] });
        testing_1.TestBed.overrideTemplate(TestApp, `<ng-template text="first" moveView><div text="second"></div></ng-template>`);
        const fixture = testing_1.TestBed.createComponent(TestApp);
        fixture.detectChanges();
        const viewMover = fixture.debugElement
            .queryAllNodes(by_1.By.directive(ViewManipulatingDirective))[0]
            .injector.get(ViewManipulatingDirective);
        let debugNodes = fixture.debugElement.queryAllNodes(by_1.By.directive(TextDirective));
        // we've got just one directive on <ng-template>
        (0, matchers_1.expect)(debugNodes.length).toBe(1);
        (0, matchers_1.expect)(debugNodes[0].injector.get(TextDirective).text).toBe('first');
        // insert a view - now we expect to find 2 directive instances
        viewMover.insert();
        fixture.detectChanges();
        debugNodes = fixture.debugElement.queryAllNodes(by_1.By.directive(TextDirective));
        (0, matchers_1.expect)(debugNodes.length).toBe(2);
        // remove a view from the DOM (equivalent to moving it around)
        // the logical tree is the same but DOM has changed
        viewMover.removeFromTheDom();
        debugNodes = fixture.debugElement.queryAllNodes(by_1.By.directive(TextDirective));
        (0, matchers_1.expect)(debugNodes.length).toBe(2);
        (0, matchers_1.expect)(debugNodes[0].injector.get(TextDirective).text).toBe('first');
        (0, matchers_1.expect)(debugNodes[1].injector.get(TextDirective).text).toBe('second');
    });
    it('DebugElement.query should work with dynamically created elements', () => {
        let MyDir = (() => {
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
            var MyDir = _classThis = class {
                constructor(renderer, element) {
                    this.dir = __runInitializers(this, _dir_initializers, void 0);
                    __runInitializers(this, _dir_extraInitializers);
                    const div = renderer.createElement('div');
                    div.classList.add('myclass');
                    renderer.appendChild(element.nativeElement, div);
                }
            };
            __setFunctionName(_classThis, "MyDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.Input)('dir')];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyDir = _classThis;
        })();
        let MyComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app-test',
                    template: '<div dir></div>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "MyComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComponent = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [MyComponent, MyDir] });
        const fixture = testing_1.TestBed.createComponent(MyComponent);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.debugElement.query(by_1.By.css('.myclass'))).toBeTruthy();
    });
    it('should not throw when calling DebugRenderer2.destroyNode twice in a row', () => {
        const fixture = testing_1.TestBed.createComponent(TestApp);
        fixture.detectChanges();
        const firstChild = fixture.debugElement.children[0];
        const renderer = fixture.componentInstance.renderer;
        (0, matchers_1.expect)(firstChild).toBeTruthy();
        (0, matchers_1.expect)(() => {
            var _a, _b;
            // `destroyNode` needs to be null checked, because only ViewEngine provides a
            // `DebugRenderer2` which has the behavior we're testing for. Ivy provides
            // `BaseAnimationRenderer` which doesn't have the issue.
            (_a = renderer.destroyNode) === null || _a === void 0 ? void 0 : _a.call(renderer, firstChild);
            (_b = renderer.destroyNode) === null || _b === void 0 ? void 0 : _b.call(renderer, firstChild);
        }).not.toThrow();
    });
    describe('DebugElement.query with dynamically created descendant elements', () => {
        let fixture;
        beforeEach(() => {
            let MyDir = (() => {
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
                var MyDir = _classThis = class {
                    constructor(renderer, element) {
                        this.dir = __runInitializers(this, _dir_initializers, void 0);
                        __runInitializers(this, _dir_extraInitializers);
                        const outerDiv = renderer.createElement('div');
                        const innerDiv = renderer.createElement('div');
                        innerDiv.classList.add('inner');
                        const div = renderer.createElement('div');
                        div.classList.add('myclass');
                        renderer.appendChild(innerDiv, div);
                        renderer.appendChild(outerDiv, innerDiv);
                        renderer.appendChild(element.nativeElement, outerDiv);
                    }
                };
                __setFunctionName(_classThis, "MyDir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _dir_decorators = [(0, core_1.Input)('dir')];
                    __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyDir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyDir = _classThis;
            })();
            let MyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app-test',
                        template: '<div dir></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "MyComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyComponent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [MyComponent, MyDir] });
            fixture = testing_1.TestBed.createComponent(MyComponent);
            fixture.detectChanges();
        });
        it('should find the dynamic elements from fixture root', () => {
            (0, matchers_1.expect)(fixture.debugElement.query(by_1.By.css('.myclass'))).toBeTruthy();
        });
        it('can use a dynamic element as root for another query', () => {
            const inner = fixture.debugElement.query(by_1.By.css('.inner'));
            (0, matchers_1.expect)(inner).toBeTruthy();
            (0, matchers_1.expect)(inner.query(by_1.By.css('.myclass'))).toBeTruthy();
        });
    });
    describe("DebugElement.query doesn't fail on elements outside Angular context", () => {
        let NativeEl = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div></div>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var NativeEl = _classThis = class {
                constructor(elementRef) {
                    this.elementRef = elementRef;
                }
                ngAfterViewInit() {
                    const ul = document.createElement('ul');
                    ul.appendChild(document.createElement('li'));
                    this.elementRef.nativeElement.children[0].appendChild(ul);
                }
            };
            __setFunctionName(_classThis, "NativeEl");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                NativeEl = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return NativeEl = _classThis;
        })();
        let el;
        beforeEach(() => {
            const fixture = testing_1.TestBed.configureTestingModule({ declarations: [NativeEl] }).createComponent(NativeEl);
            fixture.detectChanges();
            el = fixture.debugElement;
        });
        it('when searching for elements by name', () => {
            (0, matchers_1.expect)(() => el.query((e) => e.name === 'any search text')).not.toThrow();
        });
        it('when searching for elements by their attributes', () => {
            (0, matchers_1.expect)(() => el.query((e) => e.attributes['name'] === 'any attribute')).not.toThrow();
        });
        it('when searching for elements by their classes', () => {
            (0, matchers_1.expect)(() => el.query((e) => e.classes['any class'] === true)).not.toThrow();
        });
        it('when searching for elements by their styles', () => {
            (0, matchers_1.expect)(() => el.query((e) => e.styles['any style'] === 'any value')).not.toThrow();
        });
        it('when searching for elements by their properties', () => {
            (0, matchers_1.expect)(() => el.query((e) => e.properties['any prop'] === 'any value')).not.toThrow();
        });
        it('when searching by componentInstance', () => {
            (0, matchers_1.expect)(() => el.query((e) => e.componentInstance === null)).not.toThrow();
        });
        it('when searching by context', () => {
            (0, matchers_1.expect)(() => el.query((e) => e.context === null)).not.toThrow();
        });
        it('when searching by listeners', () => {
            (0, matchers_1.expect)(() => el.query((e) => e.listeners.length === 0)).not.toThrow();
        });
        it('when searching by references', () => {
            (0, matchers_1.expect)(() => el.query((e) => e.references === null)).not.toThrow();
        });
        it('when searching by providerTokens', () => {
            (0, matchers_1.expect)(() => el.query((e) => e.providerTokens.length === 0)).not.toThrow();
        });
        it('when searching by injector', () => {
            (0, matchers_1.expect)(() => el.query((e) => e.injector === null)).not.toThrow();
        });
        it('when using the out-of-context element as the DebugElement query root', () => {
            const debugElOutsideAngularContext = el.query(by_1.By.css('ul'));
            (0, matchers_1.expect)(debugElOutsideAngularContext.queryAll(by_1.By.css('li')).length).toBe(1);
            (0, matchers_1.expect)(debugElOutsideAngularContext.query(by_1.By.css('li'))).toBeDefined();
        });
    });
    it('DebugElement.queryAll should pick up both elements inserted via the view and through Renderer2', () => {
        let MyDir = (() => {
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
            var MyDir = _classThis = class {
                constructor(renderer, element) {
                    this.dir = __runInitializers(this, _dir_initializers, void 0);
                    __runInitializers(this, _dir_extraInitializers);
                    const div = renderer.createElement('div');
                    div.classList.add('myclass');
                    renderer.appendChild(element.nativeElement, div);
                }
            };
            __setFunctionName(_classThis, "MyDir");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _dir_decorators = [(0, core_1.Input)('dir')];
                __esDecorate(null, null, _dir_decorators, { kind: "field", name: "dir", static: false, private: false, access: { has: obj => "dir" in obj, get: obj => obj.dir, set: (obj, value) => { obj.dir = value; } }, metadata: _metadata }, _dir_initializers, _dir_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyDir = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyDir = _classThis;
        })();
        let MyComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'app-test',
                    template: '<div dir></div><span class="myclass"></span>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "MyComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComponent = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [MyComponent, MyDir] });
        const fixture = testing_1.TestBed.createComponent(MyComponent);
        fixture.detectChanges();
        const results = fixture.debugElement.queryAll(by_1.By.css('.myclass'));
        (0, matchers_1.expect)(results.map((r) => r.nativeElement.nodeName.toLowerCase())).toEqual(['div', 'span']);
    });
    it('should list providerTokens', () => {
        fixture = testing_1.TestBed.createComponent(ParentComp);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.debugElement.providerTokens).toContain(Logger);
    });
    it('should list locals', () => {
        fixture = testing_1.TestBed.createComponent(LocalsComp);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.debugElement.children[0].references['alice']).toBeInstanceOf(MyDir);
    });
    it('should allow injecting from the element injector', () => {
        fixture = testing_1.TestBed.createComponent(ParentComp);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.debugElement.children[0].injector.get(Logger).logs).toEqual([
            'parent',
            'nestedparent',
            'child',
            'nestedchild',
        ]);
    });
    it('should list event listeners', () => {
        fixture = testing_1.TestBed.createComponent(EventsComp);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.debugElement.children[0].listeners.length).toEqual(1);
        (0, matchers_1.expect)(fixture.debugElement.children[1].listeners.length).toEqual(1);
    });
    it('should trigger event handlers', () => {
        fixture = testing_1.TestBed.createComponent(EventsComp);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.componentInstance.clicked).toBe(false);
        (0, matchers_1.expect)(fixture.componentInstance.customed).toBe(false);
        fixture.debugElement.children[0].triggerEventHandler('click', {});
        (0, matchers_1.expect)(fixture.componentInstance.clicked).toBe(true);
        fixture.debugElement.children[1].triggerEventHandler('myevent', {});
        (0, matchers_1.expect)(fixture.componentInstance.customed).toBe(true);
    });
    describe('properties', () => {
        it('should include classes in properties.className', () => {
            fixture = testing_1.TestBed.createComponent(HostClassBindingCmp);
            fixture.detectChanges();
            const debugElement = fixture.debugElement;
            (0, matchers_1.expect)(debugElement.properties['className']).toBe('class-one class-two');
            fixture.componentInstance.hostClasses = 'class-three';
            fixture.detectChanges();
            (0, matchers_1.expect)(debugElement.properties['className']).toBe('class-three');
            fixture.componentInstance.hostClasses = '';
            fixture.detectChanges();
            (0, matchers_1.expect)(debugElement.properties['className']).toBeFalsy();
        });
        it('should preserve the type of the property values', () => {
            const fixture = testing_1.TestBed.createComponent(TestCmptWithPropBindings);
            fixture.detectChanges();
            const button = fixture.debugElement.query(by_1.By.css('button'));
            (0, matchers_1.expect)(button.properties['disabled']).toEqual(true);
            (0, matchers_1.expect)(button.properties['tabIndex']).toEqual(1337);
            (0, matchers_1.expect)(button.properties['title']).toEqual('hello');
        });
        it('should include interpolated properties in the properties map', () => {
            const fixture = testing_1.TestBed.createComponent(TestCmptWithPropInterpolation);
            fixture.detectChanges();
            const buttons = fixture.debugElement.children;
            (0, matchers_1.expect)(buttons.length).toBe(10);
            (0, matchers_1.expect)(buttons[0].properties['title']).toBe('0');
            (0, matchers_1.expect)(buttons[1].properties['title']).toBe('a1b');
            (0, matchers_1.expect)(buttons[2].properties['title']).toBe('a1b2c');
            (0, matchers_1.expect)(buttons[3].properties['title']).toBe('a1b2c3d');
            (0, matchers_1.expect)(buttons[4].properties['title']).toBe('a1b2c3d4e');
            (0, matchers_1.expect)(buttons[5].properties['title']).toBe('a1b2c3d4e5f');
            (0, matchers_1.expect)(buttons[6].properties['title']).toBe('a1b2c3d4e5f6g');
            (0, matchers_1.expect)(buttons[7].properties['title']).toBe('a1b2c3d4e5f6g7h');
            (0, matchers_1.expect)(buttons[8].properties['title']).toBe('a1b2c3d4e5f6g7h8i');
            (0, matchers_1.expect)(buttons[9].properties['title']).toBe('a1b2c3d4e5f6g7h8i9j');
        });
        it('should not include directive-shadowed properties in the properties map', () => {
            testing_1.TestBed.overrideTemplate(TestCmptWithPropInterpolation, `<button with-title [title]="'goes to input'"></button>`);
            const fixture = testing_1.TestBed.createComponent(TestCmptWithPropInterpolation);
            fixture.detectChanges();
            const button = fixture.debugElement.query(by_1.By.css('button'));
            (0, matchers_1.expect)(button.properties['title']).not.toEqual('goes to input');
        });
        it('should return native properties from DOM element even if no binding present', () => {
            testing_1.TestBed.overrideTemplate(TestCmptWithRenderer, `<button></button>`);
            const fixture = testing_1.TestBed.createComponent(TestCmptWithRenderer);
            fixture.detectChanges();
            const button = fixture.debugElement.query(by_1.By.css('button'));
            fixture.componentInstance.renderer.setProperty(button.nativeElement, 'title', 'myTitle');
            (0, matchers_1.expect)(button.properties['title']).toBe('myTitle');
        });
        it('should not include patched properties (starting with __) and on* properties', () => {
            testing_1.TestBed.overrideTemplate(TestCmptWithPropInterpolation, `<button title="myTitle" (click)="true;"></button>`);
            const fixture = testing_1.TestBed.createComponent(TestCmptWithPropInterpolation);
            fixture.detectChanges();
            const host = fixture.debugElement;
            const button = fixture.debugElement.query(by_1.By.css('button'));
            (0, matchers_1.expect)(Object.keys(host.properties).filter((key) => key.startsWith('__'))).toEqual([]);
            (0, matchers_1.expect)(Object.keys(host.properties).filter((key) => key.startsWith('on'))).toEqual([]);
            (0, matchers_1.expect)(Object.keys(button.properties).filter((key) => key.startsWith('__'))).toEqual([]);
            (0, matchers_1.expect)(Object.keys(button.properties).filter((key) => key.startsWith('on'))).toEqual([]);
        });
        it('should pickup all of the element properties', () => {
            testing_1.TestBed.overrideTemplate(TestCmptWithPropInterpolation, `<button title="myTitle"></button>`);
            const fixture = testing_1.TestBed.createComponent(TestCmptWithPropInterpolation);
            fixture.detectChanges();
            const host = fixture.debugElement;
            const button = fixture.debugElement.query(by_1.By.css('button'));
            (0, matchers_1.expect)(button.properties['title']).toEqual('myTitle');
        });
    });
    it('should trigger events registered via Renderer2', () => {
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                constructor(renderer, elementRef, ngZone) {
                    this.renderer = renderer;
                    this.elementRef = elementRef;
                    this.ngZone = ngZone;
                    this.count = 0;
                }
                ngOnInit() {
                    this.renderer.listen(this.elementRef.nativeElement, 'click', (event) => {
                        this.count++;
                        this.eventObj1 = event;
                    });
                    this.ngZone.runOutsideAngular(() => {
                        this.renderer.listen(this.elementRef.nativeElement, 'click', (event) => {
                            this.count++;
                            this.eventObj2 = event;
                        });
                    });
                }
            };
            __setFunctionName(_classThis, "TestComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestComponent = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [TestComponent] });
        const fixture = testing_1.TestBed.createComponent(TestComponent);
        // Ivy depends on `eventListeners` to pick up events that haven't been registered through
        // Angular templates. At the time of writing Zone.js doesn't add `eventListeners` in Node
        // environments so we have to skip the test.
        if (typeof fixture.debugElement.nativeElement.eventListeners === 'function') {
            const event = { value: true };
            fixture.detectChanges();
            fixture.debugElement.triggerEventHandler('click', event);
            (0, matchers_1.expect)(fixture.componentInstance.count).toBe(2);
            (0, matchers_1.expect)(fixture.componentInstance.eventObj2).toBe(event);
        }
    });
    it('should be able to trigger an event with a null value', () => {
        let value = undefined;
        let TestComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<button (click)="handleClick($event)"></button>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestComponent = _classThis = class {
                handleClick(_event) {
                    value = _event;
                    // Returning `false` is what causes the renderer to call `event.preventDefault`.
                    return false;
                }
            };
            __setFunctionName(_classThis, "TestComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestComponent = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [TestComponent] });
        const fixture = testing_1.TestBed.createComponent(TestComponent);
        const button = fixture.debugElement.query(by_1.By.css('button'));
        (0, matchers_1.expect)(() => {
            button.triggerEventHandler('click');
            fixture.detectChanges();
        }).not.toThrow();
        (0, matchers_1.expect)(value).toBeUndefined();
    });
    describe('componentInstance on DebugNode', () => {
        it('should return component associated with a node if a node is a component host', () => {
            testing_1.TestBed.overrideTemplate(TestCmpt, `<parent-comp></parent-comp>`);
            fixture = testing_1.TestBed.createComponent(TestCmpt);
            const debugEl = fixture.debugElement.children[0];
            (0, matchers_1.expect)(debugEl.componentInstance).toBeInstanceOf(ParentComp);
        });
        it('should return component associated with a node if a node is a component host (content projection)', () => {
            testing_1.TestBed.overrideTemplate(TestCmpt, `<parent-comp><child-comp></child-comp></parent-comp>`);
            fixture = testing_1.TestBed.createComponent(TestCmpt);
            const debugEl = fixture.debugElement.query(by_1.By.directive(ChildComp));
            (0, matchers_1.expect)(debugEl.componentInstance).toBeInstanceOf(ChildComp);
        });
        it('should return host component instance if a node has no associated component and there is no component projecting this node', () => {
            testing_1.TestBed.overrideTemplate(TestCmpt, `<div></div>`);
            fixture = testing_1.TestBed.createComponent(TestCmpt);
            const debugEl = fixture.debugElement.children[0];
            (0, matchers_1.expect)(debugEl.componentInstance).toBeInstanceOf(TestCmpt);
        });
        it('should return host component instance if a node has no associated component and there is no component projecting this node (nested embedded views)', () => {
            testing_1.TestBed.overrideTemplate(TestCmpt, `
                <ng-template [ngIf]="true">
                  <ng-template [ngIf]="true">
                    <div mydir></div>
                  </ng-template>
                </ng-template>`);
            fixture = testing_1.TestBed.createComponent(TestCmpt);
            fixture.detectChanges();
            const debugEl = fixture.debugElement.query(by_1.By.directive(MyDir));
            (0, matchers_1.expect)(debugEl.componentInstance).toBeInstanceOf(TestCmpt);
        });
        it('should return component instance that projects a given node if a node has no associated component', () => {
            testing_1.TestBed.overrideTemplate(TestCmpt, `<parent-comp><span><div></div></span></parent-comp>`);
            fixture = testing_1.TestBed.createComponent(TestCmpt);
            const debugEl = fixture.debugElement.children[0].children[0].children[0]; // <div>
            (0, matchers_1.expect)(debugEl.componentInstance).toBeInstanceOf(ParentComp);
        });
    });
    describe('context on DebugNode', () => {
        it('should return component associated with the node if both a structural directive and a component match the node', () => {
            let ExampleComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'example-component',
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ExampleComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "ExampleComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ExampleComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ExampleComponent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ imports: [common_1.CommonModule], declarations: [ExampleComponent] });
            testing_1.TestBed.overrideTemplate(TestApp, '<example-component *ngIf="true"></example-component>');
            const fixture = testing_1.TestBed.createComponent(TestApp);
            fixture.detectChanges();
            const debugNode = fixture.debugElement.query(by_1.By.directive(ExampleComponent));
            (0, matchers_1.expect)(debugNode.context instanceof ExampleComponent).toBe(true);
        });
        it('should return structural directive context if there is a structural directive on the node', () => {
            testing_1.TestBed.configureTestingModule({ imports: [common_1.CommonModule] });
            testing_1.TestBed.overrideTemplate(TestApp, '<span *ngIf="true"></span>');
            const fixture = testing_1.TestBed.createComponent(TestApp);
            fixture.detectChanges();
            const debugNode = fixture.debugElement.query(by_1.By.css('span'));
            (0, matchers_1.expect)(debugNode.context instanceof common_1.NgIfContext).toBe(true);
        });
        it('should return the containing component if there is no structural directive or component on the node', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [MyDir] });
            testing_1.TestBed.overrideTemplate(TestApp, '<span mydir></span>');
            const fixture = testing_1.TestBed.createComponent(TestApp);
            fixture.detectChanges();
            const debugNode = fixture.debugElement.query(by_1.By.directive(MyDir));
            (0, matchers_1.expect)(debugNode.context instanceof TestApp).toBe(true);
        });
    });
    it('should be able to query for elements that are not in the same DOM tree anymore', () => {
        fixture = testing_1.TestBed.createComponent(SimpleContentComp);
        fixture.detectChanges();
        const parent = fixture.nativeElement.parentElement;
        const content = fixture.componentInstance.content.nativeElement;
        // Move the content element outside the component
        // so that it can't be reached via querySelector.
        parent.appendChild(content);
        (0, matchers_1.expect)(fixture.debugElement.query(by_1.By.css('.content'))).toBeTruthy();
        (0, common_1.ɵgetDOM)().remove(content);
    });
    it('should support components with ViewContainerRef', () => {
        fixture = testing_1.TestBed.createComponent(TestCmptWithViewContainerRef);
        const divEl = fixture.debugElement.query(by_1.By.css('div'));
        (0, matchers_1.expect)(divEl).not.toBeNull();
    });
    it('should support querying on any debug element', () => {
        testing_1.TestBed.overrideTemplate(TestCmpt, `<span><div id="a"><div id="b"></div></div></span>`);
        fixture = testing_1.TestBed.createComponent(TestCmpt);
        const divA = fixture.debugElement.query(by_1.By.css('div'));
        (0, matchers_1.expect)(divA.nativeElement.getAttribute('id')).toBe('a');
        const divB = divA.query(by_1.By.css('div'));
        (0, matchers_1.expect)(divB.nativeElement.getAttribute('id')).toBe('b');
    });
    it('should be an instance of DebugNode', () => {
        fixture = testing_1.TestBed.createComponent(ParentComp);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.debugElement).toBeInstanceOf(core_1.DebugNode);
    });
    it('should return the same element when queried twice', () => {
        fixture = testing_1.TestBed.createComponent(ParentComp);
        fixture.detectChanges();
        const childTestElsFirst = fixture.debugElement.queryAll(by_1.By.css('child-comp'));
        const childTestElsSecond = fixture.debugElement.queryAll(by_1.By.css('child-comp'));
        (0, matchers_1.expect)(childTestElsFirst.length).toBe(1);
        (0, matchers_1.expect)(childTestElsSecond[0]).toBe(childTestElsFirst[0]);
    });
    it('should not query the descendants of a sibling node', () => {
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-comp',
                    template: `
          <div class="div.1">
            <p class="p.1">
              <span class="span.1">span.1</span>
              <span class="span.2">span.2</span>
            </p>
            <p class="p.2">
              <span class="span.3">span.3</span>
              <span class="span.4">span.4</span>
            </p>
          </div>
          <div class="div.2">
            <p class="p.3">
              <span class="span.5">span.5</span>
              <span class="span.6">span.6</span>
            </p>
            <p class="p.4">
              <span class="span.7">span.7</span>
              <span class="span.8">span.8</span>
            </p>
          </div>
        `,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComp = _classThis = class {
            };
            __setFunctionName(_classThis, "MyComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({ declarations: [MyComp] });
        const fixture = testing_1.TestBed.createComponent(MyComp);
        fixture.detectChanges();
        const firstDiv = fixture.debugElement.query(by_1.By.css('div'));
        const firstDivChildren = firstDiv.queryAll(by_1.By.css('span'));
        (0, matchers_1.expect)(firstDivChildren.map((child) => child.nativeNode.textContent.trim())).toEqual([
            'span.1',
            'span.2',
            'span.3',
            'span.4',
        ]);
    });
    it('should preserve the attribute case in DebugNode.attributes', () => {
        let Icon = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-icon',
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _svgIcon_decorators;
            let _svgIcon_initializers = [];
            let _svgIcon_extraInitializers = [];
            var Icon = _classThis = class {
                constructor() {
                    this.svgIcon = __runInitializers(this, _svgIcon_initializers, '');
                    __runInitializers(this, _svgIcon_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "Icon");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _svgIcon_decorators = [(0, core_1.Input)()];
                __esDecorate(null, null, _svgIcon_decorators, { kind: "field", name: "svgIcon", static: false, private: false, access: { has: obj => "svgIcon" in obj, get: obj => obj.svgIcon, set: (obj, value) => { obj.svgIcon = value; } }, metadata: _metadata }, _svgIcon_initializers, _svgIcon_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Icon = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Icon = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<my-icon svgIcon="test"></my-icon>`,
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
        testing_1.TestBed.configureTestingModule({ declarations: [App, Icon] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const element = fixture.debugElement.children[0];
        // Assert that the camel-case attribute is correct.
        (0, matchers_1.expect)(element.attributes['svgIcon']).toBe('test');
        // Make sure that we somehow didn't preserve the native lower-cased value.
        (0, matchers_1.expect)(element.attributes['svgicon']).toBeFalsy();
    });
    it('should include namespaced attributes in DebugNode.attributes', () => {
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<div xlink:href="foo"></div>`,
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
        testing_1.TestBed.configureTestingModule({ declarations: [Comp] });
        const fixture = testing_1.TestBed.createComponent(Comp);
        fixture.detectChanges();
        (0, matchers_1.expect)(fixture.debugElement.query(by_1.By.css('div')).attributes['xlink:href']).toBe('foo');
    });
    it('should include attributes added via Renderer2 in DebugNode.attributes', () => {
        let Comp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<div></div>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Comp = _classThis = class {
                constructor(renderer) {
                    this.renderer = renderer;
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
        const div = fixture.debugElement.query(by_1.By.css('div'));
        fixture.componentInstance.renderer.setAttribute(div.nativeElement, 'foo', 'bar');
        (0, matchers_1.expect)(div.attributes['foo']).toBe('bar');
    });
    it('should clear event listeners when node is destroyed', () => {
        let calls = 0;
        let CancelButton = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'cancel-button',
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _cancel_decorators;
            let _cancel_initializers = [];
            let _cancel_extraInitializers = [];
            var CancelButton = _classThis = class {
                constructor() {
                    this.cancel = __runInitializers(this, _cancel_initializers, new core_1.EventEmitter());
                    __runInitializers(this, _cancel_extraInitializers);
                }
            };
            __setFunctionName(_classThis, "CancelButton");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _cancel_decorators = [(0, core_1.Output)()];
                __esDecorate(null, null, _cancel_decorators, { kind: "field", name: "cancel", static: false, private: false, access: { has: obj => "cancel" in obj, get: obj => obj.cancel, set: (obj, value) => { obj.cancel = value; } }, metadata: _metadata }, _cancel_initializers, _cancel_extraInitializers);
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                CancelButton = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return CancelButton = _classThis;
        })();
        let App = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '<cancel-button *ngIf="visible" (cancel)="cancel()"></cancel-button>',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var App = _classThis = class {
                constructor() {
                    this.visible = true;
                }
                cancel() {
                    calls++;
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
        testing_1.TestBed.configureTestingModule({ declarations: [App, CancelButton] });
        const fixture = testing_1.TestBed.createComponent(App);
        fixture.detectChanges();
        const button = fixture.debugElement.query(by_1.By.directive(CancelButton));
        button.triggerEventHandler('cancel', {});
        (0, matchers_1.expect)(calls).toBe(1, 'Expected calls to be 1 after one event.');
        fixture.componentInstance.visible = false;
        fixture.detectChanges();
        button.triggerEventHandler('cancel', {});
        (0, matchers_1.expect)(calls).toBe(1, 'Expected calls to stay 1 after destroying the node.');
    });
    it('should not error when accessing node name', () => {
        let EmptyComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var EmptyComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "EmptyComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                EmptyComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return EmptyComponent = _classThis;
        })();
        const fixture = testing_1.TestBed.configureTestingModule({
            declarations: [EmptyComponent],
        }).createComponent(EmptyComponent);
        let node = fixture.debugElement;
        let superParentName = '';
        // Traverse upwards, all the way to #document, which is not a
        // Node.ELEMENT_NODE
        while (node) {
            superParentName = node.name;
            node = node.parent;
        }
        (0, matchers_1.expect)(superParentName).not.toEqual('');
    });
    it('should match node name with declared casing', () => {
        let Wrapper = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: `<div></div><myComponent></myComponent>`,
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Wrapper = _classThis = class {
            };
            __setFunctionName(_classThis, "Wrapper");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Wrapper = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Wrapper = _classThis;
        })();
        let MyComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'myComponent',
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "MyComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComponent = _classThis;
        })();
        const fixture = testing_1.TestBed.configureTestingModule({
            declarations: [Wrapper, MyComponent],
        }).createComponent(Wrapper);
        (0, matchers_1.expect)(fixture.debugElement.query((e) => e.name === 'myComponent')).toBeTruthy();
        (0, matchers_1.expect)(fixture.debugElement.query((e) => e.name === 'div')).toBeTruthy();
    });
    it('does not call event listeners added outside angular context', () => {
        let listenerCalled = false;
        const eventToTrigger = (0, browser_util_1.createMouseEvent)('mouseenter');
        function listener() {
            listenerCalled = true;
        }
        let MyComp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyComp = _classThis = class {
                constructor(zone, element) {
                    this.zone = zone;
                    this.element = element;
                }
                ngOnInit() {
                    this.zone.runOutsideAngular(() => {
                        this.element.nativeElement.addEventListener('mouseenter', listener);
                    });
                }
            };
            __setFunctionName(_classThis, "MyComp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyComp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyComp = _classThis;
        })();
        const fixture = testing_1.TestBed.configureTestingModule({ declarations: [MyComp] }).createComponent(MyComp);
        fixture.detectChanges();
        fixture.debugElement.triggerEventHandler('mouseenter', eventToTrigger);
        (0, matchers_1.expect)(listenerCalled).toBe(false);
    });
});
