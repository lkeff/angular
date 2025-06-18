"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseVisitor = void 0;
/**
 * A simple base class for the  `Visitor` interface, which is a noop for every method.
 *
 * Sub-classes only need to override the methods that they care about.
 */
class BaseVisitor {
    visitElement(_element, _context) { }
    visitAttribute(_attribute, _context) { }
    visitText(_text, _context) { }
    visitComment(_comment, _context) { }
    visitExpansion(_expansion, _context) { }
    visitExpansionCase(_expansionCase, _context) { }
    visitBlock(_block, _context) { }
    visitBlockParameter(_parameter, _context) { }
    visitLetDeclaration(_decl, _context) { }
    visitComponent(_component, _context) { }
    visitDirective(_directive, _context) { }
}
exports.BaseVisitor = BaseVisitor;
