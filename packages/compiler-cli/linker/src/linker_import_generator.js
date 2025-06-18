"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkerImportGenerator = void 0;
const fatal_linker_error_1 = require("./fatal_linker_error");
/**
 * A class that is used to generate imports when translating from Angular Output AST to an AST to
 * render, such as Babel.
 *
 * Note that, in the linker, there can only be imports from `@angular/core` and that these imports
 * must be achieved by property access on an `ng` namespace identifier, which is passed in via the
 * constructor.
 */
class LinkerImportGenerator {
    constructor(factory, ngImport) {
        this.factory = factory;
        this.ngImport = ngImport;
    }
    addImport(request) {
        this.assertModuleName(request.exportModuleSpecifier);
        if (request.exportSymbolName === null) {
            return this.ngImport;
        }
        return this.factory.createPropertyAccess(this.ngImport, request.exportSymbolName);
    }
    assertModuleName(moduleName) {
        if (moduleName !== '@angular/core') {
            throw new fatal_linker_error_1.FatalLinkerError(this.ngImport, `Unable to import from anything other than '@angular/core'`);
        }
    }
}
exports.LinkerImportGenerator = LinkerImportGenerator;
