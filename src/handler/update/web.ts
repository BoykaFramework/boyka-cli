import { getPassword, getTarget, getUserName } from '../../questions/inputs';
import { getBrowser } from '../../questions/webInput';
import { Browser, TargetProviders, WebSetting } from '../../types/configType';

export const updateWeb = async (config: WebSetting) => {
  let target = await getTarget();
  if (target === 'LAMBDA_TEST') {
    target += '_WEB';
  }
  config.browser = (await getBrowser()) as Browser;
  config.target = target as TargetProviders;
  if (config.target !== TargetProviders.LOCAL) {
    config.user_name = `\${env:${await getUserName()}}`;
    config.password = `\${env:${await getPassword()}}`;
  }
};
