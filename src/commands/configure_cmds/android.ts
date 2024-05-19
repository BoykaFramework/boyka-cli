import { CommandModule } from 'yargs';
import { epiLogMessage, failureMessage, handleCommand } from '../../utils/constants.js';
import { handleAddMobileConfig } from '../../handler/config/init/mobile.js';

export const androidCommand = {
  command: 'android [name]',
  aliases: ['ad'],
  describe: 'Add Android Mobile Boyka-Framework Config file',
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
        describe: 'Name of the Android Mobile config block',
        type: 'string',
      })
      .check((argv) => {
        if (!argv.name) {
          throw new Error('Android Mobile config name should be provided!');
        }
        return true;
      })
      .help('help')
      .showHelpOnFail(true, failureMessage('Android Mobile config'))
      .epilog(epiLogMessage),
  handler: async (argv) => {
    await handleCommand(handleAddMobileConfig(argv, 'Android'));
  },
} satisfies CommandModule;
