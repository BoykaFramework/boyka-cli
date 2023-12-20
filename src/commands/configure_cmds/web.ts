import { CommandModule } from 'yargs';
import { epiLogMessage, failureMessage } from '../../utils/constants.js';

export const webCommand = {
  command: 'web [name]',
  aliases: ['w'],
  describe: 'Add Web Boyka-Framework Config file',
  builder: (yargs) =>
    yargs
      .positional('name', {
        demandOption: true,
        describe: 'Name of the Web config block',
        type: 'string',
      })
      .check((argv) => {
        if (!argv.name) {
          throw new Error('Web config name should be provided!');
        }
      })
      .help('help')
      .showHelpOnFail(true, failureMessage('Web config'))
      .epilog(epiLogMessage),
  handler: (argv) => {
    // TODO: web handler
    console.log(`Handle Web Config ${argv.name}...`);
  },
} satisfies CommandModule;
