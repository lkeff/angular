"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderCli = HeaderCli;
const css_classes_1 = require("../styling/css-classes");
/** Component to render a header of the CLI page. */
function HeaderCli(props) {
    var _a;
    const command = props.command;
    return (<header className={css_classes_1.HEADER_CLASS_NAME}>
      <span className={css_classes_1.HEADER_ENTRY_CATEGORY}>CLI</span>

      <div className={css_classes_1.HEADER_ENTRY_TITLE}>
        <div>
          <h1>{(_a = command.parentCommand) === null || _a === void 0 ? void 0 : _a.name} {command.name}</h1>
          <div className={`${css_classes_1.HEADER_ENTRY_LABEL} type-command full`}>{'Command'}</div>
        </div>
      </div>
    </header>);
}
