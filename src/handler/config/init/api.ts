import { getConfigName } from '../../../questions/inputs.js';
import { FrameworkSetting, defaultApiSetting } from '../../../types/configType.js';
import { updateApi } from '../../update/api.js';

export const createApiSetting = async () => {
  const configName = await getConfigName('API');
  const frameworkSetting: FrameworkSetting = {
    api: {
      [configName]: {
        ...defaultApiSetting,
      },
    },
  };
  const api = frameworkSetting.api;
  if (api) await updateApi(api[configName]);
  return frameworkSetting;
};
