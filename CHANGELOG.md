Error: Command failed with exit code 128: git log --oneline --pretty=hash<%h> ref<%D> message<%s> date<%cd> --date=short 0.7.0..HEAD
fatal: ambiguous argument '0.7.0..HEAD': unknown revision or path not in the working tree.
Use '--' to separate paths from revisions, like this:
'git <command> [<revision>...] -- [<file>...]'
    at makeError (/home/runner/work/boyka-cli/boyka-cli/node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/error.js:60:11)
    at module.exports.sync (/home/runner/work/boyka-cli/boyka-cli/node_modules/.pnpm/execa@5.1.1/node_modules/execa/index.js:194:17)
    at Object.listCommits (/home/runner/work/boyka-cli/boyka-cli/node_modules/.pnpm/lerna-changelog@2.2.0/node_modules/lerna-changelog/lib/git.js:49:10)
    at Changelog.getListOfCommits (/home/runner/work/boyka-cli/boyka-cli/node_modules/.pnpm/lerna-changelog@2.2.0/node_modules/lerna-changelog/lib/changelog.js:74:20)
    at Changelog.<anonymous> (/home/runner/work/boyka-cli/boyka-cli/node_modules/.pnpm/lerna-changelog@2.2.0/node_modules/lerna-changelog/lib/changelog.js:39:34)
    at Generator.next (<anonymous>)
    at /home/runner/work/boyka-cli/boyka-cli/node_modules/.pnpm/lerna-changelog@2.2.0/node_modules/lerna-changelog/lib/changelog.js:8:71
    at new Promise (<anonymous>)
    at __awaiter (/home/runner/work/boyka-cli/boyka-cli/node_modules/.pnpm/lerna-changelog@2.2.0/node_modules/lerna-changelog/lib/changelog.js:4:12)
    at Changelog.getCommitInfos (/home/runner/work/boyka-cli/boyka-cli/node_modules/.pnpm/lerna-changelog@2.2.0/node_modules/lerna-changelog/lib/changelog.js:38:16)
