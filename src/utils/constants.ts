import chalk from 'chalk';
import questions from '../data/questions.json' assert { type: 'json' };
import { TargetProviders } from '../types/enum-types.js';
import { createSpinner } from 'nanospinner';
import { Message } from '../types/config-type.js';

export const danger = chalk.red.bold;
export const warn = chalk.yellow.bold;
export const success = chalk.green.bold;
export const info = chalk.blueBright.bold;

export const userQuestions = questions;

export const configFileName = 'boyka-config.json';

export const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

export const epiLogMessage = info(`For more information, 
  visit: https://boykaframework.github.io/boyka-framework`);

export const failureMessage = (command: string = ''): string => {
  const targetCommand = command.length === 0 ? '' : ` in ${command}`;
  return danger(`❌ Something went wrong${targetCommand}! Run the command with '--help' option`);
};

let targetProviders: TargetProviders;

export const setTarget = (target: TargetProviders) => (targetProviders = target);

export const getTarget = () => targetProviders;

export const helpMessage = info(`
Check out the Boyka config documentation 👉 
[https://boykaframework.github.io/boyka-framework/docs/guides/configuration]

🗒️ You can update the generated config file to include more settings 🛠️  as per your requirement.
`);

export const capabilitiesHelpMessage = warn(`
⚠️ Since you have selected Cloud platform to run your tests, 
you must also add cloud specific capabilities to the empty \`capabilities\` block 
added to the config file.`);

export const successMessage = (filePath: string, state: string) =>
  success(`Boyka config file ${state} at [${filePath}]`);

export const errorMessage = (error: Error) =>
  danger(`
❌ Error occurred!
${error.message}
`);

export const savingMessage = (state: string) => {
  const savingState = state === 'created' ? 'Creating' : 'Updating';
  return warn(`${savingState} the [boyka-config.json] file...`);
};

export const initMessage = (path: string) => warn(`Creating Boyka config file at ${path}...`);

export const configPathNotFound = (path: string) =>
  danger(`Boyka config path [${path}] does not exists...`);

export const configPathNotFolder = (path: string) =>
  danger(`Config path [${path}] is not a folder...`);

export const configFileExists = (path: string) =>
  danger(`Boyka config file is already available at [${path}]...`);

export const configBlockExists = (platform: string, configName: string) =>
  danger(`
${platform} Config already exists in the Boyka config file with the name: ${configName}...`);

export const configFileNotExists = (path: string) =>
  danger(
    `
Boyka config file does not exist at [${path}].

Create one by running command 'boyka config init'`,
  );

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
    process.exit(1);
  }
};

export const executeTask = async (task: Promise<boolean> | boolean, message: Message) => {
  const spinner = createSpinner(message.loading).start();
  const result = await task;
  if (!result) {
    spinner.error({ text: danger(message.error) });
    if (message.suggestion) {
      console.log(
        info(`
👇 Suggestions to fix the above problems:`),
      );
      spinner.warn({ text: warn(message.suggestion) });
    }
    process.exit(1);
  } else {
    spinner.success({ text: success(message.success) });
  }
};
