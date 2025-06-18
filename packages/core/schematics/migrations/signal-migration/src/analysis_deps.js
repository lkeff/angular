"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareAnalysisInfo = prepareAnalysisInfo;
const metadata_1 = require("@angular/compiler-cli/src/ngtsc/metadata");
const partial_evaluator_1 = require("@angular/compiler-cli/src/ngtsc/partial_evaluator");
const reflection_1 = require("@angular/compiler-cli/src/ngtsc/reflection");
/**
 * Prepares migration analysis for the given program.
 *
 * Unlike {@link createAndPrepareAnalysisProgram} this does not create the program,
 * and can be used for integrations with e.g. the language service.
 */
function prepareAnalysisInfo(userProgram, compiler, programAbsoluteRootPaths) {
    let refEmitter = null;
    let metaReader = null;
    let templateTypeChecker = null;
    let resourceLoader = null;
    if (compiler !== null) {
        // Analyze sync and retrieve necessary dependencies.
        // Note: `getTemplateTypeChecker` requires the `enableTemplateTypeChecker` flag, but
        // this has negative effects as it causes optional TCB operations to execute, which may
        // error with unsuccessful reference emits that previously were ignored outside of the migration.
        // The migration is resilient to TCB information missing, so this is fine, and all the information
        // we need is part of required TCB operations anyway.
        const state = compiler['ensureAnalyzed']();
        resourceLoader = compiler['resourceManager'];
        refEmitter = state.refEmitter;
        metaReader = state.metaReader;
        templateTypeChecker = state.templateTypeChecker;
        // Generate all type check blocks.
        state.templateTypeChecker.generateAllTypeCheckBlocks();
    }
    const typeChecker = userProgram.getTypeChecker();
    const reflector = new reflection_1.TypeScriptReflectionHost(typeChecker);
    const evaluator = new partial_evaluator_1.PartialEvaluator(reflector, typeChecker, null);
    const dtsMetadataReader = new metadata_1.DtsMetadataReader(typeChecker, reflector);
    return {
        metaRegistry: metaReader,
        dtsMetadataReader,
        evaluator,
        reflector,
        typeChecker,
        refEmitter,
        templateTypeChecker,
        resourceLoader,
    };
}
