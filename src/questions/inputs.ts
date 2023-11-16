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

export const getPlatformType = async () => {
  return await select({
    message: 'What type of platform you want to automate?',
    default: 'Web',
    choices: [
      {
        name: 'Web',
        value: 'web',
        description: 'Web application',
      },
      {
        name: 'Android',
        value: 'android',
        description: 'Android application',
      },
      {
        name: 'iOS',
        value: 'ios',
        description: 'iOS application',
      },
    ],
  });
};

export const getConfigName = async (platform: string) =>
  await input({ message: `What name you want to give to ${platform} config?` });

export const getUserName = async () =>
  await input({
    message: 'What is the environment variable for your user name?',
    validate: (message) => {
      if (!message) {
        throw new Error(
          'User name environment variable is required for running on Cloud platform...'
        );
      }
      return true;
    },
  });

export const getPassword = async () =>
  await input({
    message: 'What is the environment variable for your password?',
    validate: (message) => {
      if (!message) {
        throw new Error(
          'Password environment variable is required for running on Cloud platform...'
        );
      }
      return true;
    },
  });
