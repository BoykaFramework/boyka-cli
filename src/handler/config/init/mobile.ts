import { getConfigName } from '../../../questions/inputs.js';
import { FrameworkSetting, MobileSetting } from '../../../types/config-type.js';
import { updateMobile } from '../../update/mobile.js';
import { defaultUiSetting, defaultNewMobileSetting } from '../../../types/default-type-values.js';
import { defaultDelaySetting } from '../../../types/default-type-values.js';
import { ArgumentsCamelCase } from 'yargs';
import { createConfigFile, loadJSON } from '../../../utils/json.js';
import { configBlockExists } from '../../../utils/constants.js';

export const createMobileSetting = async (platformType: string) => {
  const configName = await getConfigName(platformType);
  const frameworkSetting: FrameworkSetting = {
    ui: {
      delay: {
        ...defaultDelaySetting,
      },
      ...defaultUiSetting,
      mobile: {
        ...defaultNewMobileSetting(configName),
      },
    },
  };
  const mobile = frameworkSetting.ui?.mobile;
  if (mobile) {
    await updateMobile(mobile[configName], platformType);
  }
  return frameworkSetting;
};

export const handleAddMobileConfig = async (argv: ArgumentsCamelCase, platformType: string) => {
  const name = argv.name as string;
  const path = argv.path as string;
  const configPath = path === '.' ? process.cwd() : path;

  const settings = loadJSON(configPath) as FrameworkSetting;
  let uiSetting = settings.ui;
  let mobileSetting: { [key: string]: MobileSetting };
  if (uiSetting) {
    mobileSetting = uiSetting.mobile;
    if (mobileSetting[name]) {
      throw new Error(configBlockExists('Mobile', name));
    }
  } else {
    uiSetting = {
      ...defaultUiSetting,
    };
  }
  const newMobileSetting = defaultNewMobileSetting(name);
  await updateMobile(newMobileSetting[name], platformType);
  settings.ui = {
    ...uiSetting,
    mobile: {
      ...mobileSetting,
      ...newMobileSetting,
    },
  };
  createConfigFile(configPath, settings, 'updated');
};
