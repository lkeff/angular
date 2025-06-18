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
import { setOutput } from '@actions/core';
import { GitClient, Log, bold, green, yellow } from '@angular/ng-dev';
import { select } from '@inquirer/prompts';
import yargs from 'yargs';
import { collectBenchmarkResults } from './results.mjs';
import { findBenchmarkTargets, getTestlogPath, resolveTarget } from './targets.mjs';
import { exec } from './utils.mjs';
const benchmarkTestFlags = [
    '--cache_test_results=no',
    '--color=yes',
    '--curses=no',
    // We may have RBE set up, but test should run locally on the same machine to
    // reduce fluctuation. Output streamed ensures that deps can build with RBE, but
    // tests run locally while also providing useful output for debugging.
    '--test_output=streamed',
];
await yargs(process.argv.slice(2))
    .command('run-compare <compare-ref> [bazel-target]', 'Runs a benchmark between two SHAs', (argv) => argv
    .positional('compare-ref', {
    description: 'Comparison SHA',
    type: 'string',
    demandOption: true,
})
    .positional('bazel-target', { description: 'Bazel target', type: 'string' }), (args) => runCompare(args.bazelTarget, args.compareRef))
    .command('run [bazel-target]', 'Runs a benchmark', (argv) => argv.positional('bazel-target', { description: 'Bazel target', type: 'string' }), (args) => runBenchmarkCmd(args.bazelTarget))
    .command('prepare-for-github-action <comment-body>', false, // Do not show in help.
(argv) => argv.positional('comment-body', { demandOption: true, type: 'string' }), (args) => prepareForGitHubAction(args.commentBody))
    .demandCommand()
    .scriptName('$0')
    .help()
    .strict()
    .parseAsync();
/** Prompts for a benchmark target. */
function promptForBenchmarkTarget() {
    return __awaiter(this, void 0, void 0, function* () {
        const targets = yield findBenchmarkTargets();
        return yield select({
            message: 'Select benchmark target to run:',
            choices: targets.map((t) => ({ value: t, name: t })),
        });
    });
}
/**
 * Prepares a benchmark comparison running via GitHub action. This command is
 * used by the GitHub action YML workflow and is responsible for extracting
 * e.g. command information or fetching/resolving Git refs of the comparison range.
 *
 * This is a helper used by the GitHub action to perform benchmark
 * comparisons. Commands follow the format of: `/benchmark-compare <sha> <target>`.
 */
function prepareForGitHubAction(commentBody) {
    return __awaiter(this, void 0, void 0, function* () {
        const matches = /\/[^ ]+ ([^ ]+) ([^ ]+)/.exec(commentBody);
        if (matches === null) {
            Log.error('Could not extract information from comment', commentBody);
            process.exit(1);
        }
        const git = yield GitClient.get();
        const [_, compareRefRaw, benchmarkTarget] = matches;
        // We assume the PR is checked out and therefore `HEAD` is the PR head SHA.
        const prHeadSha = git.run(['rev-parse', 'HEAD']).stdout.trim();
        setOutput('benchmarkTarget', benchmarkTarget);
        setOutput('prHeadSha', prHeadSha);
        // Attempt to find the compare SHA. The commit may be either part of the
        // pull request, or might be a commit unrelated to the PR- but part of the
        // upstream repository. We attempt to fetch/resolve the SHA in both remotes.
        const compareRefResolve = git.runGraceful(['rev-parse', compareRefRaw]);
        let compareRefSha = compareRefResolve.stdout.trim();
        if (compareRefSha === '' || compareRefResolve.status !== 0) {
            git.run(['fetch', '--depth=1', git.getRepoGitUrl(), compareRefRaw]);
            compareRefSha = git.run(['rev-parse', 'FETCH_HEAD']).stdout.trim();
        }
        setOutput('compareSha', compareRefSha);
    });
}
/** Runs a specified benchmark, or a benchmark selected via prompt. */
function runBenchmarkCmd(bazelTargetRaw) {
    return __awaiter(this, void 0, void 0, function* () {
        if (bazelTargetRaw === undefined) {
            bazelTargetRaw = yield promptForBenchmarkTarget();
        }
        const bazelTarget = yield resolveTarget(bazelTargetRaw);
        const testlogPath = yield getTestlogPath(bazelTarget);
        yield runBenchmarkTarget(bazelTarget);
        const workingDirResults = yield collectBenchmarkResults(testlogPath);
        Log.info('\n\n\n');
        Log.info(bold(green('Results!')));
        Log.info(workingDirResults.summaryConsoleText);
    });
}
/** Runs a benchmark Bazel target. */
function runBenchmarkTarget(bazelTarget) {
    return __awaiter(this, void 0, void 0, function* () {
        yield exec('bazel', ['test', bazelTarget, ...benchmarkTestFlags]);
    });
}
/**
 * Performs a comparison of benchmark results between the current
 * working stage and the comparison Git reference.
 */
function runCompare(bazelTargetRaw, compareRef) {
    return __awaiter(this, void 0, void 0, function* () {
        const git = yield GitClient.get();
        const currentRef = git.getCurrentBranchOrRevision();
        if (git.hasUncommittedChanges()) {
            Log.warn(bold('You have uncommitted changes.'));
            Log.warn('The script will stash your changes and re-apply them so that');
            Log.warn('the comparison ref can be checked out.');
            Log.warn('');
        }
        if (bazelTargetRaw === undefined) {
            bazelTargetRaw = yield promptForBenchmarkTarget();
        }
        const bazelTarget = yield resolveTarget(bazelTargetRaw);
        const testlogPath = yield getTestlogPath(bazelTarget);
        Log.log(green('Test log path:', testlogPath));
        // Run benchmark with the current working stage.
        yield runBenchmarkTarget(bazelTarget);
        const workingDirResults = yield collectBenchmarkResults(testlogPath);
        // Stash working directory as we might be in the middle of developing
        // and we wouldn't want to discard changes when checking out the compare SHA.
        git.run(['stash']);
        try {
            Log.log(green('Fetching comparison revision.'));
            // Note: Not using a shallow fetch here as that would convert the local
            // user repository into an incomplete repository.
            git.run(['fetch', git.getRepoGitUrl(), compareRef]);
            Log.log(green('Checking out comparison revision.'));
            git.run(['checkout', 'FETCH_HEAD']);
            yield exec('yarn');
            yield runBenchmarkTarget(bazelTarget);
        }
        finally {
            restoreWorkingStage(git, currentRef);
        }
        // Re-install dependencies for `HEAD`.
        yield exec('yarn');
        const comparisonResults = yield collectBenchmarkResults(testlogPath);
        // If we are running in a GitHub action, expose the benchmark text
        // results as outputs. Useful if those are exposed as a GitHub comment then.
        if (process.env.GITHUB_ACTION !== undefined) {
            setOutput('comparisonResultsText', comparisonResults.summaryMarkdownText);
            setOutput('workingStageResultsText', workingDirResults.summaryMarkdownText);
        }
        Log.info('\n\n\n');
        Log.info(bold(green('Results!')));
        Log.info(bold(yellow(`Comparison reference (${compareRef}) results:`)), '\n');
        Log.info(comparisonResults.summaryConsoleText);
        Log.info(bold(yellow(`Working stage (${currentRef}) results:`)), '\n');
        Log.info(workingDirResults.summaryConsoleText);
    });
}
function restoreWorkingStage(git, initialRef) {
    Log.log(green('Restoring working stage'));
    git.run(['checkout', '-f', initialRef]);
    // Stash apply could fail if there were not changes in the working stage.
    git.runGraceful(['stash', 'apply']);
}
