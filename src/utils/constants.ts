import chalk from 'chalk';
import questions from '../data/questions.json' assert { type: 'json' };
import { TargetProviders } from '../types/enum-types.js';
import { createSpinner } from 'nanospinner';
import { Message } from '../types/config-type.js';
import {
  blockExists,
  capabilitiesHelp,
  commandError,
  commandFailure,
  commandHelp,
  commandSuccess,
  epilog,
  fileExists,
  fileNotExists,
  initConfig,
  pathNotFolder,
  pathNotFound,
  saveConfig,
  suggestions,
} from './messages.js';

export const danger = chalk.red.bold;
export const warn = chalk.yellow.bold;
export const success = chalk.green.bold;
export const info = chalk.blueBright.bold;

export const userQuestions = questions;

export const configFileName = 'boyka-config.json';

export const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

export const epiLogMessage = info(epilog);

export const failureMessage = (command: string = ''): string => {
  const targetCommand = command.length === 0 ? '' : ` in ${command}`;
  return danger(commandFailure(targetCommand));
};

let targetProviders: TargetProviders;

export const setTarget = (target: TargetProviders) => (targetProviders = target);

export const getTarget = () => targetProviders;

export const helpMessage = info(commandHelp);

export const capabilitiesHelpMessage = warn(capabilitiesHelp);

export const successMessage = (filePath: string, state: string) =>
  success(commandSuccess(state, filePath));

export const errorMessage = (error: Error) => danger(commandError(error));

export const savingMessage = (state: string) => {
  const savingState = state === 'created' ? 'Creating' : 'Updating';
  return warn(saveConfig(savingState));
};

export const initMessage = (path: string) => warn(initConfig(path));

export const configPathNotFound = (path: string) => danger(pathNotFound(path));

export const configPathNotFolder = (path: string) => danger(pathNotFolder(path));

export const configFileExists = (path: string) => danger(fileExists(path));

export const configBlockExists = (platform: string, configName: string) =>
  danger(blockExists(platform, configName));

export const configFileNotExists = (path: string) => danger(fileNotExists(path));

export const handleCommand = async (handler: Promise<void>) => {
  try {
    await handler;
    const target = getTarget();
    if (target && target !== TargetProviders.LOCAL) {
      console.log(capabilitiesHelpMessage);
    }
    console.log(helpMessage);
  } catch (error: any) {
    console.error(errorMessage(error));
    if (error instanceof Error) {
      console.error(error.stack);
    }
    process.exit(1);
  }
};

export const executeTask = async (task: Promise<boolean> | boolean, message: Message) => {
  const spinner = createSpinner(message.loading).start();
  const result = await task;
  if (!result) {
    spinner.error({ text: danger(message.error) });
    if (message.suggestion) {
      console.log(info(suggestions));
      spinner.warn({ text: warn(message.suggestion) });
    }
    process.exit(1);
  } else {
    spinner.success({ text: success(message.success) });
  }
};
