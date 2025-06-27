import input from '@inquirer/input';
import { userQuestions } from '../utils/constants.js';

const apiQuestions = userQuestions.api;

export const getBasePath = async () =>
  await input({
    message: apiQuestions.basePath,
    default: '',
  });

export const getBaseUri = async () =>
  await input({
    message: apiQuestions.baseUrl,
    validate: (message: string) => {
      if (!message) {
        return 'Base URL cannot be empty';
      }
      try {
        new URL(message);
        return true;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        return 'Invalid URL format';
      }
    },
  });
