"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliCard = CliCard;
const deprecated_label_1 = require("./deprecated-label");
const css_classes_1 = require("../styling/css-classes");
function CliCard(props) {
    return (<div class={css_classes_1.REFERENCE_MEMBER_CARD}>
      <div className={css_classes_1.REFERENCE_MEMBER_CARD_BODY}>
        {props.card.items.map((item) => {
            var _a;
            return (<div class="docs-ref-content">
            {item.deprecated ? <deprecated_label_1.DeprecatedLabel entry={item}/> : <></>}
            <div class="docs-ref-option-and-description">
              <div class="docs-reference-option">
                <code>{item.name}</code>
                {(_a = item.aliases) === null || _a === void 0 ? void 0 : _a.map((alias) => (<div class="docs-reference-option-aliases">
                    <span>Alias</span>
                    <code>{alias} </code>
                  </div>))}
              </div>
              <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
            </div>
            <div class="docs-reference-type-and-default">
              <span>Value Type</span>
              <code>{item.type}</code>
              {/* Default Value */}
              {item.default !== undefined ? <span>Default</span> : <></>}
              {props.card.type === 'Options' && item.default !== undefined ? (<code>{item.default.toString()}</code>) : (<></>)}
            </div>
          </div>);
        })}
      </div>
    </div>);
}
