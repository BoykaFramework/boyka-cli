import { input, select } from '@inquirer/prompts';
import { questions } from '../utils/constants';

export const getPlatform = async () => {
  return await select({
    message: questions.platform,
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
    message: questions.platformType,
    default: 'Web',
    choices: [
      {
        name: 'Web',
        value: 'Web',
        description: 'Web application',
      },
      {
        name: 'Android',
        value: 'Android',
        description: 'Android application',
      },
      {
        name: 'iOS',
        value: 'iOS',
        description: 'iOS application',
      },
    ],
  });
};

export const getConfigName = async (platform: string) =>
  await input({ message: questions.configName.replace('${platform}', platform) });

export const getUserName = async () =>
  await input({
    message: questions.cloudUser,
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
    message: questions.cloudKey,
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
    message: questions.target,
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
        name: 'LambdaTest',
        value: 'LAMBDA_TEST',
        description: 'LambdaTest browsers / devices',
      },
    ],
  });
};
