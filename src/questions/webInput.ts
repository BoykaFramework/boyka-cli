import { select } from '@inquirer/prompts';

export const getBrowser = async () => {
  return await select({
    message: 'What browser you want to automate?',
    default: 'Chrome',
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

export const getTarget = async () => {
  return await select({
    message: 'Where do you want to run your tests?',
    default: 'Local',
    choices: [
      {
        name: 'Local',
        value: 'LOCAL',
        description: 'Local machine',
      },
      {
        name: 'BrowserStack',
        value: 'BROWSER_STACK',
        description: 'BrowserStack browsers / devices',
      },
      {
        name: 'LambdaTest Web',
        value: 'LAMBDA_TEST_WEB',
        description: 'LambdaTest Web Browsers',
      },
      {
        name: 'LambdaTest Mobile',
        value: 'LAMBDA_TEST_MOBILE',
        description: 'LambdaTest Mobile devices',
      },
    ],
  });
};
