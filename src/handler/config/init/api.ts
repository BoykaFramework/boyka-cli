import { getConfigName } from '../../../questions/inputs.js';
import { FrameworkSetting } from '../../../types/config-type.js';
import { updateApi } from '../../update/api.js';
import { defaultApiSetting } from '../../../types/default-type-values.js';

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
