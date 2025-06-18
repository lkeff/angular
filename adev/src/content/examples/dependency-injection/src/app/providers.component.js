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
exports.ProvidersComponent = exports.Provider10Component = exports.Provider9Component = exports.Provider8Component = exports.Provider7Component = exports.SilentLogger = exports.Provider6bComponent = exports.Provider6aComponent = exports.OldLogger = exports.NewLogger = exports.Provider5Component = exports.EvenBetterLogger = exports.Provider4Component = exports.BetterLogger = exports.Provider3Component = exports.Provider1Component = void 0;
/*
 * A collection of demo components showing different ways to provide services
 * in @Component metadata
 */
const core_1 = require("@angular/core");
const injection_config_1 = require("./injection.config");
const hero_service_1 = require("./heroes/hero.service");
const hero_service_provider_1 = require("./heroes/hero.service.provider");
const logger_service_1 = require("./logger.service");
const user_service_1 = require("./user.service");
const template = '{{log}}';
let Provider1Component = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'provider-1',
            template,
            // #docregion providers-logger
            providers: [logger_service_1.Logger],
            // #enddocregion providers-logger
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Provider1Component = _classThis = class {
        constructor() {
            const logger = (0, core_1.inject)(logger_service_1.Logger);
            logger.log('Hello from logger provided with Logger class');
            this.log = logger.logs[0];
        }
    };
    __setFunctionName(_classThis, "Provider1Component");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Provider1Component = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Provider1Component = _classThis;
})();
exports.Provider1Component = Provider1Component;
//////////////////////////////////////////
let Provider3Component = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'provider-3',
            template,
            providers: 
            // #docregion providers-3
            [{ provide: logger_service_1.Logger, useClass: logger_service_1.Logger }],
            // #enddocregion providers-3
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Provider3Component = _classThis = class {
        constructor() {
            const logger = (0, core_1.inject)(logger_service_1.Logger);
            logger.log('Hello from logger provided with useClass:Logger');
            this.log = logger.logs[0];
        }
    };
    __setFunctionName(_classThis, "Provider3Component");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Provider3Component = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Provider3Component = _classThis;
})();
exports.Provider3Component = Provider3Component;
//////////////////////////////////////////
class BetterLogger extends logger_service_1.Logger {
}
exports.BetterLogger = BetterLogger;
let Provider4Component = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'provider-4',
            template,
            providers: 
            // #docregion providers-4
            [{ provide: logger_service_1.Logger, useClass: BetterLogger }],
            // #enddocregion providers-4
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Provider4Component = _classThis = class {
        constructor() {
            const logger = (0, core_1.inject)(logger_service_1.Logger);
            logger.log('Hello from logger provided with useClass:BetterLogger');
            this.log = logger.logs[0];
        }
    };
    __setFunctionName(_classThis, "Provider4Component");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Provider4Component = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Provider4Component = _classThis;
})();
exports.Provider4Component = Provider4Component;
//////////////////////////////////////////
// #docregion EvenBetterLogger
let EvenBetterLogger = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = logger_service_1.Logger;
    var EvenBetterLogger = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.userService = (0, core_1.inject)(user_service_1.UserService);
        }
        log(message) {
            const name = this.userService.user.name;
            super.log(`Message to ${name}: ${message}`);
        }
    };
    __setFunctionName(_classThis, "EvenBetterLogger");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EvenBetterLogger = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EvenBetterLogger = _classThis;
})();
exports.EvenBetterLogger = EvenBetterLogger;
// #enddocregion EvenBetterLogger
let Provider5Component = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'provider-5',
            template,
            providers: 
            // #docregion providers-5
            [user_service_1.UserService, { provide: logger_service_1.Logger, useClass: EvenBetterLogger }],
            // #enddocregion providers-5
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Provider5Component = _classThis = class {
        constructor() {
            const logger = (0, core_1.inject)(logger_service_1.Logger);
            logger.log('Hello from EvenBetterlogger');
            this.log = logger.logs[0];
        }
    };
    __setFunctionName(_classThis, "Provider5Component");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Provider5Component = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Provider5Component = _classThis;
})();
exports.Provider5Component = Provider5Component;
//////////////////////////////////////////
class NewLogger extends logger_service_1.Logger {
}
exports.NewLogger = NewLogger;
class OldLogger {
    constructor() {
        this.logs = [];
    }
    log(message) {
        throw new Error('Should not call the old logger!');
    }
}
exports.OldLogger = OldLogger;
let Provider6aComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'provider-6a',
            template,
            providers: [
                NewLogger,
                // Not aliased! Creates two instances of `NewLogger`
                { provide: OldLogger, useClass: NewLogger },
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Provider6aComponent = _classThis = class {
        constructor() {
            const newLogger = (0, core_1.inject)(NewLogger);
            const oldLogger = (0, core_1.inject)(OldLogger);
            if (newLogger === oldLogger) {
                throw new Error('expected the two loggers to be different instances');
            }
            oldLogger.log('Hello OldLogger (but we want NewLogger)');
            // The newLogger wasn't called so no logs[]
            // display the logs of the oldLogger.
            this.log = newLogger.logs[0] || oldLogger.logs[0];
        }
    };
    __setFunctionName(_classThis, "Provider6aComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Provider6aComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Provider6aComponent = _classThis;
})();
exports.Provider6aComponent = Provider6aComponent;
let Provider6bComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'provider-6b',
            template,
            providers: 
            // #docregion providers-6b
            [
                NewLogger,
                // Alias OldLogger w/ reference to NewLogger
                { provide: OldLogger, useExisting: NewLogger },
            ],
            // #enddocregion providers-6b
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Provider6bComponent = _classThis = class {
        constructor() {
            const newLogger = (0, core_1.inject)(NewLogger);
            const oldLogger = (0, core_1.inject)(OldLogger);
            if (newLogger !== oldLogger) {
                throw new Error('expected the two loggers to be the same instance');
            }
            oldLogger.log('Hello from NewLogger (via aliased OldLogger)');
            this.log = newLogger.logs[0];
        }
    };
    __setFunctionName(_classThis, "Provider6bComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Provider6bComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Provider6bComponent = _classThis;
})();
exports.Provider6bComponent = Provider6bComponent;
//////////////////////////////////////////
// An object in the shape of the logger service
function silentLoggerFn() { }
exports.SilentLogger = {
    logs: ['Silent logger says "Shhhhh!". Provided via "useValue"'],
    log: silentLoggerFn,
};
let Provider7Component = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'provider-7',
            template,
            providers: [{ provide: logger_service_1.Logger, useValue: exports.SilentLogger }],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Provider7Component = _classThis = class {
        constructor() {
            const logger = (0, core_1.inject)(logger_service_1.Logger);
            logger.log('Hello from logger provided with useValue');
            this.log = logger.logs[0];
        }
    };
    __setFunctionName(_classThis, "Provider7Component");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Provider7Component = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Provider7Component = _classThis;
})();
exports.Provider7Component = Provider7Component;
/////////////////
let Provider8Component = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'provider-8',
            template,
            providers: [hero_service_provider_1.heroServiceProvider, logger_service_1.Logger, user_service_1.UserService],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Provider8Component = _classThis = class {
        constructor() {
            // must be true else this component would have blown up at runtime
            this.log = 'Hero service injected successfully via heroServiceProvider';
            this.heroService = (0, core_1.inject)(hero_service_1.HeroService);
        }
    };
    __setFunctionName(_classThis, "Provider8Component");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Provider8Component = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Provider8Component = _classThis;
})();
exports.Provider8Component = Provider8Component;
/////////////////
let Provider9Component = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'provider-9',
            template,
            /*
             // #docregion providers-9-interface
             // Can't use interface as provider token
             [{ provide: AppConfig, useValue: HERO_DI_CONFIG })]
             // #enddocregion providers-9-interface
             */
            // #docregion providers-9
            providers: [{ provide: injection_config_1.APP_CONFIG, useValue: injection_config_1.HERO_DI_CONFIG }],
            // #enddocregion providers-9
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Provider9Component = _classThis = class {
        constructor() {
            this.log = '';
            /*
             // #docregion provider-9-ctor-interface
             // Can't inject using the interface as the parameter type
             constructor(private config: AppConfig){ }
             // #enddocregion provider-9-ctor-interface
             */
            this.config = (0, core_1.inject)(injection_config_1.APP_CONFIG);
            this.log = 'APP_CONFIG Application title is ' + this.config.title;
        }
    };
    __setFunctionName(_classThis, "Provider9Component");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Provider9Component = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Provider9Component = _classThis;
})();
exports.Provider9Component = Provider9Component;
const someMessage = 'Hello from the injected logger';
let Provider10Component = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'provider-10',
            template,
            providers: [{ provide: logger_service_1.Logger, useValue: null }],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Provider10Component = _classThis = class {
        constructor() {
            this.log = '';
            this.logger = (0, core_1.inject)(logger_service_1.Logger, { optional: true });
            if (this.logger) {
                this.logger.log(someMessage);
            }
        }
        ngOnInit() {
            this.log = this.logger ? this.logger.logs[0] : 'Optional logger was not available';
        }
    };
    __setFunctionName(_classThis, "Provider10Component");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Provider10Component = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Provider10Component = _classThis;
})();
exports.Provider10Component = Provider10Component;
/////////////////
let ProvidersComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-providers',
            template: `
  <h2>Provider variations</h2>
  <div id="p1"><provider-1></provider-1></div>
  <div id="p3"><provider-3></provider-3></div>
  <div id="p4"><provider-4></provider-4></div>
  <div id="p5"><provider-5></provider-5></div>
  <div id="p6a"><provider-6a></provider-6a></div>
  <div id="p6b"><provider-6b></provider-6b></div>
  <div id="p7"><provider-7></provider-7></div>
  <div id="p8"><provider-8></provider-8></div>
  <div id="p9"><provider-9></provider-9></div>
  <div id="p10"><provider-10></provider-10></div>
  `,
            imports: [
                Provider1Component,
                Provider3Component,
                Provider4Component,
                Provider5Component,
                Provider6aComponent,
                Provider6bComponent,
                Provider7Component,
                Provider8Component,
                Provider9Component,
                Provider10Component,
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ProvidersComponent = _classThis = class {
    };
    __setFunctionName(_classThis, "ProvidersComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProvidersComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProvidersComponent = _classThis;
})();
exports.ProvidersComponent = ProvidersComponent;
