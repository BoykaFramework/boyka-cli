import { CommandModule } from 'yargs';

export = {
  command: 'init',
  aliases: ['i'],
  describe: 'Initialize Boyka-Framework Config file',
  builder: {},
  handler: () => {
    // TODO: init handler
    console.log('Handle init Config...');
  },
} satisfies CommandModule;
