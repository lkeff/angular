"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkerEnvironment = void 0;
const sourcemaps_1 = require("../../../src/ngtsc/sourcemaps");
const linker_options_1 = require("./linker_options");
const translator_1 = require("./translator");
class LinkerEnvironment {
    constructor(fileSystem, logger, host, factory, options) {
        this.fileSystem = fileSystem;
        this.logger = logger;
        this.host = host;
        this.factory = factory;
        this.options = options;
        this.translator = new translator_1.Translator(this.factory);
        this.sourceFileLoader = this.options.sourceMapping
            ? new sourcemaps_1.SourceFileLoader(this.fileSystem, this.logger, {})
            : null;
    }
    static create(fileSystem, logger, host, factory, options) {
        var _a, _b, _c;
        return new LinkerEnvironment(fileSystem, logger, host, factory, {
            sourceMapping: (_a = options.sourceMapping) !== null && _a !== void 0 ? _a : linker_options_1.DEFAULT_LINKER_OPTIONS.sourceMapping,
            linkerJitMode: (_b = options.linkerJitMode) !== null && _b !== void 0 ? _b : linker_options_1.DEFAULT_LINKER_OPTIONS.linkerJitMode,
            unknownDeclarationVersionHandling: (_c = options.unknownDeclarationVersionHandling) !== null && _c !== void 0 ? _c : linker_options_1.DEFAULT_LINKER_OPTIONS.unknownDeclarationVersionHandling,
        });
    }
}
exports.LinkerEnvironment = LinkerEnvironment;
