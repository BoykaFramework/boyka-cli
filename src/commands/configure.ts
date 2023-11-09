import { CommandModule } from 'yargs';
import { epiLogMessage, failureMessage } from '../utils/constants';

export = {
  command: 'configure',
  aliases: ['config', 'conf', 'c'],
  describe: 'Configure Boyka-Framework',
  builder: (yargs) =>
    yargs
      .commandDir('configure_cmds')
      .demandCommand()
      .strict()
      .help('help')
      .showHelpOnFail(true, failureMessage('configure'))
      .epilog(epiLogMessage),
  handler: () => {},
} satisfies CommandModule;
