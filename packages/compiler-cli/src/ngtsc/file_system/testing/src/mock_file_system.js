"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymLink = exports.MockFileSystem = void 0;
exports.isFile = isFile;
exports.isSymLink = isSymLink;
exports.isFolder = isFolder;
const helpers_1 = require("../../src/helpers");
/**
 * An in-memory file system that can be used in unit tests.
 */
class MockFileSystem {
    constructor(_isCaseSensitive = false, cwd = '/') {
        this._isCaseSensitive = _isCaseSensitive;
        this._fileTree = {};
        this._cwd = this.normalize(cwd);
    }
    isCaseSensitive() {
        return this._isCaseSensitive;
    }
    exists(path) {
        return this.findFromPath(path).entity !== null;
    }
    readFile(path) {
        const { entity } = this.findFromPath(path);
        if (isFile(entity)) {
            return entity.toString();
        }
        else {
            throw new MockFileSystemError('ENOENT', path, `File "${path}" does not exist.`);
        }
    }
    readFileBuffer(path) {
        const { entity } = this.findFromPath(path);
        if (isFile(entity)) {
            return entity instanceof Uint8Array ? entity : new Buffer(entity);
        }
        else {
            throw new MockFileSystemError('ENOENT', path, `File "${path}" does not exist.`);
        }
    }
    writeFile(path, data, exclusive = false) {
        const [folderPath, basename] = this.splitIntoFolderAndFile(path);
        const { entity } = this.findFromPath(folderPath);
        if (entity === null || !isFolder(entity)) {
            throw new MockFileSystemError('ENOENT', path, `Unable to write file "${path}". The containing folder does not exist.`);
        }
        if (exclusive && entity[basename] !== undefined) {
            throw new MockFileSystemError('EEXIST', path, `Unable to exclusively write file "${path}". The file already exists.`);
        }
        entity[basename] = data;
    }
    removeFile(path) {
        const [folderPath, basename] = this.splitIntoFolderAndFile(path);
        const { entity } = this.findFromPath(folderPath);
        if (entity === null || !isFolder(entity)) {
            throw new MockFileSystemError('ENOENT', path, `Unable to remove file "${path}". The containing folder does not exist.`);
        }
        if (isFolder(entity[basename])) {
            throw new MockFileSystemError('EISDIR', path, `Unable to remove file "${path}". The path to remove is a folder.`);
        }
        delete entity[basename];
    }
    symlink(target, path) {
        const [folderPath, basename] = this.splitIntoFolderAndFile(path);
        const { entity } = this.findFromPath(folderPath);
        if (entity === null || !isFolder(entity)) {
            throw new MockFileSystemError('ENOENT', path, `Unable to create symlink at "${path}". The containing folder does not exist.`);
        }
        entity[basename] = new SymLink(target);
    }
    readdir(path) {
        const { entity } = this.findFromPath(path);
        if (entity === null) {
            throw new MockFileSystemError('ENOENT', path, `Unable to read directory "${path}". It does not exist.`);
        }
        if (isFile(entity)) {
            throw new MockFileSystemError('ENOTDIR', path, `Unable to read directory "${path}". It is a file.`);
        }
        return Object.keys(entity);
    }
    lstat(path) {
        const { entity } = this.findFromPath(path);
        if (entity === null) {
            throw new MockFileSystemError('ENOENT', path, `File "${path}" does not exist.`);
        }
        return new MockFileStats(entity);
    }
    stat(path) {
        const { entity } = this.findFromPath(path, { followSymLinks: true });
        if (entity === null) {
            throw new MockFileSystemError('ENOENT', path, `File "${path}" does not exist.`);
        }
        return new MockFileStats(entity);
    }
    copyFile(from, to) {
        this.writeFile(to, this.readFile(from));
    }
    moveFile(from, to) {
        this.writeFile(to, this.readFile(from));
        const result = this.findFromPath((0, helpers_1.dirname)(from));
        const folder = result.entity;
        const name = (0, helpers_1.basename)(from);
        delete folder[name];
    }
    ensureDir(path) {
        const segments = this.splitPath(path).map((segment) => this.getCanonicalPath(segment));
        // Convert the root folder to a canonical empty string `''` (on Windows it would be `'C:'`).
        segments[0] = '';
        if (segments.length > 1 && segments[segments.length - 1] === '') {
            // Remove a trailing slash (unless the path was only `/`)
            segments.pop();
        }
        let current = this._fileTree;
        for (const segment of segments) {
            if (isFile(current[segment])) {
                throw new Error(`Folder already exists as a file.`);
            }
            if (!current[segment]) {
                current[segment] = {};
            }
            current = current[segment];
        }
        return current;
    }
    removeDeep(path) {
        const [folderPath, basename] = this.splitIntoFolderAndFile(path);
        const { entity } = this.findFromPath(folderPath);
        if (entity === null || !isFolder(entity)) {
            throw new MockFileSystemError('ENOENT', path, `Unable to remove folder "${path}". The containing folder does not exist.`);
        }
        delete entity[basename];
    }
    isRoot(path) {
        return this.dirname(path) === path;
    }
    extname(path) {
        const match = /.+(\.[^.]*)$/.exec(path);
        return match !== null ? match[1] : '';
    }
    realpath(filePath) {
        const result = this.findFromPath(filePath, { followSymLinks: true });
        if (result.entity === null) {
            throw new MockFileSystemError('ENOENT', filePath, `Unable to find the real path of "${filePath}". It does not exist.`);
        }
        else {
            return result.path;
        }
    }
    pwd() {
        return this._cwd;
    }
    chdir(path) {
        this._cwd = this.normalize(path);
    }
    getDefaultLibLocation() {
        // Mimic the node module resolution algorithm and start in the current directory, then look
        // progressively further up the tree until reaching the FS root.
        // E.g. if the current directory is /foo/bar, look in /foo/bar/node_modules, then
        // /foo/node_modules, then /node_modules.
        let path = 'node_modules/typescript/lib';
        let resolvedPath = this.resolve(path);
        // Construct a path for the top-level node_modules to identify the stopping point.
        const topLevelNodeModules = this.resolve('/' + path);
        while (resolvedPath !== topLevelNodeModules) {
            if (this.exists(resolvedPath)) {
                return resolvedPath;
            }
            // Not here, look one level higher.
            path = '../' + path;
            resolvedPath = this.resolve(path);
        }
        // The loop exits before checking the existence of /node_modules/typescript at the top level.
        // This is intentional - if no /node_modules/typescript exists anywhere in the tree, there's
        // nothing this function can do about it, and TS may error later if it looks for a lib.d.ts file
        // within this directory. It might be okay, though, if TS never checks for one.
        return topLevelNodeModules;
    }
    dump() {
        const { entity } = this.findFromPath(this.resolve('/'));
        if (entity === null || !isFolder(entity)) {
            return {};
        }
        return this.cloneFolder(entity);
    }
    init(folder) {
        this.mount(this.resolve('/'), folder);
    }
    mount(path, folder) {
        if (this.exists(path)) {
            throw new Error(`Unable to mount in '${path}' as it already exists.`);
        }
        const mountFolder = this.ensureDir(path);
        this.copyInto(folder, mountFolder);
    }
    cloneFolder(folder) {
        const clone = {};
        this.copyInto(folder, clone);
        return clone;
    }
    copyInto(from, to) {
        for (const path in from) {
            const item = from[path];
            const canonicalPath = this.getCanonicalPath(path);
            if (isSymLink(item)) {
                to[canonicalPath] = new SymLink(this.getCanonicalPath(item.path));
            }
            else if (isFolder(item)) {
                to[canonicalPath] = this.cloneFolder(item);
            }
            else {
                to[canonicalPath] = from[path];
            }
        }
    }
    findFromPath(path, options) {
        const followSymLinks = !!options && options.followSymLinks;
        const segments = this.splitPath(path);
        if (segments.length > 1 && segments[segments.length - 1] === '') {
            // Remove a trailing slash (unless the path was only `/`)
            segments.pop();
        }
        // Convert the root folder to a canonical empty string `""` (on Windows it would be `C:`).
        segments[0] = '';
        let current = this._fileTree;
        while (segments.length) {
            current = current[this.getCanonicalPath(segments.shift())];
            if (current === undefined) {
                return { path, entity: null };
            }
            if (segments.length > 0) {
                if (isFile(current)) {
                    // Reaching a file when there's still remaining segments means that the requested path
                    // does not actually exist.
                    current = null;
                    break;
                }
                if (isSymLink(current)) {
                    // Intermediate directories that are themselves symlinks should always be followed
                    // regardless of `followSymLinks`, as otherwise the remaining segments would not be found.
                    return this.findFromPath((0, helpers_1.resolve)(current.path, ...segments), { followSymLinks });
                }
            }
            if (isFile(current)) {
                break;
            }
            if (isSymLink(current)) {
                if (followSymLinks) {
                    return this.findFromPath((0, helpers_1.resolve)(current.path, ...segments), { followSymLinks });
                }
                else {
                    break;
                }
            }
        }
        return { path, entity: current };
    }
    splitIntoFolderAndFile(path) {
        const segments = this.splitPath(this.getCanonicalPath(path));
        const file = segments.pop();
        return [path.substring(0, path.length - file.length - 1), file];
    }
    getCanonicalPath(p) {
        return this.isCaseSensitive() ? p : p.toLowerCase();
    }
}
exports.MockFileSystem = MockFileSystem;
class SymLink {
    constructor(path) {
        this.path = path;
    }
}
exports.SymLink = SymLink;
class MockFileStats {
    constructor(entity) {
        this.entity = entity;
    }
    isFile() {
        return isFile(this.entity);
    }
    isDirectory() {
        return isFolder(this.entity);
    }
    isSymbolicLink() {
        return isSymLink(this.entity);
    }
}
class MockFileSystemError extends Error {
    constructor(code, path, message) {
        super(message);
        this.code = code;
        this.path = path;
    }
}
function isFile(item) {
    return Buffer.isBuffer(item) || typeof item === 'string';
}
function isSymLink(item) {
    return item instanceof SymLink;
}
function isFolder(item) {
    return item !== null && !isFile(item) && !isSymLink(item);
}
