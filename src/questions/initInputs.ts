import input from '@inquirer/input';
import confirm from '@inquirer/confirm';
import { userQuestions } from '../utils/constants.js';

export const getGroupId = async () =>
  await input({
    message: userQuestions.init.groupId,
    validate: (message: string) => {
      if (!message) {
        return 'Group ID cannot be empty';
      }
      const groupIdRegex = /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*$/;
      return groupIdRegex.test(message) || 'Please enter a valid Group identifier.';
    },
  });

export const isSampleTest = async () =>
  await confirm({
    message: userQuestions.init.sampleTest,
    default: false,
  });
