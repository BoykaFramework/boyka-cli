import { input, select } from '@inquirer/prompts';
import { userQuestions } from '../utils/constants.js';

export const getPlatform = async () => {
  return await select({
    message: userQuestions.platform,
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
    message: userQuestions.platformType,
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
  await input({ message: userQuestions.configName.replace('${platform}', platform) });

export const getUserName = async () =>
  await input({
    message: userQuestions.cloudUser,
    validate: (message: string) => {
      if (!message) {
        throw new Error(
          'User name environment variable is required for running on Cloud platform...',
        );
      }
      return true;
    },
  });

export const getPassword = async () =>
  await input({
    message: userQuestions.cloudKey,
    validate: (message: string) => {
      if (!message) {
        throw new Error(
          'Password environment variable is required for running on Cloud platform...',
        );
      }
      return true;
    },
  });

export const getTarget = async () => {
  return await select({
    message: userQuestions.target,
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
