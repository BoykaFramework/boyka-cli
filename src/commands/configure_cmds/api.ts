import { CommandModule } from 'yargs';
import { epiLogMessage, failureMessage, handleCommand } from '../../utils/constants.js';
import { handleAddApiConfig } from '../../handler/config/init/api.js';
import { BoykaError } from '../../utils/boyka-error.js';

export const apiCommand = {
  command: 'api [name]',
  aliases: ['a'],
  describe: 'Add API Boyka-Framework Config file',
  builder: (yargs) =>
    yargs
      .option('p', {
        alias: ['path'],
        describe: 'Path to the config file',
        default: `${process.cwd()}/src/test/resources`,
        type: 'string',
      })
      .positional('name', {
        demandOption: true,
        describe: 'Name of the API config block',
        type: 'string',
      })
      .check((argv) => {
        if (!argv.name) {
          throw new BoykaError('API config name should be provided!');
        }
        return true;
      })
      .help('help')
      .showHelpOnFail(true, failureMessage('API Config'))
      .epilog(epiLogMessage),
  handler: async (argv) => {
    await handleCommand(handleAddApiConfig(argv));
  },
} satisfies CommandModule;
