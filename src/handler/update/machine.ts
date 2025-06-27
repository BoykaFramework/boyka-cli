import { OS } from '../../types/enum-types.js';
import { MachineSetting, UserInput } from '../../types/types.js';

export const updateMachine = (setting: MachineSetting, inputs: UserInput) => {
  setting.os = inputs.sub_platform.toUpperCase() as OS;
  setting.version = inputs.desktop.machine.version;
  setting.application = {
    bundle_id: inputs.desktop.machine.application.bundle_id,
  };
};
