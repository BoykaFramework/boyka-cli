import {
  ApplicationType,
  AutomationType,
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

export type FrameworkSetting = {
  $schema: string;
  listeners_package?: string;
  ui?: UiSetting;
  api?: { [key: string]: ApiSetting };
};

export type ApiSetting = {
  base_uri: string;
  base_path?: string;
  port?: number;
  read_timeout?: number;
  write_timeout?: number;
  connection_timeout?: number;
  schema_path?: string;
  logging?: ApiLogSetting;
  validate_ssl?: boolean;
  verify_host_name?: boolean;
};

export type ApiLogSetting = {
  enable: boolean;
  request: boolean;
  response: boolean;
};

export type ScreenshotSetting = {
  enabled: boolean;
  path: string;
  extension: string;
  prefix: string;
};

export type TimeoutSetting = {
  implicit_wait: number;
  explicit_wait: number;
  page_load_timeout: number;
  script_timeout: number;
  highlight_delay: number;
};

export type DelaySetting = {
  before_click?: number;
  before_mouse_move?: number;
  before_swipe?: number;
  before_tap?: number;
  before_typing?: number;
};

export type UiSetting = {
  timeout: TimeoutSetting;
  delay?: DelaySetting;
  logging: UiLogSetting;
  screenshot: ScreenshotSetting;
  web?: { [key: string]: WebSetting };
  mobile?: { [key: string]: MobileSetting };
};

export type UiLogSetting = {
  enable: boolean;
  path: string;
  exclude_logs?: string[];
};

export type Dimension = {
  width: number;
  height: number;
};

export type WebSetting = {
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
  page_load_strategy?: PageLoadStrategy;
  version?: string;
};

export type ServerLogSetting = {
  debug_spacing?: boolean;
  level: LogLevel;
  local_timezone?: boolean;
  timestamp?: boolean;
};

export type ServerSetting = {
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
};

export type MobileSetting = {
  server: ServerSetting;
  device: DeviceSetting;
};

export type SwipeSetting = {
  distance: number;
  max_swipe_until_found: number;
  speed: Speed;
};

export type AndroidVideoSetting = {
  bit_rate: number;
};

export type IOSVideoSetting = {
  codec: string;
  fps: number;
  quality: VideoQuality;
};

export type VideoSetting = {
  android?: AndroidVideoSetting;
  enabled?: boolean;
  ios?: IOSVideoSetting;
  path: string;
  prefix?: string;
  size?: string;
  time_limit?: number;
};

export type VirtualDeviceSetting = {
  connect_keyboard?: boolean;
  headless?: boolean;
  launch_timeout?: number;
  name: string;
  ready_timeout?: number;
};

export type WDASetting = {
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
};

export type ApplicationSetting = {
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
};

export type DeviceSetting = {
  accept_alerts?: boolean;
  adb_timeout?: number;
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
};

export type Message = {
  success: string;
  error: string;
  loading: string;
  suggestion?: string;
};

export type UserInput = {
  group_id?: string;
  generate_sample?: boolean;
  platform: string;
  sub_platform?: string;
  config_name?: string;
  api?: {
    base_uri: string;
    base_path: string;
  };
  web?: {
    target: TargetProviders;
    browser: Browser;
    user_name?: string;
    password?: string;
  };
  mobile?: {
    server: {
      target: TargetProviders;
      port?: number;
      user_name?: string;
      password?: string;
    };
    device: {
      name: string;
      version: string;
      avd_name?: string;
      application?: {
        type: ApplicationType;
        path?: string;
        browser?: Browser;
      };
    };
  };
};

export type TemplateFile = {
  fileName: string;
  folder?: string;
  content: string;
};
