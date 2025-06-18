"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialClassMetadataLinkerVersion1 = void 0;
exports.toR3ClassMetadata = toR3ClassMetadata;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const compiler_1 = require("@angular/compiler");
/**
 * A `PartialLinker` that is designed to process `ɵɵngDeclareClassMetadata()` call expressions.
 */
class PartialClassMetadataLinkerVersion1 {
    linkPartialDeclaration(constantPool, metaObj) {
        const meta = toR3ClassMetadata(metaObj);
        return {
            expression: (0, compiler_1.compileClassMetadata)(meta),
            statements: [],
        };
    }
}
exports.PartialClassMetadataLinkerVersion1 = PartialClassMetadataLinkerVersion1;
/**
 * Derives the `R3ClassMetadata` structure from the AST object.
 */
function toR3ClassMetadata(metaObj) {
    return {
        type: metaObj.getOpaque('type'),
        decorators: metaObj.getOpaque('decorators'),
        ctorParameters: metaObj.has('ctorParameters') ? metaObj.getOpaque('ctorParameters') : null,
        propDecorators: metaObj.has('propDecorators') ? metaObj.getOpaque('propDecorators') : null,
    };
}
