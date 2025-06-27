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
  executeTask,
  createConfigMessages,
} from '../../../utils/constants.js';
import { FrameworkSetting, UserInput } from '../../../types/types.js';
import { createConfigFile } from '../../../utils/json.js';
import { getUserInputs } from '../../user-inputs.js';
import { BoykaError } from '../../../utils/boyka-error.js';
import { createMacSetting } from './mac.js';

export const handleConfigInit = async (configPath: string) => {
  console.info(initMessage(configPath));
  const inputs = await getUserInputs();
  createConfigJson(inputs, configPath);
};

const checkConfigFile = (configPath: string) => {
  if (fs.existsSync(path.join(configPath, configFileName))) {
    throw new BoykaError(configFileExists(configPath));
  }
};

const checkConfigPath = (configPath: string) => {
  if (!fs.lstatSync(configPath).isDirectory()) {
    throw new BoykaError(configPathNotFolder(configPath));
  }
  if (!fs.existsSync(configPath)) {
    throw new BoykaError(configPathNotFound(configPath));
  }
};

const validateConfigPath = (configPath: string) => {
  checkConfigPath(configPath);
  checkConfigFile(configPath);
};

const createUiSetting = (inputs: UserInput) => {
  let frameworkSetting: FrameworkSetting;
  if (inputs.sub_platform === 'Web') {
    frameworkSetting = createWebSetting(inputs);
  } else if (inputs.sub_platform === 'Mac') {
    frameworkSetting = createMacSetting(inputs);
  } else {
    frameworkSetting = createMobileSetting(inputs);
  }
  return frameworkSetting;
};

export const createConfigJson = async (inputs: UserInput, configPath: string) => {
  const path = configPath === '.' ? process.cwd() : configPath;
  validateConfigPath(path);
  let setting: FrameworkSetting;
  if (inputs.platform === 'ui') {
    setting = createUiSetting(inputs);
  } else {
    setting = createApiSetting(inputs);
  }
  await executeTask(createConfigFile(path, setting), createConfigMessages(path, 'created'));
  return true;
};
