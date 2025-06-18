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
exports.resolveSanitizers = resolveSanitizers;
const core_1 = require("../../../../core");
const o = __importStar(require("../../../../output/output_ast"));
const r3_identifiers_1 = require("../../../../render3/r3_identifiers");
const dom_security_schema_1 = require("../../../../schema/dom_security_schema");
const ir = __importStar(require("../../ir"));
const compilation_1 = require("../compilation");
const elements_1 = require("../util/elements");
/**
 * Map of security contexts to their sanitizer function.
 */
const sanitizerFns = new Map([
    [core_1.SecurityContext.HTML, r3_identifiers_1.Identifiers.sanitizeHtml],
    [core_1.SecurityContext.RESOURCE_URL, r3_identifiers_1.Identifiers.sanitizeResourceUrl],
    [core_1.SecurityContext.SCRIPT, r3_identifiers_1.Identifiers.sanitizeScript],
    [core_1.SecurityContext.STYLE, r3_identifiers_1.Identifiers.sanitizeStyle],
    [core_1.SecurityContext.URL, r3_identifiers_1.Identifiers.sanitizeUrl],
]);
/**
 * Map of security contexts to their trusted value function.
 */
const trustedValueFns = new Map([
    [core_1.SecurityContext.HTML, r3_identifiers_1.Identifiers.trustConstantHtml],
    [core_1.SecurityContext.RESOURCE_URL, r3_identifiers_1.Identifiers.trustConstantResourceUrl],
]);
/**
 * Resolves sanitization functions for ops that need them.
 */
function resolveSanitizers(job) {
    var _a, _b;
    for (const unit of job.units) {
        const elements = (0, elements_1.createOpXrefMap)(unit);
        // For normal element bindings we create trusted values for security sensitive constant
        // attributes. However, for host bindings we skip this step (this matches what
        // TemplateDefinitionBuilder does).
        // TODO: Is the TDB behavior correct here?
        if (job.kind !== compilation_1.CompilationJobKind.Host) {
            for (const op of unit.create) {
                if (op.kind === ir.OpKind.ExtractedAttribute) {
                    const trustedValueFn = (_a = trustedValueFns.get(getOnlySecurityContext(op.securityContext))) !== null && _a !== void 0 ? _a : null;
                    op.trustedValueFn = trustedValueFn !== null ? o.importExpr(trustedValueFn) : null;
                }
            }
        }
        for (const op of unit.update) {
            switch (op.kind) {
                case ir.OpKind.Property:
                case ir.OpKind.Attribute:
                case ir.OpKind.DomProperty:
                    let sanitizerFn = null;
                    if (Array.isArray(op.securityContext) &&
                        op.securityContext.length === 2 &&
                        op.securityContext.indexOf(core_1.SecurityContext.URL) > -1 &&
                        op.securityContext.indexOf(core_1.SecurityContext.RESOURCE_URL) > -1) {
                        // When the host element isn't known, some URL attributes (such as "src" and "href") may
                        // be part of multiple different security contexts. In this case we use special
                        // sanitization function and select the actual sanitizer at runtime based on a tag name
                        // that is provided while invoking sanitization function.
                        sanitizerFn = r3_identifiers_1.Identifiers.sanitizeUrlOrResourceUrl;
                    }
                    else {
                        sanitizerFn = (_b = sanitizerFns.get(getOnlySecurityContext(op.securityContext))) !== null && _b !== void 0 ? _b : null;
                    }
                    op.sanitizer = sanitizerFn !== null ? o.importExpr(sanitizerFn) : null;
                    // If there was no sanitization function found based on the security context of an
                    // attribute/property, check whether this attribute/property is one of the
                    // security-sensitive <iframe> attributes (and that the current element is actually an
                    // <iframe>).
                    if (op.sanitizer === null) {
                        let isIframe = false;
                        if (job.kind === compilation_1.CompilationJobKind.Host || op.kind === ir.OpKind.DomProperty) {
                            // Note: for host bindings defined on a directive, we do not try to find all
                            // possible places where it can be matched, so we can not determine whether
                            // the host element is an <iframe>. In this case, we just assume it is and append a
                            // validation function, which is invoked at runtime and would have access to the
                            // underlying DOM element to check if it's an <iframe> and if so - run extra checks.
                            isIframe = true;
                        }
                        else {
                            // For a normal binding we can just check if the element its on is an iframe.
                            const ownerOp = elements.get(op.target);
                            if (ownerOp === undefined || !ir.isElementOrContainerOp(ownerOp)) {
                                throw Error('Property should have an element-like owner');
                            }
                            isIframe = isIframeElement(ownerOp);
                        }
                        if (isIframe && (0, dom_security_schema_1.isIframeSecuritySensitiveAttr)(op.name)) {
                            op.sanitizer = o.importExpr(r3_identifiers_1.Identifiers.validateIframeAttribute);
                        }
                    }
                    break;
            }
        }
    }
}
/**
 * Checks whether the given op represents an iframe element.
 */
function isIframeElement(op) {
    var _a;
    return op.kind === ir.OpKind.ElementStart && ((_a = op.tag) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'iframe';
}
/**
 * Asserts that there is only a single security context and returns it.
 */
function getOnlySecurityContext(securityContext) {
    if (Array.isArray(securityContext)) {
        if (securityContext.length > 1) {
            // TODO: What should we do here? TDB just took the first one, but this feels like something we
            // would want to know about and create a special case for like we did for Url/ResourceUrl. My
            // guess is that, outside of the Url/ResourceUrl case, this never actually happens. If there
            // do turn out to be other cases, throwing an error until we can address it feels safer.
            throw Error(`AssertionError: Ambiguous security context`);
        }
        return securityContext[0] || core_1.SecurityContext.NONE;
    }
    return securityContext;
}
