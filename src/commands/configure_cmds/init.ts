import { CommandModule } from 'yargs';
import {
  capabilitiesHelpMessage,
  epiLogMessage,
  failureMessage,
  getTarget,
  helpMessage,
} from '../../utils/constants.js';
import { handleConfigInit } from '../../handler/config/init/init.js';
import { TargetProviders } from '../../types/configType.js';

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
    try {
      await handleConfigInit(argv);
      if (getTarget() !== TargetProviders.LOCAL) {
        console.log(capabilitiesHelpMessage);
      }
      console.log(helpMessage);
    } catch (error: any) {
      console.error(error.message);
      process.exit(1);
    }
  },
} satisfies CommandModule;
