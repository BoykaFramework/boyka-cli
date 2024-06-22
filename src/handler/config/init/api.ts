import { FrameworkSetting, UserInput } from '../../../types/types.js';
import { updateApi } from '../../update/api.js';
import { defaultNewApiSetting } from '../../../types/default-type-values.js';
import { ArgumentsCamelCase } from 'yargs';
import { createConfigFile, loadJSON } from '../../../utils/json.js';
import { configBlockExists, createConfigMessages, executeTask } from '../../../utils/constants.js';
import { getApiInputs } from '../../user-inputs.js';
import { BoykaError } from '../../../utils/boyka-error.js';

export const createApiSetting = (inputs: UserInput) => {
  const frameworkSetting: FrameworkSetting = {
    api: {
      ...defaultNewApiSetting(inputs.config_name),
    },
  };
  const api = frameworkSetting.api;
  if (api) updateApi(inputs, api[inputs.config_name]);
  return frameworkSetting;
};

export const handleAddApiConfig = async (argv: ArgumentsCamelCase) => {
  const name = argv.name as string;
  const path = argv.path as string;
  const configPath = path === '.' ? process.cwd() : path;

  const inputs = {
    platform: 'api',
    config_name: name,
  } satisfies UserInput;
  await getApiInputs(inputs);

  const settings = loadJSON(configPath) as FrameworkSetting;
  const apiSetting = settings.api;
  if (apiSetting?.[name]) {
    throw new BoykaError(configBlockExists('API', name));
  }
  const newApiSetting = defaultNewApiSetting(name);
  updateApi(inputs, newApiSetting[name]);
  settings.api = {
    ...apiSetting,
    ...newApiSetting,
  };
  await executeTask(
    createConfigFile(configPath, settings),
    createConfigMessages(configPath, 'updated'),
  );
};
