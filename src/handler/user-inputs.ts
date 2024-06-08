import { getBasePath, getBaseUri } from '../questions/apiInputs.js';
import { getGroupId, isSampleTest } from '../questions/initInputs.js';
import {
  getConfigName,
  getPassword,
  getPlatform,
  getPlatformType,
  getTargetProvider,
  getUserName,
} from '../questions/inputs.js';
import {
  getAVDName,
  getAppPath,
  getAppType,
  getAppUrl,
  getDeviceName,
  getDeviceVersion,
  getPort,
} from '../questions/mobileInput.js';
import { getBrowser } from '../questions/webInput.js';
import { ApplicationType, TargetProviders } from '../types/enum-types.js';
import { UserInput } from '../types/types.js';

const getUserInputs = async () => {
  const platform = await getPlatform();
  const inputs: UserInput = { platform };
  if (platform === 'ui') {
    await getUiInputs(inputs);
  } else {
    await getApiInputs(inputs);
  }
  return inputs;
};

const getUiInputs = async (inputs: UserInput) => {
  inputs.sub_platform = await getPlatformType();
  inputs.config_name = await getConfigName(inputs.sub_platform);
  if (inputs.sub_platform === 'Web') {
    await getWebInputs(inputs);
  } else {
    await getMobileInputs(inputs);
  }
};

const getApiInputs = async (inputs: UserInput) => {
  if (!inputs.config_name) {
    inputs.config_name = await getConfigName(inputs.platform);
  }
  inputs.api = {
    base_uri: await getBaseUri(),
    base_path: await getBasePath(),
  };
};

const getWebInputs = async (inputs: UserInput) => {
  inputs.web = {
    target: await getTargetProvider(),
    browser: await getBrowser(),
  };
  if (inputs.web.target !== TargetProviders.LOCAL) {
    inputs.web.user_name = await getUserName();
    inputs.web.password = await getPassword();
  }
};

const getMobileInputs = async (inputs: UserInput) => {
  await getServerInputs(inputs);
  await getDeviceInputs(inputs);
};

const getServerInputs = async (inputs: UserInput) => {
  inputs.mobile = {
    server: {
      target: await getTargetProvider(),
      port: Number(await getPort()),
    },
    device: {
      name: await getDeviceName(),
      version: await getDeviceVersion(),
    },
  };
  if (inputs.mobile.server.target !== TargetProviders.LOCAL) {
    inputs.mobile.server.user_name = await getUserName();
    inputs.mobile.server.password = await getPassword();
  }
};

const getDeviceInputs = async (inputs: UserInput) => {
  if (inputs.mobile.server.target === TargetProviders.LOCAL && inputs.sub_platform === 'Android') {
    inputs.mobile.device.avd_name = await getAVDName();
  }
  inputs.mobile.device.application = {
    type: await getAppType(),
  };
  if (inputs.mobile.device.application.type === ApplicationType.WEB) {
    inputs.mobile.device.application.browser = await getBrowser();
  } else {
    inputs.mobile.device.application.path =
      inputs.mobile.server.target === TargetProviders.LOCAL
        ? await getAppPath()
        : await getAppUrl();
  }
};

const getInitInputs = async () => {
  const inputs = await getUserInputs();
  inputs.group_id = await getGroupId();
  inputs.generate_sample = await isSampleTest();
  return inputs;
};

export { getUserInputs, getApiInputs, getWebInputs, getMobileInputs, getInitInputs };
