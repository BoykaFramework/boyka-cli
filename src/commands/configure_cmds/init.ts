import { CommandModule } from 'yargs';
import { epiLogMessage, failureMessage } from '../../utils/constants';

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
  handler: (argv) => {
    // TODO: init handler
    console.log(`Handle init Config at ${argv.path}...`);
  },
} satisfies CommandModule;
