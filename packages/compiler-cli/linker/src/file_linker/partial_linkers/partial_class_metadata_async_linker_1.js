"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialClassMetadataAsyncLinkerVersion1 = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const compiler_1 = require("@angular/compiler");
const fatal_linker_error_1 = require("../../fatal_linker_error");
/**
 * A `PartialLinker` that is designed to process `ɵɵngDeclareClassMetadataAsync()` call expressions.
 */
class PartialClassMetadataAsyncLinkerVersion1 {
    linkPartialDeclaration(constantPool, metaObj) {
        const resolveMetadataKey = 'resolveMetadata';
        const resolveMetadata = metaObj.getValue(resolveMetadataKey);
        if (!resolveMetadata.isFunction()) {
            throw new fatal_linker_error_1.FatalLinkerError(resolveMetadata, `Unsupported \`${resolveMetadataKey}\` value. Expected a function.`);
        }
        const dependencyResolverFunction = metaObj.getOpaque('resolveDeferredDeps');
        const deferredSymbolNames = resolveMetadata
            .getFunctionParameters()
            .map((p) => p.getSymbolName());
        const returnValue = resolveMetadata.getFunctionReturnValue().getObject();
        const metadata = {
            type: metaObj.getOpaque('type'),
            decorators: returnValue.getOpaque('decorators'),
            ctorParameters: returnValue.getOpaque('ctorParameters'),
            propDecorators: returnValue.getOpaque('propDecorators'),
        };
        return {
            expression: (0, compiler_1.compileOpaqueAsyncClassMetadata)(metadata, dependencyResolverFunction, deferredSymbolNames),
            statements: [],
        };
    }
}
exports.PartialClassMetadataAsyncLinkerVersion1 = PartialClassMetadataAsyncLinkerVersion1;
