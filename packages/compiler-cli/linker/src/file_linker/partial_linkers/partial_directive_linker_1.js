"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialDirectiveLinkerVersion1 = void 0;
exports.toR3DirectiveMeta = toR3DirectiveMeta;
exports.createSourceSpan = createSourceSpan;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const compiler_1 = require("@angular/compiler");
const fatal_linker_error_1 = require("../../fatal_linker_error");
const util_1 = require("./util");
/**
 * A `PartialLinker` that is designed to process `ɵɵngDeclareDirective()` call expressions.
 */
class PartialDirectiveLinkerVersion1 {
    constructor(sourceUrl, code) {
        this.sourceUrl = sourceUrl;
        this.code = code;
    }
    linkPartialDeclaration(constantPool, metaObj, version) {
        const meta = toR3DirectiveMeta(metaObj, this.code, this.sourceUrl, version);
        return (0, compiler_1.compileDirectiveFromMetadata)(meta, constantPool, (0, compiler_1.makeBindingParser)());
    }
}
exports.PartialDirectiveLinkerVersion1 = PartialDirectiveLinkerVersion1;
/**
 * Derives the `R3DirectiveMetadata` structure from the AST object.
 */
function toR3DirectiveMeta(metaObj, code, sourceUrl, version) {
    const typeExpr = metaObj.getValue('type');
    const typeName = typeExpr.getSymbolName();
    if (typeName === null) {
        throw new fatal_linker_error_1.FatalLinkerError(typeExpr.expression, 'Unsupported type, its name could not be determined');
    }
    return {
        typeSourceSpan: createSourceSpan(typeExpr.getRange(), code, sourceUrl),
        type: (0, util_1.wrapReference)(typeExpr.getOpaque()),
        typeArgumentCount: 0,
        deps: null,
        host: toHostMetadata(metaObj),
        inputs: metaObj.has('inputs') ? metaObj.getObject('inputs').toLiteral(toInputMapping) : {},
        outputs: metaObj.has('outputs')
            ? metaObj.getObject('outputs').toLiteral((value) => value.getString())
            : {},
        queries: metaObj.has('queries')
            ? metaObj.getArray('queries').map((entry) => toQueryMetadata(entry.getObject()))
            : [],
        viewQueries: metaObj.has('viewQueries')
            ? metaObj.getArray('viewQueries').map((entry) => toQueryMetadata(entry.getObject()))
            : [],
        providers: metaObj.has('providers') ? metaObj.getOpaque('providers') : null,
        fullInheritance: false,
        selector: metaObj.has('selector') ? metaObj.getString('selector') : null,
        exportAs: metaObj.has('exportAs')
            ? metaObj.getArray('exportAs').map((entry) => entry.getString())
            : null,
        lifecycle: {
            usesOnChanges: metaObj.has('usesOnChanges') ? metaObj.getBoolean('usesOnChanges') : false,
        },
        name: typeName,
        usesInheritance: metaObj.has('usesInheritance') ? metaObj.getBoolean('usesInheritance') : false,
        isStandalone: metaObj.has('isStandalone')
            ? metaObj.getBoolean('isStandalone')
            : (0, util_1.getDefaultStandaloneValue)(version),
        isSignal: metaObj.has('isSignal') ? metaObj.getBoolean('isSignal') : false,
        hostDirectives: metaObj.has('hostDirectives')
            ? toHostDirectivesMetadata(metaObj.getValue('hostDirectives'))
            : null,
    };
}
/**
 * Decodes the AST value for a single input to its representation as used in the metadata.
 */
function toInputMapping(value, key) {
    if (value.isObject()) {
        const obj = value.getObject();
        const transformValue = obj.getValue('transformFunction');
        return {
            classPropertyName: obj.getString('classPropertyName'),
            bindingPropertyName: obj.getString('publicName'),
            isSignal: obj.getBoolean('isSignal'),
            required: obj.getBoolean('isRequired'),
            transformFunction: transformValue.isNull() ? null : transformValue.getOpaque(),
        };
    }
    return parseLegacyInputPartialOutput(key, value);
}
/**
 * Parses the legacy partial output for inputs.
 *
 * More details, see: `legacyInputsPartialMetadata` in `partial/directive.ts`.
 * TODO(legacy-partial-output-inputs): Remove function in v18.
 */
function parseLegacyInputPartialOutput(key, value) {
    if (value.isString()) {
        return {
            bindingPropertyName: value.getString(),
            classPropertyName: key,
            required: false,
            transformFunction: null,
            isSignal: false,
        };
    }
    const values = value.getArray();
    if (values.length !== 2 && values.length !== 3) {
        throw new fatal_linker_error_1.FatalLinkerError(value.expression, 'Unsupported input, expected a string or an array containing two strings and an optional function');
    }
    return {
        bindingPropertyName: values[0].getString(),
        classPropertyName: values[1].getString(),
        transformFunction: values.length > 2 ? values[2].getOpaque() : null,
        required: false,
        isSignal: false,
    };
}
/**
 * Extracts the host metadata configuration from the AST metadata object.
 */
function toHostMetadata(metaObj) {
    if (!metaObj.has('host')) {
        return {
            attributes: {},
            listeners: {},
            properties: {},
            specialAttributes: {},
        };
    }
    const host = metaObj.getObject('host');
    const specialAttributes = {};
    if (host.has('styleAttribute')) {
        specialAttributes.styleAttr = host.getString('styleAttribute');
    }
    if (host.has('classAttribute')) {
        specialAttributes.classAttr = host.getString('classAttribute');
    }
    return {
        attributes: host.has('attributes')
            ? host.getObject('attributes').toLiteral((value) => value.getOpaque())
            : {},
        listeners: host.has('listeners')
            ? host.getObject('listeners').toLiteral((value) => value.getString())
            : {},
        properties: host.has('properties')
            ? host.getObject('properties').toLiteral((value) => value.getString())
            : {},
        specialAttributes,
    };
}
/**
 * Extracts the metadata for a single query from an AST object.
 */
function toQueryMetadata(obj) {
    let predicate;
    const predicateExpr = obj.getValue('predicate');
    if (predicateExpr.isArray()) {
        predicate = predicateExpr.getArray().map((entry) => entry.getString());
    }
    else {
        predicate = (0, util_1.extractForwardRef)(predicateExpr);
    }
    return {
        propertyName: obj.getString('propertyName'),
        first: obj.has('first') ? obj.getBoolean('first') : false,
        predicate,
        descendants: obj.has('descendants') ? obj.getBoolean('descendants') : false,
        emitDistinctChangesOnly: obj.has('emitDistinctChangesOnly')
            ? obj.getBoolean('emitDistinctChangesOnly')
            : true,
        read: obj.has('read') ? obj.getOpaque('read') : null,
        static: obj.has('static') ? obj.getBoolean('static') : false,
        isSignal: obj.has('isSignal') ? obj.getBoolean('isSignal') : false,
    };
}
/**
 * Derives the host directives structure from the AST object.
 */
function toHostDirectivesMetadata(hostDirectives) {
    return hostDirectives.getArray().map((hostDirective) => {
        const hostObject = hostDirective.getObject();
        const type = (0, util_1.extractForwardRef)(hostObject.getValue('directive'));
        const meta = {
            directive: (0, util_1.wrapReference)(type.expression),
            isForwardReference: type.forwardRef !== compiler_1.ForwardRefHandling.None,
            inputs: hostObject.has('inputs')
                ? getHostDirectiveBindingMapping(hostObject.getArray('inputs'))
                : null,
            outputs: hostObject.has('outputs')
                ? getHostDirectiveBindingMapping(hostObject.getArray('outputs'))
                : null,
        };
        return meta;
    });
}
function getHostDirectiveBindingMapping(array) {
    let result = null;
    for (let i = 1; i < array.length; i += 2) {
        result = result || {};
        result[array[i - 1].getString()] = array[i].getString();
    }
    return result;
}
function createSourceSpan(range, code, sourceUrl) {
    const sourceFile = new compiler_1.ParseSourceFile(code, sourceUrl);
    const startLocation = new compiler_1.ParseLocation(sourceFile, range.startPos, range.startLine, range.startCol);
    return new compiler_1.ParseSourceSpan(startLocation, startLocation.moveBy(range.endPos - range.startPos));
}
