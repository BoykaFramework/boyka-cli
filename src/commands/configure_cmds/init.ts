import { CommandModule } from 'yargs';
import { epiLogMessage, failureMessage, handleCommand } from '../../utils/constants.js';
import { handleConfigInit } from '../../handler/config/init/init.js';

export const initCommand = {
  command: 'init',
  aliases: ['i'],
  describe: 'Initialize Boyka-Framework Config file',
  builder: (yargs) =>
    yargs
      .option('p', {
        alias: ['path'],
        describe: 'Path to the config file',
        default: `${process.cwd()}/src/test/resources`,
        type: 'string',
      })
      .help('help')
      .showHelpOnFail(true, failureMessage('Init Config'))
      .epilog(epiLogMessage),
  handler: async (argv) => {
    await handleCommand(handleConfigInit(argv.path as string));
  },
} satisfies CommandModule;
