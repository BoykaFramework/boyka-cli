import input from '@inquirer/input';
import select from '@inquirer/select';
import { userQuestions } from '../utils/constants.js';
import { ApplicationType } from '../types/enum-types.js';
import fs from 'fs';

const mobileQuestions = userQuestions.mobile;

export const getPort = async () =>
  await input({
    message: mobileQuestions.port,
    default: '0',
    validate: (input: string) => {
      const portNumber = parseInt(input, 10);
      if (isNaN(portNumber) || portNumber < 0 || portNumber > 65535) {
        return 'Please enter a valid port number between 0 and 65535.';
      }
      return true;
    },
  });

export const getDeviceName = async () => await input({ message: mobileQuestions.deviceName });

export const getDeviceVersion = async () => await input({ message: mobileQuestions.deviceVersion });

export const getAVDName = async () => await input({ message: mobileQuestions.avdName });

export const getAppPath = async () =>
  await input({
    message: mobileQuestions.appPath,
    validate: (input: string) => {
      if (!input) {
        return 'Application path cannot be empty.';
      }
      if (!fs.existsSync(input)) {
        return 'The specified path does not exist.';
      }
      if (!input.endsWith('.apk') && !input.endsWith('.ipa') && !input.endsWith('.app')) {
        return 'Please provide a valid application file (APK, IPA, or APP).';
      }
      return true;
    },
  });

export const getAppUrl = async () =>
  await input({
    message: mobileQuestions.appUrl,
    validate: (input: string) => {
      if (!input) {
        return 'Application URL cannot be empty.';
      }
      return true;
    },
  });

export const getAppType = async () =>
  (await select({
    message: mobileQuestions.appType,
    default: 'NATIVE',
    choices: [
      {
        name: 'Hybrid',
        value: 'HYBRID',
        description: 'Hybrid application',
      },
      {
        name: 'Native',
        value: 'NATIVE',
        description: 'Native application',
      },
      {
        name: 'Web',
        value: 'WEB',
        description: 'Web application',
      },
    ],
  })) as ApplicationType;
