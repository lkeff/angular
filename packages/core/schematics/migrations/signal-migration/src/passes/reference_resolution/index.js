"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFindAllSourceFileReferencesVisitor = createFindAllSourceFileReferencesVisitor;
const typescript_1 = __importDefault(require("typescript"));
const tsurge_1 = require("../../../../../utils/tsurge");
const input_node_1 = require("../../input_detection/input_node");
const debug_element_component_instance_1 = require("../../pattern_advisors/debug_element_component_instance");
const partial_directive_type_1 = require("../../pattern_advisors/partial_directive_type");
const identify_host_references_1 = require("./identify_host_references");
const identify_template_references_1 = require("./identify_template_references");
const identify_ts_references_1 = require("./identify_ts_references");
const reference_kinds_1 = require("./reference_kinds");
/**
 * Phase where we iterate through all source file references and
 * detect references to known fields (e.g. commonly inputs).
 *
 * This is useful, for example in the signal input migration whe
 * references need to be migrated to unwrap signals, given that
 * their target properties is no longer holding a raw value, but
 * instead an `InputSignal`.
 *
 * This phase detects references in all types of locations:
 *    - TS source files
 *    - Angular templates (inline or external)
 *    - Host binding expressions.
 */
function createFindAllSourceFileReferencesVisitor(programInfo, checker, reflector, resourceLoader, evaluator, templateTypeChecker, knownFields, fieldNamesToConsiderForReferenceLookup, result) {
    const debugElComponentInstanceTracker = new debug_element_component_instance_1.DebugElementComponentInstance(checker);
    const partialDirectiveCatalystTracker = new partial_directive_type_1.PartialDirectiveTypeInCatalystTests(checker, knownFields);
    const perfCounters = {
        template: 0,
        hostBindings: 0,
        tsReferences: 0,
        tsTypes: 0,
    };
    // Schematic NodeJS execution may not have `global.performance` defined.
    const currentTimeInMs = () => typeof global.performance !== 'undefined' ? global.performance.now() : Date.now();
    const visitor = (node) => {
        let lastTime = currentTimeInMs();
        // Note: If there is no template type checker and resource loader, we aren't processing
        // an Angular program, and can skip template detection.
        if (typescript_1.default.isClassDeclaration(node) && templateTypeChecker !== null && resourceLoader !== null) {
            (0, identify_template_references_1.identifyTemplateReferences)(programInfo, node, reflector, checker, evaluator, templateTypeChecker, resourceLoader, programInfo.userOptions, result, knownFields, fieldNamesToConsiderForReferenceLookup);
            perfCounters.template += (currentTimeInMs() - lastTime) / 1000;
            lastTime = currentTimeInMs();
            (0, identify_host_references_1.identifyHostBindingReferences)(node, programInfo, checker, reflector, result, knownFields, fieldNamesToConsiderForReferenceLookup);
            perfCounters.hostBindings += (currentTimeInMs() - lastTime) / 1000;
            lastTime = currentTimeInMs();
        }
        lastTime = currentTimeInMs();
        // find references, but do not capture input declarations itself.
        if (typescript_1.default.isIdentifier(node) &&
            !((0, input_node_1.isInputContainerNode)(node.parent) && node.parent.name === node)) {
            (0, identify_ts_references_1.identifyPotentialTypeScriptReference)(node, programInfo, checker, knownFields, result, fieldNamesToConsiderForReferenceLookup, {
                debugElComponentInstanceTracker,
            });
        }
        perfCounters.tsReferences += (currentTimeInMs() - lastTime) / 1000;
        lastTime = currentTimeInMs();
        // Detect `Partial<T>` references.
        // Those are relevant to be tracked as they may be updated in Catalyst to
        // unwrap signal inputs. Commonly people use `Partial` in Catalyst to type
        // some "component initial values".
        const partialDirectiveInCatalyst = partialDirectiveCatalystTracker.detect(node);
        if (partialDirectiveInCatalyst !== null) {
            result.references.push({
                kind: reference_kinds_1.ReferenceKind.TsClassTypeReference,
                from: {
                    file: (0, tsurge_1.projectFile)(partialDirectiveInCatalyst.referenceNode.getSourceFile(), programInfo),
                    node: partialDirectiveInCatalyst.referenceNode,
                },
                isPartialReference: true,
                isPartOfCatalystFile: true,
                target: partialDirectiveInCatalyst.targetClass,
            });
        }
        perfCounters.tsTypes += (currentTimeInMs() - lastTime) / 1000;
    };
    return {
        visitor,
        debugPrintMetrics: () => {
            console.info('Source file analysis performance', perfCounters);
        },
    };
}
