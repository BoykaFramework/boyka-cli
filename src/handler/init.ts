import yargs from 'yargs';
import fs from 'fs';
import path from 'path';
import { configFileName } from '../utils/constants';
import { getConfigName, getPlatform } from '../questions/inputs';
import { FrameworkSetting, defaultApiSetting } from '../types/configType';
import { createConfigFile } from '../utils/json';
import { getBasePath, getBaseUri } from '../questions/apiInputs';

export const handleConfigInit = async (argv: yargs.ArgumentsCamelCase) => {
  const configPath = argv.path as string;
  try {
    await createConfigJson(configPath);
  } catch (error: any) {
    console.error(error.message);
    process.exit(0);
  }
};

const validateConfigPath = (configPath: string) => {
  if (fs.existsSync(path.join(configPath, configFileName))) {
    console.error('Config file already exists...');
    throw new Error(`Boyka config file is already available at [${configPath}]...`);
  }
};

const createApiSetting = async () => {
  const configName = await getConfigName('API');
  const frameworkSetting: FrameworkSetting = {
    api: {
      [configName]: {
        ...defaultApiSetting,
      },
    },
  };
  const api = frameworkSetting.api;
  if (api) {
    api[configName].base_uri = await getBaseUri();
    api[configName].base_path = await getBasePath();
  }
  return frameworkSetting;
};

const createConfigJson = async (configPath: string) => {
  console.info(`Creating Boyka config file at ${configPath}...`);
  validateConfigPath(configPath);
  let setting: FrameworkSetting;
  switch (await getPlatform()) {
    case 'api':
    default:
      setting = await createApiSetting();
      break;
  }
  createConfigFile(configPath, setting);
  return true;
};
