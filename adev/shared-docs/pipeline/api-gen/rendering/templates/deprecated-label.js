"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeprecatedLabel = DeprecatedLabel;
const css_classes_1 = require("../styling/css-classes");
function DeprecatedLabel(props) {
    const entry = props.entry;
    if ('deprecationMessage' in entry && entry.deprecationMessage !== null) {
        return (<div className={'docs-deprecation-message'}>
        <span className={`${css_classes_1.PARAM_KEYWORD_CLASS_NAME} docs-deprecated`}>@deprecated</span>
        <span dangerouslySetInnerHTML={{ __html: entry.deprecationMessage }}></span>
      </div>);
    }
    else if ('isDeprecated' in entry && entry.isDeprecated) {
        return <span className={`${css_classes_1.PARAM_KEYWORD_CLASS_NAME} docs-deprecated`}>@deprecated</span>;
    }
    return <></>;
}
