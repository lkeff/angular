"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderApi = HeaderApi;
const entities_1 = require("../entities");
const css_classes_1 = require("../styling/css-classes");
const docs_pill_row_1 = require("./docs-pill-row");
/** Component to render a header of the API page. */
function HeaderApi(props) {
    const entry = props.entry;
    // TODO: This link point to the main branch.
    // When ADEV is not deployed on the main branch branch anymore,
    // We should update it to point to the tag of the released version which ADEV runs on.
    const sourceUrl = sourceUrlForEntry(entry);
    return (<header className={css_classes_1.HEADER_CLASS_NAME}>
      <span className={css_classes_1.HEADER_ENTRY_CATEGORY}>{entry.moduleName}</span>

      <div className={css_classes_1.HEADER_ENTRY_TITLE}>
        <div>
          <h1>{entry.name}</h1>
          <div className={`${css_classes_1.HEADER_ENTRY_LABEL} type-${entry.entryType.toLowerCase()} full`}>
            {getEntryTypeDisplayName(entry.entryType)}
          </div>
          {statusTag(entry)}
          {entry.entryType === entities_1.EntryType.Pipe && !entry.isPure && (<div className={`${css_classes_1.HEADER_ENTRY_LABEL} type-impure-pipe full`}>Impure</div>)}
        </div>
        {sourceUrl && (<a class="docs-github-links" target="_blank" href={sourceUrl} title="View source" aria-label="View source">
            <i role="presentation" aria-hidden="true" class="material-symbols-outlined">
              code
            </i>
          </a>)}
      </div>

      <section className={'docs-reference-description'} dangerouslySetInnerHTML={{
            __html: props.showFullDescription ? entry.htmlDescription : entry.shortHtmlDescription,
        }}></section>

      <docs_pill_row_1.DocsPillRow links={entry.additionalLinks}/>
    </header>);
}
function statusTag(entry) {
    let tag = null;
    // Cascading Deprecated > Stable > Developer Preview > Experimental
    if (entry.deprecated) {
        tag = (<div className={`${css_classes_1.HEADER_ENTRY_LABEL} type-stable full`}>
        {tagInVersionString('deprecated', entry.deprecated)}
      </div>);
    }
    else if (entry.stable) {
        tag = (<div className={`${css_classes_1.HEADER_ENTRY_LABEL} type-stable full`}>
        {tagInVersionString('stable', entry.stable)}
      </div>);
    }
    else if (entry.developerPreview) {
        tag = (<div className={`${css_classes_1.HEADER_ENTRY_LABEL} type-developer_preview full`}>
        <a href="/reference/releases#developer-preview">
          {tagInVersionString('developer preview', entry.developerPreview)}
        </a>
      </div>);
    }
    else if (entry.experimental) {
        tag = (<div className={`${css_classes_1.HEADER_ENTRY_LABEL} type-experimental full`}>
        <a href="/reference/releases#experimental">
          {tagInVersionString('experimental', entry.experimental)}
        </a>
      </div>);
    }
    return tag;
}
function tagInVersionString(label, tag) {
    if (tag === null || tag === void 0 ? void 0 : tag.version) {
        return (<>
        <span className="status-label">{label}</span>
        <span className="status-version">since v{tag.version}</span>
      </>);
    }
    return <>{label}</>;
}
function tagInVersionTooltip(label, tag) {
    return (tag === null || tag === void 0 ? void 0 : tag.version) ? `${label} since ${tag.version}` : label;
}
function getEntryTypeDisplayName(entryType) {
    switch (entryType) {
        case entities_1.EntryType.NgModule:
            return 'NgModule';
        case entities_1.EntryType.TypeAlias:
            return 'Type Alias';
        case entities_1.EntryType.UndecoratedClass:
            return 'Class';
        case entities_1.EntryType.InitializerApiFunction:
            return 'Initializer API';
    }
    return entryType;
}
function sourceUrlForEntry(entry) {
    if (!(0, entities_1.isDocEntryWithSourceInfo)(entry)) {
        return null;
    }
    if (entry.source.filePath.includes('node_modules')) {
        // We don't know the source path in external repos link the CLI
        return null;
    }
    else {
        const filePath = entry.source.filePath.replace(/^\//, '');
        return `https://github.com/${entry.repo}/blob/main/${filePath}#L${entry.source.startLine}-L${entry.source.endLine}`;
    }
}
