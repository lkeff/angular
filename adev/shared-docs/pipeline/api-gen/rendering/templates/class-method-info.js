"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassMethodInfo = ClassMethodInfo;
const css_classes_1 = require("../styling/css-classes");
const deprecated_label_1 = require("./deprecated-label");
const parameter_1 = require("./parameter");
const raw_html_1 = require("./raw-html");
const code_symbols_1 = require("./code-symbols");
/**
 * Component to render the method-specific parts of a class's API reference.
 */
function ClassMethodInfo(props) {
    var _a;
    const entry = props.entry;
    return (<div className={`${css_classes_1.REFERENCE_MEMBER_CARD_ITEM} ${entry.deprecated ? 'docs-reference-card-item-deprecated' : ''}`}>
      <raw_html_1.RawHtml value={entry.htmlDescription} className={'docs-function-definition'}/>
      {/* In case when method is overloaded we need to indicate which overload is deprecated */}
      {entry.deprecated ? (<div>
          <deprecated_label_1.DeprecatedLabel entry={entry}/>
        </div>) : (<></>)}
      {entry.params.map((param) => (<parameter_1.Parameter param={param}/>))}
      <div className={'docs-return-type'}>
        <span className={css_classes_1.PARAM_KEYWORD_CLASS_NAME}>@returns</span>
        <code_symbols_1.CodeSymbol code={entry.returnType}/>
      </div>
      {entry.htmlUsageNotes && ((_a = props.options) === null || _a === void 0 ? void 0 : _a.showUsageNotes) ? (<div className={'docs-usage-notes'}>
          <span className={css_classes_1.PARAM_KEYWORD_CLASS_NAME}>Usage notes</span>
          <raw_html_1.RawHtml value={entry.htmlUsageNotes}/>
        </div>) : (<></>)}
    </div>);
}
