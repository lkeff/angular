"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterLifecycleMethods = filterLifecycleMethods;
exports.mergeGettersAndSetters = mergeGettersAndSetters;
exports.addRenderableMembers = addRenderableMembers;
const entities_1 = require("../entities");
const categorization_1 = require("../entities/categorization");
const jsdoc_transforms_1 = require("./jsdoc-transforms");
const module_name_1 = require("./module-name");
const repo_1 = require("./repo");
const lifecycleMethods = [
    'ngAfterContentChecked',
    'ngAfterContentChecked',
    'ngAfterContentInit',
    'ngAfterViewChecked',
    'ngAfterViewChecked',
    'ngAfterViewInit',
    'ngDoCheck',
    'ngDoCheck',
    'ngOnChanges',
    'ngOnDestroy',
    'ngOnInit',
];
/** Gets a list of members with Angular lifecycle methods removed. */
function filterLifecycleMethods(members) {
    return members.filter((m) => !lifecycleMethods.includes(m.name));
}
/** Merges getter and setter entries with the same name into a single entry. */
function mergeGettersAndSetters(members) {
    const getters = new Set();
    const setters = new Set();
    // Note all getter and setter names for the class.
    for (const member of members) {
        if (member.memberType === entities_1.MemberType.Getter)
            getters.add(member.name);
        if (member.memberType === entities_1.MemberType.Setter)
            setters.add(member.name);
    }
    // Mark getter-only members as `readonly`.
    for (const member of members) {
        if (member.memberType === entities_1.MemberType.Getter && !setters.has(member.name)) {
            member.memberType = entities_1.MemberType.Property;
            member.memberTags.push(entities_1.MemberTags.Readonly);
        }
    }
    // Filter out setters that have a corresponding getter.
    return members.filter((member) => member.memberType !== entities_1.MemberType.Setter || !getters.has(member.name));
}
function addRenderableMembers(entry) {
    const members = entry.members
        .filter((member) => !(0, categorization_1.isHiddenEntry)(member))
        .map((member) => (0, jsdoc_transforms_1.setEntryFlags)((0, jsdoc_transforms_1.addHtmlDescription)((0, jsdoc_transforms_1.addHtmlUsageNotes)((0, jsdoc_transforms_1.addHtmlJsDocTagComments)((0, repo_1.addRepo)((0, module_name_1.addModuleName)(member, entry.moduleName), entry.repo))))));
    return Object.assign(Object.assign({}, entry), { members });
}
