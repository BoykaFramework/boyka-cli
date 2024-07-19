import {
  AndroidVideoSetting,
  ApiLogSetting,
  ApiSetting,
  ApplicationSetting,
  DelaySetting,
  DeviceSetting,
  Dimension,
  FrameworkSetting,
  IOSVideoSetting,
  MobileSetting,
  ScreenshotSetting,
  ServerLogSetting,
  ServerSetting,
  SwipeSetting,
  TimeoutSetting,
  UiLogSetting,
  UiSetting,
  VideoSetting,
  VirtualDeviceSetting,
  WDASetting,
  WebSetting,
} from './types.js';
import {
  ApplicationType,
  Browser,
  DeviceType,
  LogLevel,
  OS,
  PageLoadStrategy,
  Protocol,
  Speed,
  TargetProviders,
  VideoQuality,
  WindowResizeType,
} from './enum-types.js';

const defaultDimension: Dimension = {
  width: 1920,
  height: 1080,
};

const defaultServerLogSetting: ServerLogSetting = {
  level: LogLevel.INFO,
};

const defaultSwipeSetting: SwipeSetting = {
  distance: 75,
  max_swipe_until_found: 5,
  speed: Speed.NORMAL,
};

export const defaultIOSVideoSetting: IOSVideoSetting = {
  codec: 'mpeg4',
  fps: 10,
  quality: VideoQuality.MEDIUM,
};

export const defaultAndroidVideoSetting: AndroidVideoSetting = {
  bit_rate: 4,
};

const defaultApiLogSetting: ApiLogSetting = {
  enable: true,
  request: true,
  response: true,
};

const defaultApplicationSetting: ApplicationSetting = {
  type: ApplicationType.NATIVE,
  install_timeout: 30,
  wait_timeout: 30,
};

export const defaultWDASetting: WDASetting = {
  local_port: 8100,
  connection_timeout: 60,
  launch_timeout: 60,
  startup_retries: 2,
  startup_retry_interval: 10,
};

export const defaultVideoSetting: VideoSetting = {
  enabled: false,
  path: './videos',
  prefix: 'VID',
};

export const defaultScreenshotSetting: ScreenshotSetting = {
  enabled: true,
  extension: 'png',
  path: './screenshots',
  prefix: 'SCR',
};

export const defaultTimeoutSetting: TimeoutSetting = {
  implicit_wait: 1,
  explicit_wait: 10,
  highlight_delay: 100,
  page_load_timeout: 30,
  script_timeout: 30,
};

export const defaultUiLogSetting: UiLogSetting = {
  enable: true,
  path: './logs',
};

export const defaultVirtualDeviceSetting: VirtualDeviceSetting = {
  connect_keyboard: true,
  headless: false,
  launch_timeout: 120,
  ready_timeout: 60,
  name: '',
};

export const defaultDelaySetting: DelaySetting = {
  before_swipe: 500,
};

export const defaultUiSetting: UiSetting = {
  logging: {
    ...defaultUiLogSetting,
  },
  screenshot: {
    ...defaultScreenshotSetting,
  },
  timeout: {
    ...defaultTimeoutSetting,
  },
};

export const defaultApiSetting: ApiSetting = {
  base_uri: '',
  base_path: '',
  connection_timeout: 5,
  logging: defaultApiLogSetting,
  read_timeout: 5,
  write_timeout: 5,
  schema_path: './schema',
  validate_ssl: true,
  verify_host_name: true,
};

export const defaultWebSetting: WebSetting = {
  browser: Browser.NONE,
  custom_size: defaultDimension,
  headless: true,
  highlight: false,
  resize: WindowResizeType.NORMAL,
  page_load_strategy: PageLoadStrategy.NORMAL,
  target: TargetProviders.LOCAL,
  protocol: Protocol.HTTP,
  version: 'stable',
};

export const defaultServerSetting: ServerSetting = {
  target: TargetProviders.LOCAL,
  session_override: true,
  timeout: 30,
  logging: defaultServerLogSetting,
};

export const defaultDeviceSetting: DeviceSetting = {
  accept_alerts: true,
  clear_files: true,
  clear_logs: true,
  os: OS.ANDROID,
  swipe: defaultSwipeSetting,
  type: DeviceType.VIRTUAL,
  application: defaultApplicationSetting,
  name: '',
};

export const defaultMobileSetting: MobileSetting = {
  server: defaultServerSetting,
  device: defaultDeviceSetting,
};

export const defaultNewWebSetting = (configName: string): { [key: string]: WebSetting } => {
  return {
    [configName]: {
      ...defaultWebSetting,
    },
  };
};

export const defaultNewMobileSetting = (configName: string): { [key: string]: MobileSetting } => {
  return {
    [configName]: {
      ...defaultMobileSetting,
    },
  };
};

export const defaultNewApiSetting = (configName: string): { [key: string]: ApiSetting } => {
  return {
    [configName]: {
      ...defaultApiSetting,
    },
  };
};

export const defaultFrameworkSetting: FrameworkSetting = {
  $schema: 'https://json.schemastore.org/boyka-config.json',
};
