import { WebSetting, UserInput } from '../../types/types.js';
import { TargetProviders } from '../../types/enum-types.js';
import { setTarget } from '../../utils/constants.js';

export const updateWeb = (inputs: UserInput, config: WebSetting) => {
  config.browser = inputs.web.browser;
  config.target = inputs.web.target;
  setTarget(config.target);
  if (config.target !== TargetProviders.LOCAL) {
    config.capabilities = {};
    config.user_name = `\${env:${inputs.web.user_name}}`;
    config.password = `\${env:${inputs.web.password}}`;
  }
};
