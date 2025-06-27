import { ArgumentsCamelCase } from 'yargs';
import { DesktopSetting, FrameworkSetting, UserInput } from '../../../types/types.js';
import { createConfigFile, loadJSON } from '../../../utils/json.js';
import { BoykaError } from '../../../utils/boyka-error.js';
import { configBlockExists, createConfigMessages, executeTask } from '../../../utils/constants.js';
import {
  defaultFrameworkSetting,
  defaultNewMacSetting,
  defaultUiSetting,
} from '../../../types/default-type-values.js';
import { updateDesktop } from '../../update/desktop.js';
import { getMacInputs } from '../../user-inputs.js';

export const createMacSetting = (inputs: UserInput) => {
  const frameworkSetting: FrameworkSetting = {
    ...defaultFrameworkSetting,
    ui: {
      ...defaultUiSetting,
      desktop: {
        ...defaultNewMacSetting(inputs.config_name),
      },
    },
  };
  const desktop = frameworkSetting.ui?.desktop;
  if (desktop) updateDesktop(inputs, desktop[inputs.config_name]);
  return frameworkSetting;
};

export const handleMacConfig = async (argv: ArgumentsCamelCase, platformType: string) => {
  const name = argv.name as string;
  const path = argv.path as string;
  const configPath = path === '.' ? process.cwd() : path;

  const inputs = {
    platform: 'ui',
    sub_platform: platformType,
  } satisfies UserInput;
  await getMacInputs(inputs);

  const settings = loadJSON(configPath) as FrameworkSetting;
  let uiSetting = settings.ui;
  let desktopSetting: { [key: string]: DesktopSetting };
  if (uiSetting) {
    desktopSetting = uiSetting.desktop;
    if (desktopSetting?.[name]) {
      throw new BoykaError(configBlockExists('Mobile', name));
    }
  } else {
    uiSetting = {
      ...defaultUiSetting,
    };
  }
  const newDesktopSetting = defaultNewMacSetting(name);
  updateDesktop(inputs, newDesktopSetting[name]);
  settings.ui = {
    ...uiSetting,
    desktop: {
      ...desktopSetting,
      ...newDesktopSetting,
    },
  };
  await executeTask(
    createConfigFile(configPath, settings),
    createConfigMessages(configPath, 'updated'),
  );
};
