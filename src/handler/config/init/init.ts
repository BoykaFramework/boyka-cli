import fs from 'fs';
import path from 'path';
import { createApiSetting } from './api.js';
import { createWebSetting } from './web.js';
import { createMobileSetting } from './mobile.js';
import {
  configFileExists,
  configFileName,
  configPathNotFolder,
  configPathNotFound,
  initMessage,
} from '../../../utils/constants.js';
import { getPlatform, getPlatformType } from '../../../questions/inputs.js';
import { FrameworkSetting } from '../../../types/config-type.js';
import { createConfigFile } from '../../../utils/json.js';

export const handleConfigInit = async (configPath: string) => {
  await createConfigJson(configPath);
};

const checkConfigFile = (configPath: string) => {
  if (fs.existsSync(path.join(configPath, configFileName))) {
    throw new Error(configFileExists(configPath));
  }
};

const checkConfigPath = (configPath: string) => {
  if (!fs.lstatSync(configPath).isDirectory()) {
    throw new Error(configPathNotFolder(configPath));
  }
  if (!fs.existsSync(configPath)) {
    throw new Error(configPathNotFound(configPath));
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
  console.info(initMessage(path));
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
  createConfigFile(path, setting, 'created');
  return true;
};
