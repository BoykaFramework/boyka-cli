enum Browser {
  CHROME,
  EDGE,
  FIREFOX,
  NONE,
  REMOTE,
  SAFARI,
}

enum TargetProviders {
  BROWSER_STACK,
  LAMBDA_TEST_MOBILE,
  LAMBDA_TEST_WEB,
  LOCAL,
}

enum WindowResizeType {
  CUSTOM,
  FULL_SCREEN,
  MAXIMIZED,
  MINIMIZED,
  NORMAL,
}

enum Protocol {
  HTTP,
  HTTPS,
}

enum AutomationType {
  UI_AUTOMATOR,
  XCUI,
}

enum LogLevel {
  DEBUG,
  DEBUG_DEBUG,
  DEBUG_ERROR,
  DEBUG_INFO,
  DEBUG_WARN,
  ERROR,
  ERROR_DEBUG,
  ERROR_ERROR,
  ERROR_INFO,
  ERROR_WARN,
  INFO,
  INFO_DEBUG,
  INFO_ERROR,
  INFO_INFO,
  INFO_WARN,
  WARN,
  WARN_DEBUG,
  WARN_ERROR,
  WARN_INFO,
  WARN_WARN,
}

enum OS {
  ANDROID,
  IOS,
}

enum DeviceType {
  CLOUD,
  VIRTUAL,
}

enum VideoQuality {
  LOW,
  MEDIUM,
  HIGH,
  PHOTO,
}

enum ApplicationType {
  HYBRID,
  NATIVE,
  WEB,
}

export interface FrameworkSetting {
  listeners_package?: string;
  ui?: UiSetting;
  api?: { [key: string]: ApiSetting };
}

interface ApiSetting {
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

// const defaultApiLogSetting: ApiLogSetting = {
//   enable: false,
//   request: true,
//   response: true,
// };

interface ScreenshotSetting {
  enabled: boolean;
  path: string;
  extension: string;
  prefix: string;
}

const defaultScreenshotSetting: ScreenshotSetting = {
  enabled: true,
  extension: 'png',
  path: './screenshots',
  prefix: 'SCR',
};

interface TimeoutSetting {
  implicit_wait: number;
  explicit_wait: number;
  page_load_timeout: number;
  script_timeout: number;
  highlight_delay: number;
}

const defaultTimeoutSetting: TimeoutSetting = {
  implicit_wait: 1,
  explicit_wait: 10,
  highlight_delay: 100,
  page_load_timeout: 30,
  script_timeout: 30,
};

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

const defaultUiLogSetting: UiLogSetting = {
  enable: true,
  path: './logs',
};

interface Dimension {
  width: number;
  height: number;
}

// const defaultDimension: Dimension = {
//   width: 1920,
//   height: 1080,
// };

interface WebSetting {
  base_url?: string;
  browser: Browser;
  target: TargetProviders;
  browser_options?: string[];
  user_name?: string;
  password?: string;
  resize?: WindowResizeType;
  custom_size?: Dimension;
  host?: string;
  headless: boolean;
  highlight: boolean;
  platform: string;
  port?: number;
  protocol: Protocol;
  capabilities?: { [key: string]: string };
}

interface ServerLogSetting {
  debug_spacing?: boolean;
  level: LogLevel;
  local_timezone?: boolean;
  timestamp?: boolean;
}

// const defaultServerLogSetting: ServerLogSetting = {
//   level: LogLevel.INFO,
// };

interface ServerSetting {
  allow_cors?: boolean;
  allow_insecure?: string[];
  appium_path?: string;
  base_path?: string;
  callback_address?: string;
  callback_port?: number;
  config_path?: string;
  deny_insecure?: string[];
  driver: AutomationType;
  external: boolean;
  external_config?: boolean;
  host?: string;
  keep_alive_timeout?: number;
  logging: ServerLogSetting;
  node_path?: string;
  other_args?: { [key: string]: any };
  password?: string;
  plugins?: string[];
  port?: number;
  protocol: Protocol;
  relaxed_security?: boolean;
  session_override?: boolean;
  strict_capabilities?: boolean;
  target: TargetProviders;
  timeout?: number;
  user_name?: string;
  webhook?: string;
}

interface MobileSetting {
  server: ServerSetting;
  device: DeviceSetting;
}

interface SwipeSetting {
  distance: number;
  max_swipe_until_found: number;
}

// const defaultSwipeSetting: SwipeSetting = {
//   distance: 75,
//   max_swipe_until_found: 5,
// };

interface AndroidVideoSetting {
  bit_rate: number;
}

// const defaultAndroidVideoSetting: AndroidVideoSetting = {
//   bit_rate: 4,
// };

interface IOSVideoSetting {
  codec: string;
  fps: number;
  quality: VideoQuality;
}

// const defaultIOSVideoSetting: IOSVideoSetting = {
//   codec: 'mpeg4',
//   fps: 10,
//   quality: VideoQuality.MEDIUM,
// };

interface VideoSetting {
  android: AndroidVideoSetting;
  enabled: boolean;
  ios: IOSVideoSetting;
  path: string;
  prefix: string;
  size: string;
  time_limit: number;
}

interface VirtualDeviceSetting {
  connect_keyboard: boolean;
  headless: boolean;
  launch_timeout: number;
  name: string;
  ready_timeout: number;
}

// const defaultVirtualDeviceSetting: VirtualDeviceSetting = {
//   connect_keyboard: true,
//   headless: false,
//   launch_timeout: 120,
//   ready_timeout: 60,
//   name: '',
// };

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

// const defaultWDASetting: WDASetting = {
//   local_port: 8100,
//   connection_timeout: 60,
//   launch_timeout: 60,
//   startup_retries: 2,
//   startup_retry_interval: 10,
// };

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

// const defaultApplicationSetting: ApplicationSetting = {
//   type: ApplicationType.NATIVE,
//   install_timeout: 30,
//   wait_timeout: 30,
// };

interface DeviceSetting {
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

export const defaultFrameworkSetting: FrameworkSetting = {
  ui: {
    logging: {
      ...defaultUiLogSetting,
    },
    screenshot: {
      ...defaultScreenshotSetting,
    },
    timeout: {
      ...defaultTimeoutSetting,
    },
  },
};
