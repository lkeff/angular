"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryTarget = void 0;
exports.ɵɵngDeclareDirective = ɵɵngDeclareDirective;
exports.ɵɵngDeclareClassMetadata = ɵɵngDeclareClassMetadata;
exports.ɵɵngDeclareClassMetadataAsync = ɵɵngDeclareClassMetadataAsync;
exports.ɵɵngDeclareComponent = ɵɵngDeclareComponent;
exports.ɵɵngDeclareFactory = ɵɵngDeclareFactory;
exports.ɵɵngDeclareInjectable = ɵɵngDeclareInjectable;
exports.ɵɵngDeclareInjector = ɵɵngDeclareInjector;
exports.ɵɵngDeclareNgModule = ɵɵngDeclareNgModule;
exports.ɵɵngDeclarePipe = ɵɵngDeclarePipe;
const compiler_facade_1 = require("../../compiler/compiler_facade");
const metadata_1 = require("../metadata");
const environment_1 = require("./environment");
/**
 * Compiles a partial directive declaration object into a full directive definition object.
 *
 * @codeGenApi
 */
function ɵɵngDeclareDirective(decl) {
    const compiler = (0, compiler_facade_1.getCompilerFacade)({
        usage: 1 /* JitCompilerUsage.PartialDeclaration */,
        kind: 'directive',
        type: decl.type,
    });
    return compiler.compileDirectiveDeclaration(environment_1.angularCoreEnv, `ng:///${decl.type.name}/ɵfac.js`, decl);
}
/**
 * Evaluates the class metadata declaration.
 *
 * @codeGenApi
 */
function ɵɵngDeclareClassMetadata(decl) {
    var _a, _b;
    (0, metadata_1.setClassMetadata)(decl.type, decl.decorators, (_a = decl.ctorParameters) !== null && _a !== void 0 ? _a : null, (_b = decl.propDecorators) !== null && _b !== void 0 ? _b : null);
}
/**
 * Evaluates the class metadata of a component that contains deferred blocks.
 *
 * @codeGenApi
 */
function ɵɵngDeclareClassMetadataAsync(decl) {
    (0, metadata_1.setClassMetadataAsync)(decl.type, decl.resolveDeferredDeps, (...types) => {
        const meta = decl.resolveMetadata(...types);
        (0, metadata_1.setClassMetadata)(decl.type, meta.decorators, meta.ctorParameters, meta.propDecorators);
    });
}
/**
 * Compiles a partial component declaration object into a full component definition object.
 *
 * @codeGenApi
 */
function ɵɵngDeclareComponent(decl) {
    const compiler = (0, compiler_facade_1.getCompilerFacade)({
        usage: 1 /* JitCompilerUsage.PartialDeclaration */,
        kind: 'component',
        type: decl.type,
    });
    return compiler.compileComponentDeclaration(environment_1.angularCoreEnv, `ng:///${decl.type.name}/ɵcmp.js`, decl);
}
/**
 * Compiles a partial pipe declaration object into a full pipe definition object.
 *
 * @codeGenApi
 */
function ɵɵngDeclareFactory(decl) {
    const compiler = (0, compiler_facade_1.getCompilerFacade)({
        usage: 1 /* JitCompilerUsage.PartialDeclaration */,
        kind: getFactoryKind(decl.target),
        type: decl.type,
    });
    return compiler.compileFactoryDeclaration(environment_1.angularCoreEnv, `ng:///${decl.type.name}/ɵfac.js`, decl);
}
function getFactoryKind(target) {
    switch (target) {
        case compiler_facade_1.FactoryTarget.Directive:
            return 'directive';
        case compiler_facade_1.FactoryTarget.Component:
            return 'component';
        case compiler_facade_1.FactoryTarget.Injectable:
            return 'injectable';
        case compiler_facade_1.FactoryTarget.Pipe:
            return 'pipe';
        case compiler_facade_1.FactoryTarget.NgModule:
            return 'NgModule';
    }
}
/**
 * Compiles a partial injectable declaration object into a full injectable definition object.
 *
 * @codeGenApi
 */
function ɵɵngDeclareInjectable(decl) {
    const compiler = (0, compiler_facade_1.getCompilerFacade)({
        usage: 1 /* JitCompilerUsage.PartialDeclaration */,
        kind: 'injectable',
        type: decl.type,
    });
    return compiler.compileInjectableDeclaration(environment_1.angularCoreEnv, `ng:///${decl.type.name}/ɵprov.js`, decl);
}
/**
 * These enums are used in the partial factory declaration calls.
 */
var compiler_facade_2 = require("../../compiler/compiler_facade");
Object.defineProperty(exports, "FactoryTarget", { enumerable: true, get: function () { return compiler_facade_2.FactoryTarget; } });
/**
 * Compiles a partial injector declaration object into a full injector definition object.
 *
 * @codeGenApi
 */
function ɵɵngDeclareInjector(decl) {
    const compiler = (0, compiler_facade_1.getCompilerFacade)({
        usage: 1 /* JitCompilerUsage.PartialDeclaration */,
        kind: 'NgModule',
        type: decl.type,
    });
    return compiler.compileInjectorDeclaration(environment_1.angularCoreEnv, `ng:///${decl.type.name}/ɵinj.js`, decl);
}
/**
 * Compiles a partial NgModule declaration object into a full NgModule definition object.
 *
 * @codeGenApi
 */
function ɵɵngDeclareNgModule(decl) {
    const compiler = (0, compiler_facade_1.getCompilerFacade)({
        usage: 1 /* JitCompilerUsage.PartialDeclaration */,
        kind: 'NgModule',
        type: decl.type,
    });
    return compiler.compileNgModuleDeclaration(environment_1.angularCoreEnv, `ng:///${decl.type.name}/ɵmod.js`, decl);
}
/**
 * Compiles a partial pipe declaration object into a full pipe definition object.
 *
 * @codeGenApi
 */
function ɵɵngDeclarePipe(decl) {
    const compiler = (0, compiler_facade_1.getCompilerFacade)({
        usage: 1 /* JitCompilerUsage.PartialDeclaration */,
        kind: 'pipe',
        type: decl.type,
    });
    return compiler.compilePipeDeclaration(environment_1.angularCoreEnv, `ng:///${decl.type.name}/ɵpipe.js`, decl);
}
