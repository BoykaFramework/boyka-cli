import { getConfigName } from '../../../questions/inputs';
import {
  FrameworkSetting,
  defaultUiSetting,
  defaultMobileSetting,
} from '../../../types/configType';
import { updateMobile } from '../../update/mobile';

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
  if (mobile) await updateMobile(mobile[configName]);
  return frameworkSetting;
};
