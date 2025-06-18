"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeProgramFromGraph = makeProgramFromGraph;
exports.importPath = importPath;
const file_system_1 = require("../../file_system");
const testing_1 = require("../../testing");
/**
 * Construct a TS program consisting solely of an import graph, from a string-based representation
 * of the graph.
 *
 * The `graph` string consists of semicolon separated files, where each file is specified
 * as a name and (optionally) a list of comma-separated imports or exports. For example:
 *
 * "a:b,c;b;c"
 *
 * specifies a program with three files (a.ts, b.ts, c.ts) where a.ts imports from both b.ts and
 * c.ts.
 *
 * A more complicated example has a dependency from b.ts to c.ts: "a:b,c;b:c;c".
 *
 * A * preceding a file name in the list of imports indicates that the dependency should be an
 * "export" and not an "import" dependency. For example:
 *
 * "a:*b,c;b;c"
 *
 * represents a program where a.ts exports from b.ts and imports from c.ts.
 *
 * An import can be suffixed with ! to make it a type-only import.
 */
function makeProgramFromGraph(fs, graph) {
    const files = graph.split(';').map((fileSegment) => {
        const [name, importList] = fileSegment.split(':');
        const contents = (importList ? importList.split(',') : [])
            .map((i) => {
            if (i.startsWith('*')) {
                const sym = i.slice(1);
                return `export {${sym}} from './${sym}';`;
            }
            else if (i.endsWith('!')) {
                const sym = i.slice(0, -1);
                return `import type {${sym}} from './${sym}';`;
            }
            else {
                return `import {${i}} from './${i}';`;
            }
        })
            .join('\n') + `export const ${name} = '${name}';\n`;
        return {
            name: fs.resolve(`/${name}.ts`),
            contents,
        };
    });
    return (0, testing_1.makeProgram)(files);
}
function importPath(files) {
    const fs = (0, file_system_1.getFileSystem)();
    return files.map((sf) => fs.basename(sf.fileName).replace('.ts', '')).join(',');
}
