import { input, select } from '@inquirer/prompts';

export const getPort = async () =>
  await input({ message: 'On which port number you want to connect?', default: '0' });

export const getDeviceName = async () =>
  await input({ message: 'What is the name of your device?' });

export const getDeviceType = async () =>
  await select({
    message: 'What is the device type?',
    default: 'VIRTUAL',
    choices: [
      {
        name: 'Cloud',
        value: 'CLOUD',
        description: 'Cloud Device',
      },
      {
        name: 'Virtual',
        value: 'VIRTUAL',
        description: 'Virtual Device',
      },
    ],
  });

export const getOS = async () =>
  await select({
    message: 'What is the OS of the device?',
    default: 'ANDROID',
    choices: [
      {
        name: 'Android',
        value: 'ANDROID',
        description: 'Android Device',
      },
      {
        name: 'iOS',
        value: 'IOS',
        description: 'iOS Device',
      },
    ],
  });

export const getDeviceVersion = async () =>
  await input({ message: 'What is OS version of the device?' });

export const getAVDName = async () => await input({ message: 'What is the Emulator name?' });

export const getAppPath = async () => await input({ message: 'What is the path of your app?' });

export const getAppType = async () =>
  await select({
    message: 'What is the type of your application?',
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
  });
