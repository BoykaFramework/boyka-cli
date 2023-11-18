export enum Browser {
  CHROME = 'CHROME',
  EDGE = 'EDGE',
  FIREFOX = 'FIREFOX',
  NONE = 'NONE',
  REMOTE = 'REMOTE',
  SAFARI = 'SAFARI',
}

export enum TargetProviders {
  BROWSER_STACK = 'BROWSER_STACK',
  LAMBDA_TEST_MOBILE = 'LAMBDA_TEST_MOBILE',
  LAMBDA_TEST_WEB = 'LAMBDA_TEST_WEB',
  LOCAL = 'LOCAL',
}

enum WindowResizeType {
  CUSTOM = 'CUSTOM',
  FULL_SCREEN = 'FULL_SCREEN',
  MAXIMIZED = 'MAXIMIZED',
  MINIMIZED = 'MINIMIZED',
  NORMAL = 'NORMAL',
}

enum Protocol {
  HTTP = 'HTTP',
  HTTPS = 'HTTPS',
}

export enum AutomationType {
  UI_AUTOMATOR = 'UI_AUTOMATOR',
  XCUI = 'XCUI',
}

enum LogLevel {
  DEBUG = 'DEBUG',
  DEBUG_DEBUG = 'DEBUG_DEBUG',
  DEBUG_ERROR = 'DEBUG_ERROR',
  DEBUG_INFO = 'DEBUG_INFO',
  DEBUG_WARN = 'DEBUG_WARN',
  ERROR = 'ERROR',
  ERROR_DEBUG = 'ERROR_DEBUG',
  ERROR_ERROR = 'ERROR_ERROR',
  ERROR_INFO = 'ERROR_INFO',
  ERROR_WARN = 'ERROR_WARN',
  INFO = 'INFO',
  INFO_DEBUG = 'INFO_DEBUG',
  INFO_ERROR = 'INFO_ERROR',
  INFO_INFO = 'INFO_INFO',
  INFO_WARN = 'INFO_WARN',
  WARN = 'WARN',
  WARN_DEBUG = 'WARN_DEBUG',
  WARN_ERROR = 'WARN_ERROR',
  WARN_INFO = 'WARN_INFO',
  WARN_WARN = 'WARN_WARN',
}

export enum OS {
  ANDROID = 'ANDROID',
  IOS = 'IOS',
}

export enum DeviceType {
  CLOUD = 'CLOUD',
  VIRTUAL = 'VIRTUAL',
}

enum VideoQuality {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  PHOTO = 'PHOTO',
}

export enum ApplicationType {
  HYBRID = 'HYBRID',
  NATIVE = 'NATIVE',
  WEB = 'WEB',
}

export interface FrameworkSetting {
  listeners_package?: string;
  ui?: UiSetting;
  api?: { [key: string]: ApiSetting };
}

export interface ApiSetting {
  base_uri: string;
  base_path?: string;
  port?: number;
  read_timeout?: number;
  write_timeout?: number;
  connection_timeout?: number;
  schema_path?: string;
  logging?: ApiLogSetting;
}

interface ApiLogSetting {
  enable: boolean;
  request: boolean;
  response: boolean;
}

interface ScreenshotSetting {
  enabled: boolean;
  path: string;
  extension: string;
  prefix: string;
}

interface TimeoutSetting {
  implicit_wait: number;
  explicit_wait: number;
  page_load_timeout: number;
  script_timeout: number;
  highlight_delay: number;
}

interface UiSetting {
  timeout: TimeoutSetting;
  logging: UiLogSetting;
  screenshot: ScreenshotSetting;
  web?: { [key: string]: WebSetting };
  mobile?: { [key: string]: MobileSetting };
}

interface UiLogSetting {
  enable: boolean;
  path: string;
  exclude_logs?: string[];
}

interface Dimension {
  width: number;
  height: number;
}

export interface WebSetting {
  base_url?: string;
  browser: Browser;
  target?: TargetProviders;
  browser_options?: string[];
  user_name?: string;
  password?: string;
  resize?: WindowResizeType;
  custom_size?: Dimension;
  host?: string;
  headless?: boolean;
  highlight?: boolean;
  platform?: string;
  port?: number;
  protocol?: Protocol;
  capabilities?: { [key: string]: string };
}

interface ServerLogSetting {
  debug_spacing?: boolean;
  level: LogLevel;
  local_timezone?: boolean;
  timestamp?: boolean;
}

export interface ServerSetting {
  allow_cors?: boolean;
  allow_insecure?: string[];
  appium_path?: string;
  base_path?: string;
  callback_address?: string;
  callback_port?: number;
  config_path?: string;
  deny_insecure?: string[];
  driver?: AutomationType;
  external?: boolean;
  external_config?: boolean;
  host?: string;
  keep_alive_timeout?: number;
  logging?: ServerLogSetting;
  node_path?: string;
  other_args?: { [key: string]: any };
  password?: string;
  plugins?: string[];
  port?: number;
  protocol?: Protocol;
  relaxed_security?: boolean;
  session_override?: boolean;
  strict_capabilities?: boolean;
  target: TargetProviders;
  timeout?: number;
  user_name?: string;
  webhook?: string;
}

export interface MobileSetting {
  server: ServerSetting;
  device: DeviceSetting;
}

interface SwipeSetting {
  distance: number;
  max_swipe_until_found: number;
}

interface AndroidVideoSetting {
  bit_rate: number;
}

interface IOSVideoSetting {
  codec: string;
  fps: number;
  quality: VideoQuality;
}

interface VideoSetting {
  android?: AndroidVideoSetting;
  enabled?: boolean;
  ios?: IOSVideoSetting;
  path: string;
  prefix?: string;
  size?: string;
  time_limit?: number;
}

interface VirtualDeviceSetting {
  connect_keyboard?: boolean;
  headless?: boolean;
  launch_timeout?: number;
  name: string;
  ready_timeout?: number;
}

interface WDASetting {
  connection_timeout?: number;
  launch_timeout?: number;
  local_port?: number;
  signing_id?: string;
  startup_retries?: number;
  startup_retry_interval?: number;
  team_id?: string;
  update_bundle_id?: string;
  use_new?: boolean;
  use_prebuilt?: boolean;
}

interface ApplicationSetting {
  base_url?: string;
  browser?: Browser;
  bundle_id?: string;
  chrome_driver_port?: number;
  external?: boolean;
  install_timeout?: number;
  path?: string;
  type: ApplicationType;
  wait_activity?: string;
  wait_timeout?: number;
}

export interface DeviceSetting {
  accept_alerts?: boolean;
  application: ApplicationSetting;
  capabilities?: { [key: string]: any };
  clear_files?: boolean;
  clear_logs?: boolean;
  full_reset?: boolean;
  ignore_unimportant_views?: boolean;
  name: string;
  no_reset?: boolean;
  os?: OS;
  server_install_timeout?: number;
  server_launch_timeout?: number;
  swipe: SwipeSetting;
  system_port?: number;
  type: DeviceType;
  typing_speed?: number;
  unique_id?: string;
  version?: string;
  video?: VideoSetting;
  virtual_device?: VirtualDeviceSetting;
  wda?: WDASetting;
}

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
  enable: false,
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
  schema_path: './scheme',
};

export const defaultWebSetting: WebSetting = {
  browser: Browser.NONE,
  custom_size: defaultDimension,
  headless: true,
  highlight: false,
  resize: WindowResizeType.CUSTOM,
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
