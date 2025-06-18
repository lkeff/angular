"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDollarAny = isDollarAny;
exports.createDollarAnyQuickInfo = createDollarAnyQuickInfo;
exports.createNgTemplateQuickInfo = createNgTemplateQuickInfo;
exports.createQuickInfoForBuiltIn = createQuickInfoForBuiltIn;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const compiler_1 = require("@angular/compiler");
const display_parts_1 = require("./utils/display_parts");
const utils_1 = require("./utils");
function isDollarAny(node) {
    return (node instanceof compiler_1.Call &&
        node.receiver instanceof compiler_1.PropertyRead &&
        node.receiver.receiver instanceof compiler_1.ImplicitReceiver &&
        !(node.receiver.receiver instanceof compiler_1.ThisReceiver) &&
        node.receiver.name === '$any' &&
        node.args.length === 1);
}
function createDollarAnyQuickInfo(node) {
    return (0, utils_1.createQuickInfo)('$any', display_parts_1.DisplayInfoKind.METHOD, (0, utils_1.getTextSpanOfNode)(node.receiver), 
    /** containerName */ undefined, 'any', [
        {
            kind: display_parts_1.SYMBOL_TEXT,
            text: 'function to cast an expression to the `any` type',
        },
    ]);
}
// TODO(atscott): Create special `ts.QuickInfo` for `ng-template` and `ng-container` as well.
function createNgTemplateQuickInfo(node) {
    return (0, utils_1.createQuickInfo)('ng-template', display_parts_1.DisplayInfoKind.TEMPLATE, (0, utils_1.getTextSpanOfNode)(node), 
    /** containerName */ undefined, 
    /** type */ undefined, [
        {
            kind: display_parts_1.SYMBOL_TEXT,
            text: 'The `<ng-template>` is an Angular element for rendering HTML. It is never displayed directly.',
        },
    ]);
}
function createQuickInfoForBuiltIn(node, cursorPositionInTemplate) {
    var _a, _b;
    let partSpan;
    if (node instanceof compiler_1.TmplAstDeferredTrigger) {
        if (node.prefetchSpan !== null && (0, utils_1.isWithin)(cursorPositionInTemplate, node.prefetchSpan)) {
            partSpan = node.prefetchSpan;
        }
        else if (node.hydrateSpan && (0, utils_1.isWithin)(cursorPositionInTemplate, node.hydrateSpan)) {
            partSpan = node.hydrateSpan;
        }
        else if (node.whenOrOnSourceSpan !== null &&
            (0, utils_1.isWithin)(cursorPositionInTemplate, node.whenOrOnSourceSpan)) {
            partSpan = node.whenOrOnSourceSpan;
        }
        else if (node.nameSpan !== null && (0, utils_1.isWithin)(cursorPositionInTemplate, node.nameSpan)) {
            partSpan = node.nameSpan;
        }
        else {
            return undefined;
        }
    }
    else {
        if (node instanceof compiler_1.TmplAstDeferredBlock ||
            node instanceof compiler_1.TmplAstDeferredBlockError ||
            node instanceof compiler_1.TmplAstDeferredBlockLoading ||
            node instanceof compiler_1.TmplAstDeferredBlockPlaceholder ||
            (node instanceof compiler_1.TmplAstForLoopBlockEmpty &&
                (0, utils_1.isWithin)(cursorPositionInTemplate, node.nameSpan))) {
            partSpan = node.nameSpan;
        }
        else if (node instanceof compiler_1.TmplAstForLoopBlock &&
            (0, utils_1.isWithin)(cursorPositionInTemplate, node.trackKeywordSpan)) {
            partSpan = node.trackKeywordSpan;
        }
        else {
            return undefined;
        }
    }
    const partName = partSpan.toString().trim();
    const partInfo = BUILT_IN_NAMES_TO_DOC_MAP[partName];
    const linkTags = ((_a = partInfo === null || partInfo === void 0 ? void 0 : partInfo.links) !== null && _a !== void 0 ? _a : []).map((text) => ({
        text: [{ kind: display_parts_1.SYMBOL_TEXT, text }],
        name: 'see',
    }));
    return (0, utils_1.createQuickInfo)(partName, partInfo.displayInfoKind, (0, utils_1.toTextSpan)(partSpan), 
    /** containerName */ undefined, 
    /** type */ undefined, [
        {
            kind: display_parts_1.SYMBOL_TEXT,
            text: (_b = partInfo === null || partInfo === void 0 ? void 0 : partInfo.docString) !== null && _b !== void 0 ? _b : '',
        },
    ], linkTags);
}
const triggerDescriptionPreamble = 'A trigger to start loading the defer content after ';
const BUILT_IN_NAMES_TO_DOC_MAP = {
    '@defer': {
        docString: `A type of block that can be used to defer load the JavaScript for components, directives and pipes used inside a component template.`,
        links: ['[Reference](https://angular.dev/guide/defer#defer)'],
        displayInfoKind: display_parts_1.DisplayInfoKind.BLOCK,
    },
    '@placeholder': {
        docString: `A block for content shown prior to defer loading (Optional)`,
        links: ['[Reference](https://angular.dev/guide/defer#placeholder)'],
        displayInfoKind: display_parts_1.DisplayInfoKind.BLOCK,
    },
    '@error': {
        docString: `A block for content shown when defer loading errors occur (Optional)`,
        links: ['[Reference](https://angular.dev/guide/defer#error)'],
        displayInfoKind: display_parts_1.DisplayInfoKind.BLOCK,
    },
    '@loading': {
        docString: `A block for content shown during defer loading (Optional)`,
        links: ['[Reference](https://angular.dev/guide/defer#loading)'],
        displayInfoKind: display_parts_1.DisplayInfoKind.BLOCK,
    },
    '@empty': {
        docString: `A block to display when the for loop variable is empty.`,
        links: [
            '[Reference](https://angular.dev/guide/templates/control-flow#providing-a-fallback-for-for-blocks-with-the-empty-block)',
        ],
        displayInfoKind: display_parts_1.DisplayInfoKind.BLOCK,
    },
    'track': {
        docString: `Keyword to control how the for loop compares items in the list to compute updates.`,
        links: [
            '[Reference](https://angular.dev/guide/templates/control-flow#why-is-track-in-for-blocks-important)',
        ],
        displayInfoKind: display_parts_1.DisplayInfoKind.KEYWORD,
    },
    'idle': {
        docString: triggerDescriptionPreamble + `the browser reports idle state (default).`,
        links: ['[Reference](https://angular.dev/guide/defer#on-idle)'],
        displayInfoKind: display_parts_1.DisplayInfoKind.TRIGGER,
    },
    'immediate': {
        docString: triggerDescriptionPreamble + `the page finishes rendering.`,
        links: ['[Reference](https://angular.dev/guide/defer#on-immediate)'],
        displayInfoKind: display_parts_1.DisplayInfoKind.TRIGGER,
    },
    'hover': {
        docString: triggerDescriptionPreamble + `the element has been hovered.`,
        links: ['[Reference](https://angular.dev/guide/defer#on-hover)'],
        displayInfoKind: display_parts_1.DisplayInfoKind.TRIGGER,
    },
    'timer': {
        docString: triggerDescriptionPreamble + `a specific timeout.`,
        links: ['[Reference](https://angular.dev/guide/defer#on-timer)'],
        displayInfoKind: display_parts_1.DisplayInfoKind.TRIGGER,
    },
    'interaction': {
        docString: triggerDescriptionPreamble + `the element is clicked, touched, or focused.`,
        links: ['[Reference](https://angular.dev/guide/defer#on-interaction)'],
        displayInfoKind: display_parts_1.DisplayInfoKind.TRIGGER,
    },
    'viewport': {
        docString: triggerDescriptionPreamble + `the element enters the viewport.`,
        links: ['[Reference](https://angular.dev/guide/defer#on-viewport)'],
        displayInfoKind: display_parts_1.DisplayInfoKind.TRIGGER,
    },
    'prefetch': {
        docString: 'Keyword that indicates that the trigger configures when prefetching the defer block contents should start. You can use `on` and `when` conditions as prefetch triggers.',
        links: ['[Reference](https://angular.dev/guide/defer#prefetching)'],
        displayInfoKind: display_parts_1.DisplayInfoKind.KEYWORD,
    },
    'hydrate': {
        docString: "Keyword that indicates when the block's content will be hydrated. You can use `on` and `when` conditions as hydration triggers, or `hydrate never` to disable hydration for this block.",
        // TODO(crisbeto): add link to partial hydration guide
        links: [],
        displayInfoKind: display_parts_1.DisplayInfoKind.KEYWORD,
    },
    'when': {
        docString: 'Keyword that starts the expression-based trigger section. Should be followed by an expression that returns a boolean.',
        links: ['[Reference](https://angular.dev/guide/defer#triggers)'],
        displayInfoKind: display_parts_1.DisplayInfoKind.KEYWORD,
    },
    'on': {
        docString: 'Keyword that starts the event-based trigger section. Should be followed by one of the built-in triggers.',
        links: ['[Reference](https://angular.dev/guide/defer#triggers)'],
        displayInfoKind: display_parts_1.DisplayInfoKind.KEYWORD,
    },
};
