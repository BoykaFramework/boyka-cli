import { MobileSetting } from '../../types/config-type.js';
import { updateDevice } from './device.js';
import { updateServer } from './server.js';

export const updateMobile = async (config: MobileSetting, platformType: string) => {
  await updateServer(config.server, platformType);
  await updateDevice(config.device, config.server.target, platformType);
};
