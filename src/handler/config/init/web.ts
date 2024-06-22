import { FrameworkSetting, UserInput, WebSetting } from '../../../types/types.js';
import { updateWeb } from '../../update/web.js';
import { defaultNewWebSetting, defaultUiSetting } from '../../../types/default-type-values.js';
import { ArgumentsCamelCase } from 'yargs';
import { createConfigFile, loadJSON } from '../../../utils/json.js';
import { configBlockExists, createConfigMessages, executeTask } from '../../../utils/constants.js';
import { BoykaError } from '../../../utils/boyka-error.js';
import { getWebInputs } from '../../user-inputs.js';

export const createWebSetting = (inputs: UserInput) => {
  const frameworkSetting: FrameworkSetting = {
    ui: {
      ...defaultUiSetting,
      web: {
        ...defaultNewWebSetting(inputs.config_name),
      },
    },
  };
  const web = frameworkSetting.ui?.web;
  if (web) updateWeb(inputs, web[inputs.config_name]);
  return frameworkSetting;
};

export const handleAddWebConfig = async (argv: ArgumentsCamelCase) => {
  const name = argv.name as string;
  const path = argv.path as string;
  const configPath = path === '.' ? process.cwd() : path;

  const inputs = {
    platform: 'ui',
    sub_platform: 'Web',
  } satisfies UserInput;
  await getWebInputs(inputs);

  const settings = loadJSON(configPath) as FrameworkSetting;
  let uiSetting = settings.ui;
  let webSetting: { [key: string]: WebSetting };
  if (uiSetting) {
    webSetting = uiSetting.web;
    if (webSetting?.[name]) {
      throw new BoykaError(configBlockExists('Web', name));
    }
  } else {
    uiSetting = {
      ...defaultUiSetting,
    };
  }
  const newWebSetting = defaultNewWebSetting(name);
  updateWeb(inputs, newWebSetting[name]);
  settings.ui = {
    ...uiSetting,
    web: {
      ...webSetting,
      ...newWebSetting,
    },
  };
  await executeTask(
    createConfigFile(configPath, settings),
    createConfigMessages(configPath, 'updated'),
  );
};
