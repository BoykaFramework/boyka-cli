import input from '@inquirer/input';
import confirm from '@inquirer/confirm';
import { userQuestions } from '../utils/constants.js';

export const getGroupId = async () =>
  await input({
    message: userQuestions.init.groupId,
    validate: (message: string) => {
      if (!message) {
        throw new Error('Group ID cannot be empty.');
      }
      return true;
    },
  });

export const isSampleTest = async () =>
  await confirm({
    message: userQuestions.init.sampleTest,
    default: false,
  });
