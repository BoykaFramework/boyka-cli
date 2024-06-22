import { ApiSetting, UserInput } from '../../types/types.js';

export const updateApi = (inputs: UserInput, setting: ApiSetting) => {
  if (setting) {
    setting.base_uri = inputs.api.base_uri;
    setting.base_path = inputs.api.base_path;
  }
};
