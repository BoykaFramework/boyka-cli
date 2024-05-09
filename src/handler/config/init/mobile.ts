import { getConfigName } from '../../../questions/inputs.js';
import { FrameworkSetting } from '../../../types/config-type.js';
import { updateMobile } from '../../update/mobile.js';
import { defaultUiSetting, defaultMobileSetting } from '../../../types/default-type-values.js';

export const createMobileSetting = async (platformType: string) => {
  const configName = await getConfigName(platformType);
  const frameworkSetting: FrameworkSetting = {
    ui: {
      ...defaultUiSetting,
      mobile: {
        [configName]: {
          ...defaultMobileSetting,
        },
      },
    },
  };
  const mobile = frameworkSetting.ui?.mobile;
  if (mobile) {
    await updateMobile(mobile[configName], platformType);
  }
  return frameworkSetting;
};
