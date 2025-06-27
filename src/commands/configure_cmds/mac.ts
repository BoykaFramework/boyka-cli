import { CommandModule } from 'yargs';
import { epiLogMessage, failureMessage, handleCommand } from '../../utils/constants.js';
import { BoykaError } from '../../utils/boyka-error.js';
import { handleMacConfig } from '../../handler/config/init/mac.js';

export const macCommand = {
  command: 'mac [name]',
  aliases: ['m'],
  describe: 'Add Mac OS Desktop Boyka-Framework Config file',
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
        describe: 'Name of the Mac OS Desktop config block',
        type: 'string',
      })
      .check((argv) => {
        if (!argv.name) {
          throw new BoykaError('Mac OS Desktop config name should be provided!');
        }
        return true;
      })
      .help('help')
      .showHelpOnFail(true, failureMessage('Mac OS Desktop config'))
      .epilog(epiLogMessage),
  handler: async (argv) => {
    await handleCommand(handleMacConfig(argv, 'Mac'));
  },
} satisfies CommandModule;
