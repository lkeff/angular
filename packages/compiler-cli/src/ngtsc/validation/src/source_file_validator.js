"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceFileValidator = void 0;
const initializer_api_usage_rule_1 = require("./rules/initializer_api_usage_rule");
const unused_standalone_imports_rule_1 = require("./rules/unused_standalone_imports_rule");
const config_1 = require("./config");
/**
 * Validates that TypeScript files match a specific set of rules set by the Angular compiler.
 */
class SourceFileValidator {
    constructor(reflector, importedSymbolsTracker, templateTypeChecker, typeCheckingConfig) {
        this.rules = [new initializer_api_usage_rule_1.InitializerApiUsageRule(reflector, importedSymbolsTracker)];
        if (config_1.UNUSED_STANDALONE_IMPORTS_RULE_ENABLED) {
            this.rules.push(new unused_standalone_imports_rule_1.UnusedStandaloneImportsRule(templateTypeChecker, typeCheckingConfig, importedSymbolsTracker));
        }
    }
    /**
     * Gets the diagnostics for a specific file, or null if the file is valid.
     * @param sourceFile File to be checked.
     */
    getDiagnosticsForFile(sourceFile) {
        if (sourceFile.isDeclarationFile || sourceFile.fileName.endsWith('.ngtypecheck.ts')) {
            return null;
        }
        let rulesToRun = null;
        for (const rule of this.rules) {
            if (rule.shouldCheck(sourceFile)) {
                rulesToRun !== null && rulesToRun !== void 0 ? rulesToRun : (rulesToRun = []);
                rulesToRun.push(rule);
            }
        }
        if (rulesToRun === null) {
            return null;
        }
        let fileDiagnostics = null;
        sourceFile.forEachChild(function walk(node) {
            // Note: non-null assertion is here because of g3.
            for (const rule of rulesToRun) {
                const nodeDiagnostics = rule.checkNode(node);
                if (nodeDiagnostics !== null) {
                    fileDiagnostics !== null && fileDiagnostics !== void 0 ? fileDiagnostics : (fileDiagnostics = []);
                    if (Array.isArray(nodeDiagnostics)) {
                        fileDiagnostics.push(...nodeDiagnostics);
                    }
                    else {
                        fileDiagnostics.push(nodeDiagnostics);
                    }
                }
            }
            node.forEachChild(walk);
        });
        return fileDiagnostics;
    }
}
exports.SourceFileValidator = SourceFileValidator;
