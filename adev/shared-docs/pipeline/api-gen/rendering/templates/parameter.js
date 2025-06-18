"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parameter = Parameter;
const raw_html_1 = require("./raw-html");
const css_classes_1 = require("../styling/css-classes");
const code_symbols_1 = require("./code-symbols");
/** Component to render a function or method parameter reference doc fragment. */
function Parameter(props) {
    const param = props.param;
    return (<div className={css_classes_1.PARAM_GROUP_CLASS_NAME}>
        {/*TODO: isOptional, isRestParam*/}
        <span class="docs-param-keyword">@param</span>
        <span class="docs-param-name">{param.name}</span>
        <code_symbols_1.CodeSymbol code={param.type}/>
        <raw_html_1.RawHtml value={param.htmlDescription} className="docs-parameter-description"/>
      </div>);
}
