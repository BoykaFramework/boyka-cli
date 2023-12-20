import { ArgumentsCamelCase } from 'yargs';
import fs from 'fs';
import path from 'path';
import { createApiSetting } from './api.js';
import { createWebSetting } from './web.js';
import { createMobileSetting } from './mobile.js';
import { configFileName } from '../../../utils/constants.js';
import { getPlatform, getPlatformType } from '../../../questions/inputs.js';
import { FrameworkSetting } from '../../../types/configType.js';
import { createConfigFile } from '../../../utils/json.js';

export const handleConfigInit = async (argv: ArgumentsCamelCase) => {
  const configPath = argv.path as string;
  await createConfigJson(configPath);
};

const checkConfigFile = (configPath: string) => {
  if (fs.existsSync(path.join(configPath, configFileName))) {
    throw new Error(`Boyka config file is already available at [${configPath}]...`);
  }
};

const checkConfigPath = (configPath: string) => {
  if (!fs.lstatSync(configPath).isDirectory()) {
    throw new Error(`Config path [${configPath}] is not a folder...`);
  }
  if (!fs.existsSync(configPath)) {
    throw new Error(`Boyka config path [${configPath}] does not exists...`);
  }
};

const validateConfigPath = (configPath: string) => {
  checkConfigPath(configPath);
  checkConfigFile(configPath);
};

const createUiSetting = async () => {
  const platformType = await getPlatformType();
  let frameworkSetting: FrameworkSetting;
  if (platformType === 'Web') {
    frameworkSetting = await createWebSetting();
  } else {
    frameworkSetting = await createMobileSetting(platformType);
  }
  return frameworkSetting;
};

const createConfigJson = async (configPath: string) => {
  const path = configPath === '.' ? process.cwd() : configPath;
  console.info(`Creating Boyka config file at ${path}...`);
  validateConfigPath(path);
  let setting: FrameworkSetting;
  switch (await getPlatform()) {
    case 'ui':
      setting = await createUiSetting();
      break;

    case 'api':
    default:
      setting = await createApiSetting();
      break;
  }
  createConfigFile(path, setting);
  return true;
};
