import { CommandModule } from 'yargs';
import { epiLogMessage, failureMessage } from '../utils/constants.js';
import { apiCommand } from './configure_cmds/api.js';
import { initCommand } from './configure_cmds/init.js';
import { androidCommand } from './configure_cmds/android.js';
import { webCommand } from './configure_cmds/web.js';
import { iosCommand } from './configure_cmds/ios.js';
import { macCommand } from './configure_cmds/mac.js';

export const configureCommand = {
  command: 'configure',
  aliases: ['config', 'conf', 'c'],
  describe: 'Configure Boyka-Framework',
  builder: (yargs) =>
    yargs
      .command(apiCommand)
      .command(initCommand)
      .command(androidCommand)
      .command(iosCommand)
      .command(webCommand)
      .command(macCommand)
      .demandCommand()
      .strict()
      .help('help')
      .showHelpOnFail(true, failureMessage('configure'))
      .epilog(epiLogMessage),
  handler: () => {},
} satisfies CommandModule;
