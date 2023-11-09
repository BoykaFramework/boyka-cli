import { CommandModule } from 'yargs';
import { epiLogMessage, failureMessage } from '../../utils/constants';

export = {
  command: 'api [name]',
  aliases: ['a'],
  describe: 'Add API Boyka-Framework Config file',
  builder: (yargs) =>
    yargs
      .positional('name', {
        demandOption: true,
        describe: 'Name of the API config block',
        type: 'string',
      })
      .check((argv) => {
        if (!argv.name) {
          throw new Error('API config name should be provided!');
        } else {
          return true;
        }
      })
      .help('help')
      .showHelpOnFail(true, failureMessage('API Config'))
      .epilog(epiLogMessage),
  handler: (argv) => {
    // TODO: API handler
    console.log(`Handle API Config ${argv.name}...`);
  },
} satisfies CommandModule;
