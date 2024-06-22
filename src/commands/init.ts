import { CommandModule } from 'yargs';
import { epiLogMessage, failureMessage, handleCommand } from '../utils/constants.js';
import { handleInit } from '../handler/init-handler.js';
import { BoykaError } from '../utils/boyka-error.js';

export const initCommand = {
  command: 'init [name]',
  aliases: ['in', 'i'],
  describe: 'Initialize Boyka-Framework project',
  builder: (yargs) =>
    yargs
      .positional('name', {
        demandOption: true,
        describe: 'Name of the project',
        type: 'string',
      })
      .check((argv) => {
        if (!argv.name) {
          throw new BoykaError('Boyka project name is required!');
        }
        return true;
      })
      .strict()
      .help('help')
      .showHelpOnFail(true, failureMessage('init'))
      .epilog(epiLogMessage),
  handler: async (argv) => {
    await handleCommand(handleInit(argv));
  },
} satisfies CommandModule;
