import { CommandModule } from 'yargs';
import { epiLogMessage, failureMessage } from '../../utils/constants';
import { handleConfigInit } from '../../handler/config/init/init';

export = {
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
    try {
      await handleConfigInit(argv);
    } catch (error: any) {
      console.error(error.message);
      process.exit(1);
    }
  },
} satisfies CommandModule;
