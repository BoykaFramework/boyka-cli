import { input, select } from '@inquirer/prompts';

export const getPlatform = async () => {
  return await select({
    message: 'What kind of platform you want to automate?',
    default: 'UI',
    choices: [
      {
        name: 'UI',
        value: 'ui',
        description: 'UI based applications',
      },
      {
        name: 'API',
        value: 'api',
        description: 'API based applications',
      },
    ],
  });
};

export const getConfigName = async (platform: string) =>
  await input({ message: `What name you want to give to ${platform} config?` });
