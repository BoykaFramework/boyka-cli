import { getConfigName } from '../../../questions/inputs.js';
import { FrameworkSetting, WebSetting } from '../../../types/config-type.js';
import { updateWeb } from '../../update/web.js';
import { defaultNewWebSetting, defaultUiSetting } from '../../../types/default-type-values.js';
import { ArgumentsCamelCase } from 'yargs';
import { createConfigFile, loadJSON } from '../../../utils/json.js';
import { configBlockExists } from '../../../utils/constants.js';

export const createWebSetting = async () => {
  const configName = await getConfigName('Web');
  const frameworkSetting: FrameworkSetting = {
    ui: {
      ...defaultUiSetting,
      web: {
        ...defaultNewWebSetting(configName),
      },
    },
  };
  const web = frameworkSetting.ui?.web;
  if (web) await updateWeb(web[configName]);
  return frameworkSetting;
};

export const handleAddWebConfig = async (argv: ArgumentsCamelCase) => {
  const name = argv.name as string;
  const path = argv.path as string;
  const configPath = path === '.' ? process.cwd() : path;

  const settings = loadJSON(configPath) as FrameworkSetting;
  let uiSetting = settings.ui;
  let webSetting: { [key: string]: WebSetting };
  if (uiSetting) {
    webSetting = uiSetting.web;
    if (webSetting?.[name]) {
      throw new Error(configBlockExists('Web', name));
    }
  } else {
    uiSetting = {
      ...defaultUiSetting,
    };
  }
  const newWebSetting = defaultNewWebSetting(name);
  await updateWeb(newWebSetting[name]);
  settings.ui = {
    ...uiSetting,
    web: {
      ...webSetting,
      ...newWebSetting,
    },
  };
  createConfigFile(configPath, settings, 'updated');
};
