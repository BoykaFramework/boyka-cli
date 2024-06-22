import { CommandModule } from 'yargs';
import { epiLogMessage, handleCommand } from '../utils/constants.js';
import { handleDoctor } from '../handler/doctor-handler.js';

export const doctorCommand = {
  command: 'doctor',
  aliases: ['doctor', 'doc', 'dc'],
  describe: 'Boyka-Framework doctor to check Setup on your machine',
  builder: (yargs) => yargs.strict().help('help').showHelpOnFail(false).epilog(epiLogMessage),
  handler: async () => {
    await handleCommand(handleDoctor());
  },
} satisfies CommandModule;
