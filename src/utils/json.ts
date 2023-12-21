import fs from 'fs';
import path from 'path';
import { FrameworkSetting } from '../types/configType';
import { configFileName, errorMessage, successMessage } from './constants';

export const createConfigFile = (filePath: string, setting: FrameworkSetting) => {
  const content = JSON.stringify(setting, null, 2);
  fs.writeFile(path.join(filePath, configFileName), content, (err) => {
    if (err) {
      console.error(errorMessage(err));
      process.exit(1);
    } else {
      console.info(successMessage(filePath));
    }
  });
};
