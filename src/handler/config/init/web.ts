import { getConfigName } from '../../../questions/inputs.js';
import {
  FrameworkSetting,
  defaultUiSetting,
  defaultWebSetting,
} from '../../../types/configType.js';
import { updateWeb } from '../../update/web.js';

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
