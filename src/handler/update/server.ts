import { ServerSetting, UserInput } from '../../types/types.js';
import { AutomationType, TargetProviders } from '../../types/enum-types.js';
import { setTarget } from '../../utils/constants.js';

export const updateDesktopServer = (settings: ServerSetting, inputs: UserInput) => {
  const server = inputs.desktop.server;
  settings.target = server.target;
  setTarget(settings.target);
  const port = server.port;
  if (port > 0) {
    settings.port = port;
  }
  settings.driver = AutomationType.MAC;
};

export const updateServer = (settings: ServerSetting, inputs: UserInput) => {
  const server = inputs.mobile.server;
  settings.target = server.target;
  setTarget(settings.target);
  const port = server.port;
  if (port > 0) {
    settings.port = port;
  }
  settings.driver =
    inputs.sub_platform === 'Android' ? AutomationType.UI_AUTOMATOR : AutomationType.XCUI;
  if (settings.target !== TargetProviders.LOCAL) {
    settings.user_name = `\${env:${server.user_name}}`;
    settings.password = `\${env:${server.password}}`;
  }
};
