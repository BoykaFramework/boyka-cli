import fs from 'fs';
import { FrameworkSetting } from '../types/configType';
import path from 'path';
import { configFileName } from './constants';

export const createConfigFile = (filePath: string, setting: FrameworkSetting) => {
  const content = JSON.stringify(setting, null, 2);
  fs.writeFile(path.join(filePath, configFileName), content, (err) => {
    if (err) {
      console.error(`Error occurred! ${err.message}`);
      process.exit(0);
    } else {
      console.info(`Boyka config file created at ${filePath}`);
    }
  });
};
