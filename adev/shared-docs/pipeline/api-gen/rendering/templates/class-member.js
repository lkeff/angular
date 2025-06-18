"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassMember = ClassMember;
const categorization_1 = require("../entities/categorization");
const css_classes_1 = require("../styling/css-classes");
const function_transforms_1 = require("../transforms/function-transforms");
const class_method_info_1 = require("./class-method-info");
const code_symbols_1 = require("./code-symbols");
const deprecated_label_1 = require("./deprecated-label");
const raw_html_1 = require("./raw-html");
function ClassMember(props) {
    const member = props.member;
    const renderMethod = (method) => {
        const signature = method.signatures.length ? method.signatures : [method.implementation];
        return signature.map((sig) => {
            const renderableMember = (0, function_transforms_1.getFunctionMetadataRenderable)(sig, method.moduleName, method.repo);
            return <class_method_info_1.ClassMethodInfo entry={renderableMember} options={{ showUsageNotes: true }}/>;
        });
    };
    const body = (<div className={css_classes_1.REFERENCE_MEMBER_CARD_BODY}>
      {(0, categorization_1.isClassMethodEntry)(member) ? (renderMethod(member)) : member.htmlDescription || member.deprecationMessage ? (<div className={css_classes_1.REFERENCE_MEMBER_CARD_ITEM}>
          <deprecated_label_1.DeprecatedLabel entry={member}/>
          <raw_html_1.RawHtml value={member.htmlDescription}/>
        </div>) : (<></>)}
    </div>);
    const memberName = member.name;
    const returnType = getMemberType(member);
    return (<div id={memberName} className={css_classes_1.REFERENCE_MEMBER_CARD}>
      <header className={css_classes_1.REFERENCE_MEMBER_CARD_HEADER}>
        <h3>{memberName}</h3>
        {(0, categorization_1.isClassMethodEntry)(member) && member.signatures.length > 1 ? (<span>{member.signatures.length} overloads</span>) : returnType ? (<code_symbols_1.CodeSymbol code={returnType}/>) : (<></>)}
      </header>
      {body}
    </div>);
}
function getMemberType(entry) {
    if ((0, categorization_1.isClassMethodEntry)(entry)) {
        return entry.implementation.returnType;
    }
    else if ((0, categorization_1.isPropertyEntry)(entry) || (0, categorization_1.isGetterEntry)(entry) || (0, categorization_1.isSetterEntry)(entry)) {
        return entry.type;
    }
    return null;
}
