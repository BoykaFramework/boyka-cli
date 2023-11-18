import { input, select } from '@inquirer/prompts';

export const getPlatform = async () => {
  return await select({
    message: 'What kind of platform you want to automate?',
    default: 'ui',
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
    default: 'web',
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
    validate: (message: string) => {
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
    validate: (message: string) => {
      if (!message) {
        throw new Error(
          'Password environment variable is required for running on Cloud platform...'
        );
      }
      return true;
    },
  });

export const getTarget = async () => {
  return await select({
    message: 'Where do you want to run your tests?',
    default: 'LOCAL',
    choices: [
      {
        name: 'Local',
        value: 'LOCAL',
        description: 'Local machine',
      },
      {
        name: 'BrowserStack',
        value: 'BROWSER_STACK',
        description: 'BrowserStack browsers / devices',
      },
      {
        name: 'LambdaTest Web',
        value: 'LAMBDA_TEST_WEB',
        description: 'LambdaTest Web Browsers',
      },
      {
        name: 'LambdaTest Mobile',
        value: 'LAMBDA_TEST_MOBILE',
        description: 'LambdaTest Mobile devices',
      },
    ],
  });
};
