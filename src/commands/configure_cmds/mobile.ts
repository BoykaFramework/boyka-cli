import { CommandModule } from 'yargs';
import { epiLogMessage, failureMessage } from '../../utils/constants.js';

export const mobileCommand = {
  command: 'mobile [name]',
  aliases: ['m'],
  describe: 'Add Mobile Boyka-Framework Config file',
  builder: (yargs) =>
    yargs
      .positional('name', {
        demandOption: true,
        describe: 'Name of the Mobile config block',
        type: 'string',
      })
      .check((argv) => {
        if (!argv.name) {
          throw new Error('Mobile config name should be provided!');
        }
      })
      .help('help')
      .showHelpOnFail(true, failureMessage('Mobile config'))
      .epilog(epiLogMessage),
  handler: (argv) => {
    // TODO: Mobile handler
    console.log(`Handle Mobile Config ${argv.name}...`);
  },
} satisfies CommandModule;
