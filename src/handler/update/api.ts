import { getBasePath, getBaseUri } from '../../questions/apiInputs.js';
import { ApiSetting } from '../../types/configType.js';

export const updateApi = async (setting: ApiSetting) => {
  if (setting) {
    setting.base_uri = await getBaseUri();
    setting.base_path = await getBasePath();
  }
};
