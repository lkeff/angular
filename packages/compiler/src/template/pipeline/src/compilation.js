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
exports.HostBindingCompilationUnit = exports.HostBindingCompilationJob = exports.ViewCompilationUnit = exports.CompilationUnit = exports.ComponentCompilationJob = exports.CompilationJob = exports.CompilationJobKind = void 0;
const ir = __importStar(require("../ir"));
var CompilationJobKind;
(function (CompilationJobKind) {
    CompilationJobKind[CompilationJobKind["Tmpl"] = 0] = "Tmpl";
    CompilationJobKind[CompilationJobKind["Host"] = 1] = "Host";
    CompilationJobKind[CompilationJobKind["Both"] = 2] = "Both";
})(CompilationJobKind || (exports.CompilationJobKind = CompilationJobKind = {}));
/**
 * An entire ongoing compilation, which will result in one or more template functions when complete.
 * Contains one or more corresponding compilation units.
 */
class CompilationJob {
    constructor(componentName, pool, compatibility) {
        this.componentName = componentName;
        this.pool = pool;
        this.compatibility = compatibility;
        this.kind = CompilationJobKind.Both;
        /**
         * Tracks the next `ir.XrefId` which can be assigned as template structures are ingested.
         */
        this.nextXrefId = 0;
    }
    /**
     * Generate a new unique `ir.XrefId` in this job.
     */
    allocateXrefId() {
        return this.nextXrefId++;
    }
}
exports.CompilationJob = CompilationJob;
/**
 * Compilation-in-progress of a whole component's template, including the main template and any
 * embedded views or host bindings.
 */
class ComponentCompilationJob extends CompilationJob {
    constructor(componentName, pool, compatibility, relativeContextFilePath, i18nUseExternalIds, deferMeta, allDeferrableDepsFn, relativeTemplatePath, enableDebugLocations) {
        super(componentName, pool, compatibility);
        this.relativeContextFilePath = relativeContextFilePath;
        this.i18nUseExternalIds = i18nUseExternalIds;
        this.deferMeta = deferMeta;
        this.allDeferrableDepsFn = allDeferrableDepsFn;
        this.relativeTemplatePath = relativeTemplatePath;
        this.enableDebugLocations = enableDebugLocations;
        this.kind = CompilationJobKind.Tmpl;
        this.fnSuffix = 'Template';
        this.views = new Map();
        /**
         * Causes ngContentSelectors to be emitted, for content projection slots in the view. Possibly a
         * reference into the constant pool.
         */
        this.contentSelectors = null;
        /**
         * Constant expressions used by operations within this component's compilation.
         *
         * This will eventually become the `consts` array in the component definition.
         */
        this.consts = [];
        /**
         * Initialization statements needed to set up the consts.
         */
        this.constsInitializers = [];
        this.root = new ViewCompilationUnit(this, this.allocateXrefId(), null);
        this.views.set(this.root.xref, this.root);
    }
    /**
     * Add a `ViewCompilation` for a new embedded view to this compilation.
     */
    allocateView(parent) {
        const view = new ViewCompilationUnit(this, this.allocateXrefId(), parent);
        this.views.set(view.xref, view);
        return view;
    }
    get units() {
        return this.views.values();
    }
    /**
     * Add a constant `o.Expression` to the compilation and return its index in the `consts` array.
     */
    addConst(newConst, initializers) {
        for (let idx = 0; idx < this.consts.length; idx++) {
            if (this.consts[idx].isEquivalent(newConst)) {
                return idx;
            }
        }
        const idx = this.consts.length;
        this.consts.push(newConst);
        if (initializers) {
            this.constsInitializers.push(...initializers);
        }
        return idx;
    }
}
exports.ComponentCompilationJob = ComponentCompilationJob;
/**
 * A compilation unit is compiled into a template function. Some example units are views and host
 * bindings.
 */
class CompilationUnit {
    constructor(xref) {
        this.xref = xref;
        /**
         * List of creation operations for this view.
         *
         * Creation operations may internally contain other operations, including update operations.
         */
        this.create = new ir.OpList();
        /**
         * List of update operations for this view.
         */
        this.update = new ir.OpList();
        /**
         * Name of the function which will be generated for this unit.
         *
         * May be `null` if not yet determined.
         */
        this.fnName = null;
        /**
         * Number of variable slots used within this view, or `null` if variables have not yet been
         * counted.
         */
        this.vars = null;
    }
    /**
     * Iterate over all `ir.Op`s within this view.
     *
     * Some operations may have child operations, which this iterator will visit.
     */
    *ops() {
        for (const op of this.create) {
            yield op;
            if (op.kind === ir.OpKind.Listener || op.kind === ir.OpKind.TwoWayListener) {
                for (const listenerOp of op.handlerOps) {
                    yield listenerOp;
                }
            }
            else if (op.kind === ir.OpKind.RepeaterCreate && op.trackByOps !== null) {
                for (const trackOp of op.trackByOps) {
                    yield trackOp;
                }
            }
        }
        for (const op of this.update) {
            yield op;
        }
    }
}
exports.CompilationUnit = CompilationUnit;
/**
 * Compilation-in-progress of an individual view within a template.
 */
class ViewCompilationUnit extends CompilationUnit {
    constructor(job, xref, parent) {
        super(xref);
        this.job = job;
        this.parent = parent;
        /**
         * Map of declared variables available within this view to the property on the context object
         * which they alias.
         */
        this.contextVariables = new Map();
        /**
         * Set of aliases available within this view. An alias is a variable whose provided expression is
         * inlined at every location it is used. It may also depend on context variables, by name.
         */
        this.aliases = new Set();
        /**
         * Number of declaration slots used within this view, or `null` if slots have not yet been
         * allocated.
         */
        this.decls = null;
    }
}
exports.ViewCompilationUnit = ViewCompilationUnit;
/**
 * Compilation-in-progress of a host binding, which contains a single unit for that host binding.
 */
class HostBindingCompilationJob extends CompilationJob {
    constructor(componentName, pool, compatibility) {
        super(componentName, pool, compatibility);
        this.kind = CompilationJobKind.Host;
        this.fnSuffix = 'HostBindings';
        this.root = new HostBindingCompilationUnit(this);
    }
    get units() {
        return [this.root];
    }
}
exports.HostBindingCompilationJob = HostBindingCompilationJob;
class HostBindingCompilationUnit extends CompilationUnit {
    constructor(job) {
        super(0);
        this.job = job;
        /**
         * Much like an element can have attributes, so can a host binding function.
         */
        this.attributes = null;
    }
}
exports.HostBindingCompilationUnit = HostBindingCompilationUnit;
