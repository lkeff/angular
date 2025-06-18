"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileDirectiveFromMetadata = compileDirectiveFromMetadata;
exports.compileComponentFromMetadata = compileComponentFromMetadata;
exports.createComponentType = createComponentType;
exports.createDirectiveType = createDirectiveType;
exports.parseHostBindings = parseHostBindings;
exports.verifyHostBindings = verifyHostBindings;
exports.encapsulateStyle = encapsulateStyle;
exports.createHostDirectivesMappingArray = createHostDirectivesMappingArray;
exports.compileDeferResolverFunction = compileDeferResolverFunction;
const core = __importStar(require("../../core"));
const o = __importStar(require("../../output/output_ast"));
const directive_matching_1 = require("../../directive_matching");
const shadow_css_1 = require("../../shadow_css");
const compilation_1 = require("../../template/pipeline/src/compilation");
const emit_1 = require("../../template/pipeline/src/emit");
const ingest_1 = require("../../template/pipeline/src/ingest");
const r3_identifiers_1 = require("../r3_identifiers");
const util_1 = require("../util");
const config_1 = require("./config");
const query_generation_1 = require("./query_generation");
const template_1 = require("./template");
const util_2 = require("./util");
const COMPONENT_VARIABLE = '%COMP%';
const HOST_ATTR = `_nghost-${COMPONENT_VARIABLE}`;
const CONTENT_ATTR = `_ngcontent-${COMPONENT_VARIABLE}`;
function baseDirectiveFields(meta, constantPool, bindingParser) {
    const definitionMap = new util_2.DefinitionMap();
    const selectors = core.parseSelectorToR3Selector(meta.selector);
    // e.g. `type: MyDirective`
    definitionMap.set('type', meta.type.value);
    // e.g. `selectors: [['', 'someDir', '']]`
    if (selectors.length > 0) {
        definitionMap.set('selectors', (0, util_2.asLiteral)(selectors));
    }
    if (meta.queries.length > 0) {
        // e.g. `contentQueries: (rf, ctx, dirIndex) => { ... }
        definitionMap.set('contentQueries', (0, query_generation_1.createContentQueriesFunction)(meta.queries, constantPool, meta.name));
    }
    if (meta.viewQueries.length) {
        definitionMap.set('viewQuery', (0, query_generation_1.createViewQueriesFunction)(meta.viewQueries, constantPool, meta.name));
    }
    // e.g. `hostBindings: (rf, ctx) => { ... }
    definitionMap.set('hostBindings', createHostBindingsFunction(meta.host, meta.typeSourceSpan, bindingParser, constantPool, meta.selector || '', meta.name, definitionMap));
    // e.g 'inputs: {a: 'a'}`
    definitionMap.set('inputs', (0, util_2.conditionallyCreateDirectiveBindingLiteral)(meta.inputs, true));
    // e.g 'outputs: {a: 'a'}`
    definitionMap.set('outputs', (0, util_2.conditionallyCreateDirectiveBindingLiteral)(meta.outputs));
    if (meta.exportAs !== null) {
        definitionMap.set('exportAs', o.literalArr(meta.exportAs.map((e) => o.literal(e))));
    }
    if (meta.isStandalone === false) {
        definitionMap.set('standalone', o.literal(false));
    }
    if (meta.isSignal) {
        definitionMap.set('signals', o.literal(true));
    }
    return definitionMap;
}
/**
 * Add features to the definition map.
 */
function addFeatures(definitionMap, meta) {
    var _a, _b;
    // e.g. `features: [NgOnChangesFeature]`
    const features = [];
    const providers = meta.providers;
    const viewProviders = meta.viewProviders;
    if (providers || viewProviders) {
        const args = [providers || new o.LiteralArrayExpr([])];
        if (viewProviders) {
            args.push(viewProviders);
        }
        features.push(o.importExpr(r3_identifiers_1.Identifiers.ProvidersFeature).callFn(args));
    }
    // Note: host directives feature needs to be inserted before the
    // inheritance feature to ensure the correct execution order.
    if ((_a = meta.hostDirectives) === null || _a === void 0 ? void 0 : _a.length) {
        features.push(o
            .importExpr(r3_identifiers_1.Identifiers.HostDirectivesFeature)
            .callFn([createHostDirectivesFeatureArg(meta.hostDirectives)]));
    }
    if (meta.usesInheritance) {
        features.push(o.importExpr(r3_identifiers_1.Identifiers.InheritDefinitionFeature));
    }
    if (meta.fullInheritance) {
        features.push(o.importExpr(r3_identifiers_1.Identifiers.CopyDefinitionFeature));
    }
    if (meta.lifecycle.usesOnChanges) {
        features.push(o.importExpr(r3_identifiers_1.Identifiers.NgOnChangesFeature));
    }
    if ('externalStyles' in meta && ((_b = meta.externalStyles) === null || _b === void 0 ? void 0 : _b.length)) {
        const externalStyleNodes = meta.externalStyles.map((externalStyle) => o.literal(externalStyle));
        features.push(o.importExpr(r3_identifiers_1.Identifiers.ExternalStylesFeature).callFn([o.literalArr(externalStyleNodes)]));
    }
    if (features.length) {
        definitionMap.set('features', o.literalArr(features));
    }
}
/**
 * Compile a directive for the render3 runtime as defined by the `R3DirectiveMetadata`.
 */
function compileDirectiveFromMetadata(meta, constantPool, bindingParser) {
    const definitionMap = baseDirectiveFields(meta, constantPool, bindingParser);
    addFeatures(definitionMap, meta);
    const expression = o
        .importExpr(r3_identifiers_1.Identifiers.defineDirective)
        .callFn([definitionMap.toLiteralMap()], undefined, true);
    const type = createDirectiveType(meta);
    return { expression, type, statements: [] };
}
/**
 * Compile a component for the render3 runtime as defined by the `R3ComponentMetadata`.
 */
function compileComponentFromMetadata(meta, constantPool, bindingParser) {
    var _a;
    const definitionMap = baseDirectiveFields(meta, constantPool, bindingParser);
    addFeatures(definitionMap, meta);
    const selector = meta.selector && directive_matching_1.CssSelector.parse(meta.selector);
    const firstSelector = selector && selector[0];
    // e.g. `attr: ["class", ".my.app"]`
    // This is optional an only included if the first selector of a component specifies attributes.
    if (firstSelector) {
        const selectorAttributes = firstSelector.getAttrs();
        if (selectorAttributes.length) {
            definitionMap.set('attrs', constantPool.getConstLiteral(o.literalArr(selectorAttributes.map((value) => value != null ? o.literal(value) : o.literal(undefined))), 
            /* forceShared */ true));
        }
    }
    // e.g. `template: function MyComponent_Template(_ctx, _cm) {...}`
    const templateTypeName = meta.name;
    let allDeferrableDepsFn = null;
    if (meta.defer.mode === 1 /* DeferBlockDepsEmitMode.PerComponent */ &&
        meta.defer.dependenciesFn !== null) {
        const fnName = `${templateTypeName}_DeferFn`;
        constantPool.statements.push(new o.DeclareVarStmt(fnName, meta.defer.dependenciesFn, undefined, o.StmtModifier.Final));
        allDeferrableDepsFn = o.variable(fnName);
    }
    // First the template is ingested into IR:
    const tpl = (0, ingest_1.ingestComponent)(meta.name, meta.template.nodes, constantPool, meta.relativeContextFilePath, meta.i18nUseExternalIds, meta.defer, allDeferrableDepsFn, meta.relativeTemplatePath, (0, config_1.getTemplateSourceLocationsEnabled)());
    // Then the IR is transformed to prepare it for cod egeneration.
    (0, emit_1.transform)(tpl, compilation_1.CompilationJobKind.Tmpl);
    // Finally we emit the template function:
    const templateFn = (0, emit_1.emitTemplateFn)(tpl, constantPool);
    if (tpl.contentSelectors !== null) {
        definitionMap.set('ngContentSelectors', tpl.contentSelectors);
    }
    definitionMap.set('decls', o.literal(tpl.root.decls));
    definitionMap.set('vars', o.literal(tpl.root.vars));
    if (tpl.consts.length > 0) {
        if (tpl.constsInitializers.length > 0) {
            definitionMap.set('consts', o.arrowFn([], [...tpl.constsInitializers, new o.ReturnStatement(o.literalArr(tpl.consts))]));
        }
        else {
            definitionMap.set('consts', o.literalArr(tpl.consts));
        }
    }
    definitionMap.set('template', templateFn);
    if (meta.declarationListEmitMode !== 3 /* DeclarationListEmitMode.RuntimeResolved */ &&
        meta.declarations.length > 0) {
        definitionMap.set('dependencies', compileDeclarationList(o.literalArr(meta.declarations.map((decl) => decl.type)), meta.declarationListEmitMode));
    }
    else if (meta.declarationListEmitMode === 3 /* DeclarationListEmitMode.RuntimeResolved */) {
        const args = [meta.type.value];
        if (meta.rawImports) {
            args.push(meta.rawImports);
        }
        definitionMap.set('dependencies', o.importExpr(r3_identifiers_1.Identifiers.getComponentDepsFactory).callFn(args));
    }
    if (meta.encapsulation === null) {
        meta.encapsulation = core.ViewEncapsulation.Emulated;
    }
    let hasStyles = !!((_a = meta.externalStyles) === null || _a === void 0 ? void 0 : _a.length);
    // e.g. `styles: [str1, str2]`
    if (meta.styles && meta.styles.length) {
        const styleValues = meta.encapsulation == core.ViewEncapsulation.Emulated
            ? compileStyles(meta.styles, CONTENT_ATTR, HOST_ATTR)
            : meta.styles;
        const styleNodes = styleValues.reduce((result, style) => {
            if (style.trim().length > 0) {
                result.push(constantPool.getConstLiteral(o.literal(style)));
            }
            return result;
        }, []);
        if (styleNodes.length > 0) {
            hasStyles = true;
            definitionMap.set('styles', o.literalArr(styleNodes));
        }
    }
    if (!hasStyles && meta.encapsulation === core.ViewEncapsulation.Emulated) {
        // If there is no style, don't generate css selectors on elements
        meta.encapsulation = core.ViewEncapsulation.None;
    }
    // Only set view encapsulation if it's not the default value
    if (meta.encapsulation !== core.ViewEncapsulation.Emulated) {
        definitionMap.set('encapsulation', o.literal(meta.encapsulation));
    }
    // e.g. `animation: [trigger('123', [])]`
    if (meta.animations !== null) {
        definitionMap.set('data', o.literalMap([{ key: 'animation', value: meta.animations, quoted: false }]));
    }
    // Setting change detection flag
    if (meta.changeDetection !== null) {
        if (typeof meta.changeDetection === 'number' &&
            meta.changeDetection !== core.ChangeDetectionStrategy.Default) {
            // changeDetection is resolved during analysis. Only set it if not the default.
            definitionMap.set('changeDetection', o.literal(meta.changeDetection));
        }
        else if (typeof meta.changeDetection === 'object') {
            // changeDetection is not resolved during analysis (e.g., we are in local compilation mode).
            // So place it as is.
            definitionMap.set('changeDetection', meta.changeDetection);
        }
    }
    const expression = o
        .importExpr(r3_identifiers_1.Identifiers.defineComponent)
        .callFn([definitionMap.toLiteralMap()], undefined, true);
    const type = createComponentType(meta);
    return { expression, type, statements: [] };
}
/**
 * Creates the type specification from the component meta. This type is inserted into .d.ts files
 * to be consumed by upstream compilations.
 */
function createComponentType(meta) {
    const typeParams = createBaseDirectiveTypeParams(meta);
    typeParams.push(stringArrayAsType(meta.template.ngContentSelectors));
    typeParams.push(o.expressionType(o.literal(meta.isStandalone)));
    typeParams.push(createHostDirectivesType(meta));
    // TODO(signals): Always include this metadata starting with v17. Right
    // now Angular v16.0.x does not support this field and library distributions
    // would then be incompatible with v16.0.x framework users.
    if (meta.isSignal) {
        typeParams.push(o.expressionType(o.literal(meta.isSignal)));
    }
    return o.expressionType(o.importExpr(r3_identifiers_1.Identifiers.ComponentDeclaration, typeParams));
}
/**
 * Compiles the array literal of declarations into an expression according to the provided emit
 * mode.
 */
function compileDeclarationList(list, mode) {
    switch (mode) {
        case 0 /* DeclarationListEmitMode.Direct */:
            // directives: [MyDir],
            return list;
        case 1 /* DeclarationListEmitMode.Closure */:
            // directives: function () { return [MyDir]; }
            return o.arrowFn([], list);
        case 2 /* DeclarationListEmitMode.ClosureResolved */:
            // directives: function () { return [MyDir].map(ng.resolveForwardRef); }
            const resolvedList = list.prop('map').callFn([o.importExpr(r3_identifiers_1.Identifiers.resolveForwardRef)]);
            return o.arrowFn([], resolvedList);
        case 3 /* DeclarationListEmitMode.RuntimeResolved */:
            throw new Error(`Unsupported with an array of pre-resolved dependencies`);
    }
}
function stringAsType(str) {
    return o.expressionType(o.literal(str));
}
function stringMapAsLiteralExpression(map) {
    const mapValues = Object.keys(map).map((key) => {
        const value = Array.isArray(map[key]) ? map[key][0] : map[key];
        return {
            key,
            value: o.literal(value),
            quoted: true,
        };
    });
    return o.literalMap(mapValues);
}
function stringArrayAsType(arr) {
    return arr.length > 0
        ? o.expressionType(o.literalArr(arr.map((value) => o.literal(value))))
        : o.NONE_TYPE;
}
function createBaseDirectiveTypeParams(meta) {
    // On the type side, remove newlines from the selector as it will need to fit into a TypeScript
    // string literal, which must be on one line.
    const selectorForType = meta.selector !== null ? meta.selector.replace(/\n/g, '') : null;
    return [
        (0, util_1.typeWithParameters)(meta.type.type, meta.typeArgumentCount),
        selectorForType !== null ? stringAsType(selectorForType) : o.NONE_TYPE,
        meta.exportAs !== null ? stringArrayAsType(meta.exportAs) : o.NONE_TYPE,
        o.expressionType(getInputsTypeExpression(meta)),
        o.expressionType(stringMapAsLiteralExpression(meta.outputs)),
        stringArrayAsType(meta.queries.map((q) => q.propertyName)),
    ];
}
function getInputsTypeExpression(meta) {
    return o.literalMap(Object.keys(meta.inputs).map((key) => {
        const value = meta.inputs[key];
        const values = [
            { key: 'alias', value: o.literal(value.bindingPropertyName), quoted: true },
            { key: 'required', value: o.literal(value.required), quoted: true },
        ];
        // TODO(legacy-partial-output-inputs): Consider always emitting this information,
        // or leaving it as is.
        if (value.isSignal) {
            values.push({ key: 'isSignal', value: o.literal(value.isSignal), quoted: true });
        }
        return { key, value: o.literalMap(values), quoted: true };
    }));
}
/**
 * Creates the type specification from the directive meta. This type is inserted into .d.ts files
 * to be consumed by upstream compilations.
 */
function createDirectiveType(meta) {
    const typeParams = createBaseDirectiveTypeParams(meta);
    // Directives have no NgContentSelectors slot, but instead express a `never` type
    // so that future fields align.
    typeParams.push(o.NONE_TYPE);
    typeParams.push(o.expressionType(o.literal(meta.isStandalone)));
    typeParams.push(createHostDirectivesType(meta));
    // TODO(signals): Always include this metadata starting with v17. Right
    // now Angular v16.0.x does not support this field and library distributions
    // would then be incompatible with v16.0.x framework users.
    if (meta.isSignal) {
        typeParams.push(o.expressionType(o.literal(meta.isSignal)));
    }
    return o.expressionType(o.importExpr(r3_identifiers_1.Identifiers.DirectiveDeclaration, typeParams));
}
// Return a host binding function or null if one is not necessary.
function createHostBindingsFunction(hostBindingsMetadata, typeSourceSpan, bindingParser, constantPool, selector, name, definitionMap) {
    const bindings = bindingParser.createBoundHostProperties(hostBindingsMetadata.properties, typeSourceSpan);
    // Calculate host event bindings
    const eventBindings = bindingParser.createDirectiveHostEventAsts(hostBindingsMetadata.listeners, typeSourceSpan);
    // The parser for host bindings treats class and style attributes specially -- they are
    // extracted into these separate fields. This is not the case for templates, so the compiler can
    // actually already handle these special attributes internally. Therefore, we just drop them
    // into the attributes map.
    if (hostBindingsMetadata.specialAttributes.styleAttr) {
        hostBindingsMetadata.attributes['style'] = o.literal(hostBindingsMetadata.specialAttributes.styleAttr);
    }
    if (hostBindingsMetadata.specialAttributes.classAttr) {
        hostBindingsMetadata.attributes['class'] = o.literal(hostBindingsMetadata.specialAttributes.classAttr);
    }
    const hostJob = (0, ingest_1.ingestHostBinding)({
        componentName: name,
        componentSelector: selector,
        properties: bindings,
        events: eventBindings,
        attributes: hostBindingsMetadata.attributes,
    }, bindingParser, constantPool);
    (0, emit_1.transform)(hostJob, compilation_1.CompilationJobKind.Host);
    definitionMap.set('hostAttrs', hostJob.root.attributes);
    const varCount = hostJob.root.vars;
    if (varCount !== null && varCount > 0) {
        definitionMap.set('hostVars', o.literal(varCount));
    }
    return (0, emit_1.emitHostBindingFunction)(hostJob);
}
const HOST_REG_EXP = /^(?:\[([^\]]+)\])|(?:\(([^\)]+)\))$/;
function parseHostBindings(host) {
    const attributes = {};
    const listeners = {};
    const properties = {};
    const specialAttributes = {};
    for (const key of Object.keys(host)) {
        const value = host[key];
        const matches = key.match(HOST_REG_EXP);
        if (matches === null) {
            switch (key) {
                case 'class':
                    if (typeof value !== 'string') {
                        // TODO(alxhub): make this a diagnostic.
                        throw new Error(`Class binding must be string`);
                    }
                    specialAttributes.classAttr = value;
                    break;
                case 'style':
                    if (typeof value !== 'string') {
                        // TODO(alxhub): make this a diagnostic.
                        throw new Error(`Style binding must be string`);
                    }
                    specialAttributes.styleAttr = value;
                    break;
                default:
                    if (typeof value === 'string') {
                        attributes[key] = o.literal(value);
                    }
                    else {
                        attributes[key] = value;
                    }
            }
        }
        else if (matches[1 /* HostBindingGroup.Binding */] != null) {
            if (typeof value !== 'string') {
                // TODO(alxhub): make this a diagnostic.
                throw new Error(`Property binding must be string`);
            }
            // synthetic properties (the ones that have a `@` as a prefix)
            // are still treated the same as regular properties. Therefore
            // there is no point in storing them in a separate map.
            properties[matches[1 /* HostBindingGroup.Binding */]] = value;
        }
        else if (matches[2 /* HostBindingGroup.Event */] != null) {
            if (typeof value !== 'string') {
                // TODO(alxhub): make this a diagnostic.
                throw new Error(`Event binding must be string`);
            }
            listeners[matches[2 /* HostBindingGroup.Event */]] = value;
        }
    }
    return { attributes, listeners, properties, specialAttributes };
}
/**
 * Verifies host bindings and returns the list of errors (if any). Empty array indicates that a
 * given set of host bindings has no errors.
 *
 * @param bindings set of host bindings to verify.
 * @param sourceSpan source span where host bindings were defined.
 * @returns array of errors associated with a given set of host bindings.
 */
function verifyHostBindings(bindings, sourceSpan) {
    // TODO: abstract out host bindings verification logic and use it instead of
    // creating events and properties ASTs to detect errors (FW-996)
    const bindingParser = (0, template_1.makeBindingParser)();
    bindingParser.createDirectiveHostEventAsts(bindings.listeners, sourceSpan);
    bindingParser.createBoundHostProperties(bindings.properties, sourceSpan);
    return bindingParser.errors;
}
function compileStyles(styles, selector, hostSelector) {
    const shadowCss = new shadow_css_1.ShadowCss();
    return styles.map((style) => {
        return shadowCss.shimCssText(style, selector, hostSelector);
    });
}
/**
 * Encapsulates a CSS stylesheet with emulated view encapsulation.
 * This allows a stylesheet to be used with an Angular component that
 * is using the `ViewEncapsulation.Emulated` mode.
 *
 * @param style The content of a CSS stylesheet.
 * @param componentIdentifier The identifier to use within the CSS rules.
 * @returns The encapsulated content for the style.
 */
function encapsulateStyle(style, componentIdentifier) {
    const shadowCss = new shadow_css_1.ShadowCss();
    const selector = componentIdentifier
        ? CONTENT_ATTR.replace(COMPONENT_VARIABLE, componentIdentifier)
        : CONTENT_ATTR;
    const hostSelector = componentIdentifier
        ? HOST_ATTR.replace(COMPONENT_VARIABLE, componentIdentifier)
        : HOST_ATTR;
    return shadowCss.shimCssText(style, selector, hostSelector);
}
function createHostDirectivesType(meta) {
    var _a;
    if (!((_a = meta.hostDirectives) === null || _a === void 0 ? void 0 : _a.length)) {
        return o.NONE_TYPE;
    }
    return o.expressionType(o.literalArr(meta.hostDirectives.map((hostMeta) => o.literalMap([
        { key: 'directive', value: o.typeofExpr(hostMeta.directive.type), quoted: false },
        {
            key: 'inputs',
            value: stringMapAsLiteralExpression(hostMeta.inputs || {}),
            quoted: false,
        },
        {
            key: 'outputs',
            value: stringMapAsLiteralExpression(hostMeta.outputs || {}),
            quoted: false,
        },
    ]))));
}
function createHostDirectivesFeatureArg(hostDirectives) {
    const expressions = [];
    let hasForwardRef = false;
    for (const current of hostDirectives) {
        // Use a shorthand if there are no inputs or outputs.
        if (!current.inputs && !current.outputs) {
            expressions.push(current.directive.type);
        }
        else {
            const keys = [{ key: 'directive', value: current.directive.type, quoted: false }];
            if (current.inputs) {
                const inputsLiteral = createHostDirectivesMappingArray(current.inputs);
                if (inputsLiteral) {
                    keys.push({ key: 'inputs', value: inputsLiteral, quoted: false });
                }
            }
            if (current.outputs) {
                const outputsLiteral = createHostDirectivesMappingArray(current.outputs);
                if (outputsLiteral) {
                    keys.push({ key: 'outputs', value: outputsLiteral, quoted: false });
                }
            }
            expressions.push(o.literalMap(keys));
        }
        if (current.isForwardReference) {
            hasForwardRef = true;
        }
    }
    // If there's a forward reference, we generate a `function() { return [HostDir] }`,
    // otherwise we can save some bytes by using a plain array, e.g. `[HostDir]`.
    return hasForwardRef
        ? new o.FunctionExpr([], [new o.ReturnStatement(o.literalArr(expressions))])
        : o.literalArr(expressions);
}
/**
 * Converts an input/output mapping object literal into an array where the even keys are the
 * public name of the binding and the odd ones are the name it was aliased to. E.g.
 * `{inputOne: 'aliasOne', inputTwo: 'aliasTwo'}` will become
 * `['inputOne', 'aliasOne', 'inputTwo', 'aliasTwo']`.
 *
 * This conversion is necessary, because hosts bind to the public name of the host directive and
 * keeping the mapping in an object literal will break for apps using property renaming.
 */
function createHostDirectivesMappingArray(mapping) {
    const elements = [];
    for (const publicName in mapping) {
        if (mapping.hasOwnProperty(publicName)) {
            elements.push(o.literal(publicName), o.literal(mapping[publicName]));
        }
    }
    return elements.length > 0 ? o.literalArr(elements) : null;
}
/**
 * Compiles the dependency resolver function for a defer block.
 */
function compileDeferResolverFunction(meta) {
    const depExpressions = [];
    if (meta.mode === 0 /* DeferBlockDepsEmitMode.PerBlock */) {
        for (const dep of meta.dependencies) {
            if (dep.isDeferrable) {
                // Callback function, e.g. `m () => m.MyCmp;`.
                const innerFn = o.arrowFn(
                // Default imports are always accessed through the `default` property.
                [new o.FnParam('m', o.DYNAMIC_TYPE)], o.variable('m').prop(dep.isDefaultImport ? 'default' : dep.symbolName));
                // Dynamic import, e.g. `import('./a').then(...)`.
                const importExpr = new o.DynamicImportExpr(dep.importPath).prop('then').callFn([innerFn]);
                depExpressions.push(importExpr);
            }
            else {
                // Non-deferrable symbol, just use a reference to the type. Note that it's important to
                // go through `typeReference`, rather than `symbolName` in order to preserve the
                // original reference within the source file.
                depExpressions.push(dep.typeReference);
            }
        }
    }
    else {
        for (const { symbolName, importPath, isDefaultImport } of meta.dependencies) {
            // Callback function, e.g. `m () => m.MyCmp;`.
            const innerFn = o.arrowFn([new o.FnParam('m', o.DYNAMIC_TYPE)], o.variable('m').prop(isDefaultImport ? 'default' : symbolName));
            // Dynamic import, e.g. `import('./a').then(...)`.
            const importExpr = new o.DynamicImportExpr(importPath).prop('then').callFn([innerFn]);
            depExpressions.push(importExpr);
        }
    }
    return o.arrowFn([], o.literalArr(depExpressions));
}
