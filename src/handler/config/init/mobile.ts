import { FrameworkSetting, MobileSetting, UserInput } from '../../../types/types.js';
import { updateMobile } from '../../update/mobile.js';
import {
  defaultUiSetting,
  defaultNewMobileSetting,
  defaultDelaySetting,
  defaultFrameworkSetting,
} from '../../../types/default-type-values.js';
import { ArgumentsCamelCase } from 'yargs';
import { createConfigFile, loadJSON } from '../../../utils/json.js';
import { configBlockExists, createConfigMessages, executeTask } from '../../../utils/constants.js';
import { BoykaError } from '../../../utils/boyka-error.js';
import { getMobileInputs } from '../../user-inputs.js';

export const createMobileSetting = (inputs: UserInput) => {
  const frameworkSetting: FrameworkSetting = {
    ...defaultFrameworkSetting,
    ui: {
      delay: {
        ...defaultDelaySetting,
      },
      ...defaultUiSetting,
      mobile: {
        ...defaultNewMobileSetting(inputs.config_name),
      },
    },
  };
  const mobile = frameworkSetting.ui?.mobile;
  if (mobile) {
    updateMobile(inputs, mobile[inputs.config_name]);
  }
  return frameworkSetting;
};

export const handleAddMobileConfig = async (argv: ArgumentsCamelCase, platformType: string) => {
  const name = argv.name as string;
  const path = argv.path as string;
  const configPath = path === '.' ? process.cwd() : path;

  const inputs = {
    platform: 'ui',
    sub_platform: platformType,
  } satisfies UserInput;
  await getMobileInputs(inputs);

  const settings = loadJSON(configPath) as FrameworkSetting;
  let uiSetting = settings.ui;
  let mobileSetting: { [key: string]: MobileSetting };
  if (uiSetting) {
    mobileSetting = uiSetting.mobile;
    if (mobileSetting?.[name]) {
      throw new BoykaError(configBlockExists('Mobile', name));
    }
  } else {
    uiSetting = {
      ...defaultUiSetting,
    };
  }
  const newMobileSetting = defaultNewMobileSetting(name);
  updateMobile(inputs, newMobileSetting[name]);
  settings.ui = {
    ...uiSetting,
    mobile: {
      ...mobileSetting,
      ...newMobileSetting,
    },
  };
  await executeTask(
    createConfigFile(configPath, settings),
    createConfigMessages(configPath, 'updated'),
  );
};
