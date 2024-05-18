import { getConfigName } from '../../../questions/inputs.js';
import { FrameworkSetting } from '../../../types/config-type.js';
import { updateApi } from '../../update/api.js';
import { defaultNewApiSetting } from '../../../types/default-type-values.js';
import { ArgumentsCamelCase } from 'yargs';
import { createConfigFile, loadJSON } from '../../../utils/json.js';
import { configBlockExists } from '../../../utils/constants.js';

export const createApiSetting = async () => {
  const configName = await getConfigName('API');
  const frameworkSetting: FrameworkSetting = {
    api: {
      ...defaultNewApiSetting(configName),
    },
  };
  const api = frameworkSetting.api;
  if (api) await updateApi(api[configName]);
  return frameworkSetting;
};

export const handleAddApiConfig = async (argv: ArgumentsCamelCase) => {
  const name = argv.name as string;
  const path = argv.path as string;
  const configPath = path === '.' ? process.cwd() : path;

  const settings = loadJSON(configPath) as FrameworkSetting;
  const apiSetting = settings.api;
  if (apiSetting[name]) {
    throw new Error(configBlockExists('API', name));
  }
  const newApiSetting = defaultNewApiSetting(name);
  await updateApi(newApiSetting[name]);
  settings.api = {
    ...apiSetting,
    ...newApiSetting,
  };
  createConfigFile(configPath, settings, 'updated');
};
