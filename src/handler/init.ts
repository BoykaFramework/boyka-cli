import yargs from 'yargs';
import fs from 'fs';
import path from 'path';
import { configFileName } from '../utils/constants';
import { getConfigName, getPlatform, getPlatformType } from '../questions/inputs';
import {
  FrameworkSetting,
  defaultApiSetting,
  defaultUiSetting,
  defaultWebSetting,
} from '../types/configType';
import { createConfigFile } from '../utils/json';
import { updateApi } from './api';
import { updateWeb } from './web';

export const handleConfigInit = async (argv: yargs.ArgumentsCamelCase) => {
  const configPath = argv.path as string;
  try {
    await createConfigJson(configPath);
  } catch (error: any) {
    console.error(error.message);
    process.exit(0);
  }
};

const checkConfigFile = (configPath: string) => {
  if (fs.existsSync(path.join(configPath, configFileName))) {
    console.error('Config file already exists...');
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
  checkConfigFile(configPath);
  checkConfigPath(configPath);
};

const createWebSetting = async () => {
  const configName = await getConfigName('Web');
  const frameworkSetting: FrameworkSetting = {
    ui: {
      ...defaultUiSetting,
      web: {
        [configName]: {
          ...defaultWebSetting,
        },
      },
    },
  };
  const web = frameworkSetting.ui?.web;
  if (web) await updateWeb(web[configName]);
  return frameworkSetting;
};

const createUiSetting = async () => {
  const platformType = await getPlatformType();
  let frameworkSetting: FrameworkSetting;
  switch (platformType) {
    case 'web':
    default:
      frameworkSetting = await createWebSetting();
  }
  return frameworkSetting;
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
  if (api) updateApi(api[configName]);
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
