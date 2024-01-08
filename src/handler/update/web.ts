import { getPassword, getTarget, getUserName } from '../../questions/inputs.js';
import { getBrowser } from '../../questions/webInput.js';
import { Browser, TargetProviders, WebSetting } from '../../types/configType.js';
import { setTarget } from '../../utils/constants.js';

export const updateWeb = async (config: WebSetting) => {
  let target = await getTarget();
  if (target === 'LAMBDA_TEST') {
    target += '_WEB';
  }
  config.browser = (await getBrowser()) as Browser;
  config.target = target as TargetProviders;
  setTarget(config.target);
  if (config.target !== TargetProviders.LOCAL) {
    config.user_name = `\${env:${await getUserName()}}`;
    config.password = `\${env:${await getPassword()}}`;
  }
};
