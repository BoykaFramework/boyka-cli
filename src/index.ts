#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { epiLogMessage, failureMessage } from './utils/constants.js';
import { configureCommand } from './commands/configure.js';
import { checkCommand } from './commands/check.js';
import { initCommand } from './commands/init.js';

yargs(hideBin(process.argv))
  .scriptName('boyka')
  .command(initCommand)
  .command(configureCommand)
  .command(checkCommand)
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging',
  })
  .demandCommand()
  .strict()
  .help('help')
  .showHelpOnFail(true, failureMessage())
  .epilog(epiLogMessage)
  .parse();
