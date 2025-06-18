"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Translator = void 0;
/**
 * Translate each file (e.g. source file or static asset) using the given `TranslationHandler`s.
 * The file will be translated by the first handler that returns true for `canTranslate()`.
 */
class Translator {
    constructor(fs, resourceHandlers, diagnostics) {
        this.fs = fs;
        this.resourceHandlers = resourceHandlers;
        this.diagnostics = diagnostics;
    }
    translateFiles(inputPaths, rootPath, outputPathFn, translations, sourceLocale) {
        inputPaths.forEach((inputPath) => {
            const absInputPath = this.fs.resolve(rootPath, inputPath);
            const contents = this.fs.readFileBuffer(absInputPath);
            const relativePath = this.fs.relative(rootPath, absInputPath);
            for (const resourceHandler of this.resourceHandlers) {
                if (resourceHandler.canTranslate(relativePath, contents)) {
                    return resourceHandler.translate(this.diagnostics, rootPath, relativePath, contents, outputPathFn, translations, sourceLocale);
                }
            }
            this.diagnostics.error(`Unable to handle resource file: ${inputPath}`);
        });
    }
}
exports.Translator = Translator;
