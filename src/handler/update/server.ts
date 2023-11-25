import { getPassword, getTarget, getUserName } from '../../questions/inputs';
import { getPort } from '../../questions/mobileInput';
import { AutomationType, ServerSetting, TargetProviders } from '../../types/configType';

export const updateServer = async (server: ServerSetting) => {
  let target = await getTarget();
  if (target === 'LAMBDA_TEST') {
    target += '_MOBILE';
  }
  server.target = target as TargetProviders;
  const port = Number(await getPort());
  if (port > 0) {
    server.port = port;
  }
  server.driver = AutomationType.UI_AUTOMATOR;
  if (server.target !== TargetProviders.LOCAL) {
    server.user_name = `\${env:${await getUserName()}}`;
    server.password = `\${env:${await getPassword()}}`;
  }
};
