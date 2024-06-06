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
        throw new Error('Base URL cannot be empty.');
      }
      return true;
    },
  });
