"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateTemplate = migrateTemplate;
const cases_1 = require("./cases");
const fors_1 = require("./fors");
const ifs_1 = require("./ifs");
const switches_1 = require("./switches");
const types_1 = require("./types");
const util_1 = require("./util");
/**
 * Actually migrates a given template to the new syntax
 */
function migrateTemplate(template, templateType, node, file, format = true, analyzedFiles) {
    let errors = [];
    let migrated = template;
    if (templateType === 'template' || templateType === 'templateUrl') {
        const ifResult = (0, ifs_1.migrateIf)(template);
        const forResult = (0, fors_1.migrateFor)(ifResult.migrated);
        const switchResult = (0, switches_1.migrateSwitch)(forResult.migrated);
        if (switchResult.errors.length > 0) {
            return { migrated: template, errors: switchResult.errors };
        }
        const caseResult = (0, cases_1.migrateCase)(switchResult.migrated);
        const templateResult = (0, util_1.processNgTemplates)(caseResult.migrated, file.sourceFile);
        if (templateResult.err !== undefined) {
            return { migrated: template, errors: [{ type: 'template', error: templateResult.err }] };
        }
        migrated = templateResult.migrated;
        const changed = ifResult.changed || forResult.changed || switchResult.changed || caseResult.changed;
        if (changed) {
            // determine if migrated template is a valid structure
            // if it is not, fail out
            const errors = (0, util_1.validateMigratedTemplate)(migrated, file.sourceFile.fileName);
            if (errors.length > 0) {
                return { migrated: template, errors };
            }
        }
        if (format && changed) {
            migrated = (0, util_1.formatTemplate)(migrated, templateType);
        }
        const markerRegex = new RegExp(`${types_1.startMarker}|${types_1.endMarker}|${types_1.startI18nMarker}|${types_1.endI18nMarker}`, 'gm');
        migrated = migrated.replace(markerRegex, '');
        file.removeCommonModule = (0, util_1.canRemoveCommonModule)(template);
        file.canRemoveImports = true;
        // when migrating an external template, we have to pass back
        // whether it's safe to remove the CommonModule to the
        // original component class source file
        if (templateType === 'templateUrl' &&
            analyzedFiles !== null &&
            analyzedFiles.has(file.sourceFile.fileName)) {
            const componentFile = analyzedFiles.get(file.sourceFile.fileName);
            componentFile.getSortedRanges();
            // we have already checked the template file to see if it is safe to remove the imports
            // and common module. This check is passed off to the associated .ts file here so
            // the class knows whether it's safe to remove from the template side.
            componentFile.removeCommonModule = file.removeCommonModule;
            componentFile.canRemoveImports = file.canRemoveImports;
            // At this point, we need to verify the component class file doesn't have any other imports
            // that prevent safe removal of common module. It could be that there's an associated ngmodule
            // and in that case we can't safely remove the common module import.
            componentFile.verifyCanRemoveImports();
        }
        file.verifyCanRemoveImports();
        errors = [
            ...ifResult.errors,
            ...forResult.errors,
            ...switchResult.errors,
            ...caseResult.errors,
        ];
    }
    else if (file.canRemoveImports) {
        migrated = (0, util_1.removeImports)(template, node, file);
    }
    return { migrated, errors };
}
