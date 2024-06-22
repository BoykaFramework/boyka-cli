#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { epiLogMessage, failureMessage, welcomeMessage } from './utils/constants.js';
import { configureCommand } from './commands/configure.js';
import { doctorCommand } from './commands/doctor.js';
import { initCommand } from './commands/init.js';

welcomeMessage();

yargs(hideBin(process.argv))
  .scriptName('boyka')
  .command(initCommand)
  .command(configureCommand)
  .command(doctorCommand)
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
