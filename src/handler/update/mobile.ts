import { MobileSetting } from '../../types/configType';
import { updateDevice } from './device';
import { updateServer } from './server';

export const updateMobile = async (config: MobileSetting, platformType: string) => {
  await updateServer(config.server);
  await updateDevice(config.device, config.server.target, platformType);
};
