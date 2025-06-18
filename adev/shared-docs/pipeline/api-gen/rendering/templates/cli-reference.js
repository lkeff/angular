"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliCommandReference = CliCommandReference;
const css_classes_1 = require("../styling/css-classes");
const cli_card_1 = require("./cli-card");
const header_cli_1 = require("./header-cli");
const raw_html_1 = require("./raw-html");
const section_heading_1 = require("./section-heading");
/** Component to render a CLI command reference document. */
function CliCommandReference(entry) {
    var _a;
    return (<div className="docs-cli">
      <div className="docs-reference-cli-content">
        <header_cli_1.HeaderCli command={entry}/>
        {[entry.name, ...entry.aliases].map((command) => (<div class="docs-code docs-reference-cli-toc">
            <pre class="docs-mini-scroll-track">
              <code>
                <div className={'shiki line cli'}>
                  ng {commandName(entry, command)}
                  {entry.argumentsLabel ? (<button member-id={'Arguments'} className="shiki-ln-line-argument">
                      {entry.argumentsLabel}
                    </button>) : (<></>)}
                  {entry.hasOptions ? (<button member-id={'Options'} className="shiki-ln-line-option">
                      [options]
                    </button>) : (<></>)}
                </div>
              </code>
            </pre>
          </div>))}
        <raw_html_1.RawHtml value={entry.htmlDescription}/>
        {entry.subcommands && ((_a = entry.subcommands) === null || _a === void 0 ? void 0 : _a.length) > 0 ? (<>
            <h3>Sub-commands</h3>
            <p>This command has the following sub-commands</p>
            <ul>
              {entry.subcommands.map((subcommand) => (<li>
                  <a href={`cli/${entry.name}/${subcommand.name}`}>{subcommand.name}</a>
                </li>))}
            </ul>
          </>) : (<></>)}
      </div>
      <div className={css_classes_1.REFERENCE_MEMBERS}>
        {entry.cards.map((card) => (<>
            <section_heading_1.SectionHeading name={card.type}/>
            <cli_card_1.CliCard card={card}/>
          </>))}
      </div>
    </div>);
}
function commandName(entry, command) {
    var _a, _b;
    if ((_a = entry.parentCommand) === null || _a === void 0 ? void 0 : _a.name) {
        return `${(_b = entry.parentCommand) === null || _b === void 0 ? void 0 : _b.name} ${command}`;
    }
    else {
        return command;
    }
}
