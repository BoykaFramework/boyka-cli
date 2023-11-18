import yargs from 'yargs';
import fs from 'fs';
import path from 'path';
import { createApiSetting } from './api';
import { createWebSetting } from './web';
import { createMobileSetting } from './mobile';
import { configFileName } from '../../../utils/constants';
import { getPlatform, getPlatformType } from '../../../questions/inputs';
import { FrameworkSetting } from '../../../types/configType';
import { createConfigFile } from '../../../utils/json';

export const handleConfigInit = async (argv: yargs.ArgumentsCamelCase) => {
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
  if (platformType === 'web') {
    frameworkSetting = await createWebSetting();
  } else {
    frameworkSetting = await createMobileSetting(platformType);
  }
  return frameworkSetting;
};

const createConfigJson = async (configPath: string) => {
  console.info(`Creating Boyka config file at ${configPath}...`);
  validateConfigPath(configPath);
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
  createConfigFile(configPath, setting);
  return true;
};
