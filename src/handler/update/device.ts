import { DeviceSetting, UserInput } from '../../types/types.js';
import {
  defaultAndroidVideoSetting,
  defaultIOSVideoSetting,
  defaultVirtualDeviceSetting,
  defaultWDASetting,
  defaultVideoSetting,
} from '../../types/default-type-values.js';
import { ApplicationType, DeviceType, OS, TargetProviders } from '../../types/enum-types.js';

export const updateDevice = (settings: DeviceSetting, inputs: UserInput) => {
  const device = inputs.mobile.device;
  settings.name = device.name;
  settings.type =
    inputs.mobile.server.target === TargetProviders.LOCAL ? DeviceType.VIRTUAL : DeviceType.CLOUD;
  settings.os = inputs.sub_platform.toUpperCase() as OS;
  settings.version = device.version;
  if (settings.os === OS.ANDROID) {
    if (settings.type === DeviceType.VIRTUAL) {
      settings.virtual_device = defaultVirtualDeviceSetting;
      settings.virtual_device.name = device.avd_name;
    }
    settings.video = {
      ...defaultVideoSetting,
      android: defaultAndroidVideoSetting,
    };
  } else if (inputs.mobile.server.target === TargetProviders.LOCAL) {
    settings.wda = defaultWDASetting;
    settings.video = {
      ...defaultVideoSetting,
      ios: defaultIOSVideoSetting,
    };
  } else {
    settings.capabilities = {};
  }
  settings.application.type = device.application.type;
  if (settings.application.type === ApplicationType.WEB) {
    settings.application.browser = device.application.browser;
  } else {
    settings.application.path = device.application.path;
  }
};
