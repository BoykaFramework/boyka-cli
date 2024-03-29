import chalk from 'chalk';
import questions from '../data/questions.json' assert { type: 'json' };
import { TargetProviders } from '../types/configType.js';

const danger = chalk.red.bold;
const warn = chalk.yellow.bold;
const success = chalk.green.bold;
const info = chalk.blueBright.bold;

export const userQuestions = questions;

export const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

export const epiLogMessage = info(`For more information, 
  visit: https://boykaframework.github.io/boyka-framework`);

export const configFileName = 'boyka-config.json';

export const failureMessage = (command: string = ''): string => {
  const targetCommand = command.length === 0 ? '' : ` in ${command}`;
  return danger(`Something went wrong${targetCommand}! Run the command with '--help' option`);
};

let targetProviders: TargetProviders;

export const setTarget = (target: TargetProviders) => (targetProviders = target);

export const getTarget = () => targetProviders;

export const helpMessage = info(`
Check out the Boyka config documentation 👉 
[https://boykaframework.github.io/boyka-framework/docs/guides/configuration]

🗒️  You can update the generated config file to include more settings 🛠️  as per your requirement.
`);

export const capabilitiesHelpMessage = warn(`
❗❗ Since you have selected Cloud platform to run your tests, 
you must also add cloud specific capabilities to the empty \`capabilities\` block 
added to the config file.`);

export const successMessage = (filePath: string) =>
  success(`Boyka config file created at [${filePath}]`);

export const errorMessage = (error: Error) =>
  danger(`Error occurred! ${error.message}
Caused by: ${error.cause}
`);

export const savingMessage = warn('Creating the [boyka-config.json] file...');

export const initMessage = (path: string) => warn(`Creating Boyka config file at ${path}...`);

export const configPathNotFound = (path: string) =>
  danger(`Boyka config path [${path}] does not exists...`);

export const configPathNotFolder = (path: string) =>
  danger(`Config path [${path}] is not a folder...`);

export const configFileExists = (path: string) =>
  danger(`Boyka config file is already available at [${path}]...`);
