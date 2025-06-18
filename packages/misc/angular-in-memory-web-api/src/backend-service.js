"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendService = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const delay_response_1 = require("./delay-response");
const http_status_codes_1 = require("./http-status-codes");
const interfaces_1 = require("./interfaces");
/**
 * Base class for in-memory web api back-ends
 * Simulate the behavior of a RESTy web api
 * backed by the simple in-memory data store provided by the injected `InMemoryDbService` service.
 * Conforms mostly to behavior described here:
 * http://www.restapitutorial.com/lessons/httpmethods.html
 */
class BackendService {
    constructor(inMemDbService, config = {}) {
        this.inMemDbService = inMemDbService;
        this.config = new interfaces_1.InMemoryBackendConfig();
        this.db = {};
        this.requestInfoUtils = this.getRequestInfoUtils();
        const loc = this.getLocation('/');
        this.config.host = loc.host; // default to app web server host
        this.config.rootPath = loc.path; // default to path when app is served (e.g.'/')
        Object.assign(this.config, config);
    }
    get dbReady() {
        if (!this.dbReadySubject) {
            // first time the service is called.
            this.dbReadySubject = new rxjs_1.BehaviorSubject(false);
            this.resetDb();
        }
        return this.dbReadySubject.asObservable().pipe((0, operators_1.first)((r) => r));
    }
    /**
     * Process Request and return an Observable of Http Response object
     * in the manner of a RESTy web api.
     *
     * Expect URI pattern in the form :base/:collectionName/:id?
     * Examples:
     *   // for store with a 'customers' collection
     *   GET api/customers          // all customers
     *   GET api/customers/42       // the character with id=42
     *   GET api/customers?name=^j  // 'j' is a regex; returns customers whose name starts with 'j' or
     * 'J' GET api/customers.json/42  // ignores the ".json"
     *
     * Also accepts direct commands to the service in which the last segment of the apiBase is the
     * word "commands" Examples: POST commands/resetDb, GET/POST commands/config - get or (re)set the
     * config
     *
     *   HTTP overrides:
     *     If the injected inMemDbService defines an HTTP method (lowercase)
     *     The request is forwarded to that method as in
     *     `inMemDbService.get(requestInfo)`
     *     which must return either an Observable of the response type
     *     for this http library or null|undefined (which means "keep processing").
     */
    handleRequest(req) {
        //  handle the request when there is an in-memory database
        return this.dbReady.pipe((0, operators_1.concatMap)(() => this.handleRequest_(req)));
    }
    handleRequest_(req) {
        const url = req.urlWithParams ? req.urlWithParams : req.url;
        // Try override parser
        // If no override parser or it returns nothing, use default parser
        const parser = this.bind('parseRequestUrl');
        const parsed = (parser && parser(url, this.requestInfoUtils)) || this.parseRequestUrl(url);
        const collectionName = parsed.collectionName;
        const collection = this.db[collectionName];
        const reqInfo = {
            req: req,
            apiBase: parsed.apiBase,
            collection: collection,
            collectionName: collectionName,
            headers: this.createHeaders({ 'Content-Type': 'application/json' }),
            id: this.parseId(collection, collectionName, parsed.id),
            method: this.getRequestMethod(req),
            query: parsed.query,
            resourceUrl: parsed.resourceUrl,
            url: url,
            utils: this.requestInfoUtils,
        };
        let resOptions;
        if (/commands\/?$/i.test(reqInfo.apiBase)) {
            return this.commands(reqInfo);
        }
        const methodInterceptor = this.bind(reqInfo.method);
        if (methodInterceptor) {
            // InMemoryDbService intercepts this HTTP method.
            // if interceptor produced a response, return it.
            // else InMemoryDbService chose not to intercept; continue processing.
            const interceptorResponse = methodInterceptor(reqInfo);
            if (interceptorResponse) {
                return interceptorResponse;
            }
        }
        if (this.db[collectionName]) {
            // request is for a known collection of the InMemoryDbService
            return this.createResponse$(() => this.collectionHandler(reqInfo));
        }
        if (this.config.passThruUnknownUrl) {
            // unknown collection; pass request thru to a "real" backend.
            return this.getPassThruBackend().handle(req);
        }
        // 404 - can't handle this request
        resOptions = this.createErrorResponseOptions(url, http_status_codes_1.STATUS.NOT_FOUND, `Collection '${collectionName}' not found`);
        return this.createResponse$(() => resOptions);
    }
    /**
     * Add configured delay to response observable unless delay === 0
     */
    addDelay(response) {
        const d = this.config.delay;
        return d === 0 ? response : (0, delay_response_1.delayResponse)(response, d || 500);
    }
    /**
     * Apply query/search parameters as a filter over the collection
     * This impl only supports RegExp queries on string properties of the collection
     * ANDs the conditions together
     */
    applyQuery(collection, query) {
        // extract filtering conditions - {propertyName, RegExps) - from query/search parameters
        const conditions = [];
        const caseSensitive = this.config.caseSensitiveSearch ? undefined : 'i';
        query.forEach((value, name) => {
            value.forEach((v) => conditions.push({ name, rx: new RegExp(decodeURI(v), caseSensitive) }));
        });
        const len = conditions.length;
        if (!len) {
            return collection;
        }
        // AND the RegExp conditions
        return collection.filter((row) => {
            let ok = true;
            let i = len;
            while (ok && i) {
                i -= 1;
                const cond = conditions[i];
                ok = cond.rx.test(row[cond.name]);
            }
            return ok;
        });
    }
    /**
     * Get a method from the `InMemoryDbService` (if it exists), bound to that service
     */
    bind(methodName) {
        const fn = this.inMemDbService[methodName];
        return fn ? fn.bind(this.inMemDbService) : undefined;
    }
    bodify(data) {
        return this.config.dataEncapsulation ? { data } : data;
    }
    clone(data) {
        return JSON.parse(JSON.stringify(data));
    }
    collectionHandler(reqInfo) {
        // const req = reqInfo.req;
        let resOptions;
        switch (reqInfo.method) {
            case 'get':
                resOptions = this.get(reqInfo);
                break;
            case 'post':
                resOptions = this.post(reqInfo);
                break;
            case 'put':
                resOptions = this.put(reqInfo);
                break;
            case 'delete':
                resOptions = this.delete(reqInfo);
                break;
            default:
                resOptions = this.createErrorResponseOptions(reqInfo.url, http_status_codes_1.STATUS.METHOD_NOT_ALLOWED, 'Method not allowed');
                break;
        }
        // If `inMemDbService.responseInterceptor` exists, let it morph the response options
        const interceptor = this.bind('responseInterceptor');
        return interceptor ? interceptor(resOptions, reqInfo) : resOptions;
    }
    /**
     * Commands reconfigure the in-memory web api service or extract information from it.
     * Commands ignore the latency delay and respond ASAP.
     *
     * When the last segment of the `apiBase` path is "commands",
     * the `collectionName` is the command.
     *
     * Example URLs:
     *   commands/resetdb (POST) // Reset the "database" to its original state
     *   commands/config (GET)   // Return this service's config object
     *   commands/config (POST)  // Update the config (e.g. the delay)
     *
     * Usage:
     *   http.post('commands/resetdb', undefined);
     *   http.get('commands/config');
     *   http.post('commands/config', '{"delay":1000}');
     */
    commands(reqInfo) {
        const command = reqInfo.collectionName.toLowerCase();
        const method = reqInfo.method;
        let resOptions = { url: reqInfo.url };
        switch (command) {
            case 'resetdb':
                resOptions.status = http_status_codes_1.STATUS.NO_CONTENT;
                return this.resetDb(reqInfo).pipe((0, operators_1.concatMap)(() => this.createResponse$(() => resOptions, false /* no latency delay */)));
            case 'config':
                if (method === 'get') {
                    resOptions.status = http_status_codes_1.STATUS.OK;
                    resOptions.body = this.clone(this.config);
                    // any other HTTP method is assumed to be a config update
                }
                else {
                    const body = this.getJsonBody(reqInfo.req);
                    Object.assign(this.config, body);
                    this.passThruBackend = undefined; // re-create when needed
                    resOptions.status = http_status_codes_1.STATUS.NO_CONTENT;
                }
                break;
            default:
                resOptions = this.createErrorResponseOptions(reqInfo.url, http_status_codes_1.STATUS.INTERNAL_SERVER_ERROR, `Unknown command "${command}"`);
        }
        return this.createResponse$(() => resOptions, false /* no latency delay */);
    }
    createErrorResponseOptions(url, status, message) {
        return {
            body: { error: `${message}` },
            url: url,
            headers: this.createHeaders({ 'Content-Type': 'application/json' }),
            status: status,
        };
    }
    /**
     * Create a cold response Observable from a factory for ResponseOptions
     * @param resOptionsFactory - creates ResponseOptions when observable is subscribed
     * @param withDelay - if true (default), add simulated latency delay from configuration
     */
    createResponse$(resOptionsFactory, withDelay = true) {
        const resOptions$ = this.createResponseOptions$(resOptionsFactory);
        let resp$ = this.createResponse$fromResponseOptions$(resOptions$);
        return withDelay ? this.addDelay(resp$) : resp$;
    }
    /**
     * Create a cold Observable of ResponseOptions.
     * @param resOptionsFactory - creates ResponseOptions when observable is subscribed
     */
    createResponseOptions$(resOptionsFactory) {
        return new rxjs_1.Observable((responseObserver) => {
            let resOptions;
            try {
                resOptions = resOptionsFactory();
            }
            catch (error) {
                const err = error.message || error;
                resOptions = this.createErrorResponseOptions('', http_status_codes_1.STATUS.INTERNAL_SERVER_ERROR, `${err}`);
            }
            const status = resOptions.status;
            try {
                resOptions.statusText = status != null ? (0, http_status_codes_1.getStatusText)(status) : undefined;
            }
            catch (e) {
                /* ignore failure */
            }
            if (status != null && (0, http_status_codes_1.isSuccess)(status)) {
                responseObserver.next(resOptions);
                responseObserver.complete();
            }
            else {
                responseObserver.error(resOptions);
            }
            return () => { }; // unsubscribe function
        });
    }
    delete({ collection, collectionName, headers, id, url }) {
        if (id == null) {
            return this.createErrorResponseOptions(url, http_status_codes_1.STATUS.NOT_FOUND, `Missing "${collectionName}" id`);
        }
        const exists = this.removeById(collection, id);
        return {
            headers: headers,
            status: exists || !this.config.delete404 ? http_status_codes_1.STATUS.NO_CONTENT : http_status_codes_1.STATUS.NOT_FOUND,
        };
    }
    /**
     * Find first instance of item in collection by `item.id`
     * @param collection
     * @param id
     */
    findById(collection, id) {
        return collection.find((item) => item.id === id);
    }
    /**
     * Generate the next available id for item in this collection
     * Use method from `inMemDbService` if it exists and returns a value,
     * else delegates to `genIdDefault`.
     * @param collection - collection of items with `id` key property
     */
    genId(collection, collectionName) {
        const genId = this.bind('genId');
        if (genId) {
            const id = genId(collection, collectionName);
            if (id != null) {
                return id;
            }
        }
        return this.genIdDefault(collection, collectionName);
    }
    /**
     * Default generator of the next available id for item in this collection
     * This default implementation works only for numeric ids.
     * @param collection - collection of items with `id` key property
     * @param collectionName - name of the collection
     */
    genIdDefault(collection, collectionName) {
        if (!this.isCollectionIdNumeric(collection, collectionName)) {
            throw new Error(`Collection '${collectionName}' id type is non-numeric or unknown. Can only generate numeric ids.`);
        }
        let maxId = 0;
        collection.reduce((prev, item) => {
            maxId = Math.max(maxId, typeof item.id === 'number' ? item.id : maxId);
        }, undefined);
        return maxId + 1;
    }
    get({ collection, collectionName, headers, id, query, url, }) {
        let data = collection;
        if (id != null && id !== '') {
            data = this.findById(collection, id);
        }
        else if (query) {
            data = this.applyQuery(collection, query);
        }
        if (!data) {
            return this.createErrorResponseOptions(url, http_status_codes_1.STATUS.NOT_FOUND, `'${collectionName}' with id='${id}' not found`);
        }
        return { body: this.bodify(this.clone(data)), headers: headers, status: http_status_codes_1.STATUS.OK };
    }
    /**
     * Get location info from a url, even on server where `document` is not defined
     */
    getLocation(url) {
        if (!url.startsWith('http')) {
            // get the document iff running in browser
            const doc = typeof document === 'undefined' ? undefined : document;
            // add host info to url before parsing.  Use a fake host when not in browser.
            const base = doc ? doc.location.protocol + '//' + doc.location.host : 'http://fake';
            url = url.startsWith('/') ? base + url : base + '/' + url;
        }
        return (0, interfaces_1.parseUri)(url);
    }
    /**
     * get or create the function that passes unhandled requests
     * through to the "real" backend.
     */
    getPassThruBackend() {
        return this.passThruBackend
            ? this.passThruBackend
            : (this.passThruBackend = this.createPassThruBackend());
    }
    /**
     * Get utility methods from this service instance.
     * Useful within an HTTP method override
     */
    getRequestInfoUtils() {
        return {
            createResponse$: this.createResponse$.bind(this),
            findById: this.findById.bind(this),
            isCollectionIdNumeric: this.isCollectionIdNumeric.bind(this),
            getConfig: () => this.config,
            getDb: () => this.db,
            getJsonBody: this.getJsonBody.bind(this),
            getLocation: this.getLocation.bind(this),
            getPassThruBackend: this.getPassThruBackend.bind(this),
            parseRequestUrl: this.parseRequestUrl.bind(this),
        };
    }
    indexOf(collection, id) {
        return collection.findIndex((item) => item.id === id);
    }
    /** Parse the id as a number. Return original value if not a number. */
    parseId(collection, collectionName, id) {
        if (!this.isCollectionIdNumeric(collection, collectionName)) {
            // Can't confirm that `id` is a numeric type; don't parse as a number
            // or else `'42'` -> `42` and _get by id_ fails.
            return id;
        }
        const idNum = parseFloat(id);
        return isNaN(idNum) ? id : idNum;
    }
    /**
     * return true if can determine that the collection's `item.id` is a number
     * This implementation can't tell if the collection is empty so it assumes NO
     * */
    isCollectionIdNumeric(collection, collectionName) {
        // collectionName not used now but override might maintain collection type information
        // so that it could know the type of the `id` even when the collection is empty.
        return !!(collection && collection[0]) && typeof collection[0].id === 'number';
    }
    /**
     * Parses the request URL into a `ParsedRequestUrl` object.
     * Parsing depends upon certain values of `config`: `apiBase`, `host`, and `urlRoot`.
     *
     * Configuring the `apiBase` yields the most interesting changes to `parseRequestUrl` behavior:
     *   When apiBase=undefined and url='http://localhost/api/collection/42'
     *     {base: 'api/', collectionName: 'collection', id: '42', ...}
     *   When apiBase='some/api/root/' and url='http://localhost/some/api/root/collection'
     *     {base: 'some/api/root/', collectionName: 'collection', id: undefined, ...}
     *   When apiBase='/' and url='http://localhost/collection'
     *     {base: '/', collectionName: 'collection', id: undefined, ...}
     *
     * The actual api base segment values are ignored. Only the number of segments matters.
     * The following api base strings are considered identical: 'a/b' ~ 'some/api/' ~ `two/segments'
     *
     * To replace this default method, assign your alternative to your
     * InMemDbService['parseRequestUrl']
     */
    parseRequestUrl(url) {
        try {
            const loc = this.getLocation(url);
            let drop = (this.config.rootPath || '').length;
            let urlRoot = '';
            if (loc.host !== this.config.host) {
                // url for a server on a different host!
                // assume it's collection is actually here too.
                drop = 1; // the leading slash
                urlRoot = loc.protocol + '//' + loc.host + '/';
            }
            const path = loc.path.substring(drop);
            const pathSegments = path.split('/');
            let segmentIndex = 0;
            // apiBase: the front part of the path devoted to getting to the api route
            // Assumes first path segment if no config.apiBase
            // else ignores as many path segments as are in config.apiBase
            // Does NOT care what the api base chars actually are.
            let apiBase;
            if (this.config.apiBase == null) {
                apiBase = pathSegments[segmentIndex++];
            }
            else {
                apiBase = (0, interfaces_1.removeTrailingSlash)(this.config.apiBase.trim());
                if (apiBase) {
                    segmentIndex = apiBase.split('/').length;
                }
                else {
                    segmentIndex = 0; // no api base at all; unwise but allowed.
                }
            }
            apiBase += '/';
            let collectionName = pathSegments[segmentIndex++];
            // ignore anything after a '.' (e.g.,the "json" in "customers.json")
            collectionName = collectionName && collectionName.split('.')[0];
            const id = pathSegments[segmentIndex++];
            const query = this.createQueryMap(loc.query);
            const resourceUrl = urlRoot + apiBase + collectionName + '/';
            return { apiBase, collectionName, id, query, resourceUrl };
        }
        catch (err) {
            const msg = `unable to parse url '${url}'; original error: ${err.message}`;
            throw new Error(msg);
        }
    }
    // Create entity
    // Can update an existing entity too if post409 is false.
    post({ collection, collectionName, headers, id, req, resourceUrl, url, }) {
        const item = this.clone(this.getJsonBody(req));
        if (item.id == null) {
            try {
                item.id = id || this.genId(collection, collectionName);
            }
            catch (err) {
                const emsg = err.message || '';
                if (/id type is non-numeric/.test(emsg)) {
                    return this.createErrorResponseOptions(url, http_status_codes_1.STATUS.UNPROCESSABLE_ENTRY, emsg);
                }
                else {
                    return this.createErrorResponseOptions(url, http_status_codes_1.STATUS.INTERNAL_SERVER_ERROR, `Failed to generate new id for '${collectionName}'`);
                }
            }
        }
        if (id && id !== item.id) {
            return this.createErrorResponseOptions(url, http_status_codes_1.STATUS.BAD_REQUEST, `Request id does not match item.id`);
        }
        else {
            id = item.id;
        }
        const existingIx = this.indexOf(collection, id);
        const body = this.bodify(item);
        if (existingIx === -1) {
            collection.push(item);
            headers.set('Location', resourceUrl + '/' + id);
            return { headers, body, status: http_status_codes_1.STATUS.CREATED };
        }
        else if (this.config.post409) {
            return this.createErrorResponseOptions(url, http_status_codes_1.STATUS.CONFLICT, `'${collectionName}' item with id='${id} exists and may not be updated with POST; use PUT instead.`);
        }
        else {
            collection[existingIx] = item;
            return this.config.post204
                ? { headers, status: http_status_codes_1.STATUS.NO_CONTENT } // successful; no content
                : { headers, body, status: http_status_codes_1.STATUS.OK }; // successful; return entity
        }
    }
    // Update existing entity
    // Can create an entity too if put404 is false.
    put({ collection, collectionName, headers, id, req, url }) {
        const item = this.clone(this.getJsonBody(req));
        if (item.id == null) {
            return this.createErrorResponseOptions(url, http_status_codes_1.STATUS.NOT_FOUND, `Missing '${collectionName}' id`);
        }
        if (id && id !== item.id) {
            return this.createErrorResponseOptions(url, http_status_codes_1.STATUS.BAD_REQUEST, `Request for '${collectionName}' id does not match item.id`);
        }
        else {
            id = item.id;
        }
        const existingIx = this.indexOf(collection, id);
        const body = this.bodify(item);
        if (existingIx > -1) {
            collection[existingIx] = item;
            return this.config.put204
                ? { headers, status: http_status_codes_1.STATUS.NO_CONTENT } // successful; no content
                : { headers, body, status: http_status_codes_1.STATUS.OK }; // successful; return entity
        }
        else if (this.config.put404) {
            // item to update not found; use POST to create new item for this id.
            return this.createErrorResponseOptions(url, http_status_codes_1.STATUS.NOT_FOUND, `'${collectionName}' item with id='${id} not found and may not be created with PUT; use POST instead.`);
        }
        else {
            // create new item for id not found
            collection.push(item);
            return { headers, body, status: http_status_codes_1.STATUS.CREATED };
        }
    }
    removeById(collection, id) {
        const ix = this.indexOf(collection, id);
        if (ix > -1) {
            collection.splice(ix, 1);
            return true;
        }
        return false;
    }
    /**
     * Tell your in-mem "database" to reset.
     * returns Observable of the database because resetting it could be async
     */
    resetDb(reqInfo) {
        this.dbReadySubject && this.dbReadySubject.next(false);
        const db = this.inMemDbService.createDb(reqInfo);
        const db$ = db instanceof rxjs_1.Observable
            ? db
            : typeof db.then === 'function'
                ? (0, rxjs_1.from)(db)
                : (0, rxjs_1.of)(db);
        db$.pipe((0, operators_1.first)()).subscribe((d) => {
            this.db = d;
            this.dbReadySubject && this.dbReadySubject.next(true);
        });
        return this.dbReady;
    }
}
exports.BackendService = BackendService;
