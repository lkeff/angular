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
exports.extractClass = extractClass;
exports.extractInterface = extractInterface;
const typescript_1 = __importDefault(require("typescript"));
const imports_1 = require("../../imports");
const entities_1 = require("./entities");
const filters_1 = require("./filters");
const function_extractor_1 = require("./function_extractor");
const generics_extractor_1 = require("./generics_extractor");
const internal_1 = require("./internal");
const jsdoc_extractor_1 = require("./jsdoc_extractor");
const type_extractor_1 = require("./type_extractor");
/** Extractor to pull info for API reference documentation for a TypeScript class or interface. */
class ClassExtractor {
    constructor(declaration, typeChecker) {
        this.declaration = declaration;
        this.typeChecker = typeChecker;
    }
    /** Extract docs info specific to classes. */
    extract() {
        return {
            name: this.declaration.name.text,
            isAbstract: this.isAbstract(),
            entryType: typescript_1.default.isInterfaceDeclaration(this.declaration)
                ? entities_1.EntryType.Interface
                : entities_1.EntryType.UndecoratedClass,
            members: this.extractSignatures().concat(this.extractAllClassMembers()),
            generics: (0, generics_extractor_1.extractGenerics)(this.declaration),
            description: (0, jsdoc_extractor_1.extractJsDocDescription)(this.declaration),
            jsdocTags: (0, jsdoc_extractor_1.extractJsDocTags)(this.declaration),
            rawComment: (0, jsdoc_extractor_1.extractRawJsDoc)(this.declaration),
            extends: this.extractInheritance(this.declaration),
            implements: this.extractInterfaceConformance(this.declaration),
        };
    }
    /** Extracts doc info for a class's members. */
    extractAllClassMembers() {
        const members = [];
        for (const member of this.getMemberDeclarations()) {
            if (this.isMemberExcluded(member))
                continue;
            const memberEntry = this.extractClassMember(member);
            if (memberEntry) {
                members.push(memberEntry);
            }
        }
        return members;
    }
    /** Extract docs for a class's members (methods and properties).  */
    extractClassMember(memberDeclaration) {
        if (this.isMethod(memberDeclaration)) {
            return this.extractMethod(memberDeclaration);
        }
        else if (this.isProperty(memberDeclaration) &&
            !this.hasPrivateComputedProperty(memberDeclaration)) {
            return this.extractClassProperty(memberDeclaration);
        }
        else if (typescript_1.default.isAccessor(memberDeclaration)) {
            return this.extractGetterSetter(memberDeclaration);
        }
        else if (typescript_1.default.isConstructorDeclaration(memberDeclaration) &&
            memberDeclaration.parameters.length > 0) {
            return this.extractConstructor(memberDeclaration);
        }
        // We only expect methods, properties, and accessors. If we encounter something else,
        // return undefined and let the rest of the program filter it out.
        return undefined;
    }
    /** Extract docs for all call signatures in the current class/interface. */
    extractSignatures() {
        return this.computeAllSignatureDeclarations().map((s) => this.extractSignature(s));
    }
    /** Extracts docs for a class method. */
    extractMethod(methodDeclaration) {
        const functionExtractor = new function_extractor_1.FunctionExtractor(methodDeclaration.name.getText(), methodDeclaration, this.typeChecker);
        return Object.assign(Object.assign({}, functionExtractor.extract()), { memberType: entities_1.MemberType.Method, memberTags: this.getMemberTags(methodDeclaration) });
    }
    /** Extracts docs for a signature element (usually inside an interface). */
    extractSignature(signature) {
        // No name for the function if we are dealing with call signatures.
        // For construct signatures we are using `new` as the name of the function for now.
        // TODO: Consider exposing a new entry type for signature types.
        const functionExtractor = new function_extractor_1.FunctionExtractor(typescript_1.default.isConstructSignatureDeclaration(signature) ? 'new' : '', signature, this.typeChecker);
        return Object.assign(Object.assign({}, functionExtractor.extract()), { memberType: entities_1.MemberType.Method, memberTags: [] });
    }
    /** Extracts doc info for a property declaration. */
    extractClassProperty(propertyDeclaration) {
        return {
            name: propertyDeclaration.name.getText(),
            type: (0, type_extractor_1.extractResolvedTypeString)(propertyDeclaration, this.typeChecker),
            memberType: entities_1.MemberType.Property,
            memberTags: this.getMemberTags(propertyDeclaration),
            description: (0, jsdoc_extractor_1.extractJsDocDescription)(propertyDeclaration),
            jsdocTags: (0, jsdoc_extractor_1.extractJsDocTags)(propertyDeclaration),
        };
    }
    /** Extracts doc info for an accessor member (getter/setter). */
    extractGetterSetter(accessor) {
        return Object.assign(Object.assign({}, this.extractClassProperty(accessor)), { memberType: typescript_1.default.isGetAccessor(accessor) ? entities_1.MemberType.Getter : entities_1.MemberType.Setter });
    }
    extractConstructor(constructorDeclaration) {
        const functionExtractor = new function_extractor_1.FunctionExtractor('constructor', constructorDeclaration, this.typeChecker);
        return Object.assign(Object.assign({}, functionExtractor.extract()), { memberType: entities_1.MemberType.Method, memberTags: this.getMemberTags(constructorDeclaration) });
    }
    extractInheritance(declaration) {
        if (!declaration.heritageClauses) {
            return undefined;
        }
        for (const clause of declaration.heritageClauses) {
            if (clause.token === typescript_1.default.SyntaxKind.ExtendsKeyword) {
                // We are assuming a single class can only extend one class.
                const types = clause.types;
                if (types.length > 0) {
                    const baseClass = types[0];
                    return baseClass.getText();
                }
            }
        }
        return undefined;
    }
    extractInterfaceConformance(declaration) {
        var _a, _b;
        const implementClause = (_a = declaration.heritageClauses) === null || _a === void 0 ? void 0 : _a.find((clause) => clause.token === typescript_1.default.SyntaxKind.ImplementsKeyword);
        return (_b = implementClause === null || implementClause === void 0 ? void 0 : implementClause.types.map((m) => m.getText())) !== null && _b !== void 0 ? _b : [];
    }
    /** Gets the tags for a member (protected, readonly, static, etc.) */
    getMemberTags(member) {
        var _a;
        const tags = this.getMemberTagsFromModifiers((_a = member.modifiers) !== null && _a !== void 0 ? _a : []);
        if (member.questionToken) {
            tags.push(entities_1.MemberTags.Optional);
        }
        if (member.parent !== this.declaration) {
            tags.push(entities_1.MemberTags.Inherited);
        }
        return tags;
    }
    /** Computes all signature declarations of the class/interface. */
    computeAllSignatureDeclarations() {
        const type = this.typeChecker.getTypeAtLocation(this.declaration);
        const signatures = [...type.getCallSignatures(), ...type.getConstructSignatures()];
        const result = [];
        for (const signature of signatures) {
            const decl = signature.getDeclaration();
            if (this.isDocumentableSignature(decl) && this.isDocumentableMember(decl)) {
                result.push(decl);
            }
        }
        return result;
    }
    /** Gets all member declarations, including inherited members. */
    getMemberDeclarations() {
        var _a, _b, _c;
        // We rely on TypeScript to resolve all the inherited members to their
        // ultimate form via `getProperties`. This is important because child
        // classes may narrow types or add method overloads.
        const type = this.typeChecker.getTypeAtLocation(this.declaration);
        const members = type.getProperties();
        const constructor = (_b = (_a = type.getSymbol()) === null || _a === void 0 ? void 0 : _a.members) === null || _b === void 0 ? void 0 : _b.get(typescript_1.default.InternalSymbolName.Constructor);
        // While the properties of the declaration type represent the properties that exist
        // on a class *instance*, static members are properties on the class symbol itself.
        const typeOfConstructor = this.typeChecker.getTypeOfSymbol(type.symbol);
        const staticMembers = typeOfConstructor.getProperties();
        const result = [];
        for (const member of [...(constructor ? [constructor] : []), ...members, ...staticMembers]) {
            // A member may have multiple declarations in the case of function overloads.
            const memberDeclarations = this.filterMethodOverloads((_c = member.getDeclarations()) !== null && _c !== void 0 ? _c : []);
            for (const memberDeclaration of memberDeclarations) {
                if (this.isDocumentableMember(memberDeclaration)) {
                    result.push(memberDeclaration);
                }
            }
        }
        return result;
    }
    /** The result only contains properties, method implementations and abstracts */
    filterMethodOverloads(declarations) {
        return declarations.filter((declaration, index) => {
            var _a;
            // Check if the declaration is a function or method
            if (typescript_1.default.isFunctionDeclaration(declaration) ||
                typescript_1.default.isMethodDeclaration(declaration) ||
                typescript_1.default.isConstructorDeclaration(declaration)) {
                // TypeScript ensures that all declarations for a given abstract method appear consecutively.
                const nextDeclaration = declarations[index + 1];
                const isNextMethodWithSameName = nextDeclaration &&
                    ((typescript_1.default.isMethodDeclaration(nextDeclaration) &&
                        nextDeclaration.name.getText() === ((_a = declaration.name) === null || _a === void 0 ? void 0 : _a.getText())) ||
                        (typescript_1.default.isConstructorDeclaration(nextDeclaration) &&
                            typescript_1.default.isConstructorDeclaration(declaration)));
                // Return only the last occurrence of a method to avoid overload duplication.
                // Subsequent overloads or implementations are handled separately by the function extractor.
                return !isNextMethodWithSameName;
            }
            // Include non-method declarations, such as properties, without filtering.
            return true;
        });
    }
    /** Get the tags for a member that come from the declaration modifiers. */
    getMemberTagsFromModifiers(mods) {
        const tags = [];
        for (const mod of mods) {
            const tag = this.getTagForMemberModifier(mod);
            if (tag)
                tags.push(tag);
        }
        return tags;
    }
    /** Gets the doc tag corresponding to a class member modifier (readonly, protected, etc.). */
    getTagForMemberModifier(mod) {
        switch (mod.kind) {
            case typescript_1.default.SyntaxKind.StaticKeyword:
                return entities_1.MemberTags.Static;
            case typescript_1.default.SyntaxKind.ReadonlyKeyword:
                return entities_1.MemberTags.Readonly;
            case typescript_1.default.SyntaxKind.ProtectedKeyword:
                return entities_1.MemberTags.Protected;
            case typescript_1.default.SyntaxKind.AbstractKeyword:
                return entities_1.MemberTags.Abstract;
            default:
                return undefined;
        }
    }
    /**
     * Gets whether a given class member should be excluded from public API docs.
     * This is the case if:
     *  - The member does not have a name
     *  - The member is neither a method nor property
     *  - The member is private
     *  - The member has a name that marks it as Angular-internal.
     *  - The member is marked as internal via JSDoc.
     */
    isMemberExcluded(member) {
        var _a;
        if (typescript_1.default.isConstructorDeclaration(member)) {
            // A constructor has no name
            return false;
        }
        return (!member.name ||
            !this.isDocumentableMember(member) ||
            (!typescript_1.default.isCallSignatureDeclaration(member) &&
                ((_a = member.modifiers) === null || _a === void 0 ? void 0 : _a.some((mod) => mod.kind === typescript_1.default.SyntaxKind.PrivateKeyword))) ||
            member.name.getText() === 'prototype' ||
            (0, filters_1.isAngularPrivateName)(member.name.getText()) ||
            (0, internal_1.isInternal)(member));
    }
    /** Gets whether a class member is a method, property, or accessor. */
    isDocumentableMember(member) {
        return (this.isMethod(member) ||
            this.isProperty(member) ||
            typescript_1.default.isAccessor(member) ||
            typescript_1.default.isConstructorDeclaration(member) ||
            // Signatures are documentable if they are part of an interface.
            typescript_1.default.isCallSignatureDeclaration(member));
    }
    /** Check if the parameter is a constructor parameter with a public modifier */
    isPublicConstructorParameterProperty(node) {
        if (typescript_1.default.isParameterPropertyDeclaration(node, node.parent) && node.modifiers) {
            return node.modifiers.some((modifier) => modifier.kind === typescript_1.default.SyntaxKind.PublicKeyword);
        }
        return false;
    }
    /** Gets whether a member is a property. */
    isProperty(member) {
        // Classes have declarations, interface have signatures
        return (typescript_1.default.isPropertyDeclaration(member) ||
            typescript_1.default.isPropertySignature(member) ||
            this.isPublicConstructorParameterProperty(member));
    }
    /** Gets whether a member is a method. */
    isMethod(member) {
        // Classes have declarations, interface have signatures
        return typescript_1.default.isMethodDeclaration(member) || typescript_1.default.isMethodSignature(member);
    }
    /** Gets whether the given signature declaration is documentable. */
    isDocumentableSignature(signature) {
        return (typescript_1.default.isConstructSignatureDeclaration(signature) || typescript_1.default.isCallSignatureDeclaration(signature));
    }
    /** Gets whether the declaration for this extractor is abstract. */
    isAbstract() {
        var _a;
        const modifiers = (_a = this.declaration.modifiers) !== null && _a !== void 0 ? _a : [];
        return modifiers.some((mod) => mod.kind === typescript_1.default.SyntaxKind.AbstractKeyword);
    }
    /**
     * Check wether a member has a private computed property name like [ɵWRITABLE_SIGNAL]
     *
     * This will prevent exposing private computed properties in the docs.
     */
    hasPrivateComputedProperty(property) {
        return (typescript_1.default.isComputedPropertyName(property.name) && property.name.expression.getText().startsWith('ɵ'));
    }
}
/** Extractor to pull info for API reference documentation for an Angular directive. */
class DirectiveExtractor extends ClassExtractor {
    constructor(declaration, reference, metadata, checker) {
        super(declaration, checker);
        this.reference = reference;
        this.metadata = metadata;
    }
    /** Extract docs info for directives and components (including underlying class info). */
    extract() {
        var _a, _b;
        return Object.assign(Object.assign({}, super.extract()), { isStandalone: this.metadata.isStandalone, selector: (_a = this.metadata.selector) !== null && _a !== void 0 ? _a : '', exportAs: (_b = this.metadata.exportAs) !== null && _b !== void 0 ? _b : [], entryType: this.metadata.isComponent ? entities_1.EntryType.Component : entities_1.EntryType.Directive });
    }
    /** Extracts docs info for a directive property, including input/output metadata. */
    extractClassProperty(propertyDeclaration) {
        const entry = super.extractClassProperty(propertyDeclaration);
        const inputMetadata = this.getInputMetadata(propertyDeclaration);
        if (inputMetadata) {
            entry.memberTags.push(entities_1.MemberTags.Input);
            entry.inputAlias = inputMetadata.bindingPropertyName;
            entry.isRequiredInput = inputMetadata.required;
        }
        const outputMetadata = this.getOutputMetadata(propertyDeclaration);
        if (outputMetadata) {
            entry.memberTags.push(entities_1.MemberTags.Output);
            entry.outputAlias = outputMetadata.bindingPropertyName;
        }
        return entry;
    }
    /** Gets the input metadata for a directive property. */
    getInputMetadata(prop) {
        var _a, _b;
        const propName = prop.name.getText();
        return (_b = (_a = this.metadata.inputs) === null || _a === void 0 ? void 0 : _a.getByClassPropertyName(propName)) !== null && _b !== void 0 ? _b : undefined;
    }
    /** Gets the output metadata for a directive property. */
    getOutputMetadata(prop) {
        var _a, _b, _c;
        const propName = prop.name.getText();
        return (_c = (_b = (_a = this.metadata) === null || _a === void 0 ? void 0 : _a.outputs) === null || _b === void 0 ? void 0 : _b.getByClassPropertyName(propName)) !== null && _c !== void 0 ? _c : undefined;
    }
}
/** Extractor to pull info for API reference documentation for an Angular pipe. */
class PipeExtractor extends ClassExtractor {
    constructor(declaration, reference, metadata, typeChecker) {
        super(declaration, typeChecker);
        this.reference = reference;
        this.metadata = metadata;
    }
    extract() {
        return Object.assign(Object.assign({}, super.extract()), { pipeName: this.metadata.name, entryType: entities_1.EntryType.Pipe, isStandalone: this.metadata.isStandalone, usage: extractPipeSyntax(this.metadata, this.declaration), isPure: this.metadata.isPure });
    }
}
/** Extractor to pull info for API reference documentation for an Angular pipe. */
class NgModuleExtractor extends ClassExtractor {
    constructor(declaration, reference, metadata, typeChecker) {
        super(declaration, typeChecker);
        this.reference = reference;
        this.metadata = metadata;
    }
    extract() {
        return Object.assign(Object.assign({}, super.extract()), { entryType: entities_1.EntryType.NgModule });
    }
}
/** Extracts documentation info for a class, potentially including Angular-specific info.  */
function extractClass(classDeclaration, metadataReader, typeChecker) {
    const ref = new imports_1.Reference(classDeclaration);
    let extractor;
    let directiveMetadata = metadataReader.getDirectiveMetadata(ref);
    let pipeMetadata = metadataReader.getPipeMetadata(ref);
    let ngModuleMetadata = metadataReader.getNgModuleMetadata(ref);
    if (directiveMetadata) {
        extractor = new DirectiveExtractor(classDeclaration, ref, directiveMetadata, typeChecker);
    }
    else if (pipeMetadata) {
        extractor = new PipeExtractor(classDeclaration, ref, pipeMetadata, typeChecker);
    }
    else if (ngModuleMetadata) {
        extractor = new NgModuleExtractor(classDeclaration, ref, ngModuleMetadata, typeChecker);
    }
    else {
        extractor = new ClassExtractor(classDeclaration, typeChecker);
    }
    return extractor.extract();
}
/** Extracts documentation info for an interface. */
function extractInterface(declaration, typeChecker) {
    const extractor = new ClassExtractor(declaration, typeChecker);
    return extractor.extract();
}
function extractPipeSyntax(metadata, classDeclaration) {
    const transformParams = classDeclaration.members.find((member) => {
        return (typescript_1.default.isMethodDeclaration(member) &&
            member.name &&
            typescript_1.default.isIdentifier(member.name) &&
            member.name.getText() === 'transform');
    });
    let paramNames = transformParams.parameters
        // value is the first argument, it's already referenced before the pipe
        .slice(1)
        .map((param) => {
        return param.name.getText();
    });
    return `{{ value_expression | ${metadata.name}${paramNames.length ? ':' + paramNames.join(':') : ''} }}`;
}
