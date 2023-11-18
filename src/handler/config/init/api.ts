import { getConfigName } from '../../../questions/inputs';
import { FrameworkSetting, defaultApiSetting } from '../../../types/configType';
import { updateApi } from '../../update/api';

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
