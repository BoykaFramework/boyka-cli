import fs from 'fs';
import path from 'path';
import { FrameworkSetting } from '../types/configType';
import { configFileName, errorMessage, savingMessage, sleep, successMessage } from './constants';
import { createSpinner } from 'nanospinner';

export const createConfigFile = (filePath: string, setting: FrameworkSetting) => {
  const content = JSON.stringify(setting, null, 2);
  fs.writeFile(path.join(filePath, configFileName), content, async (err) => {
    const spinner = createSpinner(savingMessage).start();
    await sleep();

    if (err) {
      spinner.error({ text: errorMessage(err) });
      process.exit(1);
    } else {
      spinner.success({ text: successMessage(filePath) });
    }
  });
};
