import { getPassword, getTarget, getUserName } from '../../questions/inputs';
import { getPort } from '../../questions/mobileInput';
import { AutomationType, ServerSetting, TargetProviders } from '../../types/configType';

export const updateServer = async (server: ServerSetting) => {
  server.target = (await getTarget()) as TargetProviders;
  server.port = Number(await getPort());
  server.driver = AutomationType.UI_AUTOMATOR;
  if (server.target !== TargetProviders.LOCAL) {
    server.user_name = `\${env:${await getUserName()}}`;
    server.password = `\${env:${await getPassword()}}`;
  }
};
