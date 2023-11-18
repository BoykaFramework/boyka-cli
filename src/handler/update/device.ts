import {
  getAVDName,
  getAppPath,
  getAppType,
  getDeviceName,
  getDeviceType,
  getDeviceVersion,
  getOS,
} from '../../questions/mobileInput';
import {
  ApplicationType,
  DeviceSetting,
  DeviceType,
  OS,
  TargetProviders,
  defaultAndroidVideoSetting,
  defaultIOSVideoSetting,
  defaultVideoSetting,
  defaultVirtualDeviceSetting,
  defaultWDASetting,
} from '../../types/configType';

export const updateDevice = async (device: DeviceSetting, target: TargetProviders) => {
  device.name = await getDeviceName();
  device.type = (await getDeviceType()) as DeviceType;
  device.os = (await getOS()) as OS;
  device.version = await getDeviceVersion();
  if (device.os === OS.ANDROID) {
    if (device.type === DeviceType.VIRTUAL) {
      device.virtual_device = defaultVirtualDeviceSetting;
      device.virtual_device.name = await getAVDName();
    }
    device.video = {
      ...defaultVideoSetting,
      android: defaultAndroidVideoSetting,
    };
  } else {
    if (target !== TargetProviders.LOCAL) {
      device.wda = defaultWDASetting;
      device.video = {
        ...defaultVideoSetting,
        ios: defaultIOSVideoSetting,
      };
    }
  }
  device.application.type = (await getAppType()) as ApplicationType;
  device.application.path = await getAppPath();
};
