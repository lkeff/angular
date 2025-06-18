"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompoundMetadataReader = void 0;
exports.extractReferencesFromType = extractReferencesFromType;
exports.extraReferenceFromTypeQuery = extraReferenceFromTypeQuery;
exports.readBooleanType = readBooleanType;
exports.readStringType = readStringType;
exports.readMapType = readMapType;
exports.readStringArrayType = readStringArrayType;
exports.extractDirectiveTypeCheckMeta = extractDirectiveTypeCheckMeta;
exports.hasInjectableFields = hasInjectableFields;
exports.isHostDirectiveMetaForGlobalMode = isHostDirectiveMetaForGlobalMode;
const typescript_1 = __importDefault(require("typescript"));
const imports_1 = require("../../imports");
const reflection_1 = require("../../reflection");
const typescript_2 = require("../../util/src/typescript");
const typescript_3 = require("../../reflection/src/typescript");
function extractReferencesFromType(checker, def, bestGuessOwningModule) {
    if (!typescript_1.default.isTupleTypeNode(def)) {
        return { result: [], isIncomplete: false };
    }
    const result = [];
    let isIncomplete = false;
    for (const element of def.elements) {
        if (!typescript_1.default.isTypeQueryNode(element)) {
            throw new Error(`Expected TypeQueryNode: ${(0, typescript_2.nodeDebugInfo)(element)}`);
        }
        const ref = extraReferenceFromTypeQuery(checker, element, def, bestGuessOwningModule);
        // Note: Sometimes a reference inside the type tuple/array
        // may not be resolvable/existent. We proceed with incomplete data.
        if (ref === null) {
            isIncomplete = true;
        }
        else {
            result.push(ref);
        }
    }
    return { result, isIncomplete };
}
function extraReferenceFromTypeQuery(checker, typeNode, origin, bestGuessOwningModule) {
    const type = typeNode.exprName;
    let node;
    let from;
    // Gracefully handle when the type entity could not be converted or
    // resolved to its declaration node.
    try {
        const result = (0, reflection_1.reflectTypeEntityToDeclaration)(type, checker);
        node = result.node;
        from = result.from;
    }
    catch (e) {
        if (e instanceof typescript_3.TypeEntityToDeclarationError) {
            return null;
        }
        throw e;
    }
    if (!(0, reflection_1.isNamedClassDeclaration)(node)) {
        throw new Error(`Expected named ClassDeclaration: ${(0, typescript_2.nodeDebugInfo)(node)}`);
    }
    if (from !== null && !from.startsWith('.')) {
        // The symbol was imported using an absolute module specifier so return a reference that
        // uses that absolute module specifier as its best guess owning module.
        return new imports_1.Reference(node, {
            specifier: from,
            resolutionContext: origin.getSourceFile().fileName,
        });
    }
    // For local symbols or symbols that were imported using a relative module import it is
    // assumed that the symbol is exported from the provided best guess owning module.
    return new imports_1.Reference(node, bestGuessOwningModule);
}
function readBooleanType(type) {
    if (!typescript_1.default.isLiteralTypeNode(type)) {
        return null;
    }
    switch (type.literal.kind) {
        case typescript_1.default.SyntaxKind.TrueKeyword:
            return true;
        case typescript_1.default.SyntaxKind.FalseKeyword:
            return false;
        default:
            return null;
    }
}
function readStringType(type) {
    if (!typescript_1.default.isLiteralTypeNode(type) || !typescript_1.default.isStringLiteral(type.literal)) {
        return null;
    }
    return type.literal.text;
}
function readMapType(type, valueTransform) {
    if (!typescript_1.default.isTypeLiteralNode(type)) {
        return {};
    }
    const obj = {};
    type.members.forEach((member) => {
        if (!typescript_1.default.isPropertySignature(member) ||
            member.type === undefined ||
            member.name === undefined ||
            (!typescript_1.default.isStringLiteral(member.name) && !typescript_1.default.isIdentifier(member.name))) {
            return;
        }
        const value = valueTransform(member.type);
        if (value !== null) {
            obj[member.name.text] = value;
        }
    });
    return obj;
}
function readStringArrayType(type) {
    if (!typescript_1.default.isTupleTypeNode(type)) {
        return [];
    }
    const res = [];
    type.elements.forEach((el) => {
        if (!typescript_1.default.isLiteralTypeNode(el) || !typescript_1.default.isStringLiteral(el.literal)) {
            return;
        }
        res.push(el.literal.text);
    });
    return res;
}
/**
 * Inspects the class' members and extracts the metadata that is used when type-checking templates
 * that use the directive. This metadata does not contain information from a base class, if any,
 * making this metadata invariant to changes of inherited classes.
 */
function extractDirectiveTypeCheckMeta(node, inputs, reflector) {
    const members = reflector.getMembersOfClass(node);
    const staticMembers = members.filter((member) => member.isStatic);
    const ngTemplateGuards = staticMembers
        .map(extractTemplateGuard)
        .filter((guard) => guard !== null);
    const hasNgTemplateContextGuard = staticMembers.some((member) => member.kind === reflection_1.ClassMemberKind.Method && member.name === 'ngTemplateContextGuard');
    const coercedInputFields = new Set(staticMembers.map(extractCoercedInput).filter((inputName) => {
        var _a;
        // If the input refers to a signal input, we will not respect coercion members.
        // A transform function should be used instead.
        if (inputName === null || ((_a = inputs.getByClassPropertyName(inputName)) === null || _a === void 0 ? void 0 : _a.isSignal)) {
            return false;
        }
        return true;
    }));
    const restrictedInputFields = new Set();
    const stringLiteralInputFields = new Set();
    const undeclaredInputFields = new Set();
    for (const { classPropertyName, transform } of inputs) {
        const field = members.find((member) => member.name === classPropertyName);
        if (field === undefined || field.node === null) {
            undeclaredInputFields.add(classPropertyName);
            continue;
        }
        if (isRestricted(field.node)) {
            restrictedInputFields.add(classPropertyName);
        }
        if (field.nameNode !== null && typescript_1.default.isStringLiteral(field.nameNode)) {
            stringLiteralInputFields.add(classPropertyName);
        }
        if (transform !== null) {
            coercedInputFields.add(classPropertyName);
        }
    }
    const arity = reflector.getGenericArityOfClass(node);
    return {
        hasNgTemplateContextGuard,
        ngTemplateGuards,
        coercedInputFields,
        restrictedInputFields,
        stringLiteralInputFields,
        undeclaredInputFields,
        isGeneric: arity !== null && arity > 0,
    };
}
function isRestricted(node) {
    const modifiers = typescript_1.default.canHaveModifiers(node) ? typescript_1.default.getModifiers(node) : undefined;
    return (modifiers !== undefined &&
        modifiers.some(({ kind }) => {
            return (kind === typescript_1.default.SyntaxKind.PrivateKeyword ||
                kind === typescript_1.default.SyntaxKind.ProtectedKeyword ||
                kind === typescript_1.default.SyntaxKind.ReadonlyKeyword);
        }));
}
function extractTemplateGuard(member) {
    if (!member.name.startsWith('ngTemplateGuard_')) {
        return null;
    }
    const inputName = afterUnderscore(member.name);
    if (member.kind === reflection_1.ClassMemberKind.Property) {
        let type = null;
        if (member.type !== null &&
            typescript_1.default.isLiteralTypeNode(member.type) &&
            typescript_1.default.isStringLiteral(member.type.literal)) {
            type = member.type.literal.text;
        }
        // Only property members with string literal type 'binding' are considered as template guard.
        if (type !== 'binding') {
            return null;
        }
        return { inputName, type };
    }
    else if (member.kind === reflection_1.ClassMemberKind.Method) {
        return { inputName, type: 'invocation' };
    }
    else {
        return null;
    }
}
function extractCoercedInput(member) {
    if (member.kind !== reflection_1.ClassMemberKind.Property || !member.name.startsWith('ngAcceptInputType_')) {
        return null;
    }
    return afterUnderscore(member.name);
}
/**
 * A `MetadataReader` that reads from an ordered set of child readers until it obtains the requested
 * metadata.
 *
 * This is used to combine `MetadataReader`s that read from different sources (e.g. from a registry
 * and from .d.ts files).
 */
class CompoundMetadataReader {
    constructor(readers) {
        this.readers = readers;
    }
    getDirectiveMetadata(node) {
        for (const reader of this.readers) {
            const meta = reader.getDirectiveMetadata(node);
            if (meta !== null) {
                return meta;
            }
        }
        return null;
    }
    getNgModuleMetadata(node) {
        for (const reader of this.readers) {
            const meta = reader.getNgModuleMetadata(node);
            if (meta !== null) {
                return meta;
            }
        }
        return null;
    }
    getPipeMetadata(node) {
        for (const reader of this.readers) {
            const meta = reader.getPipeMetadata(node);
            if (meta !== null) {
                return meta;
            }
        }
        return null;
    }
}
exports.CompoundMetadataReader = CompoundMetadataReader;
function afterUnderscore(str) {
    const pos = str.indexOf('_');
    if (pos === -1) {
        throw new Error(`Expected '${str}' to contain '_'`);
    }
    return str.slice(pos + 1);
}
/** Returns whether a class declaration has the necessary class fields to make it injectable. */
function hasInjectableFields(clazz, host) {
    const members = host.getMembersOfClass(clazz);
    return members.some(({ isStatic, name }) => isStatic && (name === 'ɵprov' || name === 'ɵfac'));
}
function isHostDirectiveMetaForGlobalMode(hostDirectiveMeta) {
    return hostDirectiveMeta.directive instanceof imports_1.Reference;
}
