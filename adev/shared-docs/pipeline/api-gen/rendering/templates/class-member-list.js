"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassMemberList = ClassMemberList;
const class_member_1 = require("./class-member");
function ClassMemberList(props) {
    return (<div class="docs-reference-members">
      {props.members.map((member) => (<class_member_1.ClassMember member={member}/>))}
    </div>);
}
