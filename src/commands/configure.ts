import { CommandModule } from 'yargs';
import { epiLogMessage, failureMessage } from '../utils/constants.js';
import { apiCommand } from './configure_cmds/api.js';
import { initCommand } from './configure_cmds/init.js';
import { mobileCommand } from './configure_cmds/mobile.js';
import { webCommand } from './configure_cmds/web.js';

export const configureCommand = {
  command: 'configure',
  aliases: ['config', 'conf', 'c'],
  describe: 'Configure Boyka-Framework',
  builder: (yargs) =>
    yargs
      .command(apiCommand)
      .command(initCommand)
      .command(mobileCommand)
      .command(webCommand)
      .demandCommand()
      .strict()
      .help('help')
      .showHelpOnFail(true, failureMessage('configure'))
      .epilog(epiLogMessage),
  handler: () => {},
} satisfies CommandModule;
