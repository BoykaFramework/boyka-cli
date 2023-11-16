import { input } from '@inquirer/prompts';

export const getBasePath = async () =>
  await input({
    message: 'What is the base path for the API?',
    default: '',
  });

export const getBaseUri = async () =>
  await input({
    message: 'What is the base url for the API?',
    validate: (message) => {
      if (!message) {
        throw new Error('Base URL cannot be empty.');
      }
      return true;
    },
  });
