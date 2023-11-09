#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { epiLogMessage, failureMessage } from './utils/constants';

yargs(hideBin(process.argv))
  .scriptName('boyka')
  .commandDir('commands')
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
