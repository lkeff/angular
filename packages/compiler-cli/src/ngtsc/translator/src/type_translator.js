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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateType = translateType;
const o = __importStar(require("@angular/compiler"));
const typescript_1 = __importDefault(require("typescript"));
const imports_1 = require("../../imports");
const reflection_1 = require("../../reflection");
const context_1 = require("./context");
const ts_util_1 = require("./ts_util");
const type_emitter_1 = require("./type_emitter");
function translateType(type, contextFile, reflector, refEmitter, imports) {
    return type.visitType(new TypeTranslatorVisitor(imports, contextFile, reflector, refEmitter), new context_1.Context(false));
}
class TypeTranslatorVisitor {
    constructor(imports, contextFile, reflector, refEmitter) {
        this.imports = imports;
        this.contextFile = contextFile;
        this.reflector = reflector;
        this.refEmitter = refEmitter;
    }
    visitBuiltinType(type, context) {
        switch (type.name) {
            case o.BuiltinTypeName.Bool:
                return typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.BooleanKeyword);
            case o.BuiltinTypeName.Dynamic:
                return typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.AnyKeyword);
            case o.BuiltinTypeName.Int:
            case o.BuiltinTypeName.Number:
                return typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.NumberKeyword);
            case o.BuiltinTypeName.String:
                return typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.StringKeyword);
            case o.BuiltinTypeName.None:
                return typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.NeverKeyword);
            default:
                throw new Error(`Unsupported builtin type: ${o.BuiltinTypeName[type.name]}`);
        }
    }
    visitExpressionType(type, context) {
        const typeNode = this.translateExpression(type.value, context);
        if (type.typeParams === null) {
            return typeNode;
        }
        if (!typescript_1.default.isTypeReferenceNode(typeNode)) {
            throw new Error('An ExpressionType with type arguments must translate into a TypeReferenceNode');
        }
        else if (typeNode.typeArguments !== undefined) {
            throw new Error(`An ExpressionType with type arguments cannot have multiple levels of type arguments`);
        }
        const typeArgs = type.typeParams.map((param) => this.translateType(param, context));
        return typescript_1.default.factory.createTypeReferenceNode(typeNode.typeName, typeArgs);
    }
    visitArrayType(type, context) {
        return typescript_1.default.factory.createArrayTypeNode(this.translateType(type.of, context));
    }
    visitMapType(type, context) {
        const parameter = typescript_1.default.factory.createParameterDeclaration(undefined, undefined, 'key', undefined, typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.StringKeyword));
        const typeArgs = type.valueType !== null
            ? this.translateType(type.valueType, context)
            : typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.UnknownKeyword);
        const indexSignature = typescript_1.default.factory.createIndexSignature(undefined, [parameter], typeArgs);
        return typescript_1.default.factory.createTypeLiteralNode([indexSignature]);
    }
    visitTransplantedType(ast, context) {
        const node = ast.type instanceof imports_1.Reference ? ast.type.node : ast.type;
        if (!typescript_1.default.isTypeNode(node)) {
            throw new Error(`A TransplantedType must wrap a TypeNode`);
        }
        const viaModule = ast.type instanceof imports_1.Reference ? ast.type.bestGuessOwningModule : null;
        const emitter = new type_emitter_1.TypeEmitter((typeRef) => this.translateTypeReference(typeRef, context, viaModule));
        return emitter.emitType(node);
    }
    visitReadVarExpr(ast, context) {
        if (ast.name === null) {
            throw new Error(`ReadVarExpr with no variable name in type`);
        }
        return typescript_1.default.factory.createTypeQueryNode(typescript_1.default.factory.createIdentifier(ast.name));
    }
    visitWriteVarExpr(expr, context) {
        throw new Error('Method not implemented.');
    }
    visitWriteKeyExpr(expr, context) {
        throw new Error('Method not implemented.');
    }
    visitWritePropExpr(expr, context) {
        throw new Error('Method not implemented.');
    }
    visitInvokeFunctionExpr(ast, context) {
        throw new Error('Method not implemented.');
    }
    visitTaggedTemplateLiteralExpr(ast, context) {
        throw new Error('Method not implemented.');
    }
    visitTemplateLiteralExpr(ast, context) {
        throw new Error('Method not implemented.');
    }
    visitTemplateLiteralElementExpr(ast, context) {
        throw new Error('Method not implemented.');
    }
    visitInstantiateExpr(ast, context) {
        throw new Error('Method not implemented.');
    }
    visitLiteralExpr(ast, context) {
        if (ast.value === null) {
            return typescript_1.default.factory.createLiteralTypeNode(typescript_1.default.factory.createNull());
        }
        else if (ast.value === undefined) {
            return typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.UndefinedKeyword);
        }
        else if (typeof ast.value === 'boolean') {
            return typescript_1.default.factory.createLiteralTypeNode(ast.value ? typescript_1.default.factory.createTrue() : typescript_1.default.factory.createFalse());
        }
        else if (typeof ast.value === 'number') {
            return typescript_1.default.factory.createLiteralTypeNode((0, ts_util_1.tsNumericExpression)(ast.value));
        }
        else {
            return typescript_1.default.factory.createLiteralTypeNode(typescript_1.default.factory.createStringLiteral(ast.value));
        }
    }
    visitLocalizedString(ast, context) {
        throw new Error('Method not implemented.');
    }
    visitExternalExpr(ast, context) {
        if (ast.value.moduleName === null || ast.value.name === null) {
            throw new Error(`Import unknown module or symbol`);
        }
        const typeName = this.imports.addImport({
            exportModuleSpecifier: ast.value.moduleName,
            exportSymbolName: ast.value.name,
            requestedFile: this.contextFile,
            asTypeReference: true,
        });
        const typeArguments = ast.typeParams !== null
            ? ast.typeParams.map((type) => this.translateType(type, context))
            : undefined;
        return typescript_1.default.factory.createTypeReferenceNode(typeName, typeArguments);
    }
    visitConditionalExpr(ast, context) {
        throw new Error('Method not implemented.');
    }
    visitDynamicImportExpr(ast, context) {
        throw new Error('Method not implemented.');
    }
    visitNotExpr(ast, context) {
        throw new Error('Method not implemented.');
    }
    visitFunctionExpr(ast, context) {
        throw new Error('Method not implemented.');
    }
    visitArrowFunctionExpr(ast, context) {
        throw new Error('Method not implemented.');
    }
    visitUnaryOperatorExpr(ast, context) {
        throw new Error('Method not implemented.');
    }
    visitBinaryOperatorExpr(ast, context) {
        throw new Error('Method not implemented.');
    }
    visitReadPropExpr(ast, context) {
        throw new Error('Method not implemented.');
    }
    visitReadKeyExpr(ast, context) {
        throw new Error('Method not implemented.');
    }
    visitLiteralArrayExpr(ast, context) {
        const values = ast.entries.map((expr) => this.translateExpression(expr, context));
        return typescript_1.default.factory.createTupleTypeNode(values);
    }
    visitLiteralMapExpr(ast, context) {
        const entries = ast.entries.map((entry) => {
            const { key, quoted } = entry;
            const type = this.translateExpression(entry.value, context);
            return typescript_1.default.factory.createPropertySignature(
            /* modifiers */ undefined, 
            /* name */ quoted ? typescript_1.default.factory.createStringLiteral(key) : key, 
            /* questionToken */ undefined, 
            /* type */ type);
        });
        return typescript_1.default.factory.createTypeLiteralNode(entries);
    }
    visitCommaExpr(ast, context) {
        throw new Error('Method not implemented.');
    }
    visitWrappedNodeExpr(ast, context) {
        const node = ast.node;
        if (typescript_1.default.isEntityName(node)) {
            return typescript_1.default.factory.createTypeReferenceNode(node, /* typeArguments */ undefined);
        }
        else if (typescript_1.default.isTypeNode(node)) {
            return node;
        }
        else if (typescript_1.default.isLiteralExpression(node)) {
            return typescript_1.default.factory.createLiteralTypeNode(node);
        }
        else {
            throw new Error(`Unsupported WrappedNodeExpr in TypeTranslatorVisitor: ${typescript_1.default.SyntaxKind[node.kind]}`);
        }
    }
    visitTypeofExpr(ast, context) {
        const typeNode = this.translateExpression(ast.expr, context);
        if (!typescript_1.default.isTypeReferenceNode(typeNode)) {
            throw new Error(`The target of a typeof expression must be a type reference, but it was
          ${typescript_1.default.SyntaxKind[typeNode.kind]}`);
        }
        return typescript_1.default.factory.createTypeQueryNode(typeNode.typeName);
    }
    visitVoidExpr(ast, context) {
        throw new Error('Method not implemented.');
    }
    visitParenthesizedExpr(ast, context) {
        throw new Error('Method not implemented.');
    }
    translateType(type, context) {
        const typeNode = type.visitType(this, context);
        if (!typescript_1.default.isTypeNode(typeNode)) {
            throw new Error(`A Type must translate to a TypeNode, but was ${typescript_1.default.SyntaxKind[typeNode.kind]}`);
        }
        return typeNode;
    }
    translateExpression(expr, context) {
        const typeNode = expr.visitExpression(this, context);
        if (!typescript_1.default.isTypeNode(typeNode)) {
            throw new Error(`An Expression must translate to a TypeNode, but was ${typescript_1.default.SyntaxKind[typeNode.kind]}`);
        }
        return typeNode;
    }
    translateTypeReference(type, context, viaModule) {
        const target = typescript_1.default.isIdentifier(type.typeName) ? type.typeName : type.typeName.right;
        const declaration = this.reflector.getDeclarationOfIdentifier(target);
        if (declaration === null) {
            throw new Error(`Unable to statically determine the declaration file of type node ${target.text}`);
        }
        let owningModule = viaModule;
        if (typeof declaration.viaModule === 'string') {
            owningModule = {
                specifier: declaration.viaModule,
                resolutionContext: type.getSourceFile().fileName,
            };
        }
        const reference = new imports_1.Reference(declaration.node, declaration.viaModule === reflection_1.AmbientImport ? reflection_1.AmbientImport : owningModule);
        const emittedType = this.refEmitter.emit(reference, this.contextFile, imports_1.ImportFlags.NoAliasing | imports_1.ImportFlags.AllowTypeImports | imports_1.ImportFlags.AllowAmbientReferences);
        (0, imports_1.assertSuccessfulReferenceEmit)(emittedType, target, 'type');
        const typeNode = this.translateExpression(emittedType.expression, context);
        if (!typescript_1.default.isTypeReferenceNode(typeNode)) {
            throw new Error(`Expected TypeReferenceNode for emitted reference, got ${typescript_1.default.SyntaxKind[typeNode.kind]}.`);
        }
        return typeNode;
    }
}
