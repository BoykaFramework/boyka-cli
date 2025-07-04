import input from '@inquirer/input';
import select from '@inquirer/select';
import { userQuestions } from '../utils/constants.js';
import { Language, TargetProviders } from '../types/enum-types.js';

export const getPlatform = async () =>
  await select({
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

export const getPlatformType = async () =>
  await select({
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
      {
        name: 'Mac OS',
        value: 'Mac',
        description: 'Mac OS Desktop application',
      },
    ],
  });

export const getConfigName = async (platform: string) =>
  await input({
    message: userQuestions.configName.replace('${platform}', platform),
    validate: (message: string) => {
      if (!message) {
        return 'Configuration name cannot be empty';
      }
      if (/\s/.test(message)) {
        return 'Configuration name cannot contain spaces';
      }
      return true;
    },
  });

export const getUserName = async () =>
  await input({
    message: userQuestions.cloudUser,
    validate: (message: string) => {
      if (!message) {
        return 'User name environment variable is required for running on Cloud platform...';
      }
      return true;
    },
  });

export const getPassword = async () =>
  await input({
    message: userQuestions.cloudKey,
    validate: (message: string) => {
      if (!message) {
        return 'Password environment variable is required for running on Cloud platform...';
      }
      return true;
    },
  });

export const getTargetProvider = async () =>
  (await select({
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
        name: 'LambdaTest Browsers',
        value: 'LAMBDA_TEST_WEB',
        description: 'LambdaTest Browsers',
      },
      {
        name: 'LambdaTest Devices',
        value: 'LAMBDA_TEST_MOBILE',
        description: 'LambdaTest Mobile Devices',
      },
    ],
  })) as TargetProviders;

export const getLanguage = async () =>
  (await select({
    message: userQuestions.language,
    default: 'English',
    choices: [
      {
        name: 'English',
        value: 'EN',
        description: 'English language',
      },
      {
        name: 'Arabic',
        value: 'AR',
        description: 'Arabic language',
      },
      {
        name: 'German',
        value: 'GR',
        description: 'German language',
      },
    ],
  })) as Language;
