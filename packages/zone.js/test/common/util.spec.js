"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../lib/common/utils");
describe('utils', function () {
    describe('patchMethod', () => {
        it('should patch target where the method is defined', () => {
            let args;
            let self;
            class Type {
                method(..._args) {
                    args = _args;
                    self = this;
                    return 'OK';
                }
            }
            const method = Type.prototype.method;
            let delegateMethod;
            let delegateSymbol;
            const instance = new Type();
            expect((0, utils_1.patchMethod)(instance, 'method', (delegate, symbol, name) => {
                expect(name).toEqual('method');
                delegateMethod = delegate;
                delegateSymbol = symbol;
                return function (self, args) {
                    return delegate.apply(self, ['patch', args[0]]);
                };
            })).toBe(delegateMethod);
            expect(instance.method('a0')).toEqual('OK');
            expect(args).toEqual(['patch', 'a0']);
            expect(self).toBe(instance);
            expect(delegateMethod).toBe(method);
            expect(delegateSymbol).toEqual((0, utils_1.zoneSymbol)('method'));
            expect(Type.prototype[delegateSymbol]).toBe(method);
        });
        it('should not double patch', () => {
            const Type = function () { };
            const method = (Type.prototype.method = function () { });
            (0, utils_1.patchMethod)(Type.prototype, 'method', (delegate) => {
                return function (self, args) {
                    return delegate.apply(self, ['patch', ...args]);
                };
            });
            const pMethod = Type.prototype.method;
            expect(pMethod).not.toBe(method);
            (0, utils_1.patchMethod)(Type.prototype, 'method', (delegate) => {
                return function (self, args) {
                    return delegate.apply(self, ['patch', ...args]);
                };
            });
            expect(pMethod).toBe(Type.prototype.method);
        });
        it('should not patch property which is not configurable', () => {
            const TestType = function () { };
            const originalDefineProperty = Object[(0, utils_1.zoneSymbol)('defineProperty')];
            if (originalDefineProperty) {
                originalDefineProperty(TestType.prototype, 'nonConfigurableProperty', {
                    configurable: false,
                    writable: true,
                    value: 'test',
                });
            }
            else {
                Object.defineProperty(TestType.prototype, 'nonConfigurableProperty', {
                    configurable: false,
                    writable: true,
                    value: 'test',
                });
            }
            (0, utils_1.patchProperty)(TestType.prototype, 'nonConfigurableProperty');
            const desc = Object.getOwnPropertyDescriptor(TestType.prototype, 'nonConfigurableProperty');
            expect(desc.writable).toBeTruthy();
            expect(!desc.get).toBeTruthy();
        });
        it('should patch target if it overrides a patched method', () => {
            let args;
            let childArgs;
            let self;
            let childSelf;
            class Type {
                method(..._args) {
                    args = _args;
                    self = this;
                    return 'OK';
                }
            }
            class ChildType extends Type {
                method(..._args) {
                    childArgs = _args;
                    childSelf = this;
                    return 'ChildOK';
                }
            }
            const method = Type.prototype.method;
            const childMethod = ChildType.prototype.method;
            let delegateMethod;
            let delegateSymbol;
            let childDelegateMethod;
            let childDelegateSymbol;
            const typeInstance = new Type();
            const childTypeInstance = new ChildType();
            expect((0, utils_1.patchMethod)(Type.prototype, 'method', (delegate, symbol, name) => {
                expect(name).toEqual('method');
                delegateMethod = delegate;
                delegateSymbol = symbol;
                return function (self, args) {
                    return delegate.apply(self, ['patch', args[0]]);
                };
            })).toBe(delegateMethod);
            expect((0, utils_1.patchMethod)(ChildType.prototype, 'method', (delegate, symbol, name) => {
                expect(name).toEqual('method');
                childDelegateMethod = delegate;
                childDelegateSymbol = symbol;
                return function (self, args) {
                    return delegate.apply(self, ['child patch', args[0]]);
                };
            })).toBe(childDelegateMethod);
            expect(typeInstance.method('a0')).toEqual('OK');
            expect(childTypeInstance.method('a0')).toEqual('ChildOK');
            expect(args).toEqual(['patch', 'a0']);
            expect(childArgs).toEqual(['child patch', 'a0']);
            expect(self).toBe(typeInstance);
            expect(childSelf).toBe(childTypeInstance);
            expect(delegateMethod).toBe(method);
            expect(childDelegateMethod).toBe(childMethod);
            expect(delegateSymbol).toEqual((0, utils_1.zoneSymbol)('method'));
            expect(childDelegateSymbol).toEqual((0, utils_1.zoneSymbol)('method'));
            expect(Type.prototype[delegateSymbol]).toBe(method);
            expect(ChildType.prototype[delegateSymbol]).toBe(childMethod);
        });
        it('should not patch target if does not override a patched method', () => {
            let args;
            let self;
            class Type {
                method(..._args) {
                    args = _args;
                    self = this;
                    return 'OK';
                }
            }
            class ChildType extends Type {
            }
            const method = Type.prototype.method;
            let delegateMethod;
            let delegateSymbol;
            let childPatched = false;
            const typeInstance = new Type();
            const childTypeInstance = new ChildType();
            expect((0, utils_1.patchMethod)(Type.prototype, 'method', (delegate, symbol, name) => {
                expect(name).toEqual('method');
                delegateMethod = delegate;
                delegateSymbol = symbol;
                return function (self, args) {
                    return delegate.apply(self, ['patch', args[0]]);
                };
            })).toBe(delegateMethod);
            expect((0, utils_1.patchMethod)(ChildType.prototype, 'method', (delegate, symbol, name) => {
                childPatched = true;
                return function (self, args) {
                    return delegate.apply(self, ['child patch', args[0]]);
                };
            })).toBe(delegateMethod);
            expect(childPatched).toBe(false);
            expect(typeInstance.method('a0')).toEqual('OK');
            expect(args).toEqual(['patch', 'a0']);
            expect(self).toBe(typeInstance);
            expect(delegateMethod).toBe(method);
            expect(delegateSymbol).toEqual((0, utils_1.zoneSymbol)('method'));
            expect(Type.prototype[delegateSymbol]).toBe(method);
            expect(childTypeInstance.method('a0')).toEqual('OK');
            expect(args).toEqual(['patch', 'a0']);
            expect(self).toBe(childTypeInstance);
            expect(ChildType.prototype[delegateSymbol]).toBe(method);
        });
    });
    describe('patchPrototype', () => {
        it('non configurable property desc should be patched', () => {
            'use strict';
            const TestFunction = function () { };
            const log = [];
            Object.defineProperties(TestFunction.prototype, {
                'property1': {
                    value: function Property1(callback) {
                        Zone.root.run(callback);
                    },
                    writable: true,
                    configurable: true,
                    enumerable: true,
                },
                'property2': {
                    value: function Property2(callback) {
                        Zone.root.run(callback);
                    },
                    writable: true,
                    configurable: false,
                    enumerable: true,
                },
            });
            const zone = Zone.current.fork({ name: 'patch' });
            zone.run(() => {
                const instance = new TestFunction();
                instance.property1(() => {
                    log.push('property1' + Zone.current.name);
                });
                instance.property2(() => {
                    log.push('property2' + Zone.current.name);
                });
            });
            expect(log).toEqual(['property1<root>', 'property2<root>']);
            log.length = 0;
            (0, utils_1.patchPrototype)(TestFunction.prototype, ['property1', 'property2']);
            zone.run(() => {
                const instance = new TestFunction();
                instance.property1(() => {
                    log.push('property1' + Zone.current.name);
                });
                instance.property2(() => {
                    log.push('property2' + Zone.current.name);
                });
            });
            expect(log).toEqual(['property1patch', 'property2patch']);
        });
        it('non writable property desc should not be patched', () => {
            'use strict';
            const TestFunction = function () { };
            const log = [];
            Object.defineProperties(TestFunction.prototype, {
                'property1': {
                    value: function Property1(callback) {
                        Zone.root.run(callback);
                    },
                    writable: true,
                    configurable: true,
                    enumerable: true,
                },
                'property2': {
                    value: function Property2(callback) {
                        Zone.root.run(callback);
                    },
                    writable: false,
                    configurable: true,
                    enumerable: true,
                },
            });
            const zone = Zone.current.fork({ name: 'patch' });
            zone.run(() => {
                const instance = new TestFunction();
                instance.property1(() => {
                    log.push('property1' + Zone.current.name);
                });
                instance.property2(() => {
                    log.push('property2' + Zone.current.name);
                });
            });
            expect(log).toEqual(['property1<root>', 'property2<root>']);
            log.length = 0;
            (0, utils_1.patchPrototype)(TestFunction.prototype, ['property1', 'property2']);
            zone.run(() => {
                const instance = new TestFunction();
                instance.property1(() => {
                    log.push('property1' + Zone.current.name);
                });
                instance.property2(() => {
                    log.push('property2' + Zone.current.name);
                });
            });
            expect(log).toEqual(['property1patch', 'property2<root>']);
        });
        it('readonly property desc should not be patched', () => {
            'use strict';
            const TestFunction = function () { };
            const log = [];
            Object.defineProperties(TestFunction.prototype, {
                'property1': {
                    get: function () {
                        if (!this._property1) {
                            this._property1 = function Property2(callback) {
                                Zone.root.run(callback);
                            };
                        }
                        return this._property1;
                    },
                    set: function (func) {
                        this._property1 = func;
                    },
                    configurable: true,
                    enumerable: true,
                },
                'property2': {
                    get: function () {
                        return function Property2(callback) {
                            Zone.root.run(callback);
                        };
                    },
                    configurable: true,
                    enumerable: true,
                },
            });
            const zone = Zone.current.fork({ name: 'patch' });
            zone.run(() => {
                const instance = new TestFunction();
                instance.property1(() => {
                    log.push('property1' + Zone.current.name);
                });
                instance.property2(() => {
                    log.push('property2' + Zone.current.name);
                });
            });
            expect(log).toEqual(['property1<root>', 'property2<root>']);
            log.length = 0;
            (0, utils_1.patchPrototype)(TestFunction.prototype, ['property1', 'property2']);
            zone.run(() => {
                const instance = new TestFunction();
                instance.property1(() => {
                    log.push('property1' + Zone.current.name);
                });
                instance.property2(() => {
                    log.push('property2' + Zone.current.name);
                });
            });
            expect(log).toEqual(['property1patch', 'property2<root>']);
        });
        it('non writable method should not be patched', () => {
            'use strict';
            const TestFunction = function () { };
            const log = [];
            Object.defineProperties(TestFunction.prototype, {
                'property2': {
                    value: function Property2(callback) {
                        Zone.root.run(callback);
                    },
                    writable: false,
                    configurable: true,
                    enumerable: true,
                },
            });
            const zone = Zone.current.fork({ name: 'patch' });
            zone.run(() => {
                const instance = new TestFunction();
                instance.property2(() => {
                    log.push('property2' + Zone.current.name);
                });
            });
            expect(log).toEqual(['property2<root>']);
            log.length = 0;
            (0, utils_1.patchMethod)(TestFunction.prototype, 'property2', function (delegate, delegateName, name) {
                return function (self, args) {
                    log.push('patched property2');
                };
            });
            zone.run(() => {
                const instance = new TestFunction();
                instance.property2(() => {
                    log.push('property2' + Zone.current.name);
                });
            });
            expect(log).toEqual(['property2<root>']);
        });
        it('readonly method should not be patched', () => {
            'use strict';
            const TestFunction = function () { };
            const log = [];
            Object.defineProperties(TestFunction.prototype, {
                'property2': {
                    get: function () {
                        return function Property2(callback) {
                            Zone.root.run(callback);
                        };
                    },
                    configurable: true,
                    enumerable: true,
                },
            });
            const zone = Zone.current.fork({ name: 'patch' });
            zone.run(() => {
                const instance = new TestFunction();
                instance.property2(() => {
                    log.push('property2' + Zone.current.name);
                });
            });
            expect(log).toEqual(['property2<root>']);
            log.length = 0;
            (0, utils_1.patchMethod)(TestFunction.prototype, 'property2', function (delegate, delegateName, name) {
                return function (self, args) {
                    log.push('patched property2');
                };
            });
            zone.run(() => {
                const instance = new TestFunction();
                instance.property2(() => {
                    log.push('property2' + Zone.current.name);
                });
            });
            expect(log).toEqual(['property2<root>']);
        });
    });
});
