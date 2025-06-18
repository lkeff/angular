"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.docsVideoExtension = void 0;
// Capture group 1: all attributes on the opening tag
const videoRule = /^<docs-video([^>]*)\/>/s;
const srcRule = /src="([^"]*)"/;
const titleRule = /title="([^"]*)"/;
const validYTUrlPrefix = 'https://www.youtube.com/embed/';
exports.docsVideoExtension = {
    name: 'docs-video',
    level: 'block',
    start(src) {
        var _a;
        return (_a = src.match(/^\s*<docs-video/m)) === null || _a === void 0 ? void 0 : _a.index;
    },
    tokenizer(src) {
        const match = videoRule.exec(src);
        if (match) {
            const attr = match[1].trim();
            const src = srcRule.exec(attr);
            const title = titleRule.exec(attr);
            if (src !== null) {
                return {
                    type: 'docs-video',
                    raw: match[0],
                    src: src[1],
                    title: title === null || title === void 0 ? void 0 : title[1],
                };
            }
        }
        return undefined;
    },
    renderer(token) {
        if (!token.src.startsWith(validYTUrlPrefix)) {
            process.stdout.write(`<docs-video> cannot load: ${token.src}. YouTube Player API expects src to begin with ${validYTUrlPrefix}.\n`);
        }
        return `
    <div class="docs-video-container">
      <iframe
      class="docs-video"
      src="${token.src}"
      ${token.title ? `title="${token.title}"` : ''}
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      credentialless
      title="Video player"
      ></iframe>
    </div>
    `;
    },
};
