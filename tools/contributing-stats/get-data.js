"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This script gets contribution stats for all members of the angular org,
 * since a provided date.
 * The script expects the following flag(s):
 *
 * required:
 *   --since [date] The data after which contributions are queried for.
 *       Uses githubs search format for dates, e.g. "2020-01-21".
 *       See
 * https://help.github.com/en/github/searching-for-information-on-github/understanding-the-search-syntax#query-for-dates
 *
 * optional:
 *  --use-created [boolean] If the created timestamp should be used for
 *     time comparisons, defaults otherwise to the updated timestamp.
 */
const graphql_1 = require("@octokit/graphql");
const typed_graphqlify_1 = require("typed-graphqlify");
const yargs_1 = __importDefault(require("yargs"));
// The organization to be considered for the queries.
const ORG = 'angular';
// The repositories to be considered for the queries.
const REPOS = ['angular', 'components', 'angular-cli'];
/**
 * Handle flags for the script.
 */
const args = yargs_1.default
    .option('use-created', { type: 'boolean' })
    .option('since', { type: 'string', demandOption: true })
    .strictOptions().argv;
/**
 * Authenticated instance of Github GraphQl API service, relies on a
 * personal access token being available in the TOKEN environment variable.
 */
const graphql = graphql_1.graphql.defaults({
    headers: {
        // TODO(josephperrott): Remove reference to TOKEN environment variable as part of larger
        // effort to migrate to expecting tokens via GITHUB_ACCESS_TOKEN environment variables.
        authorization: `token ${process.env['TOKEN'] || process.env['GITHUB_ACCESS_TOKEN']}`,
    },
});
/**
 * Retrieves all current members of an organization.
 */
function getAllOrgMembers() {
    return __awaiter(this, void 0, void 0, function* () {
        // The GraphQL query object to get a page of members of an organization.
        const MEMBERS_QUERY = (0, typed_graphqlify_1.params)({
            $first: 'Int', // How many entries to get with each request
            $after: 'String', // The cursor to start the page at
            $owner: 'String!', // The organization to query for
        }, {
            organization: (0, typed_graphqlify_1.params)({ login: '$owner' }, {
                membersWithRole: (0, typed_graphqlify_1.params)({
                    first: '$first',
                    after: '$after',
                }, {
                    nodes: [{ login: typed_graphqlify_1.types.string }],
                    pageInfo: {
                        hasNextPage: typed_graphqlify_1.types.boolean,
                        endCursor: typed_graphqlify_1.types.string,
                    },
                }),
            }),
        });
        const query = (0, typed_graphqlify_1.query)('members', MEMBERS_QUERY);
        /**
         * Gets the query and queryParams for a specific page of entries.
         */
        const queryBuilder = (count, cursor) => {
            return {
                query,
                params: {
                    after: cursor || null,
                    first: count,
                    owner: ORG,
                },
            };
        };
        // The current cursor
        let cursor = undefined;
        // If an additional page of members is expected
        let hasNextPage = true;
        // Array of Github usernames of the organization
        const members = [];
        while (hasNextPage) {
            const { query, params } = queryBuilder(100, cursor);
            const results = (yield graphql(query.toString(), params));
            results.organization.membersWithRole.nodes.forEach((node) => members.push(node.login));
            hasNextPage = results.organization.membersWithRole.pageInfo.hasNextPage;
            cursor = results.organization.membersWithRole.pageInfo.endCursor;
        }
        return members.sort();
    });
}
/**
 * Build metadata for making requests for a specific user and date.
 *
 * Builds GraphQL query string, Query Params and Labels for making queries to GraphQl.
 */
function buildQueryAndParams(username, date) {
    // Whether the updated or created timestamp should be used.
    const updatedOrCreated = args['use-created'] ? 'created' : 'updated';
    let dataQueries = {};
    // Add queries and params for all values queried for each repo.
    for (let repo of REPOS) {
        dataQueries = Object.assign(Object.assign({}, dataQueries), { [`${repo.replace(/[\/\-]/g, '_')}_issue_author`]: {
                query: `repo:${ORG}/${repo} is:issue author:${username} ${updatedOrCreated}:>${date}`,
                label: `${ORG}/${repo} Issue Authored`,
            }, [`${repo.replace(/[\/\-]/g, '_')}_issues_involved`]: {
                query: `repo:${ORG}/${repo} is:issue -author:${username} involves:${username} ${updatedOrCreated}:>${date}`,
                label: `${ORG}/${repo} Issue Involved`,
            }, [`${repo.replace(/[\/\-]/g, '_')}_pr_author`]: {
                query: `repo:${ORG}/${repo} is:pr author:${username} ${updatedOrCreated}:>${date}`,
                label: `${ORG}/${repo} PR Author`,
            }, [`${repo.replace(/[\/\-]/g, '_')}_pr_involved`]: {
                query: `repo:${ORG}/${repo} is:pr involves:${username} ${updatedOrCreated}:>${date}`,
                label: `${ORG}/${repo} PR Involved`,
            }, [`${repo.replace(/[\/\-]/g, '_')}_pr_reviewed`]: {
                query: `repo:${ORG}/${repo} is:pr -author:${username} reviewed-by:${username} ${updatedOrCreated}:>${date}`,
                label: `${ORG}/${repo} PR Reviewed`,
            }, [`${repo.replace(/[\/\-]/g, '_')}_pr_commented`]: {
                query: `repo:${ORG}/${repo} is:pr -author:${username} commenter:${username} ${updatedOrCreated}:>${date}`,
                label: `${ORG}/${repo} PR Commented`,
            } });
    }
    // Add queries and params for all values queried for the org.
    dataQueries = Object.assign(Object.assign({}, dataQueries), { [`${ORG}_org_issue_author`]: {
            query: `org:${ORG} is:issue author:${username} ${updatedOrCreated}:>${date}`,
            label: `${ORG} org Issue Authored`,
        }, [`${ORG}_org_issues_involved`]: {
            query: `org:${ORG} is:issue -author:${username} involves:${username} ${updatedOrCreated}:>${date}`,
            label: `${ORG} org Issue Involved`,
        }, [`${ORG}_org_pr_author`]: {
            query: `org:${ORG} is:pr author:${username} ${updatedOrCreated}:>${date}`,
            label: `${ORG} org PR Author`,
        }, [`${ORG}_org_pr_involved`]: {
            query: `org:${ORG} is:pr involves:${username} ${updatedOrCreated}:>${date}`,
            label: `${ORG} org PR Involved`,
        }, [`${ORG}_org_pr_reviewed`]: {
            query: `org:${ORG} is:pr -author:${username} reviewed-by:${username} ${updatedOrCreated}:>${date}`,
            label: `${ORG} org PR Reviewed`,
        }, [`${ORG}_org_pr_commented`]: {
            query: `org:${ORG} is:pr -author:${username} commenter:${username} ${updatedOrCreated}:>${date}`,
            label: `${ORG} org PR Commented`,
        } });
    /**
     * Gets the labels for each requested value to be used as headers.
     */
    function getLabels(pairs) {
        return Object.values(pairs).map((val) => val.label);
    }
    /**
     * Gets the graphql query object for the GraphQL query.
     */
    function getQuery(pairs) {
        const output = {};
        Object.entries(pairs).map(([key, val]) => {
            output[(0, typed_graphqlify_1.alias)(key, 'search')] = (0, typed_graphqlify_1.params)({
                query: `"${val.query}"`,
                type: 'ISSUE',
            }, {
                issueCount: typed_graphqlify_1.types.number,
            });
        });
        return output;
    }
    return {
        query: (0, typed_graphqlify_1.query)(getQuery(dataQueries)),
        labels: getLabels(dataQueries),
    };
}
/**
 * Runs the script to create a CSV string with the requested data for each member
 * of the organization.
 */
function run(date) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allOrgMembers = yield getAllOrgMembers();
            console.info(['Username', ...buildQueryAndParams('', date).labels].join(','));
            for (const username of allOrgMembers) {
                const results = yield graphql(buildQueryAndParams(username, date).query.toString());
                const values = Object.values(results).map((result) => `${result.issueCount}`);
                console.info([username, ...values].join(','));
            }
        }
        catch (error) {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        }
    });
}
run(args['since']);
