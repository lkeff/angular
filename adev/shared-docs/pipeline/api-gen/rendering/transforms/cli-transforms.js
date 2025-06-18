"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCliRenderable = getCliRenderable;
exports.getCliCardsRenderable = getCliCardsRenderable;
const marked_1 = require("marked");
/** Given an unprocessed CLI entry, get the fully renderable CLI entry. */
function getCliRenderable(command) {
    var _a, _b;
    return Object.assign(Object.assign({}, command), { subcommands: (_a = command.subcommands) === null || _a === void 0 ? void 0 : _a.map((sub) => getCliRenderable(sub)), htmlDescription: marked_1.marked.parse((_b = command.longDescription) !== null && _b !== void 0 ? _b : command.shortDescription), cards: getCliCardsRenderable(command), argumentsLabel: getArgumentsLabel(command), hasOptions: getOptions(command).length > 0 });
}
function getCliCardsRenderable(command) {
    const cards = [];
    const args = getArgs(command);
    const options = getOptions(command);
    if (args.length > 0) {
        cards.push({
            type: 'Arguments',
            items: getRenderableOptions(args),
        });
    }
    if (options.length > 0) {
        cards.push({
            type: 'Options',
            items: getRenderableOptions(options),
        });
    }
    return cards;
}
function getRenderableOptions(items) {
    return items.map((option) => (Object.assign(Object.assign({}, option), { deprecated: option.deprecated ? { version: undefined } : undefined, description: marked_1.marked.parse(option.description) })));
}
function getArgumentsLabel(command) {
    const args = getArgs(command);
    if (args.length === 0) {
        return '';
    }
    return command.command.replace(`${command.name} `, '');
}
function getArgs(command) {
    return command.options.filter((options) => options.positional !== undefined);
}
function getOptions(command) {
    return command.options.filter((option) => option.positional === undefined);
}
