import fs from 'fs';
import path from 'path';
import { FrameworkSetting } from '../types/configType.js';
import { configFileName } from './constants.js';

export const createConfigFile = (filePath: string, setting: FrameworkSetting) => {
  const content = JSON.stringify(setting, null, 2);
  fs.writeFile(path.join(filePath, configFileName), content, (err) => {
    if (err) {
      console.error(`❌ Error occurred! ${err.message}`);
      process.exit(1);
    } else {
      console.info(`✅ Boyka config file created at [${filePath}]`);
    }
  });
};

export const loadJSON = (path: string) => {
  return JSON.parse(
    fs.readFileSync(new URL(path), {
      encoding: 'utf-8',
    })
  );
};
