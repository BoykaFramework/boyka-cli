import fs from 'fs';
import path from 'path';
import { configFileName, danger, executeTask, info, success, warn } from '../utils/constants.js';
import check from '../data/check-messages.json' assert { type: 'json' };
import { Message } from '../types/config-type.js';

const printIntroMessage = () => {
  console.info(info(check.intro));
  console.log();
};

const pomMessage = {
  success: success(check.messages.pom.success.replace('{0}', process.cwd())),
  error: danger(check.messages.pom.error.replace('{0}', process.cwd())),
  loading: warn(check.messages.pom.loading.replace('{0}', process.cwd())),
  suggestion: warn(check.messages.pom.suggestion),
} satisfies Message;

const checkPomFile = () => {
  return fs.existsSync(path.join(process.cwd(), 'pom.xml'));
};

const resourceMessage = {
  success: success(check.messages.resources.success.replace('{0}', process.cwd())),
  error: danger(check.messages.resources.error.replace('{0}', process.cwd())),
  loading: warn(check.messages.resources.loading.replace('{0}', process.cwd())),
  suggestion: warn(check.messages.resources.suggestion),
} satisfies Message;

const checkResourcesFolder = () => {
  return fs.existsSync(path.join(process.cwd(), 'src/test/resources'));
};

const configMessage = {
  success: success(check.messages.config.success.replace('{0}', process.cwd())),
  error: danger(check.messages.config.error.replace('{0}', process.cwd())),
  loading: warn(check.messages.config.loading.replace('{0}', process.cwd())),
  suggestion: warn(check.messages.config.suggestion),
} satisfies Message;

const checkConfigFile = () => {
  return fs.existsSync(path.join(process.cwd(), 'src/test/resources', configFileName));
};

export const handleCheckSetup = async () => {
  printIntroMessage();
  await executeTask(checkPomFile(), pomMessage);
  await executeTask(checkResourcesFolder(), resourceMessage);
  await executeTask(checkConfigFile(), configMessage);
};
