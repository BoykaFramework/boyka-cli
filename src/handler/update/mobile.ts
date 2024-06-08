import { MobileSetting, UserInput } from '../../types/types.js';
import { updateDevice } from './device.js';
import { updateServer } from './server.js';

export const updateMobile = (inputs: UserInput, config: MobileSetting) => {
  updateServer(config.server, inputs);
  updateDevice(config.device, inputs);
};
