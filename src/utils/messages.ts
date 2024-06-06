const boykaSite = 'https://boykaframework.github.io/boyka-framework';
const epilog = `For more information, 
visit: ${boykaSite}`;
const commandFailure = (command: string) =>
  `❌ Something went wrong${command}! Run the command with '--help' option`;
const commandHelp = `
Check out the Boyka config documentation 👉 
[https://boykaframework.github.io/boyka-framework/docs/guides/configuration]

🗒️ You can update the generated config file to include more settings 🛠️  as per your requirement.
`;
const capabilitiesHelp = `
⚠️ Since you have selected Cloud platform to run your tests, 
you must also add cloud specific capabilities to the empty 'capabilities' block 
added to the config file.`;
const commandSuccess = (state: string, filePath: string) =>
  `Boyka config file ${state} at [${filePath}]`;
const commandError = (error: Error) => `
❌ Error occurred!
${error.message}
`;
const saveConfig = (state: string) => `${state} the [boyka-config.json] file...`;
const initConfig = (path: string) => `Creating Boyka config file at ${path}...`;
const pathNotFound = (path: string) => `Boyka config path [${path}] does not exists...`;
const pathNotFolder = (path: string) => `Config path [${path}] is not a folder...`;
const fileExists = (path: string) => `Boyka config file is already available at [${path}]...`;
const blockExists = (platform: string, configName: string) => `
${platform} Config already exists in the Boyka config file with the name: ${configName}...`;
const fileNotExists = (path: string) => `
Boyka config file does not exist at [${path}].

Create one by running command 'boyka config init'`;
const suggestions = `
👇 Suggestions to fix the above problems:`;

export {
  suggestions,
  fileNotExists,
  blockExists,
  fileExists,
  pathNotFolder,
  pathNotFound,
  initConfig,
  saveConfig,
  commandError,
  commandSuccess,
  capabilitiesHelp,
  commandHelp,
  commandFailure,
  epilog,
};
