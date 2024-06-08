import { CommandModule } from 'yargs';
import { epiLogMessage, failureMessage, handleCommand } from '../../utils/constants.js';
import { handleAddMobileConfig } from '../../handler/config/init/mobile.js';
import { BoykaError } from '../../utils/boyka-error.js';

export const iosCommand = {
  command: 'ios [name]',
  aliases: ['io'],
  describe: 'Add iOS Mobile Boyka-Framework Config file',
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
        describe: 'Name of the iOS Mobile config block',
        type: 'string',
      })
      .check((argv) => {
        if (!argv.name) {
          throw new BoykaError('iOS Mobile config name should be provided!');
        }
        return true;
      })
      .help('help')
      .showHelpOnFail(true, failureMessage('iOS Mobile config'))
      .epilog(epiLogMessage),
  handler: async (argv) => {
    await handleCommand(handleAddMobileConfig(argv, 'iOS'));
  },
} satisfies CommandModule;
