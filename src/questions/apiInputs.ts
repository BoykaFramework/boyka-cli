import { input } from '@inquirer/prompts';
import questions from '../data/questions.json';

const apiQuestions = questions.api;

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
