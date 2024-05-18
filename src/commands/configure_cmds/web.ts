import { CommandModule } from 'yargs';
import { epiLogMessage, failureMessage, handleCommand } from '../../utils/constants.js';
import { handleAddWebConfig } from '../../handler/config/init/web.js';

export const webCommand = {
  command: 'web [name]',
  aliases: ['w'],
  describe: 'Add Web Boyka-Framework Config file',
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
        describe: 'Name of the Web config block',
        type: 'string',
      })
      .check((argv) => {
        if (!argv.name) {
          throw new Error('Web config name should be provided!');
        }
        return true;
      })
      .help('help')
      .showHelpOnFail(true, failureMessage('Web config'))
      .epilog(epiLogMessage),
  handler: async (argv) => {
    await handleCommand(handleAddWebConfig(argv));
  },
} satisfies CommandModule;
