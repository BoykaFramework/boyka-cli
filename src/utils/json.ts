import fs from 'fs';
import path from 'path';
import { FrameworkSetting } from '../types/types.js';
import { configFileName, configFileNotExists } from './constants.js';
import { BoykaError } from './boyka-error.js';

export const createConfigFile = (filePath: string, setting: FrameworkSetting) => {
  const content = JSON.stringify(setting, null, 2);
  try {
    fs.writeFileSync(path.join(filePath, configFileName), content);
    return true;
  } catch {
    return false;
  }
};

export const loadJSON = (filePath: string) => {
  const configPath = path.join(filePath, configFileName);
  if (!fs.existsSync(configPath)) {
    throw new BoykaError(configFileNotExists(configPath));
  }
  return JSON.parse(
    fs.readFileSync(path.join(filePath, configFileName), {
      encoding: 'utf-8',
    }),
  );
};
