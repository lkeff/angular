"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOutputPathFn = getOutputPathFn;
/**
 * Create a function that will compute the absolute path to where a translated file should be
 * written.
 *
 * The special `{{LOCALE}}` marker will be replaced with the locale code of the current translation.
 * @param outputFolder An absolute path to the folder containing this set of translations.
 */
function getOutputPathFn(fs, outputFolder) {
    const [pre, post] = outputFolder.split('{{LOCALE}}');
    return post === undefined
        ? (_locale, relativePath) => fs.join(pre, relativePath)
        : (locale, relativePath) => fs.join(pre + locale + post, relativePath);
}
