"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultLinkerPlugin = defaultLinkerPlugin;
const file_system_1 = require("../../../src/ngtsc/file_system");
const logging_1 = require("../../../src/ngtsc/logging");
const es2015_linker_plugin_1 = require("./es2015_linker_plugin");
/**
 * This is the Babel plugin definition that is provided as a default export from the package, such
 * that the plugin can be used using the module specifier of the package. This is the recommended
 * way of integrating the Angular Linker into a build pipeline other than the Angular CLI.
 *
 * When the module specifier `@angular/compiler-cli/linker/babel` is used as a plugin in a Babel
 * configuration, Babel invokes this function (by means of the default export) to create the plugin
 * instance according to the provided options.
 *
 * The linker plugin that is created uses the native NodeJS filesystem APIs to interact with the
 * filesystem. Any logging output is printed to the console.
 *
 * @param api Provides access to the Babel environment that is configuring this plugin.
 * @param options The plugin options that have been configured.
 */
function defaultLinkerPlugin(api, options) {
    api.assertVersion(7);
    return (0, es2015_linker_plugin_1.createEs2015LinkerPlugin)(Object.assign(Object.assign({}, options), { fileSystem: new file_system_1.NodeJSFileSystem(), logger: new logging_1.ConsoleLogger(logging_1.LogLevel.info) }));
}
