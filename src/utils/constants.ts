import { TargetProviders } from '../types/configType';

export const epiLogMessage = `For more information, 
  visit: https://boykaframework.github.io/boyka-framework`;

export const configFileName = 'boyka-config.json';

export const failureMessage = (command: string = ''): string => {
  const targetCommand = command.length === 0 ? '' : ` in ${command}`;
  return `Something went wrong${targetCommand}! Run the command with '--help' option`;
};

let targetProviders: TargetProviders;

export const setTarget = (target: TargetProviders) => (targetProviders = target);

export const getTarget = () => targetProviders;

export const helpMessage = `
Check out the Boyka config documentation 👉 
[https://boykaframework.github.io/boyka-framework/docs/guides/configuration]

🗒️  You can update the generated config file to include more settings 🛠️  as per your requirement.
`;

export const capabilitiesHelpMessage = `
❗❗ Since you have selected Cloud platform to run your tests, 
you must also add cloud specific capabilities to the empty \`capabilities\` block 
added to the config file.`;
