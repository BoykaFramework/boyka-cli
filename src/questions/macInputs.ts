import input from '@inquirer/input';
import { userQuestions } from '../utils/constants.js';

const macQuestions = userQuestions.desktop;

export const getMacPort = async () => await input({ message: macQuestions.port, default: '0' });

export const getMachineVersion = async () => {
  const version = await input({
    message: macQuestions.machineVersion,
    default: '15.0',
  });

  return version;
};

export const getAppBundleId = async () => {
  const bundleId = await input({
    message: macQuestions.appBundleId,
    default: '',
    validate: (input) => {
      const bundleIdRegex = /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*$/;
      return bundleIdRegex.test(input) || 'Please enter a valid bundle identifier.';
    },
  });

  return bundleId;
};
