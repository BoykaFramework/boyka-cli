import select from '@inquirer/select';
import { userQuestions } from '../utils/constants.js';

export const getBrowser = async () =>
  await select({
    message: userQuestions.web.browser,
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
