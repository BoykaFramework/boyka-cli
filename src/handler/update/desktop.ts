import { DesktopSetting, UserInput } from '../../types/types.js';
import { updateMachine } from './machine.js';
import { updateDesktopServer } from './server.js';

export const updateDesktop = (inputs: UserInput, config: DesktopSetting) => {
  updateDesktopServer(config.server, inputs);
  updateMachine(config.machine, inputs);
};
