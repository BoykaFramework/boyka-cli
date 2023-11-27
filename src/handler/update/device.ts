import {
  getAVDName,
  getAppPath,
  getAppType,
  getAppUrl,
  getDeviceName,
  getDeviceVersion,
} from '../../questions/mobileInput';
import { getBrowser } from '../../questions/webInput';
import {
  ApplicationType,
  Browser,
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

export const updateDevice = async (
  device: DeviceSetting,
  target: TargetProviders,
  platformType: string
) => {
  device.name = await getDeviceName();
  device.type = target === TargetProviders.LOCAL ? DeviceType.VIRTUAL : DeviceType.CLOUD;
  device.os = platformType.toUpperCase() as OS;
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
    if (target === TargetProviders.LOCAL) {
      device.wda = defaultWDASetting;
      device.video = {
        ...defaultVideoSetting,
        ios: defaultIOSVideoSetting,
      };
    } else {
      device.capabilities = {};
    }
  }
  device.application.type = (await getAppType()) as ApplicationType;
  if (device.application.type === ApplicationType.WEB) {
    device.application.browser = (await getBrowser()) as Browser;
  } else {
    device.application.path =
      target === TargetProviders.LOCAL ? await getAppPath() : await getAppUrl();
  }
};
