import { select } from '@inquirer/prompts';
import questions from '../data/questions.json';

export const getBrowser = async () => {
  return await select({
    message: questions.web.browser,
    default: 'CHROME',
    choices: [
      {
        name: 'Chrome',
        value: 'CHROME',
        description: 'Chrome Browser',
      },
      {
        name: 'Edge',
        value: 'EDGE',
        description: 'Edge Browser',
      },
      {
        name: 'Firefox',
        value: 'FIREFOX',
        description: 'Firefox Browser',
      },
      {
        name: 'Safari',
        value: 'SAFARI',
        description: 'Safari Browser',
      },
    ],
  });
};
