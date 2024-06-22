import input from '@inquirer/input';
import select from '@inquirer/select';
import { userQuestions } from '../utils/constants.js';
import { ApplicationType } from '../types/enum-types.js';

const mobileQuestions = userQuestions.mobile;

export const getPort = async () => await input({ message: mobileQuestions.port, default: '0' });

export const getDeviceName = async () => await input({ message: mobileQuestions.deviceName });

export const getDeviceVersion = async () => await input({ message: mobileQuestions.deviceVersion });

export const getAVDName = async () => await input({ message: mobileQuestions.avdName });

export const getAppPath = async () => await input({ message: mobileQuestions.appPath });

export const getAppUrl = async () =>
  await input({
    message: mobileQuestions.appUrl,
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
