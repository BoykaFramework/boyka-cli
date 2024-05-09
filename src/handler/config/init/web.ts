import { getConfigName } from '../../../questions/inputs.js';
import { FrameworkSetting } from '../../../types/config-type.js';
import { updateWeb } from '../../update/web.js';
import { defaultUiSetting, defaultWebSetting } from '../../../types/default-type-values.js';

export const createWebSetting = async () => {
  const configName = await getConfigName('Web');
  const frameworkSetting: FrameworkSetting = {
    ui: {
      ...defaultUiSetting,
      web: {
        [configName]: {
          ...defaultWebSetting,
        },
      },
    },
  };
  const web = frameworkSetting.ui?.web;
  if (web) await updateWeb(web[configName]);
  return frameworkSetting;
};
