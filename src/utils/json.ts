import fs from 'fs';
import path from 'path';
import { FrameworkSetting } from '../types/config-type.js';
import {
  configFileName,
  configFileNotExists,
  errorMessage,
  savingMessage,
  sleep,
  successMessage,
} from './constants.js';
import { createSpinner } from 'nanospinner';

export const createConfigFile = (filePath: string, setting: FrameworkSetting, state: string) => {
  const content = JSON.stringify(setting, null, 2);
  fs.writeFile(path.join(filePath, configFileName), content, async (err) => {
    const spinner = createSpinner(savingMessage(state)).start();
    await sleep();

    if (err) {
      spinner.error({ text: errorMessage(err) });
      process.exit(1);
    } else {
      spinner.success({ text: successMessage(filePath, state) });
    }
  });
};

export const loadJSON = (filePath: string) => {
  const configPath = path.join(filePath, configFileName);
  if (!fs.existsSync(configPath)) {
    throw new Error(configFileNotExists(configPath));
  }
  return JSON.parse(
    fs.readFileSync(path.join(filePath, configFileName), {
      encoding: 'utf-8',
    }),
  );
};
