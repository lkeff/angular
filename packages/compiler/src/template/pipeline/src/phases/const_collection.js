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
exports.collectElementConsts = collectElementConsts;
const core = __importStar(require("../../../../core"));
const o = __importStar(require("../../../../output/output_ast"));
const ir = __importStar(require("../../ir"));
const compilation_1 = require("../compilation");
const conversion_1 = require("../conversion");
/**
 * Converts the semantic attributes of element-like operations (elements, templates) into constant
 * array expressions, and lifts them into the overall component `consts`.
 */
function collectElementConsts(job) {
    // Collect all extracted attributes.
    const allElementAttributes = new Map();
    for (const unit of job.units) {
        for (const op of unit.create) {
            if (op.kind === ir.OpKind.ExtractedAttribute) {
                const attributes = allElementAttributes.get(op.target) || new ElementAttributes(job.compatibility);
                allElementAttributes.set(op.target, attributes);
                attributes.add(op.bindingKind, op.name, op.expression, op.namespace, op.trustedValueFn);
                ir.OpList.remove(op);
            }
        }
    }
    // Serialize the extracted attributes into the const array.
    if (job instanceof compilation_1.ComponentCompilationJob) {
        for (const unit of job.units) {
            for (const op of unit.create) {
                // TODO: Simplify and combine these cases.
                if (op.kind == ir.OpKind.Projection) {
                    const attributes = allElementAttributes.get(op.xref);
                    if (attributes !== undefined) {
                        const attrArray = serializeAttributes(attributes);
                        if (attrArray.entries.length > 0) {
                            op.attributes = attrArray;
                        }
                    }
                }
                else if (ir.isElementOrContainerOp(op)) {
                    op.attributes = getConstIndex(job, allElementAttributes, op.xref);
                    // TODO(dylhunn): `@for` loops with `@empty` blocks need to be special-cased here,
                    // because the slot consumer trait currently only supports one slot per consumer and we
                    // need two. This should be revisited when making the refactors mentioned in:
                    // https://github.com/angular/angular/pull/53620#discussion_r1430918822
                    if (op.kind === ir.OpKind.RepeaterCreate && op.emptyView !== null) {
                        op.emptyAttributes = getConstIndex(job, allElementAttributes, op.emptyView);
                    }
                }
            }
        }
    }
    else if (job instanceof compilation_1.HostBindingCompilationJob) {
        // TODO: If the host binding case further diverges, we may want to split it into its own
        // phase.
        for (const [xref, attributes] of allElementAttributes.entries()) {
            if (xref !== job.root.xref) {
                throw new Error(`An attribute would be const collected into the host binding's template function, but is not associated with the root xref.`);
            }
            const attrArray = serializeAttributes(attributes);
            if (attrArray.entries.length > 0) {
                job.root.attributes = attrArray;
            }
        }
    }
}
function getConstIndex(job, allElementAttributes, xref) {
    const attributes = allElementAttributes.get(xref);
    if (attributes !== undefined) {
        const attrArray = serializeAttributes(attributes);
        if (attrArray.entries.length > 0) {
            return job.addConst(attrArray);
        }
    }
    return null;
}
/**
 * Shared instance of an empty array to avoid unnecessary array allocations.
 */
const FLYWEIGHT_ARRAY = Object.freeze([]);
/**
 * Container for all of the various kinds of attributes which are applied on an element.
 */
class ElementAttributes {
    get attributes() {
        var _a;
        return (_a = this.byKind.get(ir.BindingKind.Attribute)) !== null && _a !== void 0 ? _a : FLYWEIGHT_ARRAY;
    }
    get classes() {
        var _a;
        return (_a = this.byKind.get(ir.BindingKind.ClassName)) !== null && _a !== void 0 ? _a : FLYWEIGHT_ARRAY;
    }
    get styles() {
        var _a;
        return (_a = this.byKind.get(ir.BindingKind.StyleProperty)) !== null && _a !== void 0 ? _a : FLYWEIGHT_ARRAY;
    }
    get bindings() {
        var _a;
        return (_a = this.propertyBindings) !== null && _a !== void 0 ? _a : FLYWEIGHT_ARRAY;
    }
    get template() {
        var _a;
        return (_a = this.byKind.get(ir.BindingKind.Template)) !== null && _a !== void 0 ? _a : FLYWEIGHT_ARRAY;
    }
    get i18n() {
        var _a;
        return (_a = this.byKind.get(ir.BindingKind.I18n)) !== null && _a !== void 0 ? _a : FLYWEIGHT_ARRAY;
    }
    constructor(compatibility) {
        this.compatibility = compatibility;
        this.known = new Map();
        this.byKind = new Map();
        this.propertyBindings = null;
        this.projectAs = null;
    }
    isKnown(kind, name) {
        var _a;
        const nameToValue = (_a = this.known.get(kind)) !== null && _a !== void 0 ? _a : new Set();
        this.known.set(kind, nameToValue);
        if (nameToValue.has(name)) {
            return true;
        }
        nameToValue.add(name);
        return false;
    }
    add(kind, name, value, namespace, trustedValueFn) {
        var _a;
        // TemplateDefinitionBuilder puts duplicate attribute, class, and style values into the consts
        // array. This seems inefficient, we can probably keep just the first one or the last value
        // (whichever actually gets applied when multiple values are listed for the same attribute).
        const allowDuplicates = this.compatibility === ir.CompatibilityMode.TemplateDefinitionBuilder &&
            (kind === ir.BindingKind.Attribute ||
                kind === ir.BindingKind.ClassName ||
                kind === ir.BindingKind.StyleProperty);
        if (!allowDuplicates && this.isKnown(kind, name)) {
            return;
        }
        // TODO: Can this be its own phase
        if (name === 'ngProjectAs') {
            if (value === null ||
                !(value instanceof o.LiteralExpr) ||
                value.value == null ||
                typeof ((_a = value.value) === null || _a === void 0 ? void 0 : _a.toString()) !== 'string') {
                throw Error('ngProjectAs must have a string literal value');
            }
            this.projectAs = value.value.toString();
            // TODO: TemplateDefinitionBuilder allows `ngProjectAs` to also be assigned as a literal
            // attribute. Is this sane?
        }
        const array = this.arrayFor(kind);
        array.push(...getAttributeNameLiterals(namespace, name));
        if (kind === ir.BindingKind.Attribute || kind === ir.BindingKind.StyleProperty) {
            if (value === null) {
                throw Error('Attribute, i18n attribute, & style element attributes must have a value');
            }
            if (trustedValueFn !== null) {
                if (!ir.isStringLiteral(value)) {
                    throw Error('AssertionError: extracted attribute value should be string literal');
                }
                array.push(o.taggedTemplate(trustedValueFn, new o.TemplateLiteralExpr([new o.TemplateLiteralElementExpr(value.value)], []), undefined, value.sourceSpan));
            }
            else {
                array.push(value);
            }
        }
    }
    arrayFor(kind) {
        var _a;
        if (kind === ir.BindingKind.Property || kind === ir.BindingKind.TwoWayProperty) {
            (_a = this.propertyBindings) !== null && _a !== void 0 ? _a : (this.propertyBindings = []);
            return this.propertyBindings;
        }
        else {
            if (!this.byKind.has(kind)) {
                this.byKind.set(kind, []);
            }
            return this.byKind.get(kind);
        }
    }
}
/**
 * Gets an array of literal expressions representing the attribute's namespaced name.
 */
function getAttributeNameLiterals(namespace, name) {
    const nameLiteral = o.literal(name);
    if (namespace) {
        return [o.literal(0 /* core.AttributeMarker.NamespaceURI */), o.literal(namespace), nameLiteral];
    }
    return [nameLiteral];
}
/**
 * Serializes an ElementAttributes object into an array expression.
 */
function serializeAttributes({ attributes, bindings, classes, i18n, projectAs, styles, template, }) {
    const attrArray = [...attributes];
    if (projectAs !== null) {
        // Parse the attribute value into a CssSelectorList. Note that we only take the
        // first selector, because we don't support multiple selectors in ngProjectAs.
        const parsedR3Selector = core.parseSelectorToR3Selector(projectAs)[0];
        attrArray.push(o.literal(5 /* core.AttributeMarker.ProjectAs */), (0, conversion_1.literalOrArrayLiteral)(parsedR3Selector));
    }
    if (classes.length > 0) {
        attrArray.push(o.literal(1 /* core.AttributeMarker.Classes */), ...classes);
    }
    if (styles.length > 0) {
        attrArray.push(o.literal(2 /* core.AttributeMarker.Styles */), ...styles);
    }
    if (bindings.length > 0) {
        attrArray.push(o.literal(3 /* core.AttributeMarker.Bindings */), ...bindings);
    }
    if (template.length > 0) {
        attrArray.push(o.literal(4 /* core.AttributeMarker.Template */), ...template);
    }
    if (i18n.length > 0) {
        attrArray.push(o.literal(6 /* core.AttributeMarker.I18n */), ...i18n);
    }
    return o.literalArr(attrArray);
}
