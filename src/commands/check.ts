import { CommandModule } from 'yargs';
import { epiLogMessage, handleCommand } from '../utils/constants.js';
import { handleCheckSetup } from '../handler/check-handler.js';

export const checkCommand = {
  command: 'check',
  aliases: ['check', 'chk', 'ch'],
  describe: 'Check Boyka-Framework Setup on your machine',
  builder: (yargs) => yargs.strict().help('help').showHelpOnFail(false).epilog(epiLogMessage),
  handler: async () => {
    await handleCommand(handleCheckSetup());
  },
} satisfies CommandModule;
