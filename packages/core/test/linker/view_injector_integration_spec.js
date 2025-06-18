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
exports.DuplicatePipe2 = exports.DuplicatePipe1 = exports.PipeNeedsService = void 0;
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
let SimpleDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[simpleDirective]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _value_decorators;
    let _value_initializers = [];
    let _value_extraInitializers = [];
    var SimpleDirective = _classThis = class {
        constructor() {
            this.value = __runInitializers(this, _value_initializers, null);
            __runInitializers(this, _value_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "SimpleDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _value_decorators = [(0, core_1.Input)('simpleDirective')];
        __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SimpleDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SimpleDirective = _classThis;
})();
let SimpleComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: '[simpleComponent]',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SimpleComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "SimpleComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SimpleComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SimpleComponent = _classThis;
})();
let SomeOtherDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[someOtherDirective]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var SomeOtherDirective = _classThis = class {
    };
    __setFunctionName(_classThis, "SomeOtherDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SomeOtherDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SomeOtherDirective = _classThis;
})();
let CycleDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[cycleDirective]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CycleDirective = _classThis = class {
        constructor(self) { }
    };
    __setFunctionName(_classThis, "CycleDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CycleDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CycleDirective = _classThis;
})();
let NeedsDirectiveFromSelf = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[needsDirectiveFromSelf]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NeedsDirectiveFromSelf = _classThis = class {
        constructor(dependency) {
            this.dependency = dependency;
        }
    };
    __setFunctionName(_classThis, "NeedsDirectiveFromSelf");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsDirectiveFromSelf = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsDirectiveFromSelf = _classThis;
})();
let OptionallyNeedsDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[optionallyNeedsDirective]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var OptionallyNeedsDirective = _classThis = class {
        constructor(dependency) {
            this.dependency = dependency;
        }
    };
    __setFunctionName(_classThis, "OptionallyNeedsDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OptionallyNeedsDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OptionallyNeedsDirective = _classThis;
})();
let NeedsComponentFromHost = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[needsComponentFromHost]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NeedsComponentFromHost = _classThis = class {
        constructor(dependency) {
            this.dependency = dependency;
        }
    };
    __setFunctionName(_classThis, "NeedsComponentFromHost");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsComponentFromHost = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsComponentFromHost = _classThis;
})();
let NeedsDirectiveFromHost = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[needsDirectiveFromHost]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NeedsDirectiveFromHost = _classThis = class {
        constructor(dependency) {
            this.dependency = dependency;
        }
    };
    __setFunctionName(_classThis, "NeedsDirectiveFromHost");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsDirectiveFromHost = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsDirectiveFromHost = _classThis;
})();
let NeedsDirective = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[needsDirective]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NeedsDirective = _classThis = class {
        constructor(dependency) {
            this.dependency = dependency;
        }
    };
    __setFunctionName(_classThis, "NeedsDirective");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsDirective = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsDirective = _classThis;
})();
let NeedsService = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[needsService]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NeedsService = _classThis = class {
        constructor(service) {
            this.service = service;
        }
    };
    __setFunctionName(_classThis, "NeedsService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsService = _classThis;
})();
let NeedsAppService = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[needsAppService]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NeedsAppService = _classThis = class {
        constructor(service) {
            this.service = service;
        }
    };
    __setFunctionName(_classThis, "NeedsAppService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsAppService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsAppService = _classThis;
})();
let NeedsHostAppService = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: '[needsHostAppService]',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NeedsHostAppService = _classThis = class {
        constructor(service) {
            this.service = service;
        }
    };
    __setFunctionName(_classThis, "NeedsHostAppService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsHostAppService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsHostAppService = _classThis;
})();
let NeedsServiceComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: '[needsServiceComponent]',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NeedsServiceComponent = _classThis = class {
        constructor(service) {
            this.service = service;
        }
    };
    __setFunctionName(_classThis, "NeedsServiceComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsServiceComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsServiceComponent = _classThis;
})();
let NeedsServiceFromHost = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[needsServiceFromHost]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NeedsServiceFromHost = _classThis = class {
        constructor(service) {
            this.service = service;
        }
    };
    __setFunctionName(_classThis, "NeedsServiceFromHost");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsServiceFromHost = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsServiceFromHost = _classThis;
})();
let NeedsAttribute = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[needsAttribute]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NeedsAttribute = _classThis = class {
        constructor(typeAttribute, titleAttribute, fooAttribute) {
            this.typeAttribute = typeAttribute;
            this.titleAttribute = titleAttribute;
            this.fooAttribute = fooAttribute;
        }
    };
    __setFunctionName(_classThis, "NeedsAttribute");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsAttribute = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsAttribute = _classThis;
})();
let NeedsAttributeNoType = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[needsAttributeNoType]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NeedsAttributeNoType = _classThis = class {
        constructor(fooAttribute) {
            this.fooAttribute = fooAttribute;
        }
    };
    __setFunctionName(_classThis, "NeedsAttributeNoType");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsAttributeNoType = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsAttributeNoType = _classThis;
})();
let NeedsElementRef = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[needsElementRef]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NeedsElementRef = _classThis = class {
        constructor(elementRef) {
            this.elementRef = elementRef;
        }
    };
    __setFunctionName(_classThis, "NeedsElementRef");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsElementRef = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsElementRef = _classThis;
})();
let NeedsViewContainerRef = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[needsViewContainerRef]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NeedsViewContainerRef = _classThis = class {
        constructor(viewContainer) {
            this.viewContainer = viewContainer;
        }
    };
    __setFunctionName(_classThis, "NeedsViewContainerRef");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsViewContainerRef = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsViewContainerRef = _classThis;
})();
let NeedsTemplateRef = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[needsTemplateRef]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NeedsTemplateRef = _classThis = class {
        constructor(templateRef) {
            this.templateRef = templateRef;
        }
    };
    __setFunctionName(_classThis, "NeedsTemplateRef");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NeedsTemplateRef = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NeedsTemplateRef = _classThis;
})();
let OptionallyNeedsTemplateRef = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[optionallyNeedsTemplateRef]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var OptionallyNeedsTemplateRef = _classThis = class {
        constructor(templateRef) {
            this.templateRef = templateRef;
        }
    };
    __setFunctionName(_classThis, "OptionallyNeedsTemplateRef");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OptionallyNeedsTemplateRef = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OptionallyNeedsTemplateRef = _classThis;
})();
let DirectiveNeedsChangeDetectorRef = (() => {
    let _classDecorators = [(0, core_1.Directive)({
            selector: '[directiveNeedsChangeDetectorRef]',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DirectiveNeedsChangeDetectorRef = _classThis = class {
        constructor(changeDetectorRef) {
            this.changeDetectorRef = changeDetectorRef;
        }
    };
    __setFunctionName(_classThis, "DirectiveNeedsChangeDetectorRef");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DirectiveNeedsChangeDetectorRef = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DirectiveNeedsChangeDetectorRef = _classThis;
})();
let PushComponentNeedsChangeDetectorRef = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: '[componentNeedsChangeDetectorRef]',
            template: '{{counter}}',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PushComponentNeedsChangeDetectorRef = _classThis = class {
        constructor(changeDetectorRef) {
            this.changeDetectorRef = changeDetectorRef;
            this.counter = 0;
        }
    };
    __setFunctionName(_classThis, "PushComponentNeedsChangeDetectorRef");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PushComponentNeedsChangeDetectorRef = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PushComponentNeedsChangeDetectorRef = _classThis;
})();
let PurePipe = (() => {
    let _classDecorators = [(0, core_1.Pipe)({
            name: 'purePipe',
            pure: true,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PurePipe = _classThis = class {
        constructor() { }
        transform(value) {
            return this;
        }
    };
    __setFunctionName(_classThis, "PurePipe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PurePipe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PurePipe = _classThis;
})();
let ImpurePipe = (() => {
    let _classDecorators = [(0, core_1.Pipe)({
            name: 'impurePipe',
            pure: false,
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ImpurePipe = _classThis = class {
        constructor() { }
        transform(value) {
            return this;
        }
    };
    __setFunctionName(_classThis, "ImpurePipe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ImpurePipe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ImpurePipe = _classThis;
})();
let PipeNeedsChangeDetectorRef = (() => {
    let _classDecorators = [(0, core_1.Pipe)({
            name: 'pipeNeedsChangeDetectorRef',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PipeNeedsChangeDetectorRef = _classThis = class {
        constructor(changeDetectorRef) {
            this.changeDetectorRef = changeDetectorRef;
        }
        transform(value) {
            return this;
        }
    };
    __setFunctionName(_classThis, "PipeNeedsChangeDetectorRef");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PipeNeedsChangeDetectorRef = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PipeNeedsChangeDetectorRef = _classThis;
})();
let PipeNeedsService = (() => {
    let _classDecorators = [(0, core_1.Pipe)({
            name: 'pipeNeedsService',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PipeNeedsService = _classThis = class {
        constructor(service) {
            this.service = service;
        }
        transform(value) {
            return this;
        }
    };
    __setFunctionName(_classThis, "PipeNeedsService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PipeNeedsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PipeNeedsService = _classThis;
})();
exports.PipeNeedsService = PipeNeedsService;
let DuplicatePipe1 = (() => {
    let _classDecorators = [(0, core_1.Pipe)({
            name: 'duplicatePipe',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DuplicatePipe1 = _classThis = class {
        transform(value) {
            return this;
        }
    };
    __setFunctionName(_classThis, "DuplicatePipe1");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DuplicatePipe1 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DuplicatePipe1 = _classThis;
})();
exports.DuplicatePipe1 = DuplicatePipe1;
let DuplicatePipe2 = (() => {
    let _classDecorators = [(0, core_1.Pipe)({
            name: 'duplicatePipe',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DuplicatePipe2 = _classThis = class {
        transform(value) {
            return this;
        }
    };
    __setFunctionName(_classThis, "DuplicatePipe2");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DuplicatePipe2 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DuplicatePipe2 = _classThis;
})();
exports.DuplicatePipe2 = DuplicatePipe2;
let TestComp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'root',
            template: '',
            standalone: false,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var TestComp = _classThis = class {
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
function createComponentFixture(template, providers, comp) {
    if (!comp) {
        comp = TestComp;
    }
    testing_1.TestBed.overrideComponent(comp, { set: { template } });
    if (providers && providers.length) {
        testing_1.TestBed.overrideComponent(comp, { add: { providers: providers } });
    }
    return testing_1.TestBed.createComponent(comp);
}
function createComponent(template, providers, comp) {
    const fixture = createComponentFixture(template, providers, comp);
    fixture.detectChanges();
    return fixture.debugElement;
}
describe('View injector', () => {
    const TOKEN = new core_1.InjectionToken('token');
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [TestComp],
            providers: [
                { provide: TOKEN, useValue: 'appService' },
                { provide: 'appService', useFactory: (v) => v, deps: [TOKEN] },
            ],
        });
    });
    describe('injection', () => {
        it('should instantiate directives that have no dependencies', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [SimpleDirective] });
            const el = createComponent('<div simpleDirective>');
            (0, matchers_1.expect)(el.children[0].injector.get(SimpleDirective)).toBeInstanceOf(SimpleDirective);
        });
        it('should instantiate directives that depend on another directive', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [SimpleDirective, NeedsDirective] });
            const el = createComponent('<div simpleDirective needsDirective>');
            const d = el.children[0].injector.get(NeedsDirective);
            (0, matchers_1.expect)(d).toBeInstanceOf(NeedsDirective);
            (0, matchers_1.expect)(d.dependency).toBeInstanceOf(SimpleDirective);
        });
        it('should support useValue with different values', () => {
            const el = createComponent('', [
                { provide: 'numLiteral', useValue: 0 },
                { provide: 'boolLiteral', useValue: true },
                { provide: 'strLiteral', useValue: 'a' },
                { provide: 'null', useValue: null },
                { provide: 'array', useValue: [1] },
                { provide: 'map', useValue: { 'a': 1 } },
                { provide: 'instance', useValue: new TestValue('a') },
                { provide: 'nested', useValue: [{ 'a': [1] }, new TestValue('b')] },
            ]);
            (0, matchers_1.expect)(el.injector.get('numLiteral')).toBe(0);
            (0, matchers_1.expect)(el.injector.get('boolLiteral')).toBe(true);
            (0, matchers_1.expect)(el.injector.get('strLiteral')).toBe('a');
            (0, matchers_1.expect)(el.injector.get('null')).toBe(null);
            (0, matchers_1.expect)(el.injector.get('array')).toEqual([1]);
            (0, matchers_1.expect)(el.injector.get('map')).toEqual({ 'a': 1 });
            (0, matchers_1.expect)(el.injector.get('instance')).toEqual(new TestValue('a'));
            (0, matchers_1.expect)(el.injector.get('nested')).toEqual([{ 'a': [1] }, new TestValue('b')]);
        });
        it('should instantiate providers that have dependencies with SkipSelf', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [SimpleDirective, SomeOtherDirective] });
            testing_1.TestBed.overrideDirective(SimpleDirective, {
                add: { providers: [{ provide: 'injectable1', useValue: 'injectable1' }] },
            });
            testing_1.TestBed.overrideDirective(SomeOtherDirective, {
                add: {
                    providers: [
                        { provide: 'injectable1', useValue: 'new-injectable1' },
                        {
                            provide: 'injectable2',
                            useFactory: (val) => `${val}-injectable2`,
                            deps: [[new core_1.Inject('injectable1'), new core_1.SkipSelf()]],
                        },
                    ],
                },
            });
            const el = createComponent('<div simpleDirective><span someOtherDirective></span></div>');
            (0, matchers_1.expect)(el.children[0].children[0].injector.get('injectable2')).toEqual('injectable1-injectable2');
        });
        it('should instantiate providers that have dependencies', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [SimpleDirective] });
            const providers = [
                { provide: 'injectable1', useValue: 'injectable1' },
                {
                    provide: 'injectable2',
                    useFactory: (val) => `${val}-injectable2`,
                    deps: ['injectable1'],
                },
            ];
            testing_1.TestBed.overrideDirective(SimpleDirective, { add: { providers } });
            const el = createComponent('<div simpleDirective></div>');
            (0, matchers_1.expect)(el.children[0].injector.get('injectable2')).toEqual('injectable1-injectable2');
        });
        it('should instantiate viewProviders that have dependencies', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [SimpleComponent] });
            const viewProviders = [
                { provide: 'injectable1', useValue: 'injectable1' },
                {
                    provide: 'injectable2',
                    useFactory: (val) => `${val}-injectable2`,
                    deps: ['injectable1'],
                },
            ];
            testing_1.TestBed.overrideComponent(SimpleComponent, { set: { viewProviders } });
            const el = createComponent('<div simpleComponent></div>');
            (0, matchers_1.expect)(el.children[0].injector.get('injectable2')).toEqual('injectable1-injectable2');
        });
        it('should instantiate components that depend on viewProviders providers', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [NeedsServiceComponent] });
            testing_1.TestBed.overrideComponent(NeedsServiceComponent, {
                set: { providers: [{ provide: 'service', useValue: 'service' }] },
            });
            const el = createComponent('<div needsServiceComponent></div>');
            (0, matchers_1.expect)(el.children[0].injector.get(NeedsServiceComponent).service).toEqual('service');
        });
        it('should instantiate multi providers', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [SimpleDirective] });
            const providers = [
                { provide: 'injectable1', useValue: 'injectable11', multi: true },
                { provide: 'injectable1', useValue: 'injectable12', multi: true },
            ];
            testing_1.TestBed.overrideDirective(SimpleDirective, { set: { providers } });
            const el = createComponent('<div simpleDirective></div>');
            (0, matchers_1.expect)(el.children[0].injector.get('injectable1')).toEqual(['injectable11', 'injectable12']);
        });
        it('should instantiate providers lazily', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [SimpleDirective] });
            let created = false;
            testing_1.TestBed.overrideDirective(SimpleDirective, {
                set: { providers: [{ provide: 'service', useFactory: () => (created = true) }] },
            });
            const el = createComponent('<div simpleDirective></div>');
            (0, matchers_1.expect)(created).toBe(false);
            el.children[0].injector.get('service');
            (0, matchers_1.expect)(created).toBe(true);
        });
        it('should provide undefined', () => {
            let factoryCounter = 0;
            const el = createComponent('', [
                {
                    provide: 'token',
                    useFactory: () => {
                        factoryCounter++;
                        return undefined;
                    },
                },
            ]);
            (0, matchers_1.expect)(el.injector.get('token')).toBeUndefined();
            (0, matchers_1.expect)(el.injector.get('token')).toBeUndefined();
            (0, matchers_1.expect)(factoryCounter).toBe(1);
        });
        describe('injecting lazy providers into an eager provider via Injector.get', () => {
            it('should inject providers that were declared before it', () => {
                let MyComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '',
                            providers: [
                                { provide: 'lazy', useFactory: () => 'lazyValue' },
                                {
                                    provide: 'eager',
                                    useFactory: (i) => `eagerValue: ${i.get('lazy')}`,
                                    deps: [core_1.Injector],
                                },
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyComp = _classThis = class {
                        // Component is eager, which makes all of its deps eager
                        constructor(eager) { }
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
                const ctx = testing_1.TestBed.configureTestingModule({ declarations: [MyComp] }).createComponent(MyComp);
                (0, matchers_1.expect)(ctx.debugElement.injector.get('eager')).toBe('eagerValue: lazyValue');
            });
            it('should inject providers that were declared after it', () => {
                let MyComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '',
                            providers: [
                                {
                                    provide: 'eager',
                                    useFactory: (i) => `eagerValue: ${i.get('lazy')}`,
                                    deps: [core_1.Injector],
                                },
                                { provide: 'lazy', useFactory: () => 'lazyValue' },
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyComp = _classThis = class {
                        // Component is eager, which makes all of its deps eager
                        constructor(eager) { }
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
                const ctx = testing_1.TestBed.configureTestingModule({ declarations: [MyComp] }).createComponent(MyComp);
                (0, matchers_1.expect)(ctx.debugElement.injector.get('eager')).toBe('eagerValue: lazyValue');
            });
        });
        describe('injecting eager providers into an eager provider via Injector.get', () => {
            it('should inject providers that were declared before it', () => {
                let MyComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '',
                            providers: [
                                { provide: 'eager1', useFactory: () => 'v1' },
                                {
                                    provide: 'eager2',
                                    useFactory: (i) => `v2: ${i.get('eager1')}`,
                                    deps: [core_1.Injector],
                                },
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyComp = _classThis = class {
                        // Component is eager, which makes all of its deps eager
                        constructor(eager1, eager2) { }
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
                const ctx = testing_1.TestBed.configureTestingModule({ declarations: [MyComp] }).createComponent(MyComp);
                (0, matchers_1.expect)(ctx.debugElement.injector.get('eager2')).toBe('v2: v1');
            });
            it('should inject providers that were declared after it', () => {
                let MyComp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: '',
                            providers: [
                                {
                                    provide: 'eager1',
                                    useFactory: (i) => `v1: ${i.get('eager2')}`,
                                    deps: [core_1.Injector],
                                },
                                { provide: 'eager2', useFactory: () => 'v2' },
                            ],
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var MyComp = _classThis = class {
                        // Component is eager, which makes all of its deps eager
                        constructor(eager1, eager2) { }
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
                const ctx = testing_1.TestBed.configureTestingModule({ declarations: [MyComp] }).createComponent(MyComp);
                (0, matchers_1.expect)(ctx.debugElement.injector.get('eager1')).toBe('v1: v2');
            });
        });
        it('should allow injecting lazy providers via Injector.get from an eager provider that is declared earlier', () => {
            let SomeComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        providers: [{ provide: 'a', useFactory: () => 'aValue' }],
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeComponent = _classThis = class {
                    constructor(injector) {
                        this.a = injector.get('a');
                    }
                };
                __setFunctionName(_classThis, "SomeComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeComponent = _classThis;
            })();
            const comp = testing_1.TestBed.configureTestingModule({ declarations: [SomeComponent] }).createComponent(SomeComponent);
            (0, matchers_1.expect)(comp.componentInstance.a).toBe('aValue');
        });
        it('should support ngOnDestroy for lazy providers', () => {
            let created = false;
            let destroyed = false;
            class SomeInjectable {
                constructor() {
                    created = true;
                }
                ngOnDestroy() {
                    destroyed = true;
                }
            }
            let SomeComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        providers: [SomeInjectable],
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeComp = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeComp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ declarations: [SomeComp] });
            let compRef = testing_1.TestBed.createComponent(SomeComp).componentRef;
            (0, matchers_1.expect)(created).toBe(false);
            (0, matchers_1.expect)(destroyed).toBe(false);
            // no error if the provider was not yet created
            compRef.destroy();
            (0, matchers_1.expect)(created).toBe(false);
            (0, matchers_1.expect)(destroyed).toBe(false);
            compRef = testing_1.TestBed.createComponent(SomeComp).componentRef;
            compRef.injector.get(SomeInjectable);
            (0, matchers_1.expect)(created).toBe(true);
            compRef.destroy();
            (0, matchers_1.expect)(destroyed).toBe(true);
        });
        it('should instantiate view providers lazily', () => {
            let created = false;
            testing_1.TestBed.configureTestingModule({ declarations: [SimpleComponent] });
            testing_1.TestBed.overrideComponent(SimpleComponent, {
                set: { viewProviders: [{ provide: 'service', useFactory: () => (created = true) }] },
            });
            const el = createComponent('<div simpleComponent></div>');
            (0, matchers_1.expect)(created).toBe(false);
            el.children[0].injector.get('service');
            (0, matchers_1.expect)(created).toBe(true);
        });
        it('should not instantiate other directives that depend on viewProviders providers (same element)', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [SimpleComponent, NeedsService] });
            testing_1.TestBed.overrideComponent(SimpleComponent, {
                set: { viewProviders: [{ provide: 'service', useValue: 'service' }] },
            });
            (0, matchers_1.expect)(() => createComponent('<div simpleComponent needsService></div>')).toThrowError(/No provider for service!/);
        });
        it('should not instantiate other directives that depend on viewProviders providers (child element)', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [SimpleComponent, NeedsService] });
            testing_1.TestBed.overrideComponent(SimpleComponent, {
                set: { viewProviders: [{ provide: 'service', useValue: 'service' }] },
            });
            (0, matchers_1.expect)(() => createComponent('<div simpleComponent><div needsService></div></div>')).toThrowError(/No provider for service!/);
        });
        it('should instantiate directives that depend on providers of other directives', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [SimpleDirective, NeedsService] });
            testing_1.TestBed.overrideDirective(SimpleDirective, {
                set: { providers: [{ provide: 'service', useValue: 'parentService' }] },
            });
            const el = createComponent('<div simpleDirective><div needsService></div></div>');
            (0, matchers_1.expect)(el.children[0].children[0].injector.get(NeedsService).service).toEqual('parentService');
        });
        it('should instantiate directives that depend on providers in a parent view', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [SimpleDirective, NeedsService] });
            testing_1.TestBed.overrideDirective(SimpleDirective, {
                set: { providers: [{ provide: 'service', useValue: 'parentService' }] },
            });
            const el = createComponent('<div simpleDirective><ng-container *ngIf="true"><div *ngIf="true" needsService></div></ng-container></div>');
            (0, matchers_1.expect)(el.children[0].children[0].injector.get(NeedsService).service).toEqual('parentService');
        });
        it('should instantiate directives that depend on providers of a component', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [SimpleComponent, NeedsService] });
            testing_1.TestBed.overrideComponent(SimpleComponent, {
                set: { providers: [{ provide: 'service', useValue: 'hostService' }] },
            });
            testing_1.TestBed.overrideComponent(SimpleComponent, { set: { template: '<div needsService></div>' } });
            const el = createComponent('<div simpleComponent></div>');
            (0, matchers_1.expect)(el.children[0].children[0].injector.get(NeedsService).service).toEqual('hostService');
        });
        it('should instantiate directives that depend on view providers of a component', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [SimpleComponent, NeedsService] });
            testing_1.TestBed.overrideComponent(SimpleComponent, {
                set: { providers: [{ provide: 'service', useValue: 'hostService' }] },
            });
            testing_1.TestBed.overrideComponent(SimpleComponent, { set: { template: '<div needsService></div>' } });
            const el = createComponent('<div simpleComponent></div>');
            (0, matchers_1.expect)(el.children[0].children[0].injector.get(NeedsService).service).toEqual('hostService');
        });
        it('should instantiate directives in a root embedded view that depend on view providers of a component', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [SimpleComponent, NeedsService] });
            testing_1.TestBed.overrideComponent(SimpleComponent, {
                set: { providers: [{ provide: 'service', useValue: 'hostService' }] },
            });
            testing_1.TestBed.overrideComponent(SimpleComponent, {
                set: { template: '<div *ngIf="true" needsService></div>' },
            });
            const el = createComponent('<div simpleComponent></div>');
            (0, matchers_1.expect)(el.children[0].children[0].injector.get(NeedsService).service).toEqual('hostService');
        });
        it('should instantiate directives that depend on instances in the app injector', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [NeedsAppService] });
            const el = createComponent('<div needsAppService></div>');
            (0, matchers_1.expect)(el.children[0].injector.get(NeedsAppService).service).toEqual('appService');
        });
        it('should not instantiate a directive with cyclic dependencies', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [CycleDirective] });
            (0, matchers_1.expect)(() => createComponent('<div cycleDirective></div>')).toThrowError('NG0200: Circular dependency in DI detected for CycleDirective. Find more at https://angular.dev/errors/NG0200');
        });
        it('should not instantiate a directive in a view that has a host dependency on providers' +
            ' of the component', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [SimpleComponent, NeedsServiceFromHost] });
            testing_1.TestBed.overrideComponent(SimpleComponent, {
                set: { providers: [{ provide: 'service', useValue: 'hostService' }] },
            });
            testing_1.TestBed.overrideComponent(SimpleComponent, {
                set: { template: '<div needsServiceFromHost><div>' },
            });
            (0, matchers_1.expect)(() => createComponent('<div simpleComponent></div>')).toThrowError('NG0201: No provider for service found in NodeInjector. Find more at https://angular.dev/errors/NG0201');
        });
        it('should not instantiate a directive in a view that has a host dependency on providers' +
            ' of a decorator directive', () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [SimpleComponent, SomeOtherDirective, NeedsServiceFromHost],
            });
            testing_1.TestBed.overrideComponent(SimpleComponent, {
                set: { providers: [{ provide: 'service', useValue: 'hostService' }] },
            });
            testing_1.TestBed.overrideComponent(SimpleComponent, {
                set: { template: '<div needsServiceFromHost><div>' },
            });
            (0, matchers_1.expect)(() => createComponent('<div simpleComponent someOtherDirective></div>')).toThrowError('NG0201: No provider for service found in NodeInjector. Find more at https://angular.dev/errors/NG0201');
        });
        it('should not instantiate a directive in a view that has a self dependency on a parent directive', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [SimpleDirective, NeedsDirectiveFromSelf] });
            (0, matchers_1.expect)(() => createComponent('<div simpleDirective><div needsDirectiveFromSelf></div></div>')).toThrowError('NG0201: No provider for SimpleDirective found in NodeInjector. Find more at https://angular.dev/errors/NG0201');
        });
        it('should instantiate directives that depend on other directives', (0, testing_1.fakeAsync)(() => {
            testing_1.TestBed.configureTestingModule({ declarations: [SimpleDirective, NeedsDirective] });
            const el = createComponent('<div simpleDirective><div needsDirective></div></div>');
            const d = el.children[0].children[0].injector.get(NeedsDirective);
            (0, matchers_1.expect)(d).toBeInstanceOf(NeedsDirective);
            (0, matchers_1.expect)(d.dependency).toBeInstanceOf(SimpleDirective);
        }));
        it('should throw when a dependency cannot be resolved', (0, testing_1.fakeAsync)(() => {
            testing_1.TestBed.configureTestingModule({ declarations: [NeedsService] });
            (0, matchers_1.expect)(() => createComponent('<div needsService></div>')).toThrowError(/No provider for service!/);
        }));
        it('should inject null when an optional dependency cannot be resolved', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [OptionallyNeedsDirective] });
            const el = createComponent('<div optionallyNeedsDirective></div>');
            const d = el.children[0].injector.get(OptionallyNeedsDirective);
            (0, matchers_1.expect)(d.dependency).toBeNull();
        });
        it('should instantiate directives that depends on the host component', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [SimpleComponent, NeedsComponentFromHost] });
            testing_1.TestBed.overrideComponent(SimpleComponent, {
                set: { template: '<div needsComponentFromHost></div>' },
            });
            const el = createComponent('<div simpleComponent></div>');
            const d = el.children[0].children[0].injector.get(NeedsComponentFromHost);
            (0, matchers_1.expect)(d.dependency).toBeInstanceOf(SimpleComponent);
        });
        it('should not instantiate directives that depend on other directives on the host element', () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [SimpleComponent, SimpleDirective, NeedsDirectiveFromHost],
            });
            testing_1.TestBed.overrideComponent(SimpleComponent, {
                set: { template: '<div needsDirectiveFromHost></div>' },
            });
            (0, matchers_1.expect)(() => createComponent('<div simpleComponent simpleDirective></div>')).toThrowError('NG0201: No provider for SimpleDirective found in NodeInjector. Find more at https://angular.dev/errors/NG0201');
        });
        it('should allow to use the NgModule injector from a root ViewContainerRef.parentInjector', () => {
            let MyComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyComp = _classThis = class {
                    constructor(vc) {
                        this.vc = vc;
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
            const compFixture = testing_1.TestBed.configureTestingModule({
                declarations: [MyComp],
                providers: [{ provide: 'someToken', useValue: 'someValue' }],
            }).createComponent(MyComp);
            (0, matchers_1.expect)(compFixture.componentInstance.vc.parentInjector.get('someToken')).toBe('someValue');
        });
    });
    describe('static attributes', () => {
        it('should be injectable', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [NeedsAttribute] });
            const el = createComponent('<div needsAttribute type="text" title></div>');
            const needsAttribute = el.children[0].injector.get(NeedsAttribute);
            (0, matchers_1.expect)(needsAttribute.typeAttribute).toEqual('text');
            (0, matchers_1.expect)(needsAttribute.titleAttribute).toEqual('');
            (0, matchers_1.expect)(needsAttribute.fooAttribute).toEqual(null);
        });
        it('should be injectable without type annotation', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [NeedsAttributeNoType] });
            const el = createComponent('<div needsAttributeNoType foo="bar"></div>');
            const needsAttribute = el.children[0].injector.get(NeedsAttributeNoType);
            (0, matchers_1.expect)(needsAttribute.fooAttribute).toEqual('bar');
        });
    });
    describe('refs', () => {
        it('should inject ElementRef', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [NeedsElementRef] });
            const el = createComponent('<div needsElementRef></div>');
            (0, matchers_1.expect)(el.children[0].injector.get(NeedsElementRef).elementRef.nativeElement).toBe(el.children[0].nativeElement);
        });
        it("should inject ChangeDetectorRef of the component's view into the component", () => {
            testing_1.TestBed.configureTestingModule({ declarations: [PushComponentNeedsChangeDetectorRef] });
            const cf = createComponentFixture('<div componentNeedsChangeDetectorRef></div>');
            cf.detectChanges();
            const compEl = cf.debugElement.children[0];
            const comp = compEl.injector.get(PushComponentNeedsChangeDetectorRef);
            comp.counter = 1;
            cf.detectChanges();
            (0, matchers_1.expect)(compEl.nativeElement).toHaveText('0');
            comp.changeDetectorRef.markForCheck();
            cf.detectChanges();
            (0, matchers_1.expect)(compEl.nativeElement).toHaveText('1');
        });
        it('should inject ChangeDetectorRef of the containing component into directives', () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [PushComponentNeedsChangeDetectorRef, DirectiveNeedsChangeDetectorRef],
            });
            testing_1.TestBed.overrideComponent(PushComponentNeedsChangeDetectorRef, {
                set: {
                    template: '{{counter}}<div directiveNeedsChangeDetectorRef></div><div *ngIf="true" directiveNeedsChangeDetectorRef></div>',
                },
            });
            const cf = createComponentFixture('<div componentNeedsChangeDetectorRef></div>');
            cf.detectChanges();
            const compEl = cf.debugElement.children[0];
            const comp = compEl.injector.get(PushComponentNeedsChangeDetectorRef);
            comp.counter = 1;
            cf.detectChanges();
            (0, matchers_1.expect)(compEl.nativeElement).toHaveText('0');
            /**
             * Compares two `ChangeDetectorRef` instances. The logic depends on the engine, as the
             * implementation details of `ViewRef` vary.
             */
            function _compareChangeDetectorRefs(a, b) {
                (0, matchers_1.expect)(a._lView).toEqual(b._lView);
                (0, matchers_1.expect)(a.context).toEqual(b.context);
            }
            _compareChangeDetectorRefs(compEl.children[0].injector.get(DirectiveNeedsChangeDetectorRef).changeDetectorRef, comp.changeDetectorRef);
            _compareChangeDetectorRefs(compEl.children[1].injector.get(DirectiveNeedsChangeDetectorRef).changeDetectorRef, comp.changeDetectorRef);
            comp.changeDetectorRef.markForCheck();
            cf.detectChanges();
            (0, matchers_1.expect)(compEl.nativeElement).toHaveText('1');
        });
        it('should inject ChangeDetectorRef of a same element component into a directive', () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [PushComponentNeedsChangeDetectorRef, DirectiveNeedsChangeDetectorRef],
            });
            const cf = createComponentFixture('<div componentNeedsChangeDetectorRef directiveNeedsChangeDetectorRef></div>');
            cf.detectChanges();
            const compEl = cf.debugElement.children[0];
            const comp = compEl.injector.get(PushComponentNeedsChangeDetectorRef);
            const dir = compEl.injector.get(DirectiveNeedsChangeDetectorRef);
            comp.counter = 1;
            cf.detectChanges();
            (0, matchers_1.expect)(compEl.nativeElement).toHaveText('0');
            dir.changeDetectorRef.markForCheck();
            cf.detectChanges();
            (0, matchers_1.expect)(compEl.nativeElement).toHaveText('1');
        });
        it(`should not inject ChangeDetectorRef of a parent element's component into a directive`, () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [PushComponentNeedsChangeDetectorRef, DirectiveNeedsChangeDetectorRef],
            }).overrideComponent(PushComponentNeedsChangeDetectorRef, {
                set: { template: '<ng-content></ng-content>{{counter}}' },
            });
            const cf = createComponentFixture('<div componentNeedsChangeDetectorRef><div directiveNeedsChangeDetectorRef></div></div>');
            cf.detectChanges();
            const compEl = cf.debugElement.children[0];
            const comp = compEl.injector.get(PushComponentNeedsChangeDetectorRef);
            const dirEl = compEl.children[0];
            const dir = dirEl.injector.get(DirectiveNeedsChangeDetectorRef);
            comp.counter = 1;
            cf.detectChanges();
            (0, matchers_1.expect)(compEl.nativeElement).toHaveText('0');
            dir.changeDetectorRef.markForCheck();
            cf.detectChanges();
            (0, matchers_1.expect)(compEl.nativeElement).toHaveText('0');
        });
        it('should inject ViewContainerRef', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [NeedsViewContainerRef] });
            const el = createComponent('<div needsViewContainerRef></div>');
            (0, matchers_1.expect)(el.children[0].injector.get(NeedsViewContainerRef).viewContainer.element.nativeElement).toBe(el.children[0].nativeElement);
        });
        it('should inject ViewContainerRef', () => {
            let TestComp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestComp = _classThis = class {
                    constructor(vcr) {
                        this.vcr = vcr;
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
            testing_1.TestBed.configureTestingModule({ declarations: [TestComp] });
            const environmentInjector = (0, core_1.createEnvironmentInjector)([{ provide: 'someToken', useValue: 'someNewValue' }], testing_1.TestBed.inject(core_1.EnvironmentInjector));
            const component = (0, core_1.createComponent)(TestComp, { environmentInjector });
            (0, matchers_1.expect)(component.instance.vcr.parentInjector.get('someToken')).toBe('someNewValue');
        });
        it('should inject TemplateRef', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [NeedsViewContainerRef, NeedsTemplateRef] });
            const el = createComponent('<ng-template needsViewContainerRef needsTemplateRef></ng-template>');
            (0, matchers_1.expect)(el.childNodes[0].injector.get(NeedsTemplateRef).templateRef.elementRef).toEqual(el.childNodes[0].injector.get(NeedsViewContainerRef).viewContainer.element);
        });
        it('should throw if there is no TemplateRef', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [NeedsTemplateRef] });
            (0, matchers_1.expect)(() => createComponent('<div needsTemplateRef></div>')).toThrowError(/No provider for TemplateRef/);
        });
        it('should inject null if there is no TemplateRef when the dependency is optional', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [OptionallyNeedsTemplateRef] });
            const el = createComponent('<div optionallyNeedsTemplateRef></div>');
            const instance = el.children[0].injector.get(OptionallyNeedsTemplateRef);
            (0, matchers_1.expect)(instance.templateRef).toBeNull();
        });
    });
    describe('pipes', () => {
        it('should instantiate pipes that have dependencies', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [SimpleDirective, PipeNeedsService] });
            const el = createComponent('<div [simpleDirective]="true | pipeNeedsService"></div>', [
                { provide: 'service', useValue: 'pipeService' },
            ]);
            (0, matchers_1.expect)(el.children[0].injector.get(SimpleDirective).value.service).toEqual('pipeService');
        });
        it('should overwrite pipes with later entry in the pipes array', () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [SimpleDirective, DuplicatePipe1, DuplicatePipe2],
            });
            const el = createComponent('<div [simpleDirective]="true | duplicatePipe"></div>');
            (0, matchers_1.expect)(el.children[0].injector.get(SimpleDirective).value).toBeInstanceOf(DuplicatePipe2);
        });
        it('should inject ChangeDetectorRef into pipes', () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [
                    SimpleDirective,
                    PipeNeedsChangeDetectorRef,
                    DirectiveNeedsChangeDetectorRef,
                ],
            });
            const el = createComponent('<div [simpleDirective]="true | pipeNeedsChangeDetectorRef" directiveNeedsChangeDetectorRef></div>');
            const cdRef = el.children[0].injector.get(DirectiveNeedsChangeDetectorRef).changeDetectorRef;
            (0, matchers_1.expect)(el.children[0].injector.get(SimpleDirective).value.changeDetectorRef).toEqual(cdRef);
        });
        it('should not cache impure pipes', () => {
            testing_1.TestBed.configureTestingModule({ declarations: [SimpleDirective, ImpurePipe] });
            const el = createComponent('<div [simpleDirective]="true | impurePipe"></div><div [simpleDirective]="true | impurePipe"></div>' +
                '<div *ngFor="let x of [1,2]" [simpleDirective]="true | impurePipe"></div>');
            const impurePipe1 = el.children[0].injector.get(SimpleDirective).value;
            const impurePipe2 = el.children[1].injector.get(SimpleDirective).value;
            const impurePipe3 = el.children[2].injector.get(SimpleDirective).value;
            const impurePipe4 = el.children[3].injector.get(SimpleDirective).value;
            (0, matchers_1.expect)(impurePipe1).toBeInstanceOf(ImpurePipe);
            (0, matchers_1.expect)(impurePipe2).toBeInstanceOf(ImpurePipe);
            (0, matchers_1.expect)(impurePipe2).not.toBe(impurePipe1);
            (0, matchers_1.expect)(impurePipe3).toBeInstanceOf(ImpurePipe);
            (0, matchers_1.expect)(impurePipe3).not.toBe(impurePipe1);
            (0, matchers_1.expect)(impurePipe4).toBeInstanceOf(ImpurePipe);
            (0, matchers_1.expect)(impurePipe4).not.toBe(impurePipe1);
        });
    });
    describe('view destruction', () => {
        let SomeComponent = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'some-component',
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SomeComponent = _classThis = class {
            };
            __setFunctionName(_classThis, "SomeComponent");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SomeComponent = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SomeComponent = _classThis;
        })();
        let ComponentThatLoadsAnotherComponentThenMovesIt = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'listener-and-on-destroy',
                    template: '',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ComponentThatLoadsAnotherComponentThenMovesIt = _classThis = class {
                constructor(viewContainerRef) {
                    this.viewContainerRef = viewContainerRef;
                }
                ngOnInit() {
                    // Dynamically load some component.
                    const componentRef = this.viewContainerRef.createComponent(SomeComponent, {
                        index: this.viewContainerRef.length,
                    });
                    // Manually move the loaded component to some arbitrary DOM node.
                    const componentRootNode = componentRef.hostView
                        .rootNodes[0];
                    document.createElement('div').appendChild(componentRootNode);
                    // Destroy the component we just moved to ensure that it does not error during
                    // destruction.
                    componentRef.destroy();
                }
            };
            __setFunctionName(_classThis, "ComponentThatLoadsAnotherComponentThenMovesIt");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ComponentThatLoadsAnotherComponentThenMovesIt = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ComponentThatLoadsAnotherComponentThenMovesIt = _classThis;
        })();
        it('should not error when destroying a component that has been moved in the DOM', () => {
            testing_1.TestBed.configureTestingModule({
                declarations: [ComponentThatLoadsAnotherComponentThenMovesIt, SomeComponent],
            });
            const fixture = createComponentFixture(`<listener-and-on-destroy></listener-and-on-destroy>`);
            fixture.detectChanges();
            // This test will fail if the ngOnInit of ComponentThatLoadsAnotherComponentThenMovesIt
            // throws an error.
        });
    });
});
class TestValue {
    constructor(value) {
        this.value = value;
    }
}
