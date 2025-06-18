"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeLineGroup = CodeLineGroup;
const code_line_1 = require("./code-line");
function CodeLineGroup(props) {
    if (props.lines.length > 1) {
        return (<div class="shiki-ln-group">
        {props.lines.map(line => <code_line_1.CodeLine line={line}/>)}
      </div>);
    }
    else {
        return <code_line_1.CodeLine line={props.lines[0]}/>;
    }
}
