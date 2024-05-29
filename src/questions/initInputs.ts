import { input, confirm } from '@inquirer/prompts';
import { userQuestions } from '../utils/constants.js';

export const getGroupId = async () => await input({ message: userQuestions.init.groupId });

export const hasSampleTests = async () =>
  await confirm({
    message: userQuestions.init.sampleTest,
    default: false,
  });
