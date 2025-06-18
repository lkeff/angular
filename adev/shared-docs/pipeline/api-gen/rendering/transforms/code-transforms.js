"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitLines = splitLines;
exports.addRenderableCodeToc = addRenderableCodeToc;
exports.mapDocEntryToCode = mapDocEntryToCode;
exports.printInitializerFunctionSignatureLine = printInitializerFunctionSignatureLine;
exports.addApiLinksToHtml = addApiLinksToHtml;
exports.makeGenericsText = makeGenericsText;
const categorization_1 = require("../entities/categorization");
const symbol_context_1 = require("../symbol-context");
const shiki_1 = require("../shiki/shiki");
const member_transforms_1 = require("./member-transforms");
const url_transforms_1 = require("./url-transforms");
/** Split generated code with syntax highlighting into single lines */
function splitLines(text) {
    if (text.length === 0) {
        return [];
    }
    return text.split(/\r\n|\r|\n/g);
}
/**
 * Based on provided docEntry:
 * 1. Build metadata
 * 2. Run syntax highlighting
 * 3. Generate list of renderable code lines.
 */
function addRenderableCodeToc(entry) {
    const metadata = mapDocEntryToCode(entry);
    appendPrefixAndSuffix(entry, metadata);
    let codeWithSyntaxHighlighting = (0, shiki_1.codeToHtml)(metadata.contents, 'typescript');
    if ((0, categorization_1.isDecoratorEntry)(entry)) {
        // Shiki requires a keyword for correct formating of Decorators
        // We use an interface and then replace it with a '@'
        codeWithSyntaxHighlighting = (0, shiki_1.replaceKeywordFromShikiHtml)('interface', codeWithSyntaxHighlighting, '@');
    }
    // shiki returns the lines wrapped by 2 node : 1 pre node, 1 code node.
    // As leveraging jsdom isn't trivial here, we rely on a regex to extract the line nodes
    const pattern = /(.*?)<code.*?>(.*?)<\/code>(.*)/s;
    const match = codeWithSyntaxHighlighting.match(pattern);
    if (!match) {
        return Object.assign(Object.assign({}, entry), { codeLinesGroups: new Map(), afterCodeGroups: '', beforeCodeGroups: '' });
    }
    const beforeCode = match[1];
    const insideCode = match[2];
    const afterCode = match[3];
    // Note: Don't expect enum value in signatures to be linked correctly
    // as skihi already splits them into separate span blocks.
    // Only the enum itself will recieve a link
    const codeWithLinks = addApiLinksToHtml(insideCode);
    const lines = splitLines(codeWithLinks);
    const groups = groupCodeLines(lines, metadata, entry);
    return Object.assign(Object.assign({}, entry), { codeLinesGroups: groups, beforeCodeGroups: beforeCode, afterCodeGroups: afterCode });
}
/** Group overloaded methods */
function groupCodeLines(lines, metadata, entry) {
    const hasSingleSignature = (0, categorization_1.isFunctionEntry)(entry) && entry.signatures.length === 1;
    return lines.reduce((groups, line, index) => {
        var _a;
        const tocItem = {
            contents: line,
            id: hasSingleSignature ? undefined : metadata.codeLineNumbersWithIdentifiers.get(index),
            isDeprecated: metadata.deprecatedLineNumbers.some((lineNumber) => lineNumber === index),
        };
        if (tocItem.id !== undefined && groups.has(tocItem.id)) {
            const group = groups.get(tocItem.id);
            group === null || group === void 0 ? void 0 : group.push(tocItem);
        }
        else {
            groups.set((_a = tocItem.id) !== null && _a !== void 0 ? _a : index.toString(), [tocItem]);
        }
        return groups;
    }, new Map());
}
function mapDocEntryToCode(entry) {
    var _a;
    const isDeprecated = (0, categorization_1.isDeprecatedEntry)(entry);
    const deprecatedLineNumbers = isDeprecated ? [0] : [];
    if ((0, categorization_1.isClassEntry)(entry)) {
        const members = (0, member_transforms_1.filterLifecycleMethods)((0, member_transforms_1.mergeGettersAndSetters)(entry.members));
        return getCodeTocData(members, true, isDeprecated);
    }
    if ((0, categorization_1.isDecoratorEntry)(entry)) {
        return getCodeTocData(entry.members, true, isDeprecated);
    }
    if ((0, categorization_1.isConstantEntry)(entry)) {
        return {
            contents: `const ${entry.name}: ${entry.type};`,
            codeLineNumbersWithIdentifiers: new Map(),
            deprecatedLineNumbers,
        };
    }
    if ((0, categorization_1.isEnumEntry)(entry)) {
        return getCodeTocData(entry.members, true, isDeprecated);
    }
    if ((0, categorization_1.isInterfaceEntry)(entry)) {
        return getCodeTocData((0, member_transforms_1.mergeGettersAndSetters)(entry.members), true, isDeprecated);
    }
    if ((0, categorization_1.isFunctionEntry)(entry)) {
        const codeLineNumbersWithIdentifiers = new Map();
        const hasSingleSignature = entry.signatures.length === 1;
        if (entry.signatures.length > 0) {
            const initialMetadata = {
                contents: '',
                codeLineNumbersWithIdentifiers: new Map(),
                deprecatedLineNumbers,
            };
            return entry.signatures.reduce((acc, curr, index) => {
                const lineNumber = index;
                acc.codeLineNumbersWithIdentifiers.set(lineNumber, `${curr.name}_${index}`);
                acc.contents += getMethodCodeLine(curr, [], hasSingleSignature, true);
                // We don't want to add line break after the last item
                if (!hasSingleSignature && index < entry.signatures.length - 1) {
                    acc.contents += '\n';
                }
                if ((0, categorization_1.isDeprecatedEntry)(curr)) {
                    acc.deprecatedLineNumbers.push(lineNumber);
                }
                return acc;
            }, initialMetadata);
        }
        return {
            // It is important to add the function keyword as shiki will only highlight valid ts
            contents: `function ${getMethodCodeLine(entry.implementation, [], true)}`,
            codeLineNumbersWithIdentifiers,
            deprecatedLineNumbers,
        };
    }
    if ((0, categorization_1.isInitializerApiFunctionEntry)(entry)) {
        const codeLineNumbersWithIdentifiers = new Map();
        const showTypesInSignaturePreview = !!((_a = entry.__docsMetadata__) === null || _a === void 0 ? void 0 : _a.showTypesInSignaturePreview);
        let lines = [];
        for (const [index, callSignature] of entry.callFunction.signatures.entries()) {
            lines.push(printInitializerFunctionSignatureLine(callSignature.name, callSignature, showTypesInSignaturePreview));
            const id = `${callSignature.name}_${index}`;
            codeLineNumbersWithIdentifiers.set(lines.length - 1, id);
        }
        if (Object.keys(entry.subFunctions).length > 0) {
            lines.push('');
            for (const [i, subFunction] of entry.subFunctions.entries()) {
                for (const [index, subSignature] of subFunction.signatures.entries()) {
                    lines.push(printInitializerFunctionSignatureLine(`${entry.name}.${subFunction.name}`, subSignature, showTypesInSignaturePreview));
                    const id = `${entry.name}_${subFunction.name}_${index}`;
                    codeLineNumbersWithIdentifiers.set(lines.length - 1, id);
                }
                if (i < entry.subFunctions.length - 1) {
                    lines.push('');
                }
            }
        }
        return {
            contents: lines.join('\n'),
            codeLineNumbersWithIdentifiers,
            deprecatedLineNumbers,
        };
    }
    if ((0, categorization_1.isTypeAliasEntry)(entry)) {
        const generics = makeGenericsText(entry.generics);
        const contents = `type ${entry.name}${generics} = ${entry.type}`;
        if (isDeprecated) {
            const numberOfLinesOfCode = getNumberOfLinesOfCode(contents);
            for (let i = 0; i < numberOfLinesOfCode; i++) {
                deprecatedLineNumbers.push(i);
            }
        }
        return {
            contents,
            codeLineNumbersWithIdentifiers: new Map(),
            deprecatedLineNumbers,
        };
    }
    return {
        contents: '',
        codeLineNumbersWithIdentifiers: new Map(),
        deprecatedLineNumbers,
    };
}
/** Generate code ToC data for list of members. */
function getCodeTocData(members, hasPrefixLine, isDeprecated) {
    const initialMetadata = {
        contents: '',
        codeLineNumbersWithIdentifiers: new Map(),
        deprecatedLineNumbers: isDeprecated ? [0] : [],
    };
    // In case when hasPrefixLine is true we should take it into account when we're generating
    // `codeLineNumbersWithIdentifiers` below.
    const skip = !!hasPrefixLine ? 1 : 0;
    let lineNumber = skip;
    return members.reduce((acc, curr, index) => {
        const setTocData = (entry, content) => {
            acc.contents += `  ${content.trim()}\n`;
            acc.codeLineNumbersWithIdentifiers.set(lineNumber, entry.name);
            if ((0, categorization_1.isDeprecatedEntry)(entry)) {
                acc.deprecatedLineNumbers.push(lineNumber);
            }
            lineNumber++;
        };
        if ((0, categorization_1.isClassMethodEntry)(curr)) {
            if (curr.signatures.length > 0) {
                curr.signatures.forEach((signature) => {
                    setTocData(signature, getMethodCodeLine(signature, curr.memberTags));
                });
            }
            else {
                setTocData(curr, getMethodCodeLine(curr.implementation, curr.memberTags));
            }
        }
        else {
            setTocData(curr, getCodeLine(curr));
        }
        return acc;
    }, initialMetadata);
}
function getCodeLine(member) {
    if ((0, categorization_1.isGetterEntry)(member)) {
        return getGetterCodeLine(member);
    }
    else if ((0, categorization_1.isSetterEntry)(member)) {
        return getSetterCodeLine(member);
    }
    return getPropertyCodeLine(member);
}
/** Map getter, setter and property entry to text */
function getPropertyCodeLine(member) {
    const isOptional = isOptionalMember(member);
    const tags = getTags(member);
    return `${tags.join(' ')} ${member.name}${markOptional(isOptional)}: ${member.type};`;
}
/** Map method entry to text */
function getMethodCodeLine(member, memberTags = [], displayParamsInNewLines = false, isFunction = false) {
    const generics = makeGenericsText(member.generics);
    displayParamsInNewLines && (displayParamsInNewLines = member.params.length > 0);
    return `${isFunction ? 'function' : ''}${memberTags.join(' ')} ${member.name}${generics}(${displayParamsInNewLines ? '\n  ' : ''}${member.params
        .map((param) => mapParamEntry(param))
        .join(`,${displayParamsInNewLines ? '\n  ' : ' '}`)}${displayParamsInNewLines ? '\n' : ''}): ${member.returnType};`.trim();
}
function mapParamEntry(entry) {
    return `${entry.isRestParam ? '...' : ''}${entry.name}${markOptional(entry.isOptional)}: ${entry.type}`;
}
function getGetterCodeLine(member) {
    const tags = getTags(member);
    return `${tags.join(' ')} get ${member.name}(): ${member.type};`;
}
function getSetterCodeLine(member) {
    const tags = getTags(member);
    return `${tags.join(' ')} set ${member.name}(value: ${member.type});`;
}
function markOptional(isOptional) {
    return isOptional ? '?' : '';
}
function isOptionalMember(member) {
    return member.memberTags.some((tag) => tag === 'optional');
}
function getTags(member) {
    return member.memberTags
        .map((tag) => {
        if (tag === 'input') {
            return !member.inputAlias || member.name === member.inputAlias
                ? '@Input()'
                : `@Input('${member.inputAlias}')`;
        }
        else if (tag === 'output') {
            return !member.outputAlias || member.name === member.outputAlias
                ? '@Output()'
                : `@Output('${member.outputAlias}')`;
        }
        else if (tag === 'optional') {
            return '';
        }
        return tag;
    })
        .filter((tag) => !!tag);
}
function getNumberOfLinesOfCode(contents) {
    return contents.split('\n').length;
}
/** Prints an initializer function signature into a single line. */
function printInitializerFunctionSignatureLine(name, signature, showTypesInSignaturePreview) {
    let res = name;
    if (signature.generics.length > 0) {
        res += '<';
        for (let i = 0; i < signature.generics.length; i++) {
            const generic = signature.generics[i];
            res += generic.name;
            if (generic.default !== undefined) {
                res += ` = ${generic.default}`;
            }
            if (i < signature.generics.length - 1) {
                res += ', ';
            }
        }
        res += '>';
    }
    res += '(';
    for (let i = 0; i < signature.params.length; i++) {
        const param = signature.params[i];
        if (param.isRestParam) {
            res += '...';
        }
        res += `${param.name}${markOptional(param.isOptional)}`;
        if (showTypesInSignaturePreview) {
            res += `: ${param.type}`;
        }
        if (i < signature.params.length - 1) {
            res += ', ';
        }
    }
    res += ')';
    if (showTypesInSignaturePreview) {
        res += `: ${signature.returnType}`;
    }
    res += ';';
    return `function ${res}`;
}
function appendPrefixAndSuffix(entry, codeTocData) {
    var _a;
    const appendFirstAndLastLines = (data, firstLine, lastLine) => {
        data.contents = `${firstLine}\n${data.contents}${lastLine}`;
    };
    if ((0, categorization_1.isClassEntry)(entry) || (0, categorization_1.isInterfaceEntry)(entry)) {
        const generics = makeGenericsText(entry.generics);
        const extendsStr = entry.extends ? ` extends ${entry.extends}` : '';
        // TODO: remove the ? when we distinguish Class & Decorator entries
        const implementsStr = ((_a = entry.implements) === null || _a === void 0 ? void 0 : _a.length) > 0 ? ` implements ${entry.implements.join(' ,')}` : '';
        const signature = `${entry.name}${generics}${extendsStr}${implementsStr}`;
        if ((0, categorization_1.isClassEntry)(entry)) {
            const abstractPrefix = entry.isAbstract ? 'abstract ' : '';
            appendFirstAndLastLines(codeTocData, `${abstractPrefix}class ${signature} {`, `}`);
        }
        if ((0, categorization_1.isInterfaceEntry)(entry)) {
            appendFirstAndLastLines(codeTocData, `interface ${signature} {`, `}`);
        }
    }
    if ((0, categorization_1.isEnumEntry)(entry)) {
        appendFirstAndLastLines(codeTocData, `enum ${entry.name} {`, `}`);
    }
    if ((0, categorization_1.isDecoratorEntry)(entry)) {
        appendFirstAndLastLines(codeTocData, `interface ${entry.name} ({`, `})`);
    }
}
/**
 * Replaces any code block that isn't already wrapped by an anchor element
 * by a link if the symbol is known
 */
function addApiLinksToHtml(htmlString) {
    const result = htmlString.replace(
    // This regex looks for span/code blocks not wrapped by an anchor block
    // or the tag doesn't contain `data-skip-anchor` attribute.
    // Their content are then replaced with a link if the symbol is known
    //                                         The captured content ==>  vvvvvvvv
    /(?<!<a[^>]*>)(<(?:(?:span)|(?:code))(?!\sdata-skip-anchor)[^>]*>\s*)([^<]*?)(\s*<\/(?:span|code)>)/g, (type, span1, potentialSymbolName, span2) => {
        let [symbol, subSymbol] = potentialSymbolName.split(/(?:#|\.)/);
        // mySymbol() => mySymbol
        const symbolWithoutInvocation = symbol.replace(/\([^)]*\);?/g, '');
        const moduleName = (0, symbol_context_1.getModuleName)(symbolWithoutInvocation);
        if (moduleName) {
            return `${span1}<a href="${(0, url_transforms_1.getLinkToModule)(moduleName, symbol, subSymbol)}">${potentialSymbolName}</a>${span2}`;
        }
        return type;
    });
    return result;
}
/**
 * Constructs a TypeScript generics string based on an array of generic type entries.
 *
 * This function takes an array of generic type entries and returns a formatted string
 * representing TypeScript generics syntax, including any constraints and default values
 * specified in each entry.
 *
 * @param generics - An array of `GenericEntry` objects representing the generics to be formatted,
 *                   or `undefined` if there are no generics.
 *
 * @returns A formatted string representing TypeScript generics syntax, or an empty string if no generics are provided.
 */
function makeGenericsText(generics) {
    if (!(generics === null || generics === void 0 ? void 0 : generics.length)) {
        return '';
    }
    const parts = ['<'];
    for (let index = 0; index < generics.length; index++) {
        const { constraint, default: defaultVal, name } = generics[index];
        parts.push(name);
        if (constraint) {
            parts.push(' extends ', constraint);
        }
        if (defaultVal !== undefined) {
            parts.push(' = ', defaultVal);
        }
        if (index < generics.length - 1) {
            parts.push(', ');
        }
    }
    parts.push('>');
    return parts.join('');
}
